import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { 
  IconSecurity, 
  IconLock, 
  IconTarget,
  IconAnalysis,
  IconNode
} from '@/components/icons/CryptoIcons';

export const metadata: Metadata = {
  title: 'Security/Wallets: Air-Gapped Custody & Asset Protection | Ethical Crypto',
  description: 'The tactical guide to crypto operational security and wallet management. Master air-gapped custody, multi-sig governance, and privacy engineering.',
  alternates: {
    canonical: 'https://ethicalcrypto.ai/security',
  },
};

export const revalidate = 0;

export default async function SecurityPillarPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { 
        category: { in: ['security', 'wallets'] }, 
        published: true 
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch failed for Security pillar page.", error);
  }

  const faqItems = [
    {
      question: 'What is "Cold Storage" isolation?',
      answer: 'Cold Storage isolation is the total separation of private keys from any network-connected device. This "Air-Gap" is the non-negotiable baseline for any serious wealthspan strategy, preventing 99% of common digital exploit vectors.'
    },
    {
      question: 'How does Multi-Sig governance work?',
      answer: 'Multi-Signature (m-of-n) governance requires multiple authorized keys to approve a transaction. This removes any single point of failure and provides a technical buffer against physical theft or social engineering.'
    }
  ];

  return (
    <div className="bg-[#05070A] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-6 py-12" aria-label="Breadcrumb">
        <ol className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          <li><Link href="/" className="hover:text-white transition-colors">Terminal</Link></li>
          <li className="mx-3 opacity-20">/</li>
          <li className="text-white" aria-current="page">Security/Wallets</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 border-b border-white/5 overflow-hidden bg-void flex items-center justify-center min-h-[300px] md:min-h-[350px]">
        <Image 
          src="https://wwvfyhszgbdffhzlapxz.supabase.co/storage/v1/object/public/images/security.png" 
          alt="Security Operations Background" 
          fill 
          className="object-cover grayscale opacity-10 contrast-[1.1]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
              <IconLock className="w-3.5 h-3.5" />
              Zero Trust Operations
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter uppercase max-w-4xl mx-auto text-white">
              Security: <span className="text-white/40">Asset</span> Fortress
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/50 max-w-2xl mx-auto leading-relaxed">
              Engineering a fortress for your assets. Master air-gapped custody, multi-signature governance, and the technical defense systems of the modern sovereign individual, including advanced wallet management.
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
                <h2 className="font-heading text-3xl font-black text-white uppercase tracking-tighter">
                  Defense <span className="text-white/20">Intelligence</span>
                </h2>
              </div>
              
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {articles.map((article) => (
                    <Link key={article.id} href={`/security/${article.slug}`} className="group relative block cursor-pointer">
                      <article>
                        {article.imageUrl ? (
                          <div className="relative overflow-hidden rounded-3xl mb-6 bg-void h-56 border border-white/5 shadow-sm transition-all group-hover:border-white/20 group-hover:shadow-md">
                            <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                            <div className="absolute top-6 left-6">
                              <span className="bg-black/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase text-white tracking-widest border border-white/5 shadow-sm">SECURITY</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4">
                             <span className="bg-white text-black px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest">SECURITY</span>
                          </div>
                        )}
                        <h3 className="font-heading text-xl font-black mb-3 text-white group-hover:text-white/60 transition-colors leading-tight uppercase tracking-tight">{article.title}</h3>
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
              ) : (
                <div className="bg-void rounded-[2.5rem] border border-white/5 p-16 text-center shadow-inner">
                   <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/5 shadow-sm">
                      <IconSecurity className="w-8 h-8 text-white/10" />
                   </div>
                   <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tight">No security reports currently found</h3>
                   <p className="text-white/40 font-medium max-w-md mx-auto leading-relaxed">
                      Our operational security unit is currently auditing new defense protocols. Verified intelligence reports will be deployed shortly.
                   </p>
                </div>
              )}
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-12 uppercase tracking-tighter">
                Operational <span className="text-white/40">FAQ</span>
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, idx) => (
                  <details key={idx} className="group bg-void rounded-3xl border border-white/5 overflow-hidden hover:border-white/10 transition-all">
                    <summary className="flex items-center justify-between cursor-pointer p-8 font-heading text-lg font-black text-white group-open:bg-white/5 transition-colors">
                      <span className="uppercase tracking-tight">{item.question}</span>
                      <svg className="w-5 h-5 shrink-0 ml-4 text-white/30 transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-8 pb-8 pt-2 text-white/40 leading-relaxed font-medium bg-white/[0.02]">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 flex flex-col gap-10">
            <div className="bg-void p-10 rounded-[3rem] border border-white/5 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <IconTarget className="w-5 h-5 text-white" />
                <h3 className="font-heading text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Defense Benchmarks</h3>
              </div>
              <ul className="space-y-6 text-xs">
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">Custody Tier</span>
                  <span className="text-white font-black">AIR-GAPPED COLD</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="font-black uppercase tracking-widest text-white/40">Auth Status</span>
                  <span className="text-white font-black">MULTI-SIG ACTIVE</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-black uppercase tracking-widest text-white/40">Privacy Score</span>
                  <span className="text-white font-black">HIGH ANONYMITY</span>
                </li>
              </ul>
            </div>


          </aside>
        </div>
      </div>
    </div>
  );
}
