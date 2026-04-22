import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mapping = {
  'biohacking': 'crypto',
  'longevity': 'wealthspan',
  'nutrition': 'fundamentals',
  'sleep': 'security',
  'wearables': 'hardware'
};

async function main() {
  console.log('Starting category migration...');
  
  for (const [oldCat, newCat] of Object.entries(mapping)) {
    try {
      const result = await prisma.article.updateMany({
        where: { category: oldCat },
        data: { category: newCat }
      });
      console.log(`Updated ${result.count} articles from "${oldCat}" to "${newCat}".`);
    } catch (err) {
      console.error(`Failed to update ${oldCat}:`, err);
    }
  }
  
  console.log('Migration complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
