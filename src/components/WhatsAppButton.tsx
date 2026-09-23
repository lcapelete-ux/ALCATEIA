import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '5519987654321',
  message = 'Olá! Gostaria de saber mais sobre o Treinão Solidário Alcateia 2026',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/20 z-30 sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Float Button Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      >
        {/* Message Options (Mobile - Expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs"
            >
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                Escolha um assunto:
              </h3>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => {
                    const msg = encodeURIComponent('Olá! Tenho dúvidas sobre como me registrar no evento');
                    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
                    setIsExpanded(false);
                  }}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded text-slate-700 transition"
                >
                  ❓ Dúvidas sobre o evento
                </button>
                <button
                  onClick={() => {
                    const msg = encodeURIComponent('Gostaria de me registrar no Treinão Solidário Alcateia');
                    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
                    setIsExpanded(false);
                  }}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded text-slate-700 transition"
                >
                  📝 Quero me registrar
                </button>
                <button
                  onClick={() => {
                    const msg = encodeURIComponent('Sou fornecedor/patrocinador. Como posso ajudar?');
                    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
                    setIsExpanded(false);
                  }}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded text-slate-700 transition"
                >
                  🤝 Patrocinador/Fornecedor
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all font-bold text-sm sm:text-base"
        >
          {isExpanded ? (
            <>
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">Fechar</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Chat WhatsApp</span>
              {/* Pulse animation for attention */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="sm:hidden absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              />
            </>
          )}
        </motion.button>

        {/* Desktop Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:block bg-slate-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap border border-slate-700"
        >
          Clique para falar conosco via WhatsApp
        </motion.div>
      </motion.div>
    </>
  );
};
