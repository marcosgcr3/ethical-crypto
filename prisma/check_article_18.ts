import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: 'ideal-sleep-temperature-metabolism-18c' },
    select: { id: true, title: true, excerpt: true }
  });

  if (article) {
    console.log('Article Found:');
    console.log('ID:', article.id);
    console.log('Title:', article.title);
    console.log('Excerpt:', article.excerpt);
    
    console.log('Title hex:');
    console.log(Buffer.from(article.title).toString('hex'));
    
    console.log('Excerpt hex:');
    console.log(Buffer.from(article.excerpt).toString('hex'));
  } else {
    console.log('Article not found');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
