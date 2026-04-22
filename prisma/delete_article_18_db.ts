import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.article.deleteMany({
    where: { slug: 'sleep-chronotype-manifesto-biology-productivity-hacking' }
  });

  console.log('Article 18 deleted:', result.count);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
