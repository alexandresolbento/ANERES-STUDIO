import { useState } from 'react';
import { Play, ExternalLink, Youtube, Film, Eye, Clock, MonitorPlay } from 'lucide-react';
import { FEATURED_VIDEOS } from '../data/videos';
import { VideoWork } from '../types';

interface VideoShowcaseProps {
  onSelectVideoForCinema: (video: VideoWork) => void;
}

export function VideoShowcase({ onSelectVideoForCinema }: VideoShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeInlineVideoId, setActiveInlineVideoId] = useState<string | null>(null);

  const categories = [
    'Todos',
    'Documentário & Eventos',
    'Brand Film',
    'Comercial & TV',
    'Social & Reels',
    'Identidade & Motion',
  ];

  const filteredVideos = selectedCategory === 'Todos'
    ? FEATURED_VIDEOS
    : FEATURED_VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 md:py-28 relative bg-zinc-950/90 border-t border-zinc-900">
      {/* Visual glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/40 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
              <Youtube className="w-3.5 h-3.5 text-red-500 fill-current" />
              <span>Portfólio em Vídeo & Produções no YouTube</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Nossos Trabalhos Audiovisuais
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Assista às produções da ANERES Studio diretamente nas telas abaixo. Todos os vídeos foram gravados e finalizados com qualidade profissional e estão disponíveis no nosso canal oficial.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`filter-video-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20'
                    : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Official Channel Announcement Card */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-red-950/50 via-zinc-900/90 to-zinc-950 border border-red-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-600/30">
              <Youtube className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  Canal Oficial no YouTube
                </span>
                <span className="text-xs text-zinc-400">@ANERESSTUDIO</span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white mt-1">
                Acompanhe o Portfólio Completo da ANERES Studio
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 max-w-2xl">
                Acesse o canal no YouTube para conferir nossas coberturas de eventos, comerciais para lojas, filmes de casamento e projetos em 4K.
              </p>
            </div>
          </div>

          <a
            href="https://www.youtube.com/@ANERESSTUDIO"
            target="_blank"
            rel="noopener noreferrer"
            id="btn-visit-youtube-channel"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-red-600/25 hover:shadow-red-600/40 transition-all shrink-0 group"
          >
            <Youtube className="w-5 h-5 fill-current" />
            <span>Acessar @ANERESSTUDIO</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Video Screens Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredVideos.map((video) => {
            const isPlayingInline = activeInlineVideoId === video.id;

            return (
              <div
                key={video.id}
                id={`video-screen-card-${video.id}`}
                className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/80 overflow-hidden shadow-2xl transition-all flex flex-col"
              >
                {/* Screen Monitor Bezel Header */}
                <div className="bg-zinc-950/90 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                      {video.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 border border-zinc-800">
                      4K UHD
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Interactive Video Screen Frame */}
                <div className="relative aspect-video bg-black w-full overflow-hidden">
                  {isPlayingInline ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Dark overlay with film grain vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveInlineVideoId(video.id)}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/40 hover:scale-110 active:scale-95 transition-all group/btn cursor-pointer"
                          aria-label={`Reproduzir ${video.title}`}
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                        </button>
                      </div>

                      {/* Stats Pills in Screen Corner */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md text-[11px] font-medium text-zinc-200 border border-zinc-800">
                          <Eye className="w-3 h-3 text-amber-400" />
                          {video.views}
                        </span>

                        <span className="px-2.5 py-1 rounded-md bg-zinc-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-zinc-800">
                          {video.client}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info & Controls */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-zinc-900/40">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          {video.client}
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                          {video.title}
                        </h3>
                      </div>

                      {/* Quick Cinema Modal Trigger */}
                      <button
                        type="button"
                        onClick={() => onSelectVideoForCinema(video)}
                        title="Abrir em Tela Cheia"
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <MonitorPlay className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>

                    {/* Deliverables Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {video.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to YouTube */}
                  <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        if (isPlayingInline) {
                          setActiveInlineVideoId(null);
                        } else {
                          setActiveInlineVideoId(video.id);
                        }
                      }}
                      className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isPlayingInline ? 'Fechar Player' : 'Assistir na Tela'}</span>
                    </button>

                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 hover:underline transition-colors"
                    >
                      <Youtube className="w-4 h-4 fill-current" />
                      <span>Assistir no YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
