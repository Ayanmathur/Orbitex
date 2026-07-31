'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function RopeScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only render on desktop to avoid interfering with mobile touch interactions
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate progress 0 to 1
      const progress = docHeight > 0 ? Math.max(0, Math.min(1, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);
      
      // Set scrolling state for sway effect
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Recalculate on resize in case document height changes
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div className="hidden md:block fixed right-3 lg:right-6 top-0 bottom-0 w-8 z-50 pointer-events-none mix-blend-multiply opacity-80" aria-hidden="true">
      {/* 
        The Rope Track:
        A vertical SVG rope line with a slight bezier sag inward.
        Textured with a twist dash array. 
      */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 32 1000">
        <defs>
          <filter id="ropeGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0 0.09 0 0 0 0.06 0" />
            <feBlend mode="multiply" in2="SourceGraphic" in="grain" />
          </filter>
        </defs>
        
        {/* Shadow */}
        <path d="M 16 0 Q 12 500, 16 1000" fill="none" stroke="rgba(42,36,22,0.15)" strokeWidth="3" className="translate-x-0.5 translate-y-0.5" />
        
        {/* Base Rope Line */}
        <path d="M 16 0 Q 12 500, 16 1000" fill="none" stroke="#D9C8A9" strokeWidth="2" filter="url(#ropeGrain)" />
        
        {/* Twisted Twine Hatching */}
        <path d="M 16 0 Q 12 500, 16 1000" fill="none" stroke="#C4B18E" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>

      {/* 
        The Hanging Paper Tag Thumb:
        Translates vertically based on scrollProgress.
        Pivots slightly during active scroll, settles when stopped.
      */}
      <div 
        className="absolute left-1/2 w-6 h-9 -ml-3 transition-transform duration-100 ease-out will-change-transform"
        style={{
          /* Translate down based on viewport height (keeping tag entirely visible) */
          top: `calc(${scrollProgress * 100}vh - ${scrollProgress * 36}px)`,
          /* Rotate for sway: slightly pitched when moving, settles to 0 */
          transform: `rotate(${isScrolling ? '4deg' : '0deg'}) scale(${isScrolling ? 1.05 : 1})`,
        }}
      >
        {/* Paper tag shadow */}
        <div className="absolute inset-0 bg-cream border border-tan/80 rounded-b-md rounded-t-sm shadow-tier-3 flex flex-col items-center pt-1.5 overflow-hidden">
          {/* Subtle Matte Grain for the tag */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")` }} />
          
          {/* Punched hole where the rope threads through */}
          <div className="w-1.5 h-1.5 rounded-full bg-ivory shadow-inner border border-tan/40 z-10" />
          
          {/* Subtle accent trim at the bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)] opacity-80" />
        </div>
      </div>
    </div>
  );
}
