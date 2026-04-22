"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type LinkStatus = "unchecked" | "checking" | "ok" | "broken" | "error";

interface LinkDetail {
  url: string;
  status: LinkStatus;
  title?: string;
  finalUrl?: string;
}

interface ArticleSummary {
  id: string;
  title: string;
  category: string;
  links: LinkDetail[];
  health: "healthy" | "partial" | "critical" | "none";
}

interface GlobalLinkScannerProps {
  articles: any[];
  onClose: () => void;
}

const AMAZON_REGEX = /(?:https?:)?\/\/(?:www\.)?(?:amazon\.[a-z\.]{2,12}|amzn\.[a-z]{2,4})\/([^\s"'<>]+)/g;

export default function GlobalLinkScanner({ articles, onClose }: GlobalLinkScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(-1);
  const [articleResults, setArticleResults] = useState<Record<string, LinkDetail[]>>({});
  const [processedCount, setProcessedCount] = useState(0);

  // Extract all unique links from all articles for efficient checking
  const allSummaries: ArticleSummary[] = useMemo(() => {
    return articles.map(article => {
      const foundLinks: string[] = [];
      let match;
      
      // 1. Scan content
      while ((match = AMAZON_REGEX.exec(article.content)) !== null) {
        foundLinks.push(match[0]);
      }

      // 2. Scan amazonProducts JSON
      const products = (article.amazonProducts as any[]) || [];
      products.forEach(p => {
        if (p.url && p.url.startsWith('http')) {
          foundLinks.push(p.url);
        } else if (p.asin) {
           if (p.asin.startsWith('http')) {
             foundLinks.push(p.asin);
           } else {
             foundLinks.push(`https://www.amazon.com/dp/${p.asin}`);
           }
        }
      });

      // Unique links only
      const uniqueLinks = Array.from(new Set(foundLinks));
      const results = articleResults[article.id] || uniqueLinks.map(url => ({ url, status: "unchecked" as LinkStatus }));

      // Calculate health
      let health: ArticleSummary["health"] = "none";
      if (results.length > 0) {
        const brokenCount = results.filter(r => r.status === "broken").length;
        const okCount = results.filter(r => r.status === "ok").length;
        
        if (brokenCount === 0 && okCount > 0) health = "healthy";
        else if (brokenCount > 0 && okCount > 0) health = "partial";
        else if (brokenCount > 0 && okCount === 0) health = "critical";
      }

      return {
        id: article.id,
        title: article.title,
        category: article.category,
        links: results,
        health
      };
    });
  }, [articles, articleResults]);

  const startScan = async () => {
    setScanning(true);
    setProcessedCount(0);
    
    // Clear previous results
    setArticleResults({});

    for (let i = 0; i < allSummaries.length; i++) {
      const article = allSummaries[i];
      setCurrentArticleIndex(i);
      
      if (article.links.length === 0) {
        setProcessedCount(prev => prev + 1);
        continue;
      }

      // Check links for this article
      const urls = article.links.map(l => l.url);
      
      try {
        const res = await fetch("/api/ec-portal/check-links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls }),
        });
        const data = await res.json();
        
        if (data.results) {
          setArticleResults(prev => ({
            ...prev,
            [article.id]: data.results
          }));
        }
      } catch (error) {
        console.error("Error scanning article:", article.title, error);
      }
      
      setProcessedCount(prev => prev + 1);
      // Small delay to be gentle and prevent UI freezing
      await new Promise(r => setTimeout(r, 100));
    }

    setScanning(false);
    setCurrentArticleIndex(-1);
  };

  const stats = {
    healthy: allSummaries.filter(s => s.health === "healthy").length,
    partial: allSummaries.filter(s => s.health === "partial").length,
    critical: allSummaries.filter(s => s.health === "critical").length,
    none: allSummaries.filter(s => s.health === "none").length,
  };

  return (
    <div className="fixed inset-0 bg-slate/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
      <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col border border-white/20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-extrabold text-bioblue uppercase tracking-tight">Global Link Scanner</h2>
            <p className="text-sm text-slate opacity-60">Verifying Amazon product integrity across all content.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-slate hover:bg-gray-50 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Stats & Progress */}
        <div className="px-8 py-6 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate opacity-40 block">Healthy</span>
              <span className="text-lg font-extrabold text-emerald-600">{stats.healthy}</span>
            </div>
            <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate opacity-40 block">Partial</span>
              <span className="text-lg font-extrabold text-amber-500">{stats.partial}</span>
            </div>
            <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate opacity-40 block">Critical</span>
              <span className="text-lg font-extrabold text-red-500">{stats.critical}</span>
            </div>
            <div className="bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm hidden md:block">
              <span className="text-[10px] uppercase font-bold text-slate opacity-40 block">No Links</span>
              <span className="text-lg font-extrabold text-slate opacity-30">{stats.none}</span>
            </div>
          </div>

          <div className="flex-1 max-w-sm w-full">
            {scanning ? (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-bioblue">
                  <span>Scanning Articles...</span>
                  <span>{processedCount} / {articles.length}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-bioblue transition-all duration-300"
                    style={{ width: `${(processedCount / articles.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
                <button 
                  onClick={startScan}
                  className="w-full bg-bioblue text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-bioblue/20 hover:scale-[1.02] active:scale-100 transition-all"
                >
                  Start Global Scan
                </button>
            )}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-4">
            {allSummaries.map((s, idx) => {
              if (s.health === "none" && !scanning) return null; // Hide articles with no links by default
              
              const isProcessing = scanning && currentArticleIndex === idx;

              return (
                <div 
                  key={s.id} 
                  className={`
                    border rounded-2xl p-4 flex items-center gap-6 transition-all
                    ${isProcessing ? 'border-bioblue bg-bioblue/5 scale-[0.99]' : 'border-gray-100 bg-white hover:border-gray-200'}
                  `}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                        {s.health === "healthy" && <span className="text-emerald-500">✅</span>}
                        {s.health === "partial" && <span className="text-amber-500">⚠️</span>}
                        {s.health === "critical" && <span className="text-red-500">❌</span>}
                        {s.health === "none" && <span className="opacity-20 italic">No links</span>}
                      <h4 className="font-bold text-slate truncate max-w-md">{s.title}</h4>
                      <span className="text-[10px] font-bold text-bioblue uppercase">{s.category}</span>
                    </div>
                    {s.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.links.map((l, lidx) => (
                           <span 
                            key={lidx} 
                            className={`text-[8px] px-2 py-0.5 rounded border ${
                                l.status === 'ok' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                                l.status === 'broken' ? 'bg-red-50 border-red-100 text-red-700' :
                                l.status === 'error' && l.title?.includes('Blocked') ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                'bg-gray-50 border-gray-100 text-slate opacity-40'
                            }`}
                           >
                              {l.status === 'ok' ? 'VERIFIED' : 
                               l.status === 'broken' ? 'BROKEN' : 
                               l.status === 'error' && l.title?.includes('Blocked') ? 'BLOCKED' : 'PENDING'}
                           </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link 
                    href={`/ec-protocol-portal/editor/${s.id}`} 
                    className="text-[10px] font-bold uppercase tracking-widest text-bioblue border border-bioblue/20 px-4 py-2 rounded-lg hover:bg-bioblue hover:text-white transition-all shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              );
            })}
            
            {!scanning && allSummaries.every(s => s.health === "none") && (
                <div className="py-20 text-center opacity-30 italic">
                    Press "Start Global Scan" to analyze your content.
                </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 text-[10px] text-slate opacity-40 uppercase font-bold tracking-widest text-center">
            Ethical Crypto System Scanner v1.0
        </div>
      </div>
    </div>
  );
}
