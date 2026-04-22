import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, title: true, slug: true, excerpt: true }
  });

  const suspicious = articles.filter(a => 
    a.title.includes('\u252C') || a.title.includes('\u2591') || 
    a.excerpt.includes('\u252C') || a.excerpt.includes('\u2591')
  );

  if (suspicious.length > 0) {
    console.log(`Found ${suspicious.length} suspicious articles:`);
    suspicious.forEach(a => {
      console.log(`- ${a.slug}: ${a.title}`);
    });
  } else {
    console.log('No suspicious articles found using exact box-drawing character check.');
    // Check for other non-ascii in title/excerpt
    const nonAscii = articles.filter(a => /[^\x00-\x7F]/.test(a.title) || /[^\x00-\x7F]/.test(a.excerpt));
    console.log(`Found ${nonAscii.length} articles with non-ASCII characters:`);
    nonAscii.forEach(a => {
      console.log(`- ${a.slug}: ${a.title}`);
      // Log hex of suspicious part
      const matches = a.title.match(/[^\x00-\x7F]+/g);
      if (matches) console.log('  Matches in title:', matches.map(m => Buffer.from(m).toString('hex')));
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
