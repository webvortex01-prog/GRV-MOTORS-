import React, { useState } from 'react';
import { StoreSettings, LeadProposal } from '../types/vehicle';
import { generateWhatsAppLink } from '../utils/storage';
import { Car, Send, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

interface TradeInEvaluationProps {
  settings: StoreSettings;
  onLeadCreated: (lead: LeadProposal) => void;
}

export const TradeInEvaluation: React.FC<TradeInEvaluationProps> = ({
  settings,
  onLeadCreated,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMileage, setCarMileage] = useState('');
  const [condition, setCondition] = useState('Excelente');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !carModel) return;

    const newLead: LeadProposal = {
      id: `lead-trade-${Date.now()}`,
      customerName,
      customerPhone,
      type: 'tradein',
      tradeInCar: {
        brand: carBrand || 'Não informada',
        model: carModel,
        year: Number(carYear) || new Date().getFullYear(),
        mileage: Number(carMileage) || 0,
      },
      notes: `Condição declarada: ${condition}. Observações: ${notes}`,
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    onLeadCreated(newLead);
    setSuccess(true);

    const msg = `Olá GVR Gomes! Gostaria de uma avaliação para venda ou troca do meu veículo:
Proprietário: ${customerName}
Veículo: ${carBrand} ${carModel} (${carYear})
Quilometragem: ${carMileage} km
Estado: ${condition}
${notes ? `Detalhes: ${notes}` : ''}`;

    const link = generateWhatsAppLink(settings.whatsappRaw, msg);
    setTimeout(() => {
      window.open(link, '_blank');
    }, 400);
  };

  return (
    <section id="avaliacao" className="py-12 sm:py-20 lg:py-24 bg-slate-900 border-t border-b border-slate-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2 sm:mb-3">
              <Car className="w-4 h-4" />
              <span>Avaliação Justa & Transparente</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight mb-3 sm:mb-4 text-balance">
              Quer vender ou trocar seu carro usado?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed text-balance">
              Na <strong className="text-white font-semibold">GVR Gomes Veículos</strong>, pagamos o melhor valor de mercado pelo seu seminovo. Aceitamos seu carro na troca com troco na mão ou quitamos seu financiamento atual na hora.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Avaliação Baseada na Tabela FIPE</h4>
                  <p className="text-xs text-slate-400">Proposta realista de acordo com a conservação e histórico do seu veículo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Troca com Troco</h4>
                  <p className="text-xs text-slate-400">Se o seu carro for de maior valor, depositamos a diferença via PIX no mesmo dia.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Evaluation Form */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Envie os Dados do Seu Carro
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Preencha os campos abaixo para receber nossa proposta de compra em minutos no WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(66) 99999-9999"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Marca
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Toyota, Honda, VW..."
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Modelo e Versão *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Corolla XEi 2.0"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Ano / Modelo
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 2021/2022"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Quilometragem Aproximada
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 48000"
                    value={carMileage}
                    onChange={(e) => setCarMileage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Estado de Conservação
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Excelente (Impecável, sem detalhes)">Excelente (Impecável, sem detalhes)</option>
                    <option value="Muito Bom (Pequenos desgastes de uso)">Muito Bom (Pequenos desgastes de uso)</option>
                    <option value="Bom (Precisa de pequenos reparos)">Bom (Precisa de pequenos reparos)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Observações / Carro que deseja levar na troca
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Possui manual e chave reserva, todas as revisões em dia. Gostaria de trocar pela Hilux do estoque."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Avaliação Imediata</span>
              </button>

              {success && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Proposta enviada para nossa mesa de compras! Abrindo WhatsApp...</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
