import React from 'react';

interface WolfLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const WolfLogo: React.FC<WolfLogoProps> = ({ className = '', size = 48, glow = true }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-md pointer-events-none"
          style={{ width: size * 1.2, height: size * 1.2 }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative transform transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="wolfBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#0077FE" />
            <stop offset="100%" stopColor="#051937" />
          </linearGradient>
          <linearGradient id="wolfFurDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C2E4A" />
            <stop offset="100%" stopColor="#0A1128" />
          </linearGradient>
          <linearGradient id="wolfCyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id="silverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield / Geometric Crown */}
        <polygon
          points="50,4 78,16 92,44 76,86 50,96 24,86 8,44 22,16"
          fill="url(#wolfFurDark)"
          stroke="url(#wolfBlueGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Left Ear */}
        <polygon points="26,18 36,4 40,30" fill="#0B1A30" stroke="#00C9FF" strokeWidth="1.5" />
        <polygon points="30,19 36,9 38,26" fill="#0072FF" />

        {/* Right Ear */}
        <polygon points="74,18 64,4 60,30" fill="#0B1A30" stroke="#00C9FF" strokeWidth="1.5" />
        <polygon points="70,19 64,9 62,26" fill="#0072FF" />

        {/* Forehead & Brow Structure */}
        <polygon points="50,22 62,32 50,42 38,32" fill="url(#wolfBlueGrad)" />
        <polygon points="50,22 40,30 50,34" fill="#00E5FF" opacity="0.4" />

        {/* Temple Facets */}
        <polygon points="26,18 40,30 28,42 16,36" fill="#0F2444" stroke="#0072FF" strokeWidth="0.8" />
        <polygon points="74,18 60,30 72,42 84,36" fill="#0F2444" stroke="#0072FF" strokeWidth="0.8" />

        {/* Cheeks */}
        <polygon points="28,42 40,48 30,68 18,54" fill="#152B4D" stroke="#00E5FF" strokeWidth="0.8" />
        <polygon points="72,42 60,48 70,68 82,54" fill="#152B4D" stroke="#00E5FF" strokeWidth="0.8" />

        {/* Fierce Cyan Eyes */}
        <polygon points="36,44 44,46 38,48" fill="#00F0FF" filter="url(#eyeGlow)" />
        <polygon points="64,44 56,46 62,48" fill="#00F0FF" filter="url(#eyeGlow)" />

        {/* Bridge of Muzzle */}
        <polygon points="50,42 44,48 50,68 56,48" fill="#1C355E" />
        <polygon points="50,42 47,48 50,68" fill="#25487D" />

        {/* Snout and Jaws */}
        <polygon points="44,48 50,68 40,78 35,66" fill="#0E1D33" stroke="#0072FF" strokeWidth="0.8" />
        <polygon points="56,48 50,68 60,78 65,66" fill="#0E1D33" stroke="#0072FF" strokeWidth="0.8" />

        {/* Wolf Nose */}
        <polygon points="46,68 54,68 50,74" fill="#00F0FF" />

        {/* Chin / Fang Accent */}
        <polygon points="50,74 44,82 50,88 56,82" fill="url(#silverAccent)" />
        <polygon points="47,75 50,81 53,75" fill="#FFFFFF" />

        {/* Lower Beard/Collar Tufts */}
        <polygon points="30,68 40,78 36,88 24,78" fill="#0B1A30" stroke="#0072FF" strokeWidth="0.8" />
        <polygon points="70,68 60,78 64,88 76,78" fill="#0B1A30" stroke="#0072FF" strokeWidth="0.8" />
      </svg>
    </div>
  );
};
