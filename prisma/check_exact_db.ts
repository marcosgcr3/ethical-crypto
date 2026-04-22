import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: 'personalized-nutrigenomics-mthfr-apoe-guide' }
  });

  if (article) {
    console.log(`TITLE: ${article.title}`);
    console.log(`AMAZON PRODUCTS JSON:`);
    console.log(JSON.stringify(article.amazonProducts, null, 2));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
