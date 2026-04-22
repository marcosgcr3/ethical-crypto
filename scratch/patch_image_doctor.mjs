import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.reviewer.updateMany({
    where: { id: 'marcus-sterling-id' },
    data: { 
      imageUrl: '/images/doctor.png'
    }
  });

  await prisma.reviewer.updateMany({
    where: { name: 'Dr. Marcus Sterling' },
    data: { 
      imageUrl: '/images/doctor.png'
    }
  });

  console.log(`Updated imageUrl to doctor.png`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
