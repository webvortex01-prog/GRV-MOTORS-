import React, { useState, useMemo } from 'react';
import { Vehicle, StoreSettings } from '../types/vehicle';
import { VehicleCard } from './VehicleCard';
import { Filter, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';

interface VehicleCatalogProps {
  vehicles: Vehicle[];
  settings: StoreSettings;
  onSelectVehicle: (vehicle: Vehicle) => void;
  initialSearch?: string;
  initialCategory?: string;
  initialMaxPrice?: number;
}

export const VehicleCatalog: React.FC<VehicleCatalogProps> = ({
  vehicles,
  settings,
  onSelectVehicle,
  initialSearch = '',
  initialCategory = 'all',
  initialMaxPrice = 600000,
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [transmission, setTransmission] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'yearDesc' | 'kmAsc'>('featured');

  // Extract unique brands from inventory
  const uniqueBrands = useMemo(() => {
    const brands = new Set(vehicles.map((v) => v.brand));
    return ['all', ...Array.from(brands)];
  }, [vehicles]);

  // Categories list
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'promotions', label: '🔥 Em Oferta' },
    { id: 'SUV', label: 'SUVs' },
    { id: 'Sedan', label: 'Sedans' },
    { id: 'Picape', label: 'Picapes' },
    { id: 'Esportivo', label: 'Esportivos' },
    { id: 'Hatch', label: 'Hatches' },
  ];

  // Filtering
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((car) => {
        // Category / Promotions filter
        if (category === 'promotions' && (!car.isPromotion || !car.promotionalPrice)) return false;
        if (category !== 'all' && category !== 'promotions' && car.category !== category) return false;
        // Brand
        if (selectedBrand !== 'all' && car.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        // Price
        if (car.price > maxPrice) return false;
        // Transmission
        if (transmission !== 'all' && car.transmission !== transmission) return false;
        // Text search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = `${car.brand} ${car.model}`.toLowerCase().includes(q);
          const matchEngine = (car.engine || '').toLowerCase().includes(q);
          const matchFeatures = car.features.some((f) => f.toLowerCase().includes(q));
          if (!matchTitle && !matchEngine && !matchFeatures) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        if (sortBy === 'yearDesc') return b.year - a.year;
        if (sortBy === 'kmAsc') return a.mileage - b.mileage;
        // Featured default
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [vehicles, category, selectedBrand, maxPrice, transmission, search, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('all');
    setSelectedBrand('all');
    setMaxPrice(600000);
    setTransmission('all');
    setSortBy('featured');
  };

  return (
    <section id="estoque" className="py-16 sm:py-24 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              <span>Catálogo Oficial</span>
              <span aria-hidden="true">·</span>
              <span>GVR Gomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Nosso Estoque de Seminovos
            </h2>
          </div>

          {/* Interactive Category Tabs (Button segmented controls complying with zero-pill rule) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  category === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar and controls */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Filtrar por texto
              </label>
              <input
                type="text"
                placeholder="Ex: Turbo, Teto solar, Couro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Marca
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="all">Todas as Marcas</option>
                {uniqueBrands.filter((b) => b !== 'all').map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Câmbio
              </label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="all">Todos os Câmbios</option>
                <option value="Automático">Automático</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            {/* Sort order */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Ordenar Por
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="featured">Destaques Primeiro</option>
                  <option value="priceAsc">Menor Preço</option>
                  <option value="priceDesc">Maior Preço</option>
                  <option value="yearDesc">Ano mais recente</option>
                  <option value="kmAsc">Menor Quilometragem</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active summary & reset */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800 text-xs">
            <span className="text-slate-400">
              Mostrando <strong className="text-white font-semibold tabular-nums">{filteredVehicles.length}</strong> de <strong className="text-white font-semibold tabular-nums">{vehicles.length}</strong> seminovos disponíveis
            </span>

            {(search || category !== 'all' || selectedBrand !== 'all' || transmission !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                settings={settings}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 max-w-lg mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Nenhum veículo encontrado
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Nenhum carro do estoque corresponde aos filtros selecionados no momento. Tente relaxar sua busca.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Ver Todo o Estoque
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
