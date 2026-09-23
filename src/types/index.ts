export type Gender = 'Feminino' | 'Masculino' | 'Outro';

export type ShirtSize = 'Baby Look P' | 'Baby Look M' | 'Baby Look G' | 'P' | 'M' | 'G' | 'GG' | 'XG';

export type Modality = 'Caminhada Solidária 3km' | 'Corrida Livre 5km' | 'Corrida Livre 8km';

export type PaymentStatus = 'Confirmado' | 'Pendente';

export type PaymentMethod = 'PIX' | 'Cartão' | 'No Local';

export interface Participant {
  id: string;
  bibNumber: number; // Número de identificação/peito
  fullName: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  age: number;
  city: string;
  state: string;
  team: string; // Equipe ou "Individual"
  phone: string;
  cpf: string;
  shirtSize: ShirtSize;
  modality: Modality;
  price: number; // 44.90
  milkDonationAgreed: boolean;
  milkDelivered: boolean; // Confirmação física no dia da corrida
  isKitEligible: boolean; // 150 primeiros inscritos
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  checkedIn: boolean; // Check-in no evento
  createdAt: string; // ISO string
}

export interface RegistrationFormData {
  fullName: string;
  gender: Gender;
  birthDate: string;
  city: string;
  state: string;
  team: string;
  phone: string;
  cpf: string;
  shirtSize: ShirtSize;
  modality: Modality;
  milkDonationAgreed: boolean;
  paymentMethod: PaymentMethod;
}

export interface EventStats {
  total: number;
  maleCount: number;
  femaleCount: number;
  kitsAllocated: number;
  maxKits: number;
  kitsRemaining: number;
  totalRevenue: number;
  milkPledgedLitres: number;
  milkDeliveredLitres: number;
  checkedInCount: number;
}
