import React from 'react';
import { Lock, Play, Cloud, Flame } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onReplayIntro: () => void;
  onOpenNetlifyGuide: () => void;
  registeredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onReplayIntro,
  onOpenNetlifyGuide,
  registeredCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/95 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-22 flex items-center justify-between">
        {/* Logo & Official Brand - Clean athletic typography */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-950 border border-red-500/70 flex items-center justify-center shadow-[0_0_20px_rgba(229,30,43,0.4)] group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-sports font-black italic uppercase text-[11px] tracking-[0.18em] text-[#B8CADC] leading-none">
              CORRIDA DA
            </span>
            <span className="font-sports font-black italic uppercase text-2xl tracking-tight text-white leading-none my-0.5 group-hover:text-red-400 transition-colors">
              ALCATEIA
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-[2px] w-4 bg-[#E51E2B]" />
              <span className="font-sports font-black italic text-[11px] tracking-wider text-[#E51E2B]">
                2026
              </span>
              <span className="text-[10px] text-slate-400 font-medium">· 8 DE NOV</span>
            </div>
          </div>
        </a>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay Intro Button */}
          <button
            onClick={onReplayIntro}
            title="Assistir animação oficial"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-red-600/50 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-[#E51E2B] fill-[#E51E2B]" />
            <span>Intro do Lobo</span>
          </button>

          {/* Netlify Guide Button */}
          <button
            onClick={onOpenNetlifyGuide}
            title="Como publicar no Netlify"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Cloud className="w-3.5 h-3.5 text-red-400" />
            <span>Publicar no Netlify</span>
          </button>

          {/* CTA Inscrição Quick Scroll */}
          <a
            href="#inscricao"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-[#E51E2B] hover:brightness-110 text-white font-sports font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 cursor-pointer transition-all"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Inscrever-se R$ 44,90</span>
          </a>

          {/* Área Restrita Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-red-950/40 text-slate-200 hover:text-white border border-slate-800 hover:border-red-500 text-xs font-bold font-sports uppercase tracking-wider cursor-pointer transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-[#E51E2B]" />
            <span>Área Restrita</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-600/20 text-red-300 text-[10px] font-mono border border-red-500/30">
              {registeredCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

