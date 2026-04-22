import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import ScrollButton from '@/components/ScrollButton';

export const metadata: Metadata = {
  title: "Ethical Crypto: Protocol Intelligence & Wealth Engineering",
  description: "Master the digital frontier with expert crypto insights. Explore the latest in DeFi, protocol development, and blockchain security.",
  alternates: {
    canonical: 'https://ethicalcrypto.ai',
  },
};

export const revalidate = 3600; // Cache for 1 hour

// Fallback images per category
const CATEGORY_IMAGES: Record<string, string> = {
  protocols: '/images/hero-v2.png',
  wealthpumps: '/images/staking.png',
  fundamentals: '/images/mining.png',
  security: '/images/security.png',
  wallets: '/images/wallets.png',
};

export default async function Home() {
  // Fetch the 9 most recent published articles from the DB
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 9,
  });

  return (
    <div className="bg-white min-h-screen text-black selection:bg-black/10 selection:text-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-10 md:mb-20 pt-10">
          <div className="relative rounded-3xl md:rounded-[3rem] overflow-hidden shadow-sm h-[450px] md:h-[600px] lg:h-[700px] bg-zinc-50 border border-zinc-100">
              <Image 
                src="/images/hero-v2.png" 
                alt="Crypto Protocol Hero Illustration" 
                fill 
                className="object-cover contrast-[1.1] opacity-100" 
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/20 to-transparent flex items-center">
                  <div className="p-8 md:p-20 max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8 shadow-lg">
                        Protocol Intelligence 2026
                      </div>
                      <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] mb-8 uppercase tracking-tighter text-black relative z-10">
                        Decentralized <br />
                        <span className="text-zinc-500">Intelligence</span>
                      </h1>
                      <p className="text-lg md:text-2xl font-medium leading-relaxed text-black/70 mb-10 max-w-xl font-sans relative z-10">
                        The definitive guide to optimizing your digital footprint, securing your assets, and engineering protocol-level growth.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-5">
                        <ScrollButton targetId="latest-insights" className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center w-fit text-xs shadow-2xl group">
                            Explore Archive
                            <svg className="w-5 h-5 ml-3 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </ScrollButton>
                        <Link href="/protocols" className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-black/10 hover:bg-black/5 transition-all flex items-center w-fit">
                            Network Index
                        </Link>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 mb-24">
          <div id="latest-insights" className="scroll-mt-32">
              <div className="flex items-center justify-between mb-16">
                <h2 className="font-heading text-3xl md:text-4xl font-black text-black uppercase tracking-tighter flex items-center gap-4">
                  Latest <span className="text-zinc-300">Insights</span>
                </h2>
                <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                   <span className="text-black border-b-2 border-black pb-1">All Sectors</span>
                   <span className="hover:text-black cursor-pointer transition-colors">Yield Protocols</span>
                   <span className="hover:text-black cursor-pointer transition-colors">Security Ops</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {articles.map((article) => {
                    const category = article.category ?? 'protocols';
                    const displayCategory = category === 'wealthspan' ? 'wealthpumps' : 
                                           category === 'crypto' ? 'protocols' : 
                                           category === 'hardware' ? 'wallets' : category;
                    
                    const imgSrc = article.imageUrl || CATEGORY_IMAGES[displayCategory] || '/images/staking.png';
                    const readTime = Math.max(5, Math.ceil(article.content.split(' ').length / 200));
                    const dateStr = new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                    return (
                      <Link key={article.id} href={`/${displayCategory}/${article.slug}`} className="group relative block cursor-pointer">
                          <article className="bg-white rounded-[3rem] border border-zinc-100 hover:border-black transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl">
                              <div className="relative overflow-hidden h-56 bg-zinc-50">
                                  <Image 
                                    src={imgSrc} 
                                    alt={article.title} 
                                    fill 
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-90 group-hover:opacity-100" 
                                  />
                                  <div className="absolute top-6 left-6">
                                      <span className="bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">{displayCategory}</span>
                                  </div>
                              </div>
                              <div className="p-10">
                                <h3 className="font-heading text-2xl font-black mb-4 group-hover:text-zinc-500 transition-colors leading-[1.1] text-black uppercase tracking-tighter">{article.title}</h3>
                                <p className="text-sm leading-relaxed line-clamp-3 text-zinc-500 mb-8 font-medium">{article.excerpt}</p>
                                <div className="flex items-center text-[10px] font-black tracking-[0.3em] text-zinc-300 uppercase">
                                    <span>{readTime} MIN READ</span>
                                    <span className="mx-3 opacity-20">•</span>
                                    <span>{dateStr}</span>
                                </div>
                              </div>
                          </article>
                      </Link>
                    );
                  })}
              </div>

               {articles.length === 0 && (
                <div className="bg-zinc-50 rounded-[3.5rem] border border-zinc-100 p-24 text-center shadow-inner">
                   <h3 className="font-heading text-2xl font-black text-black mb-4 uppercase tracking-tighter">Network Offline</h3>
                   <p className="text-zinc-500 font-medium max-w-md mx-auto leading-relaxed">
                      Our intelligence nodes are currently synchronizing. Check back shortly for updated protocol research.
                   </p>
                </div>
              )}
          </div>
      </div>

    </div>
  );
}
