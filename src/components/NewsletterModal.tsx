"use client";

import React, { useState } from "react";
import { useNewsletter } from "../context/NewsletterContext";
import { subscribeEmail } from "../app/actions/newsletter";

export default function NewsletterModal() {
  const { isOpen, closeModal } = useNewsletter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await subscribeEmail(email);
    if (res.success) {
      setStatus("success");
      setMessage(res.message || "");
      setTimeout(closeModal, 3000);
    } else {
      setStatus("error");
      setMessage(res.error || "");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 text-slate opacity-40 hover:opacity-100 transition-opacity z-10"
        >
          ✕
        </button>

        <div className="p-8 sm:p-12 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-bioblue/10 rounded-2xl text-bioblue text-3xl">
            📬
          </div>
          
          <h2 className="text-3xl font-extrabold text-bioblue uppercase tracking-tight mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-slate opacity-60 text-sm leading-relaxed mb-8">
            Get the latest peer-reviewed longevity research, functional health protocols, and wearable tech analysis delivered to your inbox every week.
          </p>

          {status === "success" ? (
            <div className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl font-bold text-sm animate-in slide-in-from-bottom-2 duration-300">
              ✅ {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-bioblue/20 transition-all font-medium"
              />
              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-bioblue text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-bioblue/20 hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe Now"}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-xs font-bold mt-2">{message}</p>
              )}
            </form>
          )}

          <p className="mt-8 text-[10px] text-slate opacity-30 uppercase font-bold tracking-widest">
            Privacy First. No spam. Ever.
          </p>
        </div>
      </div>
    </div>
  );
}
