import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.article.groupBy({
    by: ['category'],
    where: { published: true },
  });

  console.log('Categories found in DB:', categories.map(c => c.category));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
