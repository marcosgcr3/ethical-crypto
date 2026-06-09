import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Initialise Supabase Client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const BUCKET_NAME = 'images';
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Recursive folder traversal to find all image files
function getFilesRecursively(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      // Only process image files
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const types: { [key: string]: string } = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.avif': 'image/avif'
  };
  return types[ext] || 'application/octet-stream';
}

async function main() {
  console.log('🚀 Starting recursive image migration to Supabase Storage...');

  const allImagePaths = getFilesRecursively(IMAGES_DIR);
  console.log(`Found ${allImagePaths.length} local images to check/upload.`);

  const imageMap = new Map<string, string>(); // basename -> Supabase Public URL

  for (const filePath of allImagePaths) {
    const basename = path.basename(filePath);
    console.log(`Uploading ${basename} (${path.relative(IMAGES_DIR, filePath)})...`);

    const fileBuffer = fs.readFileSync(filePath);
    
    // Upload to Supabase Storage (upsert: true to overwrite if exists/update content-type)
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(basename, fileBuffer, {
        upsert: true,
        contentType: getContentType(basename)
      });

    if (error) {
      console.error(`❌ Error uploading ${basename}:`, error.message);
      continue;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(basename);

    console.log(`  Uploaded successfully. Public URL: ${publicUrl}`);
    imageMap.set(basename, publicUrl);
  }

  console.log('\n✅ Uploads completed. Syncing database records...');

  // 1. Sync Articles
  const articles = await prisma.article.findMany();
  let updatedArticlesCount = 0;

  for (const article of articles) {
    if (!article.imageUrl) continue;

    const isLocal = article.imageUrl.startsWith('/images/') || !article.imageUrl.includes('supabase.co');
    if (isLocal) {
      const fileName = path.basename(article.imageUrl);
      const newUrl = imageMap.get(fileName);

      if (newUrl) {
        await prisma.article.update({
          where: { id: article.id },
          data: { imageUrl: newUrl }
        });
        console.log(`- Updated Article imageUrl: "${article.title}" (slug: ${article.slug}) -> ${newUrl}`);
        updatedArticlesCount++;
      } else {
        console.warn(`- Warning: No Supabase URL mapped for file "${fileName}" in article "${article.title}"`);
      }
    }
  }

  // 2. Sync Reviewers
  const reviewers = await prisma.reviewer.findMany();
  let updatedReviewersCount = 0;

  for (const reviewer of reviewers) {
    if (!reviewer.imageUrl) continue;

    const isLocal = reviewer.imageUrl.startsWith('/images/') || !reviewer.imageUrl.includes('supabase.co');
    if (isLocal) {
      const fileName = path.basename(reviewer.imageUrl);
      let newUrl = imageMap.get(fileName);

      // Special fallback: if reviewer imageUrl points to marcus.png (which doesn't exist)
      // but vanguard.png exists, map it to vanguard.png's Supabase URL
      if (!newUrl && fileName === 'marcus.png') {
        newUrl = imageMap.get('vanguard.png');
        console.log(`  Applying reviewer image fallback: marcus.png -> vanguard.png`);
      }

      if (newUrl) {
        await prisma.reviewer.update({
          where: { id: reviewer.id },
          data: { imageUrl: newUrl }
        });
        console.log(`- Updated Reviewer imageUrl: "${reviewer.name}" -> ${newUrl}`);
        updatedReviewersCount++;
      } else {
        console.warn(`- Warning: No Supabase URL mapped for file "${fileName}" in reviewer "${reviewer.name}"`);
      }
    }
  }

  console.log(`\n🎉 Database sync completed!`);
  console.log(`Updated ${updatedArticlesCount} articles.`);
  console.log(`Updated ${updatedReviewersCount} reviewers.`);
}

main()
  .catch(e => console.error('Migration failed:', e))
  .finally(() => prisma.$disconnect());
