import { useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';

export function FloatingQuoteCTA() {
  const [isOpen, setIsOpen] = useState(true);

  const whatsappUrl =
    'https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20sem%20compromisso%20para%20minha%20empresa.';

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Atendimento Online e Orçamento"
      className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex flex-col items-start gap-2 select-none"
    >
      {isOpen ? (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-zinc-950/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md flex flex-col gap-2.5 max-w-[320px] sm:max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header row with status & dismiss */}
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="flex flex-wrap items-center gap-x-1.5 text-xs">
                <span className="font-bold text-emerald-400">Atendimento Online:</span>
                <span className="text-zinc-300">Orçamento sem compromisso</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
              aria-label="Minimizar aviso"
              title="Minimizar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Button: Pedir Orçamento Grátis */}
          <div className="flex items-center gap-2 w-full">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="floating-quote-bubble-btn"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Pedir Orçamento Grátis</span>
            </a>

            <button
              type="button"
              onClick={scrollToContact}
              id="floating-scroll-form-btn"
              title="Ir para o formulário na página"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-amber-400 hover:text-amber-300 transition-colors shrink-0 cursor-pointer"
              aria-label="Rolar até o formulário"
            >
              <Sparkles className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      ) : (
        /* Minimized Compact Bubble */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          id="floating-reopen-bubble-btn"
          className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-zinc-950/95 border border-emerald-500/50 text-white text-xs font-bold shadow-xl hover:bg-zinc-900 transition-all cursor-pointer group"
          title="Abrir Atendimento Online"
        >
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
          <span className="text-zinc-200 group-hover:text-white">Atendimento Online • Orçamento Grátis</span>
        </button>
      )}
    </aside>
  );
}
