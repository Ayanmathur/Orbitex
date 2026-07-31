'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

export default function RopeScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getDocHeight = useCallback(() => {
    return document.documentElement.scrollHeight - window.innerHeight;
  }, []);

  useEffect(() => {
    // Only render on desktop
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const handleScroll = () => {
      if (isDragging) return; // Don't fight the drag

      const scrollTop = window.scrollY;
      const docHeight = getDocHeight();
      const progress = docHeight > 0 ? Math.max(0, Math.min(1, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);

      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isDragging, getDocHeight]);

  // === Drag-to-scroll logic ===
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const startY = e.clientY;
    const startProgress = scrollProgress;
    const viewportHeight = window.innerHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const deltaProgress = deltaY / viewportHeight;
      const newProgress = Math.max(0, Math.min(1, startProgress + deltaProgress));

      setScrollProgress(newProgress);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: newProgress * docHeight, behavior: 'auto' });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [scrollProgress]);

  // Click on the track to jump
  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const progress = Math.max(0, Math.min(1, clickY / rect.height));
    
    setScrollProgress(progress);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: progress * docHeight, behavior: 'smooth' });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="hidden md:block fixed right-6 lg:right-10 top-0 bottom-0 w-8 z-50 mix-blend-multiply opacity-80"
      style={{ cursor: 'pointer' }}
      onClick={handleTrackClick}
      aria-hidden="true"
    >
      {/* 
        The Rope Track:
        A vertical SVG rope line with a slight bezier sag inward.
        Textured with a twist dash array. 
      */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 32 1000">
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
        Draggable by mouse.
      */}
      <div 
        className="absolute left-1/2 w-7 h-10 -ml-3.5 will-change-transform"
        style={{
          top: `calc(${scrollProgress * 100}vh - ${scrollProgress * 40}px)`,
          transform: `rotate(${isScrolling || isDragging ? '4deg' : '0deg'}) scale(${isScrolling || isDragging ? 1.08 : 1})`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Paper tag body */}
        <div className="absolute inset-0 bg-cream border border-tan/80 rounded-b-md rounded-t-sm shadow-tier-3 flex flex-col items-center pt-1.5 overflow-hidden">
          {/* Subtle Matte Grain for the tag */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")` }} />
          
          {/* Punched hole where the rope threads through */}
          <div className="w-2 h-2 rounded-full bg-ivory shadow-inner border border-tan/40 z-10" />
          
          {/* Subtle accent trim at the bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)] opacity-80" />
        </div>
      </div>
    </div>
  );
}
