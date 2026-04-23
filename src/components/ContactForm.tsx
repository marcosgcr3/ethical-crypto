"use client";

"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('Technical Correction');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mbdqpnvz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          inquiryType,
          message
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-zinc-50 border border-zinc-100 p-12 rounded-[2.5rem] shadow-inner animate-in fade-in zoom-in duration-500 text-center">
        <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-zinc-400 border border-zinc-100 shadow-sm">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="font-heading text-3xl font-black text-black mb-4 uppercase tracking-tighter">Transmission Successful</h2>
        <p className="text-zinc-500 mb-8 leading-relaxed font-medium">Your research inquiry has been securely transmitted to the Intelligence Unit. We will review your message and respond to <strong>{email}</strong> if required.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-black font-black uppercase tracking-widest text-[10px] hover:underline decoration-2 underline-offset-8"
        >
          Send New Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-black opacity-40 mb-3" htmlFor="name">Name / Organization</label>
          <input 
            type="text" 
            id="name"
            name="name"
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/5 text-black bg-zinc-50 resize-none transition-all font-medium placeholder:text-zinc-300" 
            placeholder="Detailed requirements for research inquiry..."
          />
        </div>
        
        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-xl text-xs font-bold">
            <p className="mb-2">Transmission failed. Please check your inputs or try again later.</p>
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-black text-white px-8 py-5 rounded-2xl font-black hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-[0.2em] text-[10px] shadow-xl"
        >
          {status === 'submitting' ? 'Transmitting Data...' : 'Submit Intelligence Inquiry'}
        </button>
      </form>
    </div>
  );
}
