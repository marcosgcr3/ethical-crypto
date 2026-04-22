import Link from "next/link";
import Image from "next/image";
import { Article } from "@prisma/client";
import { IconArrowUpRight } from "./icons/CryptoIcons";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ethicalcrypto.ai';

  return (
    <section className="py-16 mt-16 border-t border-black/5">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="font-heading text-3xl font-black text-ghost uppercase tracking-tight">
          Next <span className="text-cyan">Logic Node</span>
        </h3>
        <div className="flex-1 h-px bg-black/5"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/${article.category}/${article.slug}`}
              className="bg-white rounded-[2rem] border border-black/5 p-4 flex flex-col h-full group hover:border-black transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/5 rounded-[1.5rem]">
                <Image 
                  src={article.imageUrl || '/images/hero.png'} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-heading text-base font-extrabold text-black group-hover:text-cyan transition-colors line-clamp-2 leading-tight mb-3">
                  {article.title}
                </h4>
                
                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow font-medium leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-[10px] font-black text-dim/30 mt-auto">
                  <span className="uppercase tracking-widest">
                    {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="group-hover:text-cyan transition-colors flex items-center gap-2 uppercase tracking-[0.2em]">
                    <IconArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
        ))}
      </div>
    </section>
  );
}
