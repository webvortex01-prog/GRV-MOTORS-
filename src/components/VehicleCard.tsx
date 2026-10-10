import React, { useState, useEffect } from 'react';
import { Vehicle, StoreSettings } from '../types/vehicle';
import { formatBRL, formatKM, calculateInstallment, generateWhatsAppLink } from '../utils/storage';
import {
  Fuel,
  Gauge,
  ShieldCheck,
  MessageCircle,
  Eye,
  Flame,
  ChevronLeft,
  ChevronRight,
  Camera,
  Info
} from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  settings: StoreSettings;
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  settings,
  onSelect,
}) => {
  // Ensure we have at least 6 photos for the carousel
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
  const [isPaused, setIsPaused] = useState(false);

  // Automatic photo slide transition every 3.2 seconds
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleSelectDot = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setActiveImageIndex(idx);
  };

  // Effective price (considering active promotion)
  const isPromo = Boolean(vehicle.isPromotion && vehicle.promotionalPrice);
  const effectivePrice = isPromo && vehicle.promotionalPrice ? vehicle.promotionalPrice : vehicle.price;

  // Estimated financing installment (30% down payment, 48x)
  const downPayment = effectivePrice * 0.3;
  const loanAmount = effectivePrice - downPayment;
  const estimatedMonthly = Math.round(calculateInstallment(loanAmount, settings.monthlyRate, 48));

  const currentPhoto = images[activeImageIndex] || images[0];

  const promoSuffix = isPromo ? ` (EM OFERTA de ${formatBRL(vehicle.price)} por ${formatBRL(effectivePrice)})` : '';
  const whatsappMessage = `Olá! Gostaria de mais informações sobre o ${vehicle.brand} ${vehicle.model} (${vehicle.year}/${vehicle.modelYear})${promoSuffix} anunciado na GVR Gomes Veículos.`;
  const whatsappUrl = generateWhatsAppLink(settings.whatsappRaw, whatsappMessage);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800/90 overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-950/40 transition-all duration-300"
    >
      {/* Expanded photo space with automatic carousel & controls */}
      <div
        onClick={() => onSelect(vehicle)}
        className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 cursor-pointer select-none"
        title="Clique na foto para ver a galeria completa e especificações"
      >
        <img
          key={activeImageIndex}
          src={currentPhoto}
          alt={`${vehicle.brand} ${vehicle.model} - Foto ${activeImageIndex + 1}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 animate-fadeIn"
        />

        {/* Subtle gradient vignette at top and bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {vehicle.status === 'reserved' && (
              <div className="bg-amber-500/90 backdrop-blur-md text-slate-950 font-bold text-xs px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                Reservado
              </div>
            )}
            {vehicle.status === 'sold' && (
              <div className="bg-red-600/90 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                Vendido
              </div>
            )}

            {isPromo && vehicle.status === 'available' && (
              <div className="bg-gradient-to-r from-rose-600 to-orange-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>{vehicle.promotionBadge || 'Oferta Especial'}</span>
              </div>
            )}

            {!isPromo && vehicle.featured && vehicle.status === 'available' && (
              <div className="bg-blue-600/90 backdrop-blur-md text-white font-semibold text-xs px-2.5 py-1 rounded-md shadow-md">
                Destaque
              </div>
            )}
          </div>

          {/* Photo Counter Pill (shows 1/6, 2/6, etc) */}
          <div className="bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow-md pointer-events-auto">
            <Camera className="w-3 h-3 text-sky-400" />
            <span>{activeImageIndex + 1}/{images.length} Fotos</span>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          type="button"
          onClick={handlePrevPhoto}
          aria-label="Foto anterior"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleNextPhoto}
          aria-label="Próxima foto"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots Navigator at Bottom of Photo */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => handleSelectDot(e, idx)}
              className={`rounded-full transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? 'w-5 h-1.5 bg-sky-400 shadow-sm'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
              title={`Ver foto ${idx + 1}`}
              aria-label={`Ver foto ${idx + 1}`}
            />
          ))}
        </div>

        {/* Inspection guarantee seal */}
        {vehicle.inspectionApproved && (
          <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md text-sky-400 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-sky-500/30 flex items-center gap-1 z-10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Periciado 100%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Unboxed metadata with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
          <span className="text-sky-400 font-semibold uppercase">{vehicle.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{vehicle.year}/{vehicle.modelYear}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{formatKM(vehicle.mileage)}</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1 cursor-pointer font-display"
        >
          {vehicle.model}
        </h3>

        {/* Version / Subtitle */}
        {vehicle.version && (
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            {vehicle.version}
          </p>
        )}

        {/* Short description preview */}
        {vehicle.description && (
          <p
            onClick={() => onSelect(vehicle)}
            className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed cursor-pointer hover:text-white transition-colors"
            title="Clique para ler a descrição completa"
          >
            {vehicle.description}
          </p>
        )}

        {/* Specs highlights */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <Gauge className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Fuel className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{vehicle.fuel}</span>
          </div>
        </div>

        {/* Price & Installment */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {isPromo ? 'Preço promocional' : 'Valor à vista'}
            </span>
            {isPromo && (
              <span className="text-xs text-slate-500 line-through tabular-nums">
                {formatBRL(vehicle.price)}
              </span>
            )}
          </div>

          <div
            className={`text-2xl font-extrabold font-display tabular-nums tracking-tight ${
              isPromo ? 'text-rose-400' : 'text-white'
            }`}
          >
            {formatBRL(effectivePrice)}
          </div>

          <div className="text-[11px] text-slate-400 mt-0.5">
            ou entrada + 48x de <strong className="text-sky-400 font-semibold">{formatBRL(estimatedMonthly)}</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(vehicle)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-slate-700"
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>Saber Mais</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm shadow-emerald-950"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Negociar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
