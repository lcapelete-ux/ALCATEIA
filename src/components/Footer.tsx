import React from 'react';
import { Heart, MapPin, Milk, Lock, Cloud, Flame } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenNetlifyGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenNetlifyGuide }) => {
  return (
    <footer className="mt-20 border-t border-red-900/30 bg-[#060608] pt-14 pb-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-950 border border-red-500/70 flex items-center justify-center shadow-md shadow-red-950 shrink-0">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-sports font-black italic uppercase text-[10px] tracking-[0.18em] text-[#B8CADC] leading-none">
                  CORRIDA DA
                </span>
                <span className="font-sports font-black italic uppercase text-xl tracking-tight text-white leading-none my-0.5">
                  ALCATEIA
                </span>
                <span className="font-sports font-bold text-[10px] tracking-wider text-[#E51E2B] leading-none">
                  2026 · 8 DE NOVEMBRO
                </span>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Uma manhã esportiva para celebrar a vida, promover a saúde preventiva do homem e apoiar com carinho e dignidade os idosos do <strong className="text-white">Asilo São Cristóvão de Laranjal Paulista</strong>.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-red-400">
                <Milk className="w-4 h-4 text-[#E51E2B]" />
                <span>Doação: 1 Litro de Leite</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>100% Solidário</span>
              </div>
            </div>
          </div>

          {/* Col 2: Local e Horário */}
          <div className="space-y-3">
            <h5 className="font-sports text-xs uppercase tracking-wider font-bold text-white">
              Endereço do Evento
            </h5>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E51E2B] shrink-0 mt-0.5" />
                <span>
                  Academia Alcateia<br />
                  Rua Ciríaco Ferreira do Amaral, 1700<br />
                  Laranjal Paulista — SP
                </span>
              </div>
              <p className="text-red-400 font-semibold pt-1">
                Data: 08/11/2024 às 07:30
              </p>
            </div>
          </div>

          {/* Col 3: Links Rápidos & Admin */}
          <div className="space-y-3">
            <h5 className="font-sports text-xs uppercase tracking-wider font-bold text-white">
              Organização & Gestão
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-red-400 hover:text-white font-semibold cursor-pointer transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Área Restrita do Admin (Excel/PDF)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenNetlifyGuide}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <Cloud className="w-3.5 h-3.5 text-red-400" />
                  <span>Instruções de Deploy no Netlify</span>
                </button>
              </li>
              <li>
                <a
                  href="#detalhes"
                  className="hover:text-white transition-colors"
                >
                  Regulamento e Premiação
                </a>
              </li>
              <li>
                <a
                  href="#inscricao"
                  className="hover:text-white transition-colors"
                >
                  Formulário de Inscrição (R$ 44,90)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Academia Alcateia. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com carinho para o</span>
            <span className="text-red-400 font-bold">Asilo São Cristóvão</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
