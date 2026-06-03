"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function GoogleAnalytics({ gaId: propGaId }: { gaId?: string }) {
  const gaId = propGaId || process.env.NEXT_PUBLIC_GA_ID;
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

  if (!gaId || consent !== "accepted") return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
