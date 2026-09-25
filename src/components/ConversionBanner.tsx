import { MessageCircle, ArrowRight, Sparkles, CheckCircle2, Globe, Laptop } from 'lucide-react';
import { motion } from 'motion/react';
import { AneresLogo } from './AneresLogo';
import { AneresWatermark } from './AneresWatermark';
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export function ConversionBanner() {
  const whatsappUrl = getWhatsAppUrl(
    'Olá! Vi o site da ANERES Studio e gostaria de um orçamento para minha empresa (Landing Page, Site ou Vídeos).'
  );

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      const navOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-14 relative overflow-hidden w-full max-w-full bg-gradient-to-b from-amber-50/30 via-slate-50 to-amber-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border-y border-slate-200 dark:border-zinc-800/80">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu" />

      {/* Subtle brand watermark */}
      <AneresWatermark
        position="top-right"
        size="lg"
        opacity="opacity-[0.03] sm:opacity-[0.04]"
        rotation="rotate-6"
        glow={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-white dark:bg-gradient-to-r dark:from-zinc-900/90 dark:via-zinc-950/95 dark:to-zinc-900/90 border border-amber-400/40 dark:border-amber-400/30 shadow-xl dark:shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/30 text-xs font-bold text-amber-800 dark:text-amber-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Crescimento & Atração de Clientes</span>
            </div>

            <h3 className="font-heading text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              Precisa de uma Landing Page, Site Profissional ou Vídeo de Alto Impacto?
            </h3>

            <p className="mt-3 text-xs sm:text-base text-slate-700 dark:text-zinc-200 leading-relaxed max-w-2xl">
              Desenvolvemos <strong className="text-slate-900 dark:text-white font-bold">Landing Pages de alta conversão</strong> para o seu negócio e <strong className="text-slate-900 dark:text-white font-bold">sites profissionais para empresas</strong> que desejam atrair novos clientes, fortalecer a confiança da marca e gerar contatos imediatos no WhatsApp.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-bold text-slate-800 dark:text-zinc-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                Landing Pages pensadas para converter
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                Sites profissionais para empresas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                Produção audiovisual em 4K
              </span>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="conversion-banner-whatsapp-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/25 cursor-pointer text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Pedir Orçamento no WhatsApp</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={scrollToContact}
                id="conversion-banner-form-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm transition-all shadow-md cursor-pointer text-center"
              >
                <span>Preencher Pedido Rápido</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Strategic Image Card with Direct Link to WhatsApp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full lg:w-[420px] shrink-0"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="strategic-promo-whatsapp-link"
              className="group block relative rounded-2xl overflow-hidden border border-amber-400/40 hover:border-emerald-400 transition-all duration-300 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/25 bg-zinc-950"
              title="Clique para falar com a ANERES Studio no WhatsApp"
            >
              {/* Top active status pill */}
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-emerald-500/40 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online no WhatsApp</span>
              </div>

              {/* Image banner with smooth hover zoom */}
              <div className="relative aspect-[5/4] w-full overflow-hidden bg-zinc-900">
                <picture>
                  <source srcSet="/promo-banner.webp" type="image/webp" />
                  <img
                    src="/promo-banner.png"
                    alt="ANERES Studio - Atendimento e Orçamentos no WhatsApp"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to direct ImgBB URL if needed
                      const target = e.currentTarget;
                      if (!target.src.includes('ibb.co')) {
                        target.src = 'https://i.ibb.co/gb6zfFhB/Chat-GPT-Image-22-de-set-de-2026-16-01-08.png';
                      }
                    }}
                  />
                </picture>

                {/* Ambient glow & hover wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-emerald-950/80 transition-colors duration-300" />
              </div>

              {/* Interactive bottom banner */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-4 flex items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-zinc-950 shrink-0 group-hover:scale-110 group-hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/30">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div className="truncate text-left">
                    <p className="text-xs font-bold leading-tight group-hover:text-emerald-300 transition-colors truncate">
                      Falar no WhatsApp
                    </p>
                    <p className="text-[10px] text-zinc-400 font-mono tracking-tight">
                      {WHATSAPP_DISPLAY} • Resposta Rápida
                    </p>
                  </div>
                </div>

                <span className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500 group-hover:bg-emerald-400 text-zinc-950 font-extrabold text-[11px] flex items-center gap-1 transition-all shadow">
                  Iniciar
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
