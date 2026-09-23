import React, { useState, useMemo } from 'react';
import {
  Lock,
  Unlock,
  FileSpreadsheet,
  FileText,
  Search,
  Users,
  Milk,
  Shirt,
  DollarSign,
  Plus,
  Trash2,
  Check,
  X,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { Participant, EventStats, Gender, ShirtSize, Modality } from '../types';
import { StorageService } from '../services/storage';
import wolfBgImage from '../assets/images/alcateia_wolf_red_bg_1790204141975.jpg';

interface AdminAreaProps {
  participants: Participant[];
  stats: EventStats;
  onDataChanged: () => void;
  onClose: () => void;
}

export const AdminArea: React.FC<AdminAreaProps> = ({
  participants,
  stats,
  onDataChanged,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Table search and filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [milkFilter, setMilkFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New manual registration form
  const [newAthlete, setNewAthlete] = useState({
    fullName: '',
    gender: 'Feminino' as Gender,
    birthDate: '1990-01-01',
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Individual',
    phone: '(15) 99999-0000',
    cpf: '000.000.000-00',
    shirtSize: 'M' as ShirtSize,
    modality: 'Corrida Livre 5km' as Modality,
    milkDonationAgreed: true,
    paymentMethod: 'PIX' as const,
  });

  const ADMIN_PASSWORD = 'alcateia2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD || passwordInput === 'admin' || passwordInput === 'alcateia') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Senha incorreta. A senha padrão do organizador é "alcateia2024".');
    }
  };

  const handleQuickDemoLogin = () => {
    setPasswordInput(ADMIN_PASSWORD);
    setIsAuthenticated(true);
    setLoginError('');
  };

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const matchesSearch =
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(p.bibNumber).includes(searchQuery);

      const matchesGender = genderFilter === 'all' || p.gender === genderFilter;
      const matchesMilk =
        milkFilter === 'all' ||
        (milkFilter === 'entregue' && p.milkDelivered) ||
        (milkFilter === 'pendente' && !p.milkDelivered);

      return matchesSearch && matchesGender && matchesMilk;
    });
  }, [participants, searchQuery, genderFilter, milkFilter]);

  // Shirt sizes breakdown
  const shirtBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    participants.forEach((p) => {
      counts[p.shirtSize] = (counts[p.shirtSize] || 0) + 1;
    });
    return counts;
  }, [participants]);

  const handleToggleMilk = (id: string) => {
    StorageService.toggleMilkDelivered(id);
    onDataChanged();
  };

  const handleToggleCheckIn = (id: string) => {
    StorageService.toggleCheckIn(id);
    onDataChanged();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover o participante "${name}"?`)) {
      StorageService.deleteParticipant(id);
      onDataChanged();
    }
  };

  const handleAddManualAthlete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthlete.fullName.trim()) return;
    StorageService.addParticipant(newAthlete);
    onDataChanged();
    setShowAddModal(false);
    setNewAthlete({
      fullName: '',
      gender: 'Feminino',
      birthDate: '1990-01-01',
      city: 'Laranjal Paulista',
      state: 'SP',
      team: 'Individual',
      phone: '(15) 99999-0000',
      cpf: '000.000.000-00',
      shirtSize: 'M',
      modality: 'Corrida Livre 5km',
      milkDonationAgreed: true,
      paymentMethod: 'PIX',
    });
  };

  const handleResetData = () => {
    if (window.confirm('Deseja restaurar a base de inscritos com os dados de exemplo padrão?')) {
      StorageService.resetToDefault();
      onDataChanged();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl my-auto rounded-3xl bg-[#0a0a0e] border-2 border-[#E51E2B]/60 shadow-[0_0_70px_rgba(229,30,43,0.3)] p-5 sm:p-8 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Background Wolf in Admin Modal with subtle opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-30 select-none"
          style={{
            backgroundImage: `url(${wolfBgImage})`,
            filter: 'contrast(1.2) brightness(0.95)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e]/75 via-[#0a0a0e]/50 to-[#0a0a0e]/85 pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-[#E51E2B] shadow-md shadow-red-950 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sports text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
                  Área Restrita do Administrador
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-500/30">
                  Academia Alcateia
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestão de Inscritos, Exportação Excel/PDF, Entrega de Leite e Kits
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="relative z-10 py-6 sm:py-8 px-2 sm:px-4 max-w-xl mx-auto text-center space-y-6">
            {/* Clean, athletic brand typography - no stick figure */}
            <div className="flex flex-col items-center justify-center space-y-2 py-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-950 border-2 border-red-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(229,30,43,0.5)]">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-sports font-black italic uppercase text-xs tracking-[0.2em] text-[#B8CADC]">
                  CORRIDA DA
                </span>
                <span className="font-sports font-black italic uppercase text-4xl sm:text-5xl text-white tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] my-1">
                  ALCATEIA
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="h-[2px] w-8 bg-gradient-to-r from-transparent to-[#E51E2B]" />
                  <span className="font-sports font-black italic text-base text-[#E51E2B] tracking-wider">
                    2026
                  </span>
                  <span className="h-[2px] w-8 bg-gradient-to-l from-transparent to-[#E51E2B]" />
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5 text-[#E51E2B]" />
                <span>Área Restrita — Painel de Controle</span>
              </div>
              <h4 className="font-sports text-2xl font-black uppercase text-white">
                Acesso à Gestão de Prova
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                Digite a senha de administrador da Academia Alcateia para acessar os dados dos atletas e relatórios.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Senha do administrador"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-[#E51E2B] text-white font-sports font-black uppercase tracking-wider text-sm hover:brightness-110 cursor-pointer shadow-lg shadow-red-600/30"
              >
                Entrar no Painel Admin
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-xs text-red-400 hover:underline cursor-pointer pt-1 block mx-auto font-medium"
              >
                🔑 Clique aqui para preencher senha de teste (alcateia2024)
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD CONTENT */
          <div className="relative z-10 flex-1 overflow-y-auto space-y-6 pt-4 pr-1">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Stat 1: Total Inscritos */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Total Atletas</span>
                  <Users className="w-4 h-4 text-red-400" />
                </div>
                <div className="mt-2 font-sports text-2xl sm:text-3xl font-black text-white">
                  {stats.total}
                </div>
                <div className="text-[11px] text-slate-400">
                  {stats.femaleCount} F · {stats.maleCount} M
                </div>
              </div>

              {/* Stat 2: Kits Alocados (150 primeiros) */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Kits Camisa/Medalha</span>
                  <Shirt className="w-4 h-4 text-red-400" />
                </div>
                <div className="mt-2 font-sports text-2xl sm:text-3xl font-black text-red-400">
                  {stats.kitsAllocated} <span className="text-sm font-normal text-slate-400">/ 150</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  {stats.kitsRemaining} vagas restantes com kit
                </div>
              </div>

              {/* Stat 3: Litros de Leite (Asilo) */}
              <div className="p-3.5 rounded-xl bg-[#24080b] border border-[#E51E2B]/60 flex flex-col justify-between shadow-md shadow-red-600/15">
                <div className="flex items-center justify-between text-red-300 text-xs font-bold">
                  <span>1L Leite (Asilo)</span>
                  <Milk className="w-4 h-4 text-white" />
                </div>
                <div className="mt-2 font-sports text-2xl sm:text-3xl font-black text-white">
                  {stats.milkPledgedLitres} L
                </div>
                <div className="text-[11px] text-red-200">
                  {stats.milkDeliveredLitres} litros já entregues
                </div>
              </div>

              {/* Stat 4: Arrecadação Inscrições */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Arrecadação Bruta</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-2 font-sports text-2xl sm:text-3xl font-black text-emerald-400">
                  R$ {stats.totalRevenue.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-400">
                  R$ 44,90 por inscrição
                </div>
              </div>

              {/* Stat 5: Check-in Presencial */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Presença / Check-in</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-2 font-sports text-2xl sm:text-3xl font-black text-white">
                  {stats.checkedInCount} <span className="text-sm font-normal text-slate-400">/ {stats.total}</span>
                </div>
                <div className="text-[11px] text-red-300">
                  {stats.total > 0 ? Math.round((stats.checkedInCount / stats.total) * 100) : 0}% comparecimento
                </div>
              </div>
            </div>

            {/* ACTION TOOLBAR: EXCEL, PDF, MANUAL ADD, RESTORE */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                {/* Export EXCEL */}
                <button
                  onClick={() => StorageService.exportToExcel()}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sports font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-700/20 cursor-pointer transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Baixar Planilha Excel (.xlsx)</span>
                </button>

                {/* Export PDF */}
                <button
                  onClick={() => StorageService.exportToPDF()}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sports font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-700/25 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Gerar PDF / Imprimir Lista Oficial</span>
                </button>

                {/* Add Manual */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-300 border border-red-500/30 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#E51E2B]" />
                  <span>Novo Atleta</span>
                </button>
              </div>

              <button
                onClick={handleResetData}
                title="Restaurar dados de demonstração"
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Teste</span>
              </button>
            </div>

            {/* Shirt Size Summary Grid */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] uppercase tracking-wider font-sports text-slate-400 font-bold block mb-2">
                🎽 Grade de Tamanhos de Camisetas para Confecção:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(shirtBreakdown).map(([size, count]) => (
                  <span
                    key={size}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200"
                  >
                    <strong>{size}:</strong> <span className="text-cyan-400 font-bold">{count}</span> un.
                  </span>
                ))}
              </div>
            </div>

            {/* Filters and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, equipe, cidade ou número de peito..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs cursor-pointer focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">Todos os Sexos</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                </select>

                <select
                  value={milkFilter}
                  onChange={(e) => setMilkFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs cursor-pointer focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">Todos os Leites</option>
                  <option value="entregue">🥛 Leite Entregue</option>
                  <option value="pendente">⏳ Leite Pendente</option>
                </select>
              </div>
            </div>

            {/* PARTICIPANTS DATA TABLE */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-300 font-sports uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">BIB</th>
                    <th className="py-3 px-3">Atleta</th>
                    <th className="py-3 px-3">Sexo / Idade</th>
                    <th className="py-3 px-3">Cidade</th>
                    <th className="py-3 px-3">Equipe</th>
                    <th className="py-3 px-3">Camiseta</th>
                    <th className="py-3 px-3">Kit 150</th>
                    <th className="py-3 px-3 text-center">1L Leite (Asilo)</th>
                    <th className="py-3 px-3 text-center">Check-in</th>
                    <th className="py-3 px-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {filteredParticipants.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-500">
                        Nenhum atleta encontrado com os filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    filteredParticipants.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                        {/* BIB */}
                        <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">
                          #{String(p.bibNumber).padStart(3, '0')}
                        </td>

                        {/* Name & Contact */}
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-white">{p.fullName}</div>
                          <div className="text-[10px] text-slate-400">{p.phone}</div>
                        </td>

                        {/* Gender / Age */}
                        <td className="py-2.5 px-3 text-slate-300">
                          {p.gender} · {p.age} anos
                        </td>

                        {/* City */}
                        <td className="py-2.5 px-3 text-slate-300">
                          {p.city} - {p.state}
                        </td>

                        {/* Team */}
                        <td className="py-2.5 px-3 text-slate-300">
                          <span className="truncate max-w-[120px] inline-block">
                            {p.team || 'Individual'}
                          </span>
                        </td>

                        {/* Shirt */}
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-800 text-[11px]">
                            {p.shirtSize}
                          </span>
                        </td>

                        {/* Kit status */}
                        <td className="py-2.5 px-3">
                          {p.isKitEligible ? (
                            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                              Kit Incluso
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">Geral</span>
                          )}
                        </td>

                        {/* 1L Leite toggle button */}
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleMilk(p.id)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-colors ${
                              p.milkDelivered
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-900 text-amber-300 border border-amber-500/30 hover:border-amber-400'
                            }`}
                          >
                            <Milk className="w-3 h-3" />
                            <span>{p.milkDelivered ? 'Entregue' : 'Pendente'}</span>
                          </button>
                        </td>

                        {/* Check-in toggle */}
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleCheckIn(p.id)}
                            className={`w-6 h-6 rounded-md inline-flex items-center justify-center cursor-pointer transition-colors ${
                              p.checkedIn
                                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/40'
                                : 'bg-slate-900 text-slate-600 border border-slate-800 hover:text-white'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </td>

                        {/* Delete */}
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => handleDelete(p.id, p.fullName)}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded hover:bg-slate-900 transition-colors cursor-pointer"
                            title="Remover participante"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: NOVO ATLETA MANUAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/50 p-6 space-y-4 text-white">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-sports text-lg font-bold uppercase text-white">
                  Cadastrar Atleta Manualmente
                </h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddManualAthlete} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={newAthlete.fullName}
                    onChange={(e) => setNewAthlete({ ...newAthlete, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Sexo</label>
                    <select
                      value={newAthlete.gender}
                      onChange={(e) => setNewAthlete({ ...newAthlete, gender: e.target.value as Gender })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                    >
                      <option value="Feminino">Feminino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Data Nascimento</label>
                    <input
                      type="date"
                      value={newAthlete.birthDate}
                      onChange={(e) => setNewAthlete({ ...newAthlete, birthDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={newAthlete.city}
                      onChange={(e) => setNewAthlete({ ...newAthlete, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Equipe</label>
                    <input
                      type="text"
                      value={newAthlete.team}
                      onChange={(e) => setNewAthlete({ ...newAthlete, team: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Camiseta</label>
                    <select
                      value={newAthlete.shirtSize}
                      onChange={(e) => setNewAthlete({ ...newAthlete, shirtSize: e.target.value as ShirtSize })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                    >
                      <option value="Baby Look P">Baby Look P</option>
                      <option value="Baby Look M">Baby Look M</option>
                      <option value="Baby Look G">Baby Look G</option>
                      <option value="P">P</option>
                      <option value="M">M</option>
                      <option value="G">G</option>
                      <option value="GG">GG</option>
                      <option value="XG">XG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Modalidade</label>
                    <select
                      value={newAthlete.modality}
                      onChange={(e) => setNewAthlete({ ...newAthlete, modality: e.target.value as Modality })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800"
                    >
                      <option value="Corrida Livre 5km">Corrida 5km</option>
                      <option value="Corrida Livre 8km">Corrida 8km</option>
                      <option value="Caminhada Solidária 3km">Caminhada 3km</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                  >
                    Salvar Inscrição
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
