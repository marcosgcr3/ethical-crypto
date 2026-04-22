import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const drafts = await prisma.article.findMany({
    where: { published: false },
    select: { id: true, title: true, category: true }
  });
  console.log(JSON.stringify(drafts, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
