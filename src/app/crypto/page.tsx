import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Crypto Intelligence: The Ultimate Guide to Protocol Mastery',
  description: 'What is protocol intelligence? Master the digital frontier with our comprehensive guide to wealthspan, network fundamentals, blockchain security, and hardware verification.',
  alternates: {
    canonical: 'https://ethicalcrypto.com/crypto',
  },
  openGraph: {
    title: 'Crypto Intelligence: The Ultimate Guide to Protocol Mastery',
    description: 'What is protocol intelligence? The definitive framework for wealthspan engineering, network fundamentals, and hardware security.',
    url: 'https://ethicalcrypto.com/crypto',
    siteName: 'Ethical Crypto',
    images: [
      {
        url: 'https://ethicalcrypto.com/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Ethical Crypto Intelligence Guide 2026',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Intelligence: Master the Digital Frontier (2026)',
    description: 'The definitive framework for extending your wealthspan and achieving peak protocol performance.',
    site: '@ethicalcrypto',
    creator: '@ethicalcrypto',
    images: ['https://ethicalcrypto.com/images/hero.png'],
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function CryptoPillarPage() {
  // Fetch a few featured articles to show authority
  let featuredArticles: any[] = [];
  
  try {
    featuredArticles = await prisma.article.findMany({
      where: { published: true, category: 'wealthspan' },
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Database fetch failed for Crypto pillar page.", error);
  }

  // FAQ data for both the visible section and the JSON-LD schema
  const faqItems = [
    {
      question: 'What is protocol intelligence?',
      answer: 'Protocol intelligence is the practice of using data, code analysis, and system experimentation to take full control of your digital assets. It combines insights from DeFi, network fundamentals, security protocols, and hardware verification to systematically optimize wealthspan and asset growth.'
    },
    {
      question: 'Is crypto investing safe?',
      answer: 'Ethical crypto engagement is safe when practiced with a security-first, evidence-based approach. The key principle is verification: applying precise, data-driven analysis to smart contracts and protocol mechanics. Start with cold storage, diversify across established networks, and perform deep due diligence before adopting complex DeFi strategies.'
    },
    {
      question: 'What are the best crypto strategies for beginners?',
      answer: 'Top beginner strategies include: securing assets with hardware wallets, dollar-cost averaging (DCA) into core protocols like Ethereum and Bitcoin, participating in native staking for network security, and utilizing reputable analytics tools to monitor network hash rates and validator health.'
    },
    {
      question: 'How much does it cost to start in DeFi?',
      answer: 'Starting in DeFi ranges from low-cost L2 interactions to high-tier institutional staking. Basic network participation is accessible with minimal capital. Mid-range investments involve hardware wallets ($100–$200) and initial capital for gas and staking. Advanced engagement may involve running nodes or complex liquidity provisioning.'
    }
  ];

  // JSON-LD Structured Data
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Crypto Intelligence: Protocol Mastery Guide (2026)',
    description: 'Master the digital frontier with our guide to wealthspan, network fundamentals, and blockchain security.',
    url: 'https://ethicalcrypto.com/crypto',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Ethical Crypto',
      url: 'https://ethicalcrypto.com'
    }
  };

  return (
    <div className="bg-white min-h-screen text-black selection:bg-black selection:text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-6" aria-label="Breadcrumb">
        <ol className="flex items-center text-[10px] md:text-[11px] font-black uppercase tracking-widest text-zinc-300">
          <li>
            <Link href="/" className="hover:text-black transition-colors">Terminal</Link>
          </li>
          <li className="mx-2 opacity-20">/</li>
          <li className="text-black" aria-current="page">Protocol Guide</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-zinc-50 border-b border-black/5">
        <Image 
          src="/api/images/supabase/hero-v2.png" 
          alt="Crypto intelligence dashboard" 
          fill 
          className="object-cover opacity-10 contrast-[1.1]"
          priority
          fetchPriority="high"
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-500 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
            Institutional Research 2026
          </span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tighter uppercase max-w-5xl mx-auto text-black">
            Crypto Intelligence: The Ultimate <span className="text-zinc-500">Protocol Guide</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-zinc-700 max-w-3xl mx-auto leading-relaxed">
            The technical framework for systematically engineering your wealthspan, securing your privacy, and achieving peak protocol performance.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Article Content */}
          <div className="lg:w-2/3 space-y-16">
            
            {/* 1. What is Protocol Intelligence? */}
            <section id="what-is-crypto" className="scroll-mt-32">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-black mb-8 border-l-8 border-black pl-6 uppercase tracking-tighter">
                What is Protocol Intelligence?
              </h2>
              <div className="prose prose-zinc lg:prose-xl max-w-none text-zinc-600 leading-relaxed font-medium">
                <p>
                  At its core, <strong>protocol intelligence</strong> is the practice of using technical analysis, on-chain data, and architectural experimentation to take control of your digital footprint. It is a mindset that refuses to accept centralized reliance as the default. Instead, intelligent actors view the blockchain as a programmable global state machine—a layer of digital sovereignty that can be optimized for long-term <strong>Wealthspan</strong>.
                </p>
                
                <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl my-10 shadow-inner">
                  <h3 className="font-heading text-xl font-black text-black mb-4 uppercase tracking-tight">The Ethical Crypto Definition</h3>
                  <p className="text-base italic m-0 border-l-4 border-black/10 pl-4 text-zinc-500">
                    "Protocol intelligence is the art of mastering the systems you participate in. It is not about gambling; it is about engineering a sovereign digital future with the most robust tools and data available in the decentralized space."
                  </p>
                </div>

                <p>
                  By measuring network indicators (hash rates, validator decentralization, smart contract audits), we identify systemic alpha—areas where protocols are undervalued or misread due to market noise—and apply targeted strategies to capture that value.
                </p>
              </div>
            </section>

            {/* 2. The 4 Pillars */}
            <section id="pillars">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-black mb-12 uppercase tracking-tighter">
                The Four Pillars of Ethical Crypto
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                
                {/* Pillar: Wealthspan */}
                <Link href="/wealthpumps" className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 hover:border-black/10 hover:shadow-2xl transition-all duration-300 group block">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors border border-zinc-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <h3 className="font-heading text-2xl font-black text-black mb-4 uppercase tracking-tighter">WealthPumps</h3>
                  <p className="text-sm text-zinc-500 mb-6 leading-relaxed font-medium">Focusing on yield generation, staking infrastructure, and protocol participation to ensure your assets outpace technological shifts and inflation.</p>
                  <div className="text-black font-black text-[10px] uppercase tracking-widest flex items-center group-hover:opacity-60 transition-opacity">
                    Explore WealthPumps
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </Link>

                {/* Pillar: Security */}
                <Link href="/security" className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 hover:border-black/10 hover:shadow-2xl transition-all duration-300 group block">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors border border-zinc-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                  <h3 className="font-heading text-2xl font-black text-black mb-4 uppercase tracking-tighter">Security/Wallets</h3>
                  <p className="text-sm text-zinc-500 mb-6 leading-relaxed font-medium">The non-negotiable foundation of all digital mastery. Protecting your keys, validating contracts, and utilizing privacy-preserving technologies.</p>
                  <div className="text-black font-black text-[10px] uppercase tracking-widest flex items-center group-hover:opacity-60 transition-opacity">
                    Access Security Docs
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </Link>

              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-zinc-50 border border-zinc-100 p-12 rounded-[3rem] text-black shadow-inner">
               <h3 className="font-heading text-2xl md:text-3xl font-black mb-6 text-black uppercase tracking-tighter">Financial Transparency</h3>
               <div className="text-zinc-500 leading-relaxed space-y-6 font-medium">
                 <p>
                   At <strong>Ethical Crypto</strong>, we prioritize structural integrity over market noise. Our research is anchored in technical audits and mathematical models, rather than speculative hype. Every protocol discussed undergoes rigorous scrutiny regarding its decentralization, security model, and utility.
                 </p>
                 <p className="text-[10px] font-black uppercase tracking-widest border-t border-zinc-200 pt-6 text-zinc-400">
                   <span className="font-black text-black block mb-2">Financial Disclaimer:</span>
                   Engaging with blockchain protocols involves high capital risk. Past performance does not guarantee future protocol stability. Never invest capital that is not designated for high-risk technological research.
                 </p>
               </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-32">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-black mb-12 border-l-8 border-black pl-6 uppercase tracking-tighter">
                Protocol intelligence FAQ
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden hover:border-black/10 transition-all">
                    <summary className="flex items-center justify-between cursor-pointer p-6 md:p-8 font-heading text-lg md:text-xl font-black text-black group-open:bg-black/5 transition-colors">
                      <span className="uppercase tracking-tight">{item.question}</span>
                      <svg className="w-5 h-5 shrink-0 ml-4 text-zinc-400 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-sm md:text-base text-zinc-500 leading-relaxed font-medium bg-black/[0.02]">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            
            {/* Guide Nav */}
            <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 shadow-inner">
               <h3 className="font-heading text-lg font-black mb-6 uppercase tracking-tight text-black">Guide Index</h3>
               <nav className="flex flex-col space-y-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                 <a href="#what-is-crypto" className="hover:text-black transition-colors flex items-center justify-between group">
                   01. Protocol Intelligence
                   <span className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                 </a>
                 <a href="#pillars" className="hover:text-black transition-colors flex items-center justify-between group">
                   02. Core Pillars
                   <span className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                 </a>
                 <a href="#faq" className="hover:text-black transition-colors flex items-center justify-between group">
                   03. FAQ
                   <span className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                 </a>
               </nav>
            </div>

            {/* Performance Targets */}
            <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm">
              <h3 className="font-heading text-[10px] font-black mb-6 uppercase tracking-[0.2em] text-zinc-400">2026 Protocol Benchmarks</h3>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                <li className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <span className="text-zinc-400">Native Staking APY</span>
                  <span className="text-black">{`> 4.5%`}</span>
                </li>
                <li className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <span className="text-zinc-400">Node Uptime Target</span>
                  <span className="text-black">99.99%</span>
                </li>
                <li className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <span className="text-zinc-400">L2 Latency</span>
                  <span className="text-black">{`< 200ms`}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-zinc-400">Decentralization</span>
                  <span className="text-black">Nakamoto {`> 20`}</span>
                </li>
              </ul>
              <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-300 mt-6">Structural Health Indicators</p>
            </div>

            {/* Newsletter */}


          </aside>

        </div>
      </div>
    </div>
  );
}
