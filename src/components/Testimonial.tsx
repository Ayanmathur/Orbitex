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

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 px-6 md:px-12">
      <div className="absolute top-10 left-10 text-[var(--accent)] opacity-10 font-fraunces text-9xl pointer-events-none">
        &ldquo;
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <img src="/icons/quote.svg" alt="Quote" className="w-12 h-12 mb-8" />
        
        <div className="relative w-full min-h-[200px] flex items-center justify-center">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <p className="headline-display text-2xl md:text-3xl lg:text-4xl leading-tight mb-8 max-w-4xl text-near-black">
                "{t.quote}"
              </p>
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-near-black">{t.author}</p>
                <p className="text-warm-taupe">{t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-[var(--accent)]' : 'bg-tan hover:bg-warm-taupe'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
