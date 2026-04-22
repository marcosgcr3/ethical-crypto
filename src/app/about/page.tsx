import type { Metadata } from 'next';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'About Marcus Sterling | Protocol Intelligence',
  description: 'The story behind Ethical Crypto. Learn how Marcus Sterling blends quantitative analysis with protocol security to optimize digital wealthspan.',
};

export const revalidate = 3600; // Incrementally revalidate every hour

export default async function AboutUs() {
  let founder = null;
  try {
    founder = await prisma.reviewer.findUnique({
      where: { id: 'marcus-sterling-id' }
    });
  } catch (error) {
    console.error("Database fetch failed for About page. Build will continue with default profile.", error);
  }

  // Fallback values in case DB is empty
  const profile = {
    name: founder?.name || "Marcus Sterling",
    title: founder?.title || "Lead Protocol Analyst & Security Auditor",
    bio: founder?.bio || "Quantitative analyst and protocol architect specializing in decentralized security and yield engineering. Bringing rigorous institutional-grade standards to the art of blockchain research.",
    imageUrl: founder?.imageUrl || "/images/doctor.png"
  };

  return (
    <div className="bg-void min-h-screen py-24 md:py-32 text-ghost">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <h5 className="font-heading font-bold text-black uppercase tracking-widest text-xs mb-4">The Architect's Story</h5>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-black uppercase tracking-tighter mb-10 leading-[0.9]">
            From Code to <span className="text-zinc-400 underline decoration-black/10">Protocol Intelligence</span>
          </h1>
          <div className="prose prose-slate lg:prose-xl text-dim font-medium whitespace-pre-wrap leading-relaxed max-w-2xl mx-auto">
            {profile.bio}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6 text-lg text-dim leading-relaxed font-medium">
            <h3 className="font-heading text-2xl font-bold text-black uppercase tracking-tight">The Quant Lab</h3>
            <p>
              As a protocol architect, I've spent years auditing smart contracts and analyzing tokenomics through the lens of game theory and security. But theoretical analysis alone wasn’t enough. I needed to bridge the gap between whitepaper promises and on-chain reality.
            </p>
            <p>
              I transitioned from being solely an auditor, to a <strong>rigorous quantitative researcher</strong>. I began measuring every network variable—from liquidity depth and MEV resistance to validator health and protocol-level governance dynamics.
            </p>
          </div>
          <div className="bg-black/5 p-8 rounded-3xl border border-black/10 flex flex-col justify-center">
            <h3 className="font-heading font-bold text-black uppercase tracking-widest text-xs mb-6">Expertise & Focus</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-black/10 p-1 rounded-full mt-1">
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                </div>
                <span className="text-sm font-bold text-black/70">Protocol Security Auditing</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-black/10 p-1 rounded-full mt-1">
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                </div>
                <span className="text-sm font-bold text-black/70">DeFi Yield & Risk Engineering</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-black/10 p-1 rounded-full mt-1">
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                </div>
                <span className="text-sm font-bold text-black/70">On-Chain Forensic Data Analysis</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-8 text-lg text-dim leading-relaxed font-medium">
          <h2 className="font-heading text-3xl font-extrabold text-black border-b-4 border-black/5 inline-block pb-2 mb-4 uppercase tracking-tighter">Why Ethical Crypto?</h2>
          <p>
            I founded <span className="text-black font-bold">Ethical Crypto</span> because the industry is flooded with hype-driven projects and inflationary protocols that prioritize exit liquidity over fundamental value.
          </p>
          <p>
            I wanted to create a sanctuary where engineering and ethics are inseparable. Our insights are driven by on-chain data, validated by cryptographic proof, and personally audited before they ever reach your screen.
          </p>
          
          <div className="bg-black p-10 md:p-16 rounded-[3rem] text-white overflow-hidden relative group my-16">
            <h3 className="font-heading font-bold text-zinc-500 uppercase tracking-widest text-xs mb-6">Our Mission</h3>
            <p className="text-2xl md:text-4xl font-heading font-extrabold leading-[1.1] mb-8">
              To democratize institutional-grade protocol research and secure digital wealthspan—ethically and for everyone.
            </p>
            <p className="text-white/40 text-base md:text-lg font-medium">
              We provide the framework to help you systematically optimize your digital assets without compromising your security or falling victim to predatory market dynamics.
            </p>
          </div>

          <p>
            Today, Ethical Crypto serves a community of protocol enthusiasts, security seekers, and decentralized sovereign individuals. We remain 100% independent.
          </p>
        </div>

        <div className="mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
                <div className="text-4xl font-extrabold text-black tracking-tighter">5,000+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Hours of Protocol Auditing</div>
            </div>
            <div className="text-center md:text-left">
                <div className="text-4xl font-extrabold text-black tracking-tighter">100%</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">On-Chain Validated Research</div>
            </div>
            <div className="text-center md:text-left">
                <div className="text-4xl font-extrabold text-black tracking-tighter">2026</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Decentralized Vision</div>
            </div>
        </div>
      </div>
    </div>
  );
}
