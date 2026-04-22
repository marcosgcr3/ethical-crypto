import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const slug = 'ideal-sleep-temperature-metabolism-18c';
  const article = await prisma.article.findUnique({
    where: { slug },
    select: { id: true, title: true }
  });

  if (article) {
    console.log('Current Title:', article.title);
    // Replace the mangled character sequence with the real degree symbol
    // \u252C is ┬
    // \u2591 is ░
    const fixedTitle = article.title.replace(/\u252C\u2591/g, '°');

    console.log('Fixed Title:  ', fixedTitle);

    if (fixedTitle !== article.title) {
      await prisma.article.update({
        where: { id: article.id },
        data: { title: fixedTitle }
      });
      console.log('Article updated successfully.');
    } else {
      console.log('No changes needed or character sequence not found as expected.');
    }
  } else {
    console.log('Article not found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
