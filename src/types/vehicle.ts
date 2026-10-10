export type VehicleCategory = 'Sedan' | 'SUV' | 'Picape' | 'Hatch' | 'Esportivo';
export type FuelType = 'Gasolina' | 'Flex' | 'Diesel' | 'Híbrido' | 'Elétrico';
export type TransmissionType = 'Automático' | 'Manual';
export type VehicleStatus = 'available' | 'reserved' | 'sold';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  modelYear: number;
  price: number;
  mileage: number;
  transmission: TransmissionType;
  fuel: FuelType;
  color: string;
  category: VehicleCategory;
  plateEnd: string;
  engine: string;
  powerHp: number;
  torqueNm: number;
  doors: number;
  status: VehicleStatus;
  featured: boolean;
  isPromotion?: boolean;
  promotionalPrice?: number;
  promotionBadge?: string;
  images: string[];
  features: string[];
  inspectionApproved: boolean;
  singleOwner: boolean;
  warrantyMonths: number;
  description: string;
  createdAt: string;
}

export type LeadType = 'whatsapp' | 'financing' | 'testdrive' | 'tradein';
export type LeadStatus = 'novo' | 'em_atendimento' | 'proposta_enviada' | 'fechado' | 'cancelado';

export interface LeadProposal {
  id: string;
  vehicleId?: string;
  vehicleName?: string;
  vehiclePrice?: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerCpf?: string;
  type: LeadType;
  downPayment?: number;
  installments?: number;
  monthlyEstimate?: number;
  tradeInCar?: {
    brand: string;
    model: string;
    year: number;
    mileage: number;
  };
  notes?: string;
  status: LeadStatus;
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  slogan: string;
  phoneDisplay: string;
  whatsappRaw: string;
  city: string;
  state: string;
  address: string;
  hoursWeekday: string;
  hoursSaturday: string;
  cnpj: string;
  bannerText: string;
  showBanner: boolean;
  monthlyRate: number; // e.g. 0.0135 = 1.35% a.m.
}
