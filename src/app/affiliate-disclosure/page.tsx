import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | Ethical Crypto Transparency',
  description: 'Understand how Ethical Crypto maintains research independence while utilizing affiliate partnerships to fund ongoing protocol analysis.',
};

export default function AffiliateDisclosure() {
  return (
    <article className="container mx-auto px-6 py-24 max-w-4xl bg-white text-black font-sans">
      <header className="mb-12 border-b border-black/10 pb-8">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-black uppercase tracking-tighter mb-4">
          Affiliate Disclosure
        </h1>
        <p className="opacity-50 text-sm font-bold">Effective Date: April 2026</p>
      </header>
      <div className="prose prose-zinc max-w-none space-y-6 text-zinc-500 leading-relaxed font-medium">
        <p>In compliance with the FTC guidelines, please assume the following about links and posts on this website:</p>
        
        <h2 className="font-heading text-2xl font-black mt-8 mb-4 text-black uppercase tracking-tight">What is an Affiliate Link?</h2>
        <p>Many of the links on ethicalcrypto.com are affiliate links. This means that a special tracking code is used and that we may make a small commission on the sale of an item if you purchase through one of these links. The price of the item is the same for you whether it is an affiliate link or not, and using affiliate links helps us to maintain this website and support our ongoing protocol research.</p>

        <h2 className="font-heading text-2xl font-black mt-8 mb-4 text-black uppercase tracking-tight">Recommendation Standards</h2>
        <p>We only recommend products or services (such as hardware wallets, security tools, or nodes) that we have thoroughly researched and believe will provide value to our readers. Our priority is always to provide high-quality protocol intelligence to help you in your digital journey.</p>

        <h2 className="font-heading text-2xl font-black mt-8 mb-4 text-black uppercase tracking-tight">Copyright and Rights Reserved</h2>
        <p>All of the information on this website, including images, text, and other forms of content is Copyright © Ethical Crypto 2026 and may not be reproduced or republished without express written permission.</p>

        <h2 className="font-heading text-2xl font-black mt-8 mb-4 text-black uppercase tracking-tight">Contact</h2>
        <p>If you have any questions regarding this disclosure, please feel free to <a href="/contact" className="text-black underline font-bold">contact us</a>.</p>
      </div>
    </article>
  );
}
