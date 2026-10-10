import React, { useState } from 'react';
import {
  Car,
  Tag,
  Users,
  Printer,
  Settings,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
  X,
  Store,
  Images,
  Flame,
  Check,
  Compass
} from 'lucide-react';
import { GvrLogo } from './GvrLogo';

interface AdminTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToAdmin: () => void;
  onGoToStore: () => void;
}

export const AdminTutorialModal: React.FC<AdminTutorialModalProps> = ({
  isOpen,
  onClose,
  onGoToAdmin,
  onGoToStore,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'intro',
      tabLabel: '1. Visão Geral',
      badge: 'Guia Inicial · Apresentação',
      title: 'Bem-vindo ao Sistema GVR Gomes Veículos! 🚗',
      description:
        'Você está no protótipo oficial de uma loja moderna de seminovos e usados selecionados de alto padrão. Este sistema une duas pontas essenciais do negócio:',
      highlights: [
        'Vitrine Pública: Onde o cliente acessa os carros, vê 6 fotos em carrossel automático, simula financiamento e chama no WhatsApp.',
        'Painel Administrativo: Onde o lojista cadastra novos veículos, cria promoções, administra propostas recebidas e imprime cartazes.',
        '100% Funcional e Interativo: Você pode cadastrar carros reais, testar simulações e alternar entre cliente e administrador.',
        'Visual Otimizado: Design automotivo com estética esportiva e adaptação perfeita para computador e celular.',
      ],
      icon: Sparkles,
      color: 'from-blue-600 to-sky-500',
      tip: 'Dica: Você pode alternar entre "Loja" e "Painel Admin" a qualquer momento pelo menu superior.',
    },
    {
      id: 'stock',
      tabLabel: '2. Estoque & 6 Fotos',
      badge: 'Passo 2 · Gestão de Estoque',
      title: 'Gerenciamento de Estoque com 6 Fotos por Carro',
      description:
        'Cada veículo possui publicação completa com 6 fotos em alta definição passando no automático, com botões para avançar e voltar:',
      highlights: [
        'Carrossel Automático de 6 Fotos: Exterior, frente, traseira, cockpit, painel multimídia e rodas esportivas.',
        'Botões de Navegação e Marcadores: O visitante pode passar as fotos uma a uma ou deixar no automático.',
        'Cadastro Fácil no Admin: Botão "+ Novo Veículo" com modelos pré-configurados (Toyota, BMW, Jeep, VW, Honda) ou dados personalizados.',
        'Status em 1 Clique: Alterne o carro entre Disponível, Reservado ou Vendido instantaneamente.',
      ],
      icon: Images,
      color: 'from-blue-600 to-indigo-600',
      tip: 'Clique na foto de qualquer carro para ver as fotos e clique nos detalhes para ler a descrição completa.',
    },
    {
      id: 'promotions',
      tabLabel: '3. Promoções & Ofertas',
      badge: 'Passo 3 · Sistema de Ofertas',
      title: 'Colocar Carros em Promoção & Ofertas Especiais',
      description:
        'Quer fazer um feirão de fim de semana ou dar desconto especial em um veículo? O sistema possui ferramenta própria de promoções:',
      highlights: [
        'Preço Promocional com Desconto Automático: O sistema calcula na hora a economia em R$ e a porcentagem OFF.',
        'Preço Antigo Riscado: Na vitrine o preço antigo aparece riscado e o valor promocional ganha destaque luminoso.',
        'Etiquetas Personalizadas: "Feirão Exclusivo - R$ 20.000 OFF", "IPVA 2026 Pago", "Super Oferta", etc.',
        'Financiamento Recalculado: O simulador recalcula automaticamente as parcelas com base no preço com desconto.',
      ],
      icon: Flame,
      color: 'from-rose-500 to-amber-500',
      tip: 'No Painel Admin, clique no botão "Promoção" em qualquer veículo para ativar a oferta em segundos!',
    },
    {
      id: 'leads',
      tabLabel: '4. CRM & Propostas WhatsApp',
      badge: 'Passo 4 · Atendimento & Vendas',
      title: 'Mesa de Propostas & CRM de Clientes no WhatsApp',
      description:
        'Todas as interações dos clientes na vitrine geram propostas organizadas no painel do administrador:',
      highlights: [
        'Simulações de Financiamento: Visualize quanto de entrada e quantas parcelas o cliente deseja pagar.',
        'Avaliação de Carro Usado na Troca: O cliente envia marca, modelo, ano e km do usado dele.',
        'Agendamento de Test-Drive: Notificações com data e horário solicitado.',
        'Resposta Direta no WhatsApp: Botão que abre a conversa com o cliente já com os dados do carro preenchidos!',
      ],
      icon: Users,
      color: 'from-emerald-600 to-teal-600',
      tip: 'Aba "Mesa de Propostas (CRM)" no Painel Admin organiza seus clientes em Novo, Em Atendimento e Fechado.',
    },
    {
      id: 'tools',
      tabLabel: '5. Fichas & Configurações',
      badge: 'Passo 5 · Loja Física & Configurações',
      title: 'Cartaz Oficial para Para-brisa & Dados da Loja',
      description:
        'Ferramentas feitas sob medida para o dia a dia do pátio e do showroom da GVR Gomes Veículos:',
      highlights: [
        'Cartaz Oficial A4 para Para-brisa: Imprima fichas padronizadas com a logo da GVR Gomes para colocar nos vidros dos carros no pátio.',
        'Configurações da Loja: Altere o número de WhatsApp, taxas de juros do financiamento e banner promocional.',
        'Restauração de Dados: Botão para restaurar os dados de demonstração a qualquer momento.',
      ],
      icon: Printer,
      color: 'from-sky-600 to-blue-700',
      tip: 'Clique em "Imprimir Ficha" em qualquer carro para ver o cartaz de para-brisa em tamanho A4 pronto para imprimir.',
    },
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onGoToAdmin();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center items-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
    >
      {/* Giant Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col my-auto cursor-default"
      >
        {/* Top Branding Banner */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Site</span>
            </button>
            <div className="scale-75 origin-left shrink-0 hidden sm:block">
              <GvrLogo variant="compact" size="sm" showPhone={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Guia Oficial do Sistema
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-400">·</span>
                <span className="hidden sm:inline-block text-xs text-slate-300 font-medium">
                  Aprenda tudo antes de navegar
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Fechar Guia e Ir para a Loja"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Step Tabs Bar (Horizontal scrolling on mobile) */}
        <div className="bg-slate-950/60 border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentStep === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
              }`}
            >
              <span>{step.tabLabel}</span>
              {currentStep === idx && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Main Step Header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.color} text-white flex items-center justify-center shrink-0 shadow-xl shadow-blue-950`}
            >
              <Icon className="w-7 h-7" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  {current.badge}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">Passo {currentStep + 1} de {steps.length}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-display">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {current.description}
              </p>
            </div>
          </div>

          {/* Highlights Box */}
          <div className="bg-slate-950/80 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-3 shadow-inner">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span>O Que Você Pode Fazer Aqui:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {current.highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip Box */}
          <div className="p-3.5 sm:p-4 bg-sky-950/40 border border-sky-800/40 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-sky-200">
            <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
            <span className="font-medium">{current.tip}</span>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              <strong>Como você deseja testar agora?</strong> Você pode ir direto para o painel gerenciar ou navegar na vitrine como cliente.
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  onGoToStore();
                  onClose();
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Store className="w-3.5 h-3.5 text-sky-400" />
                <span>Ver Vitrine</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onGoToAdmin();
                  onClose();
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/40"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Abrir Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Navigation */}
        <div className="px-5 sm:px-8 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Passo Anterior</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onGoToStore();
                onClose();
              }}
              className="px-4 py-2.5 text-slate-400 hover:text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Fechar Guia e Ver Carros
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Dots */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    currentStep === idx ? 'w-6 bg-sky-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentStep === steps.length - 1 ? 'Concluir e Ir para o Admin' : 'Próximo Passo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
