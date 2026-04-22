import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.article.updateMany({
    where: {
      OR: [
        { slug: { startsWith: '90-minute' } },
        { title: { contains: '90-Minute' } }
      ]
    },
    data: {
      imageUrl: '/images/biohacker_sleep_routine_hero.png'
    }
  });

  console.log('Update result:', JSON.stringify(result, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
