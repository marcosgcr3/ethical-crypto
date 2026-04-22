"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { upsertFounder } from "@/app/ec-protocol-portal/actions";

export default function AdminAnalystPanel({ 
  reviewer 
}: { 
  reviewer: { name: string; title: string; bio: string | null; imageUrl: string | null } | null 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: reviewer?.name || "Satoshi Vanguard",
    title: reviewer?.title || "Protocol Intelligence Lead",
    bio: reviewer?.bio || "Deep protocol analyst and security researcher specializing in sovereign systems and on-chain intelligence.",
    imageUrl: reviewer?.imageUrl || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccess(false);

    try {
      const res = await upsertFounder({
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        imageUrl: formData.imageUrl || null,
      });

      if (res.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          router.refresh();
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save analyst info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0D11] rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.3)] border border-white/5 p-10 mb-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">Analyst Persona Config</h2>
          <p className="text-[10px] text-white/40 mt-2 uppercase tracking-[0.1em] font-bold">This signature represents the authoritative voice across all protocol logic.</p>
        </div>
        {showSuccess && (
          <div className="bg-white/10 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] animate-pulse border border-white/20">
            Dossier Updated
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="bg-red-500/10 text-red-500 p-6 rounded-xl border border-red-500/20 text-sm font-bold">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Sovereign Identity</label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full px-5 py-4 rounded-xl border border-white/5 bg-[#05070A] focus:outline-none focus:ring-2 focus:ring-white/20 text-white font-bold" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Protocol Designation</label>
              <input 
                type="text" 
                name="title" 
                required 
                value={formData.title} 
                onChange={handleChange} 
                className="w-full px-5 py-4 rounded-xl border border-white/5 bg-[#05070A] focus:outline-none focus:ring-2 focus:ring-white/20 text-white font-bold" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Avatar Hash (URL)</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  className="flex-1 px-5 py-4 rounded-xl border border-white/5 bg-[#05070A] focus:outline-none text-white text-xs font-mono" 
                  placeholder="/images/vanguard.png"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  disabled={uploading}
                  className="bg-white text-black px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-zinc-200 transition-all min-w-[120px]"
                >
                  {uploading ? "SYNC..." : "UPLOAD"}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-10 bg-[#05070A] rounded-[2rem] border border-white/5 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-6 bg-[#0A0D11]">
              <img 
                src={formData.imageUrl || '/images/vanguard.png'} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = '/images/vanguard.png')}
              />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white opacity-40">Visual ID Preview</p>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Intelligence Directive (Bio)</label>
          <textarea 
            name="bio" 
            required 
            rows={5}
            value={formData.bio} 
            onChange={handleChange} 
            className="w-full px-5 py-4 rounded-xl border border-white/5 bg-[#05070A] focus:outline-none focus:ring-2 focus:ring-white/20 text-gray-400 text-sm leading-relaxed" 
            placeholder="Define the analyst mission parameters..."
          />
        </div>

        <div className="pt-8 border-t border-white/5 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-white text-black px-12 py-5 rounded-2xl font-black hover:bg-zinc-200 transition-all uppercase tracking-[0.2em] text-sm shadow-xl disabled:opacity-50"
          >
            {loading ? "COMMITTING..." : "COMMIT ANALYST CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
}
