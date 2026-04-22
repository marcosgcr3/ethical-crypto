"use client";

import { useState } from "react";
import Link from "next/link";
import GlobalLinkScanner from "./GlobalLinkScanner";
import { logoutAction } from "../app/ec-protocol-portal/login/actions";

interface AdminToolsProps {
  articles: any[];
}

export default function AdminTools({ articles }: AdminToolsProps) {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
        <button 
            onClick={() => setShowScanner(true)}
            className="w-full text-center sm:w-auto bg-[#0A0D11] text-white/60 px-6 py-3 rounded-lg font-black hover:text-white border border-white/5 hover:border-white/30 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
        >
            🔗 Scan Deep Links
        </button>

        <Link 
            href="/ec-protocol-portal/editor/new" 
            className="w-full text-center sm:w-auto bg-white text-black px-6 py-3 rounded-lg font-black hover:bg-zinc-200 transition-all uppercase tracking-widest text-[10px] shadow-lg"
        >
            + Create New Protocol
        </Link>
        
        <form action={logoutAction} className="w-full sm:w-auto">
            <button type="submit" className="w-full sm:w-auto text-white/30 hover:text-red-500 font-black uppercase tracking-widest text-[9px] px-5 py-3 border border-white/5 rounded-lg hover:border-red-500/30 transition-colors">
                Terminate Session
            </button>
        </form>
      </div>

      {showScanner && (
        <GlobalLinkScanner 
          articles={articles} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </>
  );
}
