"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { upsertArticle } from "@/app/ec-protocol-portal/actions";
import LinkScanner from "./LinkScanner";

export default function AdminForm({ 
  article 
}: { 
  article?: { id: string; title: string; slug: string; category: string; excerpt: string; imageUrl: string | null; content: string; published: boolean; amazonProducts?: any; createdAt?: Date | string | null } 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "links">("content");

  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    category: article?.category || "protocols",
    excerpt: article?.excerpt || "",
    imageUrl: article?.imageUrl || "",
    content: article?.content || "",
    published: article?.published ?? true,
    createdAt: article?.createdAt ? new Date(article.createdAt).toISOString().slice(0, 16) : "",
    amazonProducts: (article?.amazonProducts as any[]) || []
  });

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove all non-word chars
      .replace(/[\s_]+/g, "-") // Replace spaces/underscores with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single one
      .replace(/^-+/, "") // Trim hyphens from start
      .replace(/-+$/, ""); // Trim hyphens from end
  };

  // Generate slug on the fly
  const generateSlug = () => {
    const freshSlug = slugify(formData.title);
    setFormData({ ...formData, slug: freshSlug });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      amazonProducts: [...formData.amazonProducts, { name: "", asin: "", url: "" }]
    });
  };

  const removeProduct = (index: number) => {
    const newProducts = [...formData.amazonProducts];
    newProducts.splice(index, 1);
    setFormData({ ...formData, amazonProducts: newProducts });
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    const newProducts = [...formData.amazonProducts];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setFormData({ ...formData, amazonProducts: newProducts });
  };

  const handleContentFromScanner = (newContent: string) => {
    setFormData({ ...formData, content: newContent });
    // Flash the content tab or show a subtle notification
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/ec-portal/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setFormData(prev => ({ ...prev, imageUrl: result.imageUrl }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (err) {
      setError("Network error during upload");
    } finally {
      setUploading(false);
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccess(false);

    // Final sanitization of the slug before sending to API
    const finalSlug = slugify(formData.slug);

    try {
      const res = await upsertArticle({
        id: article?.id, // Optional, tells action to Update if present
        title: formData.title,
        slug: finalSlug,
        category: formData.category,
        excerpt: formData.excerpt,
        imageUrl: formData.imageUrl || null,
        content: formData.content,
        published: formData.published,
        createdAt: formData.createdAt ? new Date(formData.createdAt) : undefined,
        amazonProducts: formData.amazonProducts,
      });

      if (res.success) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/ec-protocol-portal");
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save article.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
            activeTab === "content" 
              ? "border-[#00F5FF] text-[#00F5FF]" 
              : "border-transparent text-white opacity-40 hover:opacity-100"
          }`}
        >
          📝 Protocol Content
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("links")}
          className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
            activeTab === "links" 
              ? "border-[#00F5FF] text-[#00F5FF]" 
              : "border-transparent text-white opacity-40 hover:opacity-100"
          }`}
        >
          🔗 Affiliate Links
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "content" ? (
          <>
            {error && <div className="bg-red-900/20 text-red-400 p-4 rounded-lg text-sm">{error}</div>}
            {showSuccess && (
              <div className="bg-emerald-900/20 text-emerald-400 p-4 rounded-xl text-xs font-black uppercase tracking-widest animate-pulse flex items-center shadow-sm border border-emerald-900/50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Content Synced - Ready to Deploy
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white opacity-70 mb-2">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5FF]/50 text-white" 
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white opacity-70 mb-2">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5FF]/50 text-white"
                >
                  <option value="protocols">Protocols</option>
                  <option value="security">Security</option>
                  <option value="hardware">Hardware</option>
                  <option value="analysis">Analysis</option>
                </select>
              </div>

              <div>
                 <label className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-white opacity-70 mb-2">
                   <span>URL Slug</span>
                   <button type="button" onClick={generateSlug} className="text-[#00F5FF] hover:underline text-[10px]">Auto-Generate</button>
                 </label>
                <input 
                  type="text" 
                  name="slug" 
                  required 
                  value={formData.slug} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none text-white" 
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white opacity-70 mb-2">Image URL (Optional)</label>
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    name="imageUrl" 
                    placeholder="/images/example.png"
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    className="flex-1 px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5FF]/50 text-white" 
                  />
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={uploading}
                    className="bg-[#00F5FF] text-black px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-white transition-all flex items-center justify-center min-w-[80px]"
                  >
                    {uploading ? (
                      <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Upload"}
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
                {formData.imageUrl && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-800 bg-black flex items-center justify-center">
                    <img 
                      src={`${formData.imageUrl}${formData.imageUrl.includes('?') ? '&' : '?'}t=${Date.now()}`} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-[8px] px-2 py-1 rounded backdrop-blur-sm uppercase font-black tracking-tighter">
                      Live Preview
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black p-6 rounded-2xl border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <label className="text-xs font-black uppercase tracking-widest text-white opacity-70">Affiliate Products (CTA Blocks)</label>
                <button type="button" onClick={addProduct} className="bg-[#00F5FF] text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-white transition-all">
                  + Add Product
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.amazonProducts.map((product: any, index: number) => (
                  <div key={index} className="flex flex-col bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-sm relative space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="w-full">
                            <label className="block text-[10px] font-black uppercase text-white opacity-40 mb-1">Product Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Ledger Nano X"
                                value={product.name}
                                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-800 focus:outline-none text-sm text-white font-medium"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-[10px] font-black uppercase text-white opacity-40 mb-1">Product ID (ASIN)</label>
                            <input 
                                type="text" 
                                placeholder="e.g. B0C123..."
                                value={product.asin}
                                onChange={(e) => handleProductChange(index, 'asin', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-800 focus:outline-none text-sm text-white font-medium"
                            />
                        </div>
                        <div className="w-full flex gap-3 items-end">
                            <div className="flex-1">
                                <label className="block text-[10px] font-black uppercase text-white opacity-40 mb-1">Direct Affiliate Link</label>
                                <input 
                                    type="text" 
                                    placeholder="Paste full URL..."
                                    value={product.url || ""}
                                    onChange={(e) => handleProductChange(index, 'url', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-black border border-gray-800 focus:outline-none text-sm text-white font-medium"
                                />
                            </div>
                            <button type="button" onClick={() => removeProduct(index)} className="bg-red-900/20 text-red-400 p-2 rounded-lg hover:bg-red-900/40 transition-all flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                      </div>
                      {product.url && (
                        <div className="text-[10px] text-[#00F5FF] font-black uppercase bg-[#00F5FF]/10 px-3 py-1.5 rounded-lg inline-block self-start">
                          ⚡ Priority: Direct link active.
                        </div>
                      )}
                  </div>
                ))}
                {formData.amazonProducts.length === 0 && (
                  <p className="text-[10px] text-white opacity-40 italic text-center py-4">No affiliate products added.</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white opacity-70 mb-2">
                  Preview Excerpt
              </label>
              <p className="text-[10px] text-white/50 mb-3">2-3 sentences of plain text. No HTML.</p>
              <textarea 
                name="excerpt" 
                required 
                rows={3}
                value={formData.excerpt} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5FF]/50 text-white resize-none" 
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white opacity-70 mb-2">
                  Full Protocol HTML Content
              </label>
              <p className="text-[10px] text-white/50 mb-3">Paste rich HTML content. Use &lt;h2&gt;, &lt;p&gt;, &lt;table&gt;.</p>
              <textarea 
                name="content" 
                required 
                rows={16}
                value={formData.content} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5FF]/50 text-white font-mono text-sm leading-relaxed" 
              />
            </div>
          </>
        ) : (
          <LinkScanner content={formData.content} onContentChange={handleContentFromScanner} />
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-800 gap-4">
          <div className="flex flex-col gap-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="published" 
                checked={formData.published} 
                onChange={handleCheckboxChange} 
                className="w-5 h-5 accent-[#00F5FF] rounded bg-black border-gray-800" 
              />
              <span className="text-sm font-black uppercase tracking-widest text-white opacity-80">
                {formData.published ? "Published (Live)" : "Draft (Hidden)"}
              </span>
            </label>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-white opacity-60">
                Publication Date
              </label>
              <input 
                type="datetime-local" 
                name="createdAt" 
                value={formData.createdAt} 
                onChange={handleChange} 
                className="px-3 py-2 text-sm rounded-lg bg-black border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5FF]/50 text-white" 
              />
            </div>
          </div>

          <div className="flex space-x-4">
            {formData.slug && (
              <a 
                href={`/${formData.category}/${formData.slug}`} 
                target="_blank" 
                rel="noreferrer"
                className="bg-gray-900 text-white px-6 py-4 rounded-xl font-black hover:bg-gray-800 transition-all uppercase tracking-widest text-sm shadow-sm flex items-center"
              >
                Preview
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            )}
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#00F5FF] text-black px-10 py-4 rounded-xl font-black hover:bg-white transition-all uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(0,245,255,0.2)] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Protocol"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
