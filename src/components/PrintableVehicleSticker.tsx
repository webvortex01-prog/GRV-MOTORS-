import React from 'react';
import { Vehicle, StoreSettings } from '../types/vehicle';
import { formatBRL, formatKM } from '../utils/storage';
import { GvrLogo } from './GvrLogo';
import { Printer, X, ShieldCheck } from 'lucide-react';

interface PrintableVehicleStickerProps {
  vehicle: Vehicle;
  settings: StoreSettings;
  onClose: () => void;
}

export const PrintableVehicleSticker: React.FC<PrintableVehicleStickerProps> = ({
  vehicle,
  settings,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex justify-center items-start p-4 backdrop-blur-sm">
      {/* Control bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Cartaz</span>
        </button>
        <button
          onClick={onClose}
          className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl shadow-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Printable Sheet (A4 format) */}
      <div className="w-full max-w-[800px] bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8 p-8 border border-slate-300">
        {/* Header with official GVR Logo */}
        <div className="flex items-center justify-between border-b-2 border-blue-900 pb-6 mb-6">
          <div className="scale-90 origin-left">
            <GvrLogo size="md" showPhone={true} />
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
              Cartaz Oficial de Para-brisa
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {settings.city} - {settings.state}
            </span>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              WhatsApp: {settings.phoneDisplay}
            </div>
          </div>
        </div>

        {/* Vehicle Main Headline */}
        <div className="text-center my-6">
          <span className="text-sm font-bold tracking-widest uppercase text-blue-700">
            {vehicle.brand}
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
            {vehicle.model}
          </h1>
          {vehicle.version && (
            <p className="text-base text-slate-600 font-medium mt-1">
              {vehicle.version}
            </p>
          )}
        </div>

        {/* Big Price Plaque */}
        <div className={`my-6 p-6 rounded-2xl text-center shadow-inner ${
          vehicle.isPromotion && vehicle.promotionalPrice
            ? 'bg-gradient-to-r from-red-800 via-rose-700 to-red-900 text-white'
            : 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white'
        }`}>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-widest text-sky-200 block font-bold">
              {vehicle.isPromotion && vehicle.promotionalPrice ? `★ OFERTA ESPECIAL: ${vehicle.promotionBadge || 'PREÇO PROMOCIONAL'} ★` : 'Valor à Vista'}
            </span>
          </div>
          {vehicle.isPromotion && vehicle.promotionalPrice && (
            <div className="text-sm line-through text-slate-300 mt-1">
              De {formatBRL(vehicle.price)} por:
            </div>
          )}
          <div className="text-5xl font-black font-display tracking-tight mt-1">
            {formatBRL(vehicle.isPromotion && vehicle.promotionalPrice ? vehicle.promotionalPrice : vehicle.price)}
          </div>
          <p className="text-xs text-sky-100 mt-1">
            Financiamento com as melhores taxas do mercado · Entrada facilitada
          </p>
        </div>

        {/* Primary Specs Badges */}
        <div className="grid grid-cols-4 gap-3 my-6 text-center">
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Ano</span>
            <span className="text-lg font-extrabold text-slate-900">{vehicle.year}/{vehicle.modelYear}</span>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">KM</span>
            <span className="text-lg font-extrabold text-slate-900">{formatKM(vehicle.mileage)}</span>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Câmbio</span>
            <span className="text-lg font-extrabold text-slate-900">{vehicle.transmission}</span>
          </div>
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Combustível</span>
            <span className="text-lg font-extrabold text-slate-900">{vehicle.fuel}</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="my-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1 mb-3">
            Destaques e Opcionais
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
            {vehicle.features.slice(0, 8).map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees Strip */}
        <div className="mt-8 pt-4 border-t-2 border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <span className="font-bold text-slate-900">Laudo Pericial Cautelar 100% Aprovado</span>
          </div>
          <div className="font-semibold text-slate-900">
            Garantia de {vehicle.warrantyMonths} Meses GVR Gomes
          </div>
          <div className="font-mono text-slate-500 text-[11px]">
            Final de Placa: {vehicle.plateEnd}
          </div>
        </div>

        {/* Store footer info */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400">
          {settings.storeName} · {settings.address} · Tel/WhatsApp: {settings.phoneDisplay}
        </div>
      </div>
    </div>
  );
};
