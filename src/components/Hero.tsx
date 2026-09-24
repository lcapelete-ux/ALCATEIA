import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Flame,
  Award,
  Shirt,
  ArrowRight,
  Milk,
  Zap,
} from 'lucide-react';
import runnerWolfHero from '../assets/images/runner_wolf_hero_1790261672533.jpg';
import runnerWolfEmblem from '../assets/images/runner_wolf_emblem_1790261682882.jpg';

interface HeroProps {
  kitsRemaining: number;
  totalRegistered: number;
}

export const Hero: React.FC<HeroProps> = ({ kitsRemaining, totalRegistered }) => {
  return (
    <div className="relative pt-4 pb-14 overflow-hidden">
      {/* Background ambient red lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-red-600/20 via-rose-600/15 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Cause / Campaign Kicker */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#18080a] border border-red-500/40 text-xs shadow-[0_0_20px_rgba(229,30,43,0.2)]">
          <span className="flex items-center gap-1.5 text-red-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#E51E2B] animate-ping" />
            Corrida da Alcateia 2026
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400 font-bold">
            💙 Novembro Azul
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-200 font-medium">
            Em prol do Asilo São Cristóvão 🤝
          </span>
        </div>

        {/* Main Athletic Headline with Kinetic Red Glow */}
        <div className="space-y-2 pt-2">
          <h1 className="font-sports text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none">
            Treinão Solidário <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white drop-shadow-[0_0_35px_rgba(229,30,43,0.5)]">
              Alcateia Run
            </span>
          </h1>
          <p className="font-sports text-lg sm:text-2xl font-bold uppercase text-red-300 tracking-wider">
            Treino Livre — Cada participante faz no seu ritmo!
          </p>
        </div>

        {/* Cinematic Photo Showcase: Corredor e Lobo */}
        <div className="relative mx-auto max-w-3xl rounded-3xl overflow-hidden border border-red-500/40 shadow-[0_0_50px_rgba(229,30,43,0.35)] group bg-black/60 my-6">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={runnerWolfHero}
              alt="Corredor ao lado do lobo - Corrida da Alcateia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient vignettes for seamless integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

            {/* Athletic badge overlay */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E51E2B] text-white font-sports text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-red-600/50 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Espírito de Alcateia</span>
              </span>
              <span className="text-xs sm:text-sm text-slate-200 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                A força e união da matilha nas ruas · 08 de Novembro
              </span>
            </div>
          </div>
        </div>

        {/* Event Key Data Badge Bar */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Calendar className="w-4 h-4 text-[#E51E2B]" />
            <span><strong>Data:</strong> 8 de Novembro (8/11)</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <Clock className="w-4 h-4 text-[#E51E2B]" />
            <span><strong>Horário:</strong> 07:30 da manhã</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <MapPin className="w-4 h-4 text-[#E51E2B]" />
            <span>Academia Alcateia · Laranjal Paulista</span>
          </div>
        </div>

        {/* Full Address Banner */}
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          📍 Rua Ciríaco Ferreira do Amaral, 1700 — Laranjal Paulista / SP (Ponto de encontro e largada)
        </p>

        {/* Big CTA and Kit Counter Box */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#inscricao"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-[#E51E2B] to-rose-600 text-white font-sports font-black text-lg uppercase tracking-wider hover:brightness-110 active:scale-95 shadow-xl shadow-red-600/35 flex items-center justify-center gap-3 cursor-pointer transition-all duration-200"
          >
            <span>QUERO ME INSCREVER — R$ 44,90</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#detalhes"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-red-500 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Ver Regulamento & Premiação</span>
          </a>
        </div>

        {/* 3 Pillars Summary Cards */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          {/* Card 1: 150 primeiros kits */}
          <div className="p-4 rounded-2xl bg-slate-900/85 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-sports text-red-400 font-bold">
                150 Primeiros
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                Camisa + Medalha
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Restam <strong className="text-red-400">{kitsRemaining} vagas</strong> com kit garantido!
              </p>
            </div>
          </div>

          {/* Card 2: 1 Litro de Leite */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#20080a] to-slate-900 border-2 border-[#E51E2B]/80 flex items-start gap-3 shadow-md shadow-red-600/15">
            <div className="p-2.5 rounded-xl bg-[#E51E2B] text-white font-bold shrink-0">
              <Milk className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-sports text-red-300 font-black">
                Doação Obrigatória
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                1 Litro de Leite 🥛
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Entregar no dia da prova para o Asilo São Cristóvão.
              </p>
            </div>
          </div>

          {/* Card 3: Premiação Geral */}
          <div className="p-4 rounded-2xl bg-slate-900/85 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-sports text-amber-400 font-bold">
                Premiação Geral
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                Troféus 1º, 2º e 3º Lugar
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Para as categorias Feminino e Masculino 🏆
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

