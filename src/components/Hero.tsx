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
    <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center bg-ivory pt-24 pb-16">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-[100px] rotate-12 blur-[80px]"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)` }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[60px]"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 8%, transparent)` }}
        />
        <div 
          className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-[50px] -rotate-12 blur-[40px]"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 10%, transparent)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="headline-display text-5xl md:text-6xl lg:text-7xl mb-6 text-near-black">
              {headline}
            </h1>
            <p className="text-xl md:text-2xl text-warm-taupe mb-10 font-medium max-w-xl">
              {subheadline}
            </p>
            
            {primaryCta && (
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link href={primaryCta.href} className="btn-primary rounded-full px-8 py-3.5 text-lg font-medium inline-flex items-center group">
                {primaryCta.text}
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-250 ease-out">
                  <Icon name="arrow-cta" size={20} />
                </span>
              </Link>
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-outline rounded-full px-8 py-3.5 text-lg font-medium inline-flex items-center transition-colors">
                  {secondaryCta.text}
                </Link>
              )}
            </div>
            )}

            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-4 items-center mt-8 pt-8 border-t border-tan/50">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-cream border border-tan rounded-full px-4 py-2 flex items-center space-x-2 shadow-sm">
                    <span className="font-display font-bold text-near-black text-lg">
                      {stat.value}{stat.suffix}
                    </span>
                    <span className="text-sm font-medium text-warm-taupe">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative lg:h-full flex items-center justify-center lg:justify-end perspective-1000">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
