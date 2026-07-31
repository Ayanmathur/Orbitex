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
    <section className="py-24 px-6 md:px-12 relative overflow-hidden section-muted">
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
          
          {/* DESKTOP STRING: Sagging twine connecting through step card hole punches */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
            <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <filter id="stringShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#2A2416" floodOpacity="0.2" />
                </filter>
              </defs>

              {/* Straight & Sagging Base Twine String through Hole Punches at y=32 */}
              <path
                d="M 0 32 Q 120 36, 240 32 Q 360 36, 480 32 Q 600 36, 720 32 Q 840 36, 960 32 Q 1080 36, 1200 32"
                fill="none"
                stroke="#D9C8A9"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#stringShadow)"
              />
              {/* Twisted Twine Texture */}
              <path
                d="M 0 32 Q 120 36, 240 32 Q 360 36, 480 32 Q 600 36, 720 32 Q 840 36, 960 32 Q 1080 36, 1200 32"
                fill="none"
                stroke="#C4B18E"
                strokeWidth="3"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Pin-heads at each step card center */}
              <g fill="var(--accent)">
                <circle cx="120" cy="32" r="4" filter="url(#stringShadow)" />
                <circle cx="360" cy="32" r="4" filter="url(#stringShadow)" />
                <circle cx="600" cy="32" r="4" filter="url(#stringShadow)" />
                <circle cx="840" cy="32" r="4" filter="url(#stringShadow)" />
                <circle cx="1080" cy="32" r="4" filter="url(#stringShadow)" />
              </g>
            </svg>
          </div>

          {/* MOBILE ROPE: Vertical Straight Twine on Left & Right Sides directly passing through hole punches */}
          <div className="lg:hidden absolute left-5 top-0 bottom-0 w-1 pointer-events-none z-20 border-l-4 border-solid border-[#D9C8A9]" />
          <div className="lg:hidden absolute left-5 top-0 bottom-0 w-1 pointer-events-none z-20 border-l-4 border-dashed border-[#C4B18E]" />
          <div className="lg:hidden absolute right-5 top-0 bottom-0 w-1 pointer-events-none z-20 border-r-4 border-solid border-[#D9C8A9]" />
          <div className="lg:hidden absolute right-5 top-0 bottom-0 w-1 pointer-events-none z-20 border-r-4 border-dashed border-[#C4B18E]" />

          {/* Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={idx}
                  className="paper-card p-6 relative flex flex-col justify-between min-h-[260px] bg-cream border border-tan tier-3 group hover:-translate-y-2 transition-all duration-300 pin-accent"
                >
                  {/* Left Paper Hole Punch — Aligned with mobile left rope */}
                  <div className="paper-hole-punch left-3 top-8" />
                  
                  {/* Right Paper Hole Punch — Aligned with mobile right rope */}
                  <div className="paper-hole-punch right-3 top-8" />

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
