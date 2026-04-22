import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function testYandex() {
  const key = process.env.INDEXNOW_KEY;
  const payload = {
    host: 'ethicalbiohacking.com',
    key: key,
    keyLocation: `https://ethicalbiohacking.com/${key}.txt`,
    urlList: ['https://ethicalbiohacking.com/']
  };

  const response = await fetch('https://yandex.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });

  console.log(`Status Yandex: ${response.status}`);
  console.log(await response.text());
}

testYandex();
