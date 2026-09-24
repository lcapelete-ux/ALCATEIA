import React from 'react';
import { Lock, Flame } from 'lucide-react';
import runnerWolfEmblem from '../assets/images/runner_wolf_emblem_1790261682882.jpg';

interface NavbarProps {
  onOpenAdmin: () => void;
  registeredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  registeredCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/95 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-22 flex items-center justify-between">
        {/* Logo & Official Brand - Runner with wolf emblem */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-950 border border-red-500/70 overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(229,30,43,0.5)] group-hover:scale-105 transition-transform shrink-0">
            <img
              src={runnerWolfEmblem}
              alt="Corredor e Lobo Alcateia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
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
          {/* CTA Inscrição Quick Scroll */}
          <a
            href="#inscricao"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-[#E51E2B] hover:brightness-110 text-white font-sports font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 cursor-pointer transition-all"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Inscrever-se R$ 44,90</span>
          </a>

          {/* Painel do Administrador & Banco de Inscritos */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-slate-100 hover:text-white border border-red-500/50 hover:border-red-400 text-xs font-bold font-sports uppercase tracking-wider cursor-pointer transition-all shadow-md shadow-red-950/40"
            title="Acessar o Banco de Inscrições, Relatórios e Exportar Excel"
          >
            <Lock className="w-3.5 h-3.5 text-[#E51E2B]" />
            <span>Banco de Inscritos</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#E51E2B] text-white text-[10px] font-mono font-bold">
              {registeredCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

