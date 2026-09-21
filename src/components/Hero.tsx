import { ArrowRight, Play, CheckCircle2, Sparkles, Youtube } from 'lucide-react';
import { CLIENT_LOGOS } from '../data/services';

interface HeroProps {
  onOpenVideoReel: () => void;
}

export function Hero({ onOpenVideoReel }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-400/30 text-xs font-semibold text-amber-400 shadow-sm shadow-amber-400/5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Audiovisual & Produções Profissionais</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Produção Audiovisual e Soluções Digitais com{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Qualidade Real
            </span>{' '}
            que se Adequa ao Seu Bolso
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Produzimos <strong className="text-zinc-100 font-semibold">vídeos profissionais em 4K</strong>, coberturas de eventos,{' '}
            <strong className="text-zinc-100 font-semibold">identidade visual e presença digital</strong> com dedicação, transparência e propostas pensadas para a realidade de cada cliente.
          </p>

          {/* Call to Actions */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#portfolio"
              id="hero-explore-portfolio-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all group cursor-pointer"
            >
              <span>Ver Portfólio em Vídeo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              type="button"
              id="hero-watch-reel-btn"
              onClick={onOpenVideoReel}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all shadow-md group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Assistir Showreel</span>
            </button>

            <a
              href="https://www.youtube.com/@ANERESSTUDIO"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-youtube-channel-link"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 rounded-xl transition-all shadow-md group"
            >
              <Youtube className="w-4 h-4 text-red-500 fill-current group-hover:scale-110 transition-transform" />
              <span>Canal @ANERESSTUDIO</span>
            </a>
          </div>

          {/* Quick trust proofs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Preços justos e transparentes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Atendimento atencioso e próximo
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Qualidade e pontualidade na entrega
            </span>
          </div>
        </div>

        {/* Clients Ticker */}
        <div className="mt-14 pt-8 border-t border-zinc-900 text-center">
          <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-6">
            Empresas, Projetos e Marcas que Confiam no ANERES Studio
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {CLIENT_LOGOS.map((brand, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-400/40 text-left transition-all hover:bg-zinc-900/90 group flex flex-col justify-between"
              >
                <div className="flex items-start gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white leading-tight">
                    {brand.name}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 pl-3 block">
                  {brand.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
