"use client";

import React, { useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  createdAt: Date;
}

export default function AdminSubscribers({ initialSubscribers }: { initialSubscribers: Subscriber[] }) {
  const [showEmails, setShowEmails] = useState(false);
  const subscribers = initialSubscribers;

  return (
    <div className="bg-[#0A0D11] rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.3)] border border-white/5 overflow-hidden mb-12">
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#05070A]">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span className="p-2 bg-white/5 rounded-xl text-lg">📈</span>
            Newsletter Analytics
          </h2>
          <p className="text-white/40 text-sm opacity-60 mt-1 font-medium">Monitoring your community growth and reach.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-black text-white leading-none">{subscribers.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">Total Subscribers</div>
          </div>
          <button 
            onClick={() => setShowEmails(!showEmails)}
            className="bg-[#0A0D11] border border-white/10 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all shadow-sm"
          >
            {showEmails ? "Hide Details" : "View Emails"}
          </button>
        </div>
      </div>

      {showEmails && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#05070A] text-[10px] font-bold uppercase tracking-[0.2em] text-white opacity-40 border-b border-white/5">
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Email Address</th>
                <th className="px-8 py-4 text-right">Signup Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-16 text-center text-sm font-medium opacity-40 italic">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_10px_rgba(16,185,129,0.2)]"></span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-white text-center group-hover:text-white transition-colors">
                      {sub.email}
                    </td>
                    <td className="px-8 py-5 text-[10px] font-black text-white/30 text-right uppercase tracking-wider">
                      {new Date(sub.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          <div className="p-4 bg-[#05070A] text-center border-t border-white/5">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white opacity-20">
              End of list • Standard GDPR Compliance Active
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
