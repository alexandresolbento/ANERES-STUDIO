import { MessageCircle, ArrowRight, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';
import { AneresLogo } from './AneresLogo';
import { AneresWatermark } from './AneresWatermark';

export function ConversionBanner() {
  const whatsappUrl =
    'https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Vi%20o%20site%20da%20ANERES%20Studio%20e%20gostaria%20de%20um%20or%C3%A7amento%20para%20minha%20empresa.';

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-y border-zinc-800/80">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle brand watermark */}
      <AneresWatermark
        position="top-right"
        size="lg"
        opacity="opacity-[0.03] sm:opacity-[0.04]"
        rotation="rotate-6"
        glow={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-zinc-900/90 via-zinc-950/95 to-zinc-900/90 border border-amber-400/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-400 mb-4">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Oportunidade para o Seu Negócio</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              Pronto para Atrair Mais Clientes com Vídeos Profissionais?
            </h3>

            <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
              Empresas que utilizam vídeos de alta qualidade vendem mais e geram autoridade imediata. Solicite um orçamento sem compromisso e comece seu projeto ainda esta semana.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-zinc-300">
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Orçamento gratuito e rápido
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Valores acessíveis para seu porte
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Gravação em 4K Cinema
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="conversion-banner-whatsapp-btn"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/25 hover:scale-105 cursor-pointer text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Pedir Orçamento no WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={scrollToContact}
              id="conversion-banner-form-btn"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm transition-all shadow-md hover:scale-105 cursor-pointer text-center"
            >
              <span>Preencher Pedido Rápido</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
