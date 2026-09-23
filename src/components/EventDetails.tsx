import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Shirt,
  Award,
  Zap,
  HeartHandshake,
  CheckCircle2,
  Users,
  Navigation,
} from 'lucide-react';

export const EventDetails: React.FC = () => {
  return (
    <section id="detalhes" className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-[#E51E2B]" />
          <span>Informações Oficiais da Prova</span>
        </div>
        <h2 className="font-sports text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
          Uma Manhã de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">Superação & Solidariedade</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          O Treinão Solidário Alcateia une o movimento do Novembro Azul à prática esportiva consciente e ao acolhimento dos idosos do Asilo São Cristóvão de Laranjal Paulista.
        </p>
      </div>

      {/* Grid of Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Data & Horário */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 hover:border-red-600/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-500/30 flex items-center justify-center text-[#E51E2B] mb-4 group-hover:scale-105 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-sports text-red-400 font-bold">Quando</span>
          <h3 className="text-xl font-sports font-bold text-white uppercase mt-1">
            08 de Novembro (Sexta-feira)
          </h3>
          <div className="mt-2 flex items-center gap-2 text-slate-300 text-sm">
            <Clock className="w-4 h-4 text-[#E51E2B]" />
            <span>Concentração: <strong>07h00</strong> | Largada: <strong>07h30</strong></span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Chegue com antecedência para o aquecimento coletivo e entrega do litro de leite na recepção!
          </p>
        </div>

        {/* Card 2: Local & Ponto de Apoio */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 hover:border-red-600/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-500/30 flex items-center justify-center text-[#E51E2B] mb-4 group-hover:scale-105 transition-transform">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-sports text-red-400 font-bold">Onde</span>
          <h3 className="text-xl font-sports font-bold text-white uppercase mt-1">
            Academia Alcateia
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            Rua Ciríaco Ferreira do Amaral, 1700
          </p>
          <p className="text-xs text-red-300 font-medium mt-0.5">
            Laranjal Paulista — SP
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Ciriaco+Ferreira+do+Amaral+1700+Laranjal+Paulista+SP"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-white font-semibold"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Ver no Google Maps</span>
            </a>
          </div>
        </div>

        {/* Card 3: Treino Livre */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 hover:border-red-600/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-500/30 flex items-center justify-center text-[#E51E2B] mb-4 group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-sports text-red-400 font-bold">Ritmo Livre</span>
          <h3 className="text-xl font-sports font-bold text-white uppercase mt-1">
            Cada um no seu ritmo!
          </h3>
          <p className="text-slate-300 text-sm mt-2">
            Perfeito para todos os perfis: desde quem está iniciando com caminhada até os corredores que buscam bater RP.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
            <span className="bg-slate-950 text-red-300 border border-red-900/40 px-2.5 py-0.5 rounded">Caminhada 3km</span>
            <span className="bg-slate-950 text-red-300 border border-red-900/40 px-2.5 py-0.5 rounded">Corrida 5km</span>
            <span className="bg-slate-950 text-red-300 border border-red-900/40 px-2.5 py-0.5 rounded">Corrida 8km</span>
          </div>
        </div>

        {/* Card 4: Kit Oficial 150 Primeiros */}
        <div className="rounded-2xl bg-gradient-to-b from-[#24080b] to-[#120608] border-2 border-[#E51E2B]/70 p-5 group shadow-lg shadow-red-600/15">
          <div className="w-12 h-12 rounded-xl bg-[#E51E2B]/20 border border-[#E51E2B] flex items-center justify-center text-white mb-4">
            <Shirt className="w-6 h-6 text-[#E51E2B]" />
          </div>
          <span className="text-xs uppercase tracking-wider font-sports text-red-400 font-bold">Exclusividade</span>
          <h3 className="text-xl font-sports font-bold text-white uppercase mt-1">
            Camiseta + Medalha
          </h3>
          <p className="text-slate-200 text-sm mt-2">
            Garantido para os <strong className="text-red-400 font-bold">150 primeiros inscritos confirmados</strong>.
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>Camiseta esportiva dry-fit oficial Alcateia</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>Medalha finisher personalizada em metal</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>Número de peito personalizado</span>
            </li>
          </ul>
        </div>

        {/* Card 5: Premiação Geral */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 hover:border-red-600/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-sports text-amber-400 font-bold">Pódio Geral</span>
          <h3 className="text-xl font-sports font-bold text-white uppercase mt-1">
            Premiação com Troféus
          </h3>
          <div className="mt-3 space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="font-sports font-bold text-rose-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Categoria Feminina
              </span>
              <span className="text-slate-300 font-medium">🥇 1º, 🥈 2º e 🥉 3º Lugar</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="font-sports font-bold text-red-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Categoria Masculina
              </span>
              <span className="text-slate-300 font-medium">🥇 1º, 🥈 2º e 🥉 3º Lugar</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Cronometragem e apuração com entrega de troféus especiais ao final do evento.
          </p>
        </div>

        {/* Card 6: Causa & Solidariedade */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 hover:border-red-600/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-sports text-rose-400 font-bold">Causa Nobre</span>
          <h3 className="text-xl font-sports font-bold text-white uppercase mt-1">
            Asilo São Cristóvão
          </h3>
          <p className="text-slate-300 text-sm mt-2">
            Instituição tradicional e respeitada que acolhe dezenas de idosos em nossa cidade.
          </p>
          <div className="mt-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <p>
              💙 <strong className="text-white">Corra, participe e ajude!</strong> Uma manhã de atividade física, solidariedade e cuidado com quem mais precisa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
