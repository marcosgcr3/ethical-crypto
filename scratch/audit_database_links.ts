import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

async function checkLink(url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD', timeout: 5000 });
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 'Error', ok: false, error: (err as Error).message };
  }
}

async function main() {
  console.log('--- STARTING DATABASE LINK AUDIT ---');
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      amazonProducts: true
    }
  });

  const urlRegex = /href=["'](https?:\/\/[^"']+)["']/g;
  const auditResults: any[] = [];

  for (const article of articles) {
    const linksFound: string[] = [];
    let match;
    
    // Extract from content
    while ((match = urlRegex.exec(article.content)) !== null) {
      linksFound.push(match[1]);
    }

    // Extract from amazonProducts
    if (article.amazonProducts && Array.isArray(article.amazonProducts)) {
      for (const p of article.amazonProducts as any[]) {
        if (p.url && p.url.startsWith('http')) linksFound.push(p.url);
        if (p.asin && !p.asin.startsWith('http')) {
             linksFound.push(`https://www.amazon.com/dp/${p.asin}/?tag=solarrv0e-20`);
        }
      }
    }

    if (linksFound.length > 0) {
      console.log(`Checking ${linksFound.length} links in: ${article.title}`);
      
      // Test unique links
      const uniqueLinks = Array.from(new Set(linksFound));
      const testResults = [];
      
      // Check first 3 links as a sample to avoid rate extraction
      for (const url of uniqueLinks.slice(0, 5)) {
        const result = await checkLink(url);
        testResults.push(result);
      }

      auditResults.push({
        title: article.title,
        slug: article.slug,
        linkCount: uniqueLinks.length,
        results: testResults
      });
    }
  }

  console.log('\n--- AUDIT SUMMARY ---');
  const brokenArticles = auditResults.filter(r => r.results.some((res: any) => !res.ok));
  
  if (brokenArticles.length === 0) {
    console.log('✅ No broken links found in sampled articles.');
  } else {
    console.log(`❌ Found ${brokenArticles.length} articles with potentially broken links:`);
    for (const b of brokenArticles) {
      console.log(`- ${b.title} (${b.slug})`);
      b.results.filter((res: any) => !res.ok).forEach((res: any) => {
        console.log(`  [${res.status}] ${res.url} - ${res.error || ''}`);
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
