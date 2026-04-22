import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protocol Guidelines & Research Standards | Ethical Crypto',
  description: 'Our commitment to technical integrity, on-chain evidence, and the secure optimization of digital wealthspan.',
};

export default function EthicalGuidelines() {
  return (
    <article className="container mx-auto px-6 py-24 max-w-4xl bg-void text-ghost">
      <header className="mb-12 border-b border-black/10 pb-8">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-black uppercase tracking-tighter mb-4">
          Protocol Guidelines & Standards
        </h1>
        <p className="opacity-50 font-bold uppercase text-xs tracking-widest">Our commitment to cryptographic integrity and secure optimization.</p>
      </header>
      <div className="prose prose-slate max-w-none space-y-6 text-dim leading-relaxed">
        <p className="text-lg">
          The crypto space has unfortunately been saturated by hype-driven marketing, predatory tokenomics, and insecure protocols. <strong>Our platform reclaims this frontier.</strong> We define Ethical Crypto as the systematic, data-driven optimization of digital assets, constrained by technical validity and decentralized security.
        </p>

        <p>To maintain absolute integrity, our research board and security analysts strictly adhere to the following core tenets:</p>

        <div className="bg-black/5 border-l-4 border-black shadow-sm p-8 rounded-r-3xl my-10">
          <h2 className="font-heading text-xl font-bold mb-4 text-black uppercase tracking-tight">1. Security First (Primum Non Nocere)</h2>
          <p className="m-0 text-dim">
            We will never recommend, highlight, or endorse any protocol, smart contract, or platform that carries a high risk of catastrophic failure, un-audited vulnerabilities, or predatory centralization. Experimental "ponzi-nomics" and un-verified contracts are strictly prohibited on this platform.
          </p>
        </div>

        <div className="bg-black/5 border-l-4 border-black shadow-sm p-8 rounded-r-3xl my-10">
          <h2 className="font-heading text-xl font-bold mb-4 text-black uppercase tracking-tight">2. Mandate of On-Chain Evidence</h2>
          <p className="m-0 text-dim">
            Every major claim, yield projection, or protocol mechanism discussed in our research must be backed by verifiable on-chain data and cryptographic proof. We prioritize audited open-source repositories and time-tested protocols over speculative whitepapers or closed-source systems.
          </p>
        </div>

        <div className="bg-black/5 border-l-4 border-black shadow-sm p-8 rounded-r-3xl my-10">
          <h2 className="font-heading text-xl font-bold mb-4 text-black uppercase tracking-tight">3. Technical Transparency</h2>
          <p className="m-0 text-dim">
            While we utilize affiliate programs to fund our deep-dive research and server costs, financial incentives <strong>never</strong> dictate our content. We only link to tools, exchanges, or hardware wallets that our team has technically vetted for security, privacy, and custodial integrity.
          </p>
        </div>

        <div className="bg-black/5 border-l-4 border-black shadow-sm p-8 rounded-r-3xl my-10">
          <h2 className="font-heading text-xl font-bold mb-4 text-black uppercase tracking-tight">4. Democratization of Wealthspan</h2>
          <p className="m-0 text-dim">
            We believe financial sovereignty is a fundamental right. We will always prioritize secure, self-custodial, and decentralized solutions that empower the individual rather than centralized intermediaries that introduce counterparty risk.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-12 mb-4 text-black uppercase tracking-tight">Reporting Vulnerabilities</h2>
        <p>
          If you are a security researcher or protocol developer and believe a piece of our research misinterprets technical data or highlights an insecure protocol, we urge you to contact us immediately for technical review.
        </p>
      </div>
    </article>
  );
}
