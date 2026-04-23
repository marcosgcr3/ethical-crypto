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
    <div className="my-16 p-8 md:p-12 bg-zinc-50 rounded-[3rem] border border-black/5 shadow-inner relative overflow-hidden group">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-black/[0.03] rounded-full blur-3xl group-hover:bg-black/[0.05] transition-all duration-700"></div>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
        {/* Author Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 mb-2 block">Protocol Analyst & Author</span>
            <h3 className="font-heading text-2xl md:text-3xl font-black text-black tracking-tighter uppercase">
              {reviewer.name}
            </h3>
            <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.15em]">
              {reviewer.title}
            </p>
          </div>
          
          <p className="text-zinc-500 leading-relaxed text-base font-medium mb-8 max-w-2xl">
            {reviewer.bio || 'Deep protocol analyst and security researcher specializing in sovereign systems and on-chain intelligence.'}
          </p>

          <Link 
            href="/about" 
            className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-black hover:opacity-70 transition-colors group/link border-b-2 border-black/10 pb-1"
          >
            Intelligence Dossier
            <IconArrowUpRight className="w-4 h-4 ml-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
