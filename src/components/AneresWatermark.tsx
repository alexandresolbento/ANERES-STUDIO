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
    sm: 'w-[140px] sm:w-[200px] max-w-[35vw]',
    md: 'w-[180px] sm:w-[250px] max-w-[40vw]',
    lg: 'w-[220px] sm:w-[320px] max-w-[45vw]',
    xl: 'w-[260px] sm:w-[380px] max-w-[50vw]',
    '2xl': 'w-[300px] sm:w-[440px] max-w-[55vw]',
  }[size];

  const positionClasses = {
    'top-right': 'top-2 right-2 sm:top-6 sm:right-6',
    'top-left': 'top-2 left-2 sm:top-6 sm:left-6',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'bottom-right': 'bottom-2 right-2 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-2 left-2 sm:bottom-6 sm:left-6',
    'custom': '',
  }[position];

  return (
    <div
      className={`absolute ${positionClasses} pointer-events-none select-none z-0 overflow-hidden transition-opacity duration-1000 ${className}`}
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
