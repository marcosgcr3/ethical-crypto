import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      content: {
        contains: '—',
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  console.log(`Found ${articles.length} articles with em-dashes.`);
  articles.forEach((a) => {
    const matches = (a.content.match(/—/g) || []).length;
    console.log(`[${a.id}] ${a.title}: ${matches} occurrences`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
