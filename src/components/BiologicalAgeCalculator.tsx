"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  IconMoon, IconBed, IconClock,
  IconActivity, IconDumbbell, IconFootsteps,
  IconLeaf, IconBan, IconHourglass,
  IconBrain, IconSparkles, IconUsers,
  IconPill, IconSnowflake, IconBarChart,
  IconAtom, IconTrophy, IconZap,
  IconCheckCircle, IconAlertTriangle, IconAlertCircle,
  IconCheck, IconTarget, IconRefresh,
  type IconProps,
} from "@/components/icons/BioIcons";

/* ──────────────────────────────────────────
   TYPES
────────────────────────────────────────── */
type CategoryKey = "sleep" | "exercise" | "nutrition" | "stress" | "biohacks";
type IconComponent = React.ComponentType<IconProps>;

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
  ageDelta: number;
  color: string;
  gradient: string;
  tip: string;
  href: string;
}

/* ──────────────────────────────────────────
   QUESTION ICONS MAP
────────────────────────────────────────── */
const QUESTION_ICONS: Record<string, IconComponent> = {
  sleep_duration: IconMoon,
  sleep_quality: IconBed,
  sleep_consistency: IconClock,
  cardio: IconActivity,
  strength: IconDumbbell,
  steps: IconFootsteps,
  vegetables: IconLeaf,
  processed: IconBan,
  fasting: IconHourglass,
  stress: IconBrain,
  meditation: IconSparkles,
  social: IconUsers,
  supplements: IconPill,
  cold: IconSnowflake,
  tracking: IconBarChart,
};

/* ──────────────────────────────────────────
   QUESTIONS
────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: "sleep_duration",
    category: "sleep",
    question: "How many hours do you sleep per night on average?",
    options: [
      { label: "Less than 5 hours", value: 0 },
      { label: "5–6 hours", value: 30 },
      { label: "7–8 hours (optimal)", value: 100 },
      { label: "More than 9 hours", value: 70 },
    ],
  },
  {
    id: "sleep_quality",
    category: "sleep",
    question: "How would you rate your sleep quality?",
    options: [
      { label: "Often wake up exhausted", value: 0 },
      { label: "Light, frequently interrupted sleep", value: 25 },
      { label: "Fairly restorative most nights", value: 70 },
      { label: "Deep and extremely restorative", value: 100 },
    ],
  },
  {
    id: "sleep_consistency",
    category: "sleep",
    question: "Do you maintain a consistent sleep–wake schedule?",
    options: [
      { label: "Random, no schedule at all", value: 0 },
      { label: "Varies by 2–3 hours daily", value: 40 },
      { label: "Mostly consistent (± 1 hour)", value: 80 },
      { label: "Same time every single day", value: 100 },
    ],
  },
  {
    id: "cardio",
    category: "exercise",
    question: "How many days per week do you do aerobic exercise?",
    options: [
      { label: "None at all", value: 0 },
      { label: "1–2 days per week", value: 40 },
      { label: "3–4 days per week", value: 85 },
      { label: "5 or more days per week", value: 100 },
    ],
  },
  {
    id: "strength",
    category: "exercise",
    question: "How often do you do strength or resistance training?",
    options: [
      { label: "Never", value: 0 },
      { label: "Once per week", value: 35 },
      { label: "2–3 times per week", value: 85 },
      { label: "4 or more times per week", value: 100 },
    ],
  },
  {
    id: "steps",
    category: "exercise",
    question: "How many steps do you average per day?",
    options: [
      { label: "Under 3,000 steps", value: 0 },
      { label: "3,000–6,000 steps", value: 40 },
      { label: "6,000–10,000 steps", value: 80 },
      { label: "Over 10,000 steps", value: 100 },
    ],
  },
  {
    id: "vegetables",
    category: "nutrition",
    question: "How many servings of vegetables or fruit do you eat daily?",
    options: [
      { label: "0–1 servings", value: 0 },
      { label: "2–3 servings", value: 45 },
      { label: "4–6 servings", value: 85 },
      { label: "7+ servings (rainbow diet)", value: 100 },
    ],
  },
  {
    id: "processed",
    category: "nutrition",
    question: "How often do you eat ultra-processed or fast food?",
    options: [
      { label: "Daily", value: 0 },
      { label: "Several times per week", value: 30 },
      { label: "Once a week or less", value: 75 },
      { label: "Rarely or never", value: 100 },
    ],
  },
  {
    id: "fasting",
    category: "nutrition",
    question: "Do you practice any form of intermittent fasting?",
    options: [
      { label: "No — I eat throughout the day", value: 20 },
      { label: "Occasionally (12:12 window)", value: 50 },
      { label: "Regular 16:8 fasting protocol", value: 90 },
      { label: "Extended or multi-day fasting", value: 100 },
    ],
  },
  {
    id: "stress",
    category: "stress",
    question: "How would you describe your chronic stress levels?",
    options: [
      { label: "Constantly overwhelmed", value: 0 },
      { label: "Often stressed and tense", value: 25 },
      { label: "Manageable, mostly in control", value: 70 },
      { label: "Rarely stressed, highly resilient", value: 100 },
    ],
  },
  {
    id: "meditation",
    category: "stress",
    question: "Do you practice mindfulness, meditation, or breathwork?",
    options: [
      { label: "Never", value: 0 },
      { label: "Occasionally, when stressed", value: 35 },
      { label: "Weekly — 2 to 4 sessions", value: 75 },
      { label: "Daily dedicated practice", value: 100 },
    ],
  },
  {
    id: "social",
    category: "stress",
    question: "How strong are your social connections and sense of purpose?",
    options: [
      { label: "Isolated, no clear purpose", value: 0 },
      { label: "Limited social contact", value: 30 },
      { label: "Good relationships and some purpose", value: 75 },
      { label: "Thriving community and strong purpose", value: 100 },
    ],
  },
  {
    id: "supplements",
    category: "biohacks",
    question: "Which longevity supplements do you take regularly?",
    options: [
      { label: "None", value: 10 },
      { label: "Basic — Vitamin D, Omega-3", value: 45 },
      { label: "Advanced — NMN, Magnesium, etc.", value: 80 },
      { label: "Full longevity stack", value: 100 },
    ],
  },
  {
    id: "cold",
    category: "biohacks",
    question: "Do you use cold exposure protocols?",
    options: [
      { label: "Never", value: 10 },
      { label: "Occasionally tried it", value: 40 },
      { label: "Weekly cold showers", value: 75 },
      { label: "Regular ice baths or cryotherapy", value: 100 },
    ],
  },
  {
    id: "tracking",
    category: "biohacks",
    question: "Do you track health data with wearables or blood panels?",
    options: [
      { label: "No tracking at all", value: 10 },
      { label: "Basic step counter only", value: 35 },
      { label: "Wearable tracking HRV, sleep, glucose", value: 80 },
      { label: "Full biomarker tracking and labs", value: 100 },
    ],
  },
];

/* ──────────────────────────────────────────
   CATEGORY CONFIG
────────────────────────────────────────── */
const CATEGORIES: Record<CategoryKey, Omit<CategoryResult, "score" | "ageDelta">> = {
  sleep: {
    name: "Sleep Optimization",
    Icon: IconMoon,
    color: "#6366f1",
    gradient: "from-indigo-500 to-purple-600",
    tip: "Explore science-backed sleep protocols",
    href: "/sleep",
  },
  exercise: {
    name: "Movement & Exercise",
    Icon: IconActivity,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    tip: "Build a longevity-focused training routine",
    href: "/biohacking",
  },
  nutrition: {
    name: "Nutrition & Fasting",
    Icon: IconLeaf,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    tip: "Discover nutrition strategies for longevity",
    href: "/nutrition",
  },
  stress: {
    name: "Stress & Mindset",
    Icon: IconBrain,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    tip: "Master stress resilience for a longer life",
    href: "/biohacking",
  },
  biohacks: {
    name: "Biohacking Stack",
    Icon: IconAtom,
    color: "#1A6B8A",
    gradient: "from-cyan-500 to-blue-700",
    tip: "Explore cutting-edge longevity biohacks",
    href: "/wearables",
  },
};

/* ──────────────────────────────────────────
   SCORE CALCULATION
────────────────────────────────────────── */
function calcResults(answers: Record<string, number>, chronoAge: number) {
  const cats = Object.keys(CATEGORIES) as CategoryKey[];

  const categoryResults: CategoryResult[] = cats.map((cat) => {
    const qs = QUESTIONS.filter((q) => q.category === cat);
    const scores = qs.map((q) => answers[q.id]).filter((v) => v !== undefined);
    const avg = scores.length
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 50;
    const ageDelta = Math.round((50 - avg) * 0.07 * 10) / 10;
    return { ...CATEGORIES[cat], score: Math.round(avg), ageDelta };
  });

  const totalDelta = categoryResults.reduce((s, c) => s + c.ageDelta, 0);
  const bioAge = Math.max(18, Math.round((chronoAge + totalDelta) * 10) / 10);

  return { categoryResults, bioAge, totalDelta };
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
function StepIndicator({ step }: { step: "age-input" | "quiz" | "results" }) {
  const steps = [
    { id: "age-input", label: "Your Age" },
    { id: "quiz", label: "Assessment" },
    { id: "results", label: "Results" },
  ];
  const current = steps.findIndex((s) => s.id === step);
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < current
                  ? "bg-bioblue border-bioblue text-white"
                  : i === current
                  ? "bg-bioblue border-bioblue text-white shadow-lg shadow-bioblue/30"
                  : "bg-white border-gray-200 text-slate/30"
              }`}
            >
              {i < current ? <IconCheck className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-[10px] mt-1 font-semibold uppercase tracking-wide ${
                i === current ? "text-bioblue" : "text-slate/30"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-16 h-px mx-1 mb-4 transition-all duration-500 ${
                i < current ? "bg-bioblue" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP: AGE INPUT
────────────────────────────────────────── */
function AgeInput({ onStart }: { onStart: (age: number) => void }) {
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(age);
    if (!n || n < 18 || n > 100) {
      setError("Please enter a valid age between 18 and 100.");
      return;
    }
    onStart(n);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {/* Icon hero */}
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-bioblue/10 to-cyan-500/10 border border-bioblue/15 flex items-center justify-center">
          <IconAtom className="w-10 h-10 text-bioblue" strokeWidth={1.2} />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-bioblue rounded-full flex items-center justify-center">
          <IconSparkles className="w-3 h-3 text-white" strokeWidth={2} />
        </div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate">
          What&apos;s your{" "}
          <span className="text-bioblue">chronological age?</span>
        </h2>
        <p className="text-slate/65 text-lg leading-relaxed">
          We&apos;ll use 15 science-backed questions across 5 health dimensions
          to calculate how old your body actually is.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
        <div className="relative w-full">
          <input
            id="chrono-age-input"
            type="number"
            min={18}
            max={100}
            value={age}
            onChange={(e) => { setAge(e.target.value); setError(""); }}
            placeholder="e.g.  35"
            className="w-full text-center text-4xl font-bold border-2 border-gray-200 focus:border-bioblue rounded-2xl px-6 py-6 outline-none transition-all bg-white shadow-sm text-slate placeholder:text-slate/20 font-heading"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate/35 text-base font-semibold pointer-events-none">
            years
          </span>
        </div>

        {error && (
          <p className="flex items-center gap-1.5 text-red-500 text-sm">
            <IconAlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}

        <button
          id="start-calculator-btn"
          type="submit"
          className="w-full bg-gradient-to-r from-bioblue to-cyan-500 text-white font-bold py-4 px-10 rounded-2xl text-lg hover:opacity-90 transition-all shadow-lg shadow-bioblue/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          <IconTarget className="w-5 h-5" />
          Calculate My Biological Age
        </button>

        <p className="flex items-center gap-1.5 text-xs text-slate/40">
          <IconLock className="w-3.5 h-3.5" />
          100% private — no data stored or transmitted
        </p>
      </form>

      {/* Category preview */}
      <div className="w-full max-w-sm">
        <p className="text-center text-xs text-slate/40 uppercase tracking-widest font-semibold mb-3">
          5 dimensions analyzed
        </p>
        <div className="grid grid-cols-5 gap-2">
          {(Object.entries(CATEGORIES) as [CategoryKey, typeof CATEGORIES[CategoryKey]][]).map(([key, cat]) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <cat.Icon
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-[9px] text-slate/50 font-semibold text-center leading-tight">
                {cat.name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Forward declare to avoid circular
function IconLock({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   STEP: QUIZ
────────────────────────────────────────── */
const OPTION_LETTERS = ["A", "B", "C", "D"];

const OPTION_COLORS = [
  { default: "bg-red-50 border-red-100 text-red-600", selected: "border-red-400 bg-red-50 ring-2 ring-red-200" },
  { default: "bg-amber-50 border-amber-100 text-amber-600", selected: "border-amber-400 bg-amber-50 ring-2 ring-amber-200" },
  { default: "bg-teal-50 border-teal-100 text-teal-600", selected: "border-teal-400 bg-teal-50 ring-2 ring-teal-200" },
  { default: "bg-emerald-50 border-emerald-100 text-emerald-600", selected: "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200" },
];

const CAT_STYLES: Record<CategoryKey, string> = {
  sleep: "bg-indigo-50 text-indigo-600 border-indigo-100",
  exercise: "bg-emerald-50 text-emerald-600 border-emerald-100",
  nutrition: "bg-amber-50 text-amber-600 border-amber-100",
  stress: "bg-pink-50 text-pink-600 border-pink-100",
  biohacks: "bg-cyan-50 text-cyan-600 border-cyan-100",
};

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
      {/* Progress */}
      <div className="mb-7">
        <div className="flex justify-between items-center text-xs text-slate/50 mb-2 font-medium">
          <span>Question {current + 1} of {QUESTIONS.length}</span>
          <span className="font-bold text-bioblue">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-bioblue to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Category badge */}
      <div className="mb-5">
        <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${CAT_STYLES[q.category]}`}>
          <catConfig.Icon className="w-3.5 h-3.5" strokeWidth={2} />
          {catConfig.name}
        </span>
      </div>

      {/* Question */}
      <div className="flex items-start gap-4 mb-7">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate/5 border border-slate/10 flex items-center justify-center mt-0.5">
          <QuestionIcon className="w-6 h-6 text-slate/70" strokeWidth={1.5} />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-slate leading-snug">
          {q.question}
        </h3>
      </div>

      {/* Options */}
      <div className="grid gap-2.5 mb-7">
        {q.options.map((opt, idx) => {
          const isSelected = answers[q.id] === opt.value;
          const col = OPTION_COLORS[idx];
          return (
            <button
              key={opt.label}
              id={`option-${q.id}-${idx}`}
              onClick={() => onAnswer(q.id, opt.value)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium text-sm transition-all duration-150 flex items-center gap-4 group
                ${isSelected
                  ? `${col.selected} shadow-sm`
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-slate"
                }`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all
                  ${isSelected ? `${col.default} opacity-100` : "bg-gray-100 text-slate/40 group-hover:bg-gray-200"}`}
              >
                {OPTION_LETTERS[idx]}
              </span>
              <span className="flex-1 leading-snug">{opt.label}</span>
              {isSelected && (
                <span className="flex-shrink-0 ml-auto">
                  <IconCheck className="w-4 h-4 text-bioblue" strokeWidth={2.5} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {current > 0 && (
          <button
            id="prev-question-btn"
            onClick={prev}
            className="flex-none px-5 py-3 border-2 border-gray-200 rounded-xl text-slate/60 font-bold hover:border-gray-300 hover:text-slate transition-all text-sm"
          >
            ← Back
          </button>
        )}
        <button
          id="next-question-btn"
          onClick={next}
          disabled={!answered}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
            ${answered
              ? "bg-gradient-to-r from-bioblue to-cyan-500 text-white hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-bioblue/20"
              : "bg-gray-100 text-slate/30 cursor-not-allowed"
          }`}
        >
          {current < QUESTIONS.length - 1 ? (
            <>Next question</>
          ) : (
            <>
              <IconTarget className="w-4 h-4" />
              View My Results
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP: RESULTS
────────────────────────────────────────── */
const INTERPRETATIONS = [
  { minDiff: 10, label: "Elite Biohacker", textColor: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", Icon: IconTrophy },
  { minDiff: 5, label: "Advanced Optimizer", textColor: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200", Icon: IconZap },
  { minDiff: 0, label: "Above Average", textColor: "text-bioblue", bg: "bg-blue-50 border-blue-200", Icon: IconCheckCircle },
  { minDiff: -5, label: "Room to Optimize", textColor: "text-amber-600", bg: "bg-amber-50 border-amber-200", Icon: IconAlertTriangle },
  { minDiff: -Infinity, label: "Needs Attention", textColor: "text-red-600", bg: "bg-red-50 border-red-200", Icon: IconAlertCircle },
];

function Results({
  bioAge,
  chronoAge,
  categoryResults,
  onRetake,
}: {
  bioAge: number;
  chronoAge: number;
  categoryResults: CategoryResult[];
  totalDelta: number;
  onRetake: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const diff = Math.round((chronoAge - bioAge) * 10) / 10;
  const isYounger = diff >= 0;
  const interp = INTERPRETATIONS.find((i) => diff >= i.minDiff)!;
  const InterpIcon = interp.Icon;

  const shareText = `My biological age is ${bioAge} — that's ${Math.abs(diff)} years ${isYounger ? "younger" : "older"} than my chronological age! Calculate yours: https://ethicalbiohacking.com/longevity-calculator`;

  return (
    <div className="w-full">
      {/* ── Hero score ── */}
      <div className="text-center mb-10">
        <p className="text-xs text-slate/40 font-bold uppercase tracking-widest mb-3">
          Your Biological Age
        </p>
        <div
          className="text-[6rem] md:text-[8rem] font-extrabold font-heading leading-none tabular-nums"
          style={{ color: isYounger ? "#10b981" : "#ef4444" }}
        >
          {mounted ? <AnimatedNumber target={bioAge} /> : "—"}
        </div>
        <p className="text-slate/40 font-semibold text-lg mt-1">years old</p>

        {/* Interpretation badge */}
        <div className={`inline-flex items-center gap-2.5 mt-5 px-5 py-3 rounded-2xl border-2 ${interp.bg}`}>
          <InterpIcon className={`w-5 h-5 ${interp.textColor}`} strokeWidth={1.5} />
          <span className={`font-bold text-base ${interp.textColor}`}>
            {interp.label}
          </span>
          <span className={`text-sm font-medium ${interp.textColor} opacity-80`}>
            — {Math.abs(diff)} years {isYounger ? "younger" : "older"} than your chronological age
          </span>
        </div>
      </div>

      {/* ── Category breakdown ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <IconBarChart className="w-5 h-5 text-slate/50" />
          <h3 className="font-heading font-extrabold text-xl text-slate">
            Score by Category
          </h3>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {categoryResults.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cat.color}15` }}
                  >
                    <cat.Icon className="w-4 h-4" style={{ color: cat.color } as React.CSSProperties} strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-slate text-sm leading-tight">
                    {cat.name}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                    cat.ageDelta <= 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {cat.ageDelta <= 0 ? "−" : "+"}{Math.abs(cat.ageDelta)}y
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate/40 font-medium">Score</span>
                  <span className="font-bold text-slate/60">{cat.score}/100</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${cat.gradient} rounded-full transition-all duration-1000`}
                    style={{ width: mounted ? `${cat.score}%` : "0%" }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate/40 group-hover:text-bioblue transition-colors flex items-center gap-1">
                {cat.tip}
                <span className="text-bioblue opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Top 3 targets ── */}
      <div className="bg-gradient-to-br from-slate/[0.03] to-bioblue/[0.04] border border-bioblue/10 rounded-2xl p-6 mb-7">
        <div className="flex items-center gap-2 mb-5">
          <IconTarget className="w-5 h-5 text-bioblue" />
          <h3 className="font-heading font-extrabold text-xl text-slate">
            Your Top Optimization Targets
          </h3>
        </div>
        <div className="space-y-2.5">
          {[...categoryResults]
            .sort((a, b) => a.score - b.score)
            .slice(0, 3)
            .map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-sm border border-transparent hover:border-gray-100 transition-all group"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bioblue text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  <cat.Icon className="w-4 h-4" style={{ color: cat.color } as React.CSSProperties} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate text-sm">{cat.name}</p>
                  <p className="text-xs text-slate/50 mt-0.5">{cat.tip}</p>
                </div>
                <span className="text-xs text-slate/30 group-hover:text-bioblue transition-colors flex-shrink-0 font-bold">
                  →
                </span>
              </Link>
            ))}
        </div>
      </div>

      {/* ── Share + Retake ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          id="share-twitter-btn"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-black/80 transition-all text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>
        <button
          id="retake-calculator-btn"
          onClick={onRetake}
          className="flex-1 border-2 border-gray-200 text-slate font-bold py-3.5 px-6 rounded-2xl hover:border-bioblue hover:text-bioblue transition-all text-sm flex items-center justify-center gap-2"
        >
          <IconRefresh className="w-4 h-4" />
          Retake Assessment
        </button>
      </div>

      <p className="text-center text-xs text-slate/35 mt-5">
        Educational purposes only — not medical advice.{" "}
        <Link href="/disclaimer" className="underline hover:text-bioblue">
          Read disclaimer
        </Link>
        .
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────── */
type Step = "age-input" | "quiz" | "results";

export default function BiologicalAgeCalculator() {
  const [step, setStep] = useState<Step>("age-input");
  const [chronoAge, setChronoAge] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const topRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleStart = (age: number) => { setChronoAge(age); setStep("quiz"); scrollTop(); };
  const handleAnswer = (id: string, val: number) => setAnswers((p) => ({ ...p, [id]: val }));
  const handleFinish = () => { setStep("results"); scrollTop(); };
  const handleRetake = () => { setAnswers({}); setStep("age-input"); scrollTop(); };

  const { categoryResults, bioAge, totalDelta } =
    step === "results"
      ? calcResults(answers, chronoAge)
      : { categoryResults: [], bioAge: 0, totalDelta: 0 };

  return (
    <div
      ref={topRef}
      id="calculator"
      className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 lg:p-12 scroll-mt-32"
    >
      <StepIndicator step={step} />
      {step === "age-input" && <AgeInput onStart={handleStart} />}
      {step === "quiz" && (
        <Quiz answers={answers} onAnswer={handleAnswer} onFinish={handleFinish} />
      )}
      {step === "results" && (
        <Results
          bioAge={bioAge}
          chronoAge={chronoAge}
          categoryResults={categoryResults}
          totalDelta={totalDelta}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
}
