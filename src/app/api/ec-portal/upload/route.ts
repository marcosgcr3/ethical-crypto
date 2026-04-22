import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";

// Only allow image file types
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"]);

export async function POST(req: NextRequest) {
  // Require authenticated admin session
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Path to the public/images directory
    const uploadDir = path.join(process.cwd(), "public", "images");

    // Ensure the directory exists and is writable
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err: any) {
      console.error("Upload: Failed to access directory:", err.message);
      return NextResponse.json({ error: "Storage error" }, { status: 500 });
    }

    // Validate file extension against whitelist
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }

    // Sanitize and create unique filename
    const originalName = path.basename(file.name, ext).replace(/[^\w-]/g, "_");
    const uniqueFilename = `${originalName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Save the file
    try {
      await writeFile(filePath, buffer);
    } catch (err: any) {
      console.error("Upload: Failed to write file:", err.message);
      return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      imageUrl: `/api/images/${uniqueFilename}` 
    });

  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
