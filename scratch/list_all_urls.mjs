import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, category: true }
  });

  const baseUrl = 'https://ethicalbiohacking.com';
  const urls = [
    '',
    '/biohacking',
    '/longevity',
    '/nutrition',
    '/sleep',
    '/wearables',
    '/about',
    '/guidelines',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/affiliate-disclosure',
    '/cookie-policy'
  ].map(p => baseUrl + p);

  articles.forEach(a => {
    urls.push(`${baseUrl}/${a.category || 'uncategorized'}/${a.slug}`);
  });

  console.log(urls.join('\n'));
}

main().finally(() => prisma.$disconnect());
