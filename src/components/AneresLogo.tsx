import React, { useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface AneresLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'full' | 'horizontal' | 'mark' | 'badge' | 'seal';
  theme?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export function AneresLogo({
  className = '',
  size = 'md',
  variant = 'horizontal',
  theme = 'auto',
  showTagline = true,
}: AneresLogoProps) {
  const [imgSrc, setImgSrc] = useState('/aneres-logo.png');

  // Height mappings for different contexts
  const imgHeights = {
    xs: 'h-6 sm:h-7',
    sm: 'h-7 sm:h-8 md:h-9',
    md: 'h-9 sm:h-11 md:h-12',
    lg: 'h-14 sm:h-18 md:h-20',
    xl: 'h-20 sm:h-24 md:h-28',
    '2xl': 'h-28 sm:h-32 md:h-36',
  }[size];

  const textColor =
    theme === 'dark'
      ? 'text-white'
      : theme === 'light'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white';

  const logoImage = (
    <img
      src={imgSrc}
      alt="ANERES Studio Logo Oficial"
      loading="eager"
      className={`${imgHeights} w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none drop-shadow-[0_4px_16px_rgba(245,158,11,0.25)]`}
      onError={() => {
        // Fallback to direct ImgBB URL from https://ibb.co/5zBVwbC if local fails
        if (imgSrc !== 'https://i.ibb.co/B7qRF0v/LOGO-ANERES.png') {
          setImgSrc('https://i.ibb.co/B7qRF0v/LOGO-ANERES.png');
        }
      }}
    />
  );

  // Pure icon / emblem mark
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center relative group ${className}`}>
        {logoImage}
      </div>
    );
  }

  // Prestigious Seal Variant (e.g. for Video Portfolio / Quality Guarantee)
  if (variant === 'seal') {
    return (
      <div
        className={`inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-white/95 dark:bg-zinc-900/90 border border-amber-500/30 dark:border-amber-400/30 shadow-md dark:shadow-lg shadow-amber-500/10 backdrop-blur-md group hover:border-amber-500/60 dark:hover:border-amber-400/60 transition-all ${className}`}
      >
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full pointer-events-none group-hover:bg-amber-500/40 transition-colors" />
          <div className="relative">
            <img
              src={imgSrc}
              alt="ANERES Studio Selo"
              className="h-10 w-auto object-contain"
              onError={() => setImgSrc('https://i.ibb.co/B7qRF0v/LOGO-ANERES.png')}
            />
          </div>
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-heading font-black tracking-wider text-xs uppercase text-slate-900 dark:text-white">
              ANERES STUDIO
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[9px] font-mono font-bold uppercase tracking-wider">
              4K OFICIAL
            </span>
          </div>
          <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-semibold tracking-wide mt-1">
            Qualidade Audiovisual Certificada
          </span>
        </div>
      </div>
    );
  }

  // Hero / Showcase Prominent Badge Variant
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl bg-white/95 dark:bg-gradient-to-r dark:from-zinc-900/95 dark:via-zinc-900/80 dark:to-zinc-900/95 border border-amber-500/30 dark:border-amber-400/35 shadow-lg shadow-slate-900/5 dark:shadow-amber-500/10 backdrop-blur-md group hover:border-amber-500/60 dark:hover:border-amber-400/70 transition-all duration-300 max-w-full ${className}`}
      >
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-amber-500/25 blur-lg rounded-full pointer-events-none group-hover:bg-amber-400/40 transition-colors" />
          <div className="relative">
            <img
              src={imgSrc}
              alt="ANERES Studio Logo"
              className="h-8 sm:h-11 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgSrc('https://i.ibb.co/B7qRF0v/LOGO-ANERES.png')}
            />
          </div>
        </div>
        <div className="flex flex-col text-left justify-center min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-heading text-xs sm:text-sm md:text-base font-black tracking-[0.14em] sm:tracking-[0.16em] uppercase text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors truncate">
              ANERES STUDIO
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/15 dark:bg-amber-400/20 text-amber-700 dark:text-amber-400 text-[9px] sm:text-[10px] font-bold shrink-0">
              <Sparkles className="w-2.5 h-2.5" />
              <span>OFICIAL</span>
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] text-slate-700 dark:text-zinc-200 tracking-wider uppercase font-semibold mt-0.5 truncate">
            Produções Audiovisuais & Soluções Digitais
          </span>
        </div>
      </div>
    );
  }

  // Full Stacked Variant
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        <div className="mb-2 relative">
          <div className="absolute inset-0 bg-amber-500/15 blur-xl rounded-full pointer-events-none" />
          {logoImage}
        </div>
        <div className="flex flex-col items-center">
          <span className={`font-heading text-xl sm:text-2xl font-black tracking-[0.2em] uppercase ${textColor}`}>
            ANERES
          </span>
          {showTagline && (
            <div className="flex items-center gap-2 mt-1">
              <span className="w-5 h-[1.5px] bg-amber-500/80" />
              <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400">
                STUDIO PRODUÇÕES
              </span>
              <span className="w-5 h-[1.5px] bg-amber-500/80" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal brand lockup
  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 group ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-amber-500/15 blur-md rounded-full pointer-events-none group-hover:bg-amber-500/30 transition-colors" />
        {logoImage}
      </div>
      {showTagline && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-heading text-lg sm:text-xl font-black tracking-[0.16em] uppercase ${textColor}`}>
              ANERES
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 uppercase tracking-widest">
              Studio
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 leading-none">
            <span className="w-2.5 h-[1px] bg-amber-500/60" />
            <span className="text-[9px] font-semibold tracking-[0.2em] text-slate-600 dark:text-zinc-300 uppercase">
              Marketing & Audiovisual
            </span>
            <span className="w-2.5 h-[1px] bg-amber-500/60" />
          </div>
        </div>
      )}
    </div>
  );
}
