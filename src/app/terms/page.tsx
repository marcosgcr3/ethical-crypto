import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service | Ethical Crypto',
  description: 'Review the legal terms and conditions for using the Ethical Crypto research platform and its services.',
};

export default function TermsOfService() {
  return (
    <article className="container mx-auto px-6 py-24 max-w-4xl bg-void text-ghost">
      <header className="mb-12 border-b border-black/10 pb-8">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-black uppercase tracking-tighter mb-4">
          Terms of Service
        </h1>
        <p className="opacity-50 text-sm font-bold">Effective Date: April 2026</p>
      </header>
      <div className="prose prose-slate max-w-none space-y-6 text-dim leading-relaxed">
        <p>Welcome to Ethical Crypto!</p>
        <p>These terms and conditions outline the rules and regulations for the use of Ethical Crypto's Website, located at ethicalcrypto.com.</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Ethical Crypto if you do not agree to take all of the terms and conditions stated on this page.</p>
        
        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Cookies</h2>
        <p>We employ the use of cookies. By accessing Ethical Crypto, you agreed to use cookies in agreement with the Ethical Crypto's Privacy Policy and Cookie Policy.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">License</h2>
        <p>Unless otherwise stated, Ethical Crypto and/or its licensors own the intellectual property rights for all material on Ethical Crypto. All intellectual property rights are reserved.</p>
        <p>You must not:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li>Republish material from Ethical Crypto</li>
            <li>Sell, rent or sub-license material from Ethical Crypto</li>
            <li>Reproduce, duplicate or copy material from Ethical Crypto</li>
            <li>Redistribute content from Ethical Crypto</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Financial & Technology Disclaimer</h2>
        <p>The content provided on Ethical Crypto is for informational and educational purposes only. It is not intended to be a substitute for professional financial or investment advice. Blockchain technology and crypto assets involve significant risk.</p>
        <p>For more information, please see our full <a href="/disclaimer" className="text-black underline font-bold">Financial Disclaimer</a>.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Affiliate Disclosure</h2>
        <p>Ethical Crypto participates in various affiliate marketing programs. This means we may get paid commissions on products purchased through our links to retailer sites. For more information, see our <a href="/affiliate-disclosure" className="text-black underline font-bold">Affiliate Disclosure</a>.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Hyperlinking to our Content</h2>
        <p>The following organizations may link to our Website without prior written approval: Government agencies, Search engines, News organizations, Online directory distributors.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Limitation of Liability</h2>
        <p>In no event shall Ethical Crypto, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website. Ethical Crypto shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Governing Law</h2>
        <p>These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which Ethical Crypto operates.</p>
      </div>
    </article>
  );
}
