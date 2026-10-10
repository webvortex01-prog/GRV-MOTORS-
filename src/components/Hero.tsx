import React, { useState } from 'react';
import { Search, Shield, Award, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { VehicleCategory } from '../types/vehicle';

interface HeroProps {
  onSearchSubmit: (params: { search: string; category: string; maxPrice: number }) => void;
  totalVehicles: number;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit, totalVehicles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600000);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      search: searchTerm,
      category: selectedCategory,
      maxPrice: maxPrice,
    });
    const estoqueEl = document.getElementById('estoque');
    if (estoqueEl) {
      estoqueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-slate-950">
      {/* Background Showroom Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_dealership_showroom_1791650627063.jpg"
          alt="GVR Gomes Veículos Showroom"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Subtle text kicker (no pill boxes) */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-sky-400 mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
            <span className="truncate">Estoque Premium de Seminovos</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 shrink-0">{totalVehicles} unidades</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display text-balance mb-4 sm:mb-6">
            Qualidade impecável, procedência e a chave do seu próximo carro.
          </h1>

          <p className="text-xs sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-6 sm:mb-10 text-balance">
            Na <strong className="text-white font-semibold">GVR Gomes Veículos</strong>, cada carro passa por uma rigorosa perícia cautelar com laudo 100% aprovado, histórico verificado e garantia de procedência.
          </p>

          {/* Integrated Quick Filter Box */}
          <form
            onSubmit={handleSearch}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {/* Keyword / Model input */}
              <div className="relative">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Marca ou Modelo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ex: BMW 320i, Hilux, Civic..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Carroceria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                >
                  <option value="all">Todas as Categorias</option>
                  <option value="SUV">SUVs</option>
                  <option value="Sedan">Sedans</option>
                  <option value="Picape">Picapes</option>
                  <option value="Esportivo">Esportivos</option>
                  <option value="Hatch">Hatches</option>
                </select>
              </div>

              {/* Price max slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Até R$ {maxPrice.toLocaleString('pt-BR')}
                  </label>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={600000}
                  step={20000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 mt-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Aprovação de crédito facilitada com ou sem entrada
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Estoque Disponível</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Proof Markers strip directly below */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Laudo Pericial 100%</p>
              <p className="text-xs text-slate-400">Estrutura e histórico certificados</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Até 1 Ano de Garantia</p>
              <p className="text-xs text-slate-400">Motor, câmbio e pós-venda</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Crédito Rápido</p>
              <p className="text-xs text-slate-400">Resposta em até 15 minutos</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Melhor Avaliação</p>
              <p className="text-xs text-slate-400">Pegamos seu usado na troca</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
