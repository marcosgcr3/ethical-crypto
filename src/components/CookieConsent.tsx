"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("crypto-consent-v2");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: "accepted" | "declined") => {
    localStorage.setItem("crypto-consent-v2", type);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-6 inset-x-4 md:inset-x-10 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-700"
      role="region"
      aria-label="Cookie Consent"
    >
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-2xl border border-black/10 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-8 relative">
        
        {/* Close Button */}
        <button 
          onClick={() => setShowBanner(false)}
          className="absolute top-4 right-6 text-black/20 hover:text-black transition-colors p-2"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          
          {/* Icon Area */}
          <div className="hidden md:flex bg-black/5 p-4 rounded-2xl shrink-0">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Content Area */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h3 className="font-heading font-extrabold text-sm md:text-base text-black uppercase tracking-widest">Cookie Settings</h3>
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-black/60 text-[11px] md:text-sm leading-relaxed max-w-3xl">
              We use cookies to enhance your protocol research, serve personalized content, and analyze our network traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies for optimized protocol intelligence. Read our <Link href="/privacy" className="text-black font-bold underline hover:no-underline transition-all">Privacy Policy</Link> for more details.
            </p>
          </div>

          {/* Actions Area */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => handleConsent("declined")}
              className="flex-1 md:flex-none border border-black/10 text-black/60 px-8 py-3.5 rounded-full font-bold hover:bg-black/5 transition-all text-[10px] md:text-xs uppercase tracking-widest"
            >
              Reject All
            </button>
            <button 
              onClick={() => handleConsent("accepted")}
              className="flex-1 md:flex-none bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-zinc-800 shadow-lg hover:shadow-black/20 transition-all text-[10px] md:text-xs uppercase tracking-widest"
            >
              Accept All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
