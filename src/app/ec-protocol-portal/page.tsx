import { Metadata } from 'next';
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Protocol Intelligence Hub | Ethical Crypto',
  robots: {
    index: false,
    follow: false,
  },
};
import Link from "next/link";
import { deleteArticle } from "./actions";
import { logoutAction } from "./login/actions";
import { getSubscribers } from "../actions/newsletter";
import AdminSubscribers from "../../components/AdminSubscribers";
import AdminAnalystPanel from "../../components/AdminAnalystPanel";

const prisma = new PrismaClient();

import AdminTools from "../../components/AdminTools";
import DeleteArticleButton from "../../components/DeleteArticleButton";
import { IconYield, IconSecurity, IconAnalysis, IconHardware } from "../../components/icons/CryptoIcons";

function getWordCount(html: string) {
  if (!html) return 0;
  // Remove HTML tags and replace with space to avoid merging words
  const text = html.replace(/<[^>]*>/g, ' ');
  // Split by whitespace and filter out empty strings
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

export default async function AdminDashboard() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  const subscribers = await getSubscribers();

  const drafts = articles.filter(a => !a.published);
  const published = articles.filter(a => a.published);

  const founder = await prisma.reviewer.findFirst();

  const renderArticleList = (list: typeof articles, emptyMessage: string) => (
    <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden mb-12">
      <ul className="divide-y divide-black/5">
        <li className="grid grid-cols-12 gap-4 px-8 py-5 bg-zinc-50 text-[10px] font-black uppercase tracking-[0.2em] text-black">
          <div className="col-span-6 md:col-span-3">Article Title</div>
          <div className="col-span-4 md:col-span-2">Category</div>
          <div className="col-span-2 hidden md:block text-center">Complexity</div>
          <div className="col-span-2 hidden md:block text-center">Timestamp</div>
          <div className="col-span-6 md:col-span-3 text-right">Operations</div>
        </li>
        
        {list.length === 0 ? (
          <li className="px-8 py-16 text-center text-xs font-bold uppercase tracking-widest text-black/20">{emptyMessage}</li>
        ) : (
          list.map((article) => (
              <li key={article.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center hover:bg-zinc-50 transition-colors border-l-2 border-transparent hover:border-black">
                <div className="col-span-6 md:col-span-3 font-bold text-sm text-black line-clamp-1" title={article.title}>
                  {article.title}
                </div>
                <div className="col-span-4 md:col-span-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-black bg-black/5 px-2 py-1 rounded-full border border-black/10">
                      {article.category}
                  </span>
                </div>
              <div className="col-span-2 hidden md:block text-center">
                <span className="text-black/40 text-[10px] font-bold">
                  {getWordCount(article.content)} NODES
                </span>
              </div>
              <div className="col-span-2 hidden md:block text-center text-[10px] font-bold text-black/30 uppercase tracking-tighter">
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
              <div className="col-span-6 md:col-span-3 flex justify-end items-center gap-2">
                <Link 
                  href={`/${article.category}/${article.slug}`} 
                  target="_blank"
                  title="Pulse Check"
                  className="p-2 text-black/30 hover:text-black hover:bg-black/5 rounded-xl transition-all"
                >
                  <IconYield className="w-5 h-5" />
                </Link>
                <Link 
                  href={`/ec-protocol-portal/editor/${article.id}`} 
                  title="Modify Logic"
                  className="p-2 text-black/30 hover:text-black hover:bg-black/5 rounded-xl transition-all"
                >
                  <IconAnalysis className="w-5 h-5" />
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-black selection:bg-black/10">
      <div className="container mx-auto px-8 py-24 pb-48">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 border-b border-black/5 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-8 bg-black rounded-full"></div>
              <h1 className="font-heading text-4xl font-black uppercase tracking-tight">Intelligence Hub</h1>
            </div>
            <p className="text-black/40 text-sm font-bold uppercase tracking-[0.1em]">Sovereign Protocol Management System <span className="text-black/40">v4.0.2</span></p>
          </div>
          <AdminTools articles={articles} />
        </div>

        <AdminSubscribers initialSubscribers={subscribers} />

        <AdminAnalystPanel reviewer={founder} />

        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 rounded-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.1)]"></div>
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-black/80">Pending Protocols</h2>
          </div>
          {renderArticleList(drafts, "System fully optimized. All logic nodes are currently live.")}
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 rounded-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.1)]"></div>
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-black/80">Deployed Article Nodes</h2>
          </div>
          {renderArticleList(published, "Mainnet is currently empty. Initialize intelligence stream.")}
        </div>
      </div>
    </div>
  );
}
