"use client";

import { useEffect, useState } from "react";
import AdBanner from "./AdBanner";

export default function StickyRails() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
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

  if (consent !== "accepted") return null;

  return (
    <>
      {/* Left Rail Ad - Positioning dynamically relative to content center */}
      <div 
        className="fixed top-44 z-40 hidden 2xl:flex flex-col items-center select-none"
        style={{
          left: "calc(50vw - 576px - 190px)", // content is max-w-6xl (1152px / 2 = 576px) plus spacing
        }}
      >
        <AdBanner format="vertical" className="!my-0 scale-90 origin-top-left" />
      </div>

      {/* Right Rail Ad */}
      <div 
        className="fixed top-44 z-40 hidden 2xl:flex flex-col items-center select-none"
        style={{
          right: "calc(50vw - 576px - 190px)",
        }}
      >
        <AdBanner format="vertical" className="!my-0 scale-90 origin-top-right" />
      </div>
    </>
  );
}
