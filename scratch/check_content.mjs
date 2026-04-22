import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findFirst();
  console.log(article.content.substring(0, 1000));
}

main().catch(console.error).finally(() => prisma.$disconnect());
