import React, { useState } from 'react';
import {
  Vehicle,
  StoreSettings,
  LeadProposal,
  VehicleCategory,
  FuelType,
  TransmissionType,
  VehicleStatus,
  LeadStatus,
} from '../types/vehicle';
import { formatBRL, formatKM, generateWhatsAppLink } from '../utils/storage';
import { GvrLogo } from './GvrLogo';
import {
  Car,
  DollarSign,
  Users,
  Plus,
  Edit2,
  Trash2,
  Printer,
  CheckCircle,
  MessageCircle,
  Settings,
  Star,
  RefreshCw,
  Search,
  Tag,
  HelpCircle,
  Flame,
  X,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface AdminPanelProps {
  vehicles: Vehicle[];
  leads: LeadProposal[];
  settings: StoreSettings;
  onUpdateVehicles: (vehicles: Vehicle[]) => void;
  onUpdateLeads: (leads: LeadProposal[]) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onResetData: () => void;
  onPrintVehicle: (vehicle: Vehicle) => void;
  onOpenTutorial: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  vehicles,
  leads,
  settings,
  onUpdateVehicles,
  onUpdateLeads,
  onUpdateSettings,
  onResetData,
  onPrintVehicle,
  onOpenTutorial,
}) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'leads' | 'settings'>('vehicles');
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState<'all' | 'available' | 'promotion' | 'reserved' | 'sold'>('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  // Modal states
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  // Dedicated Promotion Modal State
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [promotingVehicle, setPromotingVehicle] = useState<Vehicle | null>(null);
  const [promoActive, setPromoActive] = useState(true);
  const [promoPrice, setPromoPrice] = useState<number>(0);
  const [promoBadge, setPromoBadge] = useState<string>('Super Oferta');

  // Form state for Vehicle CRUD
  const [formBrand, setFormBrand] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formVersion, setFormVersion] = useState('');
  const [formYear, setFormYear] = useState<number>(2023);
  const [formModelYear, setFormModelYear] = useState<number>(2023);
  const [formPrice, setFormPrice] = useState<number>(150000);
  const [formMileage, setFormMileage] = useState<number>(25000);
  const [formTransmission, setFormTransmission] = useState<TransmissionType>('Automático');
  const [formFuel, setFormFuel] = useState<FuelType>('Flex');
  const [formColor, setFormColor] = useState('Preto');
  const [formCategory, setFormCategory] = useState<VehicleCategory>('SUV');
  const [formPlateEnd, setFormPlateEnd] = useState('5');
  const [formEngine, setFormEngine] = useState('2.0 Turbo 200 cv');
  const [formPowerHp, setFormPowerHp] = useState<number>(200);
  const [formStatus, setFormStatus] = useState<VehicleStatus>('available');
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [formIsPromotion, setFormIsPromotion] = useState<boolean>(false);
  const [formPromoPrice, setFormPromoPrice] = useState<number>(140000);
  const [formPromoBadge, setFormPromoBadge] = useState<string>('Super Oferta');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formFeaturesText, setFormFeaturesText] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...settings });
  const [settingsSavedFeedback, setSettingsSavedFeedback] = useState(false);

  // KPIs
  const availableVehicles = vehicles.filter((v) => v.status === 'available');
  const promoVehicles = vehicles.filter((v) => v.isPromotion && v.status === 'available');
  const totalStockValue = availableVehicles.reduce(
    (acc, v) => acc + (v.isPromotion && v.promotionalPrice ? v.promotionalPrice : v.price),
    0
  );
  const averagePrice = availableVehicles.length > 0 ? totalStockValue / availableVehicles.length : 0;
  const newLeadsCount = leads.filter((l) => l.status === 'novo').length;

  // Filtered vehicles
  const filteredVehicles = vehicles.filter((v) => {
    if (vehicleSearch.trim()) {
      const q = vehicleSearch.toLowerCase();
      const match = `${v.brand} ${v.model} ${v.version}`.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (vehicleStatusFilter === 'promotion') {
      return v.isPromotion && v.status === 'available';
    }
    if (vehicleStatusFilter !== 'all') {
      return v.status === vehicleStatusFilter;
    }
    return true;
  });

  // Filtered leads
  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter === 'all') return true;
    return l.status === leadStatusFilter;
  });

  const applyPreset = (presetName: 'corolla' | 'hilux' | 'bmw' | 'tcross') => {
    if (presetName === 'corolla') {
      setFormBrand('Toyota');
      setFormModel('Corolla Altis Premium Hybrid');
      setFormVersion('1.8 16V Flex CVT');
      setFormYear(2023);
      setFormModelYear(2024);
      setFormPrice(174900);
      setFormMileage(24000);
      setFormTransmission('Automático');
      setFormFuel('Híbrido');
      setFormColor('Cinza Celestial');
      setFormCategory('Sedan');
      setFormPlateEnd('6');
      setFormEngine('1.8 Híbrido Flex 122 cv');
      setFormPowerHp(122);
      setFormFeaturesText('Teto Solar Elétrico, Toyota Safety Sense, Bancos em Couro Claro, Piloto Adaptativo, Ar Digital');
      setFormDescription('Sedan híbrido extremamente econômico (faz até 20 km/l). Único dono com garantia de fábrica.');
      setFormImageUrl('/src/assets/images/car_honda_civic_1791650680392.jpg');
    } else if (presetName === 'hilux') {
      setFormBrand('Toyota');
      setFormModel('Hilux SRX 4x4 Cabine Dupla');
      setFormVersion('2.8 16V Turbo Diesel Automática');
      setFormYear(2024);
      setFormModelYear(2024);
      setFormPrice(319900);
      setFormMileage(12800);
      setFormTransmission('Automático');
      setFormFuel('Diesel');
      setFormColor('Branco Pérola');
      setFormCategory('Picape');
      setFormPlateEnd('4');
      setFormEngine('2.8 Turbo Diesel 204 cv');
      setFormPowerHp(204);
      setFormFeaturesText('Tração 4x4 Reduzida, Som JBL, Câmera 360, Bancos Ventilados, Rodas 18 Diamantadas');
      setFormDescription('Picape impecável de procedência, revisões completas na concessionária autorizada.');
      setFormImageUrl('/src/assets/images/car_toyota_hilux_1791650656978.jpg');
    } else if (presetName === 'bmw') {
      setFormBrand('BMW');
      setFormModel('320i M Sport 2.0 Turbo');
      setFormVersion('M Sport ActiveFlex');
      setFormYear(2023);
      setFormModelYear(2023);
      setFormPrice(289900);
      setFormMileage(18500);
      setFormTransmission('Automático');
      setFormFuel('Flex');
      setFormColor('Cinza Mineral');
      setFormCategory('Sedan');
      setFormPlateEnd('9');
      setFormEngine('2.0 TwinPower Turbo 184 cv');
      setFormPowerHp(184);
      setFormFeaturesText('Pacote M Sport, Teto Panorâmico, Cockpit 12.3", Som HiFi, Faróis LED Laser');
      setFormDescription('Carro com laudo cautelar 100% aprovado, sem retoques, revisado na concessionária.');
      setFormImageUrl('/src/assets/images/car_bmw_sedan_1791650639149.jpg');
    } else if (presetName === 'tcross') {
      setFormBrand('Volkswagen');
      setFormModel('T-Cross Highline 250 TSI');
      setFormVersion('1.4 Turbo Automático com Painel Digital');
      setFormYear(2023);
      setFormModelYear(2023);
      setFormPrice(139900);
      setFormMileage(31000);
      setFormTransmission('Automático');
      setFormFuel('Flex');
      setFormColor('Azul Biscay');
      setFormCategory('SUV');
      setFormPlateEnd('2');
      setFormEngine('1.4 TSI 150 cv');
      setFormPowerHp(150);
      setFormFeaturesText('Painel Active Info Display, Teto Panorâmico, VW Play 10", Park Assist, Bancos em Couro');
      setFormDescription('SUV compacto mais seguro da categoria com 5 estrelas Latin NCAP. Laudo Dekra aprovado.');
      setFormImageUrl('/src/assets/images/car_bmw_sedan_1791650639149.jpg');
    }
  };

  const handleOpenAddVehicle = () => {
    setEditingVehicleId(null);
    applyPreset('corolla');
    setFormStatus('available');
    setFormFeatured(false);
    setFormIsPromotion(false);
    setIsVehicleModalOpen(true);
  };

  const handleOpenEditVehicle = (v: Vehicle) => {
    setEditingVehicleId(v.id);
    setFormBrand(v.brand);
    setFormModel(v.model);
    setFormVersion(v.version || '');
    setFormYear(v.year);
    setFormModelYear(v.modelYear);
    setFormPrice(v.price);
    setFormMileage(v.mileage);
    setFormTransmission(v.transmission);
    setFormFuel(v.fuel);
    setFormColor(v.color);
    setFormCategory(v.category);
    setFormPlateEnd(v.plateEnd);
    setFormEngine(v.engine);
    setFormPowerHp(v.powerHp);
    setFormStatus(v.status);
    setFormFeatured(v.featured);
    setFormIsPromotion(Boolean(v.isPromotion));
    setFormPromoPrice(v.promotionalPrice || Math.round(v.price * 0.92));
    setFormPromoBadge(v.promotionBadge || 'Super Oferta');
    setFormImageUrl(v.images[0] || '');
    setFormFeaturesText(v.features.join(', '));
    setFormDescription(v.description);
    setIsVehicleModalOpen(true);
  };

  const handleOpenPromotionModal = (v: Vehicle) => {
    setPromotingVehicle(v);
    setPromoActive(Boolean(v.isPromotion));
    setPromoPrice(v.promotionalPrice || Math.round(v.price * 0.92));
    setPromoBadge(v.promotionBadge || 'Feirão de Ofertas - R$ ' + Math.round((v.price * 0.08) / 1000) + '.000 OFF');
    setIsPromotionModalOpen(true);
  };

  const handleSavePromotion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promotingVehicle) return;

    const updated = vehicles.map((v) => {
      if (v.id === promotingVehicle.id) {
        return {
          ...v,
          isPromotion: promoActive,
          promotionalPrice: promoActive ? Number(promoPrice) : undefined,
          promotionBadge: promoActive ? promoBadge : undefined,
        };
      }
      return v;
    });

    onUpdateVehicles(updated);
    setIsPromotionModalOpen(false);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = formFeaturesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const existingImages = editingVehicleId
      ? vehicles.find((v) => v.id === editingVehicleId)?.images || []
      : [];

    const finalImages = existingImages.length >= 6
      ? [formImageUrl || existingImages[0], ...existingImages.slice(1)]
      : [
          formImageUrl || '/src/assets/images/car_bmw_sedan_1791650639149.jpg',
          '/src/assets/images/car_interior_cockpit_luxury_1791653288890.jpg',
          '/src/assets/images/car_rear_tailgate_sports_1791653299080.jpg',
          '/src/assets/images/car_dashboard_screen_tech_1791653308126.jpg',
          '/src/assets/images/car_wheel_brake_detail_1791653317289.jpg',
          '/src/assets/images/car_seats_interior_1791653447749.jpg',
        ];

    const vehicleData: Vehicle = {
      id: editingVehicleId || `gvr-${Date.now()}`,
      brand: formBrand,
      model: formModel,
      version: formVersion,
      year: Number(formYear),
      modelYear: Number(formModelYear),
      price: Number(formPrice),
      mileage: Number(formMileage),
      transmission: formTransmission,
      fuel: formFuel,
      color: formColor,
      category: formCategory,
      plateEnd: formPlateEnd,
      engine: formEngine,
      powerHp: Number(formPowerHp),
      torqueNm: 250,
      doors: 4,
      status: formStatus,
      featured: formFeatured,
      isPromotion: formIsPromotion,
      promotionalPrice: formIsPromotion ? Number(formPromoPrice) : undefined,
      promotionBadge: formIsPromotion ? formPromoBadge : undefined,
      images: finalImages,
      features: featuresArray.length > 0 ? featuresArray : ['Direção Elétrica', 'Ar-condicionado', 'Vidros Elétricos', 'Airbags'],
      inspectionApproved: true,
      singleOwner: true,
      warrantyMonths: 12,
      description: formDescription,
      createdAt: editingVehicleId
        ? vehicles.find((v) => v.id === editingVehicleId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    if (editingVehicleId) {
      const updated = vehicles.map((v) => (v.id === editingVehicleId ? vehicleData : v));
      onUpdateVehicles(updated);
    } else {
      onUpdateVehicles([vehicleData, ...vehicles]);
    }

    setIsVehicleModalOpen(false);
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este veículo do estoque?')) {
      const updated = vehicles.filter((v) => v.id !== id);
      onUpdateVehicles(updated);
    }
  };

  const handleQuickStatusChange = (id: string, status: VehicleStatus) => {
    const updated = vehicles.map((v) => (v.id === id ? { ...v, status } : v));
    onUpdateVehicles(updated);
  };

  const handleToggleFeatured = (id: string) => {
    const updated = vehicles.map((v) => (v.id === id ? { ...v, featured: !v.featured } : v));
    onUpdateVehicles(updated);
  };

  const handleLeadStatusChange = (leadId: string, status: LeadStatus) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
    onUpdateLeads(updated);
  };

  const handleDeleteLead = (leadId: string) => {
    const updated = leads.filter((l) => l.id !== leadId);
    onUpdateLeads(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    setSettingsSavedFeedback(true);
    setTimeout(() => setSettingsSavedFeedback(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 md:pb-20">
      {/* Top Admin Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="scale-75 origin-left shrink-0">
                <GvrLogo variant="compact" size="sm" showPhone={false} />
              </div>
              <div className="border-l border-slate-700 pl-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-xl font-extrabold text-white font-display">
                    Painel Lojista
                  </h1>
                  <span className="text-[10px] bg-blue-900/60 text-sky-400 font-bold px-2 py-0.5 rounded-full border border-blue-700/50">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  Gestão de Estoque, Ofertas e Clientes
                </p>
              </div>
            </div>

            {/* Quick Actions (Full width touch targets on mobile) */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenTutorial}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs rounded-xl border border-amber-500/30 transition-all cursor-pointer active:scale-95"
              >
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ver Tutorial</span>
              </button>

              <button
                onClick={handleOpenAddVehicle}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/40 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>Novo Carro</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Restaurar dados originais de demonstração da loja?')) {
                    onResetData();
                  }
                }}
                title="Restaurar dados"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer border border-slate-700 shrink-0 active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-5 sm:mt-8">
        {/* KPI Strip (2 columns on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Estoque Ativo</span>
              <Car className="w-4 h-4 text-sky-400 shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 tabular-nums">
              {availableVehicles.length}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
              {vehicles.filter((v) => v.status === 'reserved').length} reservados · {vehicles.filter((v) => v.status === 'sold').length} vendidos
            </div>
          </div>

          <div className="bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Em Oferta</span>
              <Flame className="w-4 h-4 text-rose-400 shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-display mt-1 tabular-nums">
              {promoVehicles.length}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
              Com desconto na vitrine
            </div>
          </div>

          <div className="bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Valor em Pátio</span>
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <div className="text-lg sm:text-2xl font-extrabold text-white font-display mt-1 tabular-nums truncate">
              {formatBRL(totalStockValue)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
              Ticket: {formatBRL(averagePrice)}
            </div>
          </div>

          <div className="bg-slate-900 p-3.5 sm:p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Propostas</span>
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1 tabular-nums flex items-center gap-2">
              <span>{leads.length}</span>
              {newLeadsCount > 0 && (
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                  {newLeadsCount} novos
                </span>
              )}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
              Aguardando contato
            </div>
          </div>
        </div>

        {/* Tab Navigation (Segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-2xl mb-5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'vehicles' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4 shrink-0" />
            <span>Estoque ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === 'leads' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Propostas ({leads.length})</span>
            {newLeadsCount > 0 && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Loja</span>
          </button>
        </div>

        {/* TAB 1: VEHICLES STOCK MANAGEMENT */}
        {activeTab === 'vehicles' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Filter and Quick Status Tabs */}
            <div className="p-3 sm:p-5 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setVehicleStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    vehicleStatusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Todos ({vehicles.length})
                </button>
                <button
                  onClick={() => setVehicleStatusFilter('available')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    vehicleStatusFilter === 'available' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Disponíveis ({availableVehicles.length})
                </button>
                <button
                  onClick={() => setVehicleStatusFilter('promotion')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                    vehicleStatusFilter === 'promotion' ? 'bg-rose-600 text-white' : 'bg-slate-950 text-rose-400 hover:text-rose-300'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Em Oferta ({promoVehicles.length})</span>
                </button>
                <button
                  onClick={() => setVehicleStatusFilter('reserved')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    vehicleStatusFilter === 'reserved' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Reservados ({vehicles.filter((v) => v.status === 'reserved').length})
                </button>
                <button
                  onClick={() => setVehicleStatusFilter('sold')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    vehicleStatusFilter === 'sold' ? 'bg-slate-700 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  Vendidos ({vehicles.filter((v) => v.status === 'sold').length})
                </button>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Buscar veículo no estoque..."
                  value={vehicleSearch}
                  onChange={(e) => setVehicleSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* MOBILE VIEW: APP-LIKE TOUCH CARDS (< 768px) */}
            <div className="md:hidden divide-y divide-slate-800">
              {filteredVehicles.map((car) => {
                const discount = car.isPromotion && car.promotionalPrice ? car.price - car.promotionalPrice : 0;

                return (
                  <div key={car.id} className="p-3.5 space-y-3">
                    {/* Top Row: Image + Main details */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                        <img
                          src={car.images[0] || '/src/assets/images/car_bmw_sedan_1791650639149.jpg'}
                          alt={car.model}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {car.isPromotion && (
                          <span className="absolute top-1 right-1 bg-rose-600 text-white p-0.5 rounded-md">
                            <Flame className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-white text-sm truncate font-display">
                            {car.brand} {car.model}
                          </h4>
                          <button
                            onClick={() => handleToggleFeatured(car.id)}
                            className={`p-1 shrink-0 ${car.featured ? 'text-amber-400' : 'text-slate-600'}`}
                          >
                            <Star className={`w-4 h-4 ${car.featured ? 'fill-amber-400' : ''}`} />
                          </button>
                        </div>

                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {car.year}/{car.modelYear} · {formatKM(car.mileage)}
                        </div>

                        {/* Price display */}
                        <div className="mt-1 flex items-baseline gap-2">
                          {car.isPromotion && car.promotionalPrice ? (
                            <>
                              <span className="text-base font-extrabold text-rose-400 tabular-nums">
                                {formatBRL(car.promotionalPrice)}
                              </span>
                              <span className="text-[11px] text-slate-500 line-through tabular-nums">
                                {formatBRL(car.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-base font-extrabold text-white tabular-nums">
                              {formatBRL(car.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Middle Row: Status selector */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">Status:</span>
                        <select
                          value={car.status}
                          onChange={(e) => handleQuickStatusChange(car.id, e.target.value as VehicleStatus)}
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer ${
                            car.status === 'available'
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                              : car.status === 'reserved'
                              ? 'bg-amber-950/80 text-amber-400 border-amber-500/30'
                              : 'bg-red-950/80 text-red-400 border-red-500/30'
                          }`}
                        >
                          <option value="available">Disponível</option>
                          <option value="reserved">Reservado</option>
                          <option value="sold">Vendido</option>
                        </select>
                      </div>

                      {car.isPromotion && (
                        <span className="text-[10px] text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-lg border border-rose-800/40 font-semibold truncate max-w-[140px]">
                          {car.promotionBadge || 'Em Oferta'}
                        </span>
                      )}
                    </div>

                    {/* Bottom Row: 4 Native Touch Actions (min 44px height) */}
                    <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-800/80">
                      <button
                        onClick={() => handleOpenPromotionModal(car)}
                        className={`min-h-[40px] flex items-center justify-center gap-1 text-[11px] font-semibold rounded-xl transition-all cursor-pointer ${
                          car.isPromotion
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Tag className="w-3.5 h-3.5 shrink-0" />
                        <span>Oferta</span>
                      </button>

                      <button
                        onClick={() => onPrintVehicle(car)}
                        className="min-h-[40px] flex items-center justify-center gap-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 shrink-0" />
                        <span>Cartaz</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditVehicle(car)}
                        className="min-h-[40px] flex items-center justify-center gap-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-xl transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => handleDeleteVehicle(car.id)}
                        className="min-h-[40px] flex items-center justify-center gap-1 text-[11px] font-semibold bg-slate-800 hover:bg-red-950 text-red-400 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP VIEW: FULL TABLE (>= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Veículo</th>
                    <th className="py-3.5 px-4">Ano/KM</th>
                    <th className="py-3.5 px-4">Preço & Promoção</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Destaque</th>
                    <th className="py-3.5 px-4 text-right">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredVehicles.map((car) => {
                    const discount = car.isPromotion && car.promotionalPrice ? car.price - car.promotionalPrice : 0;

                    return (
                      <tr key={car.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={car.images[0] || '/src/assets/images/car_bmw_sedan_1791650639149.jpg'}
                                alt={car.model}
                                referrerPolicy="no-referrer"
                                className="w-14 h-10 object-cover rounded-lg border border-slate-700 shrink-0"
                              />
                              {car.isPromotion && (
                                <span className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full p-0.5">
                                  <Flame className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm line-clamp-1">
                                {car.brand} {car.model}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">
                                {car.version || car.engine}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 tabular-nums">
                          <div>{car.year}/{car.modelYear}</div>
                          <div className="text-[11px] text-slate-500">{formatKM(car.mileage)}</div>
                        </td>

                        <td className="py-3 px-4">
                          {car.isPromotion && car.promotionalPrice ? (
                            <div>
                              <div className="text-sm font-extrabold text-rose-400 tabular-nums">
                                {formatBRL(car.promotionalPrice)}
                              </div>
                              <div className="text-[11px] text-slate-500 line-through tabular-nums">
                                {formatBRL(car.price)}
                              </div>
                              <span className="text-[10px] text-rose-300 bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-800/40 font-semibold inline-block mt-0.5">
                                -{formatBRL(discount)}
                              </span>
                            </div>
                          ) : (
                            <div className="font-bold text-white tabular-nums text-sm">
                              {formatBRL(car.price)}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={car.status}
                            onChange={(e) => handleQuickStatusChange(car.id, e.target.value as VehicleStatus)}
                            className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer ${
                              car.status === 'available'
                                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                                : car.status === 'reserved'
                                ? 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                                : 'bg-red-950/60 text-red-400 border-red-500/30'
                            }`}
                          >
                            <option value="available">Disponível</option>
                            <option value="reserved">Reservado</option>
                            <option value="sold">Vendido</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleFeatured(car.id)}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              car.featured ? 'text-amber-400 hover:text-amber-300' : 'text-slate-600 hover:text-slate-400'
                            }`}
                            title={car.featured ? 'Remover destaque' : 'Colocar em destaque'}
                          >
                            <Star className={`w-4 h-4 ${car.featured ? 'fill-amber-400' : ''}`} />
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenPromotionModal(car)}
                              title={car.isPromotion ? 'Editar Promoção' : 'Colocar este Carro em Oferta'}
                              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                car.isPromotion
                                  ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 hover:bg-rose-900'
                                  : 'bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-700'
                              }`}
                            >
                              <Tag className="w-3.5 h-3.5" />
                              <span>{car.isPromotion ? 'Oferta' : 'Promover'}</span>
                            </button>

                            <button
                              onClick={() => onPrintVehicle(car)}
                              title="Imprimir Cartaz de Para-brisa"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenEditVehicle(car)}
                              title="Editar Dados Completos"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteVehicle(car.id)}
                              title="Excluir"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS CRM */}
        {activeTab === 'leads' && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Filter Buttons */}
            <div className="p-3 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
              <div className="flex items-center gap-1.5">
                {['all', 'novo', 'em_atendimento', 'proposta_enviada', 'fechado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                      leadStatusFilter === st ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    {st === 'all' ? 'Todas' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <span className="text-[11px] text-slate-400 whitespace-nowrap hidden sm:inline">
                {filteredLeads.length} propostas listadas
              </span>
            </div>

            {/* Leads List (Mobile Optimized) */}
            <div className="divide-y divide-slate-800">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => {
                  const replyMsg = `Olá ${lead.customerName}! Aqui é da GVR Gomes Veículos referente ao seu interesse no ${lead.vehicleName || 'nosso estoque'}. Como podemos ajudar com sua negociação?`;
                  const replyUrl = generateWhatsAppLink(lead.customerPhone, replyMsg);

                  return (
                    <div key={lead.id} className="p-4 sm:p-5 hover:bg-slate-800/30 transition-colors space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-bold text-white">{lead.customerName}</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-xs text-sky-400 font-mono">{lead.customerPhone}</span>
                          <span className="text-slate-500 hidden sm:inline">·</span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString('pt-BR')} às {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-semibold">
                          Interesse: <span className="text-white">{lead.vehicleName || 'Avaliação / Estoque'}</span>
                          {lead.vehiclePrice && (
                            <span className="text-slate-400 font-normal ml-2">({formatBRL(lead.vehiclePrice)})</span>
                          )}
                        </p>

                        {lead.type === 'financing' && (
                          <div className="text-[11px] text-slate-400 mt-1">
                            Simulação: Entrada de {formatBRL(lead.downPayment || 0)} em {lead.installments}x de {formatBRL(lead.monthlyEstimate || 0)}
                          </div>
                        )}

                        {lead.type === 'tradein' && lead.tradeInCar && (
                          <div className="text-[11px] text-amber-300/90 mt-1">
                            Carro na Troca: {lead.tradeInCar.brand} {lead.tradeInCar.model} ({lead.tradeInCar.year}) - {lead.tradeInCar.mileage} km
                          </div>
                        )}

                        {lead.notes && (
                          <p className="text-xs text-slate-400 mt-1 italic">
                            "{lead.notes}"
                          </p>
                        )}
                      </div>

                      {/* Status and Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800 shrink-0">
                        <select
                          value={lead.status}
                          onChange={(e) => handleLeadStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="flex-1 sm:flex-none bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-2.5 py-2 focus:outline-none"
                        >
                          <option value="novo">Novo</option>
                          <option value="em_atendimento">Em Atendimento</option>
                          <option value="proposta_enviada">Proposta Enviada</option>
                          <option value="fechado">Venda Concluída</option>
                          <option value="cancelado">Cancelado</option>
                        </select>

                        <a
                          href={replyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 text-slate-500 hover:text-red-400 rounded-xl transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  Nenhuma proposta encontrada nesta categoria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1">
              Configurações Gerais da Loja
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Ajuste as informações comerciais da GVR Gomes Veículos, canais de contato e taxas de financiamento.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Nome Fantasia da Loja
                  </label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Telefone WhatsApp (Exibição)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phoneDisplay}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phoneDisplay: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    WhatsApp Raw (Números com DDD)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappRaw}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappRaw: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Taxa Mensal Financiamento (%)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={settingsForm.monthlyRate}
                    onChange={(e) => setSettingsForm({ ...settingsForm, monthlyRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Ex: 0.0125 corresponde a 1,25% a.m.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Endereço do Showroom
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Texto do Banner Promocional
                </label>
                <input
                  type="text"
                  value={settingsForm.bannerText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bannerText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="showBannerCheck"
                  checked={settingsForm.showBanner}
                  onChange={(e) => setSettingsForm({ ...settingsForm, showBanner: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-blue-600"
                />
                <label htmlFor="showBannerCheck" className="text-xs text-slate-300 cursor-pointer">
                  Exibir banner de taxa promocional no topo do site
                </label>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/40 cursor-pointer"
                >
                  Salvar Alterações
                </button>

                {settingsSavedFeedback && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    Salvo com sucesso!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* DEDICATED PROMOTION MODAL (BOTTOM SHEET ON MOBILE) */}
      {isPromotionModalOpen && promotingVehicle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Grab Handle for mobile touch */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">
                    Configurar Promoção & Oferta
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate max-w-[220px]">
                    {promotingVehicle.brand} {promotingVehicle.model} ({promotingVehicle.year})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPromotionModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePromotion} className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block">Status da Promoção</span>
                  <span className="text-[11px] text-slate-400">
                    {promoActive ? 'Oferta ativa na vitrine' : 'Promoção desativada'}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={promoActive}
                    onChange={(e) => setPromoActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              {promoActive && (
                <>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Preço Original</span>
                      <span className="text-sm sm:text-base font-bold text-slate-300 line-through tabular-nums">
                        {formatBRL(promotingVehicle.price)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30">
                      <span className="text-[10px] text-rose-300 block font-semibold">Preço Promocional (R$)</span>
                      <input
                        type="number"
                        required
                        value={promoPrice}
                        onChange={(e) => setPromoPrice(Number(e.target.value))}
                        className="w-full bg-transparent text-sm sm:text-base font-extrabold text-rose-400 focus:outline-none tabular-nums"
                      />
                    </div>
                  </div>

                  {promoPrice < promotingVehicle.price && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="text-emerald-300">Desconto:</span>
                      <strong className="text-emerald-400 font-bold tabular-nums">
                        {formatBRL(promotingVehicle.price - promoPrice)} ({Math.round(((promotingVehicle.price - promoPrice) / promotingVehicle.price) * 100)}% OFF)
                      </strong>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                      Etiqueta da Oferta (Selo de Destaque)
                    </label>
                    <input
                      type="text"
                      value={promoBadge}
                      onChange={(e) => setPromoBadge(e.target.value)}
                      placeholder="Ex: Feirão Exclusivo, IPVA 2026 Grátis..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                    />

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['Super Feirão', 'IPVA 2026 Grátis', 'R$ 20.000 OFF', 'Transferência Grátis', 'Oferta da Semana'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setPromoBadge(tag)}
                          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPromotionModalOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-rose-950 cursor-pointer"
                >
                  Salvar Oferta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL MODAL: ADD / EDIT VEHICLE (FULL-HEIGHT BOTTOM SHEET ON MOBILE) */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {editingVehicleId ? 'Editar Veículo' : 'Novo Carro no Estoque'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Preencha os dados do veículo para a vitrine
                </p>
              </div>
              <button
                onClick={() => setIsVehicleModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets */}
            {!editingVehicleId && (
              <div className="mb-4 p-3 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-sky-400 flex items-center gap-1 w-full sm:w-auto">
                  <Sparkles className="w-3.5 h-3.5" />
                  Preencher rápido:
                </span>
                <button
                  type="button"
                  onClick={() => applyPreset('corolla')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded-lg cursor-pointer"
                >
                  Corolla
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('hilux')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded-lg cursor-pointer"
                >
                  Hilux SRX
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('bmw')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded-lg cursor-pointer"
                >
                  BMW 320i
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('tcross')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded-lg cursor-pointer"
                >
                  T-Cross
                </button>
              </div>
            )}

            <form onSubmit={handleSaveVehicle} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="Ex: BMW, Toyota..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    placeholder="Ex: 320i M Sport, Hilux..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Versão
                  </label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    placeholder="Ex: 2.0 Turbo ActiveFlex"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Ano Fabr.
                  </label>
                  <input
                    type="number"
                    value={formYear}
                    onChange={(e) => setFormYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Ano Modelo
                  </label>
                  <input
                    type="number"
                    value={formModelYear}
                    onChange={(e) => setFormModelYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-sky-400 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Quilometragem
                  </label>
                  <input
                    type="number"
                    value={formMileage}
                    onChange={(e) => setFormMileage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Promo Switch */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Promoção Ativa
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formIsPromotion}
                    onChange={(e) => setFormIsPromotion(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-rose-600 w-4 h-4 cursor-pointer"
                  />
                </div>

                {formIsPromotion && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                        Preço Promocional (R$)
                      </label>
                      <input
                        type="number"
                        value={formPromoPrice}
                        onChange={(e) => setFormPromoPrice(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-rose-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                        Texto da Etiqueta
                      </label>
                      <input
                        type="text"
                        value={formPromoBadge}
                        onChange={(e) => setFormPromoBadge(e.target.value)}
                        placeholder="Ex: Super Feirão"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Categoria
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as VehicleCategory)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Picape">Picape</option>
                    <option value="Esportivo">Esportivo</option>
                    <option value="Hatch">Hatch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Câmbio
                  </label>
                  <select
                    value={formTransmission}
                    onChange={(e) => setFormTransmission(e.target.value as TransmissionType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Automático">Automático</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Combustível
                  </label>
                  <select
                    value={formFuel}
                    onChange={(e) => setFormFuel(e.target.value as FuelType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Gasolina">Gasolina</option>
                    <option value="Flex">Flex</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Elétrico">Elétrico</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                    Cor
                  </label>
                  <input
                    type="text"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Foto Principal (Caminho ou URL)
                </label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="/src/assets/images/car_..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">
                  Opcionais (Separados por vírgula)
                </label>
                <textarea
                  rows={2}
                  value={formFeaturesText}
                  onChange={(e) => setFormFeaturesText(e.target.value)}
                  placeholder="Teto solar, Bancos em couro, Multimídia, Câmera 360..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-blue-600"
                  />
                  <span>Destacar na vitrine</span>
                </label>

                <div className="flex items-center gap-1.5">
                  <label className="text-[11px] text-slate-400">Status:</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as VehicleStatus)}
                    className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2 py-1"
                  >
                    <option value="available">Disponível</option>
                    <option value="reserved">Reservado</option>
                    <option value="sold">Vendido</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/40 cursor-pointer"
                >
                  Salvar Veículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
