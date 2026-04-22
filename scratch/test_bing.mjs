import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function testBing() {
  const key = process.env.INDEXNOW_KEY;
  const payload = {
    host: 'ethicalbiohacking.com',
    key: key,
    keyLocation: `https://ethicalbiohacking.com/${key}.txt`,
    urlList: ['https://ethicalbiohacking.com/']
  };

  // Usando el endpoint directo de Bing
  const response = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });

  console.log(`Status Bing: ${response.status}`);
  console.log(await response.text());
}

testBing();
