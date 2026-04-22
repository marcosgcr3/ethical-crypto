import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = 'images';
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

async function migrate() {
  console.log('🚀 Iniciando migración de imágenes...');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('❌ La carpeta public/images no existe.');
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageMap = new Map(); // Local path -> Supabase URL

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    if (fs.lstatSync(filePath).isDirectory()) continue;

    console.log(`Uploading ${file}...`);
    const fileBuffer = fs.readFileSync(filePath);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(file, fileBuffer, {
        upsert: true,
        contentType: getContentType(file)
      });

    if (error) {
      console.error(`Error subiendo ${file}:`, error.message);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(file);

    imageMap.set(file, publicUrl);
  }

  console.log('✅ Subida completada. Actualizando base de datos...');

  // Actualizar Artículos
  const articles = await prisma.article.findMany();
  for (const article of articles) {
    if (article.imageUrl && (article.imageUrl.startsWith('/images/') || !article.imageUrl.includes('supabase.co'))) {
      const fileName = path.basename(article.imageUrl);
      const newUrl = imageMap.get(fileName);

      if (newUrl) {
        await prisma.article.update({
          where: { id: article.id },
          data: { imageUrl: newUrl }
        });
        console.log(`Artículo actualizado: ${article.title}`);
      }
    }
  }

  // Actualizar Reviewers
  const reviewers = await prisma.reviewer.findMany();
  for (const reviewer of reviewers) {
    if (reviewer.imageUrl && (reviewer.imageUrl.startsWith('/images/') || !reviewer.imageUrl.includes('supabase.co'))) {
      const fileName = path.basename(reviewer.imageUrl);
      const newUrl = imageMap.get(fileName);

      if (newUrl) {
        await prisma.reviewer.update({
          where: { id: reviewer.id },
          data: { imageUrl: newUrl }
        });
        console.log(`Reviewer actualizado: ${reviewer.name}`);
      }
    }
  }

  console.log('🎉 Migración finalizada con éxito.');
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const types = {
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

migrate()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
