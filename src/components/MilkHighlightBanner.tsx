import React from 'react';
import { Milk, Heart, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface MilkHighlightBannerProps {
  pledgedCount: number;
}

export const MilkHighlightBanner: React.FC<MilkHighlightBannerProps> = ({ pledgedCount }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-[#E51E2B] bg-gradient-to-br from-[#1c080b] via-[#100608] to-[#08080a] p-6 sm:p-8 shadow-[0_0_50px_rgba(229,30,43,0.3)]">
      {/* Dynamic background ambient glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative large milk icon in the background */}
      <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
        <Milk className="w-56 h-56 text-red-200" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Side: Notice & Details */}
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/90 border border-[#E51E2B] text-red-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E51E2B] animate-spin" />
            <span>Condição Especial Obrigatória</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-[#E51E2B] to-rose-500 rounded-2xl shadow-lg shadow-red-600/35 flex items-center justify-center shrink-0">
              <Milk className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-sports text-2xl sm:text-3xl font-black uppercase text-white tracking-wide leading-tight">
                DOAÇÃO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-red-300 underline decoration-[#E51E2B] decoration-wavy decoration-2">1 LITRO DE LEITE</span>
              </h3>
              <p className="text-red-300 text-sm font-bold flex items-center gap-1.5 mt-0.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                100% Destinado ao Asilo São Cristóvão de Laranjal Paulista
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Além da taxa de inscrição (R$ 44,90), <strong className="text-white font-bold">cada corredor ou caminhante deverá doar 1 litro de leite de caixinha (integral ou desnatado)</strong> no momento da retirada do kit ou na concentração no dia da prova (8/11 às 7:30).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-200">
            <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garante nutrição diária para os idosos acolhidos</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl">
              <MapPin className="w-4 h-4 text-[#E51E2B] shrink-0" />
              <span>Entrega física no dia 08/11 na Academia Alcateia</span>
            </div>
          </div>
        </div>

        {/* Right Side: Impact Meter Card */}
        <div className="w-full lg:w-72 shrink-0 bg-slate-950/90 border-2 border-red-600/40 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center shadow-xl">
          <span className="text-xs uppercase tracking-widest font-sports text-red-400 font-black">
            Termômetro Solidário
          </span>
          <div className="my-2 flex items-baseline justify-center gap-1">
            <span className="font-sports text-4xl sm:text-5xl font-black text-white">
              {pledgedCount}
            </span>
            <span className="text-lg font-bold text-[#E51E2B]">Litros</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Garantidos até o momento pelos atletas inscritos na matilha!
          </p>

          <div className="w-full mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span>Meta Inicial:</span>
            <span className="font-bold text-white">150 Litros 🎯</span>
          </div>

          <div className="w-full bg-slate-900 h-2.5 rounded-full mt-1.5 overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-[#E51E2B] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (pledgedCount / 150) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

