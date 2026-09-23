import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, FastForward, Milk, Sparkles } from 'lucide-react';

interface WolfIntroProps {
  onComplete: () => void;
}

export const WolfIntro: React.FC<WolfIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Progress timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.25;
      });
    }, 45);

    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => setPhase(3), 2400);
    const t3 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] overflow-hidden select-none"
    >
      {/* Background dynamic athletic red glow and wallpaper */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a0709]/70 via-[#0a0a0c] to-[#040406]" />

      {/* Red Wolf Wallpaper overlay in intro */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-110 pointer-events-none"
        style={{
          backgroundImage: `url('/src/assets/images/alcateia_wolf_red_bg_1790204141975.jpg')`,
        }}
      />

      {/* Red Speed grid lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="intro-grid-red" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E51E2B" strokeWidth="0.5" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intro-grid-red)" />
        </svg>
      </div>

      {/* Animated Wolf & Runner Sprinting with Red Blades */}
      <div className="relative w-full max-w-4xl h-48 flex items-center justify-center overflow-hidden">
        {/* Neon Red Speed Trail */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '120%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute h-1.5 w-96 bg-gradient-to-r from-transparent via-[#E51E2B] to-rose-400 blur-[1px]"
          style={{ top: '65%' }}
        />

        {/* The Running Wolf & Runner Emblem Animation */}
        <motion.div
          initial={{ x: -260, scale: 0.85 }}
          animate={{ x: [-200, 0, 30], scale: [0.85, 1.08, 1] }}
          transition={{ duration: 2.8, ease: 'easeOut' }}
          className="relative flex items-center gap-4 z-10"
        >
          {/* Official Animated Logo Graphic */}
          <div className="relative">
            {/* Crimson red ambient halo */}
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.15, 0.95] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute -inset-4 bg-red-600/30 blur-2xl rounded-full"
            />

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 via-[#E51E2B] to-red-950 border-2 border-red-400/80 flex items-center justify-center shadow-[0_0_40px_rgba(229,30,43,0.7)]">
              <Flame className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>

          {/* Running Wolf Banner Pull Text */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sports text-xs tracking-widest uppercase font-black text-white bg-[#E51E2B] px-2.5 py-0.5 rounded shadow-md shadow-red-600/30">
                CORRIDA DA ALCATEIA
              </span>
              <span className="flex items-center gap-1 text-xs text-red-400 font-bold">
                <Flame className="w-3.5 h-3.5 text-[#E51E2B] animate-bounce" />
                2026
              </span>
            </div>
            <h2 className="font-sports text-2xl md:text-3xl font-black tracking-tight text-white uppercase mt-1">
              A Força da Matilha
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Main Typography Sequence */}
      <div className="relative text-center px-4 max-w-2xl mt-4 z-20">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#E51E2B] animate-ping" />
                Edição Oficial Alcateia 2026
              </div>
              <h1 className="font-sports text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none drop-shadow-[0_0_25px_rgba(229,30,43,0.5)]">
                Treinão Solidário <span className="text-[#E51E2B]">Alcateia</span>
              </h1>
              <p className="text-red-300 font-semibold tracking-wide text-sm md:text-base">
                💙 NOVEMBRO AZUL — EM PROL DO ASILO SÃO CRISTÓVÃO 🤝
              </p>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="p-3 bg-gradient-to-r from-red-950/90 via-slate-900 to-red-950/90 border-2 border-[#E51E2B] rounded-xl shadow-[0_0_35px_rgba(229,30,43,0.4)]">
                <div className="flex items-center justify-center gap-2 text-white font-bold text-base md:text-lg uppercase font-sports">
                  <Milk className="w-6 h-6 text-white bg-[#E51E2B] p-1 rounded animate-bounce" />
                  <span>DOAÇÃO OBRIGATÓRIA: 1 LITRO DE LEITE 🥛</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Destinado 100% ao cuidado com os idosos do <strong className="text-white">Asilo São Cristóvão de Laranjal Paulista</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-200">
                <span className="bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded">
                  📅 8 de Novembro às 7:30
                </span>
                <span className="bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded">
                  🎽 Camisa + Medalha (150 primeiros)
                </span>
                <span className="bg-slate-900/90 border border-red-500/50 px-2.5 py-1 rounded text-[#E51E2B] font-bold">
                  Valor: R$ 44,90
                </span>
              </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="flex flex-col items-center justify-center">
                <span className="font-sports font-black italic uppercase text-xs tracking-[0.2em] text-[#B8CADC]">
                  CORRIDA DA
                </span>
                <span className="font-sports font-black italic uppercase text-4xl text-white tracking-tight my-0.5">
                  ALCATEIA
                </span>
                <span className="font-sports font-black italic text-base text-[#E51E2B] tracking-wider">
                  2026
                </span>
              </div>
              <p className="text-slate-300 text-sm">
                Rua Ciríaco Ferreira do Amaral, 1700 — Laranjal Paulista / SP
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bar: Progress & Skip Button */}
      <div className="absolute bottom-8 left-0 right-0 max-w-md mx-auto px-6 flex flex-col items-center gap-3 z-30">
        {/* Progress line */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden border border-slate-700">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-white"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 font-sports text-[#E51E2B]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E51E2B]" />
            Carregando matilha...
          </span>

          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-red-500 transition-colors font-medium text-xs cursor-pointer group"
          >
            <span>Pular introdução</span>
            <FastForward className="w-3.5 h-3.5 text-[#E51E2B] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

