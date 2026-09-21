import { useEffect } from 'react';
import { X, Youtube, ExternalLink, Share2, Check } from 'lucide-react';
import { useState } from 'react';

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
    navigator.clipboard.writeText(youtubeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cinema Screen Header Bar */}
        <div className="bg-zinc-900/90 px-4 sm:px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shrink-0" />
            <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider truncate">
              {client ? `${client} // ` : ''}{title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
              title="Copiar Link do YouTube"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
            </button>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Ver no YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-2"
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
          <div className="p-4 sm:p-5 bg-zinc-950 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/80">
            <p className="leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
