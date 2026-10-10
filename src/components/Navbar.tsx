import React from 'react';
import { GvrLogo } from './GvrLogo';
import { StoreSettings } from '../types/vehicle';
import { ShieldCheck, PhoneCall, LayoutDashboard, Store, HelpCircle } from 'lucide-react';

interface NavbarProps {
  settings: StoreSettings;
  currentView: 'store' | 'admin';
  onViewChange: (view: 'store' | 'admin') => void;
  onOpenTutorial: () => void;
  unreadLeadsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  currentView,
  onViewChange,
  onOpenTutorial,
  unreadLeadsCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top Banner Notice if enabled */}
      {settings.showBanner && (
        <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900 text-white text-[11px] sm:text-xs font-medium px-3 py-1.5 text-center flex items-center justify-center gap-1.5 border-b border-blue-500/30 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-300 shrink-0" />
          <span className="truncate">{settings.bannerText}</span>
        </div>
      )}

      {/* Main Top Bar strictly fulfilling the 3-zone contract */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand Wordmark / Logo */}
        <div 
          onClick={() => onViewChange('store')}
          className="cursor-pointer flex items-center gap-2 sm:gap-3 shrink-0 group"
        >
          <GvrLogo variant="compact" size="sm" showPhone={false} className="scale-90 sm:scale-100 origin-left" />
        </div>

        {/* Zone 2: 4-5 concise single-line nav links (desktop only) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-300">
          <a
            href="#estoque"
            onClick={(e) => {
              if (currentView !== 'store') {
                e.preventDefault();
                onViewChange('store');
                setTimeout(() => {
                  document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Estoque Seminovos
          </a>
          <a
            href="#simulador"
            onClick={(e) => {
              if (currentView !== 'store') {
                e.preventDefault();
                onViewChange('store');
                setTimeout(() => {
                  document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Simulador
          </a>
          <a
            href="#avaliacao"
            onClick={(e) => {
              if (currentView !== 'store') {
                e.preventDefault();
                onViewChange('store');
                setTimeout(() => {
                  document.getElementById('avaliacao')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Avalie seu Carro
          </a>
          <a
            href="#diferenciais"
            onClick={(e) => {
              if (currentView !== 'store') {
                e.preventDefault();
                onViewChange('store');
                setTimeout(() => {
                  document.getElementById('diferenciais')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Diferenciais
          </a>
          <a
            href="#contato"
            onClick={(e) => {
              if (currentView !== 'store') {
                e.preventDefault();
                onViewChange('store');
                setTimeout(() => {
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Atendimento
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Tutorial Button */}
          <button
            onClick={onOpenTutorial}
            title="Guia do Painel & Como Funciona"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Tutorial do Painel</span>
            <span className="sm:hidden">Guia</span>
          </button>

          {/* Mode Switch (Site <-> Admin) */}
          <button
            onClick={() => onViewChange(currentView === 'store' ? 'admin' : 'store')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer active:scale-95 ${
              currentView === 'admin'
                ? 'bg-slate-800 text-sky-400 border border-sky-500/40 hover:bg-slate-700'
                : 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-500 hover:to-sky-400 shadow-blue-900/30'
            }`}
          >
            {currentView === 'admin' ? (
              <>
                <Store className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Voltar ao Site</span>
                <span className="sm:hidden">Site</span>
              </>
            ) : (
              <>
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Admin</span>
                {unreadLeadsCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-red-500 text-white text-[10px] font-black rounded-full">
                    {unreadLeadsCount}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
