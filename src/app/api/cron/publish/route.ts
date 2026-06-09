import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verify CRON_SECRET to prevent unauthorized triggers
  const authHeader = request.headers.get('authorization');
  const { searchParams } = new URL(request.url);
  const keyParam = searchParams.get('key');

  const expectedSecret = process.env.CRON_SECRET;

  if (expectedSecret) {
    const isHeaderAuth = authHeader === `Bearer ${expectedSecret}`;
    const isParamAuth = keyParam === expectedSecret;
    if (!isHeaderAuth && !isParamAuth) {
      console.warn('[CRON] Unauthorized request attempt.');
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  try {
    const now = new Date();

    // Find all drafts scheduled to be published (createdAt <= now)
    const pendingArticles = await prisma.article.findMany({
      where: {
        published: false,
        createdAt: { lte: now },
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
      console.log('[CRON] No pending scheduled articles to publish at this time.');
      return NextResponse.json({ message: 'No pending articles to publish at this time.' });
    }

    // Publish them in a transaction
    await prisma.$transaction(
      pendingArticles.map((a) =>
        prisma.article.update({
          where: { id: a.id },
          data: { published: true },
        })
      )
    );

    console.log(`[CRON] Published ${pendingArticles.length} articles:`, pendingArticles.map((a) => a.slug));

    return NextResponse.json({
      message: `Successfully published ${pendingArticles.length} articles.`,
      published: pendingArticles.map((a) => ({
        slug: a.slug,
        title: a.title,
        category: a.category,
        scheduledDate: a.createdAt.toISOString(),
      })),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[CRON] Publish API Error:', msg);
    return NextResponse.json(
      { error: 'Failed to process scheduled publications', details: msg },
      { status: 500 }
    );
  }
}
