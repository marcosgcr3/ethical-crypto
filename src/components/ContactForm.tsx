"use client";

import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('myklbrek');

  if (state.succeeded) {
    return (
      <div className="bg-zinc-50 border border-zinc-100 p-12 rounded-[2.5rem] shadow-inner animate-in fade-in zoom-in duration-500 text-center">
        <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-zinc-400 border border-zinc-100 shadow-sm">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="font-heading text-3xl font-black text-black mb-4 uppercase tracking-tighter">Transmission Successful</h2>
        <p className="text-zinc-500 mb-8 leading-relaxed font-medium">Your research inquiry has been securely transmitted to the Intelligence Unit. We will review your message and respond if required.</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-black font-black uppercase tracking-widest text-[10px] hover:underline decoration-2 underline-offset-8"
        >
          Send New Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-black opacity-40 mb-3" htmlFor="name">Name / Organization</label>
          <input 
            type="text" 
            id="name"
            name="name"
            required 
            className="w-full px-6 py-4 rounded-2xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/5 text-black bg-zinc-50 transition-all font-medium placeholder:text-zinc-300" 
            placeholder="Analytical Entity Name"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-2" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-black opacity-40 mb-3" htmlFor="email">Digital Terminal (Email)</label>
          <input 
            type="email" 
            id="email"
            name="email"
            required 
            className="w-full px-6 py-4 rounded-2xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/5 text-black bg-zinc-50 transition-all font-medium placeholder:text-zinc-300" 
            placeholder="terminal@protocol.ai"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-2" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-black opacity-40 mb-3" htmlFor="inquiryType">Inquiry Vector</label>
          <div className="relative">
            <select 
              id="inquiryType"
              name="inquiryType"
              className="w-full px-6 py-4 rounded-2xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/5 text-black bg-zinc-50 appearance-none transition-all font-bold"
            >
              <option value="Technical Correction">Technical Correction</option>
              <option value="Institutional Partnership">Institutional Partnership</option>
              <option value="General Research Question">General Research Question</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
            <ValidationError prefix="Inquiry Type" field="inquiryType" errors={state.errors} className="text-red-500 text-xs mt-2" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-black opacity-40 mb-3" htmlFor="message">Intelligence Requirements</label>
          <textarea 
            id="message"
            name="message"
            required 
            rows={5}
            className="w-full px-6 py-4 rounded-2xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/5 text-black bg-zinc-50 resize-none transition-all font-medium placeholder:text-zinc-300" 
            placeholder="Detailed requirements for research inquiry..."
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-2" />
        </div>
        
        {state.errors && (
          <p className="text-red-500 text-xs font-bold">Something went wrong. Please check your inputs or try again later.</p>
        )}

        <button 
          type="submit" 
          disabled={state.submitting}
          className="w-full bg-black text-white px-8 py-5 rounded-2xl font-black hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-[0.2em] text-[10px] shadow-xl"
        >
          {state.submitting ? 'Transmitting Data...' : 'Submit Intelligence Inquiry'}
        </button>
      </form>
    </div>
  );
}
