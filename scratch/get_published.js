const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const published = await prisma.article.findMany({
    where: { published: true },
    select: { id: true, title: true, excerpt: true, slug: true }
  });
  fs.writeFileSync('scratch/published_out.json', JSON.stringify(published, null, 2), 'utf8');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
