import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const articlesToUpdate = [
    'is-ethereum-still-decentralized-2026',
    'bitcoin-vs-ethereum'
  ];

  for (const slug of articlesToUpdate) {
    const htmlPath = `./scratch/${slug}.html`;
    if (fs.existsSync(htmlPath)) {
      const content = fs.readFileSync(htmlPath, 'utf-8');
      
      await prisma.article.update({
        where: { slug: slug },
        data: { content: content }
      });
      console.log(`Updated content for: ${slug}`);
    } else {
      console.log(`File not found for: ${slug}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
