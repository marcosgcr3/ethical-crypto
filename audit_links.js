
const https = require('https');
const http = require('http');

const BASE_URL = 'https://ethical-crypto-1ksg.vercel.app';
const visited = new Set();
const toVisit = [BASE_URL];
const brokenLinks = [];

async function checkLink(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, (res) => {
      resolve(res.statusCode);
      res.resume();
    }).on('error', (e) => {
      resolve(500);
    });
    req.end();
  });
}

async function getLinks(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const links = [];
        const regex = /href="([^"]+)"/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          let link = match[1];
          if (link.startsWith('/')) link = BASE_URL + link;
          if (link.startsWith(BASE_URL) && !link.includes('#')) {
            links.push(link);
          }
        }
        resolve(links);
      });
    }).on('error', () => resolve([]));
  });
}

async function runAudit() {
  console.log('Starting link audit...');
  while (toVisit.length > 0) {
    const url = toVisit.pop();
    if (visited.has(url)) continue;
    visited.add(url);

    console.log(`Checking: ${url}`);
    const status = await checkLink(url);
    if (status >= 400) {
      brokenLinks.push({ url, status });
      console.log(`[BROKEN] ${url} - Status: ${status}`);
    } else {
      const links = await getLinks(url);
      for (const link of links) {
        if (!visited.has(link)) toVisit.push(link);
      }
    }
  }

  console.log('\n--- Audit Results ---');
  console.log(`Visited: ${visited.size} pages`);
  if (brokenLinks.length === 0) {
    console.log('No broken links found!');
  } else {
    console.log(`Found ${brokenLinks.length} broken links:`);
    brokenLinks.forEach(l => console.log(`${l.status}: ${l.url}`));
  }
}

runAudit();
