import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ethicalbiohacking.com';
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    console.error("ERROR: INDEXNOW_KEY not found in .env");
    process.exit(1);
  }

  console.log("Fetching all URLs...");

  // Fetch all published articles
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true, category: true },
  });

  const articleUrls = articles.map(a => `${baseUrl}/${a.category || 'uncategorized'}/${a.slug}`);

  // Static routes
  const staticRoutes = [
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
  ].map(path => `${baseUrl}${path}`);

  const allUrls = [...staticRoutes, ...articleUrls];

  console.log(`Submitting ${allUrls.length} URLs to IndexNow...`);

  const payload = {
    host: new URL(baseUrl).hostname,
    key: key,
    keyLocation: `${baseUrl}/${key}.txt`,
    urlList: allUrls
  };

  // We try multiple endpoints to ensure success
  const endpoints = [
    'https://yandex.com/indexnow',
    'https://www.bing.com/indexnow',
    'https://api.indexnow.org/IndexNow'
  ];

  for (const endpoint of endpoints) {
    console.log(`\nTrying endpoint: ${endpoint}`);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`HTTP Status Code: ${response.status}`);
      
      if (response.status === 200 || response.status === 202) {
        console.log(`SUCCESS: URLs submitted successfully to ${new URL(endpoint).hostname}`);
      } else {
        const errorText = await response.text();
        console.error(`FAILED: ${new URL(endpoint).hostname} returned status ${response.status}`);
        console.error(errorText);
      }
    } catch (error) {
      console.error(`ERROR: Failed to reach ${endpoint}:`, error.message);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
