const asinPattern = /(?:\/dp\/|\/gp\/product\/|\/asin\/|\/aw\/d\/)([A-Z0-9]{10})/i;

async function checkLink(url) {
  console.log(`Checking: ${url}`);
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
      },
      redirect: "follow",
    });

    const finalUrl = response.url;
    const text = await response.text();
    const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "No Title";
    
    const isProductPage = text.includes('id="productTitle"') || 
                         text.includes('id="add-to-cart-button"') || 
                         text.includes('class="product-title-word-break"') ||
                         text.includes('id="title"');
    
    const isBotDetected = text.includes("api-services-support@amazon.com") || text.includes("Robot Check");
    const isSoft404 = text.includes("Looking for something?") || text.includes("¿Buscas algo?");
    
    const asinMatch = url.match(asinPattern);
    const finalAsinMatch = finalUrl.match(asinPattern);
    const targetAsin = (asinMatch || finalAsinMatch)?.[1]?.toUpperCase();
    const asinInUrl = targetAsin ? finalUrl.toUpperCase().includes(targetAsin) : false;

    console.log(`- Final URL: ${finalUrl}`);
    console.log(`- Title: ${title}`);
    console.log(`- Is Product Page: ${isProductPage}`);
    console.log(`- Is Bot Detected: ${isBotDetected}`);
    console.log(`- Is Soft 404: ${isSoft404}`);
    console.log(`- ASIN detected: ${targetAsin}`);
    console.log(`- ASIN in Final URL: ${asinInUrl}`);
    console.log('---');
  } catch (e) {
    console.error(`Error checking ${url}:`, e.message);
  }
}

const testUrls = [
  "https://amzn.to/3VrX6tH", // Redirection case
  "https://www.amazon.es/dp/B08P9S3Y5F", 
  "https://www.amazon.com/dp/B08P9S3Y5F",
  "https://www.amazon.com/s?k=test",
];

async function run() {
  for (const url of testUrls) {
    await checkLink(url);
  }
}

run();
