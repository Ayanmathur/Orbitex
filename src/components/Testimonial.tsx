'use client';

import React, { useState, useEffect } from 'react';
import type { Testimonial as TestimonialType } from '@/lib/data';

interface TestimonialProps {
  testimonials: TestimonialType[];
}

export default function Testimonial({ testimonials }: TestimonialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      {/* 4-Sided Physical Wooden Picture Frame */}
      <div className="wooden-picture-frame-4sided relative">
        {/* Brass Corner Brackets */}
        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm opacity-90 z-20 pointer-events-none" />

        {/* Inner Matting Bevel */}
        <div className="wooden-frame-inner-mat">
          {/* Testimonial Card */}
          <div className="paper-card p-8 md:p-12 relative overflow-hidden text-center bg-cream/90 border border-tan shadow-paper rounded-xl">
            {/* Subtle decorative quotation mark */}
            <div className="absolute top-4 left-6 text-[var(--accent)] opacity-10 font-display text-8xl pointer-events-none select-none">
              &ldquo;
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-ivory border border-tan flex items-center justify-center mb-6 shadow-sm">
                <img src="/icons/quote.svg" alt="Quote" className="w-6 h-6" />
              </div>

              <p className="headline-display text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 max-w-2xl text-[#2A2416] transition-all duration-300">
                "{current.quote}"
              </p>

              <div className="flex flex-col items-center space-y-0.5">
                <p className="font-bold text-base text-[#2A2416]">{current.author}</p>
                <p className="text-xs text-[#6B6152] font-medium">{current.role}, {current.company}</p>
              </div>

              {/* Dots */}
              {testimonials.length > 1 && (
                <div className="flex space-x-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'w-8 bg-[var(--accent)]' : 'w-2.5 bg-tan hover:bg-warm-taupe'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
