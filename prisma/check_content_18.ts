import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article = await prisma.article.findUnique({
    where: { slug: 'ideal-sleep-temperature-metabolism-18c' },
    select: { content: true }
  });

  if (article) {
    if (article.content.includes('\u252C') || article.content.includes('\u2591')) {
      console.log('Mangled characters found in CONTENT as well.');
      // Find where they are
      const lines = article.content.split('\n');
      lines.forEach((line, i) => {
        if (line.includes('\u252C') || line.includes('\u2591')) {
          console.log(`Line ${i + 1}: ${line}`);
        }
      });
    } else {
      console.log('Content seems clean (no box-drawing characters found).');
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
