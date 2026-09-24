import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { Participant, RegistrationFormData, EventStats } from '../types';
import { FirebaseService } from './firebase';

const STORAGE_KEY = 'alcateia_treinao_novembro_azul_2024';
const MAX_KITS = 150;
const REGISTRATION_FEE = 44.90;

// Seed realistic initial participants to demonstrate populated database immediately
const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'alc-001',
    bibNumber: 1,
    fullName: 'Rodrigo Silveira Ramos',
    gender: 'Masculino',
    birthDate: '1988-04-12',
    age: 36,
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Alcateia Runners',
    phone: '(15) 99781-3320',
    cpf: '342.***.***-10',
    shirtSize: 'G',
    modality: 'Corrida Livre 8km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: true,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: true,
    createdAt: '2024-10-10T09:15:00Z',
  },
  {
    id: 'alc-002',
    bibNumber: 2,
    fullName: 'Camila Fernandes Toledo',
    gender: 'Feminino',
    birthDate: '1992-09-24',
    age: 32,
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Alcateia Runners',
    phone: '(15) 99654-8877',
    cpf: '411.***.***-55',
    shirtSize: 'Baby Look M',
    modality: 'Corrida Livre 5km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: true,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: true,
    createdAt: '2024-10-10T09:22:00Z',
  },
  {
    id: 'alc-003',
    bibNumber: 3,
    fullName: 'Marcos Vinicius de Almeida',
    gender: 'Masculino',
    birthDate: '1984-11-03',
    age: 40,
    city: 'Tietê',
    state: 'SP',
    team: 'Tietê Pace',
    phone: '(15) 98112-9090',
    cpf: '289.***.***-32',
    shirtSize: 'M',
    modality: 'Corrida Livre 8km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: false,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: false,
    createdAt: '2024-10-10T10:04:00Z',
  },
  {
    id: 'alc-004',
    bibNumber: 4,
    fullName: 'Juliana Castro Penteado',
    gender: 'Feminino',
    birthDate: '1995-02-18',
    age: 29,
    city: 'Cerquilho',
    state: 'SP',
    team: 'Cerquilho Runners',
    phone: '(15) 99701-4455',
    cpf: '450.***.***-09',
    shirtSize: 'Baby Look P',
    modality: 'Corrida Livre 5km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: true,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'Cartão',
    checkedIn: true,
    createdAt: '2024-10-10T11:45:00Z',
  },
  {
    id: 'alc-005',
    bibNumber: 5,
    fullName: 'Lucas Henrique de Souza',
    gender: 'Masculino',
    birthDate: '1999-07-30',
    age: 25,
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Laranjal Fitness',
    phone: '(15) 99823-1122',
    cpf: '488.***.***-41',
    shirtSize: 'M',
    modality: 'Corrida Livre 5km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: false,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: false,
    createdAt: '2024-10-11T08:10:00Z',
  },
  {
    id: 'alc-006',
    bibNumber: 6,
    fullName: 'Fernanda Aparecida Zanetti',
    gender: 'Feminino',
    birthDate: '1986-06-14',
    age: 38,
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Individual',
    phone: '(15) 99611-3344',
    cpf: '355.***.***-98',
    shirtSize: 'Baby Look G',
    modality: 'Caminhada Solidária 3km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: true,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: false,
    createdAt: '2024-10-11T09:40:00Z',
  },
  {
    id: 'alc-007',
    bibNumber: 7,
    fullName: 'Carlos Eduardo Barreto',
    gender: 'Masculino',
    birthDate: '1979-12-05',
    age: 45,
    city: 'Piracicaba',
    state: 'SP',
    team: 'Piracicaba Outdoor',
    phone: '(19) 98844-5566',
    cpf: '233.***.***-71',
    shirtSize: 'GG',
    modality: 'Corrida Livre 8km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: false,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: false,
    createdAt: '2024-10-12T14:20:00Z',
  },
  {
    id: 'alc-008',
    bibNumber: 8,
    fullName: 'Beatriz Martins de Oliveira',
    gender: 'Feminino',
    birthDate: '2001-03-22',
    age: 23,
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Alcateia Cross',
    phone: '(15) 99790-2121',
    cpf: '512.***.***-83',
    shirtSize: 'Baby Look M',
    modality: 'Corrida Livre 5km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: false,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: false,
    createdAt: '2024-10-13T16:05:00Z',
  },
  {
    id: 'alc-009',
    bibNumber: 9,
    fullName: 'Alexandre Gonçalves Dias',
    gender: 'Masculino',
    birthDate: '1975-08-19',
    age: 49,
    city: 'Botucatu',
    state: 'SP',
    team: 'Cuesta Runners',
    phone: '(14) 99123-7788',
    cpf: '189.***.***-20',
    shirtSize: 'G',
    modality: 'Corrida Livre 8km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: false,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'Cartão',
    checkedIn: false,
    createdAt: '2024-10-14T10:50:00Z',
  },
  {
    id: 'alc-010',
    bibNumber: 10,
    fullName: 'Patrícia Rocha Lima',
    gender: 'Feminino',
    birthDate: '1989-10-11',
    age: 35,
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Amigas da Corrida',
    phone: '(15) 99877-6655',
    cpf: '377.***.***-44',
    shirtSize: 'Baby Look M',
    modality: 'Caminhada Solidária 3km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: false,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: false,
    createdAt: '2024-10-15T15:30:00Z',
  },
  {
    id: 'alc-011',
    bibNumber: 11,
    fullName: 'Guilherme Augusto Rossi',
    gender: 'Masculino',
    birthDate: '1993-01-27',
    age: 31,
    city: 'Laranjal Paulista',
    state: 'SP',
    team: 'Alcateia Runners',
    phone: '(15) 99765-4321',
    cpf: '402.***.***-63',
    shirtSize: 'M',
    modality: 'Corrida Livre 5km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: true,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: true,
    createdAt: '2024-10-16T11:00:00Z',
  },
  {
    id: 'alc-012',
    bibNumber: 12,
    fullName: 'Tatiane Barbosa Mendes',
    gender: 'Feminino',
    birthDate: '1991-05-09',
    age: 33,
    city: 'Tietê',
    state: 'SP',
    team: 'Tietê Pace',
    phone: '(15) 99632-1478',
    cpf: '399.***.***-15',
    shirtSize: 'Baby Look P',
    modality: 'Corrida Livre 8km',
    price: REGISTRATION_FEE,
    milkDonationAgreed: true,
    milkDelivered: false,
    isKitEligible: true,
    paymentStatus: 'Confirmado',
    paymentMethod: 'PIX',
    checkedIn: false,
    createdAt: '2024-10-17T17:15:00Z',
  }
];

// Helper to calculate age
export function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 0;
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return isNaN(age) || age < 0 ? 0 : age;
}

export const StorageService = {
  getParticipants(): Participant[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initialize with default sample data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
        return INITIAL_PARTICIPANTS;
      }
      return JSON.parse(data) as Participant[];
    } catch (e) {
      console.error('Error reading participants from localStorage:', e);
      return INITIAL_PARTICIPANTS;
    }
  },

  saveParticipants(list: Participant[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving participants to localStorage:', e);
    }
  },

  addParticipant(formData: RegistrationFormData): Participant {
    const list = this.getParticipants();
    const nextBib = list.length + 1;
    const isKitEligible = list.length < MAX_KITS;
    const age = calculateAge(formData.birthDate);

    const newParticipant: Participant = {
      id: `alc-${String(nextBib).padStart(3, '0')}-${Date.now().toString(36)}`,
      bibNumber: nextBib,
      fullName: formData.fullName.trim(),
      gender: formData.gender,
      birthDate: formData.birthDate,
      age: age,
      city: formData.city.trim(),
      state: formData.state || 'SP',
      team: formData.team.trim() || 'Individual',
      phone: formData.phone.trim(),
      cpf: formData.cpf.trim(),
      shirtSize: formData.shirtSize,
      modality: formData.modality,
      price: REGISTRATION_FEE,
      milkDonationAgreed: formData.milkDonationAgreed,
      milkDelivered: false,
      isKitEligible: isKitEligible,
      paymentStatus: 'Confirmado', // Em ambiente demo consideramos confirmado após passo de pagamento
      paymentMethod: formData.paymentMethod,
      checkedIn: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [newParticipant, ...list];
    this.saveParticipants(updated);

    // Sync to Cloud Firestore asynchronously
    FirebaseService.saveParticipant(newParticipant).catch((err) => {
      console.warn('Could not sync new athlete to Firebase:', err);
    });

    return newParticipant;
  },

  syncFromFirebase(remoteList: Participant[]): void {
    if (remoteList && remoteList.length > 0) {
      this.saveParticipants(remoteList);
    }
  },

  updateParticipant(id: string, updates: Partial<Participant>): Participant[] {
    const list = this.getParticipants();
    const updated = list.map((p) => (p.id === id ? { ...p, ...updates } : p));
    this.saveParticipants(updated);

    // Sync to Cloud Firestore
    FirebaseService.updateParticipant(id, updates).catch((err) => {
      console.warn('Could not sync update to Firebase:', err);
    });

    return updated;
  },

  deleteParticipant(id: string): Participant[] {
    const list = this.getParticipants();
    const updated = list.filter((p) => p.id !== id);
    this.saveParticipants(updated);

    // Sync deletion to Cloud Firestore
    FirebaseService.deleteParticipant(id).catch((err) => {
      console.warn('Could not sync deletion to Firebase:', err);
    });

    return updated;
  },

  toggleMilkDelivered(id: string): Participant[] {
    const list = this.getParticipants();
    let newStatus = false;
    const updated = list.map((p) => {
      if (p.id === id) {
        newStatus = !p.milkDelivered;
        return { ...p, milkDelivered: newStatus };
      }
      return p;
    });
    this.saveParticipants(updated);

    // Sync to Cloud Firestore
    FirebaseService.updateParticipant(id, { milkDelivered: newStatus }).catch((err) => {
      console.warn('Could not sync milk status to Firebase:', err);
    });

    return updated;
  },

  toggleCheckIn(id: string): Participant[] {
    const list = this.getParticipants();
    let newStatus = false;
    const updated = list.map((p) => {
      if (p.id === id) {
        newStatus = !p.checkedIn;
        return { ...p, checkedIn: newStatus };
      }
      return p;
    });
    this.saveParticipants(updated);

    // Sync to Cloud Firestore
    FirebaseService.updateParticipant(id, { checkedIn: newStatus }).catch((err) => {
      console.warn('Could not sync check-in to Firebase:', err);
    });

    return updated;
  },

  resetToDefault(): Participant[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PARTICIPANTS));
    // Seed to Cloud Firestore as well
    FirebaseService.seedInitialData(INITIAL_PARTICIPANTS).catch((err) => {
      console.warn('Could not reset Cloud Firestore:', err);
    });
    return INITIAL_PARTICIPANTS;
  },

  getStats(): EventStats {
    const list = this.getParticipants();
    const maleCount = list.filter((p) => p.gender === 'Masculino').length;
    const femaleCount = list.filter((p) => p.gender === 'Feminino').length;
    const kitsAllocated = list.filter((p) => p.isKitEligible).length;
    const kitsRemaining = Math.max(0, MAX_KITS - kitsAllocated);
    const confirmedCount = list.filter((p) => p.paymentStatus === 'Confirmado').length;
    const totalRevenue = confirmedCount * REGISTRATION_FEE;
    const milkPledgedLitres = list.length; // 1 litro por inscrição obrigatório
    const milkDeliveredLitres = list.filter((p) => p.milkDelivered).length;
    const checkedInCount = list.filter((p) => p.checkedIn).length;

    return {
      total: list.length,
      maleCount,
      femaleCount,
      kitsAllocated,
      maxKits: MAX_KITS,
      kitsRemaining,
      totalRevenue,
      milkPledgedLitres,
      milkDeliveredLitres,
      checkedInCount,
    };
  },

  /**
   * Export to formatted Excel file (.xlsx)
   */
  exportToExcel(): void {
    const list = this.getParticipants();
    const rows = list.map((p) => ({
      'Nº Peito': p.bibNumber,
      'Nome Completo': p.fullName,
      'Sexo': p.gender,
      'Idade': p.age,
      'Data de Nascimento': p.birthDate,
      'CPF': p.cpf,
      'Telefone / WhatsApp': p.phone,
      'Cidade': p.city,
      'Estado': p.state,
      'Equipe / Assessoria': p.team,
      'Modalidade': p.modality,
      'Tam. Camiseta': p.shirtSize,
      'Kit Garantido (150 primeiros)': p.isKitEligible ? 'SIM' : 'NÃO',
      '1L Leite Entregue (Asilo)': p.milkDelivered ? 'ENTREGUE' : 'PENDENTE',
      'Status Pagamento': p.paymentStatus,
      'Forma Pagto': p.paymentMethod,
      'Valor (R$)': p.price.toFixed(2),
      'Check-in Corrida': p.checkedIn ? 'PRESENTE' : 'AUSENTE',
      'Data Inscrição': new Date(p.createdAt).toLocaleString('pt-BR'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Set auto column width
    const colWidths = [
      { wch: 10 }, // Nº Peito
      { wch: 30 }, // Nome Completo
      { wch: 12 }, // Sexo
      { wch: 8 },  // Idade
      { wch: 15 }, // Data Nasc
      { wch: 16 }, // CPF
      { wch: 18 }, // Telefone
      { wch: 20 }, // Cidade
      { wch: 8 },  // UF
      { wch: 22 }, // Equipe
      { wch: 22 }, // Modalidade
      { wch: 14 }, // Camiseta
      { wch: 14 }, // Kit
      { wch: 16 }, // Leite
      { wch: 16 }, // Pagamento
      { wch: 12 }, // Metodo
      { wch: 12 }, // Valor
      { wch: 12 }, // Check-in
      { wch: 20 }, // Data Inscrição
    ];
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inscritos Treinão Alcateia');

    const fileName = `Alcateia_Inscritos_Treinao_Novembro_Azul_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  },

  /**
   * Export to clean PDF format ready for check-in on event day
   */
  exportToPDF(): void {
    const list = this.getParticipants();
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background Header Banner
    doc.setFillColor(7, 13, 30); // Deep Alcateia Navy
    doc.rect(0, 0, pageWidth, 70, 'F');

    // Title
    doc.setTextColor(0, 229, 255); // Cyan
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('TREINÃO SOLIDÁRIO ALCATEIA — NOVEMBRO AZUL', 30, 30);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Data: 08/11/2024 às 07:30 | Local: Academia Alcateia (Rua Ciríaco Ferreira do Amaral, 1700 - Laranjal Paulista/SP)',
      30,
      48
    );
    doc.text(
      'Beneficiário: Asilo São Cristóvão | Lista Oficial de Atletas, Entrega de Kits e Doação de Leite',
      30,
      62
    );

    // Table Header
    let y = 95;
    const startX = 30;
    const rowHeight = 18;

    doc.setFillColor(15, 28, 63);
    doc.rect(startX, y - 12, pageWidth - 60, rowHeight, 'F');
    doc.setTextColor(0, 229, 255);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');

    doc.text('Nº', startX + 5, y);
    doc.text('ATLETA', startX + 35, y);
    doc.text('SEXO/IDADE', startX + 220, y);
    doc.text('CIDADE', startX + 290, y);
    doc.text('EQUIPE', startX + 380, y);
    doc.text('MODALIDADE', startX + 480, y);
    doc.text('CAMISETA', startX + 590, y);
    doc.text('1L LEITE', startX + 660, y);
    doc.text('ASSINATURA / CHECK-IN', startX + 720, y);

    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    list.forEach((p, index) => {
      // Handle pagination
      if (y > pageHeight - 35) {
        doc.addPage();
        y = 40;

        // repeat header
        doc.setFillColor(15, 28, 63);
        doc.rect(startX, y - 12, pageWidth - 60, rowHeight, 'F');
        doc.setTextColor(0, 229, 255);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'bold');

        doc.text('Nº', startX + 5, y);
        doc.text('ATLETA', startX + 35, y);
        doc.text('SEXO/IDADE', startX + 220, y);
        doc.text('CIDADE', startX + 290, y);
        doc.text('EQUIPE', startX + 380, y);
        doc.text('MODALIDADE', startX + 480, y);
        doc.text('CAMISETA', startX + 590, y);
        doc.text('1L LEITE', startX + 660, y);
        doc.text('ASSINATURA / CHECK-IN', startX + 720, y);

        y += 18;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
      }

      // Alternating row background
      if (index % 2 === 0) {
        doc.setFillColor(245, 247, 250);
        doc.rect(startX, y - 11, pageWidth - 60, rowHeight - 2, 'F');
      }

      doc.setTextColor(20, 25, 35);
      doc.text(String(p.bibNumber).padStart(3, '0'), startX + 5, y);
      doc.text(p.fullName.length > 28 ? p.fullName.slice(0, 28) + '...' : p.fullName, startX + 35, y);
      doc.text(`${p.gender === 'Masculino' ? 'M' : p.gender === 'Feminino' ? 'F' : 'O'} / ${p.age}a`, startX + 220, y);
      doc.text(p.city, startX + 290, y);
      doc.text(p.team.length > 15 ? p.team.slice(0, 15) + '...' : p.team, startX + 380, y);
      doc.text(p.modality.replace('Corrida Livre ', '').replace('Caminhada Solidária ', 'Caminh. '), startX + 480, y);
      doc.text(p.shirtSize, startX + 590, y);

      // Leite checkbox box
      doc.rect(startX + 675, y - 9, 10, 10);
      if (p.milkDelivered) {
        doc.setFont('helvetica', 'bold');
        doc.text('X', startX + 677, y - 1);
        doc.setFont('helvetica', 'normal');
      }

      // Check-in / signature line
      doc.line(startX + 720, y - 2, startX + 775, y - 2);

      y += 18;
    });

    const fileName = `Alcateia_Lista_Oficial_Novembro_Azul_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
  },
};
