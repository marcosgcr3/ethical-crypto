const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:ikCLP3dKQmNzWzjjKi5B@187.124.172.149:5433/postgres"
      }
    }
  });

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { content: { contains: 'amazon' } },
        { content: { contains: 'amzn.to' } },
        { content: { contains: 'Compra' } }
      ]
    },
    take: 5
  });

  console.log(JSON.stringify(articles, null, 2));
  await prisma.$disconnect();
}

main();
