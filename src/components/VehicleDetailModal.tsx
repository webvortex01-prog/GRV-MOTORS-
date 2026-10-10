import React, { useState, useEffect } from 'react';
import { Vehicle, StoreSettings, LeadProposal } from '../types/vehicle';
import { formatBRL, formatKM, generateWhatsAppLink } from '../utils/storage';
import { FinancingSimulator } from './FinancingSimulator';
import {
  X,
  ArrowLeft,
  ShieldCheck,
  Check,
  MessageCircle,
  Calculator,
  Gauge,
  Fuel,
  Printer,
  ChevronRight,
  ChevronLeft,
  Share2,
  Camera,
  Award,
  Sparkles,
  Car,
  ChevronDown,
  ChevronUp
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
  const [showSimulator, setShowSimulator] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const effectivePrice = vehicle.isPromotion && vehicle.promotionalPrice
    ? vehicle.promotionalPrice
    : vehicle.price;

  const promoSuffix = vehicle.isPromotion && vehicle.promotionalPrice
    ? ` (EM OFERTA de ${formatBRL(vehicle.price)} por ${formatBRL(effectivePrice)})`
    : '';

  const whatsappMessage = `Olá GVR Gomes Veículos! Gostaria de mais detalhes sobre o ${vehicle.brand} ${vehicle.model} (${vehicle.year}/${vehicle.modelYear})${promoSuffix} anunciado por ${formatBRL(effectivePrice)}. Como podemos negociar?`;
  const whatsappUrl = generateWhatsAppLink(settings.whatsappRaw, whatsappMessage);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex justify-center items-start p-2 sm:p-4 md:p-6 animate-fadeIn cursor-pointer"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 cursor-default"
      >
        {/* Top Header with prominent back button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary Back Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer border border-slate-700 shadow-sm"
              title="Voltar para a lista de veículos"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              <span>Voltar ao Estoque</span>
            </button>

            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-sky-400">
              {vehicle.brand}
            </span>
            <span className="hidden sm:inline-block text-slate-600">·</span>
            <span className="hidden sm:inline-block text-xs font-bold text-white truncate max-w-xs font-display">
              {vehicle.model}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onPrintSticker && (
              <button
                type="button"
                onClick={() => onPrintSticker(vehicle)}
                title="Imprimir Cartaz de Para-brisa / Ficha"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60 hidden md:flex items-center gap-1.5 text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Ficha</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              title="Copiar Link"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close X Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/60"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. Car Image Section - Slightly Larger with 6 Photos & Navigation */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] max-h-[460px] w-full bg-slate-950 overflow-hidden select-none">
          <img
            key={activeImageIndex}
            src={images[activeImageIndex]}
            alt={`${vehicle.brand} ${vehicle.model} - Foto ${activeImageIndex + 1}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center animate-fadeIn"
          />

          {/* Photo Counter */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xl">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Foto {activeImageIndex + 1} de {images.length}</span>
          </div>

          {/* Status / Promotion Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {vehicle.isPromotion && (
              <span className="bg-gradient-to-r from-rose-600 to-amber-500 text-white font-extrabold text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                {vehicle.promotionBadge || 'Oferta Especial'}
              </span>
            )}
            {vehicle.inspectionApproved && (
              <span className="bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Periciado</span>
              </span>
            )}
          </div>

          {/* Prev/Next Buttons on the photo */}
          <button
            type="button"
            onClick={handlePrevPhoto}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextPhoto}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Thumbnails Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Fotos ({images.length}):</span>
          </span>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-12 w-18 sm:h-14 sm:w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
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

        {/* 2. Car Details & Description Section */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Main Title and Price Block */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                <span>{vehicle.brand}</span>
                <span className="text-slate-600">·</span>
                <span>{vehicle.category}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{vehicle.year}/{vehicle.modelYear}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {vehicle.model}
              </h1>
              {vehicle.version && (
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {vehicle.version}
                </p>
              )}
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-left sm:text-right shrink-0">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                {vehicle.isPromotion && vehicle.promotionalPrice ? 'Preço Promocional' : 'Valor à Vista'}
              </span>
              {vehicle.isPromotion && vehicle.promotionalPrice && (
                <span className="text-xs text-slate-500 line-through tabular-nums block">
                  {formatBRL(vehicle.price)}
                </span>
              )}
              <span className={`text-2xl sm:text-3xl font-extrabold font-display tabular-nums ${
                vehicle.isPromotion ? 'text-rose-400' : 'text-sky-400'
              }`}>
                {formatBRL(effectivePrice)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Aceitamos seu carro usado na troca
              </span>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-sky-400" />
              <span>Ficha Técnica do Veículo</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Ano Modelo</span>
                <span className="text-xs sm:text-sm font-bold text-white tabular-nums">{vehicle.year} / {vehicle.modelYear}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Quilometragem</span>
                <span className="text-xs sm:text-sm font-bold text-white tabular-nums">{formatKM(vehicle.mileage)}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Câmbio</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">{vehicle.transmission}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Combustível</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">{vehicle.fuel}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Motorização</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">{vehicle.engine || 'Standard'}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Potência</span>
                <span className="text-xs sm:text-sm font-bold text-white">{vehicle.powerHp} cv</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Cor Externa</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">{vehicle.color}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Final de Placa</span>
                <span className="text-xs sm:text-sm font-bold text-white">{vehicle.plateEnd}</span>
              </div>
            </div>
          </div>

          {/* Full Vehicle Description */}
          <div className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Descrição & Histórico do Carro</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {vehicle.description || 'Veículo impecável em excelente estado de conservação, periciado e com garantia de loja.'}
            </p>

            {/* Trust Points */}
            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Laudo Cautelar Aprovado</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Garantia de {vehicle.warrantyMonths || 12} Meses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{vehicle.singleOwner ? 'Único Dono' : 'Procedência Garantida'}</span>
              </div>
            </div>
          </div>

          {/* Factory Options & Features Checklist */}
          {vehicle.features && vehicle.features.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Opcionais & Equipamentos Inclusos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                  >
                    <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Bottom Actions & Simulator Section */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            {/* Primary Action Buttons Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar no WhatsApp Sobre Este Carro</span>
              </a>

              {/* Toggle Financing Simulation Button */}
              <button
                type="button"
                onClick={() => setShowSimulator(!showSimulator)}
                className="w-full sm:w-auto py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs sm:text-sm rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{showSimulator ? 'Ocultar Simulação' : 'Simular Financiamento'}</span>
                {showSimulator ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Back to list button */}
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3.5 px-5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs sm:text-sm rounded-xl transition-all border border-slate-800 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Estoque</span>
              </button>
            </div>

            {/* Expanded Simulator (only appears if user clicks "Simular Financiamento" down here!) */}
            {showSimulator && (
              <div className="pt-6 border-t border-slate-800/80 animate-fadeIn">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-sky-400" />
                    <span>Simulador de Financiamento para {vehicle.model}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ajuste o valor da entrada e veja uma estimativa de parcelas mensais.
                  </p>
                </div>
                <FinancingSimulator
                  vehicles={[vehicle]}
                  selectedVehicle={vehicle}
                  settings={settings}
                  onLeadCreated={onLeadCreated}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
