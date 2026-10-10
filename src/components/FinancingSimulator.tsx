import React, { useState } from 'react';
import { Vehicle, StoreSettings, LeadProposal } from '../types/vehicle';
import { formatBRL, calculateInstallment, generateWhatsAppLink } from '../utils/storage';
import { Calculator, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FinancingSimulatorProps {
  vehicles: Vehicle[];
  settings: StoreSettings;
  selectedVehicle?: Vehicle | null;
  onLeadCreated: (lead: LeadProposal) => void;
}

export const FinancingSimulator: React.FC<FinancingSimulatorProps> = ({
  vehicles,
  settings,
  selectedVehicle = null,
  onLeadCreated,
}) => {
  const [currentVehicleId, setCurrentVehicleId] = useState<string>(
    selectedVehicle?.id || (vehicles[0]?.id || '')
  );
  const [customPrice, setCustomPrice] = useState<number>(
    selectedVehicle?.price || (vehicles[0]?.price || 200000)
  );
  const [downPayment, setDownPayment] = useState<number>(
    Math.round((selectedVehicle?.price || vehicles[0]?.price || 200000) * 0.3)
  );
  const [months, setMonths] = useState<number>(48);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCpf, setCustomerCpf] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Effective price (considers promotion)
  const getVehiclePrice = (v: Vehicle | null | undefined) => {
    if (!v) return customPrice;
    return (v.isPromotion && v.promotionalPrice) ? v.promotionalPrice : v.price;
  };

  const activeVehicle = vehicles.find((v) => v.id === currentVehicleId) || selectedVehicle;
  const targetPrice = getVehiclePrice(activeVehicle);

  // Calculation
  const loanAmount = Math.max(0, targetPrice - downPayment);
  const monthlyPayment = Math.round(calculateInstallment(loanAmount, settings.monthlyRate, months));
  const downPaymentPercent = targetPrice > 0 ? Math.round((downPayment / targetPrice) * 100) : 0;

  const handleVehicleChange = (id: string) => {
    setCurrentVehicleId(id);
    const found = vehicles.find((v) => v.id === id);
    if (found) {
      const price = (found.isPromotion && found.promotionalPrice) ? found.promotionalPrice : found.price;
      const defaultDown = Math.round(price * 0.3);
      setDownPayment(defaultDown);
    }
  };

  const handleDownPercentChange = (percent: number) => {
    const val = Math.round(targetPrice * (percent / 100));
    setDownPayment(val);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newLead: LeadProposal = {
      id: `lead-${Date.now()}`,
      vehicleId: activeVehicle?.id,
      vehicleName: activeVehicle ? `${activeVehicle.brand} ${activeVehicle.model}` : 'Simulação Geral',
      vehiclePrice: targetPrice,
      customerName,
      customerPhone,
      customerCpf,
      type: 'financing',
      downPayment,
      installments: months,
      monthlyEstimate: monthlyPayment,
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    onLeadCreated(newLead);
    setFeedbackSuccess(true);

    // Build WhatsApp message
    const carText = activeVehicle ? `${activeVehicle.brand} ${activeVehicle.model} (${activeVehicle.year})` : 'veículo seminovo';
    const msg = `Olá! Meu nome é ${customerName}. Gostaria de simular o financiamento do ${carText} no valor de ${formatBRL(targetPrice)}.
Entrada: ${formatBRL(downPayment)} (${downPaymentPercent}%)
Parcelamento: ${months}x de aprox. ${formatBRL(monthlyPayment)}
Telefone: ${customerPhone}`;

    const link = generateWhatsAppLink(settings.whatsappRaw, msg);
    setTimeout(() => {
      window.open(link, '_blank');
    }, 400);
  };

  return (
    <div className="bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-sky-400 shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-xl font-bold text-white font-display">
            Simulador de Financiamento Automotivo
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Calcule sua parcela personalizada com taxas a partir de {(settings.monthlyRate * 100).toFixed(2)}% a.m.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left column: Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Select vehicle */}
          {!selectedVehicle && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Selecione o Veículo do Estoque
              </label>
              <select
                value={currentVehicleId}
                onChange={(e) => handleVehicleChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.model} ({v.year}) - {formatBRL(v.price)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Vehicle price summary */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-400">Valor do Veículo</span>
              <p className="text-lg font-bold text-white font-display">
                {activeVehicle ? `${activeVehicle.brand} ${activeVehicle.model}` : 'Veículo Selecionado'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Preço à vista</span>
              <p className="text-xl font-extrabold text-sky-400 font-display tabular-nums">
                {formatBRL(targetPrice)}
              </p>
            </div>
          </div>

          {/* Down payment control */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Valor da Entrada
              </label>
              <span className="text-sm font-bold text-white tabular-nums">
                {formatBRL(downPayment)} ({downPaymentPercent}%)
              </span>
            </div>

            {/* Quick percent buttons */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[0, 20, 30, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => handleDownPercentChange(pct)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    downPaymentPercent === pct
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {pct === 0 ? 'Sem entrada' : `${pct}%`}
                </button>
              ))}
            </div>

            <input
              type="range"
              min={0}
              max={targetPrice * 0.8}
              step={1000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>R$ 0</span>
              <span>{formatBRL(targetPrice * 0.8)} (máx 80%)</span>
            </div>
          </div>

          {/* Installments options */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Prazo de Financiamento
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setMonths(term)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    months === term
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-sky-400 shadow-md shadow-blue-900/40'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {term}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Results & Send proposal */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 rounded-2xl border border-slate-800/90 p-5 sm:p-6">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Resultado Estimado
            </span>
            <div className="mt-3 p-4 rounded-xl bg-blue-950/30 border border-blue-500/20">
              <span className="text-xs text-sky-300">Valor da Parcela ({months}x)</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums tracking-tight mt-1">
                {formatBRL(monthlyPayment)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Primeira parcela para até 60 dias após a aprovação
              </p>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Valor Financiado:</span>
                <span className="text-white font-semibold tabular-nums">{formatBRL(loanAmount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span>Taxa de Juros Estimada:</span>
                <span className="text-white font-semibold">{(settings.monthlyRate * 100).toFixed(2)}% a.m.</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Bancos Parceiros:</span>
                <span className="text-white font-medium">Santander, BV, Bradesco, Itaú</span>
              </div>
            </div>
          </div>

          {/* Quick Lead Form */}
          <form onSubmit={handleSubmitLead} className="mt-6 pt-5 border-t border-slate-800 space-y-3">
            <p className="text-xs font-semibold text-white">
              Quer aprovar essa parcela no seu CPF?
            </p>

            <input
              type="text"
              required
              placeholder="Seu nome completo"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />

            <input
              type="tel"
              required
              placeholder="WhatsApp com DDD (Ex: 66 99999-9999)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Simulação no WhatsApp</span>
            </button>

            {feedbackSuccess && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Simulação registrada! Abrindo conversa com nossa equipe...</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
