"use client";

export default function ContactForm() {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <form action="https://formspree.io/f/mbdqpnvz" method="POST" className="space-y-6">
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
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-black text-white px-8 py-5 rounded-2xl font-black hover:bg-zinc-800 transition-all uppercase tracking-[0.2em] text-[10px] shadow-xl"
        >
          Submit Intelligence Inquiry
        </button>
      </form>
    </div>
  );
}
