"use client";

import React from "react";
import { useNewsletter } from "../context/NewsletterContext";

interface NewsletterSidebarProps {
  layout?: "sidebar" | "mobile";
}

export default function NewsletterSidebar({ layout = "sidebar" }: NewsletterSidebarProps) {
  const { openModal } = useNewsletter();

  if (layout === "mobile") {
    return (
      <div className="lg:hidden bg-zinc-50 border border-zinc-100 p-8 rounded-[2rem] text-black mb-8 shadow-sm">
        <h3 className="font-heading text-lg font-black mb-2 uppercase tracking-tighter text-black">Protocol Alpha</h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-medium">
          Get institutional-grade research and protocol intelligence delivered monthly.
        </p>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Network ID (Email)"
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-zinc-200 text-black placeholder-zinc-300 text-xs focus:outline-none focus:ring-1 focus:ring-black/5"
          />
          <button
            onClick={openModal}
            className="w-full bg-black text-white px-4 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all shadow-md"
          >
            Access Terminal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 border border-zinc-100 p-10 rounded-[3rem] text-black shadow-sm relative overflow-hidden group">
      <h3 className="font-heading text-2xl font-black mb-4 uppercase tracking-tighter text-black">Join the <span className="text-zinc-400">Protocol</span> Network</h3>
      <p className="text-sm text-zinc-500 leading-relaxed mb-8 font-medium">
        Deep-dive research into decentralized architectures and wealth engineering.
      </p>
      <input
        type="email"
        placeholder="Network ID (Email)"
        className="w-full px-5 py-4 rounded-2xl bg-white border border-zinc-200 text-black placeholder-zinc-300 text-xs focus:outline-none focus:ring-1 focus:ring-black/5 mb-4 shadow-inner"
      />
      <button
        onClick={openModal}
        className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all shadow-lg"
      >
        Request Access
      </button>
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Archive Live</span>
      </div>
    </div>
  );
}
