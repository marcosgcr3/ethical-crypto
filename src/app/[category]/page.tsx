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
    <div className="container mx-auto px-6 mb-24 min-h-screen bg-white pt-12 font-sans">
        {/* Header */}
        <header className="mb-16 border-b border-black/5 pb-12">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-black uppercase tracking-tighter">
                {categoryName} <span className="text-zinc-500">Intelligence</span>
            </h1>
            <p className="text-xl text-zinc-500 mt-6 max-w-2xl font-medium leading-relaxed">
                Deploying cutting-edge frameworks and technical benchmarks for {categoryName.toLowerCase()}. High-signal research for the technical elite.
            </p>
        </header>

        {/* Empty State vs Full State */}
        {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-32 bg-zinc-50 border border-zinc-100 rounded-[3rem] relative overflow-hidden group shadow-inner">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 border border-zinc-100 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="font-heading text-3xl font-black text-black mb-4 uppercase tracking-tighter">Access Restricted</h3>
                <p className="text-zinc-500 max-w-md mx-auto mb-10 font-medium">Our Intelligence Unit is currently auditing and signing off on specific {categoryName} documentation. Access will be granted shortly.</p>
                <Link href="/" className="bg-black text-white px-10 py-5 rounded-2xl font-black hover:bg-zinc-800 transition-all text-[10px] uppercase tracking-[0.2em] shadow-xl">Return to Terminal</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {articles.map((article) => (
                    <Link key={article.id} href={`/${category}/${article.slug}`} className="group relative block cursor-pointer">
                        <article className="h-full flex flex-col">
                            <div className="relative overflow-hidden rounded-[2.5rem] mb-8 bg-zinc-50 h-72 border border-zinc-100 shadow-sm transition-all group-hover:border-black/10 group-hover:shadow-2xl">
                                {article.imageUrl && (
                                    <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                )}
                                <div className="absolute top-8 left-8">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase text-black tracking-widest border border-black/5 shadow-sm">{category}</span>
                                </div>
                            </div>
                            <h3 className="font-heading text-2xl font-black mb-4 text-black group-hover:text-zinc-500 transition-colors leading-[1.1] tracking-tighter uppercase">{article.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">{article.excerpt}</p>
                            <div className="mt-auto flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-300">
                                <div className="flex items-center gap-2">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
