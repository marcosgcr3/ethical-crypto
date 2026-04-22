import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-20 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 font-heading text-xl font-black tracking-tight text-white uppercase">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1.5 shadow-sm">
                <Image src="https://wwvfyhszgbdffhzlapxz.supabase.co/storage/v1/object/public/images/brand-icon-v3.png" alt="Ethical Crypto" width={32} height={32} className="grayscale object-contain" />
              </div>
              <span>ETHICAL <span className="text-zinc-500">CRYPTO</span></span>
            </Link>
            <p className="text-[13px] leading-relaxed text-zinc-300 font-medium max-w-xs">
              Combining the wisdom of institutional capital with the power of modern protocol intelligence to help you achieve peak digital performance ethically and safely.
            </p>
            
            <div className="pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">SOCIAL</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-zinc-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="hover:text-zinc-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Research / Intelligence */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">INTELLIGENCE</h4>
            <ul className="space-y-4 text-[13px] font-bold text-zinc-100 uppercase tracking-wider">
              <li><Link href="/protocols" className="hover:text-zinc-400 transition-colors">Protocols</Link></li>
              <li><Link href="/wealthpumps" className="hover:text-zinc-400 transition-colors">WealthPumps</Link></li>
              <li><Link href="/fundamentals" className="hover:text-zinc-400 transition-colors">Fundamentals</Link></li>
              <li><Link href="/security" className="hover:text-zinc-400 transition-colors">Security/Wallets</Link></li>
              <li><Link href="/wealthspan-calculator" className="hover:text-zinc-400 transition-colors">Calculator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">COMPANY</h4>
            <ul className="space-y-4 text-[13px] font-bold text-zinc-100 uppercase tracking-wider">
              <li><Link href="/about" className="hover:text-zinc-400 transition-colors">About Us</Link></li>
              <li><Link href="/guidelines" className="hover:text-zinc-400 transition-colors">Ethical Guidelines</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">LEGAL</h4>
            <ul className="space-y-4 text-[13px] font-bold text-zinc-100 uppercase tracking-wider">
              <li><Link href="/disclaimer" className="hover:text-zinc-400 transition-colors">Financial Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-700/50 mb-12"></div>

        {/* Detailed Disclaimers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">FINANCIAL DISCLAIMER</h5>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
              The content on Ethical Crypto is for informational and educational purposes only and does not constitute financial, investment, or professional advice. Trading cryptocurrencies involves significant risk and can result in the loss of your invested capital. Always seek the advice of a qualified financial professional before making any investment decisions.
            </p>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">AI DISCLOSURE</h5>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
              To illustrate complex protocol concepts and futuristic decentralized technologies, some visual assets on this site are generated using advanced artificial intelligence. We prioritize technical accuracy in our written content while using AI-augmented imagery to enhance the educational experience.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-end pt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            © 2026 ETHICAL CRYPTO.
          </p>
        </div>
      </div>
    </footer>
  );
}
