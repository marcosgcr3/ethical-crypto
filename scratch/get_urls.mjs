import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: { slug: true, categoryId: true }
  });
  
  console.log("RECENT URLs:");
  articles.forEach(a => {
    console.log(`https://ethicalbiohacking.com/${a.categoryId}/${a.slug}`);
  });
}

main().finally(() => prisma.$disconnect());
