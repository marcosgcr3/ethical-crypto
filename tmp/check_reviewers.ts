import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const reviewers = await prisma.reviewer.findMany();
  console.log(JSON.stringify(reviewers, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
