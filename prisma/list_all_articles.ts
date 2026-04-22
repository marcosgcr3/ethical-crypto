import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allArticles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      category: true
    }
  });

  console.log('--- ALL ARTICLES ---');
  console.log(JSON.stringify(allArticles, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
