
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 12,
  });

  console.log(`Top ${articles.length} published articles:`);
  articles.forEach((a, i) => {
    console.log(`${i+1}. [${a.category}] ${a.title} (ID: ${a.id})`);
  });

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
