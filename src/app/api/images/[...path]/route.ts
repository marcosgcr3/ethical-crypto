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
  
  try {
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

    // Parse query parameters for resizing and quality (Next.js default quality is 75)
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get("w") || "0", 10);
    const quality = parseInt(searchParams.get("q") || "75", 10);

    // Check if browser supports AVIF and WebP (default to true for WebP for modern clients or when accept header allows image/* or */*)
    const acceptHeader = request.headers.get("accept") || "";
    const supportsAvif = acceptHeader.includes("image/avif");
    const supportsWebp = !acceptHeader || 
                         acceptHeader.includes("image/webp") || 
                         acceptHeader.includes("image/*") || 
                         acceptHeader.includes("*/*");

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

    if (supportsAvif) {
      // Compress to AVIF. AVIF quality 50 is visually equivalent to WebP 75 for complex graphics.
      // If quality is 75, we compress to 50. If custom quality is provided, scale it.
      const avifQuality = quality <= 75 ? Math.max(quality - 25, 50) : Math.max(quality - 15, 60);
      optimizedBuffer = await pipeline
        .avif({ quality: avifQuality, effort: 6 })
        .toBuffer();
      contentType = "image/avif";
    } else if (supportsWebp) {
      // Compress to WebP. WebP quality 65 is visually equivalent to WebP 75 but smaller.
      const webpQuality = quality <= 75 ? Math.max(quality - 10, 65) : Math.max(quality - 5, 70);
      optimizedBuffer = await pipeline
        .webp({ quality: webpQuality, effort: 6 })
        .toBuffer();
      contentType = "image/webp";
    } else {
      // Fallback for non-webp/non-avif browsers (e.g., standard PNG/JPEG optimization)
      if (ext === ".png") {
        optimizedBuffer = await pipeline
          .png({ quality: Math.min(quality, 75), palette: true, compressionLevel: 9 })
          .toBuffer();
        contentType = "image/png";
      } else {
        optimizedBuffer = await pipeline
          .jpeg({ quality: Math.min(quality, 70), mozjpeg: true })
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
