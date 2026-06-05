"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  format: "vertical" | "horizontal" | "square" | "in-article";
  className?: string;
}

const SLOT_IDS = {
  vertical: "3186334132",
  horizontal: "4050891498",
  square: "1477800098",
  "in-article": "2997353521",
};

export default function AdBanner({ format, className }: AdBannerProps) {
  const [consent, setConsent] = useState<string | null>(null);
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Read consent from localStorage
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
    if (consent !== "accepted") return;
    if (initialized.current) return;

    // Check if the ad block DOM element is mounted
    if (!adRef.current) return;

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      initialized.current = true;
    } catch (err) {
      console.error("AdSense slot initialization failed", err);
    }
  }, [consent]);

  if (consent !== "accepted") {
    // Hide entirely if consent isn't accepted
    return null;
  }

  const slotId = SLOT_IDS[format];

  // Tailored styling for the layout contexts
  let containerClasses = "w-full overflow-hidden flex flex-col items-center justify-center";
  let wrapperClasses = "w-full flex justify-center bg-zinc-50/50 p-4 rounded-[2rem] border border-black/5";
  let style: React.CSSProperties = { display: "block" };

  if (format === "vertical") {
    containerClasses = "w-full lg:w-80 overflow-hidden flex flex-col items-center justify-start py-2";
    wrapperClasses = "w-full flex justify-center bg-zinc-50/50 p-4 rounded-[2.5rem] border border-black/5 min-h-[600px] sticky top-36";
    style = { display: "block", minHeight: "600px" };
  } else if (format === "horizontal") {
    containerClasses = "w-full overflow-hidden flex flex-col items-center justify-center py-6";
    wrapperClasses = "w-full flex justify-center bg-zinc-50/50 p-4 rounded-[2.5rem] border border-black/5 min-h-[100px]";
    style = { display: "block", minHeight: "100px" };
  } else if (format === "square") {
    containerClasses = "w-full h-full overflow-hidden flex flex-col items-center justify-center";
    wrapperClasses = "w-full h-full flex items-center justify-center bg-zinc-50/50 p-6 rounded-[3rem] border border-black/5 min-h-[300px] hover:border-zinc-200 hover:shadow-2xl transition-all duration-500";
    style = { display: "block", width: "100%", height: "100%", minHeight: "250px" };
  } else if (format === "in-article") {
    containerClasses = "w-full overflow-hidden flex flex-col items-center justify-center my-8";
    wrapperClasses = "w-full flex justify-center bg-zinc-50/50 p-4 rounded-[2.5rem] border border-black/5";
    style = { display: "block", textAlign: "center" };
  }

  return (
    <div className={`${containerClasses} ${className || ""}`}>
      <span className="text-[9px] text-black/30 font-black uppercase tracking-[0.2em] mb-3 select-none">
        Advertisement
      </span>
      <div className={wrapperClasses}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={style}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-8889459576747982"}
          data-ad-slot={slotId}
          data-ad-format={format === "in-article" ? "fluid" : (format === "square" ? "rectangle" : "auto")}
          {...(format === "in-article" && { "data-ad-layout": "in-article" })}
          {...(format !== "in-article" && { "data-full-width-responsive": "true" })}
        />
      </div>
    </div>
  );
}
