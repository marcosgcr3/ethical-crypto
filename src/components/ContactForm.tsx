"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('Clinical Correction');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mwvwwjnn', {
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
      <div className="bg-white border border-bioblue/10 p-12 rounded-3xl shadow-xl shadow-bioblue/5 animate-in fade-in zoom-in duration-500 text-center">
        <div className="bg-bioblue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-bioblue">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="font-heading text-3xl font-extrabold text-bioblue mb-4 uppercase tracking-tighter">Protocol Received</h2>
        <p className="text-slate/70 mb-8 leading-relaxed">Your message has been securely transmitted. Our editorial team will review your inquiry and respond to <strong>{email}</strong> if required.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-bioblue font-bold uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate opacity-70 mb-2">Name</label>
          <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bioblue/50 text-slate bg-gray-50 transition-all" 
            placeholder="Name or Organization"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate opacity-70 mb-2">Email Address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bioblue/50 text-slate bg-gray-50 transition-all" 
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate opacity-70 mb-2">Inquiry Type</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bioblue/50 text-slate bg-gray-50 appearance-none transition-all"
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
          >
            <option>Clinical Correction</option>
            <option>Partnership</option>
            <option>General Question</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate opacity-70 mb-2">Message</label>
          <textarea 
            required 
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bioblue/50 text-slate bg-gray-50 resize-none transition-all" 
            placeholder="Details of your inquiry..."
          />
        </div>
        
        {status === 'error' && (
          <p className="text-red-500 text-xs font-bold">Something went wrong. Please try again or email us directly.</p>
        )}

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-bioblue text-white px-6 py-4 rounded-xl font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-xs shadow-md"
        >
          {status === 'submitting' ? 'Transmitting...' : 'Send Secure Message'}
        </button>
      </form>
    </div>
  );
}
