import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const HOST = 'ethicalbiohacking.com';
const KEY = '9e6584c311654483a906ffeb6dcc91bb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SEARCH_ENGINE = 'api.indexnow.org';

async function main() {
  // Sacar todos los artículos (usar tu propia lógica de filtrado si es necesario)
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { slug: true, category: true }
  });
  
  const urlList = [
    `https://${HOST}/`,
    `https://${HOST}/about`,
    `https://${HOST}/disclaimer`,
    `https://${HOST}/privacy`,
    `https://${HOST}/terms`,
    `https://${HOST}/longevity`,
    `https://${HOST}/nutrition`,
    `https://${HOST}/sleep`,
    `https://${HOST}/wearables`
  ];

  articles.forEach(a => {
    // Si tienes carpetas diferentes para las categorías, se respeta la ruta
    if (a.category && a.slug) {
        urlList.push(`https://${HOST}/${a.category}/${a.slug}`);
    }
  });

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);
  
  const response = await fetch(`https://${SEARCH_ENGINE}/indexnow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList
    })
  });

  if (response.ok) {
    console.log(`Successfully submitted URLs to IndexNow! (Status: ${response.status})`);
  } else {
    console.error(`Failed to submit URLs. Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.error(text);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
