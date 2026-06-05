"use client";

import AdBanner from "./AdBanner";

export default function StickyRails() {
  return (
    <>
      {/* Left Rail Ad */}
      <div className="sticky-rail-left">
        <AdBanner format="vertical" className="!my-0 scale-90 origin-top-left" />
      </div>

      {/* Right Rail Ad */}
      <div className="sticky-rail-right">
        <AdBanner format="vertical" className="!my-0 scale-90 origin-top-right" />
      </div>
    </>
  );
}
