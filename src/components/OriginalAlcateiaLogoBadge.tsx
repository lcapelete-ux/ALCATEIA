import React from 'react';

interface OriginalAlcateiaLogoBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showBackgroundCard?: boolean;
}

/**
 * Original Official Logo for Corrida da Alcateia 2026
 * Pixel-accurate recreation of the official brand logo:
 * - 3 Red athletic speed lightning slashes
 * - Geometric wolf head with stark white forehead, deep black contour, red perimeter, and glowing red eye
 * - Sprinting athletic figure in pure white/silver with red shoes & hand accents
 * - Slanted typography: "CORRIDA DA", "ALCATEIA", and "— 2026 —"
 */
export const OriginalAlcateiaLogoBadge: React.FC<OriginalAlcateiaLogoBadgeProps> = ({
  className = '',
  size = 'md',
  showBackgroundCard = false,
}) => {
  // Scaling dimensions
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : size === 'full' ? 1.4 : 1.0;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        showBackgroundCard
          ? 'rounded-[28px] sm:rounded-[32px] border-2 border-[#8A0F18] bg-gradient-to-br from-[#120508] via-[#090A10] to-[#05060A] p-4 sm:p-6 shadow-[0_0_50px_rgba(229,30,43,0.35)] overflow-hidden'
          : 'bg-transparent'
      } ${className}`}
    >
      {/* Subtle red ambient glow without any dark card blocking the wolf */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-64 h-32 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {/* LEFT EMBLEM: Lightning Slashes + Wolf Head + Sprinting Runner */}
        <svg
          width={Math.round(180 * scale)}
          height={Math.round(140 * scale)}
          viewBox="0 0 220 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-[0_0_15px_rgba(229,30,43,0.4)]"
        >
          <defs>
            {/* Red Eye Glow Filter */}
            <filter id="origRedEyeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Red Blade Gradient */}
            <linearGradient id="origRedBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2E42" />
              <stop offset="100%" stopColor="#D91424" />
            </linearGradient>
          </defs>

          {/* 1. THREE RED SPEED LIGHTNING SLASHES (Left background) */}
          {/* Leftmost slash */}
          <polygon
            points="18,148 40,86 58,86 36,148"
            fill="url(#origRedBladeGrad)"
          />
          {/* Middle stepped slash */}
          <polygon
            points="32,154 54,92 68,92 56,124 72,124 50,154"
            fill="url(#origRedBladeGrad)"
          />
          {/* Front / lower slash */}
          <polygon
            points="48,158 72,98 86,98 62,158"
            fill="url(#origRedBladeGrad)"
          />

          {/* 2. GEOMETRIC WOLF HEAD (Diagonal upward-right stance) */}
          <g transform="translate(10, 0)">
            {/* Red Outer Silhouette / Framing Glow */}
            <polygon
              points="102,52 108,24 122,46 138,36 135,56 168,68 152,82 176,94 140,110 120,112 108,128 92,106 82,112 92,86 72,82 88,68"
              fill="#08080C"
              stroke="#E51E2B"
              strokeWidth="2.5"
              strokeLinejoin="miter"
            />

            {/* Inner Black Shadow Facets (Under-snout & neck) */}
            <polygon
              points="118,50 135,56 168,68 152,82 174,92 138,108 122,102 114,78"
              fill="#0F0F14"
            />

            {/* STARK WHITE FOREHEAD & SNOUT FACET (The prominent white wolf face) */}
            <polygon
              points="106,28 118,48 134,40 130,58 158,68 144,80 168,88 134,102 118,98 108,76 102,46"
              fill="#FFFFFF"
            />

            {/* Ear Accents */}
            <polygon points="106,28 112,46 100,44" fill="#E51E2B" />
            <polygon points="114,32 120,48 112,46" fill="#181820" />

            {/* Dark Muzzle / Nose Accent */}
            <polygon points="152,78 168,88 158,92 144,84" fill="#0A0A0E" />
            <polygon points="164,86 170,88 166,91" fill="#E51E2B" />

            {/* GLOWING CRIMSON RED EYE */}
            <polygon
              points="132,64 144,66 136,71 128,68"
              fill="#FF1E2D"
              filter="url(#origRedEyeGlow)"
            />
            {/* Eye core hot white dot */}
            <polygon points="134,66 138,67 135,69" fill="#FFFFFF" />
          </g>

          {/* 3. SPRINTING ATHLETIC FIGURE (White stick/geometric runner) */}
          <g transform="translate(12, 0)">
            {/* Runner Head */}
            <circle cx="86" cy="74" r="7" fill="#E8EDF2" />

            {/* Runner Neck & Torso */}
            <line
              x1="86"
              y1="81"
              x2="80"
              y2="108"
              stroke="#E8EDF2"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Forward Arm (Driving forward right) */}
            <line
              x1="85"
              y1="88"
              x2="98"
              y2="95"
              stroke="#E8EDF2"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Forward Hand / Glove in Red */}
            <circle cx="99" cy="95.5" r="3" fill="#E51E2B" />

            {/* Backward Arm (Pumping back left) */}
            <line
              x1="83"
              y1="90"
              x2="72"
              y2="98"
              stroke="#CBD5E1"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Backward Hand in Red */}
            <circle cx="71" cy="98.5" r="2.8" fill="#E51E2B" />

            {/* Forward Leg (Dynamic stride forward) */}
            <line
              x1="80"
              y1="108"
              x2="94"
              y2="126"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="94"
              y1="126"
              x2="98"
              y2="148"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Forward Foot / Shoe in Red */}
            <polygon points="96,146 106,149 104,153 94,151" fill="#E51E2B" />

            {/* Back Leg (Extending backward over the red speed blade) */}
            <line
              x1="80"
              y1="108"
              x2="66"
              y2="128"
              stroke="#CBD5E1"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="66"
              y1="128"
              x2="50"
              y2="152"
              stroke="#CBD5E1"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Back Foot / Shoe in Red */}
            <polygon points="48,150 54,156 46,160 42,154" fill="#E51E2B" />
          </g>
        </svg>

        {/* RIGHT TYPOGRAPHY: CORRIDA DA / ALCATEIA / — 2026 — */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* "CORRIDA DA" */}
          <span
            className="font-sports font-black italic uppercase tracking-[0.14em] text-sm sm:text-base text-[#B8CADC] drop-shadow-sm leading-tight"
            style={{ fontStyle: 'italic' }}
          >
            CORRIDA DA
          </span>

          {/* "ALCATEIA" */}
          <span
            className="font-sports font-black italic uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-none my-1"
            style={{ fontStyle: 'italic' }}
          >
            ALCATEIA
          </span>

          {/* "— 2026 —" */}
          <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-1.5 w-full">
            {/* Left red gradient line */}
            <span className="h-[2.5px] flex-1 max-w-[60px] bg-gradient-to-r from-transparent via-[#E51E2B]/80 to-[#E51E2B]" />

            {/* 2026 in bold red */}
            <span
              className="font-sports font-black italic text-lg sm:text-xl text-[#E51E2B] tracking-wider drop-shadow-[0_0_10px_rgba(229,30,43,0.5)]"
              style={{ fontStyle: 'italic' }}
            >
              2026
            </span>

            {/* Right red gradient line */}
            <span className="h-[2.5px] flex-1 max-w-[60px] bg-gradient-to-l from-transparent via-[#E51E2B]/80 to-[#E51E2B]" />
          </div>
        </div>
      </div>
    </div>
  );
};
