import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function humanizePunctuation(text: string): string {
  if (!text) return text;

  let result = text;

  // 1. Double em-dash (parenthetical)
  // Example: "word — aside — word" -> "word (aside) word"
  result = result.replace(/(\s+)—\s+([^—\n]+?)\s+—(\s+)/g, '$1($2)$3');
  
  // 2. Single em-dash used as a break
  // Example: "sleep—these are" -> "sleep, these are"
  // Example: "biology — the real" -> "biology, the real"
  // We handle both cases (with or without spaces)
  result = result.replace(/(\S)\s*—\s*(\S)/g, '$1, $2');

  return result;
}

async function main() {
  const articles = await prisma.article.findMany();
  console.log(`Analyzing ${articles.length} articles...`);

  let updatedCount = 0;

  for (const article of articles) {
    const newContent = humanizePunctuation(article.content);
    const newExcerpt = humanizePunctuation(article.excerpt);

    if (newContent !== article.content || newExcerpt !== article.excerpt) {
      await prisma.article.update({
        where: { id: article.id },
        data: {
          content: newContent,
          excerpt: newExcerpt,
        },
      });
      console.log(`✅ Updated: ${article.title}`);
      updatedCount++;
    }
  }

  console.log(`Finished. Updated ${updatedCount} articles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
