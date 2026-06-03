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
                <Image src="/api/images/supabase/brand-icon-v3.png" alt="Ethical Crypto" width={32} height={32} className="grayscale object-contain" />
              </div>
              <span>ETHICAL <span className="text-zinc-350">CRYPTO</span></span>
            </Link>
            <p className="text-[13px] leading-relaxed text-zinc-300 font-medium max-w-xs">
              Combining the wisdom of institutional capital with the power of modern protocol intelligence to help you achieve peak digital performance ethically and safely.
            </p>
            
          </div>

          {/* Research / Intelligence */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">INTELLIGENCE</h4>
            <ul className="space-y-1 text-[13px] font-bold text-zinc-100 uppercase tracking-wider">
              <li><Link href="/protocols" className="hover:text-zinc-400 transition-colors py-2 block">Protocols</Link></li>
              <li><Link href="/wealthpumps" className="hover:text-zinc-400 transition-colors py-2 block">WealthPumps</Link></li>
              <li><Link href="/fundamentals" className="hover:text-zinc-400 transition-colors py-2 block">Fundamentals</Link></li>
              <li><Link href="/security" className="hover:text-zinc-400 transition-colors py-2 block">Security/Wallets</Link></li>
              <li><Link href="/wealthspan-calculator" className="hover:text-zinc-400 transition-colors py-2 block">Calculator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">COMPANY</h4>
            <ul className="space-y-1 text-[13px] font-bold text-zinc-100 uppercase tracking-wider">
              <li><Link href="/about" className="hover:text-zinc-400 transition-colors py-2 block">About Us</Link></li>
              <li><Link href="/guidelines" className="hover:text-zinc-400 transition-colors py-2 block">Ethical Guidelines</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-400 transition-colors py-2 block">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">LEGAL</h4>
            <ul className="space-y-1 text-[13px] font-bold text-zinc-100 uppercase tracking-wider">
              <li><Link href="/disclaimer" className="hover:text-zinc-400 transition-colors py-2 block">Financial Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-400 transition-colors py-2 block">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-zinc-400 transition-colors py-2 block">Cookie Policy</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-zinc-400 transition-colors py-2 block">Affiliate Disclosure</Link></li>
              <li><Link href="/terms" className="hover:text-zinc-400 transition-colors py-2 block">Terms of Service</Link></li>
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            © 2026 ETHICAL CRYPTO.
          </p>
        </div>
      </div>
    </footer>
  );
}
