import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { slug: { contains: '90-minute' } },
        { title: { contains: '90-Minute' } }
      ]
    }
  });

  console.log('--- FOUND ARTICLES ---');
  console.log(JSON.stringify(articles, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
