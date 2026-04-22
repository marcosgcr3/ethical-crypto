import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({ select: { title: true, content: true } });
  
  let totalWords = 0;
  let shortArticles = 0;
  
  articles.forEach(a => {
    const words = a.content.split(/\s+/).length;
    totalWords += words;
    if (words < 400) {
      shortArticles++;
      console.log(`Short: ${a.title} (${words} words)`);
    }
  });
  
  console.log(`Total Articles: ${articles.length}`);
  console.log(`Average Words: ${totalWords / articles.length}`);
  console.log(`Articles under 400 words: ${shortArticles}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
