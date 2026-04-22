import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const articles = await prisma.article.findMany({ take: 5 });
  console.log('Artículos:', JSON.stringify(articles, null, 2));
  
  const reviewers = await prisma.reviewer.findMany();
  console.log('Reviewers:', JSON.stringify(reviewers, null, 2));
}

check()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
