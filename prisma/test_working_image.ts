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
      imageUrl: '/images/ethical_biohacking_guide_2026.png'
    }
  });

  console.log('Update result (TEST):', JSON.stringify(result, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
