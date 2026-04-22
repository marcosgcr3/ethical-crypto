import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.reviewer.updateMany({
    where: { name: 'Marco' },
    data: { 
      name: 'Dr. Marcus Sterling',
      title: 'Licensed Functional Medicine Practitioner',
      bio: 'Dr. Marcus Sterling is a longevity specialist focused on data-driven metabolic and performance optimization. Formerly a prescriptive physician, he abandoned the traditional sick-care model to biohack human limits.',
      imageUrl: '/images/marcus.png'
    }
  });
  console.log(`Updated ${updated.count} reviewers.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
