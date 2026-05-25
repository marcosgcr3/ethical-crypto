import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import ScrollButton from '@/components/ScrollButton';
import LatestArticles from '@/components/LatestArticles';

export const metadata: Metadata = {
  title: "Ethical Crypto: Protocol Intelligence & Wealth Engineering — Master Crypto Insights | Ethical Crypto",
  description: "Optimize your strategy for crypto insights. Master the digital frontier with expert cryptocurrency insights. Explore the latest in DeFi, protocol development, and blockchain security.",
  alternates: {
    canonical: 'https://ethical-crypto.com',
  },
};

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  // Fetch all published articles from the DB
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-white min-h-screen text-black selection:bg-black/10 selection:text-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-10 md:mb-20 pt-6 md:pt-10">
          <div className="relative rounded-3xl md:rounded-[3rem] overflow-hidden shadow-sm bg-zinc-50 border border-black/5 min-h-[500px] flex items-center">
              <Image 
                src="/api/images/supabase/hero-v2.png" 
                alt="Crypto Protocol Hero Illustration" 
                fill 
                className="object-cover opacity-30 z-0" 
                priority
                fetchPriority="high"
                sizes="100vw"
              />
              <div className="relative z-10 w-full bg-gradient-to-r from-white via-white/95 md:via-white/90 to-transparent py-12 px-6 md:p-20">
                  <div className="max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 md:mb-8 shadow-lg">
                        Protocol Intelligence 2026
                      </div>
                      <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-6 md:mb-8 uppercase tracking-tighter text-black">
                        Decentralized <br />
                        <span className="text-zinc-500">Intelligence</span>
                      </h1>
                      <p className="text-base md:text-xl font-medium leading-relaxed text-black/70 mb-8 md:mb-10 max-w-xl font-sans">
                        The definitive guide to optimizing your digital footprint, securing your assets, and engineering protocol-level growth. Gain crypto insights with expert cryptocurrency threat intelligence and advanced cryptocurrency intelligence. Explore blockchain security insights to improve your crypto wealth engineering framework.
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
                  Latest <span className="text-zinc-500">Insights</span>
                </h2>
              </div>

              {articles.length > 0 ? (
                <LatestArticles initialArticles={articles} />
              ) : (
                <div className="bg-zinc-50 rounded-[3.5rem] border border-black/5 p-24 text-center shadow-inner">
                   <h3 className="font-heading text-2xl font-black text-black mb-4 uppercase tracking-tighter">Network Offline</h3>
                   <p className="text-black/40 font-medium max-w-md mx-auto leading-relaxed">
                      Our intelligence nodes are currently synchronizing. Check back shortly for updated protocol research.
                   </p>
                </div>
              )}
          </div>
      </div>

    </div>
  );
}
