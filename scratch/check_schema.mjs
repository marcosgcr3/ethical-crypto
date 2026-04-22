import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findFirst();
  console.log("Article fields:", Object.keys(article || {}));
}

main().finally(() => prisma.$disconnect());
