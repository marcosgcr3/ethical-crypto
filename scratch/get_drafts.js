const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const drafts = await prisma.article.findMany({
    where: { published: false },
    select: { id: true, title: true, excerpt: true, slug: true }
  });
  fs.writeFileSync('scratch/drafts.json', JSON.stringify(drafts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
