"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * AdSense Lazy Loader
 * Delays loading the AdSense script until user interaction or a short delay.
 * This significantly improves initial PageSpeed scores (LCP, TBT, CLS).
 */
export default function AdSense() {
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

    // Auto-load after 6.5 seconds if no interaction
    const timer = setTimeout(() => {
        setLoadAds(true);
        removeEventListeners();
    }, 6500);

    // Listen for common user interactions
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      removeEventListeners();
    };
  }, []);

  // We return null and inject the script manually in the useEffect 
  // to avoid the 'data-nscript' attribute that AdSense doesn't support.
  useEffect(() => {
    if (loadAds) {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8889459576747982";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [loadAds]);

  return null;
}
