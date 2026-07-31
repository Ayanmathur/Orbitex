'use client';

import React from 'react';

interface ProcessStep {
  title: string;
  description: string;
  icon?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

export default function ProcessTimeline({
  steps,
  title = "Our Engineering & Growth Process",
  subtitle = "A structured collaborative journey connected by a continuous thread of quality.",
}: ProcessTimelineProps) {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">
            {title}
          </h2>
          <p className="text-[#6B6152] text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Process Timeline Wrapper */}
        <div className="relative">
          
          {/* DESKTOP ROPE: Continuous Serpentine Rope passing through hole punches */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
            <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <filter id="ropeShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#2A2416" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Base Rope Fiber Line */}
              <path
                d="M 100 50 Q 240 10, 340 50 T 580 50 T 820 50 T 1060 50"
                fill="none"
                stroke="#C4B18E"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#ropeShadow)"
              />
              {/* Twisted Fiber Pattern */}
              <path
                d="M 100 50 Q 240 10, 340 50 T 580 50 T 820 50 T 1060 50"
                fill="none"
                stroke="#8C7853"
                strokeWidth="4"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* MOBILE ROPE: Vertical Straight Ropes on Left & Right Sides */}
          <div className="lg:hidden absolute left-2.5 top-8 bottom-8 w-1 pointer-events-none z-20 border-l-4 border-dashed border-[#8C7853]" />
          <div className="lg:hidden absolute right-2.5 top-8 bottom-8 w-1 pointer-events-none z-20 border-r-4 border-dashed border-[#8C7853]" />

          {/* Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={idx}
                  className="paper-card p-6 relative flex flex-col justify-between min-h-[260px] bg-cream border border-tan tier-3 group hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Left Paper Hole Punch (Physical Die-Cut Hole) */}
                  <div className="paper-hole-punch -left-2.5 top-8" />
                  
                  {/* Right Paper Hole Punch (Physical Die-Cut Hole) */}
                  <div className="paper-hole-punch -right-2.5 top-8" />

                  {/* Header: Number & Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-display text-4xl md:text-5xl font-bold text-[#2A2416]/20 group-hover:text-[var(--accent)] transition-colors">
                      {numStr}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-ivory border border-tan flex items-center justify-center shadow-sm">
                      <img
                        src={`/icons/${step.icon || 'settings'}.svg`}
                        alt=""
                        className="w-5 h-5 opacity-75"
                        onError={(e) => {
                          e.currentTarget.src = '/icons/check.svg';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-[#2A2416] mb-2 font-display">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6B6152] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
