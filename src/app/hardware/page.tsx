import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import NewsletterSidebar from '@/components/NewsletterSidebar';
import { 
  IconNode, 
  IconBlockchain, 
  IconTarget, 
  IconSecurity, 
  IconAnalysis,
  IconClock,
  IconLock
} from '@/components/icons/CryptoIcons';

export const metadata: Metadata = {
  title: 'Hardware Infrastructure: Validator Nodes & HSM Security | Ethical Crypto',
  description: 'Master the technical hardware of the crypto ecosystem. From sovereign validator nodes and DVT to hardware security modules (HSM) and private key isolation.',
  alternates: {
    canonical: 'https://ethicalcrypto.ai/hardware',
  },
  openGraph: {
    title: 'Hardware Infrastructure: Validator Nodes & HSM Security',
    description: 'Engineering the physical layer of digital sovereignty. From validator nodes to hardware security modules.',
    url: 'https://ethicalcrypto.ai/hardware',
    siteName: 'Ethical Crypto',
    images: [{ url: '/images/hardware-og.png', width: 1200, height: 630, alt: 'Hardware Infrastructure and Node Operations' }],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hardware Infrastructure | Ethical Crypto',
    description: 'Master sovereign validator nodes and HSM security with technical hardware protocols.',
    images: ['/images/hardware-og.png'],
  },
};

export const revalidate = 0;

export default async function HardwarePillarPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { category: 'hardware', published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch failed for Hardware pillar page.", error);
  }

  const faqItems = [
    {
      question: 'What is the "Sovereign Node" objective?',
      answer: 'The primary objective of a sovereign node is the total elimination of centralized trust in the validation process. By running your own infrastructure, you ensure that you are verifying the state of the network personally, rather than relying on a third-party service. For a biohacker of crypto, this is the ultimate act of operational autonomy.'
    },
    {
      question: 'Why does DVT matter for validator resilience?',
      answer: 'Distributed Validator Technology (DVT) allows a validator key to be split across multiple nodes. This ensures that even if one node fails or is compromised, the validator remains online and the funds remain secure. It is the technical equivalent of "biological redundancy"—ensuring systematic survival through distributed risk.'
    },
    {
      question: 'How do you pick the right HSM?',
      answer: 'Selecting a Hardware Security Module (HSM) involves balancing usability with the "Cost to Compromise". We favor hardware that supports EAL5+ security certifications, provides air-gapped signing capabilities, and allows for the immutable auditing of transaction manifests.'
    },
    {
      question: 'Is cloud-hosting a validator safe?',
      answer: 'Cloud-hosting is a trade-off. While it provides high availability, it introduces counterparty risk and potential state surveillance. For maximum sovereignty, we recommend "Bare Metal" infrastructure—physical hardware owned and operated in a secure, controlled environment.'
    }
  ];

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Hardware Infrastructure: Validator Nodes and HSM Security',
    description: metadata.description,
    url: 'https://ethicalcrypto.ai/hardware',
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
          <li><Link href="/" className="hover:text-cyan-400 transition-colors">Terminal</Link></li>
          <li className="mx-2 opacity-20">/</li>
          <li className="text-cyan-400" aria-current="page">Hardware</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #00F5FF 1px, transparent 1px), linear-gradient(to bottom, #00F5FF 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(0,245,255,0.1)]">
            <IconNode className="w-3.5 h-3.5" />
            Infrastructure Engineering
          </div>
          <h1 className="font-heading text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase max-w-5xl mx-auto">
            Hardware: The <span className="text-cyan-400">Physical Layer</span> of Sovereignty
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/50 max-w-3xl mx-auto leading-relaxed">
            Engineering the foundations of the decentralized network. From bare-metal validator stacks and DVT setups to air-gapped security modules and cryptographic signing hardware.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Article Content */}
          <div className="lg:w-2/3 space-y-24">
            
            {/* Section 1: The Hardware Revolution */}
            <section id="hardware-revolution">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-10 border-l-8 border-cyan-400 pl-8 uppercase tracking-tighter shadow-cyan-400/5">
                The Physical Frontier
              </h2>
              <div className="prose prose-invert lg:prose-xl max-w-none text-white/60 leading-relaxed font-medium">
                <p>
                  In the decentralized era, the <strong>Physical Layer</strong> is the final bridge between the digital state and absolute sovereignty. While protocols are code, they execute on silicon. To be truly autonomous is to own the hardware that signs your transactions and validates the network.
                </p>
                <p>
                  We treat hardware as <strong>Critical Infrastructure</strong>. In 2026, the crypto approach to hardware means moving beyond the consumer laptop and into the realm of enterprise-grade security. We deploy hardware security modules (HSMs), specialized validator rigs, and custom network topologies that prioritize resilience over convenience.
                </p>
                <p>
                  The goal of <strong>Ethical Crypto Hardware</strong> is the elimination of the "Cloud Subsidy"—removing the reliance on third-party data centers and reclaiming the means of production for the digital asset economy.
                </p>
              </div>
            </section>

            {/* Section 2: Core Protocols */}
            <section id="protocols">
              <h2 className="font-heading text-3xl md:text-4xl font-black text-white mb-12 uppercase tracking-tight">
                Infrastructure Protocols
              </h2>
              
              <div className="space-y-10">
                {/* Protocol: Validator Nodes */}
                <div className="bg-void p-10 rounded-[2.5rem] border border-white/5 hover:border-cyan-400/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconNode className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tight">1. Bare-Metal Validator Rigs</h3>
                  <div className="text-white/40 leading-relaxed space-y-4 font-medium">
                    <p>
                      Reclaiming the network. We deploy <strong>High-Performance Validator Nodes</strong> on physical hardware with ECC memory, NVMe storage, and redundant power supplies. This ensures maximum uptime and eliminates the "Bystander Risk" inherent in shared cloud environments.
                    </p>
                  </div>
                </div>

                {/* Protocol: HSM */}
                <div className="bg-void p-10 rounded-[2.5rem] border border-white/5 hover:border-purple-400/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconLock className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tight">2. Hardware Security Modules</h3>
                  <div className="text-white/40 leading-relaxed space-y-4 font-medium">
                    <p>
                      Immutable signing authority. Utilizing <strong>EAL5+ Certified HSMs</strong> for key management ensures that private keys never exist in an exportable state, even under physical attack.
                    </p>
                  </div>
                </div>

                {/* Protocol: DVT */}
                <div className="bg-void p-10 rounded-[2.5rem] border border-white/5 hover:border-emerald-400/20 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconBlockchain className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tight">3. Distributed Validator Tech</h3>
                  <div className="text-white/40 leading-relaxed space-y-4 font-medium">
                    <p>
                      Architectural Redundancy. We leverage <strong>DVT (Distributed Validator Technology)</strong> to split validator signing duties across multiple nodes, ensuring the network remains secure even if part of the infrastructure is offline.
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
                    Hardware <span className="text-cyan-400">Reports</span>
                  </h2>
                  <Link href="/hardware" className="text-[10px] font-black uppercase tracking-widest text-cyan-400 border-b border-cyan-400/30 pb-1 hover:border-cyan-400 transition-all">View All →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {articles.map((article) => (
                    <Link key={article.id} href={`/hardware/${article.slug}`} className="group relative block cursor-pointer">
                      <article>
                        <div className="relative overflow-hidden rounded-[2rem] mb-6 bg-void h-52 border border-white/10 shadow-2xl transition-all group-hover:border-cyan-400/30">
                          {article.imageUrl && (
                            <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                          )}
                          <div className="absolute top-6 left-6">
                            <span className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase text-cyan-400 tracking-widest border border-cyan-400/20">HARDWARE</span>
                          </div>
                        </div>
                        <h3 className="font-heading text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors leading-tight">{article.title}</h3>
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
                Hardware <span className="text-cyan-400">FAQ</span>
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden hover:border-cyan-400/20 transition-all">
                    <summary className="flex items-center justify-between cursor-pointer p-8 font-heading text-xl font-black text-white group-open:text-cyan-400 transition-colors">
                      <span className="uppercase tracking-tight">{item.question}</span>
                      <svg className="w-5 h-5 shrink-0 ml-4 text-cyan-400 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="absolute inset-0 bg-cyan-400/[0.02] blur-3xl rounded-full"></div>
              <h3 className="font-heading text-[10px] font-black mb-8 uppercase tracking-[0.3em] text-white/30 relative">Hardware Menu</h3>
              <nav className="flex flex-col gap-6 text-sm font-black text-white/40 relative">
                <a href="#hardware-revolution" className="hover:text-cyan-400 transition-colors flex items-center justify-between group/link">
                  01. PHYSICAL FRONTIER
                  <span className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[10px] group-hover/link:border-cyan-400/30 group-hover/link:text-cyan-400">↓</span>
                </a>
                <a href="#protocols" className="hover:text-cyan-400 transition-colors flex items-center justify-between group/link">
                  02. INFRASTRUCTURE PROTOCOLS
                  <span className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[10px] group-hover/link:border-cyan-400/30 group-hover/link:text-cyan-400">↓</span>
                </a>
                <a href="#faq" className="hover:text-cyan-400 transition-colors flex items-center justify-between group/link">
                  03. FAQ
                  <span className="w-6 h-6 border border-white/10 rounded-lg flex items-center justify-center text-[10px] group-hover/link:border-cyan-400/30 group-hover/link:text-cyan-400">↓</span>
                </a>
              </nav>
            </div>

            <div className="bg-gradient-to-br from-void to-black p-10 rounded-[3rem] border border-white/5 shadow-2xl">
              <div className="flex items-center gap-2 mb-8">
                <IconTarget className="w-5 h-5 text-cyan-400" />
                <h3 className="font-heading text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Infrastructure Matrix</h3>
              </div>
              <ul className="space-y-6 text-xs">
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">Sovereign Node</span>
                  <span className="text-cyan-400 font-black">BARE METAL ACTIVE</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">HSM Tier</span>
                  <span className="text-cyan-400 font-black">EAL5+ VERIFIED</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">DVT Coverage</span>
                  <span className="text-cyan-400 font-black">GEO-DISTRIBUTED</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-black uppercase tracking-widest text-white/40">Key Isolation</span>
                  <span className="text-cyan-400 font-black">100% AIR-GAPPED</span>
                </li>
              </ul>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mt-8 font-black">Technical Infrastructure Pick</p>
            </div>

            <NewsletterSidebar />

            <div className="p-8 border-t border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-[2]">
                Documentation provided by Ethical Crypto Engineering Unit. Infrastructure requires independent verification. Not financial advice.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
