import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, title: true, slug: true, excerpt: true }
  });

  console.log('Scanning all articles for non-ASCII characters...');
  for (const article of articles) {
    const nonAsciiTitle = article.title.match(/[^\x00-\x7F]/g);
    const nonAsciiExcerpt = article.excerpt.match(/[^\x00-\x7F]/g);

    if (nonAsciiTitle || nonAsciiExcerpt) {
      console.log(`\nArticle ID: ${article.id}`);
      console.log(`Slug: ${article.slug}`);
      if (nonAsciiTitle) {
        console.log(`Title: ${article.title}`);
        console.log(`Title hex: ${Buffer.from(article.title).toString('hex')}`);
      }
      if (nonAsciiExcerpt) {
        console.log(`Excerpt: ${article.excerpt}`);
        console.log(`Excerpt hex: ${Buffer.from(article.excerpt).toString('hex')}`);
      }
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
