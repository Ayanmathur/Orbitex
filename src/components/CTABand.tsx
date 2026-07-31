import React from 'react';
import Link from 'next/link';

interface CTABandProps {
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CTABand({
  headline,
  subheadline,
  ctaText = 'Get a Quote',
  ctaHref = '/quote'
}: CTABandProps) {
  return (
    <div className="cta-band w-full py-20 px-6 md:px-12 flex flex-col items-center justify-center text-center">
      <h2 className="headline-display text-white text-3xl md:text-5xl mb-6 max-w-3xl">
        {headline}
      </h2>
      <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl">
        {subheadline}
      </p>
      <Link href={ctaHref} className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--accent)] rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg space-x-2 group">
        <span>{ctaText}</span>
        <img src="/icons/arrow-cta.svg" alt="" className="w-5 h-5 transition-transform group-hover:rotate-45 opacity-80 mix-blend-luminosity" />
      </Link>
    </div>
  );
}
