import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function testOne() {
  const baseUrl = 'https://ethicalbiohacking.com';
  const key = process.env.INDEXNOW_KEY;

  console.log(`Testing with key: ${key}`);
  
  const payload = {
    host: 'ethicalbiohacking.com',
    key: key,
    keyLocation: `https://ethicalbiohacking.com/${key}.txt`,
    urlList: [
      'https://ethicalbiohacking.com/'
    ]
  };

  const response = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });

  console.log(`Status: ${response.status}`);
  console.log(await response.text());
}

testOne();
