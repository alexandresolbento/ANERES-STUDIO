import React, { useState } from 'react';

interface AneresLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'horizontal' | 'mark';
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
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  }[size];

  const textColor = theme === 'dark' ? 'text-zinc-900' : 'text-white';

  const logoImage = (
    <img
      src={imgSrc}
      alt="ANERES Studio Logo"
      className={`${imgHeights} w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none drop-shadow-[0_2px_12px_rgba(234,88,12,0.25)]`}
      onError={() => {
        // Fallback to direct ImgBB URL from https://ibb.co/5zBVwbC if local fails
        if (imgSrc !== 'https://i.ibb.co/B7qRF0v/LOGO-ANERES.png') {
          setImgSrc('https://i.ibb.co/B7qRF0v/LOGO-ANERES.png');
        }
      }}
    />
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {logoImage}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        <div className="mb-2">
          {logoImage}
        </div>
        <div className="flex flex-col items-center">
          <span className={`font-heading text-xl sm:text-2xl font-black tracking-[0.2em] uppercase ${textColor}`}>
            ANERES
          </span>
          {showTagline && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-5 h-[1.5px] bg-amber-500/80" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-amber-400">
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
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        {logoImage}
      </div>
      {showTagline && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-heading text-lg sm:text-xl font-black tracking-[0.16em] uppercase ${textColor}`}>
              ANERES
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest">
              Studio
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 leading-none">
            <span className="w-2.5 h-[1px] bg-amber-500/60" />
            <span className="text-[9px] font-medium tracking-[0.2em] text-zinc-400 uppercase">
              Marketing & Audiovisual
            </span>
            <span className="w-2.5 h-[1px] bg-amber-500/60" />
          </div>
        </div>
      )}
    </div>
  );
}
