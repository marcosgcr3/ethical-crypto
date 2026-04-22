import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { content: { contains: 'biohacking', mode: 'insensitive' } },
        { title: { contains: 'biohacking', mode: 'insensitive' } },
        { excerpt: { contains: 'biohacking', mode: 'insensitive' } },
      ],
    },
    select: { id: true, title: true, category: true },
    take: 10,
  });

  console.log('Articles with legacy terms:', JSON.stringify(articles, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
