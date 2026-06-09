import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[PUBLISH] Starting scheduled article publication scan for Ethical Crypto...');
  const now = new Date();

  // 1. Fetch pending articles that are scheduled to be published
  const pendingArticles = await prisma.article.findMany({
    where: {
      published: false,
      createdAt: {
        lte: now,
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      createdAt: true,
      category: true,
    },
  });

  if (pendingArticles.length === 0) {
    console.log('[PUBLISH] No pending scheduled articles to publish at this time.');
    return;
  }

  // 2. Publish them in a database transaction
  const updatedIds = pendingArticles.map((a) => a.id);
  await prisma.$transaction(
    updatedIds.map((id) =>
      prisma.article.update({
        where: { id },
        data: { published: true },
      })
    )
  );

  console.log(
    `[PUBLISH] Successfully published ${pendingArticles.length} scheduled articles:`
  );
  pendingArticles.forEach((a) => {
    console.log(` - [PUBLISHED] ${a.slug} (Scheduled: ${a.createdAt.toISOString()})`);
  });
}

main()
  .catch((error) => {
    console.error('[PUBLISH] Fatal error during publication:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
