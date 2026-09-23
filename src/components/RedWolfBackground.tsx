import React from 'react';
import wolfBgImage from '../assets/images/alcateia_wolf_red_bg_1790204141975.jpg';

interface RedWolfBackgroundProps {
  className?: string;
  opacity?: number;
}

export const RedWolfBackground: React.FC<RedWolfBackgroundProps> = ({
  className = '',
  opacity = 0.32,
}) => {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* 1. Dramatic Dark Red Wolf Wallpaper with Balanced Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url(${wolfBgImage})`,
          opacity: opacity,
          filter: 'contrast(1.15) brightness(0.95)',
        }}
      />

      {/* 2. Soft Dark Vignette to ensure maximum readability of all texts & buttons */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/75 via-[#070709]/45 to-[#070709]/85" />

      {/* 3. Ambient Crimson Red Glow Highlights */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-red-600/20 via-red-900/10 to-transparent blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-red-600/15 via-rose-900/5 to-transparent blur-[130px]" />

      {/* 4. Red Speed Slashes (matching the official logo motion blades) */}
      <svg
        className="absolute top-16 right-[-4%] w-[420px] h-[420px] opacity-25"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 30 180 L 110 30 L 135 30 L 55 180 Z" fill="#E51E2B" />
        <path d="M 60 190 L 140 40 L 165 40 L 85 190 Z" fill="#E51E2B" />
        <path d="M 90 200 L 170 50 L 195 50 L 115 200 Z" fill="#E51E2B" />
      </svg>

      <svg
        className="absolute bottom-24 left-[-4%] w-[360px] h-[360px] opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 20 170 L 100 20 L 120 20 L 40 170 Z" fill="#E51E2B" />
        <path d="M 50 180 L 130 30 L 150 30 L 70 180 Z" fill="#E51E2B" />
      </svg>
    </div>
  );
};
