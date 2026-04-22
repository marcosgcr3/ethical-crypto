"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconStaking, IconYield, IconClock,
  IconSecurity, IconWallet, IconKey,
  IconProtocol, IconHardware, IconNode,
  IconAnalysis, IconBlockchain, IconNetwork,
  IconBlockchain as IconStrategy, // Using blockchain icon for strategy
  IconSecurity as IconSafety,    // Using security icon for safety
  IconBarChart,
  IconAtom, IconTrophy, IconZap,
  IconCheckCircle, IconAlertTriangle, IconAlertCircle,
  IconCheck, IconTarget, IconRefresh,
  type IconProps,
} from "@/components/icons/CryptoIcons";

/* ──────────────────────────────────────────
   TYPES
 ────────────────────────────────────────── */
type CategoryKey = "staking" | "security" | "hardware" | "fundamentals" | "strategy";
type IconComponent = React.ComponentType<IconProps>;
type Step = "exp-input" | "quiz" | "results";

interface Question {
  id: string;
  category: CategoryKey;
  question: string;
  options: { label: string; value: number }[];
}

interface CategoryResult {
  name: string;
  Icon: IconComponent;
  score: number;
  alphaDelta: number;
  color: string;
  gradient: string;
  tip: string;
  href: string;
}

/* ──────────────────────────────────────────
   QUESTION ICONS MAP
 ────────────────────────────────────────── */
const QUESTION_ICONS: Record<string, IconComponent> = {
  staking_duration: IconStaking,
  staking_apy: IconYield,
  staking_consistency: IconClock,
  security_wallet: IconWallet,
  security_multisig: IconSecurity,
  security_hygiene: IconKey,
  protocol_audit: IconProtocol,
  node_setup: IconNode,
  hardware_verification: IconHardware,
  analysis_depth: IconAnalysis,
  blockchain_knowledge: IconBlockchain,
  network_activity: IconNetwork,
  defi_strategy: IconStrategy,
  protection_mev: IconSafety,
  portfolio_tracking: IconBarChart,
};

/* ──────────────────────────────────────────
   QUESTIONS
 ────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: "staking_duration",
    category: "staking",
    question: "What is your average staking lock-up period?",
    options: [
      { label: "No staking (Liquid only)", value: 0 },
      { label: "Under 3 months", value: 40 },
      { label: "3–12 months", value: 85 },
      { label: "Over 1 year (Diamond Hands)", value: 100 },
    ],
  },
  {
    id: "staking_apy",
    category: "staking",
    question: "How do you rate your average staking yield (APY)?",
    options: [
      { label: "Under 3% (Stable/Safe)", value: 30 },
      { label: "3–8% (Standard)", value: 100 },
      { label: "8–20% (Aggressive)", value: 70 },
      { label: "Over 20% (High Risk)", value: 40 },
    ],
  },
  {
    id: "staking_consistency",
    category: "staking",
    question: "Do you maintain a consistent re-staking schedule?",
    options: [
      { label: "Never re-stake manually", value: 0 },
      { label: "Occasionally compound manually", value: 40 },
      { label: "Auto-compounding protocols", value: 100 },
      { label: "Weekly manual compounding", value: 80 },
    ],
  },
  {
    id: "security_wallet",
    category: "security",
    question: "Where do you store most of your long-term assets?",
    options: [
      { label: "Centralized Exchanges (CEX)", value: 0 },
      { label: "Hot Wallets (Browser/Mobile)", value: 30 },
      { label: "Hardware Wallets (Ledger/Trezor)", value: 90 },
      { label: "Air-gapped Cold Storage", value: 100 },
    ],
  },
  {
    id: "security_multisig",
    category: "security",
    question: "Do you use Multi-sig (Safe) for significant treasury management?",
    options: [
      { label: "Never", value: 0 },
      { label: "Interested but haven't setup", value: 30 },
      { label: "Use for some assets", value: 85 },
      { label: "Standard operating procedure", value: 100 },
    ],
  },
  {
    id: "security_hygiene",
    category: "security",
    question: "How often do you audit your seed phrase and recovery health?",
    options: [
      { label: "Never / Lost it", value: 0 },
      { label: "Once a year", value: 50 },
      { label: "Quarterly health checks", value: 90 },
      { label: "Encrypted metal backup + regular drills", value: 100 },
    ],
  },
  {
    id: "node_setup",
    category: "hardware",
    question: "Do you run your own full node or validator?",
    options: [
      { label: "No, use public RPCs", value: 10 },
      { label: "Use a managed node service", value: 45 },
      { label: "Self-hosted full node (Home Lab)", value: 90 },
      { label: "Multiple validators / Bare metal", value: 100 },
    ],
  },
  {
    id: "hardware_verification",
    category: "hardware",
    question: "How do you verify hardware supply chain integrity?",
    options: [
      { label: "Buy from Amazon/Resellers", value: 0 },
      { label: "Buy direct from manufacturer", value: 70 },
      { label: "Verification of anti-tamper seals", value: 90 },
      { label: "Firmware audit + Supply chain tracking", value: 100 },
    ],
  },
  {
    id: "protocol_audit",
    category: "hardware",
    question: "Do you cross-verify smart contract audits before interacting?",
    options: [
      { label: "Never", value: 0 },
      { label: "Skim the audit summary", value: 40 },
      { label: "Read multiple top-tier audits", value: 85 },
      { label: "Check on-chain contract code directly", value: 100 },
    ],
  },
  {
    id: "analysis_depth",
    category: "fundamentals",
    question: "How deep is your protocol analysis (DYOR)?",
    options: [
      { label: "Picks from Twitter/YouTube", value: 10 },
      { label: "Read the Whitepaper core sections", value: 45 },
      { label: "Analyze Tokenomics & TVL trends", value: 80 },
      { label: "Raw on-chain data + MEV analysis", value: 100 },
    ],
  },
  {
    id: "blockchain_knowledge",
    category: "fundamentals",
    question: "Rate your understanding of L1/L2 consensus mechanisms:",
    options: [
      { label: "Surface level (Send/Receive)", value: 20 },
      { label: "Understand PoS vs PoW", value: 55 },
      { label: "Knowledge of Rollups & Sharding", value: 85 },
      { label: "Consensus level engineering detail", value: 100 },
    ],
  },
  {
    id: "network_activity",
    category: "fundamentals",
    question: "How frequently do you analyze active address/tx trends?",
    options: [
      { label: "Never", value: 0 },
      { label: "Weekly checks", value: 40 },
      { label: "Daily monitoring", value: 80 },
      { label: "Real-time automated alerts", value: 100 },
    ],
  },
  {
    id: "defi_strategy",
    category: "strategy",
    question: "How complex is your DeFi yield strategy?",
    options: [
      { label: "Simple Lend/Borrow only", value: 30 },
      { label: "LPing in standard pools", value: 60 },
      { label: "Concentrated liquidity + Hedging", value: 90 },
      { label: "Multi-layered delta-neutral strategy", value: 100 },
    ],
  },
  {
    id: "protection_mev",
    category: "strategy",
    question: "Do you use protection against MEV (Frontrunning)?",
    options: [
      { label: "No, use standard swaps", value: 10 },
      { label: "Use Slippage settings only", value: 40 },
      { label: "Use Private RPCs (Flashbots)", value: 90 },
      { label: "Automated MEV mitigation tools", value: 100 },
    ],
  },
  {
    id: "portfolio_tracking",
    category: "strategy",
    question: "How do you track your cross-chain performance?",
    options: [
      { label: "Calculate in head", value: 0 },
      { label: "Static spreadsheet (Manual)", value: 45 },
      { label: "Dynamic Dashboard (Zapper/Debank)", value: 85 },
      { label: "Custom scripted tracking / APIs", value: 100 },
    ],
  },
];

/* ──────────────────────────────────────────
   CATEGORY CONFIG
 ────────────────────────────────────────── */
const CATEGORIES: Record<CategoryKey, Omit<CategoryResult, "score" | "alphaDelta">> = {
  staking: {
    name: "Staking & Yield",
    Icon: IconStaking,
    color: "#00F5FF",
    gradient: "from-cyan-500 to-blue-600",
    tip: "Optimize your liquid staking protocols",
    href: "/wealthspan",
  },
  security: {
    name: "Operational Security",
    Icon: IconSecurity,
    color: "#E5E7EB",
    gradient: "from-gray-400 to-slate-600",
    tip: "Master hardware storage and key hygiene",
    href: "/security",
  },
  hardware: {
    name: "Hardware & Infrastructure",
    Icon: IconHardware,
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    tip: "Verify your supply chain and node health",
    href: "/hardware",
  },
  fundamentals: {
    name: "Protocol Intelligence",
    Icon: IconAnalysis,
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    tip: "Deepen your on-chain analysis skills",
    href: "/fundamentals",
  },
  strategy: {
    name: "Wealthspan Strategy",
    Icon: IconBlockchain,
    color: "#EC4899",
    gradient: "from-pink-500 to-rose-600",
    tip: "Automate and protect your high-yield DeFi",
    href: "/crypto",
  },
};

/* ──────────────────────────────────────────
   SCORE CALCULATION
 ────────────────────────────────────────── */
function calcResults(answers: Record<string, number>, chronoExp: number) {
  const cats = Object.keys(CATEGORIES) as CategoryKey[];

  const categoryResults: CategoryResult[] = cats.map((cat) => {
    const qs = QUESTIONS.filter((q) => q.category === cat);
    const scores = qs.map((q) => answers[q.id]).filter((v) => v !== undefined);
    const avg = scores.length
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 50;
    // Calculate how much "Alpha Points" we gain/lose
    const alphaDelta = Math.round((avg - 50) * 0.08 * 10) / 10;
    return { ...CATEGORIES[cat], score: Math.round(avg), alphaDelta };
  });

  const totalAlpha = categoryResults.reduce((s, c) => s + c.alphaDelta, 0);
  const masteryScore = Math.max(0, Math.round((chronoExp + totalAlpha) * 10) / 10);

  return { categoryResults, masteryScore, totalAlpha };
}

/* ──────────────────────────────────────────
   ANIMATED COUNTER
 ────────────────────────────────────────── */
function AnimatedNumber({ target, duration = 1400 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target * 10) / 10);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return <>{current}</>;
}

/* ──────────────────────────────────────────
   STEP INDICATOR
 ────────────────────────────────────────── */
function StepIndicator({ step }: { step: Step }) {
  const steps = [
    { id: "exp-input", label: "Experience" },
    { id: "quiz", label: "Intelligence" },
    { id: "results", label: "The Alpha" },
  ];
  const current = steps.findIndex((s) => s.id === step);
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < current
                  ? "bg-black border-black text-white shadow-xl"
                  : i === current
                  ? "bg-black border-black text-white shadow-2xl scale-110"
                  : "bg-white border-black/10 text-black/20"
              }`}
            >
              {i < current ? <IconCheck className="w-5 h-5" /> : i + 1}
            </div>
            <span
              className={`text-[10px] mt-2 font-bold uppercase tracking-widest ${
                i === current ? "text-black" : "text-black/20"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-16 h-px mx-1 mb-6 transition-all duration-500 ${
                i < current ? "bg-black/20" : "bg-black/5"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP: EXPERIENCE INPUT
 ────────────────────────────────────────── */
function ExperienceInput({ onStart }: { onStart: (exp: number) => void }) {
  const [exp, setExp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseFloat(exp);
    if (isNaN(n) || n < 0 || n > 20) {
      setError("Please enter years between 0 and 20.");
      return;
    }
    onStart(n);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-black/5 blur-2xl rounded-full group-hover:bg-black/10 transition-all"></div>
        <div className="relative w-24 h-24 rounded-2xl bg-white border border-black/10 flex items-center justify-center shadow-sm">
          <IconBlockchain className="w-12 h-12 text-black" strokeWidth={1} />
        </div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="font-heading text-3xl md:text-4xl font-black text-black uppercase tracking-tight">
          Protocol <span className="text-zinc-400">Mastery</span> Optimizer
        </h2>
        <p className="text-black/50 text-lg leading-relaxed">
          How many years have you been active in the <span className="text-black font-bold font-heading uppercase tracking-tighter">Web3 ecosystem</span>?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="relative w-full flex items-center justify-center gap-4">
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); setExp(String(Math.max(0, Number(exp) - 0.5))); setError(""); }}
            className="w-12 h-12 rounded-xl bg-black/5 hover:bg-black hover:text-white transition-all flex items-center justify-center text-2xl font-black shadow-sm active:scale-90"
          >
            -
          </button>
          
          <div className="relative flex-1">
            <input
              type="number"
              step="0.5"
              value={exp}
              onChange={(e) => { setExp(e.target.value); setError(""); }}
              placeholder="0.0"
              className="w-full text-center text-5xl md:text-6xl font-black bg-transparent border-b-2 border-black/10 focus:border-black px-2 py-6 outline-none transition-all text-black placeholder:text-black/5 font-heading [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); setExp(String(Number(exp) + 0.5)); setError(""); }}
            className="w-12 h-12 rounded-xl bg-black/5 hover:bg-black hover:text-white transition-all flex items-center justify-center text-2xl font-black shadow-sm active:scale-90"
          >
            +
          </button>

          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.3em] text-black/20 whitespace-nowrap">
            Years of Protocol Experience
          </span>
        </div>

        {error && (
          <p className="flex items-center gap-2 text-red-400 text-sm font-bold bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">
            <IconAlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}

        <button
          type="submit"
          className="group relative w-full bg-black text-white font-black py-5 px-10 rounded-2xl text-lg uppercase tracking-tighter hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 active:scale-95 mt-4"
        >
          <IconTarget className="w-6 h-6 transition-transform group-hover:scale-110" />
          Initialize IQ Benchmarking
        </button>

        <p className="flex items-center gap-2 text-[10px] text-black/20 uppercase tracking-widest font-bold">
          <IconLock className="w-3 h-3" />
          Zero-Knowledge assessment — No Data Stored
        </p>
      </form>
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP: QUIZ
 ────────────────────────────────────────── */
const OPTION_LETTERS = ["A", "B", "C", "D"];

function Quiz({
  answers,
  onAnswer,
  onFinish,
}: {
  answers: Record<string, number>;
  onAnswer: (id: string, val: number) => void;
  onFinish: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;
  const answered = answers[q.id] !== undefined;
  const QuestionIcon = QUESTION_ICONS[q.id];
  const catConfig = CATEGORIES[q.category];

  const next = () => {
    if (current < QUESTIONS.length - 1) setCurrent((c) => c + 1);
    else onFinish();
  };

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <div className="mb-10">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-4">
          <span>Protocol {current + 1} of {QUESTIONS.length}</span>
          <span className="text-black font-extrabold">{Math.round(progress)}% Optimized</span>
        </div>
        <div className="h-1 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg bg-black text-white shadow-sm">
          <catConfig.Icon className="w-4 h-4 text-zinc-400" strokeWidth={2} />
          {catConfig.name}
        </span>
      </div>

      <div className="flex items-start gap-6 mb-10">
        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mt-1">
          <QuestionIcon className="w-8 h-8 text-black/20" strokeWidth={1} />
        </div>
        <h3 className="font-heading text-2xl md:text-4xl font-extrabold text-black leading-[1.1] tracking-tighter uppercase">
          {q.question}
        </h3>
      </div>

      <div className="grid gap-3 mb-10">
        {q.options.map((opt, idx) => {
          const isSelected = answers[q.id] === opt.value;
          return (
            <button
              key={opt.label}
              onClick={() => onAnswer(q.id, opt.value)}
              className={`w-full text-left px-6 py-5 rounded-2xl border font-bold text-base transition-all duration-300 flex items-center gap-5 group
                ${isSelected
                  ? "bg-black border-black text-white translate-x-2 shadow-2xl"
                  : "bg-white border-black/5 hover:border-black/20 text-black/50 hover:text-black"
                }`}
            >
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all
                  ${isSelected ? "bg-white/10 text-white" : "bg-black/5 text-black/30"}`}
              >
                {OPTION_LETTERS[idx]}
              </span>
              <span className="flex-1 text-sm uppercase tracking-tight">{opt.label}</span>
              {isSelected && <IconCheck className="w-5 h-5" strokeWidth={3} />}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        {current > 0 && (
          <button
            onClick={prev}
            className="flex-none px-8 py-4 border border-black/10 rounded-xl text-black/30 font-bold hover:bg-black/5 hover:text-black transition-all uppercase tracking-widest text-xs"
          >
            Previous
          </button>
        )}
        <button
          onClick={next}
          disabled={!answered}
          className={`flex-1 py-5 rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3
            ${answered
              ? "bg-black text-white hover:bg-zinc-800 shadow-xl"
              : "bg-black/5 text-black/10 cursor-not-allowed"
          }`}
        >
          {current < QUESTIONS.length - 1 ? "Next Protocol" : "Calculate My Alpha"}
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP: RESULTS
 ────────────────────────────────────────── */
const INTERPRETATIONS = [
  { minScore: 15, label: "Protocol Architect", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20", Icon: IconTrophy },
  { minScore: 10, label: "Elite Staker", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20", Icon: IconZap },
  { minScore: 5, label: "Optimizer", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", Icon: IconCheckCircle },
  { minScore: 2, label: "Active Participant", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", Icon: IconAlertTriangle },
  { minScore: -Infinity, label: "New Entrant", color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/20", Icon: IconAlertCircle },
];

function Results({
  masteryScore,
  chronoExp,
  categoryResults,
  onRetake,
}: {
  masteryScore: number;
  chronoExp: number;
  categoryResults: CategoryResult[];
  totalAlpha: number;
  onRetake: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const alpha = Math.round((masteryScore - chronoExp) * 10) / 10;
  const isPositive = alpha >= 0;
  const interp = INTERPRETATIONS.find((i) => masteryScore >= i.minScore)!;
  const InterpIcon = interp.Icon;

  return (
    <div className="w-full">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-black/5 blur-3xl rounded-full -z-10"></div>
        <p className="text-[10px] text-black/30 font-black uppercase tracking-[0.3em] mb-4">
          Protocol Mastery Intelligence
        </p>
        <div className="text-[7rem] md:text-[10rem] font-black font-heading leading-none tracking-tighter text-black">
          {mounted ? <AnimatedNumber target={masteryScore} /> : "0.0"}
        </div>
        <p className="text-black font-black text-xl uppercase tracking-widest mt-2">Alpha Points</p>

        <div className={`inline-flex flex-col items-center gap-2 mt-10 px-8 py-5 rounded-2xl border bg-black text-white`}>
          <div className="flex items-center gap-3">
            <InterpIcon className={`w-6 h-6 text-zinc-400`} strokeWidth={2} />
            <span className={`font-black text-2xl uppercase tracking-tight text-white`}>
              {interp.label}
            </span>
          </div>
          <span className="text-white/40 text-sm font-bold uppercase tracking-widest">
            {isPositive ? "+" : ""}{alpha} Intelligence Gain over Baseline
          </span>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <IconBarChart className="w-5 h-5 text-black/20" />
          <h3 className="font-heading font-black text-xl text-black uppercase tracking-wider">
            Sector Breakdown
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryResults.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group p-6 bg-white border border-black/5 hover:border-black/20 transition-all hover:-translate-y-1 flex flex-col gap-5 rounded-3xl shadow-sm hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center flex-shrink-0 border border-black/10 group-hover:bg-black group-hover:text-white transition-all">
                    <cat.Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-black text-black text-xs uppercase tracking-widest">
                    {cat.name}
                  </span>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md ${cat.alphaDelta >= 0 ? "bg-black text-white" : "bg-red-500 text-white"}`}>
                  {cat.alphaDelta >= 0 ? "+" : ""}{cat.alphaDelta}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-black/20">Optimization</span>
                  <span className="text-black/60">{cat.score}%</span>
                </div>
                <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-1000"
                    style={{ width: mounted ? `${cat.score}%` : "0%" }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-black/30 group-hover:text-black transition-colors uppercase font-bold tracking-widest flex items-center gap-2">
                {cat.tip}
                <IconTarget className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <button
          onClick={onRetake}
          className="flex-1 bg-white border border-black/10 text-black font-black py-5 rounded-xl uppercase tracking-widest text-xs hover:bg-black/5 transition-all flex items-center justify-center gap-2"
        >
          <IconRefresh className="w-4 h-4" />
          Re-Initialize Assessment
        </button>
        <Link
          href="/crypto"
          className="flex-1 bg-black text-white font-black py-5 rounded-xl uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl"
        >
          Access Protocol Library
          <IconTarget className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   MAIN EXPORT
 ────────────────────────────────────────── */
export default function StakingOptimizer() {
  const [step, setStep] = useState<Step>("exp-input");
  const [chronoExp, setChronoExp] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<{
    categoryResults: CategoryResult[];
    masteryScore: number;
    totalAlpha: number;
  } | null>(null);


  const startQuiz = (exp: number) => {
    setChronoExp(exp);
    setStep("quiz");
  };

  const handleAnswer = (id: string, val: number) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const finishQuiz = () => {
    const res = calcResults(answers, chronoExp);
    setResults(res);
    setStep("results");
  };

  const reset = () => {
    setStep("exp-input");
    setAnswers({});
    setResults(null);
  };

  return (
    <div className="w-full bg-white min-h-[600px] flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 py-12 md:py-20">
        <StepIndicator step={step} />

        <div className="bg-white border border-black/5 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 blur-[100px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 blur-[100px] -ml-32 -mb-32"></div>

          <div className="relative">
            {step === "exp-input" && <ExperienceInput onStart={startQuiz} />}
            {step === "quiz" && (
              <Quiz answers={answers} onAnswer={handleAnswer} onFinish={finishQuiz} />
            )}
            {step === "results" && results && (
              <Results
                masteryScore={results.masteryScore}
                chronoExp={chronoExp}
                categoryResults={results.categoryResults}
                totalAlpha={results.totalAlpha}
                onRetake={reset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function IconLock({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
