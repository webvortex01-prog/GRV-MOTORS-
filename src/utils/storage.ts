import { Vehicle, LeadProposal, StoreSettings } from '../types/vehicle';
import { INITIAL_VEHICLES, INITIAL_STORE_SETTINGS, INITIAL_LEADS } from '../data/initialVehicles';

const STORAGE_KEYS = {
  VEHICLES: 'gvr_vehicles_v2',
  SETTINGS: 'gvr_settings_v1',
  LEADS: 'gvr_leads_v1',
};

// Storage retrieval
export const getStoredVehicles = (): Vehicle[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    if (!item) {
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
      return INITIAL_VEHICLES;
    }
    const parsed: Vehicle[] = JSON.parse(item);
    // Ensure every vehicle has at least 6 high-res photos
    const upgraded = parsed.map((v) => {
      const initialMatch = INITIAL_VEHICLES.find((iv) => iv.id === v.id);
      if (initialMatch && (!v.images || v.images.length < 6)) {
        return { ...v, images: initialMatch.images };
      }
      if (!v.images || v.images.length === 0) {
        return {
          ...v,
          images: [
            '/src/assets/images/car_bmw_sedan_1791650639149.jpg',
            '/src/assets/images/car_interior_cockpit_luxury_1791653288890.jpg',
            '/src/assets/images/car_rear_tailgate_sports_1791653299080.jpg',
            '/src/assets/images/car_dashboard_screen_tech_1791653308126.jpg',
            '/src/assets/images/car_wheel_brake_detail_1791653317289.jpg',
            '/src/assets/images/car_seats_interior_1791653447749.jpg',
          ],
        };
      }
      return v;
    });
    return upgraded;
  } catch (e) {
    console.error('Error reading vehicles from localStorage', e);
    return INITIAL_VEHICLES;
  }
};

export const saveVehicles = (vehicles: Vehicle[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  } catch (e) {
    console.error('Error saving vehicles to localStorage', e);
  }
};

export const getStoredSettings = (): StoreSettings => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!item) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_STORE_SETTINGS));
      return INITIAL_STORE_SETTINGS;
    }
    return { ...INITIAL_STORE_SETTINGS, ...JSON.parse(item) };
  } catch (e) {
    console.error('Error reading settings from localStorage', e);
    return INITIAL_STORE_SETTINGS;
  }
};

export const saveSettings = (settings: StoreSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
};

export const getStoredLeads = (): LeadProposal[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (!item) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error('Error reading leads from localStorage', e);
    return INITIAL_LEADS;
  }
};

export const saveLeads = (leads: LeadProposal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving leads to localStorage', e);
  }
};

export const resetToDefaults = (): { vehicles: Vehicle[]; settings: StoreSettings; leads: LeadProposal[] } => {
  localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_STORE_SETTINGS));
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
  return {
    vehicles: INITIAL_VEHICLES,
    settings: INITIAL_STORE_SETTINGS,
    leads: INITIAL_LEADS,
  };
};

// Formatting helpers
export const formatBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatKM = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value) + ' km';
};

// Real automotive Price amortization calculation (Tabela Price)
export const calculateInstallment = (
  loanAmount: number,
  monthlyRate: number,
  months: number
): number => {
  if (loanAmount <= 0 || months <= 0) return 0;
  if (monthlyRate === 0) return loanAmount / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (loanAmount * (monthlyRate * factor)) / (factor - 1);
};

// Build WhatsApp chat link with formatted message
export const generateWhatsAppLink = (
  phoneRaw: string,
  message: string
): string => {
  const cleanPhone = phoneRaw.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
};
