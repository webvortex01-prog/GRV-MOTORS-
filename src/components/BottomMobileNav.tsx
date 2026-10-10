import React from 'react';
import { Car, Flame, Calculator, LayoutDashboard, Store } from 'lucide-react';

interface BottomMobileNavProps {
  currentView: 'store' | 'admin';
  onViewChange: (view: 'store' | 'admin') => void;
  onFilterPromotions?: () => void;
  onScrollToSection: (sectionId: string) => void;
  unreadLeadsCount?: number;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  currentView,
  onViewChange,
  onFilterPromotions,
  onScrollToSection,
  unreadLeadsCount = 0,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
      <div className="grid grid-cols-4 items-center h-16 px-1">
        {/* Tab 1: Estoque */}
        <button
          onClick={() => {
            if (currentView !== 'store') {
              onViewChange('store');
            }
            onScrollToSection('estoque');
          }}
          className={`flex flex-col items-center justify-center h-full py-1 text-center transition-all cursor-pointer ${
            currentView === 'store' ? 'text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${currentView === 'store' ? 'bg-sky-500/10' : ''}`}>
            <Car className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Estoque</span>
        </button>

        {/* Tab 2: Ofertas */}
        <button
          onClick={() => {
            if (currentView !== 'store') {
              onViewChange('store');
            }
            if (onFilterPromotions) {
              onFilterPromotions();
            } else {
              onScrollToSection('estoque');
            }
          }}
          className="flex flex-col items-center justify-center h-full py-1 text-center text-rose-400 hover:text-rose-300 transition-all cursor-pointer relative"
        >
          <div className="p-1 rounded-xl bg-rose-500/10">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-semibold">Ofertas</span>
          <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </button>

        {/* Tab 3: Simulador */}
        <button
          onClick={() => {
            if (currentView !== 'store') {
              onViewChange('store');
            }
            onScrollToSection('simulador');
          }}
          className="flex flex-col items-center justify-center h-full py-1 text-center text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
        >
          <div className="p-1 rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Simular</span>
        </button>

        {/* Tab 4: Painel Admin */}
        <button
          onClick={() => {
            onViewChange(currentView === 'admin' ? 'store' : 'admin');
          }}
          className={`flex flex-col items-center justify-center h-full py-1 text-center transition-all cursor-pointer relative ${
            currentView === 'admin' ? 'text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${currentView === 'admin' ? 'bg-sky-500/10 text-sky-400' : ''}`}>
            {currentView === 'admin' ? <Store className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">
            {currentView === 'admin' ? 'Ver Site' : 'Admin'}
          </span>
          {unreadLeadsCount > 0 && (
            <span className="absolute top-1.5 right-4 px-1.5 py-0.2 bg-red-500 text-white text-[9px] font-black rounded-full shadow-sm">
              {unreadLeadsCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
