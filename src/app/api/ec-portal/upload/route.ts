import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import path from "path";

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

    // Validate file extension against whitelist
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize and create unique filename
    const originalName = path.basename(file.name, ext).replace(/[^\w-]/g, "_");
    const uniqueFilename = `${originalName}_${Date.now()}${ext}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from("images")
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return NextResponse.json({ error: "Failed to upload to cloud storage" }, { status: 500 });
    }

    // Get Public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("images")
      .getPublicUrl(uniqueFilename);

    return NextResponse.json({ 
      success: true, 
      imageUrl: publicUrl 
    });

  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
