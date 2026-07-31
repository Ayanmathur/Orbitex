import React from 'react';
import Link from 'next/link';
import Icon from './Icon';

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
  children?: React.ReactNode;
}

export default function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  stats,
  accentColor = 'var(--accent)',
  children,
}: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden flex items-center bg-ivory pt-24 pb-16">
      {/* Vertical Social / Utility Rail on Right Edge (Reference Translation Spec §2) */}
      <div className="hidden xl:flex flex-col items-center space-y-4 absolute right-8 top-1/2 -translate-y-1/2 z-20">
        <div className="w-px h-16 bg-tan/60" />
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-cream border border-transparent hover:border-tan/40 transition-colors">
          <img src="/icons/facebook.svg" alt="Facebook" className="w-4 h-4 opacity-70 hover:opacity-100" />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-cream border border-transparent hover:border-tan/40 transition-colors">
          <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-4 h-4 opacity-70 hover:opacity-100" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-cream border border-transparent hover:border-tan/40 transition-colors">
          <img src="/icons/instagram.svg" alt="Instagram" className="w-4 h-4 opacity-70 hover:opacity-100" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-cream border border-transparent hover:border-tan/40 transition-colors">
          <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4 opacity-70 hover:opacity-100" />
        </a>
        <div className="w-px h-16 bg-tan/60" />
      </div>

      {/* Background Tier 1 Cutout Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-[80px] rotate-12 blur-[70px]"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full blur-[60px]"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 8%, transparent)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Subheadline, Dual CTAs, Trust Chips */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="headline-display text-4xl md:text-5xl lg:text-6xl text-[#2A2416] leading-tight">
              {headline}
            </h1>
            <p className="text-base md:text-lg text-[#6B6152] font-medium max-w-2xl leading-relaxed">
              {subheadline}
            </p>
            
            {primaryCta && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href={primaryCta.href} className="btn-primary rounded-full px-7 py-3 text-base font-semibold inline-flex items-center group">
                  <span>{primaryCta.text}</span>
                  <span className="ml-2 group-hover:rotate-45 transition-transform duration-250 ease-out">
                    <Icon name="arrow-cta" size={18} />
                  </span>
                </Link>
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="btn-outline rounded-full px-7 py-3 text-base font-semibold inline-flex items-center">
                    <span>{secondaryCta.text}</span>
                  </Link>
                )}
              </div>
            )}

            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-3 items-center pt-6 border-t border-tan/40">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-cream border border-tan rounded-xl px-4 py-2 flex items-center space-x-2 shadow-tier-1">
                    <span className="font-display font-bold text-[#2A2416] text-base">
                      {stat.value}{stat.suffix}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6152]">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Floating Stat Widget / Paper Diorama Child Layer */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-20">
            {children}
          </div>

        </div>
      </div>
    </section>
  );
}
