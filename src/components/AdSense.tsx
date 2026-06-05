"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * AdSense Lazy Loader
 * Delays loading the AdSense script until user interaction or a short delay,
 * AND only loads if the user has accepted cookie consent.
 * This significantly improves initial PageSpeed scores (LCP, TBT, CLS).
 */
export default function AdSense() {
  const pathname = usePathname();
  const [loadAds, setLoadAds] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    // Read initial consent from localStorage on client mount
    if (typeof window !== "undefined") {
      setConsent(localStorage.getItem("crypto-consent-v2"));
    }

    const handleConsentUpdate = () => {
      setConsent(localStorage.getItem("crypto-consent-v2"));
    };

    window.addEventListener("crypto-consent-updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("crypto-consent-updated", handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    // Only set up interaction listeners if consent is accepted
    if (consent !== "accepted") {
      setLoadAds(false);
      return;
    }

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

    return () => {
      removeEventListeners();
    };
  }, [consent]);

  // We return null and inject the script manually in the useEffect 
  // to avoid the 'data-nscript' attribute that AdSense doesn't support.
  useEffect(() => {
    if (loadAds && consent === "accepted") {
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
  }, [loadAds, consent]);

  useEffect(() => {
    if (consent !== "accepted" || !loadAds) return;

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
  }, [pathname, consent, loadAds]);

  return null;
}
