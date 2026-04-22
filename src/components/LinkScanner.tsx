"use client";
import { useState, useMemo, useEffect } from "react";

type LinkStatus = "unchecked" | "checking" | "ok" | "broken" | "error";

const STATUS_ICON: Record<LinkStatus, string> = {
  unchecked: "⬜",
  checking: "⏳",
  ok: "✅",
  broken: "❌",
  error: "⚠️",
};

const STATUS_LABEL: Record<LinkStatus, string> = {
  unchecked: "Unchecked",
  checking: "Checking...",
  ok: "Works",
  broken: "Broken/Redirect",
  error: "Error",
};

function statusColor(s: LinkStatus): string {
  if (s === "ok") return "text-emerald-500";
  if (s === "broken") return "text-red-500";
  if (s === "error") return "text-amber-500";
  if (s === "checking") return "text-blue-500";
  return "text-slate-400";
}

interface LinkScannerProps {
  content: string;
  onContentChange: (newContent: string) => void;
}

interface AmazonLink {
  fullUrl: string;
  context: string;
  index: number;
  matchPos: number;
}

export default function LinkScanner({ content, onContentChange }: LinkScannerProps) {
  const [replacements, setReplacements] = useState<Record<number, string>>({});
  const [asins, setAsins] = useState<Record<number, string>>({});
  const [applied, setApplied] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, LinkStatus>>({});
  const [details, setDetails] = useState<Record<string, { finalUrl?: string, title?: string }>>({});
  const [verifying, setVerifying] = useState(false);
  const [affiliateTag, setAffiliateTag] = useState(process.env.NEXT_PUBLIC_AMAZON_TAG || "solarrv0e-20");

  // Load affiliate tag from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ec_admin_affiliate_id");
    if (saved) setAffiliateTag(saved);
  }, []);

  const handleTagChange = (val: string) => {
    setAffiliateTag(val.trim());
    localStorage.setItem("ec_admin_affiliate_id", val.trim());
  };

  // Scan content for Amazon links with broader support for international and shortened domains
  const links: AmazonLink[] = useMemo(() => {
    // capturing amzn.to, amzn.eu, amzn.uk, etc. and various amazon TLDs
    const regex = /(?:https?:)?\/\/(?:www\.)?(?:amazon\.[a-z\.]{2,12}|amzn\.[a-z]{2,4})\/([^\s"'<>]+)/g;
    const found: AmazonLink[] = [];
    let match;
    let idx = 0;

    while ((match = regex.exec(content)) !== null) {
      // Find context: try to find preceding h3/h4/strong within 300 chars
      const startPos = Math.max(0, match.index - 300);
      const contextBlock = content.slice(startPos, match.index);
      
      let context = "No context found";
      const hMatch = [...contextBlock.matchAll(/<(h[2-4]|strong)[^>]*>([^<]+)<\/\1>/g)].pop();
      if (hMatch) context = hMatch[2].trim();

      found.push({
        fullUrl: match[0],
        context,
        index: idx++,
        matchPos: match.index,
      });
    }
    return found;
  }, [content]);

  const handleReplacementChange = (index: number, newUrl: string) => {
    setReplacements((prev) => ({ ...prev, [index]: newUrl }));
    setApplied(false);
  };

  const handleAsinChange = (index: number, val: string) => {
    const asin = val.trim();
    setAsins((prev) => ({ ...prev, [index]: asin }));
    
    // ASINs are typically 10 chars starting with B or numbers
    if (asin.length >= 10) {
      const isAsin = asin.startsWith('B') || /^[0-9]/.test(asin);
      if (isAsin) {
        const newUrl = `https://www.amazon.com/dp/${asin.toUpperCase()}?tag=${affiliateTag}`;
        handleReplacementChange(index, newUrl);
      }
    }
  };

  const applyReplacements = () => {
    let newContent = content;
    const sortedReplacements = Object.entries(replacements)
      .map(([idx, url]) => ({ 
        link: links[parseInt(idx)], 
        newUrl: url 
      }))
      .filter(item => item.newUrl && item.newUrl !== item.link.fullUrl)
      .sort((a, b) => b.link.matchPos - a.link.matchPos);

    sortedReplacements.forEach(({ link, newUrl }) => {
      const prefix = newContent.slice(0, link.matchPos);
      const suffix = newContent.slice(link.matchPos + link.fullUrl.length);
      newContent = prefix + newUrl + suffix;
    });

    onContentChange(newContent);
    setReplacements({});
    setAsins({});
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  const verifyUrls = async (urls: string[]) => {
    setStatuses((prev) => {
      const next = { ...prev };
      for (const url of urls) next[url] = "checking";
      return next;
    });

    try {
      const res = await fetch("/api/ec-portal/check-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      const data = await res.json();
      if (Array.isArray(data.results)) {
        setStatuses((prev) => {
          const next = { ...prev };
          for (const { url, status } of data.results) next[url] = status;
          return next;
        });
        setDetails((prev) => {
          const next = { ...prev };
          for (const { url, finalUrl, title } of data.results) {
            next[url] = { finalUrl, title };
          }
          return next;
        });
      }
    } catch {
      setStatuses((prev) => {
        const next = { ...prev };
        for (const url of urls) next[url] = "error";
        return next;
      });
    }
  };

  const handleVerifyAll = async () => {
    setVerifying(true);
    const allUrls = links.map((l) => l.fullUrl);
    for (let i = 0; i < allUrls.length; i += 10) {
      await verifyUrls(allUrls.slice(i, i + 10));
    }
    setVerifying(false);
  };

  const pendingCount = Object.values(replacements).filter(v => v && v.length > 5).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-black uppercase tracking-tight">Amazon Link Scanner</h3>
          <p className="text-xs text-black opacity-60">Found {links.length} potential Amazon links in this article. Verification checks if they lead to <strong>specific products</strong>.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-black opacity-40 uppercase tracking-widest">Affiliate Tag</label>
            <input 
              type="text" 
              placeholder="e.g. marco-20"
              value={affiliateTag}
              onChange={(e) => handleTagChange(e.target.value)}
              className="bg-zinc-50 border border-black/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-black/10 text-black font-bold"
            />
          </div>

          <div className="flex gap-2 self-end">
            {links.length > 0 && (
              <button
                type="button"
                onClick={handleVerifyAll}
                disabled={verifying}
                className="bg-zinc-100 text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all disabled:opacity-50 h-10 border border-black/5"
              >
                {verifying ? "Checking..." : "Verify All Links"}
              </button>
            )}
            {pendingCount > 0 && (
              <button
                type="button"
                onClick={applyReplacements}
                className="bg-black text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-zinc-800 transition-all h-10"
              >
                Apply {pendingCount} Replacements
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-black text-[10px] font-bold uppercase tracking-widest border-b border-black/5">
              <tr>
                <th className="text-left px-6 py-4 w-12 text-center">#</th>
                <th className="text-left px-6 py-4 w-24">Status</th>
                <th className="text-left px-6 py-4">Context & Destination</th>
                <th className="text-left px-6 py-4">Product Found</th>
                <th className="text-left px-6 py-4 w-40">New ASIN</th>
                <th className="text-left px-6 py-4">New Affiliate URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {links.map((link, i) => {
                const status = statuses[link.fullUrl] || "unchecked";
                const detail = details[link.fullUrl];
                return (
                  <tr key={i} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-black opacity-40 font-mono text-xs text-center">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-lg leading-none">{STATUS_ICON[status]}</span>
                        <span className={`text-[8px] font-bold uppercase tracking-tighter ${statusColor(status)}`}>
                          {STATUS_LABEL[status]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-black max-w-[200px] truncate">{link.context}</div>
                      <div className="mt-1">
                        <code className="bg-zinc-50 text-black opacity-40 px-2 py-0.5 rounded text-[8px] block max-w-[200px] truncate border border-black/5 italic">
                          Target: {link.fullUrl}
                        </code>
                        {detail?.finalUrl && (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-[8px] text-emerald-600 font-bold uppercase">Final:</span>
                            <a 
                              href={detail.finalUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-[8px] text-black/60 hover:underline underline-offset-1 truncate max-w-[150px]"
                            >
                              {detail.finalUrl}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       {status === "ok" ? (
                         <div className="max-w-[200px]">
                           <div className="text-[10px] font-medium text-black line-clamp-2 leading-tight">
                             {detail?.title}
                           </div>
                           <span className="text-[8px] text-emerald-600 font-bold uppercase mt-1 block font-extrabold tracking-widest">✅ Verified Product</span>
                         </div>
                       ) : status === "broken" ? (
                         <div className="max-w-[200px]">
                           <div className="text-[10px] font-medium text-red-600 line-clamp-2 leading-tight">
                             {detail?.title || "Broken Link"}
                           </div>
                           {(detail?.title?.toLowerCase().includes("search") || 
                             detail?.title?.toLowerCase().includes("búsqueda") ||
                             detail?.title?.toLowerCase().includes("results")) ? (
                             <span className="text-[8px] text-red-600 font-bold uppercase mt-1 block">⚠️ Redirected to Search</span>
                           ) : (
                             <span className="text-[8px] text-red-600 font-bold uppercase mt-1 block">❌ Product Not Found</span>
                           )}
                         </div>
                       ) : status === "error" && detail?.title?.includes("Blocked") ? (
                         <div className="max-w-[200px]">
                           <div className="text-[10px] font-medium text-amber-600 leading-tight italic">
                             Amazon Blocked Verification
                           </div>
                           <span className="text-[8px] text-amber-500 font-bold uppercase mt-1 block">🔒 Bot Detection (Soft Check)</span>
                           <p className="text-[7px] text-black opacity-40 mt-1 uppercase tracking-tighter">Amazon prevented automated checking. Link might be correct.</p>
                         </div>
                       ) : (
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-black opacity-30 italic">Pending / Error</span>
                            {status === "error" && !detail?.title?.includes("Blocked") && (
                                <span className="text-[8px] text-amber-500 font-bold uppercase">Check timeout or DNS error</span>
                            )}
                         </div>
                       )}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="e.g. B0C..."
                        value={asins[link.index] || ""}
                        onChange={(e) => handleAsinChange(link.index, e.target.value)}
                        className="w-full bg-zinc-50 border border-black/5 rounded-lg px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:ring-1 focus:ring-black/10 text-black font-bold uppercase"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="Paste full URL..."
                        value={replacements[link.index] || ""}
                        onChange={(e) => handleReplacementChange(link.index, e.target.value)}
                        className="w-full bg-zinc-50 border border-black/5 rounded-lg px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:ring-1 focus:ring-black/10 text-black/60"
                      />
                    </td>
                  </tr>
                );
              })}
              {links.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-xs text-black opacity-40 italic">
                    No Amazon links detected in the current content.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {applied && (
        <div className="fixed bottom-10 right-10 bg-black text-white px-6 py-3 rounded-full shadow-2xl animate-bounce text-sm font-bold flex items-center gap-2 z-[99]">
          <span>✅ Replacements applied locally. Press "Save Article" to finalize.</span>
        </div>
      )}
    </div>
  );
}
