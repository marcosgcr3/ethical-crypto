import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

/**
 * OPTIMIZED IMAGE SERVING API
 * Uses 'sharp' to optimize images on the fly.
 * This route helps achieve modern image format scores (WebP/AVIF)
 * and reduces overall weight for high-res PNGs.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  const filename = pathSegments.join("/");
  
  let fileBuffer: Buffer;
  let ext: string;

  if (pathSegments[0] === "supabase") {
    // Fetch from Supabase
    const supabasePath = pathSegments.slice(1).join("/");
    const supabaseUrl = `https://wwvfyhszgbdffhzlapxz.supabase.co/storage/v1/object/public/images/${supabasePath}`;
    const response = await fetch(supabaseUrl);
    if (!response.ok) {
      return new NextResponse("Image not found on Supabase", { status: 404 });
    }
    fileBuffer = Buffer.from(await response.arrayBuffer());
    ext = path.extname(supabasePath).toLowerCase();
  } else {
    // Define path to the images inside the persistent folder
    const uploadDir = path.join(process.cwd(), "public", "images");
    const filePath = path.join(uploadDir, filename);
    fileBuffer = await fs.readFile(filePath);
    ext = path.extname(filename).toLowerCase();
  }

  try {
    // Parse query parameters for resizing and quality
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get("w") || "0", 10);
    const quality = parseInt(searchParams.get("q") || "80", 10);

    // Check if browser supports WebP
    const acceptHeader = request.headers.get("accept") || "";
    const supportsWebp = acceptHeader.includes("image/webp");

    // Skip optimization for SVGs
    if (ext === ".svg") {
      return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    let optimizedBuffer: Buffer;
    let contentType: string;

    // Perform optimization with sharp
    let pipeline = sharp(fileBuffer);

    // Apply resizing if requested
    if (width > 0) {
      pipeline = pipeline.resize({
        width,
        withoutEnlargement: true, // Don't make images larger than original
        fit: "inside",
      });
    }

    if (supportsWebp) {
      optimizedBuffer = await pipeline
        .webp({ quality, effort: 4 })
        .toBuffer();
      contentType = "image/webp";
    } else {
      // Fallback for non-webp browsers (e.g., standard JPEG optimization)
      if (ext === ".png") {
        optimizedBuffer = await pipeline
          .png({ quality, palette: true })
          .toBuffer();
        contentType = "image/png";
      } else {
        optimizedBuffer = await pipeline
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
        contentType = "image/jpeg";
      }
    }

    return new NextResponse(new Uint8Array(optimizedBuffer) as any, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Vary": "Accept", // Important: vary by Accept header so CDN/Browser caches correctly
      },
    });
  } catch (err) {
    console.error(`DEBUG: Failed to serve/optimize image ${filename}:`, err);
    return new NextResponse("Image not found", { status: 404 });
  }
}
