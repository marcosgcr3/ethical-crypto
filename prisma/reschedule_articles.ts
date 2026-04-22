import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Fetching articles...');
  const allArticles = await prisma.article.findMany({
    select: { id: true, category: true, title: true }
  });

  console.log(`📊 Found ${allArticles.length} articles.`);

  // Group by category
  const sleep = allArticles.filter(a => a.category === 'sleep');
  const nutrition = allArticles.filter(a => a.category === 'nutrition');
  const longevity = allArticles.filter(a => a.category === 'longevity');
  const wearables = allArticles.filter(a => a.category === 'wearables');

  // Interleave categories: Sleep -> Nutrition -> Longevity -> Wearables
  const interleaved = [];
  const maxLen = Math.max(sleep.length, nutrition.length, longevity.length, wearables.length);

  for (let i = 0; i < maxLen; i++) {
    if (sleep[i]) interleaved.push(sleep[i]);
    if (nutrition[i]) interleaved.push(nutrition[i]);
    if (longevity[i]) interleaved.push(longevity[i]);
    if (wearables[i]) interleaved.push(wearables[i]);
  }

  console.log('📅 Calculating new dates ending on 2026-04-05 (today)...');
  
  const numArticles = interleaved.length;
  const daysInterval = 2;
  const totalDays = (numArticles - 1) * daysInterval;
  
  // Calculate start date: Today - (Total Days)
  const startDate = new Date('2026-04-05T10:00:00Z');
  startDate.setDate(startDate.getDate() - totalDays);

  let currentDate = new Date(startDate);

  for (let i = 0; i < interleaved.length; i++) {
    const article = interleaved[i];
    
    // Add some random minutes to make it look less robotic (between 5 and 45 minutes)
    const randomMinutes = Math.floor(Math.random() * 40) + 5;
    const pubDate = new Date(currentDate.getTime() + randomMinutes * 60000);
    
    // Updated date is a few hours later
    const updatedDate = new Date(pubDate.getTime() + 3 * 3600000); 

    console.log(`Updating [${article.category}] ${article.title} -> ${pubDate.toISOString()}`);
    
    await prisma.article.update({
      where: { id: article.id },
      data: {
        createdAt: pubDate,
        updatedAt: updatedDate
      }
    });

    // Advance 2 days
    currentDate.setDate(currentDate.getDate() + daysInterval);
  }

  console.log('✅ Articles rescheduled successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
