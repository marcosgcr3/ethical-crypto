import { PrismaClient } from '@prisma/client';
import { expandedArticles } from './articles-content';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding expanded content...');

  // Create Reviewer
  const marcus = await prisma.reviewer.upsert({
    where: { id: 'default-marcus-id' }, // We'll just create or find first
    update: {},
    create: {
      name: 'Dr. Marcus Sterling',
      title: 'Medical Integrity Panel',
      bio: 'Licensed functional medicine practitioner specializing in longevity and genomics.',
      imageUrl: '/images/doctor.png',
    },
  });

  // Get the real Reviewer ID
  const reviewer = await prisma.reviewer.findFirst();

  if (!reviewer) throw new Error("Reviewer not found");

  // Articles Database Array with MASSIVE CONTENT
  const articlesData = [
    {
      title: 'Telomere Optimization: The Genetic Frontier',
      slug: 'telomere-optimization',
      category: 'longevity',
      excerpt: 'Deep dive into recent studies regarding molecular interventions and lifestyle habits that protect DNA integrity and extend cellular age.',
      imageUrl: '/images/longevity.png',
      content: expandedArticles.longevity,
      published: true,
      reviewerId: reviewer.id,
    },
    {
      title: 'Functional Metabolic Flexibility Strategies',
      slug: 'metabolic-flexibility',
      category: 'nutrition',
      excerpt: 'Learn how to alternate fuel sources for improved cognitive clarity and sustained energy levels throughout the workday.',
      imageUrl: '/images/nutrition.png',
      content: expandedArticles.nutrition,
      published: true,
      reviewerId: reviewer.id,
    },
    {
      title: 'Circadian Rhythm Reset: Science of Deep Rest',
      slug: 'circadian-reset',
      category: 'sleep',
      excerpt: 'The non-negotiable role of deep sleep in lymphatic drainage and long-term neuroprotection.',
      imageUrl: '/images/sleep.png',
      content: expandedArticles.sleep,
      published: true,
      reviewerId: reviewer.id,
    },
    {
      title: 'Bio-Sensors of 2026: Beyond Heart Rate',
      slug: 'bio-sensors-2026',
      category: 'wearables',
      excerpt: 'Exploring the new generation of continuous glucose monitors and galvanic skin response sensors for mental stress management.',
      imageUrl: '/images/wearable.png',
      content: expandedArticles.wearables,
      published: true,
      reviewerId: reviewer.id,
    }
  ];

  for (const a of articlesData) {
    const article = await prisma.article.upsert({
      where: { slug: a.slug },
      update: { content: a.content }, // UPDATE the content this time
      create: a,
    });
    console.log(`Upserted massive article: ${article.slug}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
