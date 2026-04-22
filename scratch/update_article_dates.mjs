import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  
  // 1. Move all currently published to 15 days ago.
  const fifteenDaysAgo = new Date(now);
  fifteenDaysAgo.setDate(now.getDate() - 15);
  
  const updatePublished = await prisma.article.updateMany({
    where: { published: true },
    data: { createdAt: fifteenDaysAgo }
  });
  console.log(`Updated ${updatePublished.count} currently published articles to ${fifteenDaysAgo.toISOString()}`);
  
  // 2. Fetch drafts
  const drafts = await prisma.article.findMany({
    where: { published: false }
  });
  
  // 3. Order drafts: sleep -> nutrition -> wearables -> longevity
  const cycle = ['sleep', 'nutrition', 'wearables', 'longevity'];
  
  // Organize drafts by category
  const categorized = {
    sleep: drafts.filter(d => d.category === 'sleep'),
    nutrition: drafts.filter(d => d.category === 'nutrition'),
    wearables: drafts.filter(d => d.category === 'wearables'),
    longevity: drafts.filter(d => d.category === 'longevity'),
  };
  
  const orderedDrafts = [];
  let prevCount = -1;
  
  // Extract in cycle order
  while (orderedDrafts.length < drafts.length) {
    if (prevCount === orderedDrafts.length) {
      // infinite loop prevention in case of weird category string issue
      break; 
    }
    prevCount = orderedDrafts.length;
    for (const cat of cycle) {
      if (categorized[cat] && categorized[cat].length > 0) {
        orderedDrafts.push(categorized[cat].shift());
      }
    }
  }
  
  // Push remaining if any categories didn't match the cycle
  for (const d of drafts) {
    if (!orderedDrafts.find(o => o.id === d.id)) {
      orderedDrafts.push(d);
    }
  }

  // 4. Distribute over the 15 days.
  // We want the most recent (today) to be the first in the ordered list? Or vice-versa.
  // User: "desde el dia de hoy hasta hoy menos 15 dias... primero sleep"
  // So the first one in the list (sleep) will be today (0 days ago).
  const numDrafts = orderedDrafts.length;
  for (let i = 0; i < numDrafts; i++) {
    const draft = orderedDrafts[i];
    // Map i=0 -> 0 days ago, i=max -> 15 days ago
    const daysAgo = numDrafts > 1 ? Math.floor(i * (15 / (numDrafts - 1))) : 0;
    const draftDate = new Date(now);
    draftDate.setDate(now.getDate() - daysAgo);
    
    await prisma.article.update({
      where: { id: draft.id },
      data: {
        published: true,
        createdAt: draftDate
      }
    });
    console.log(`Published draft [${draft.category}] "${draft.title}" with date ${draftDate.toISOString()}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
