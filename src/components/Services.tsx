import { Video, TrendingUp, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';

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
    <section id="servicos" className="py-20 md:py-28 relative bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-amber-400 text-zinc-300 hover:text-zinc-950 text-xs font-bold transition-all border border-zinc-800 group-hover:border-transparent"
                >
                  <span>Solicitar Proposta para {serv.title.split('&')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
