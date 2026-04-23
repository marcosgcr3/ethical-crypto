import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import ReviewerBox from '@/components/ReviewerBox';
import RelatedArticles from '@/components/RelatedArticles';
import { IconYield, IconSecurity, IconAnalysis, IconHardware, IconClock, IconArrowUpRight, IconNode } from '@/components/icons/CryptoIcons';

export async function generateMetadata(
  { params }: { params: Promise<{ category: string, slug: string }> }
): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug }
  });

  if (!article) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ethicalcrypto.ai';
  const canonicalUrl = `${baseUrl}/${category}/${slug}`;

  let displayTitle = article.title;
  if (displayTitle.length > 54) {
    const lastSpace = displayTitle.substring(0, 54).lastIndexOf(' ');
    displayTitle = lastSpace > 30 ? displayTitle.substring(0, lastSpace) : displayTitle.substring(0, 54);
  }

  let displayDescription = article.excerpt;
  if (displayDescription.length > 155) {
    const lastSpace = displayDescription.substring(0, 155).lastIndexOf(' ');
    displayDescription = lastSpace > 100 ? displayDescription.substring(0, lastSpace) : displayDescription.substring(0, 155);
    displayDescription += '...';
  }

  return {
    title: `${displayTitle} | EC`,
    description: displayDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: 'Ethical Crypto',
      images: [
        {
          url: article.imageUrl?.startsWith('/images/') 
            ? `${baseUrl}/api/images/${article.imageUrl.split('/').pop()}` 
            : article.imageUrl || `${baseUrl}/images/hero.png`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl || `${baseUrl}/images/hero.png`],
    },
  };
}

export const revalidate = 0;

export default async function ArticlePage({ params }: { params: { category: string, slug: string } }) {
  // Await params in Next 15 Dynamic APIs
  const { category, slug } = await params;

  // Fetch article with active Reviewer inclusion
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { reviewer: true }
  });

  const session = await getSession();
  const isAdmin = !!session;

  if (!article || article.category !== category || (!article.published && !isAdmin)) {
    notFound(); // Triggers 404 page
  }

  // Fetch 3 related articles (same category, published, exclude current)
  const relatedArticles = await prisma.article.findMany({
    where: {
      category: article.category,
      published: true,
      id: { not: article.id }
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ethicalcrypto.ai';
  const articleUrl = `${baseUrl}/${article.category}/${article.slug}`;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl?.startsWith('/images/') 
      ? `${baseUrl}/api/images/${article.imageUrl.split('/').pop()}` 
      : article.imageUrl || `${baseUrl}/images/hero.png`,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: article.reviewer?.name || 'Satoshi Vanguard',
      url: `${baseUrl}/about`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ethical Crypto',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  };

  if (article.reviewer) {
    (jsonLd as any).editor = {
      '@type': 'Person',
      name: article.reviewer.name,
      jobTitle: article.reviewer.title
    };
  }

  // BreadcrumbList JSON-LD for E-E-A-T
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Intelligence Hub', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: category.charAt(0).toUpperCase() + category.slice(1), item: `${baseUrl}/${category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <article className="container mx-auto px-6 max-w-5xl py-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-12">
          <Link href="/" className="hover:text-black transition-opacity">Terminal</Link>
          <span className="mx-3 opacity-30">/</span>
          <Link href={`/${category}`} className="hover:text-black transition-opacity">{category}</Link>
          <span className="mx-3 opacity-30">/</span>
          <span className="text-black">{slug.replace(/-/g, ' ')}</span>
      </nav>

      {/* Header */}
      <header className="mb-16">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-10 tracking-tighter text-black uppercase">
            {article.title}<span className="text-zinc-300">.</span>
          </h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
              <Link href="/about" className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity">
                <div className="w-10 h-10 rounded-xl bg-black text-white p-1 flex items-center justify-center shadow-lg">
                  <IconNode className="w-5 h-5" />
                </div>
                <span>{article.reviewer?.name || 'Satoshi Vanguard'}</span>
              </Link>
              <div className="px-4 py-1.5 bg-black text-white rounded-full text-[9px] font-black tracking-widest">
                {category}
              </div>
              <div className="flex items-center gap-2">
                <IconClock className="w-4 h-4 opacity-30" />
                <span>{Math.max(5, Math.ceil(article.content.split(' ').length / 200))} Min Read</span>
              </div>
              <time className="opacity-50" dateTime={article.createdAt.toISOString()}>
                {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
          </div>
      </header>

      {/* Featured Image */}
      {article.imageUrl && (
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-24 aspect-video bg-zinc-100 border border-black/5">
              <Image 
                src={article.imageUrl} 
                alt={article.title} 
                fill 
                className={`object-cover transition-all duration-700 ${article.imageGrayscale ? 'grayscale hover:grayscale-0' : ''}`} 
                priority 
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
              />
          </div>
      )}

      {/* Content Injection Area */}
          <div className="max-w-4xl mx-auto">
              <div 
                  className="prose prose-zinc max-w-none 
                    prose-h2:text-black prose-h2:text-4xl prose-h2:font-black prose-h2:tracking-tight prose-h2:mb-10 prose-h2:mt-20 prose-h2:uppercase
                    prose-p:text-black/60 prose-p:text-xl prose-p:leading-relaxed prose-p:mb-10 prose-p:font-medium
                    prose-strong:text-black prose-strong:font-bold
                    prose-a:text-black prose-a:underline prose-a:underline-offset-4 hover:prose-a:opacity-70
                    prose-li:text-black/60 prose-li:mb-4 prose-li:text-lg
                    prose-table:border-black/5 prose-th:text-black prose-td:text-black/60"
                  dangerouslySetInnerHTML={{ __html: article.content }} 
              />

              {/* Author / Reviewer Box */}
              {article.reviewer && (
                <ReviewerBox reviewer={article.reviewer} />
              )}
              
              {/* Related Articles Matrix */}
              <RelatedArticles articles={relatedArticles} />
              
              <div className="mt-20 text-center pb-20">
                    <Link 
                      href="/" 
                      className="inline-flex items-center gap-4 text-black font-black px-12 py-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-all text-xs uppercase tracking-[0.2em] border border-black/5 group"
                    >
                     <IconArrowUpRight className="w-4 h-4 -rotate-[135deg] group-hover:-translate-x-1 transition-transform" />
                     Return to Intelligence Feed
                   </Link>
              </div>
          </div>
      </article>
    </div>
  );
}
