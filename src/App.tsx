import React, { useState, useEffect } from 'react';
import { Vehicle, LeadProposal, StoreSettings } from './types/vehicle';
import {
  getStoredVehicles,
  saveVehicles,
  getStoredSettings,
  saveSettings,
  getStoredLeads,
  saveLeads,
  resetToDefaults,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleCatalog } from './components/VehicleCatalog';
import { FinancingSimulator } from './components/FinancingSimulator';
import { TradeInEvaluation } from './components/TradeInEvaluation';
import { DifferentialsSection } from './components/DifferentialsSection';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { PrintableVehicleSticker } from './components/PrintableVehicleSticker';
import { AdminPanel } from './components/AdminPanel';
import { AdminTutorialModal } from './components/AdminTutorialModal';
import { BottomMobileNav } from './components/BottomMobileNav';
import { Footer } from './components/Footer';
import { MessageCircle, HelpCircle } from 'lucide-react';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(getStoredSettings());
  const [leads, setLeads] = useState<LeadProposal[]>([]);
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [printingVehicle, setPrintingVehicle] = useState<Vehicle | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  // Search parameters passed from Hero to Catalog
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [catalogMaxPrice, setCatalogMaxPrice] = useState(600000);

  // Initial load
  useEffect(() => {
    const loadedVehicles = getStoredVehicles();
    const loadedSettings = getStoredSettings();
    const loadedLeads = getStoredLeads();
    setVehicles(loadedVehicles);
    setSettings(loadedSettings);
    setLeads(loadedLeads);
    // Guia sempre abre diretamente na entrada conforme solicitado
    setIsTutorialOpen(true);
  }, []);

  // Update handlers with persistence
  const handleUpdateVehicles = (updated: Vehicle[]) => {
    setVehicles(updated);
    saveVehicles(updated);
  };

  const handleUpdateSettings = (updated: StoreSettings) => {
    setSettings(updated);
    saveSettings(updated);
  };

  const handleUpdateLeads = (updated: LeadProposal[]) => {
    setLeads(updated);
    saveLeads(updated);
  };

  const handleCreateLead = (newLead: LeadProposal) => {
    const updated = [newLead, ...leads];
    setLeads(updated);
    saveLeads(updated);
  };

  const handleResetData = () => {
    const defaultData = resetToDefaults();
    setVehicles(defaultData.vehicles);
    setSettings(defaultData.settings);
    setLeads(defaultData.leads);
  };

  const handleHeroSearch = (params: { search: string; category: string; maxPrice: number }) => {
    setCatalogSearch(params.search);
    setCatalogCategory(params.category);
    setCatalogMaxPrice(params.maxPrice);
  };

  const unreadLeadsCount = leads.filter((l) => l.status === 'novo').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar
        settings={settings}
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        unreadLeadsCount={unreadLeadsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'store' ? (
          <>
            {/* 1. Hero Showcase with search */}
            <Hero
              onSearchSubmit={handleHeroSearch}
              totalVehicles={vehicles.filter((v) => v.status === 'available').length}
            />

            {/* 2. Inventory Catalog */}
            <VehicleCatalog
              vehicles={vehicles}
              settings={settings}
              onSelectVehicle={(v) => setSelectedVehicle(v)}
              initialSearch={catalogSearch}
              initialCategory={catalogCategory}
              initialMaxPrice={catalogMaxPrice}
            />

            {/* 3. Financing Simulator Section */}
            <section id="simulador" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800/80 scroll-mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FinancingSimulator
                  vehicles={vehicles.filter((v) => v.status === 'available')}
                  settings={settings}
                  onLeadCreated={handleCreateLead}
                />
              </div>
            </section>

            {/* 4. Trade-In Evaluation Section */}
            <TradeInEvaluation
              settings={settings}
              onLeadCreated={handleCreateLead}
            />

            {/* 5. Trust & Quality Differentials */}
            <DifferentialsSection />
          </>
        ) : (
          /* Admin Management Panel */
          <AdminPanel
            vehicles={vehicles}
            leads={leads}
            settings={settings}
            onUpdateVehicles={handleUpdateVehicles}
            onUpdateLeads={handleUpdateLeads}
            onUpdateSettings={handleUpdateSettings}
            onResetData={handleResetData}
            onPrintVehicle={(v) => setPrintingVehicle(v)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}
      </main>

      {/* Universal Store Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={() => {
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          settings={settings}
          onClose={() => setSelectedVehicle(null)}
          onLeadCreated={handleCreateLead}
          onPrintSticker={(v) => setPrintingVehicle(v)}
        />
      )}

      {/* Printable Window Sticker */}
      {printingVehicle && (
        <PrintableVehicleSticker
          vehicle={printingVehicle}
          settings={settings}
          onClose={() => setPrintingVehicle(null)}
        />
      )}

      {/* Interactive System & Admin Tutorial Modal */}
      <AdminTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onGoToAdmin={() => {
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToStore={() => {
          setCurrentView('store');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Bottom Mobile App Navigation Bar (Native Smartphone Tab Bar) */}
      <BottomMobileNav
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFilterPromotions={() => {
          setCatalogCategory('promotions');
          setTimeout(() => {
            document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onScrollToSection={(id) => {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        unreadLeadsCount={unreadLeadsCount}
      />

      {/* Floating Tutorial Help Pill */}
      <button
        onClick={() => setIsTutorialOpen(true)}
        className="fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-30 bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-white px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full shadow-2xl border border-amber-500/40 backdrop-blur-md text-[11px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
        <span className="hidden sm:inline">Guia do Sistema & Painel</span>
        <span className="sm:hidden">Guia</span>
      </button>

      {/* Floating WhatsApp Action Button */}
      {currentView === 'store' && (
        <a
          href={`https://wa.me/${settings.whatsappRaw}?text=${encodeURIComponent('Olá GVR Gomes Veículos! Gostaria de falar com um consultor.')}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Fale no WhatsApp da GVR Gomes"
          className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-30 bg-emerald-500 hover:bg-emerald-400 text-white p-3 sm:p-3.5 rounded-full shadow-2xl shadow-emerald-950/80 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer border border-emerald-300/40"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      )}
    </div>
  );
}
