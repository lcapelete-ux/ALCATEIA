import React, { useState } from 'react';
import { X, Cloud, Terminal, CheckCircle2, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';

interface NetlifyDeployGuideModalProps {
  onClose: () => void;
}

export const NetlifyDeployGuideModal: React.FC<NetlifyDeployGuideModalProps> = ({ onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyText = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-3xl bg-slate-900 border-2 border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-400">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sports text-xl sm:text-2xl font-black uppercase text-white">
                Como Publicar este Site no Netlify
              </h3>
              <p className="text-xs text-slate-400">
                100% compatível, gratuito e pronto para o ar em 2 minutos!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
          ✅ O projeto já conta com o arquivo de redirecionamento <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-300 font-mono">public/_redirects</code> configurado para Netlify SPA. As inscrições e o banco de dados funcionam nativamente no navegador com exportação direta para Excel (.xlsx) e PDF!
        </div>

        {/* Step-by-Step */}
        <div className="space-y-4 text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-sports font-bold text-white uppercase text-sm">
                Opção A: Publicação Via Git (GitHub / GitLab) — Recomendado
              </span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
              <li>Envie o código para o seu repositório no <strong>GitHub</strong>.</li>
              <li>Acesse <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">app.netlify.com</a> e clique em <strong>"Add new site" &gt; "Import an existing project"</strong>.</li>
              <li>Selecione seu repositório. O Netlify detectará automaticamente as configurações:</li>
            </ol>

            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 font-mono text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Build command:</span>
                <span className="text-emerald-400 font-bold">npm run build</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Publish directory:</span>
                <span className="text-emerald-400 font-bold">dist</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-sports font-bold text-white uppercase text-sm">
              Opção B: Deploy Manual "Arraste e Solte" (Drop)
            </span>
            <p className="text-slate-300">
              Você pode rodar localmente no terminal:
            </p>
            <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300">
              <code>npm run build</code>
              <button
                onClick={() => copyText('npm run build', 2)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedStep === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              Depois, basta arrastar a pasta gerada <code className="text-white">dist/</code> diretamente na tela de <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-cyan-400 underline">netlify.com/drop</a>!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-sports font-black text-xs uppercase tracking-wider cursor-pointer"
          >
            Entendido, Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
