import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const articles = await prisma.article.groupBy({
    by: ['category', 'published'],
    _count: { id: true }
  });
  console.log(JSON.stringify(articles, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
