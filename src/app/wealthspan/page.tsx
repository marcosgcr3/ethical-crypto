import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { 
  IconYield, 
  IconClock, 
  IconBlockchain, 
  IconBarChart, 
  IconTarget,
  IconSecurity,
  IconAnalysis,
  IconNode
} from '@/components/icons/CryptoIcons';

export const metadata: Metadata = {
  title: 'Wealthspan Engineering: Protocol Mastery & Yield Longevity | Ethical Crypto',
  description: 'The tactical guide to engineering capital longevity. Master liquid staking, L2 optimization, yield compounding, and the technical infrastructure of modern wealthspan.',
  alternates: {
    canonical: 'https://ethicalcrypto.ai/wealthspan',
  },
  openGraph: {
    title: 'Wealthspan Engineering: Protocol Mastery & Yield Longevity',
    description: 'Master the technical protocols that define long-term capital autonomy. From MEV optimization to validator efficiency.',
    url: 'https://ethicalcrypto.ai/wealthspan',
    siteName: 'Ethical Crypto',
    images: [{ url: '/images/wealthspan-og.png', width: 1200, height: 630, alt: 'Wealthspan Engineering and Capital Optimization' }],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wealthspan Engineering | Ethical Crypto',
    description: 'Master the technical protocols that define long-term capital autonomy.',
    images: ['/images/wealthspan-og.png'],
  },
};

export const revalidate = 0;

export default async function WealthspanPillarPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { category: 'wealthspan', published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch failed for Wealthspan pillar page.", error);
  }

  const faqItems = [
    {
      question: 'What is the "Wealthspan" framework?',
      answer: 'Wealthspan is the duration of time your capital remains productive and autonomous. Unlike simple wealth accumulation, wealthspan optimization focuses on the operational efficiency, security hygiene, and protocol resilience of your assets. It is the financial equivalent of a "health span"—maximizing the years of high-performance capital utility while minimizing the risks of systematic failure or value attrition.'
    },
    {
      question: 'What are the core technical pillars of wealthspan?',
      answer: 'The wealthspan model relies on four primary protocols: 1) Validator Health (running robust infrastructure), 2) Yield Aggregation (optimizing LST/LRT wrappers), 3) Operational Security (air-gapped storage and multi-sig), and 4) Protocol Intelligence (deep technical analysis of underlying smart contracts and tokenomics).'
    },
    {
      question: 'How do you measure Protocol Mastery?',
      answer: 'Protocol Mastery is measured through technical benchmarks: validator uptime, slashing protection profiles, MEV extraction efficiency, hardware redundancy, and the quality of your operational key management. High mastery scores correlate with lower systematic risk and higher long-term "Alpha".'
    },
    {
      question: 'Is liquid staking (LST) essential for wealthspan?',
      answer: 'LSTs (Liquid Staking Tokens) are a critical tool for wealthspan as they unlock capital efficiency. By allowing you to utilize staked assets as collateral or liquidity while earning native validator rewards, LSTs increase the velocity of capital turnover. However, they introduce smart contract and de-pegging risks that must be managed through rigorous technical auditing.'
    }
  ];

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Wealthspan Engineering: Protocol Mastery and Capital Longevity',
    description: metadata.description,
    url: 'https://ethicalcrypto.ai/wealthspan',
    datePublished: '2026-04-20T00:00:00Z',
    dateModified: new Date().toISOString(),
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', name: 'Ethical Crypto', url: 'https://ethicalcrypto.ai' },
    author: { '@type': 'Organization', name: 'Ethical Crypto', url: 'https://ethicalcrypto.ai' },
  };

  return (
    <div className="bg-void min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-6" aria-label="Breadcrumb">
        <ol className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <li><Link href="/" className="hover:text-white transition-colors">Terminal</Link></li>
          <li className="mx-2 opacity-20">/</li>
          <li className="text-white/60" aria-current="page">Wealthspan</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <IconClock className="w-3.5 h-3.5" />
            Engineering Autonomy
          </div>
          <h1 className="font-heading text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase max-w-5xl mx-auto">
            Wealthspan: The Science of <span className="text-white/40">Capital Longevity</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/50 max-w-3xl mx-auto leading-relaxed">
            Deploying technical frameworks for protocol resilience, validator efficiency, and the systematic maximization of long-term capital horizons.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Article Content */}
          <div className="lg:w-2/3 space-y-24">
            
            {/* Section 1: The Wealthspan Paradigm */}
            <section id="paradigm">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-10 border-l-8 border-white pl-8 uppercase tracking-tighter">
                The Wealthspan Paradigm
              </h2>
              <div className="prose prose-invert lg:prose-xl max-w-none text-white/60 leading-relaxed font-medium">
                <p>
                  In the decentralized era, <strong>Wealthspan Engineering</strong> is the fundamental shift from passive accumulation to active operational sovereignty. Traditional finance models fail to account for the unique risks and opportunities of the blockchain—where your "Wealthspan" is directly proportional to your technical mastery of the protocol stack.
                </p>
                <p>
                  Similar to how biological longevity targets the root causes of aging, Wealthspan optimization targets the <strong>Systematic Hallmarks of Value Attrition</strong>. These include validator downtime, smart contract vulnerability, suboptimal MEV extraction, and key management failure. By addressing these technical upstream factors, we ensure your capital doesn't just grow—it survives and thrives across multiple protocol generations.
                </p>
                <p>
                  At <strong>Ethical Crypto</strong>, we define wealthspan not by the number in your wallet, but by the years of autonomous, high-yield utility your capital can sustain. This is the ultimate goal: the total compression of financial vulnerability through protocol intelligence.
                </p>
              </div>
            </section>

            {/* Section 2: Technical Protocols */}
            <section id="protocols">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-white mb-12 uppercase tracking-tight">
                Operational Protocols
              </h2>
              
              <div className="space-y-10">
                {/* Protocol: Yield Optimization */}
                <div className="bg-void p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconYield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tight">1. Yield Efficiency Engine</h3>
                  <div className="text-white/40 leading-relaxed space-y-4 font-medium">
                    <p>
                      Optimizing the <strong>Net Capital Turnover</strong> is essential for Wealthspan. This involves the technical auditing of LST (Liquid Staking Token) de-peg risk and the deployment of assets into low-latency yield aggregators that leverage MEV-Boost to capture outsized rewards.
                    </p>
                    <p>
                      <span className="font-bold text-white/60">Tactical Targets:</span> Validating liquid wrapper stability, monitoring slashing insurance pools, and utilizing delta-neutral yield strategies to insulate capital from directional market volatility.
                    </p>
                  </div>
                </div>

                {/* Protocol: Infrastructure */}
                <div className="bg-void p-10 rounded-[2.5rem] border border-white/5 hover:border-purple-400/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconNode className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tight">2. Infrastructure Resilience</h3>
                  <div className="text-white/40 leading-relaxed space-y-4 font-medium">
                    <p>
                      Your Wealthspan is only as strong as the nodes that secure it. Moving capital from centralized exchanges to <strong>sovereign validator setups</strong> reduces counterparty risk and captures the full protocol reward spectrum.
                    </p>
                    <p>
                      <span className="font-bold text-purple-400">Technical Spec:</span> Deploying DVT (Distributed Validator Technology) to ensure zero-slashing risk and 100% uptime through redundant, geographically distributed nodes.
                    </p>
                  </div>
                </div>

                {/* Protocol: Analysis */}
                <div className="bg-void p-10 rounded-[2.5rem] border border-white/5 hover:border-emerald-400/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconAnalysis className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tight">3. Protocol Intelligence</h3>
                  <div className="text-white/40 leading-relaxed space-y-4 font-medium">
                    <p>
                      Continuous <strong>On-Chain Monitoring</strong> and technical deep-dives into protocol codebases are the preventative medicine of finance. Identifying "Technical Debt" in a smart contract before it results in an exploit is the most effective form of risk mitigation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest Articles */}
            {articles.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-heading text-3xl font-black text-white uppercase tracking-tighter">
                    Wealthspan <span className="text-white/40">Intel</span>
                  </h2>
                  <Link href="/wealthspan" className="text-[10px] font-black uppercase tracking-widest text-white border-b border-white/30 pb-1 hover:border-white transition-all">View All →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {articles.map((article) => (
                    <Link key={article.id} href={`/wealthspan/${article.slug}`} className="group relative block cursor-pointer">
                      <article>
                        {article.imageUrl ? (
                          <div className="relative overflow-hidden rounded-[2rem] mb-6 bg-void h-52 border border-white/10 transition-all group-hover:border-white/30">
                            <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                            <div className="absolute top-6 left-6">
                              <span className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase text-white tracking-widest border border-white/10">WEALTHSPAN</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4">
                             <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">WEALTHSPAN</span>
                          </div>
                        )}
                        <h3 className="font-heading text-xl font-bold mb-3 text-white group-hover:text-white/60 transition-colors leading-tight">{article.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-4 font-medium">{article.excerpt}</p>
                        <div className="flex items-center text-[10px] font-black tracking-widest text-white/20">
                          <span>{Math.max(5, Math.ceil(article.content.split(' ').length / 200))} MIN READ</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-16 uppercase tracking-tighter">
                Wealthspan <span className="text-white/40">FAQ</span>
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden hover:border-white/10 transition-all">
                    <summary className="flex items-center justify-between cursor-pointer p-8 font-heading text-xl font-black text-white group-open:text-white/60 transition-colors">
                      <span className="uppercase tracking-tight">{item.question}</span>
                      <svg className="w-5 h-5 shrink-0 ml-4 text-white opacity-40 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-8 pb-8 text-white/50 leading-relaxed font-medium">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 flex flex-col gap-12">
            <div className="bg-void p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full"></div>
              <h3 className="font-heading text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-white/30 relative">Tactical Navigation</h3>
              <nav className="flex flex-col gap-6 text-sm font-black text-white/40 relative">
                <a href="#paradigm" className="hover:text-white transition-colors flex items-center justify-between group/link">
                  01. THE PARADIGM
                  <span className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[10px] group-hover/link:border-white/30 group-hover/link:text-white">↓</span>
                </a>
                <a href="#protocols" className="hover:text-white transition-colors flex items-center justify-between group/link">
                  02. OPERATIONAL PROTOCOLS
                  <span className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[10px] group-hover/link:border-white/30 group-hover/link:text-white">↓</span>
                </a>
                <a href="#faq" className="hover:text-white transition-colors flex items-center justify-between group/link">
                  03. FAQ
                  <span className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[10px] group-hover/link:border-white/30 group-hover/link:text-white">↓</span>
                </a>
              </nav>
            </div>

            <div className="bg-gradient-to-br from-void to-black p-10 rounded-[3rem] border border-white/5 shadow-2xl">
              <div className="flex items-center gap-2 mb-8">
                <IconTarget className="w-5 h-5 text-white/40" />
                <h3 className="font-heading text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Protocol Benchmarks</h3>
              </div>
              <ul className="space-y-6 text-xs">
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">Infrastructure</span>
                  <span className="text-white font-black">SOVEREIGN NODE</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">Custody</span>
                  <span className="text-white font-black">AIR-GAPPED MULTISIG</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">Audit Depth</span>
                  <span className="text-white font-black">FULL STACK</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-black uppercase tracking-widest text-white/40">Yield Profile</span>
                  <span className="text-white font-black">ALPHA GENERATING</span>
                </li>
              </ul>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mt-8 font-black">Optimized Frontier Range</p>
            </div>



            <div className="p-8 border-t border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-[2]">
                Documentation audited by Ethical Crypto Research Unit. All protocols require independent technical verification. Not financial advice.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
