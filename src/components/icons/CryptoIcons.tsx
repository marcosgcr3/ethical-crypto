import React from "react";

export interface IconProps {
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

const Svg = ({
  className = "w-6 h-6",
  strokeWidth = 1.5,
  children,
}: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// ─── STAKING & YIELD (formerly SLEEP) ──────────────────────────────────────────

export const IconStaking = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </Svg>
);

export const IconYield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2v20" />
    <path d="m17 5-5-3-5 3" />
    <path d="m17 17-5 3-5-3" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Svg>
);

// ─── SECURITY & WALLETS (formerly EXERCISE) ─────────────────────────────────────

export const IconSecurity = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Svg>
);

export const IconWallet = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </Svg>
);

export const IconKey = (p: IconProps) => (
  <Svg {...p}>
    <path d="m21 2-2 2" />
    <circle cx="7" cy="17" r="5" />
    <path d="m11 13 10-10" />
    <path d="m18 4 2 2" />
    <path d="m15 7 2 2" />
  </Svg>
);

// ─── PROTOCOLS & HARDWARE (formerly NUTRITION) ──────────────────────────────────

export const IconProtocol = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const IconHardware = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </Svg>
);

export const IconNode = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
  </Svg>
);

// ─── FUNDAMENTALS & ANALYSIS (formerly STRESS) ──────────────────────────────────

export const IconAnalysis = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Svg>
);

export const IconBlockchain = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2" y="2" width="8" height="8" rx="2" />
    <rect x="14" y="2" width="8" height="8" rx="2" />
    <rect x="14" y="14" width="8" height="8" rx="2" />
    <rect x="2" y="14" width="8" height="8" rx="2" />
    <path d="M10 6h4" />
    <path d="M10 18h4" />
    <path d="M6 10v4" />
    <path d="M18 10v4" />
  </Svg>
);

export const IconNetwork = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M19 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M19 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M12 6V4" />
    <path d="M12 20v-2" />
    <path d="M6 12H4" />
    <path d="M20 12h-2" />
  </Svg>
);

// ─── REBRAND LEGACY ICONS ──────────────────────────────────────────────────────

export const IconMoon = IconStaking;
export const IconBed = IconYield;
export const IconActivity = IconSecurity;
export const IconDumbbell = IconWallet;
export const IconFootsteps = IconKey;
export const IconLeaf = IconProtocol;
export const IconBan = IconHardware;
export const IconHourglass = IconNode;
export const IconBrain = IconAnalysis;
export const IconSparkles = IconBlockchain;
export const IconUsers = IconNetwork;
export const IconPill = IconKey;
export const IconSnowflake = IconSecurity;
export const IconBarChart = (p: IconProps) => (
  <Svg {...p}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </Svg>
);
export const IconAtom = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="12" r="10" />
    <path d="m4.93 4.93 14.14 14.14" />
    <path d="m19.07 4.93-14.14 14.14" />
  </Svg>
);

// ─── RESULTS / STATUS (STAY SAME BUT DARK THEME READY) ──────────────────────────

export const IconTrophy = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </Svg>
);

export const IconZap = (p: IconProps) => (
  <Svg {...p}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Svg>
);

export const IconCheckCircle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Svg>
);

export const IconAlertTriangle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Svg>
);

export const IconAlertCircle = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <polyline points="20 6 9 17 4 12" />
  </Svg>
);

export const IconTarget = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </Svg>
);

export const IconRefresh = (p: IconProps) => (
  <Svg {...p}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </Svg>
);
// ─── UI & UTILITY ICONS (Consolidated from legacy) ──────────────────────────────

export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </Svg>
);

export const IconStar = (p: IconProps) => (
  <Svg {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Svg>
);

export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

export const IconMicroscope = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 1 0 0-14h-1" />
    <path d="M9 14h2" />
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z" />
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
  </Svg>
);

export const IconFlask = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
    <line x1="8.5" y1="2" x2="14.5" y2="2" />
    <path d="M7 16h10" />
  </Svg>
);
