import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { title: true, slug: true }
  });
  articles.forEach(a => console.log(a.title, a.slug));
}

main().catch(console.error).finally(() => prisma.$disconnect());
