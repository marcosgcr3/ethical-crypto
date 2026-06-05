"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * AdSense Lazy Loader
 * Delays loading the AdSense script until user interaction or a short delay.
 * This significantly improves initial PageSpeed scores (LCP, TBT, CLS).
 */
export default function AdSense() {
  const pathname = usePathname();
  const [loadAds, setLoadAds] = useState(false);

  useEffect(() => {
    // If the window is already scrolled, or if we want to force load
    if (window.scrollY > 0) {
      setLoadAds(true);
      return;
    }

    const handleInteraction = () => {
      setLoadAds(true);
      removeEventListeners();
    };

    const removeEventListeners = () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    // Listen for common user interactions
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    // Set a safety timeout of 3 seconds to ensure Google's CMP displays
    // even if the user doesn't immediately interact with the page.
    const safetyTimer = setTimeout(() => {
      setLoadAds(true);
      removeEventListeners();
    }, 3000);

    return () => {
      removeEventListeners();
      clearTimeout(safetyTimer);
    };
  }, []);

  // We return null and inject the script manually in the useEffect 
  // to avoid the 'data-nscript' attribute that AdSense doesn't support.
  useEffect(() => {
    if (loadAds) {
      const scriptId = "adsense-script";
      // Avoid duplicate injection
      if (document.getElementById(scriptId)) return;

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [loadAds]);

  useEffect(() => {
    if (!loadAds) return;

    const initializeAds = () => {
      try {
        const ads = document.querySelectorAll(".adsbygoogle:not([data-adsbygoogle-status])");
        const adsbygoogle = (window as any).adsbygoogle || [];
        ads.forEach((ad) => {
          ad.setAttribute("data-adsbygoogle-status", "reserved");
          adsbygoogle.push({});
        });
      } catch (e) {
        console.error("AdSense auto-push failed", e);
      }
    };

    // Run immediately and after a short timeout to handle page render delay
    initializeAds();
    const timer = setTimeout(initializeAds, 500);

    return () => clearTimeout(timer);
  }, [pathname, loadAds]);

  return null;
}
