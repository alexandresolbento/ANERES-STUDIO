import { ArrowUp, Youtube, Instagram, MessageCircle, Shield } from 'lucide-react';
import { AneresLogo } from './AneresLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-12 text-zinc-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          {/* Col 1 & 2: Brand & Social Channels */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <AneresLogo variant="horizontal" size="lg" />
            </div>
            <p className="text-zinc-400 max-w-sm text-xs sm:text-sm leading-relaxed">
              ANERES Studio — Produção audiovisual em 4K, criação de Landing Pages de alta conversão, sites profissionais para empresas, comerciais e soluções sob medida para atrair clientes.
            </p>

            {/* Social Icons Quick Row */}
            <div className="pt-2">
              <span className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
                Acompanhe e Fale Conosco:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.instagram.com/aneresstudio_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-instagram-btn"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-pink-500/50 hover:bg-zinc-900 text-zinc-300 hover:text-pink-400 transition-all text-xs font-semibold group"
                  aria-label="Instagram @aneresstudio_"
                >
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Gostaria%20de%20*solicitar*%20um%20or%C3%A7amento%20para%20*minha%20empresa.*"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-whatsapp-btn"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900 text-zinc-300 hover:text-emerald-400 transition-all text-xs font-semibold group"
                  aria-label="Chamar no WhatsApp (99) 99933-1639"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://www.youtube.com/@ANERESSTUDIO"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-youtube-btn"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-950/40 border border-red-500/30 hover:border-red-500/60 hover:bg-red-900/50 text-zinc-300 hover:text-white transition-all text-xs font-semibold group"
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
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero-section" className="hover:text-amber-400 transition-colors">Início</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Portfólio em Vídeo</a></li>
              <li><a href="#servicos" className="hover:text-amber-400 transition-colors">Serviços & Especialidades</a></li>
              <li><a href="#contato" className="hover:text-amber-400 transition-colors">Solicitar Orçamento</a></li>
            </ul>
          </div>

          {/* Col 4: Redes Sociais Detalhadas */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Redes & Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.instagram.com/aneresstudio_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-300 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>@aneresstudio_</span>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=5599999331639&text=Ol%C3%A1!%20Gostaria%20de%20*solicitar*%20um%20or%C3%A7amento%20para%20*minha%20empresa.*"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp (99) 99933-1639</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ANERESSTUDIO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-300 hover:text-red-400 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" />
                  <span>@ANERESSTUDIO</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Atendimento & Cobertura */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Atendimento</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Atendimento presencial no Maranhão e gravações/projetos para todo o Brasil.
            </p>
            <p className="text-xs text-zinc-400">
              Segunda a Sexta: 08:00 às 18:00
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 text-[11px] text-zinc-300 border border-zinc-800">
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Qualidade 4K & Pontualidade</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p
            onDoubleClick={onOpenAdmin}
            className="cursor-default select-none"
            title="ANERES Studio"
          >
            © {new Date().getFullYear()} ANERES Studio - Produções Audiovisuais & Soluções Criativas. Todos os direitos reservados.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
