import { Video, TrendingUp, Sparkles, Layers, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { SERVICES } from '../data/services';
import { AneresLogo } from './AneresLogo';
import { AneresWatermark } from './AneresWatermark';

interface ServicesProps {
  onSelectServiceToQuote: (serviceTitle: string) => void;
}

export function Services({ onSelectServiceToQuote }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-6 h-6 text-amber-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Layers':
      default:
        return <Layers className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="servicos" className="py-20 md:py-28 relative bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Subtle ANERES Studio Brand Watermark Elements */}
      <AneresWatermark
        position="center"
        size="2xl"
        opacity="opacity-[0.025] sm:opacity-[0.035]"
        rotation="rotate-0"
        glow={true}
      />
      <AneresWatermark
        position="top-right"
        size="lg"
        opacity="opacity-[0.02] sm:opacity-[0.03]"
        rotation="-rotate-12"
        glow={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-semibold text-amber-400 mb-3">
            <span>Soluções Completas</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Serviços & Especialidades
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Do roteiro à gravação em 4K, edição e finalização profissional. Soluções completas para valorizar sua empresa, produto ou evento com pontualidade e transparência.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((serv) => (
            <div
              key={serv.id}
              id={`service-card-${serv.id}`}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(serv.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    {serv.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {serv.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-zinc-400">
                  {serv.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {serv.description}
                </p>

                {/* Features list */}
                <div className="mt-6 space-y-2.5 pt-4 border-t border-zinc-800/80">
                  {serv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectServiceToQuote(serv.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black transition-all shadow-md shadow-amber-400/10 hover:scale-[1.02] cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Pedir Orçamento para {serv.title.split('&')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Brand Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-900/90 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <AneresLogo variant="mark" size="lg" />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-heading font-black text-sm uppercase tracking-wider text-white">
                  Padrão de Qualidade ANERES Studio
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-bold">
                  Autoral
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
                Todas as produções recebem a assinatura e a supervisão técnica da ANERES Studio — garantindo captação em alta definição 4K, edição dinâmica e adequação ao perfil de cada projeto.
              </p>
            </div>
          </div>

          <a
            href="#contato"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs transition-all shadow-md hover:scale-105 cursor-pointer"
          >
            <span>Falar com o Diretor do Estúdio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
