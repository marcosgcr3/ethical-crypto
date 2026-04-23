"use client";

import { useTransition, useState } from "react";
import { loginAction } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      setError(null);
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center -mt-20 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] border border-gray-100 text-center">
        <Link href="/" className="inline-block text-black font-bold uppercase tracking-[0.2em] mb-8 text-xl">
          E<span className="opacity-50">/</span>B
        </Link>
        <h1 className="font-heading text-2xl font-extrabold text-slate uppercase tracking-tight mb-2">
          Administrator Mode
        </h1>
        <p className="text-slate/60 text-sm mb-8">Enter the secure password to manage content.</p>

        {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest p-3 rounded-lg border border-red-100 mb-6 shadow-sm">
              {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate opacity-70 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required
              placeholder="••••••••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/50 text-slate text-center tracking-widest bg-gray-50" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-black text-white px-6 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all uppercase tracking-widest text-sm shadow-md disabled:opacity-50"
          >
            {isPending ? "Validating..." : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}
