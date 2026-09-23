import React from 'react';

interface OfficialAlcateiaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * Official Alcateia Logo
 * Exact visual match with the official brand logo:
 * - 3 Red speed lightning slashes
 * - Geometric wolf head with white forehead, red outer contour, and glowing red eye
 * - Sprinting athletic figure in pure white/silver with red details
 * - Slanted typography: "CORRIDA DA", "ALCATEIA", "— 2026 —"
 */
export const OfficialAlcateiaLogo: React.FC<OfficialAlcateiaLogoProps> = ({
  className = '',
  size = 64,
  showText = true,
  variant = 'dark',
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Emblem */}
      <svg
        width={size}
        height={Math.round(size * 0.78)}
        viewBox="0 0 220 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_0_12px_rgba(229,30,43,0.4)] transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <filter id="officialRedEyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="officialRedBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2E42" />
            <stop offset="100%" stopColor="#D91424" />
          </linearGradient>
        </defs>

        {/* 1. THREE RED SPEED LIGHTNING SLASHES */}
        <polygon points="18,148 40,86 58,86 36,148" fill="url(#officialRedBladeGrad)" />
        <polygon points="32,154 54,92 68,92 56,124 72,124 50,154" fill="url(#officialRedBladeGrad)" />
        <polygon points="48,158 72,98 86,98 62,158" fill="url(#officialRedBladeGrad)" />

        {/* 2. GEOMETRIC WOLF HEAD */}
        <g transform="translate(10, 0)">
          {/* Red Outer Silhouette / Perimeter */}
          <polygon
            points="102,52 108,24 122,46 138,36 135,56 168,68 152,82 176,94 140,110 120,112 108,128 92,106 82,112 92,86 72,82 88,68"
            fill="#08080C"
            stroke="#E51E2B"
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />

          {/* Inner Dark Shadow Facet */}
          <polygon points="118,50 135,56 168,68 152,82 174,92 138,108 122,102 114,78" fill="#0F0F14" />

          {/* STARK WHITE FOREHEAD & SNOUT FACET */}
          <polygon points="106,28 118,48 134,40 130,58 158,68 144,80 168,88 134,102 118,98 108,76 102,46" fill="#FFFFFF" />

          {/* Ear Highlights */}
          <polygon points="106,28 112,46 100,44" fill="#E51E2B" />
          <polygon points="114,32 120,48 112,46" fill="#181820" />

          {/* Dark Muzzle / Nose */}
          <polygon points="152,78 168,88 158,92 144,84" fill="#0A0A0E" />
          <polygon points="164,86 170,88 166,91" fill="#E51E2B" />

          {/* Glowing Red Eye */}
          <polygon points="132,64 144,66 136,71 128,68" fill="#FF1E2D" filter="url(#officialRedEyeGlow)" />
          <polygon points="134,66 138,67 135,69" fill="#FFFFFF" />
        </g>

        {/* 3. SPRINTING ATHLETIC FIGURE */}
        <g transform="translate(12, 0)">
          {/* Head */}
          <circle cx="86" cy="74" r="7" fill={isDark ? "#E8EDF2" : "#0A0A0A"} />

          {/* Torso */}
          <line x1="86" y1="81" x2="80" y2="108" stroke={isDark ? "#E8EDF2" : "#0A0A0A"} strokeWidth="4.5" strokeLinecap="round" />

          {/* Forward Arm */}
          <line x1="85" y1="88" x2="98" y2="95" stroke={isDark ? "#E8EDF2" : "#0A0A0A"} strokeWidth="4" strokeLinecap="round" />
          <circle cx="99" cy="95.5" r="3" fill="#E51E2B" />

          {/* Backward Arm */}
          <line x1="83" y1="90" x2="72" y2="98" stroke={isDark ? "#CBD5E1" : "#2A2A2A"} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="71" cy="98.5" r="2.8" fill="#E51E2B" />

          {/* Forward Leg */}
          <line x1="80" y1="108" x2="94" y2="126" stroke={isDark ? "#FFFFFF" : "#0A0A0A"} strokeWidth="4" strokeLinecap="round" />
          <line x1="94" y1="126" x2="98" y2="148" stroke={isDark ? "#FFFFFF" : "#0A0A0A"} strokeWidth="4" strokeLinecap="round" />
          <polygon points="96,146 106,149 104,153 94,151" fill="#E51E2B" />

          {/* Backward Leg */}
          <line x1="80" y1="108" x2="66" y2="128" stroke={isDark ? "#CBD5E1" : "#2A2A2A"} strokeWidth="4" strokeLinecap="round" />
          <line x1="66" y1="128" x2="50" y2="152" stroke={isDark ? "#CBD5E1" : "#2A2A2A"} strokeWidth="4" strokeLinecap="round" />
          <polygon points="48,150 54,156 46,160 42,154" fill="#E51E2B" />
        </g>
      </svg>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className="font-sports font-black italic uppercase tracking-[0.14em] text-[10px] sm:text-xs leading-tight text-[#B8CADC]"
            style={{ fontStyle: 'italic' }}
          >
            CORRIDA DA
          </span>

          <span
            className="font-sports font-black italic uppercase tracking-tight text-xl sm:text-2xl leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] my-0.5"
            style={{ fontStyle: 'italic' }}
          >
            ALCATEIA
          </span>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[2px] w-5 bg-gradient-to-r from-transparent to-[#E51E2B]" />
            <span
              className="font-sports font-black italic text-xs tracking-wider text-[#E51E2B]"
              style={{ fontStyle: 'italic' }}
            >
              2026
            </span>
            <span className="h-[2px] w-5 bg-gradient-to-l from-transparent to-[#E51E2B]" />
          </div>
        </div>
      )}
    </div>
  );
};
