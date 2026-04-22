"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col shadow-xl">
        {/* Subtle Top Utility Bar for E-E-A-T Links */}
        <div className="bg-black text-white/70 py-1.5 px-3 md:px-6 text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-[0.25em] font-bold flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1 md:gap-6 w-full z-50 text-center border-b border-white/10">
            <Link href="/contact" className="hover:text-white transition-colors duration-200">Support</Link>
            <Link href="/about" className="hover:text-white transition-colors duration-200">About Us</Link>
            <Link href="/guidelines" className="hover:text-white transition-colors duration-200">Research Guidelines</Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors duration-200">Financial Disclaimer</Link>
        </div>

        {/* Main Navbar */}
        <div className="glass-nav border-b border-black/5 w-full relative z-40 bg-white/80 backdrop-blur-xl">
            <nav className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center text-sm md:text-base font-medium">
                <Link href="/" title="Ethical Crypto - Protocol Engineering & Security" className="flex items-center gap-3 font-heading text-xl font-extrabold text-black tracking-tight hover:opacity-90 transition-opacity">
                    <Image src="/brand/brand-icon-v3.png" alt="Ethical Crypto - Decentralized Intelligence" width={40} height={40} className="rounded-lg shadow-sm border border-black/5" />
                    <span className="uppercase text-black">ETHICAL <span className="text-zinc-400">CRYPTO</span></span>
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-12">
                    <Link href="/protocols" className="hover:text-black transition-colors duration-200 uppercase tracking-widest text-black/60 font-black text-sm">Protocols</Link>
                    <Link href="/wealthpumps" className="hover:text-black transition-colors duration-200 uppercase tracking-widest text-black/60 font-black text-sm">WealthPumps</Link>
                    <Link href="/fundamentals" className="hover:text-black transition-colors duration-200 uppercase tracking-widest text-black/60 font-black text-sm">Fundamentals</Link>
                    <Link href="/security" className="hover:text-black transition-colors duration-200 uppercase tracking-widest text-black/60 font-black text-sm">Security/Wallets</Link>
                    <Link href="/wealthspan-calculator" className="hover:text-black transition-colors duration-200 uppercase tracking-widest text-black/60 font-black text-sm">Calculator</Link>
                </div>

                {/* Mobile Hamburger Button */}
                <div className="md:hidden flex items-center">
                  <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-black hover:opacity-60 focus:outline-none rounded-lg p-1"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      )}
                    </svg>
                  </button>
                </div>
            </nav>

             {/* Mobile Navigation Menu Dropdown */}
            {isOpen && (
              <div className="w-full md:hidden pb-12 flex flex-col space-y-4 border-t border-black/5 pt-8 bg-white/95 backdrop-blur-md rounded-b-[2.5rem] shadow-2xl px-6 absolute left-0 top-full z-30">
                  <Link href="/protocols" onClick={() => setIsOpen(false)} className="text-black/60 hover:text-black transition-colors duration-200 uppercase tracking-widest font-black text-sm border-b border-black/5 pb-2">Protocols</Link>
                  <Link href="/wealthpumps" onClick={() => setIsOpen(false)} className="text-black/60 hover:text-black transition-colors duration-200 uppercase tracking-widest font-black text-sm border-b border-black/5 pb-2">WealthPumps</Link>
                  <Link href="/fundamentals" onClick={() => setIsOpen(false)} className="text-black/60 hover:text-black transition-colors duration-200 uppercase tracking-widest font-black text-sm border-b border-black/5 pb-2">Fundamentals</Link>
                  <Link href="/security" onClick={() => setIsOpen(false)} className="text-black/60 hover:text-black transition-colors duration-200 uppercase tracking-widest font-black text-sm border-b border-black/5 pb-2">Security/Wallets</Link>
                  <Link href="/wealthspan-calculator" onClick={() => setIsOpen(false)} className="text-black/60 hover:text-black transition-colors duration-200 uppercase tracking-widest font-black text-sm border-b border-black/5 pb-2">Calculator</Link>
              </div>
            )}
        </div>
    </header>
  );
}
