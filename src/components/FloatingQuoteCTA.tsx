import { useState } from 'react';
import { MessageCircle, Sparkles, X, ArrowRight } from 'lucide-react';

export function FloatingQuoteCTA() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl =
    'https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20minha%20empresa.';

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Friendly Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-emerald-500/40 text-zinc-200 text-xs shadow-xl animate-bounce duration-1000">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">Atendimento Online:</span>
          <span>Orçamento sem compromisso</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-zinc-500 hover:text-zinc-300 ml-1"
            aria-label="Fechar aviso"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Buttons */}
      <div className="flex items-center gap-2">
        {/* Quick Quote Scroll Button */}
        <button
          type="button"
          onClick={scrollToContact}
          id="floating-quote-btn"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs tracking-wide shadow-xl shadow-amber-500/25 transition-all hover:scale-105 cursor-pointer border border-amber-300"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Pedir Orçamento Grátis</span>
        </button>

        {/* Floating WhatsApp Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          aria-label="Conversar no WhatsApp com ANERES Studio"
          className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all duration-300 group cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 text-[9px] font-bold text-zinc-950 items-center justify-center">
              1
            </span>
          </span>
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-zinc-950 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
}
