import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

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

    // Determine target format and Content-Type
    let format = "";
    let contentType = "";
    if (supportsAvif) {
      format = "avif";
      contentType = "image/avif";
    } else if (supportsWebp) {
      format = "webp";
      contentType = "image/webp";
    } else if (ext === ".png") {
      format = "png";
      contentType = "image/png";
    } else {
      format = "jpg";
      contentType = "image/jpeg";
    }

    // Generate unique cache key and path
    const hash = crypto.createHash("sha256")
      .update(`${filename}_w${width}_q${quality}_f${format}`)
      .digest("hex");
    const cacheDir = path.join(process.cwd(), "tmp", "image-cache");
    const cachePath = path.join(cacheDir, `${hash}.${format}`);

    // Try to serve from cache
    try {
      const cachedBuffer = await fs.readFile(cachePath);
      return new NextResponse(new Uint8Array(cachedBuffer) as any, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "Vary": "Accept",
        },
      });
    } catch (cacheError) {
      // Cache miss, proceed to optimization
    }

    let optimizedBuffer: Buffer;

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
      // Compress to AVIF. AVIF quality 42-45 is visually excellent and extremely compact.
      const avifQuality = quality <= 75 ? Math.max(quality - 33, 42) : Math.max(quality - 20, 55);
      optimizedBuffer = await pipeline
        .avif({ quality: avifQuality, effort: 6 })
        .toBuffer();
    } else if (supportsWebp) {
      // Compress to WebP. WebP quality 60 is a good sweet spot for size/quality.
      const webpQuality = quality <= 75 ? Math.max(quality - 15, 60) : Math.max(quality - 10, 65);
      optimizedBuffer = await pipeline
        .webp({ quality: webpQuality, effort: 6 })
        .toBuffer();
    } else {
      // Fallback for non-webp/non-avif browsers (e.g., standard PNG/JPEG optimization)
      if (ext === ".png") {
        optimizedBuffer = await pipeline
          .png({ quality: Math.min(quality, 75), palette: true, compressionLevel: 9 })
          .toBuffer();
      } else {
        optimizedBuffer = await pipeline
          .jpeg({ quality: Math.min(quality, 70), mozjpeg: true })
          .toBuffer();
      }
    }

    // Write to disk cache asynchronously
    try {
      await fs.mkdir(cacheDir, { recursive: true });
      await fs.writeFile(cachePath, optimizedBuffer);
    } catch (writeError) {
      console.error(`DEBUG: Failed to write optimized image to cache: ${cachePath}`, writeError);
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
