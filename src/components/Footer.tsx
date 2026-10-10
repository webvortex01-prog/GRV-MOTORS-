import React from 'react';
import { GvrLogo } from './GvrLogo';
import { StoreSettings } from '../types/vehicle';
import { MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  settings: StoreSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  return (
    <footer id="contato" className="bg-slate-950 border-t border-slate-800/80 pt-12 sm:pt-16 pb-28 md:pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <GvrLogo variant="full" size="md" showPhone={true} />
            <p className="text-xs text-slate-400 leading-relaxed mt-3">
              Referência regional em veículos seminovos e usados selecionados de alta procedência, perícia cautelar 100% aprovada e garantia mecânica.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantia de procedência e laudo Dekra</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navegação Rápida
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#estoque" className="hover:text-sky-400 transition-colors">
                  Estoque de Seminovos
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-sky-400 transition-colors">
                  Simulador de Financiamento
                </a>
              </li>
              <li>
                <a href="#avaliacao" className="hover:text-sky-400 transition-colors">
                  Avaliação do Seu Usado na Troca
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-sky-400 transition-colors">
                  Perícia & Garantia
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                >
                  Área do Lojista (Painel Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contato & WhatsApp */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Canais de Atendimento
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">WhatsApp / Telefone:</span>
                  <a
                    href={`https://wa.me/${settings.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-sky-400 transition-colors text-sm"
                  >
                    {settings.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Showroom:</span>
                  <span className="text-slate-300 font-medium">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Horário de Funcionamento:</span>
                  <span className="text-slate-300">
                    {settings.hoursWeekday} <br />
                    Sábado: {settings.hoursSaturday}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Financiamento Bancos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Instituições Parceiras
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Crédito com taxa reduzida e aprovação imediata com as principais instituições financeiras do Brasil:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                Banco Santander
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                BV Financeira
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                Banco Bradesco
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
                Banco Itaú
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {settings.storeName}. Todos os direitos reservados. CNPJ: {settings.cnpj}
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Barra do Garças - Mato Grosso</span>
            <span aria-hidden="true">·</span>
            <span>Seminovos Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
