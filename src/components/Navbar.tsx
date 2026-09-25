import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowUpRight, Play, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { AneresLogo } from './AneresLogo';
import { ThemeToggle } from './ThemeToggle';
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenVideoReel: () => void;
}

export function Navbar({ onOpenVideoReel }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Lightweight scroll listener for navbar background + zero-overhead IntersectionObserver for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Pure async IntersectionObserver without any scroll listener overhead
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idMap: Record<string, string> = {
              'hero-section': 'hero',
              'portfolio': 'portfolio',
              'servicos': 'servicos',
              'contato': 'contato',
            };
            if (idMap[entry.target.id]) {
              setActiveSection(idMap[entry.target.id]);
            }
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    const sectionIds = ['hero-section', 'portfolio', 'servicos', 'contato'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#' || href === '#hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const navLinks = [
    { name: 'Início', href: '#hero-section', sectionId: 'hero' },
    { name: 'Portfólio em Vídeo', href: '#portfolio', sectionId: 'portfolio' },
    { name: 'Serviços & Sites', href: '#servicos', sectionId: 'servicos' },
    { name: 'Pedir Orçamento', href: '#contato', sectionId: 'contato' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transform-gpu transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80 py-2.5 sm:py-3 shadow-lg shadow-slate-900/5 dark:shadow-black/50'
          : 'bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xs py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Prominent Dark/Light Mode Selector right at the beginning */}
        <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4 shrink-0">
          <a
            href="#hero-section"
            onClick={(e) => scrollToSection(e, '#hero-section')}
            id="nav-logo-link"
            className="flex items-center group transition-opacity hover:opacity-95 cursor-pointer shrink-0"
            aria-label="ANERES Studio - Página Inicial"
          >
            <AneresLogo variant="horizontal" size="md" />
          </a>

          {/* Botão de Modo Escuro / Claro bem no início do site */}
          <div className="hidden sm:flex items-center">
            <ThemeToggle variant="segmented" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Navegação Principal">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3 py-2 text-xs lg:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'text-amber-800 dark:text-amber-400 bg-amber-500/15 dark:bg-zinc-900/80'
                    : 'text-slate-800 dark:text-zinc-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/50'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs & Social Links */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 shrink-0">
          {/* Social Icons Group */}
          <div className="hidden xl:flex items-center gap-1 border-r border-slate-200 dark:border-zinc-800/80 pr-2 mr-1">
            <a
              href="https://www.instagram.com/Fisioalexandres/"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-instagram-icon"
              className="p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              title="Instagram @Fisioalexandres"
              aria-label="Instagram @Fisioalexandres"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para minha empresa.')}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-icon"
              className="p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              title={`Chamar no WhatsApp ${WHATSAPP_DISPLAY}`}
              aria-label={`Chamar no WhatsApp ${WHATSAPP_DISPLAY}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href="https://www.youtube.com/@ANERESSTUDIO"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-youtube-icon"
              className="p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              title="Canal no YouTube @ANERESSTUDIO"
              aria-label="Canal no YouTube @ANERESSTUDIO"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            id="nav-showreel-btn"
            onClick={onOpenVideoReel}
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 dark:text-zinc-200 dark:hover:text-amber-400 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-800 rounded-lg transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current text-amber-500 dark:text-amber-400" />
            <span className="hidden xl:inline">Showreel 2024</span>
            <span className="xl:hidden">Showreel</span>
          </button>

          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, '#contato')}
            id="nav-contact-cta"
            className="flex items-center gap-1.5 px-3.5 lg:px-4 py-2 text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 transition-all cursor-pointer"
          >
            <span>Pedir Orçamento</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Header Controls: Theme Toggle + Menu (Visible immediately at the start of the site on mobile) */}
        <div className="sm:hidden flex items-center gap-1.5">
          <ThemeToggle variant="segmented" />

          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 focus:outline-none cursor-pointer"
            aria-label="Alternar menu de navegação"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-500 dark:text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-white/98 dark:bg-zinc-950/98 border-b border-slate-200 dark:border-zinc-800 px-4 pt-3 pb-6 space-y-4 backdrop-blur-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          <div className="pb-3 border-b border-slate-200 dark:border-zinc-800/70 flex items-center justify-between gap-2">
            <AneresLogo variant="horizontal" size="sm" />
            <ThemeToggle variant="segmented" />
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30'
                      : 'text-slate-800 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />}
                </a>
              );
            })}
          </div>

          {/* Mobile Social Links Bar */}
          <div className="pt-3 border-t border-slate-200 dark:border-zinc-800/80">
            <p className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-zinc-300 font-bold mb-2.5 px-1">
              Redes & Contato Direto:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://www.instagram.com/Fisioalexandres/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-pink-500/40 text-slate-800 dark:text-zinc-200 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                aria-label="Instagram @Fisioalexandres"
              >
                <Instagram className="w-4 h-4 text-pink-500 dark:text-pink-400 mb-1" />
                <span className="text-[11px] font-semibold">Instagram</span>
              </a>

              <a
                href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para minha empresa.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/40 text-slate-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label={`Chamar no WhatsApp ${WHATSAPP_DISPLAY}`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mb-1" />
                <span className="text-[11px] font-semibold">WhatsApp</span>
              </a>

              <a
                href="https://www.youtube.com/@ANERESSTUDIO"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-red-500/40 text-slate-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="YouTube @ANERESSTUDIO"
              >
                <Youtube className="w-4 h-4 text-red-500 mb-1" />
                <span className="text-[11px] font-semibold">YouTube</span>
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-zinc-800/80 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVideoReel();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold text-slate-700 dark:text-zinc-200 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 rounded-xl cursor-pointer transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-500 dark:text-amber-400" />
              <span>Assistir Showreel em Vídeo</span>
            </button>

            <a
              href="#contato"
              onClick={(e) => scrollToSection(e, '#contato')}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-xs font-black text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl cursor-pointer shadow-md"
            >
              <span>Solicitar Orçamento Grátis</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para minha empresa.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp {WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
