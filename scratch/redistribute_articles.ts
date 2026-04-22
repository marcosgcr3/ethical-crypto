import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Fetch articles from today
  const targetDate = new Date('2026-04-10');
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      createdAt: {
        gte: new Date(targetDate.setHours(0, 0, 0, 0)),
        lt: new Date(targetDate.setHours(23, 59, 59, 999)),
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (articles.length === 0) {
    console.log('No articles found for today.');
    return;
  }

  console.log(`Found ${articles.length} articles from today.`);

  // 2. Mix articles to avoid consecutive categories
  // Group by category
  const grouped: Record<string, any[]> = {};
  articles.forEach(a => {
    const cat = a.category || 'default';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(a);
  });

  const mixedArticles: any[] = [];
  const categories = Object.keys(grouped);
  let lastCategory = '';

  while (mixedArticles.length < articles.length) {
    // Pick a category different from the last one if possible
    let availableCategories = categories.filter(c => grouped[c].length > 0 && c !== lastCategory);
    
    if (availableCategories.length === 0) {
      // Fallback: pick any category with remaining articles
      availableCategories = categories.filter(c => grouped[c].length > 0);
    }

    if (availableCategories.length === 0) break;

    // Pick category with most articles remaining to spread them better
    availableCategories.sort((a, b) => grouped[b].length - grouped[a].length);
    const catToPick = availableCategories[0];
    
    const article = grouped[catToPick].shift();
    mixedArticles.push(article);
    lastCategory = catToPick;
  }

  // 3. Assign new dates
  // Available dates (skipping existing ones: Apr 3, Apr 1, Mar 28)
  const availableDates = [
    '2026-04-10',
    '2026-04-09',
    '2026-04-08',
    '2026-04-07',
    '2026-04-06',
    '2026-04-05',
    '2026-04-04',
    '2026-04-02',
    '2026-03-31',
    '2026-03-30',
    '2026-03-29',
    '2026-03-27',
    '2026-03-26',
  ].map(d => new Date(d));

  // Reverse to put earlier articles on earlier dates
  mixedArticles.reverse(); 

  console.log('Planning updates:');
  for (let i = 0; i < mixedArticles.length; i++) {
    const article = mixedArticles[i];
    const newDate = availableDates[availableDates.length - 1 - i]; // Start from oldest available
    // Add some random time to make it look natural
    newDate.setHours(10 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60));
    
    console.log(`- ${article.title} (${article.category}) -> ${newDate.toISOString()}`);
    
    await prisma.article.update({
      where: { id: article.id },
      data: { createdAt: newDate },
    });
  }

  console.log('Updated all articles.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
