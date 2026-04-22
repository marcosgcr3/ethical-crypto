import type { Metadata } from "next";
import Link from "next/link";
import StakingCalculator from "@/components/StakingCalculator";
import StakingOptimizer from "@/components/StakingOptimizer";
import {
  IconBlockchain,
  IconBarChart,
  IconClock,
  IconLock,
  IconProtocol,
  IconNode,
  IconYield,
  IconTarget,
} from "@/components/icons/CryptoIcons";

export const metadata: Metadata = {
  title: "Staking Calculator — Optimize Your Digital Wealthspan | Ethical Crypto",
  description:
    "Calculate your protocol yield and optimize your wealthspan. Our institutional-grade staking calculator provides real-time interest projections and compounding analysis.",
};

export default function StakingCalculatorPage() {
  return (
    <div className="min-h-screen bg-white text-black pb-24">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-12 text-[10px] text-black/30 font-black uppercase tracking-[0.3em]">
            <ol className="flex items-center gap-3">
              <li><Link href="/" className="hover:text-black transition-colors">Terminal</Link></li>
              <li aria-hidden>/</li>
              <li className="text-black">Staking Calculator</li>
            </ol>
          </nav>

          {/* Heading */}
          <div className="max-w-4xl mb-16">
            <h1 className="font-heading text-5xl md:text-8xl font-black text-black leading-[0.85] mb-8 uppercase tracking-tighter">
              Yield <span className="text-zinc-400">Intelligence</span>
            </h1>
            <p className="text-lg md:text-2xl text-black/50 leading-relaxed font-medium max-w-2xl">
              Quantitative modeling for your <span className="text-black font-bold">digital wealthspan</span>. Project your protocol returns with institutional-grade precision.
            </p>
          </div>

          {/* Main Calculator */}
          <div className="mb-32">
             <StakingCalculator />
          </div>

          <div className="border-t border-black/5 pt-32">
              <div className="max-w-3xl mb-16">
                  <div className="inline-flex items-center gap-3 bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] px-6 py-3 rounded-xl mb-8">
                    <IconProtocol className="w-4 h-4 text-zinc-400" />
                    Operational Deep Audit
                  </div>
                  <h2 className="font-heading text-4xl md:text-6xl font-black text-black leading-tight mb-6 uppercase tracking-tighter">
                    Beyond the <span className="text-zinc-400">Numbers</span>
                  </h2>
                  <p className="text-lg text-black/50 leading-relaxed font-medium">
                    Calculators only show the ceiling. Our <span className="text-black font-bold">Protocol Mastery Benchmark</span> analyzes your security hygiene, hardware infrastructure, and on-chain intelligence to determine your real operational alpha.
                  </p>
              </div>

              {/* Quiz Component */}
              <StakingOptimizer />
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="container mx-auto px-6 max-w-4xl text-center">
        <div className="bg-black rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none -mr-48 -mt-48 transition-all group-hover:bg-white/10"></div>
          
          <div className="relative">
            <h2 className="font-heading text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter">
              Secure Your <span className="text-zinc-500">Autonomy</span>
            </h2>
            <p className="text-white/40 mb-12 text-lg md:text-xl font-medium max-w-xl mx-auto uppercase tracking-widest leading-relaxed">
              Access deep protocol research and weekly security audits to protect your wealthspan.
            </p>
            <Link
              href="/security"
              className="inline-flex items-center gap-4 bg-white text-black font-black px-12 py-6 rounded-2xl hover:bg-zinc-200 transition-all text-xs uppercase tracking-[0.2em]"
            >
              Master Self-Custody
              <IconTarget className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
