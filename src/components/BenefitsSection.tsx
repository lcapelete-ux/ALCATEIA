import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Award, Zap } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: 'Impacto Social',
      description: 'Cada participante ajuda a alimentar idosos do Asilo São Cristóvão',
      color: 'from-red-500 to-rose-400',
    },
    {
      icon: Zap,
      title: 'Saúde & Bem-estar',
      description: 'Treino completo com aquecimento, corrida livre e alongamento',
      color: 'from-amber-500 to-orange-400',
    },
    {
      icon: Award,
      title: 'Kit Exclusivo',
      description: 'Camiseta oficial + garrafinha reutilizável Alcateia Run',
      color: 'from-cyan-500 to-blue-400',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Conecte-se com atletas e pessoas que compartilham seus valores',
      color: 'from-purple-500 to-pink-400',
    },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-red-600/10 via-transparent to-transparent blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-4">
            Por Que Se <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">Registrar?</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Mais que uma corrida. Uma missão de impacto social, saúde e comunidade.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="h-full rounded-2xl bg-slate-900/60 border border-slate-800 p-6 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,30,43,0.3)]">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Accent line */}
                  <div className={`w-0 h-1 bg-gradient-to-r ${benefit.color} mt-4 group-hover:w-full transition-all duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-300 mb-4">
            Limitado a 150 participantes. Garanta seu lugar agora!
          </p>
          <a
            href="#registro"
            className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold uppercase rounded-lg hover:shadow-[0_0_30px_rgba(229,30,43,0.6)] transition-all duration-300 hover:scale-105"
          >
            Registre-se Agora
          </a>
        </motion.div>
      </div>
    </section>
  );
};
