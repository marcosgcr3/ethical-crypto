import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Revalidate category pages every hour as a fallback to on-demand revalidation
export const revalidate = 3600;

// Update allowed crypto categories
const ALLOWED_CATEGORIES = ['wealthspan', 'fundamentals', 'security', 'hardware', 'crypto'];

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  
  const categoryLabels: Record<string, string> = {
    wealthspan: 'Wealthspan Engineering',
    fundamentals: 'Protocol Fundamentals',
    security: 'Operations & Security',
    hardware: 'Hardware Infrastructure',
    crypto: 'Protocol Intelligence'
  };

  const categoryName = categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryName} | Tactical Intelligence | Ethical Crypto`,
    description: `Deploy high-yield strategies and advanced operational security in ${categoryName.toLowerCase()}. Science-backed insights for the modern sovereign individual.`,
    alternates: {
      canonical: `https://ethicalcrypto.ai/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  if (!ALLOWED_CATEGORIES.includes(category)) {
    notFound();
  }

  // Fetch published articles in this category, ordered by latest
  const articles = await prisma.article.findMany({
    where: { 
      category,
      published: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  const categoryLabels: Record<string, string> = {
    wealthspan: 'Wealthspan Engineering',
    fundamentals: 'Protocol Fundamentals',
    security: 'Operations & Security',
    hardware: 'Hardware Infrastructure',
    crypto: 'Protocol Intelligence'
  };

  const categoryName = categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container mx-auto px-6 mb-24 min-h-screen bg-void pt-12">
        {/* Header */}
        <header className="mb-16 border-b border-white/5 pb-12">
            <h1 className="font-heading text-4xl md:text-6xl font-black leading-tight text-white uppercase tracking-tighter shadow-cyan-400/10">
                {categoryName} <span className="text-cyan-400">Intelligence</span>
            </h1>
            <p className="text-xl text-white/50 mt-6 max-w-2xl font-medium leading-relaxed">
                Deploying cutting-edge frameworks and technical benchmarks for {categoryName.toLowerCase()}. High-signal research for the technical elite.
            </p>
        </header>

        {/* Empty State vs Full State */}
        {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-24 bg-void border border-white/5 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyan-400/[0.02] blur-3xl rounded-full"></div>
                <svg className="w-20 h-20 text-cyan-400/20 mb-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <h3 className="font-heading text-3xl font-black text-white mb-3 uppercase tracking-tight">Access Restricted</h3>
                <p className="text-white/40 max-w-md mx-auto mb-10 font-medium">Our Intelligence Unit is currently auditing and signing off on specific {categoryName} documentation. Access will be granted shortly.</p>
                <Link href="/" className="bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-cyan-500 transition-all text-xs uppercase tracking-widest shadow-xl">Return to Terminal</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {articles.map((article) => (
                    <Link key={article.id} href={`/${category}/${article.slug}`} className="group relative block cursor-pointer">
                        <article className="h-full flex flex-col">
                            <div className="relative overflow-hidden rounded-[2rem] mb-6 bg-void h-64 border border-white/10 shadow-2xl transition-all group-hover:border-cyan-400/30">
                                {article.imageUrl && (
                                    <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                )}
                                <div className="absolute top-6 left-6">
                                    <span className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] border border-cyan-400/20">{category}</span>
                                </div>
                            </div>
                            <h3 className="font-heading text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors leading-[1.2] tracking-tight">{article.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">{article.excerpt}</p>
                            <div className="mt-auto flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                                <div className="flex items-center gap-2">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                  <span>{Math.max(5, Math.ceil(article.content.split(' ').length / 200))} MIN READ</span>
                                </div>
                                <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        )}
    </div>
  );
}
