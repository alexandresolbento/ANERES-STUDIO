import React, { useState } from 'react';

interface AneresWatermarkProps {
  position?: 'top-right' | 'top-left' | 'center' | 'bottom-right' | 'bottom-left' | 'custom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  opacity?: string;
  rotation?: string;
  className?: string;
  glow?: boolean;
}

export function AneresWatermark({
  position = 'top-right',
  size = 'lg',
  opacity = 'opacity-[0.035] sm:opacity-[0.045]',
  rotation = '-rotate-6',
  className = '',
  glow = true,
}: AneresWatermarkProps) {
  const [imgSrc, setImgSrc] = useState('/aneres-logo.png');

  const sizeClasses = {
    sm: 'w-[180px] sm:w-[260px] md:w-[320px] max-w-[65vw]',
    md: 'w-[240px] sm:w-[340px] md:w-[440px] max-w-[75vw]',
    lg: 'w-[300px] sm:w-[440px] md:w-[580px] lg:w-[680px] max-w-[80vw]',
    xl: 'w-[340px] sm:w-[520px] md:w-[680px] lg:w-[820px] max-w-[85vw]',
    '2xl': 'w-[380px] sm:w-[620px] md:w-[780px] lg:w-[940px] max-w-[90vw]',
  }[size];

  const positionClasses = {
    'top-right': '-top-4 -right-8 sm:top-6 sm:-right-14 lg:top-10 lg:-right-16',
    'top-left': '-top-4 -left-8 sm:top-6 sm:-left-14 lg:top-10 lg:-left-16',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'bottom-right': '-bottom-4 -right-8 sm:bottom-6 sm:-right-14 lg:bottom-10 lg:-right-16',
    'bottom-left': '-bottom-4 -left-8 sm:bottom-6 sm:-left-14 lg:bottom-10 lg:-left-16',
    'custom': '',
  }[position];

  return (
    <div
      className={`absolute ${positionClasses} pointer-events-none select-none z-0 overflow-visible transition-opacity duration-1000 ${className}`}
      aria-hidden="true"
    >
      <div className={`relative ${rotation}`}>
        {/* Subtle ambient amber aura behind the watermark */}
        {glow && (
          <div className="absolute inset-0 bg-amber-500/10 blur-[90px] sm:blur-[130px] rounded-full scale-110 pointer-events-none -z-10" />
        )}
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className={`${sizeClasses} h-auto object-contain ${opacity} filter contrast-125 transition-all`}
          onError={() => {
            if (imgSrc !== 'https://i.ibb.co/B7qRF0v/LOGO-ANERES.png') {
              setImgSrc('https://i.ibb.co/B7qRF0v/LOGO-ANERES.png');
            }
          }}
        />
      </div>
    </div>
  );
}
