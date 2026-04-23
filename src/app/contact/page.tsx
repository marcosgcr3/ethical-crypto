import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact the Research Team | Ethical Crypto',
  description: 'Connect with the Ethical Crypto editorial and protocol research board. Report inaccuracies or inquire about technical partnerships.',
};

export default function ContactUs() {
  return (
    <article className="container mx-auto px-6 py-24 max-w-4xl bg-white text-black font-sans">
      <header className="mb-16 border-b border-black/10 pb-8 text-center md:text-left">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-black uppercase tracking-tighter mb-4">
          Protocol <span className="opacity-30">Support</span>
        </h1>
        <p className="opacity-50 font-bold uppercase text-xs tracking-widest">Connect with the Ethical Crypto editorial and research team.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-heading text-2xl font-bold mb-6 text-black uppercase tracking-tight">Get in Touch</h2>
          <p className="text-zinc-500 mb-8 leading-relaxed font-medium">
            Whether you have a question about a specific protocol audit, want to report a technical inaccuracy, or are interested in research partnerships, our team is ready to assist you.
          </p>

          <div className="space-y-8">
            <div className="flex items-start group">
              <div className="bg-black/5 p-4 rounded-xl mr-4 text-black group-hover:bg-black group-hover:text-white transition-all cursor-copy">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-widest text-[10px] mb-1 text-black">General & Research</h3>
                <p className="opacity-50 text-sm font-bold">ethicalcrypto@outlook.es</p>
              </div>
            </div>

            <div className="flex items-start group text-black/30">
               <div className="bg-black/5 p-4 rounded-xl mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-widest text-[10px] mb-1">Security Warning</h3>
                <p className="text-[10px] leading-relaxed max-w-[250px] font-medium">We cannot provide personalized investment advice or technical support for third-party protocol exploits via this channel.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/5 p-1 rounded-[2.5rem]">
           <ContactForm />
        </div>
      </div>
    </article>
  );
}
