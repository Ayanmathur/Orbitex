'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import CountUp from './CountUp';

interface CTA {
  text: string;
  href: string;
}

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  stats?: Stat[];
  accentColor?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export default function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  stats,
  accentColor = 'var(--accent)',
  backgroundImage,
  children,
}: HeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Disable parallax on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-light-theme relative w-full overflow-hidden flex items-center min-h-[85vh] pt-24 pb-20">
      
      {/* === Tier 1-2: Background Image Layer === */}
      {backgroundImage ? (
        <div className="absolute inset-0 z-0">
          {/* The actual photo — printed on matte paper feel */}
          <img 
            src={backgroundImage} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ 
              filter: 'contrast(1.05) saturate(0.7) brightness(0.85)',
              transform: `translate(${mouseOffset.x * 3}px, ${mouseOffset.y * 3}px)`
            }}
          />
          {/* Warm-neutral color-grade overlay */}
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(135deg, rgba(251,247,240,0.82) 0%, rgba(245,239,227,0.65) 40%, rgba(237,227,208,0.55) 100%)` 
            }}
          />
          {/* Matte grain overlay */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          }} />
        </div>
      ) : (
        /* Fallback: solid ivory when no image is provided */
        <div className="absolute inset-0 z-0 bg-ivory" />
      )}

      {/* Torn/deckled bottom edge transition */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-[40px] block">
          <path 
            d="M0,20 Q30,8 60,18 T120,14 T180,22 T240,12 T300,20 T360,10 T420,18 T480,14 T540,22 T600,16 T660,20 T720,10 T780,18 T840,22 T900,14 T960,20 T1020,12 T1080,18 T1140,22 T1200,14 T1260,18 T1320,22 T1380,16 T1440,20 L1440,40 L0,40 Z" 
            fill="var(--ivory, #FBF7F0)" 
          />
        </svg>
      </div>

      {/* Vertical Social / Utility Rail on Right Edge */}
      <div className="hidden xl:flex flex-col items-center space-y-3 absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-cream/90 border border-tan/60 rounded-full py-4 px-1.5 shadow-tier-2">
        <div className="w-px h-10 bg-[#2A2416]/20" />
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-ivory border border-tan/30 hover:border-tan/60 transition-colors">
          <img src="/icons/facebook.svg" alt="Facebook" className="w-4 h-4 opacity-90 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-ivory border border-tan/30 hover:border-tan/60 transition-colors">
          <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-4 h-4 opacity-90 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-ivory border border-tan/30 hover:border-tan/60 transition-colors">
          <img src="/icons/instagram.svg" alt="Instagram" className="w-4 h-4 opacity-90 hover:opacity-100 transition-opacity" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-ivory border border-tan/30 hover:border-tan/60 transition-colors">
          <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4 opacity-90 hover:opacity-100 transition-opacity" />
        </a>
        <div className="w-px h-10 bg-[#2A2416]/20" />
      </div>

      {/* === Tier 3-4: Foreground Content === */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Subheadline, Dual CTAs, Trust Chips */}
          <div 
            className="lg:col-span-7 space-y-4 sm:space-y-6 transition-transform duration-200 ease-out"
            style={{ transform: `translate(${mouseOffset.x * -4}px, ${mouseOffset.y * -4}px)` }}
          >
            <h1 className="headline-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2A2416] leading-snug sm:leading-tight drop-shadow-[0_1px_2px_rgba(251,247,240,0.5)] torn-reveal">
              {headline}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#4A4236] font-medium max-w-2xl leading-relaxed torn-reveal torn-reveal-delay-1">
              {subheadline}
            </p>
            
            {primaryCta && (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2 torn-reveal torn-reveal-delay-2">
                <Link href={primaryCta.href} className="btn-primary rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold inline-flex items-center group">
                  <span>{primaryCta.text}</span>
                  <span className="ml-2 group-hover:rotate-45 transition-transform duration-250 ease-out">
                    <Icon name="arrow-cta" size={16} />
                  </span>
                </Link>
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="btn-outline rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold inline-flex items-center bg-cream/70 backdrop-blur-none">
                    <span>{secondaryCta.text}</span>
                  </Link>
                )}
              </div>
            )}

            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center pt-4 sm:pt-6 border-t border-tan/40 torn-reveal torn-reveal-delay-3">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-cream/80 border border-tan rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 flex items-center space-x-2 shadow-tier-1">
                    <span className="font-display font-bold text-[#2A2416] text-sm sm:text-base">
                      <CountUp value={`${stat.value}${stat.suffix || ''}`} />
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#6B6152]">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Floating Stat Widget / Paper Diorama Child Layer (Tier 4 with layer parallax displacement) */}
          <div 
            className="lg:col-span-5 flex justify-center lg:justify-end z-20 transition-transform duration-200 ease-out"
            style={{ transform: `translate(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px)` }}
          >
            {children}
          </div>

        </div>
      </div>
    </section>
  );
}
