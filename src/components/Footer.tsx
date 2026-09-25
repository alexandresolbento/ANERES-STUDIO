import { ArrowUp, Youtube, Instagram, MessageCircle, Shield, Sun, Moon } from 'lucide-react';
import { AneresLogo } from './AneresLogo';
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  const { isDark, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#' || href === '#hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 76;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-black border-t border-slate-200 dark:border-zinc-900 pt-16 pb-12 text-slate-700 dark:text-zinc-300 text-xs sm:text-sm overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-zinc-900">
          {/* Col 1 & 2: Brand & Social Channels */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <AneresLogo variant="horizontal" size="lg" />
            </div>
            <p className="text-slate-700 dark:text-zinc-300 max-w-sm text-xs sm:text-sm leading-relaxed">
              ANERES Studio — Produção audiovisual em 4K, criação de Landing Pages de alta conversão, sites profissionais para empresas, comerciais e soluções sob medida para atrair clientes.
            </p>

            {/* Social Icons Quick Row */}
            <div className="pt-2">
              <span className="block text-[11px] uppercase tracking-wider text-slate-600 dark:text-zinc-300 font-bold mb-2.5">
                Acompanhe e Fale Conosco:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.instagram.com/Fisioalexandres/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-instagram-btn"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 hover:border-pink-500/50 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-800 dark:text-zinc-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all text-xs font-bold group shadow-2xs"
                  aria-label="Instagram @Fisioalexandres"
                >
                  <Instagram className="w-4 h-4 text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>

                <a
                  href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para minha empresa.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-whatsapp-btn"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-xs font-bold group shadow-2xs"
                  aria-label={`Chamar no WhatsApp ${WHATSAPP_DISPLAY}`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://www.youtube.com/@ANERESSTUDIO"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-youtube-btn"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/30 hover:border-red-400 dark:hover:border-red-500/60 hover:bg-red-100 dark:hover:bg-red-900/50 text-slate-800 dark:text-zinc-200 hover:text-red-700 dark:hover:text-white transition-all text-xs font-bold group shadow-2xs"
                  aria-label="Canal no YouTube @ANERESSTUDIO"
                >
                  <Youtube className="w-4 h-4 text-red-500 fill-current group-hover:scale-110 transition-transform" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero-section" onClick={(e) => handleFooterNav(e, '#hero-section')} className="text-slate-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer">Início</a></li>
              <li><a href="#portfolio" onClick={(e) => handleFooterNav(e, '#portfolio')} className="text-slate-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer">Portfólio em Vídeo</a></li>
              <li><a href="#servicos" onClick={(e) => handleFooterNav(e, '#servicos')} className="text-slate-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer">Serviços & Especialidades</a></li>
              <li><a href="#contato" onClick={(e) => handleFooterNav(e, '#contato')} className="text-slate-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer">Solicitar Orçamento</a></li>
            </ul>
          </div>

          {/* Col 4: Redes Sociais Detalhadas */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">Redes & Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.instagram.com/Fisioalexandres/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400 shrink-0" />
                  <span>@Fisioalexandres</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para minha empresa.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>WhatsApp {WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ANERESSTUDIO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" />
                  <span>@ANERESSTUDIO</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Atendimento & Cobertura */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 dark:text-white font-bold">Atendimento</h4>
            <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
              Atendimento presencial no Maranhão e gravações/projetos para todo o Brasil.
            </p>
            <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium">
              Segunda a Sexta: 08:00 às 18:00
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-zinc-900 text-[11px] text-slate-800 dark:text-zinc-200 font-semibold border border-slate-200 dark:border-zinc-800 shadow-2xs">
              <Shield className="w-3 h-3 text-amber-500 dark:text-amber-400" />
              <span>Qualidade 4K & Pontualidade</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-zinc-400 font-medium">
          <p
            onDoubleClick={onOpenAdmin}
            className="cursor-default select-none"
            title="ANERES Studio"
          >
            © {new Date().getFullYear()} ANERES Studio - Produções Audiovisuais & Soluções Criativas. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Subtle Theme Toggle in Footer */}
            <button
              type="button"
              id="footer-theme-toggle-btn"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-colors cursor-pointer shadow-2xs font-medium"
              title={isDark ? "Padrão visual: Escuro (clique para mudar para Claro)" : "Padrão visual: Claro (clique para mudar para Escuro)"}
              aria-label={isDark ? "Mudar padrão visual para claro" : "Mudar padrão visual para escuro"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Modo Escuro</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-800 hover:text-slate-950 dark:text-zinc-200 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-colors cursor-pointer shadow-2xs font-semibold"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
