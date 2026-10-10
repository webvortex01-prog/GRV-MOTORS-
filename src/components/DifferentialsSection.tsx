import React from 'react';
import { ShieldCheck, Wrench, Award, Banknote, Truck, Sparkles } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Perícia Cautelar 100% Aprovada',
      description: 'Nenhum carro entra em nosso pátio sem passar por rigoroso laudo Dekra ou Supervisão. Garantia total contra leilão, sinistro ou adulteração.',
    },
    {
      icon: Wrench,
      title: 'Revisão Técnica de 100 Itens',
      description: 'Checagem minuciosa de motor, suspensão, freios, injeção eletrônica e sistema elétrico antes da entrega.',
    },
    {
      icon: Award,
      title: 'Garantia Completa de Até 1 Ano',
      description: 'Tranquilidade e segurança jurídica com cobertura formal para motor e caixa de câmbio.',
    },
    {
      icon: Banknote,
      title: 'Crédito com 12+ Bancos',
      description: 'Consultores especializados para buscar a menor taxa de juros do mercado, com aprovação para autônomos e produtores rurais.',
    },
    {
      icon: Sparkles,
      title: 'Estética Automotiva de Concessionária',
      description: 'Higienização interna bactericida detalhada, polimento técnico e vitrificação de pintura em todos os veículos entregues.',
    },
    {
      icon: Truck,
      title: 'Entrega Segura em Todo o Brasil',
      description: 'Logística própria e parceiros de transporte seguro para entregar seu novo carro direto na porta da sua casa.',
    },
  ];

  return (
    <section id="diferenciais" className="py-12 sm:py-20 lg:py-24 bg-slate-950 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            <span>Padrão GVR Gomes</span>
            <span aria-hidden="true">·</span>
            <span>Seminovos de Excelência</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display text-balance">
            Por que escolher um seminovo da GVR Gomes Veículos?
          </h2>
          <p className="text-xs sm:text-base text-slate-400 mt-3 sm:mt-4 leading-relaxed text-balance">
            Aqui você não compra dor de cabeça. Selecionamos apenas veículos com histórico comprovado, baixa quilometragem e estado de conservação impecável.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-sky-400 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-display mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
