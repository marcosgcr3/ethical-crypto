const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ethicalbiohacking.com';
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/guidelines',
    '/contact',
    '/privacy',
    '/terms'
  ];

  // Dynamic routes
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, category: true }
  });

  const urls = [
    ...routes.map(r => baseUrl + r),
    ...articles.map(a => `${baseUrl}/${a.category}/${a.slug}`)
  ];

  console.log(urls.join('\n'));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
