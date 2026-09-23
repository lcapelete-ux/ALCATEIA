import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Calendar,
  MapPin,
  Users,
  Phone,
  CreditCard,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Milk,
  Shirt,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Printer,
  Flame,
} from 'lucide-react';
import { Gender, ShirtSize, Modality, RegistrationFormData, Participant, PaymentMethod } from '../types';
import { StorageService } from '../services/storage';

interface RegistrationSectionProps {
  onRegistrationSuccess: (participant: Participant) => void;
  kitsRemaining: number;
  totalRegistered: number;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  onRegistrationSuccess,
  kitsRemaining,
  totalRegistered,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    gender: 'Feminino',
    birthDate: '',
    city: 'Laranjal Paulista',
    state: 'SP',
    team: '',
    phone: '',
    cpf: '',
    shirtSize: 'M',
    modality: 'Corrida Livre 5km',
    milkDonationAgreed: true,
    paymentMethod: 'PIX',
  });

  const [step, setStep] = useState<'form' | 'payment' | 'voucher'>('form');
  const [registeredAthlete, setRegisteredAthlete] = useState<Participant | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pixKey = 'treinao.alcateia.laranjal@pix.com.br';
  const price = 44.90;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Por favor, informe seu Nome Completo.');
      return false;
    }
    if (!formData.birthDate) {
      setErrorMessage('Por favor, informe sua Data de Nascimento.');
      return false;
    }
    if (!formData.city.trim()) {
      setErrorMessage('Por favor, informe sua Cidade.');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Por favor, informe seu Telefone / WhatsApp.');
      return false;
    }
    if (!formData.milkDonationAgreed) {
      setErrorMessage('Você deve concordar em doar 1 Litro de Leite para o Asilo São Cristóvão.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep('payment');
  };

  const handleConfirmPaymentAndRegister = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const participant = StorageService.addParticipant(formData);
        setRegisteredAthlete(participant);
        onRegistrationSuccess(participant);
        setStep('voucher');

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E51E2B', '#FFFFFF', '#111111', '#FF334B'],
        });
      } catch (err) {
        setErrorMessage('Erro ao processar inscrição. Tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    }, 900);
  };

  const copyPixToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      gender: 'Feminino',
      birthDate: '',
      city: 'Laranjal Paulista',
      state: 'SP',
      team: '',
      phone: '',
      cpf: '',
      shirtSize: 'M',
      modality: 'Corrida Livre 5km',
      milkDonationAgreed: true,
      paymentMethod: 'PIX',
    });
    setRegisteredAthlete(null);
    setStep('form');
  };

  return (
    <section id="inscricao" className="scroll-mt-20">
      <div className="relative max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border-2 border-[#E51E2B]/50 p-6 sm:p-10 shadow-[0_0_60px_rgba(229,30,43,0.25)] overflow-hidden">
        {/* Ambient Top Red Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-red-600/25 to-transparent blur-2xl pointer-events-none" />

        {/* Step Indicator */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider font-sports">
              <Sparkles className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>Inscrição Oficial</span>
            </div>
            <h2 className="font-sports text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
              Garanta sua Vaga na Matilha
            </h2>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Valor da Inscrição</div>
            <div className="font-sports text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">
              R$ 44,90
            </div>
          </div>
        </div>

        {/* Kits remaining ticker */}
        <div className="mb-6 p-3.5 rounded-xl bg-[#1a0709] border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-200">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E51E2B] animate-ping shrink-0" />
            <span>
              {kitsRemaining > 0 ? (
                <>
                  Restam apenas <strong className="text-red-400 font-bold">{kitsRemaining} vagas</strong> com <strong className="text-white">Camiseta Oficial + Medalha</strong> inclusas!
                </>
              ) : (
                <span className="text-amber-300 font-semibold">
                  150 Primeiros kits esgotados! Novas inscrições participam da prova e premiação geral.
                </span>
              )}
            </span>
          </div>

          <span className="font-sports font-bold text-red-400 shrink-0 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
            {totalRegistered} Inscritos confirmados
          </span>
        </div>

        {/* STEP 1: REGISTRATION FORM */}
        {step === 'form' && (
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Nome e Sexo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Nome Completo *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Ex: Carlos Eduardo de Oliveira"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Sexo *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
                >
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            {/* Row 2: Data de Nascimento, CPF, Telefone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Data de Nascimento *</span>
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  CPF *
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>WhatsApp / Telefone *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(15) 99999-9999"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Cidade, Estado, Equipe */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Cidade *</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Laranjal Paulista, Tietê, Cerquilho..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Equipe / Assessoria</span>
                </label>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  placeholder="Ou deixe 'Individual'"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            {/* Row 4: Modalidade & Tamanho da Camiseta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Modalidade do Treino Livre *</span>
                </label>
                <select
                  name="modality"
                  value={formData.modality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
                >
                  <option value="Corrida Livre 5km">Corrida Livre 5km</option>
                  <option value="Corrida Livre 8km">Corrida Livre 8km</option>
                  <option value="Caminhada Solidária 3km">Caminhada Solidária 3km</option>
                </select>
                <p className="text-[11px] text-slate-400">Cada atleta corre ou caminha no seu ritmo!</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Tamanho da Camiseta Oficial *</span>
                </label>
                <select
                  name="shirtSize"
                  value={formData.shirtSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
                >
                  <option value="Baby Look P">Baby Look P (Feminina)</option>
                  <option value="Baby Look M">Baby Look M (Feminina)</option>
                  <option value="Baby Look G">Baby Look G (Feminina)</option>
                  <option value="P">P Unissex</option>
                  <option value="M">M Unissex</option>
                  <option value="G">G Unissex</option>
                  <option value="GG">GG Unissex</option>
                  <option value="XG">XG Unissex</option>
                </select>
                <p className="text-[11px] text-slate-400">Modelagem esportiva dry-fit alta performance</p>
              </div>
            </div>

            {/* OBRIGATÓRIO: 1 LITRO DE LEITE - EM ALTA EVIDÊNCIA */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/90 via-slate-900 to-red-950/90 border-2 border-[#E51E2B] shadow-[0_0_30px_rgba(229,30,43,0.3)] space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="milkDonationAgreed"
                  checked={formData.milkDonationAgreed}
                  onChange={handleCheckboxChange}
                  className="mt-1 w-5 h-5 rounded border-red-500 text-red-600 focus:ring-red-500 accent-[#E51E2B] cursor-pointer"
                />
                <div className="text-xs sm:text-sm">
                  <span className="font-sports font-black uppercase text-white flex items-center gap-1.5 text-sm sm:text-base">
                    <Milk className="w-5 h-5 text-[#E51E2B] animate-pulse" />
                    COMPROMISSO SOLIDÁRIO: 1 LITRO DE LEITE OBRIGATÓRIO 🥛
                  </span>
                  <p className="text-slate-300 mt-1 text-xs leading-relaxed">
                    Estou ciente e concordo em <strong className="text-red-300 font-bold">levar 1 litro de leite de caixinha</strong> no dia do evento (08/11 às 7:30 na Academia Alcateia), que será 100% repassado para o <strong className="text-white">Asilo São Cristóvão de Laranjal Paulista</strong>.
                  </p>
                </div>
              </label>
            </div>

            {/* Form Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-[#E51E2B] to-rose-600 text-white font-sports font-black text-lg uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all duration-200 shadow-xl shadow-red-600/35 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continuar para Pagamento (R$ 44,90)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT SIMULATION (PIX & CARTÃO) */}
        {step === 'payment' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Atleta:</span>
                <p className="text-white font-bold text-sm">{formData.fullName}</p>
                <p className="text-red-400">{formData.modality} · Camiseta {formData.shirtSize}</p>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Total a pagar:</span>
                <p className="font-sports text-xl font-black text-white">R$ 44,90</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'PIX' }))}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  formData.paymentMethod === 'PIX'
                    ? 'border-[#E51E2B] bg-red-950/40 text-red-300 shadow-[0_0_15px_rgba(229,30,43,0.3)]'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <QrCode className="w-6 h-6 text-[#E51E2B]" />
                <span>PIX (Instantâneo)</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'Cartão' }))}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  formData.paymentMethod === 'Cartão'
                    ? 'border-[#E51E2B] bg-red-950/40 text-red-300 shadow-[0_0_15px_rgba(229,30,43,0.3)]'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-6 h-6 text-[#E51E2B]" />
                <span>Cartão de Crédito / Débito</span>
              </button>
            </div>

            {/* PIX Details */}
            {formData.paymentMethod === 'PIX' && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-2xl bg-white text-slate-950 inline-block shadow-lg">
                  <svg className="w-40 h-40" viewBox="0 0 160 160">
                    <rect width="160" height="160" fill="white" />
                    <rect x="20" y="20" width="40" height="40" fill="black" />
                    <rect x="28" y="28" width="24" height="24" fill="white" />
                    <rect x="34" y="34" width="12" height="12" fill="#E51E2B" />
                    <rect x="100" y="20" width="40" height="40" fill="black" />
                    <rect x="108" y="28" width="24" height="24" fill="white" />
                    <rect x="114" y="34" width="12" height="12" fill="#E51E2B" />
                    <rect x="20" y="100" width="40" height="40" fill="black" />
                    <rect x="28" y="108" width="24" height="24" fill="white" />
                    <rect x="34" y="114" width="12" height="12" fill="#E51E2B" />
                    <rect x="70" y="30" width="15" height="15" fill="black" />
                    <rect x="75" y="65" width="20" height="20" fill="#E51E2B" />
                    <rect x="100" y="100" width="20" height="20" fill="black" />
                    <rect x="125" y="115" width="15" height="25" fill="black" />
                    <rect x="70" y="100" width="15" height="30" fill="black" />
                  </svg>
                </div>

                <div className="space-y-1.5 w-full max-w-md">
                  <span className="text-xs text-slate-400">Copie a chave PIX:</span>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
                    <span className="truncate">{pixKey}</span>
                    <button
                      type="button"
                      onClick={copyPixToClipboard}
                      className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPix ? 'Copiado!' : 'Copiar Chave'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Chave PIX: Academia Alcateia / Corrida da Alcateia 2026
                  </p>
                </div>
              </div>
            )}

            {/* Cartão Details */}
            {formData.paymentMethod === 'Cartão' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8892"
                    defaultValue="4532 8900 1234 5678"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      defaultValue="11/28"
                      className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      defaultValue="782"
                      className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Reminder of 1L milk before confirmation */}
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2.5">
              <Milk className="w-5 h-5 text-[#E51E2B] shrink-0" />
              <span>
                Lembrete Amigo: <strong>No dia 8/11</strong>, traga <strong>1 Litro de Leite</strong> para o Asilo São Cristóvão!
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleConfirmPaymentAndRegister}
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-[#E51E2B] to-rose-600 text-white font-sports font-black text-base uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processando Inscrição...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirmar Pagamento e Inscrição (R$ 44,90)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OFFICIAL VOUCHER & CONFIRMATION */}
        {step === 'voucher' && registeredAthlete && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-red-600/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="font-sports text-xs font-bold text-red-400 uppercase tracking-wider">
                Inscrição Concluída com Sucesso!
              </span>
              <h3 className="font-sports text-3xl font-black uppercase text-white tracking-tight mt-1">
                Bem-vindo à Matilha, {registeredAthlete.fullName.split(' ')[0]}!
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
                Seu lugar na Corrida da Alcateia está garantido. Guarde seu comprovante abaixo para apresentar na retirada do kit.
              </p>
            </div>

            {/* Official Athlete Ticket Card */}
            <div className="text-left p-6 rounded-2xl bg-gradient-to-b from-[#18080a] to-[#0d0405] border-2 border-[#E51E2B] shadow-[0_0_35px_rgba(229,30,43,0.3)] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-red-900/50 pb-4 mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-950 border border-red-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(229,30,43,0.5)] shrink-0">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-sports font-bold text-red-400">
                      CORRIDA DA ALCATEIA 2026 — NOVEMBRO AZUL
                    </div>
                    <div className="text-xs text-slate-400">
                      08/11/2024 às 07:30 · Academia Alcateia (Laranjal Paulista/SP)
                    </div>
                  </div>
                </div>

                <div className="inline-block px-3.5 py-1 rounded-xl bg-red-950 border border-[#E51E2B] text-white font-sports font-black text-lg self-start sm:self-auto shadow-md shadow-red-600/30">
                  BIB #{String(registeredAthlete.bibNumber).padStart(3, '0')}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Atleta</span>
                  <strong className="text-white text-sm">{registeredAthlete.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Modalidade</span>
                  <strong className="text-red-400 text-sm">{registeredAthlete.modality}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Camiseta</span>
                  <strong className="text-white text-sm">{registeredAthlete.shirtSize}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Equipe</span>
                  <strong className="text-white text-sm">{registeredAthlete.team || 'Individual'}</strong>
                </div>
              </div>

              {/* Kit & Milk status */}
              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-[#E51E2B] shrink-0" />
                  <span>
                    Kit Oficial (Camisa + Medalha):{' '}
                    <strong className={registeredAthlete.isKitEligible ? 'text-emerald-400' : 'text-slate-400'}>
                      {registeredAthlete.isKitEligible ? 'GARANTIDO (150 primeiros)' : 'Lista Geral'}
                    </strong>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-red-950/70 border border-[#E51E2B]/50 flex items-center gap-2">
                  <Milk className="w-4 h-4 text-[#E51E2B] shrink-0" />
                  <span className="text-red-200">
                    1 Litro de Leite para o Asilo: <strong className="text-white underline">Entregar no dia 8/11</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4 text-[#E51E2B]" />
                <span>Imprimir / Salvar PDF</span>
              </button>

              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold cursor-pointer transition-colors"
              >
                Fazer Outra Inscrição
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
