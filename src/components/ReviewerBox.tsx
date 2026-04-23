import Link from 'next/link';
import { IconArrowUpRight } from './icons/CryptoIcons';

interface ReviewerProps {
  reviewer: {
    name: string;
    title: string;
    bio: string | null;
    imageUrl: string | null;
  };
}

export default function ReviewerBox({ reviewer }: ReviewerProps) {
  if (!reviewer) return null;

  return (
    <div className="my-16 p-8 md:p-10 bg-space rounded-[2.5rem] border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-all duration-700"></div>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
        {/* Author Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-cyan mb-1 block">Protocol Analyst & Author</span>
            <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-ghost tracking-tight">
              {reviewer.name}
            </h3>
            <p className="text-dim font-bold text-sm uppercase tracking-wide opacity-80">
              {reviewer.title}
            </p>
          </div>
          
          <p className="text-gray-400 leading-relaxed text-sm md:text-base font-medium mb-6">
            {reviewer.bio || 'Deep protocol analyst and security researcher specializing in sovereign systems and on-chain intelligence.'}
          </p>

          <Link 
            href="/about" 
            className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-cyan hover:opacity-70 transition-colors group/link"
          >
            Read Full Intelligence Dossier
            <IconArrowUpRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
