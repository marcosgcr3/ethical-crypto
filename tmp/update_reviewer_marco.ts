import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Updating Reviewer Table for Marco ---');

  // 1. Create or Update Marco's Reviewer Profile
  const marco = await prisma.reviewer.upsert({
    where: { id: 'marco-author-id' }, // Static ID for consistency
    update: {
      name: 'Marco',
      title: 'Founder & Head Biohacker',
      bio: 'Data-driven self-experimenter with 5+ years of experience optimizing human performance through wearables, functional nutrition, and longevity protocols.',
      imageUrl: '/images/marco-biohacker.jpg',
    },
    create: {
      id: 'marco-author-id',
      name: 'Marco',
      title: 'Founder & Head Biohacker',
      bio: 'Data-driven self-experimenter with 5+ years of experience optimizing human performance through wearables, functional nutrition, and longevity protocols.',
      imageUrl: '/images/marco-biohacker.jpg',
    },
  });

  console.log(`Updated Reviewer: ${marco.name} (ID: ${marco.id})`);

  // 2. Update ALL articles to link to Marco
  const updateResult = await prisma.article.updateMany({
    data: {
      reviewerId: marco.id,
    },
  });

  console.log(`Updated ${updateResult.count} articles to be reviewed by Marco.`);
  console.log('--- DB Update Finished ---');
}

main()
  .catch((e) => {
    console.error('Error during DB update:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
