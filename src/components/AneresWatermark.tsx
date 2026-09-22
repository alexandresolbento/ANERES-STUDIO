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
    sm: 'w-[280px] sm:w-[360px] max-w-[80vw]',
    md: 'w-[360px] sm:w-[480px] max-w-[85vw]',
    lg: 'w-[450px] sm:w-[620px] lg:w-[720px] max-w-[90vw]',
    xl: 'w-[520px] sm:w-[720px] lg:w-[860px] max-w-[92vw]',
    '2xl': 'w-[600px] sm:w-[860px] lg:w-[1050px] max-w-[95vw]',
  }[size];

  const positionClasses = {
    'top-right': 'top-6 -right-16 sm:top-10 sm:-right-20 lg:top-12 lg:-right-24',
    'top-left': 'top-6 -left-16 sm:top-10 sm:-left-20 lg:top-12 lg:-left-24',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'bottom-right': 'bottom-6 -right-16 sm:bottom-10 sm:-right-20 lg:bottom-12 lg:-right-24',
    'bottom-left': 'bottom-6 -left-16 sm:bottom-10 sm:-left-20 lg:bottom-12 lg:-left-24',
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
