'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { calculateReadTime } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string | null;
  category: string | null;
  createdAt: Date;
}

interface LatestArticlesProps {
  initialArticles: Article[];
}

export default function LatestArticles({ initialArticles }: LatestArticlesProps) {
  const [visibleCount, setVisibleCount] = useState(9);

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, initialArticles.length));
  };

  const displayedArticles = initialArticles.slice(0, visibleCount);
  const hasMore = visibleCount < initialArticles.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {displayedArticles.map((article, index) => {
          const category = article.category ?? 'protocols';
          const displayCategory = category === 'wealthspan' ? 'wealthpumps' : 
                                 category === 'crypto' ? 'protocols' : 
                                 category === 'hardware' ? 'wallets' : category;
          
          const imgSrc = article.imageUrl;
          const readTime = calculateReadTime(article.content);
          const dateStr = new Date(article.createdAt).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          });

          // A subtle entry transition for newly revealed items
          const isNewlyRevealed = index >= 9;

          return (
            <Link 
              key={article.id} 
              href={`/${displayCategory}/${article.slug}`} 
              className={`group relative block cursor-pointer transition-all duration-700 ${
                isNewlyRevealed ? 'animate-fade-in' : ''
              }`}
            >
              <article className="bg-white rounded-[3rem] border border-black/5 hover:border-zinc-200 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl relative h-full flex flex-col justify-between">
                <div>
                  {imgSrc && (
                    <div className="relative overflow-hidden h-56 bg-zinc-50">
                      <Image 
                        src={imgSrc} 
                        alt={article.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-all duration-1000 opacity-80 group-hover:opacity-100" 
                      />
                    </div>
                  )}
                  
                  <div className="absolute top-10 right-10 z-20">
                    <span className="bg-zinc-50 text-zinc-600 border border-zinc-100 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm group-hover:border-black/10 group-hover:text-black transition-all">
                      {displayCategory}
                    </span>
                  </div>

                  <div className="p-10 pb-4">
                    <h3 className="font-heading text-xl font-black mb-4 group-hover:text-zinc-600 transition-colors leading-[1.1] text-black uppercase tracking-tighter">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-3 text-black/70 mb-6 font-medium">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-10 pt-0">
                  <div className="flex items-center text-[10px] font-black tracking-[0.3em] text-black/60 uppercase">
                    <span>{readTime} MIN READ</span>
                    <span className="mx-3 text-black/40" aria-hidden="true">•</span>
                    <span>{dateStr}</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-20 animate-fade-in">
          <button 
            onClick={handleSeeMore}
            className="bg-black text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center gap-4 text-xs shadow-2xl group hover:shadow-black/20 hover:scale-[1.02]"
          >
            See More Insights
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
