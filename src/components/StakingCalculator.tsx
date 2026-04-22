"use client";

import { useState, useEffect } from "react";

interface ProtocolPreset {
  name: string;
  apy: number;
  inflation: number;
  fee: number;
}

const PROTOCOLS: ProtocolPreset[] = [
  { name: "Custom", apy: 8, inflation: 2, fee: 5 },
  { name: "ETH", apy: 3.5, inflation: 0.2, fee: 10 },
  { name: "SOL", apy: 7.2, inflation: 5.1, fee: 5 },
  { name: "ATOM", apy: 19.5, inflation: 14.2, fee: 5 },
  { name: "DOT", apy: 14.8, inflation: 10.0, fee: 10 },
  { name: "NEAR", apy: 9.5, inflation: 5.0, fee: 5 },
];

export default function StakingCalculator() {
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolPreset>(PROTOCOLS[0]);

  // Base Inputs
  const [amount, setAmount] = useState<number>(10000);
  const [apy, setApy] = useState<number>(PROTOCOLS[0].apy);
  const [years, setYears] = useState<number>(5);
  
  // Advanced Inputs
  const [monthlyDCA, setMonthlyDCA] = useState<number>(500);
  const [priceAppreciation, setPriceAppreciation] = useState<number>(15);
  const [inflation, setInflation] = useState<number>(PROTOCOLS[0].inflation);
  const [validatorFee, setValidatorFee] = useState<number>(PROTOCOLS[0].fee);

  // Results
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [realYield, setRealYield] = useState<number>(0);
  const [totalInvested, setTotalInvested] = useState<number>(0);

  useEffect(() => {
    let currentTokens = amount;
    let rewardsAccumulated = 0;
    const totalMonths = years * 12;
    const monthlyApy = apy / 100 / 12;
    const feeMultiplier = 1 - (validatorFee / 100);

    for (let i = 0; i < totalMonths; i++) {
      currentTokens += monthlyDCA; 
      const monthlyReward = currentTokens * monthlyApy * feeMultiplier;
      currentTokens += monthlyReward;
      rewardsAccumulated += monthlyReward;
    }

    const finalPriceMultiplier = Math.pow(1 + (priceAppreciation / 100), years);
    const finalUSDValue = currentTokens * finalPriceMultiplier;

    setTotalInvested(amount + (monthlyDCA * totalMonths));
    setTotalTokens(currentTokens);
    setTotalBalance(finalUSDValue);
    setTotalInterest(rewardsAccumulated * finalPriceMultiplier);
    
    const netAPY = (apy * feeMultiplier) - inflation;
    setRealYield(netAPY);

  }, [amount, apy, years, monthlyDCA, priceAppreciation, inflation, validatorFee]);

  const applyPreset = (p: ProtocolPreset) => {
    setSelectedProtocol(p);
    if (p.name !== "Custom") {
      setApy(p.apy);
      setInflation(p.inflation);
      setValidatorFee(p.fee);
    }
  };

  return (
    <div className="w-full space-y-8 md:space-y-12">
      {/* Protocol Selection Chips */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
        {PROTOCOLS.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className={`px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border ${
              selectedProtocol.name === p.name 
              ? "bg-black text-white border-black shadow-lg" 
              : "bg-white text-black/40 border-black/5 hover:border-black/20"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 bg-white border border-black/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 shadow-2xl space-y-8 md:space-y-12">
          
          <div className="flex items-center gap-4 border-b border-black/5 pb-6 md:pb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black text-white flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
                <h3 className="font-heading font-black text-lg md:text-xl uppercase tracking-tighter">On-Chain Parameters</h3>
                <p className="text-[8px] md:text-[10px] text-black/40 font-bold uppercase tracking-widest">Simulate participation vectors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10">
            {/* Initial Staked */}
            <div className="space-y-3 md:space-y-4">
              <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Initial Principal</label>
              <div className="relative">
                <input 
                  type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 md:py-4 text-2xl md:text-3xl font-black font-heading transition-all"
                />
                <span className="absolute right-0 bottom-2 md:bottom-4 text-[9px] font-black text-black/20 uppercase tracking-widest">Tokens/USD</span>
              </div>
            </div>

            {/* Monthly Accumulation */}
            <div className="space-y-3 md:space-y-4">
              <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Monthly Accumulation</label>
              <div className="relative">
                <input 
                  type="number" value={monthlyDCA} onChange={(e) => setMonthlyDCA(Number(e.target.value))}
                  className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 md:py-4 text-2xl md:text-3xl font-black font-heading transition-all"
                />
                <span className="absolute right-0 bottom-2 md:bottom-4 text-[9px] font-black text-black/20 uppercase tracking-widest">Tokens/USD</span>
              </div>
            </div>

            {/* APY Slider */}
            <div className="space-y-3 md:space-y-4 col-span-1 md:col-span-2">
              <div className="flex justify-between items-center">
                <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Network APY</label>
                <span className="text-lg md:text-xl font-black font-heading bg-black text-white px-2.5 py-1 rounded-lg">{apy}%</span>
              </div>
              <input 
                type="range" min="0.1" max="50" step="0.1" value={apy} onChange={(e) => {setApy(Number(e.target.value)); setSelectedProtocol(PROTOCOLS[0]);}}
                className="w-full h-2 bg-black/5 rounded-full appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Market Appreciation */}
            <div className="space-y-3 md:space-y-4">
              <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Market Growth (%)</label>
              <input 
                type="number" value={priceAppreciation} onChange={(e) => setPriceAppreciation(Number(e.target.value))}
                className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 md:py-4 text-xl md:text-2xl font-black font-heading transition-all"
              />
            </div>

            {/* Duration */}
            <div className="space-y-3 md:space-y-4">
              <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Duration (Years)</label>
              <input 
                type="number" min="1" max="25" value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 md:py-4 text-xl md:text-2xl font-black font-heading transition-all"
              />
            </div>
          </div>

          {/* Advanced Toggles */}
          <div className="pt-6 md:pt-8 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black/30">Network Inflation</label>
              <div className="flex items-center gap-4">
                <input type="number" step="0.1" value={inflation} onChange={(e) => {setInflation(Number(e.target.value)); setSelectedProtocol(PROTOCOLS[0]);}} className="w-16 md:w-20 bg-black/5 rounded-lg p-2 font-bold text-center outline-none text-sm" />
                <span className="text-[9px] font-bold text-black/60 uppercase tracking-tighter">Token Inflation</span>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              <label className="block text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black/30">Validator Commission</label>
              <div className="flex items-center gap-4">
                <input type="number" step="0.5" value={validatorFee} onChange={(e) => {setValidatorFee(Number(e.target.value)); setSelectedProtocol(PROTOCOLS[0]);}} className="w-16 md:w-20 bg-black/5 rounded-lg p-2 font-bold text-center outline-none text-sm" />
                <span className="text-[9px] font-bold text-black/60 uppercase tracking-tighter">Service Fee %</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-black rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden group shadow-2xl h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-white/5 blur-[80px] md:blur-[100px] -mr-32 -mt-32 transition-all group-hover:bg-white/10"></div>
            
            <div className="space-y-6 relative">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
                Wealthspan Projection
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Terminal Portfolio Value</p>
                <div className="text-4xl md:text-7xl font-black font-heading tracking-tighter leading-none">
                  ${Math.round(totalBalance).toLocaleString()}
                </div>
                <div className="mt-4 flex items-center gap-2 text-zinc-500 font-bold text-xs md:text-sm">
                   <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                   {Math.round(totalTokens).toLocaleString()} Units Accumulated
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-16 space-y-4 md:space-y-6 relative">
              <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 border border-white/5 space-y-4 md:space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3 md:pb-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Cost Basis</span>
                  <span className="text-lg md:text-xl font-black font-heading">${totalInvested.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-3 md:pb-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Network Rewards</span>
                  <span className="text-lg md:text-xl font-black font-heading text-zinc-400">+{Math.round(totalTokens - totalInvested).toLocaleString()} Units</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Effective Real Yield</span>
                  <span className={`text-lg md:text-xl font-black font-heading ${realYield > 0 ? "text-green-400" : "text-red-400"}`}>
                    {realYield.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/5 text-center">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1 md:mb-2">Alpha Multiple</p>
                  <p className="text-xl md:text-2xl font-black font-heading">{(totalBalance / totalInvested).toFixed(2)}x</p>
                </div>
                <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/5 text-center">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1 md:mb-2">Net Gain</p>
                  <p className="text-xl md:text-2xl font-black font-heading">${Math.round(totalBalance - totalInvested).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 flex items-center gap-3 md:gap-4 relative text-[8px] md:text-[10px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">
              <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Theoretical projection based on protocol emission vectors.
            </div>
          </div>
        </div>
      </div>

      {/* Deep Intelligence Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-black/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] space-y-3 md:space-y-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-black text-white flex items-center justify-center mb-1 md:mb-2 shadow-md">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <h4 className="font-heading font-black text-black text-base md:text-lg uppercase tracking-tight leading-none">Compound Alpha</h4>
          <p className="text-[10px] md:text-xs text-black/50 leading-relaxed font-medium">
            Reinvesting <span className="text-black font-bold">{apy}%</span> rewards accumulates <span className="text-black font-bold">{Math.round(totalTokens).toLocaleString()}</span> units.
          </p>
        </div>
        <div className="bg-black/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] space-y-3 md:space-y-4 border-l-4 border-black">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-black text-white flex items-center justify-center mb-1 md:mb-2 shadow-md">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h4 className="font-heading font-black text-black text-base md:text-lg uppercase tracking-tight leading-none">Net Real Yield</h4>
          <p className="text-[10px] md:text-xs text-black/50 leading-relaxed font-medium">
            Adjusted for <span className="text-black font-bold">{inflation}%</span> inflation, your true ownership increases <span className="text-black font-bold">{realYield.toFixed(2)}%</span> annually.
          </p>
        </div>
        <div className="bg-black/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] space-y-3 md:space-y-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-black text-white flex items-center justify-center mb-1 md:mb-2 shadow-md">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="font-heading font-black text-black text-base md:text-lg uppercase tracking-tight leading-none">Valuation Focus</h4>
          <p className="text-[10px] md:text-xs text-black/50 leading-relaxed font-medium">
            Terminal value reaches <span className="text-black font-bold">${Math.round(totalBalance).toLocaleString()}</span> based on market growth vectors.
          </p>
        </div>
      </div>
    </div>
  );
}
