import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  threshold = 0.08,
  id,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If running in an environment without IntersectionObserver, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              const timer = setTimeout(() => setIsVisible(true), delay);
              return () => clearTimeout(timer);
            } else {
              setIsVisible(true);
            }
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      ref={domRef}
      id={id}
      className={`transition-all duration-700 ease-out transform motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 sm:translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}
