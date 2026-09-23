import React from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, Heart } from 'lucide-react';

interface SocialProofSectionProps {
  totalRegistered: number;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ totalRegistered }) => {
  return (
    <section className="py-8 px-4 bg-gradient-to-r from-slate-900/60 to-slate-800/60 border-y border-slate-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Registered Count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-red-400" />
              <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
                Já confirmaram
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-red-500 via-rose-400 to-white bg-clip-text text-transparent"
            >
              {totalRegistered}
            </motion.div>
            <p className="text-slate-400 text-sm mt-2">
              participantes confirmados
            </p>
          </motion.div>

          {/* Spots Remaining */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Vagas disponíveis
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-black text-amber-400"
            >
              {Math.max(0, 150 - totalRegistered)}
            </motion.div>
            <p className="text-slate-400 text-sm mt-2">
              de 150 (máx)
            </p>
          </motion.div>

          {/* Social Impact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">
                Impacto social
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-black text-rose-400"
            >
              +{totalRegistered * 1}L
            </motion.div>
            <p className="text-slate-400 text-sm mt-2">
              de leite para o Asilo
            </p>
          </motion.div>
        </div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-300 text-sm">
            🐺 <span className="font-bold">Junte-se à Alcateia!</span> Pessoas como você estão fazendo a diferença.
            {totalRegistered > 0 && (
              <span> {totalRegistered > 50 ? '✨ Momentum crescente!' : ''}</span>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
