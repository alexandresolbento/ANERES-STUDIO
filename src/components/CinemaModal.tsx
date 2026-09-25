import { useEffect } from 'react';
import { X, Youtube, ExternalLink, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { AneresLogo } from './AneresLogo';

interface CinemaModalProps {
  isOpen: boolean;
  videoId: string | null;
  title: string;
  client?: string;
  description?: string;
  onClose: () => void;
}

export function CinemaModal({ isOpen, videoId, title, client, description, onClose }: CinemaModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoId) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handleShare = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(youtubeUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
          setCopied(false);
        });
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cinema Screen Header Bar */}
        <div className="bg-slate-100 dark:bg-zinc-900/90 px-3 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-hidden">
            <AneresLogo variant="mark" size="xs" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono text-slate-800 dark:text-zinc-300 uppercase tracking-wider truncate max-w-[120px] xs:max-w-[160px] sm:max-w-xs md:max-w-md">
              {client ? `${client} // ` : ''}{title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copiar Link do YouTube"
              aria-label="Compartilhar vídeo"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
            </button>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Assistir no YouTube"
              aria-label="Assistir no YouTube"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">Ver no YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 hidden sm:inline" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Fechar player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player 16:9 */}
        <div className="aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Info Details Below */}
        {description && (
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-950 text-xs sm:text-sm text-slate-800 dark:text-zinc-200 border-t border-slate-200 dark:border-zinc-800/80 font-medium">
            <p className="leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
