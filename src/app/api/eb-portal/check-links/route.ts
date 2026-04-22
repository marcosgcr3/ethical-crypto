import { NextResponse } from "next/server";

// This route checks if an Amazon product link is still valid (not 404 and not redirected to home/search)
type LinkStatus = "ok" | "broken" | "error";

interface CheckResult {
  url: string;
  status: LinkStatus;
  finalUrl?: string;
  title?: string;
}

async function checkLink(url: string): Promise<CheckResult> {
  try {
    // Extract ASIN if this is an amazon.com/dp/... link
    // Supporting more patterns: /dp/ASIN, /gp/product/ASIN, /asin/ASIN
    const asinPattern = /(?:\/dp\/|\/gp\/product\/|\/asin\/|\/aw\/d\/)([A-Z0-9]{10})/i;
    const asinMatch = url.match(asinPattern);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s for slow international redirects

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        },
        redirect: "follow",
      });

      if (response.status === 404) return { url, status: "broken" };

      const finalUrl = response.url;
      let title = "";
      let isProductPage = false;
      let isSoft404 = false;
      let isBotDetected = false;

      // Extract ASIN from final URL if we didn't have one initially (e.g. amzn.to redirected)
      const finalAsinMatch = finalUrl.match(asinPattern);

      // Try to get title and check for product markers in HTML
      try {
        const text = await response.text();
        
        // 1. Check for specific product markers (Expanded list for resilience)
        isProductPage = text.includes('id="productTitle"') || 
                       text.includes('id="add-to-cart-button"') || 
                       text.includes('id="ppd"') ||
                       text.includes('id="centerCol"') ||
                       text.includes('id="dp-container"') ||
                       text.includes('id="buybox"') ||
                       text.includes('id="acrCustomerReviewText"') ||
                       text.includes('id="availability"') ||
                       text.includes('class="product-title-word-break"') || // International
                       text.includes('itemprop="name"') ||
                       text.includes('id="title"');

        // 2. Check for Bot Detection / CAPTCHA
        isBotDetected = text.includes("api-services-support@amazon.com") || 
                            text.includes("Robot Check") ||
                            text.includes("sp-cc-container") || // Consent banner (sometimes prevents scrape)
                            text.includes("Enter the characters you see below");

        // 3. Check for "Soft 404" (errors that return 200) - Multilingual
        isSoft404 = text.includes("Looking for something?") || 
                    text.includes("Sorry! We couldn't find that page") ||
                    text.includes("¿Buscas algo?") ||
                    text.includes("Lo sentimos, no hemos podido encontrar esa página") ||
                    text.includes("error-404");

        // 4. Extract title
        const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) {
          title = titleMatch[1].trim()
            .replace(/Amazon\.(com|es|co\.uk|de): /g, "")
            .replace(/Amazon\.(com|es|co\.uk|de)/g, "");
        }

        if (isBotDetected) {
          return { url, status: "error", finalUrl, title: "Blocked by Amazon Bot Detection" };
        }

      } catch (e) {
        // body could be large or protected, skip deep inspection
      }

      if (isSoft404) return { url, status: "broken", title: "Soft 404 / Page Not Found" };

      // Improved ASIN verification: If we had a target ASIN, we must see it in the final URL.
      const targetAsin = (asinMatch || finalAsinMatch)?.[1]?.toUpperCase();
      if (targetAsin) {
        // More flexible ASIN check in URL
        const asinInUrl = finalUrl.toUpperCase().includes(targetAsin);
        if (!asinInUrl) {
          return { url, status: "broken", finalUrl, title: "Redirected (ASIN missing in URL)" };
        }
      }

      // If we are strictly on a search page, it's NOT a specific product
      const isSearchPage = title.toLocaleLowerCase().includes("search results") || 
                          title.toLocaleLowerCase().includes("resultados de búsqueda") ||
                          finalUrl.includes("s?k=");

      if (isSearchPage) {
         return { url, status: "broken", finalUrl, title: "Redirected to Search" };
      }

      // We firmly require a product marker OR being on a confirmed product path with 200 OK
      if (response.ok && (isProductPage || (targetAsin && finalUrl.includes('/dp/')))) {
        return { url, status: "ok", finalUrl, title };
      }

      // Fallback for cases where page markers are translated or missing but results look valid
      if (response.ok && targetAsin && title.length > 5 && !isBotDetected) {
         return { url, status: "ok", finalUrl, title };
      }

      // If it's a 200 but nothing tells us it's a product, it's likely broken/search/category
      return { url, status: "broken", finalUrl, title: title || "Not a product page" };

      return { url, status: "error", finalUrl };
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    return { url, status: "error" };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }

    // Cap at 20 URLs per request for performance
    const urlsToCheck: string[] = urls.slice(0, 20);

    const settled = await Promise.allSettled(
      urlsToCheck.map(async (url: string) => await checkLink(url))
    );

    const results = settled.map((r, i) =>
      r.status === "fulfilled"
        ? r.value
        : { url: urlsToCheck[i], status: "error" as LinkStatus }
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("check-links error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
