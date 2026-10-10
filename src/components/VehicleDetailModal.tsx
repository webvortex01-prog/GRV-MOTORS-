import React, { useState, useEffect } from 'react';
import { Vehicle, StoreSettings, LeadProposal } from '../types/vehicle';
import { formatBRL, formatKM, generateWhatsAppLink } from '../utils/storage';
import { FinancingSimulator } from './FinancingSimulator';
import {
  X,
  ShieldCheck,
  Check,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Zap,
  Printer,
  ChevronRight,
  ChevronLeft,
  Share2,
  Camera,
  Award,
  Sparkles,
  FileText
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  settings: StoreSettings;
  onClose: () => void;
  onLeadCreated: (lead: LeadProposal) => void;
  onPrintSticker?: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  settings,
  onClose,
  onLeadCreated,
  onPrintSticker,
}) => {
  if (!vehicle) return null;

  const images = vehicle.images && vehicle.images.length > 0
    ? vehicle.images
    : [
        '/src/assets/images/car_bmw_sedan_1791650639149.jpg',
        '/src/assets/images/car_interior_cockpit_luxury_1791653288890.jpg',
        '/src/assets/images/car_rear_tailgate_sports_1791653299080.jpg',
        '/src/assets/images/car_dashboard_screen_tech_1791653308126.jpg',
        '/src/assets/images/car_wheel_brake_detail_1791653317289.jpg',
        '/src/assets/images/car_seats_interior_1791653447749.jpg',
      ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'financing' | 'testdrive'>('details');
  const [testDriveName, setTestDriveName] = useState('');
  const [testDrivePhone, setTestDrivePhone] = useState('');
  const [testDriveDate, setTestDriveDate] = useState('');
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [tradeInDetails, setTradeInDetails] = useState('');
  const [submittedLead, setSubmittedLead] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-advance photos every 4s if on details tab, pause on user interaction
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrevPhoto = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const whatsappMessage = `Olá GVR Gomes Veículos! Estou interessado no ${vehicle.brand} ${vehicle.model} (${vehicle.year}/${vehicle.modelYear}) anunciado por ${formatBRL(vehicle.isPromotion && vehicle.promotionalPrice ? vehicle.promotionalPrice : vehicle.price)}. Gostaria de mais informações e proposta.`;
  const whatsappUrl = generateWhatsAppLink(settings.whatsappRaw, whatsappMessage);

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDriveName || !testDrivePhone) return;

    const newLead: LeadProposal = {
      id: `lead-td-${Date.now()}`,
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.brand} ${vehicle.model}`,
      vehiclePrice: vehicle.price,
      customerName: testDriveName,
      customerPhone: testDrivePhone,
      type: 'testdrive',
      notes: `Test-drive agendado para ${testDriveDate || 'a combinar'}. Tem carro na troca: ${hasTradeIn ? tradeInDetails : 'Não'}.`,
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    onLeadCreated(newLead);
    setSubmittedLead(true);

    const msg = `Olá! Meu nome é ${testDriveName}. Gostaria de agendar um test-drive no ${vehicle.brand} ${vehicle.model} (${vehicle.year}) na loja da GVR Gomes.
Data desejada: ${testDriveDate || 'A combinar'}
${hasTradeIn ? `Possuo carro na troca: ${tradeInDetails}` : 'Não possuo carro na troca'}`;
    const link = generateWhatsAppLink(settings.whatsappRaw, msg);
    setTimeout(() => {
      window.open(link, '_blank');
    }, 400);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex justify-center items-end sm:items-start p-0 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden min-h-[92vh] sm:min-h-0 sm:my-6 pb-24 sm:pb-0">
        {/* Sticky modal top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <button
              onClick={onClose}
              className="sm:hidden p-2 -ml-1 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 shrink-0">
              {vehicle.brand}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-sm font-bold text-white font-display truncate">
              {vehicle.model}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onPrintSticker && (
              <button
                onClick={() => onPrintSticker(vehicle)}
                title="Imprimir Cartaz de Para-brisa / Ficha"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60 hidden sm:flex items-center gap-1.5 text-xs"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden md:inline">Imprimir Ficha</span>
              </button>
            )}

            <button
              onClick={handleShare}
              title="Copiar Link"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="hidden sm:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6-Photo Main Interactive Slider */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[480px] w-full bg-slate-950 overflow-hidden select-none">
          <img
            key={activeImageIndex}
            src={images[activeImageIndex]}
            alt={`${vehicle.brand} ${vehicle.model} - Foto ${activeImageIndex + 1}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center animate-fadeIn transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30 pointer-events-none" />

          {/* Top Left: Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
            {vehicle.inspectionApproved && (
              <div className="bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Laudo Cautelar 100% Aprovado</span>
              </div>
            )}
            {vehicle.isPromotion && (
              <div className="bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg">
                {vehicle.promotionBadge || 'Oferta Especial'}
              </div>
            )}
          </div>

          {/* Top Right: Photo Index */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xl">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Foto {activeImageIndex + 1} de {images.length}</span>
          </div>

          {/* Prev/Next Navigation Controls */}
          <button
            type="button"
            onClick={handlePrevPhoto}
            aria-label="Foto anterior"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextPhoto}
            aria-label="Próxima foto"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Title & Price Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
                <span className="text-sky-400 font-bold uppercase">{vehicle.brand}</span>
                <span>·</span>
                <span>{vehicle.year}/{vehicle.modelYear}</span>
                <span>·</span>
                <span>{formatKM(vehicle.mileage)}</span>
                <span>·</span>
                <span>Final de Placa {vehicle.plateEnd}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display">
                {vehicle.model}
              </h2>
            </div>

            <div className="bg-slate-950/90 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-slate-800 shrink-0 text-left sm:text-right">
              <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider block">
                {vehicle.isPromotion && vehicle.promotionalPrice ? 'Preço de Oferta' : 'Preço à vista'}
              </span>
              {vehicle.isPromotion && vehicle.promotionalPrice && (
                <span className="text-xs text-slate-500 line-through tabular-nums block">
                  {formatBRL(vehicle.price)}
                </span>
              )}
              <span className={`text-2xl sm:text-3xl font-extrabold font-display tabular-nums ${
                vehicle.isPromotion ? 'text-rose-400' : 'text-sky-400'
              }`}>
                {formatBRL(vehicle.isPromotion && vehicle.promotionalPrice ? vehicle.promotionalPrice : vehicle.price)}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Thumbnails Horizontal Strip */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center gap-2.5 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">6 Fotos:</span>
          </span>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-sky-400 ring-2 ring-sky-500/50 scale-105'
                  : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0.5 right-1 text-[9px] font-bold bg-black/80 px-1 rounded text-white">
                {idx + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Tab navigation */}
        <div className="px-6 pt-4 border-b border-slate-800 flex items-center gap-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Descrição Completa & Opcionais</span>
          </button>
          <button
            onClick={() => setActiveTab('financing')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'financing'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Simular Financiamento</span>
          </button>
          <button
            onClick={() => setActiveTab('testdrive')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'testdrive'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Test-Drive & Proposta</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-8">
          {activeTab === 'details' && (
            <div className="space-y-8">
              {/* Full Detailed Vehicle Description */}
              <div className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Descrição do Veículo & Histórico de Procedência</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">Garantia GVR Gomes</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {vehicle.description}
                </p>

                {/* Trust Badges Bar */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Perícia Cautelar 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Garantia {vehicle.warrantyMonths} Meses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{vehicle.singleOwner ? 'Único Proprietário' : 'Histórico Completo'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>IPVA e Doc em Dia</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Especificações Técnicas
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Ano de Fabricação</span>
                    <span className="text-sm font-bold text-white tabular-nums">{vehicle.year}/{vehicle.modelYear}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Quilometragem</span>
                    <span className="text-sm font-bold text-white tabular-nums">{formatKM(vehicle.mileage)}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Motorização</span>
                    <span className="text-sm font-bold text-white truncate">{vehicle.engine}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Potência</span>
                    <span className="text-sm font-bold text-white">{vehicle.powerHp} cavalos</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Câmbio</span>
                    <span className="text-sm font-bold text-white">{vehicle.transmission}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Combustível</span>
                    <span className="text-sm font-bold text-white">{vehicle.fuel}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Cor Externa</span>
                    <span className="text-sm font-bold text-white">{vehicle.color}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <span className="text-[11px] text-slate-500 block">Final de Placa</span>
                    <span className="text-sm font-bold text-white">{vehicle.plateEnd}</span>
                  </div>
                </div>
              </div>

              {/* Factory Features & Equipment Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Itens de Série e Opcionais Inclusos
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                    >
                      <Check className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Negotiation Action Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">Gostou deste {vehicle.brand} {vehicle.model}?</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Fale agora diretamente com nossa equipe de vendas no WhatsApp da loja e tire todas as suas dúvidas.
                  </p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center gap-2 shrink-0 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Negociar no WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'financing' && (
            <div className="max-w-2xl mx-auto">
              <FinancingSimulator
                vehicles={[vehicle]}
                selectedVehicle={vehicle}
                settings={settings}
                onLeadCreated={onLeadCreated}
              />
            </div>
          )}

          {activeTab === 'testdrive' && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white font-display">
                  Agende seu Test-Drive na GVR Gomes
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Venha conhecer de perto o {vehicle.brand} {vehicle.model}. Deixamos o carro pronto e higienizado para sua visita.
                </p>
              </div>

              <form onSubmit={handleTestDriveSubmit} className="space-y-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={testDriveName}
                    onChange={(e) => setTestDriveName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (66) 99999-9999"
                    value={testDrivePhone}
                    onChange={(e) => setTestDrivePhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Data ou Turno Preferido
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Amanhã às 15:00 ou Sábado de manhã"
                    value={testDriveDate}
                    onChange={(e) => setTestDriveDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={hasTradeIn}
                      onChange={(e) => setHasTradeIn(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
                    />
                    <span>Tenho um veículo usado para dar de entrada</span>
                  </label>

                  {hasTradeIn && (
                    <input
                      type="text"
                      placeholder="Modelo, ano e km do seu usado (Ex: Corolla 2021 XEi, 45.000 km)"
                      value={tradeInDetails}
                      onChange={(e) => setTradeInDetails(e.target.value)}
                      className="mt-3 w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirmar Agendamento</span>
                </button>

                {submittedLead && (
                  <p className="text-xs text-emerald-400 text-center font-medium mt-2">
                    ✓ Solicitação enviada! Redirecionando para WhatsApp para confirmação de horário...
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Sticky Mobile Bottom Bar (iOS/Android Native Action Bar) */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 p-3 flex items-center gap-2 pb-[env(safe-area-inset-bottom,12px)] shadow-[0_-8px_20px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setActiveTab('financing')}
            className="flex-1 py-3 px-3 bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs rounded-xl border border-slate-700 text-center cursor-pointer"
          >
            Simular
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[2] py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Negociar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
