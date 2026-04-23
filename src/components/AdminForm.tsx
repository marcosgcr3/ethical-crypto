"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { upsertArticle } from "@/app/ec-protocol-portal/actions";

export default function AdminForm({ 
  article 
}: { 
  article?: { id: string; title: string; slug: string; category: string; excerpt: string; imageUrl: string | null; imageGrayscale?: boolean; content: string; published: boolean; createdAt?: Date | string | null } 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    category: article?.category || "protocols",
    excerpt: article?.excerpt || "",
    imageUrl: article?.imageUrl || "",
    imageGrayscale: article?.imageGrayscale ?? true,
    content: article?.content || "",
    published: article?.published ?? true,
    createdAt: article?.createdAt ? new Date(article.createdAt).toISOString().slice(0, 16) : "",
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
        imageGrayscale: formData.imageGrayscale,
        content: formData.content,
        published: formData.published,
        createdAt: formData.createdAt ? new Date(formData.createdAt) : undefined,
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-500/10 text-red-600 p-4 rounded-lg text-sm font-bold border border-red-500/20">{error}</div>}
        {showSuccess && (
          <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-xl text-xs font-black uppercase tracking-widest animate-pulse flex items-center shadow-sm border border-emerald-500/20">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Content Synced - Ready to Deploy
          </div>
        )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-black opacity-70 mb-2">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 text-black font-bold" 
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-black opacity-70 mb-2">Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 text-black font-bold"
                >
                  <option value="protocols">Protocols</option>
                  <option value="wealthspan">Wealthspan</option>
                  <option value="fundamentals">Fundamentals</option>
                  <option value="wealthpumps">Wealthpumps</option>
                  <option value="security">Security / Wallets</option>
                </select>
              </div>

              <div>
                  <label className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-black opacity-70 mb-2">
                    <span>URL Slug</span>
                    <button type="button" onClick={generateSlug} className="text-black opacity-60 hover:opacity-100 hover:underline text-[10px]">Auto-Generate</button>
                  </label>
                <input 
                  type="text" 
                  name="slug" 
                  required 
                  value={formData.slug} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-black/5 focus:outline-none text-black font-medium" 
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-black opacity-70 mb-2">Image URL (Optional)</label>
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    name="imageUrl" 
                    placeholder="Leave empty for no photo"
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    className="flex-1 px-4 py-3 rounded-lg bg-zinc-50 border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 text-black font-medium" 
                  />
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={uploading}
                    className="bg-black text-white px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-zinc-800 transition-all flex items-center justify-center min-w-[80px]"
                  >
                    {uploading ? "SYNC..." : "Upload"}
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
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-black/5 bg-zinc-50 flex items-center justify-center shadow-inner">
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
                
                {formData.imageUrl && (
                  <label className="flex items-center space-x-3 cursor-pointer mt-4 bg-zinc-50 p-3 rounded-lg border border-black/5">
                    <input 
                      type="checkbox" 
                      name="imageGrayscale" 
                      checked={formData.imageGrayscale} 
                      onChange={handleCheckboxChange} 
                      className="w-4 h-4 accent-black rounded border-black/10" 
                    />
                    <span className="text-xs font-black uppercase tracking-widest text-black opacity-80">
                      Apply Grayscale Filter
                    </span>
                  </label>
                )}
              </div>
            </div>



            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black opacity-70 mb-2">
                  Preview Excerpt
              </label>
              <p className="text-[10px] text-black/50 mb-3">2-3 sentences of plain text. No HTML.</p>
              <textarea 
                name="excerpt" 
                required 
                rows={3}
                value={formData.excerpt} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 text-black resize-none font-medium" 
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black opacity-70 mb-2">
                  Full Protocol HTML Content
              </label>
              <p className="text-[10px] text-black/50 mb-3">Paste rich HTML content. Use &lt;h2&gt;, &lt;p&gt;, &lt;table&gt;.</p>
              <textarea 
                name="content" 
                required 
                rows={16}
                value={formData.content} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 text-zinc-800 font-mono text-sm leading-relaxed" 
              />
            </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-black/5 gap-4">
          <div className="flex flex-col gap-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                name="published" 
                checked={formData.published} 
                onChange={handleCheckboxChange} 
                className="w-5 h-5 accent-black rounded bg-zinc-50 border-black/10" 
              />
              <span className="text-sm font-black uppercase tracking-widest text-black opacity-80">
                {formData.published ? "Published (Live)" : "Draft (Hidden)"}
              </span>
            </label>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-black opacity-60">
                Publication Date
              </label>
              <input 
                type="datetime-local" 
                name="createdAt" 
                value={formData.createdAt} 
                onChange={handleChange} 
                className="px-3 py-2 text-sm rounded-lg bg-zinc-50 border border-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 text-black font-medium" 
              />
            </div>
          </div>

          <div className="flex space-x-4">
            {formData.slug && (
              <a 
                href={`/${formData.category}/${formData.slug}`} 
                target="_blank" 
                rel="noreferrer"
                className="bg-zinc-100 text-black px-6 py-4 rounded-xl font-black hover:bg-zinc-200 transition-all uppercase tracking-widest text-sm shadow-sm flex items-center"
              >
                Preview
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            )}
            <button 
              type="submit" 
              disabled={loading}
              className="bg-black text-white px-10 py-4 rounded-xl font-black hover:bg-zinc-800 transition-all uppercase tracking-widest text-sm shadow-xl disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Protocol"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
