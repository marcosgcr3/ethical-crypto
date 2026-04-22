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
    <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mb-12">
      <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
        <div>
          <h2 className="text-xl font-extrabold text-bioblue uppercase tracking-tight flex items-center gap-3">
            <span className="p-2 bg-bioblue/10 rounded-xl text-lg">📈</span>
            Newsletter Analytics
          </h2>
          <p className="text-sm opacity-60 mt-1 font-medium">Monitoring your community growth and reach.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-black text-slate leading-none">{subscribers.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-bioblue mt-1">Total Subscribers</div>
          </div>
          <button 
            onClick={() => setShowEmails(!showEmails)}
            className="bg-white border-2 border-bioblue/20 text-bioblue px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-bioblue/40 transition-all shadow-sm"
          >
            {showEmails ? "Hide Details" : "View Emails"}
          </button>
        </div>
      </div>

      {showEmails && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-slate opacity-40 border-b border-gray-100">
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-center">Email Address</th>
                <th className="px-8 py-4 text-right">Signup Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-16 text-center text-sm font-medium opacity-40 italic">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_10px_rgba(16,185,129,0.3)]"></span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate text-center group-hover:text-bioblue transition-colors">
                      {sub.email}
                    </td>
                    <td className="px-8 py-5 text-[10px] font-black text-slate/40 text-right uppercase tracking-wider">
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
          
          <div className="p-4 bg-gray-50/50 text-center border-t border-gray-100">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate opacity-30">
              End of list • Standard GDPR Compliance Active
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
