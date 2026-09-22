import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Play, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { AneresLogo } from './AneresLogo';

interface NavbarProps {
  onOpenVideoReel: () => void;
}

export function Navbar({ onOpenVideoReel }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfólio em Vídeo', href: '#portfolio' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Orçamento', href: '#contato' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="nav-logo-link"
          className="flex items-center group transition-opacity hover:opacity-95"
          aria-label="ANERES Studio - Página Inicial"
        >
          <AneresLogo variant="horizontal" size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTAs & Social Links */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-2.5">
          {/* Social Icons Group */}
          <div className="flex items-center gap-1 border-r border-zinc-800/80 pr-2 mr-1">
            <a
              href="https://www.instagram.com/aneresstudio_/"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-instagram-icon"
              className="p-2 rounded-lg text-zinc-400 hover:text-pink-400 hover:bg-zinc-900 transition-all"
              title="Instagram @aneresstudio_"
              aria-label="Instagram do ANERES Studio (@aneresstudio_)"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Gostaria%20de%20*solicitar*%20um%20or%C3%A7amento%20para%20*minha%20empresa.*"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-icon"
              className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition-all"
              title="Chamar no WhatsApp (99) 99933-1639"
              aria-label="Chamar no WhatsApp (99) 99933-1639"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href="https://www.youtube.com/@ANERESSTUDIO"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-youtube-icon"
              className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-all"
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
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-amber-400 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden xl:inline">Showreel 2024</span>
            <span className="xl:hidden">Showreel</span>
          </button>

          <a
            href="#contato"
            id="nav-contact-cta"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 transition-all cursor-pointer"
          >
            <span>Pedir Orçamento</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 focus:outline-none cursor-pointer"
          aria-label="Alternar menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="pb-3 border-b border-zinc-800/70 flex justify-center">
            <AneresLogo variant="horizontal" size="md" />
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-zinc-200 hover:text-amber-400 hover:bg-zinc-900 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Social Links Bar */}
          <div className="pt-3 border-t border-zinc-800/80">
            <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-2.5 px-1">
              Redes & Contato Direto:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://www.instagram.com/aneresstudio_/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-pink-500/40 text-zinc-300 hover:text-pink-400 transition-colors"
                aria-label="Instagram @aneresstudio_"
              >
                <Instagram className="w-4 h-4 text-pink-400 mb-1" />
                <span className="text-[11px] font-medium">Instagram</span>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Gostaria%20de%20*solicitar*%20um%20or%C3%A7amento%20para%20*minha%20empresa.*"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-400 transition-colors"
                aria-label="Chamar no WhatsApp (99) 99933-1639"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="text-[11px] font-medium">WhatsApp</span>
              </a>

              <a
                href="https://www.youtube.com/@ANERESSTUDIO"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-red-500/40 text-zinc-300 hover:text-red-400 transition-colors"
                aria-label="YouTube @ANERESSTUDIO"
              >
                <Youtube className="w-4 h-4 text-red-500 mb-1" />
                <span className="text-[11px] font-medium">YouTube</span>
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVideoReel();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>Assistir Showreel em Vídeo</span>
            </button>

            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-black text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer shadow-md"
            >
              <span>Solicitar Orçamento Grátis</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20minha%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp (99) 99933-1639</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
