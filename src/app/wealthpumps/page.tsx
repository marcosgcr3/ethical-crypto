import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { 
  IconYield, 
  IconClock, 
  IconTarget,
  IconBarChart,
  IconAnalysis
} from '@/components/icons/CryptoIcons';

export const metadata: Metadata = {
  title: 'WealthPumps: Capital Acceleration & Yield Engineering | Ethical Crypto',
  description: 'The science of high-performance yield. Master liquid staking, capital turnover, and technical infrastructure for long-term wealth expansion.',
  alternates: {
    canonical: 'https://ethicalcrypto.ai/wealthpumps',
  },
};

export const revalidate = 0;

export default async function WealthPumpsPillarPage() {
  let articles: any[] = [];
  try {
    // Note: Database still uses 'wealthspan' category for now, we filter by that.
    articles = await prisma.article.findMany({
      where: { 
        category: { in: ['wealthpumps', 'wealthspan'] }, 
        published: true 
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch failed for WealthPumps pillar page.", error);
  }

  const faqItems = [
    {
      question: 'What is a "WealthPump"?',
      answer: 'A WealthPump is a technical framework designed to maximize the productive output of your digital capital. It focuses on protocol-level yield mechanisms—such as liquid staking and validator rewards—to engineer consistent, risk-adjusted growth.'
    },
    {
      question: 'How do I optimize my Wealthspan?',
      answer: 'Optimization requires a dual focus on yield efficiency and infrastructure resilience. By running sovereign validators or utilizing verified liquid staking protocols, you increase the net capital turnover while maintaining full custody of your assets.'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-12" aria-label="Breadcrumb">
        <ol className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          <li><Link href="/" className="hover:text-black transition-colors">Terminal</Link></li>
          <li className="mx-3 opacity-20">/</li>
          <li className="text-black" aria-current="page">WealthPumps</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 border-b border-zinc-100 overflow-hidden bg-zinc-50 flex items-center justify-center min-h-[300px] md:min-h-[350px]">
        <Image 
          src="/api/images/supabase/staking.png" 
          alt="Wealth Engineering Background" 
          fill 
          className="object-cover grayscale opacity-10 contrast-[1.1]" 
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-100 text-zinc-500 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
              <IconYield className="w-3.5 h-3.5" />
              Capital Engineering v2.0
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter uppercase max-w-4xl mx-auto">
              WealthPumps: <span className="text-zinc-500">Asset</span> Growth
            </h1>
            <p className="text-lg md:text-xl font-medium text-zinc-700 max-w-2xl mx-auto leading-relaxed">
              Beyond passive growth. Deploy technical protocols for validator efficiency, liquid staking, and the systematic maximization of capital horizons.
            </p>
          </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Article Content */}
          <div className="lg:w-2/3 space-y-24">
            
            {/* Reports Section */}
            <section>
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-heading text-3xl font-black text-black uppercase tracking-tighter">
                  Wealth <span className="text-zinc-400">Reports</span>
                </h2>
              </div>
              
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {articles.map((article) => (
                    <Link key={article.id} href={`/wealthpumps/${article.slug}`} className="group relative block cursor-pointer">
                      <article>
                        {article.imageUrl ? (
                          <div className="relative overflow-hidden rounded-3xl mb-6 bg-zinc-50 h-56 border border-zinc-100 shadow-sm transition-all group-hover:border-black/10 group-hover:shadow-md">
                            <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                            <div className="absolute top-6 left-6">
                              <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase text-black tracking-widest border border-black/5 shadow-sm">WEALTHPUMP</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4">
                             <span className="bg-black text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">WEALTHPUMP</span>
                          </div>
                        )}
                        <h3 className="font-heading text-xl font-black mb-3 text-black group-hover:text-zinc-500 transition-colors leading-tight uppercase tracking-tight">{article.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4 font-medium">{article.excerpt}</p>
                        <div className="flex items-center text-[10px] font-black tracking-widest text-zinc-300">
                          <span>{Math.max(5, Math.ceil(article.content.split(' ').length / 200))} MIN READ</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-50 rounded-[2.5rem] border border-zinc-100 p-16 text-center shadow-inner">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto border border-zinc-100 shadow-sm">
                      <IconClock className="w-8 h-8 text-zinc-300" />
                   </div>
                   <h3 className="font-heading text-2xl font-black text-black mb-4 uppercase tracking-tight">No wealthpumps currently active</h3>
                   <p className="text-zinc-500 font-medium max-w-md mx-auto leading-relaxed">
                      Our capital engineering unit is currently optimizing new yield protocols. Institutional-grade reports will be deployed shortly.
                   </p>
                </div>
              )}
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-black mb-12 uppercase tracking-tighter">
                Engineering <span className="text-zinc-400">FAQ</span>
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:border-zinc-200 transition-all">
                    <summary className="flex items-center justify-between cursor-pointer p-8 font-heading text-lg font-black text-black group-open:bg-zinc-50 transition-colors">
                      <span className="uppercase tracking-tight">{item.question}</span>
                      <svg className="w-5 h-5 shrink-0 ml-4 text-zinc-400 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-8 pb-8 pt-2 text-zinc-500 leading-relaxed font-medium bg-zinc-50">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 flex flex-col gap-10">
            <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <IconTarget className="w-5 h-5 text-black" />
                <h3 className="font-heading text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Capital Benchmarks</h3>
              </div>
              <ul className="space-y-6 text-xs">
                <li className="flex justify-between items-center border-b border-zinc-200/50 pb-4">
                  <span className="font-black uppercase tracking-widest text-zinc-400">Validator Uptime</span>
                  <span className="text-black font-black">99.9% TARGET</span>
                </li>
                <li className="flex justify-between items-center border-b border-zinc-200/50 pb-4">
                  <span className="font-black uppercase tracking-widest text-zinc-400">Yield Efficiency</span>
                  <span className="text-black font-black">MAX ALPHA</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-black uppercase tracking-widest text-zinc-400">Capital Flow</span>
                  <span className="text-black font-black">ACTIVE sovereign</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
