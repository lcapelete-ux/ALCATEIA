import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Posso trazer meu amigo ou amiiga mesmo que ele(a) não tenha se registrado?',
      answer: 'Sim, amigos podem acompanhar no dia do evento! Porém, pedimos que se registrem aqui para que possamos ter uma contagem precisa de participantes. O registro garante a entrega do kit exclusivo (camiseta + garrafa).',
    },
    {
      question: 'Qual é a rota e quantos quilômetros tem?',
      answer: 'O percurso é de aproximadamente 5km com ida e volta no mesmo local. É um treino livre onde cada um faz no seu ritmo - serve tanto para corrida quanto para caminhada. A rota será enviada por email para todos os inscritos.',
    },
    {
      question: 'O leite que doo vai mesmo chegar ao Asilo?',
      answer: 'Com certeza! Todo o leite arrecadado no evento será entregue ao Asilo São Cristóvão de Laranjal Paulista no mesmo dia. Você terá a transparência total do impacto que sua participação gera.',
    },
    {
      question: 'Posso fazer caminhada em vez de corrida?',
      answer: 'Absolutamente! O Treinão Solidário é para todos os níveis. Você pode caminhar, trotar ou correr. O importante é participar, movimentar-se e contribuir para a causa.',
    },
    {
      question: 'Há prêmios para os mais rápidos?',
      answer: 'Sim! Temos prêmios para: 1º, 2º e 3º lugar masculino e feminino. Também premiamos a categoria "Melhor Energia" (escolha do público) e "Maior Doação de Leite". Todos os participantes ganham o kit oficial!',
    },
    {
      question: 'Posso acessar a área de admin? Como funciona?',
      answer: 'A área de admin é exclusiva para organizadores. Se você é organizador do evento, clique no menu e procure por "Admin" (protegido). Lá você pode acompanhar registros em tempo real, estatísticas e exportar dados.',
    },
    {
      question: 'E se chover? O evento vai acontecer mesmo?',
      answer: 'O evento acontece em qualquer condição climática! Recomendamos usar roupa apropriada. Caso seja cancelado por segurança (tempestade extrema), avisos serão enviados via email com pelo menos 24h de antecedência.',
    },
    {
      question: 'Como recebo o certificado de participação?',
      answer: 'Após o evento, você receberá um email com seu certificado digital em PDF pronto para compartilhar no LinkedIn e redes sociais. É um reconhecimento oficial de sua participação e contribuição social.',
    },
  ];

  return (
    <section id="faq" className="py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-red-600/10 via-transparent to-transparent blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/50 border border-red-500/40 mb-4">
            <HelpCircle className="w-4 h-4 text-[#E51E2B]" />
            <span className="text-red-400 font-bold text-sm uppercase">Dúvidas?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">Frequentes</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Tudo que você precisa saber sobre o Treinão Solidário Alcateia
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-red-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-red-400 transition-colors flex-1">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-5 h-5 text-red-400" />
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed pt-3 border-t border-slate-700">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center p-6 rounded-2xl bg-gradient-to-r from-red-950/40 to-rose-950/40 border border-red-500/30"
        >
          <p className="text-slate-200 mb-4">
            Não encontrou sua resposta?
          </p>
          <a
            href="https://wa.me/551932"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
          >
            💬 Chat no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};
