import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.reviewer.updateMany({
    where: { id: 'marcus-sterling-id' },
    data: { 
      imageUrl: '/images/team-marcus.png'
    }
  });

  // Also update any reviewer with the name Dr. Marcus Sterling just in case
  const updated2 = await prisma.reviewer.updateMany({
    where: { name: 'Dr. Marcus Sterling' },
    data: { 
      imageUrl: '/images/team-marcus.png'
    }
  });

  console.log(`Updated imageUrl to team-marcus.png`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
