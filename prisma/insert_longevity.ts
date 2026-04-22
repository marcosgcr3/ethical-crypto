import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const reviewer = await prisma.reviewer.findFirst();
  if (!reviewer) {
    console.error('CRITICAL: No reviewer found in database. Run seed first.');
    return;
  }

  // Article 1
  const content1 = fs.readFileSync('tmp/article_1_content.html', 'utf8');
  await prisma.article.upsert({
    where: { slug: 'ethical-biohacking-guide-2026' },
    update: { 
        title: 'What is Ethical Biohacking: Complete Human Optimization Guide 2026', 
        content: content1, 
        imageUrl: '/images/ethical_biohacking_guide_2026.png', 
        published: true, 
        category: 'longevity',
        amazonProducts: [] 
    },
    create: { 
        title: 'What is Ethical Biohacking: Complete Human Optimization Guide 2026', 
        slug: 'ethical-biohacking-guide-2026', 
        content: content1, 
        excerpt: 'The definitive 2026 roadmap for human optimization, grounding cutting-edge genomics and wearables in a rigid ethical and clinical framework.',
        imageUrl: '/images/ethical_biohacking_guide_2026.png', 
        published: true, 
        category: 'longevity', 
        reviewerId: reviewer.id,
        amazonProducts: [] 
    },
  });
  console.log('--- Article 1: OK ---');

  // Article 2
  const content2 = fs.readFileSync('tmp/article_2_content.html', 'utf8');
  await prisma.article.upsert({
    where: { slug: 'hormesis-guide-2026' },
    update: { 
        title: 'Mechanisms of Hormesis: How to Activate Longevity Genes with Cold and Heat', 
        content: content2, 
        imageUrl: '/images/hormesis_mechanisms_2026.png', 
        published: true, 
        category: 'longevity',
        amazonProducts: [] 
    },
    create: { 
        title: 'Mechanisms of Hormesis: How to Activate Longevity Genes with Cold and Heat', 
        slug: 'hormesis-guide-2026', 
        content: content2, 
        excerpt: 'Deconstructing the biochemistry of beneficial stress: Harnessing temperature extremes for mitochondrial biogenesis and sirtuin activation.',
        imageUrl: '/images/hormesis_mechanisms_2026.png', 
        published: true, 
        category: 'longevity', 
        reviewerId: reviewer.id,
        amazonProducts: [] 
    },
  });
  console.log('--- Article 2: OK ---');

  // Article 3
  const content3 = fs.readFileSync('tmp/article_3_content.html', 'utf8');
  await prisma.article.upsert({
    where: { slug: 'epigenetics-habits-2026' },
    update: { 
        title: 'Epigenetics and Functional Health: 7 Habits to Modify your Genetic Expression', 
        content: content3, 
        imageUrl: '/images/epigenetics_habits_2026.png', 
        published: true, 
        category: 'longevity',
        amazonProducts: [] 
    },
    create: { 
        title: 'Epigenetics and Functional Health: 7 Habits to Modify your Genetic Expression', 
        slug: 'epigenetics-habits-2026', 
        content: content3, 
        excerpt: 'Your DNA is not your destiny. Learn how methylation and histone acetylation can be managed through strategic lifestyle triggers.',
        imageUrl: '/images/epigenetics_habits_2026.png', 
        published: true, 
        category: 'longevity', 
        reviewerId: reviewer.id,
        amazonProducts: [] 
    },
  });
  console.log('--- Article 3: OK ---');

  console.log('Full Insertion Complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
