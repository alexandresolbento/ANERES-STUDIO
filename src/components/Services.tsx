import { Video, TrendingUp, Sparkles, Layers, CheckCircle2, ArrowRight, MessageCircle, Globe, MonitorSmartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/services';
import { AneresLogo } from './AneresLogo';
import { AneresWatermark } from './AneresWatermark';

interface ServicesProps {
  onSelectServiceToQuote: (serviceTitle: string) => void;
}

export function Services({ onSelectServiceToQuote }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-400" />;
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
    <section id="servicos" className="py-20 md:py-28 relative bg-zinc-950 border-t border-zinc-900 overflow-hidden w-full max-w-full">
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
        {/* Section Header with smooth entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-semibold text-amber-400 mb-3 shadow-sm">
            <span>Soluções Completas & Presença Digital</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Serviços & Especialidades
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Da captação cinematográfica em 4K ao desenvolvimento de <strong className="text-zinc-200 font-semibold">Landing Pages e sites profissionais</strong> que atraem clientes. Estratégias completas para posicionar sua empresa no topo.
          </p>
        </motion.div>

        {/* Services Grid with staggered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((serv, index) => {
            const isWebLanding = serv.id === 'serv-web-landing';

            return (
              <motion.div
                key={serv.id}
                id={`service-card-${serv.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden ${
                  isWebLanding
                    ? 'border-amber-400/50 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-amber-950/20 ring-1 ring-amber-400/20'
                    : 'border-zinc-800 hover:border-amber-400/40'
                }`}
              >
                {isWebLanding && (
                  <div className="absolute top-0 right-0 bg-amber-400 text-zinc-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                    Alta Conversão
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
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
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectServiceToQuote(serv.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-black transition-all shadow-md shadow-amber-400/10 hover:shadow-amber-400/20 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Pedir Orçamento para {serv.title.split('&')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Studio Brand Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-900/90 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
        >
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
                Todas as produções recebem a assinatura e a supervisão técnica da ANERES Studio — garantindo captação em alta definição 4K, edição dinâmica e sites profissionais com alta taxa de conversão.
              </p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contato"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <span>Falar com a Equipe do Estúdio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
