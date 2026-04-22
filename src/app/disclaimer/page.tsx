import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial & Technology Disclaimer | Ethical Crypto',
  description: 'Essential disclaimer regarding protocol intelligence, financial research, and blockchain technology discussed on Ethical Crypto.',
};

export default function Disclaimer() {
  return (
    <article className="container mx-auto px-6 py-24 max-w-4xl bg-void text-ghost">
      <header className="mb-12 border-b border-black/10 pb-8">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-black uppercase tracking-tighter mb-4">
          Financial & Tech Disclaimer
        </h1>
        <p className="opacity-50 text-sm font-bold">Effective Date: April 2026</p>
      </header>
      <div className="prose prose-slate max-w-none space-y-6 text-dim leading-relaxed">
        <p>The information provided by Ethical Crypto (“we,” “us,” or “our”) on ethicalcrypto.com (the “Site”) is for educational and informational purposes only and does not constitute financial, investment, or legal advice.</p>
        
        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">No Financial Advice</h2>
        <p>The Site cannot and does not contain financial/investment advice. The cryptographic and protocol information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of investment advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Protocol & Technology Risk</h2>
        <p>Blockchain technology, smart contracts, and decentralized protocols are experimental and involve significant risk. Information on this website regarding protocols, staking, mining, hardware or security measures has not been evaluated by any financial authority. These systems are subject to bugs, exploits, and extreme volatility. You are solely responsible for your own research and security.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">External Links Disclaimer</h2>
        <p>The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>

      </div>
    </article>
  );
}
