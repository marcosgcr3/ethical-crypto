"use client";

import Link from "next/link";
import { logoutAction } from "../app/ec-protocol-portal/login/actions";

interface AdminToolsProps {
  articles: any[];
}

export default function AdminTools({ articles }: AdminToolsProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
        <Link 
            href="/ec-protocol-portal/editor/new" 
            className="w-full text-center sm:w-auto bg-black text-white px-6 py-3 rounded-lg font-black hover:bg-zinc-800 transition-all uppercase tracking-widest text-[10px] shadow-lg"
        >
            + Create New Protocol
        </Link>
        
        <form action={logoutAction} className="w-full sm:w-auto">
            <button type="submit" className="w-full sm:w-auto text-black/30 hover:text-red-600 font-black uppercase tracking-widest text-[9px] px-5 py-3 border border-black/5 rounded-lg hover:border-red-600/30 transition-colors">
                Terminate Session
            </button>
        </form>
      </div>
    </>
  );
}
