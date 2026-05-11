import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const slugs = [
    'is-ethereum-still-decentralized-2026',
    'bitcoin-vs-ethereum'
  ];

  for (const slug of slugs) {
    const article = await prisma.article.findUnique({
      where: { slug: slug }
    });

    if (article) {
      console.log(`Found: ${article.title}`);
      fs.writeFileSync(`./scratch/${article.slug}.html`, article.content);
    } else {
      console.log(`Not found: ${slug}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
