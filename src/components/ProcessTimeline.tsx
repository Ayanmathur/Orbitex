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
  subtitle = "A structured, 5-step collaborative journey from initial discovery to continuous scaling.",
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

        {/* Process Steps Grid with Hole-Punch Cards & Connecting Rope Line */}
        <div className="relative">
          {/* Connecting Curved Rope SVG Line (Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
              {/* Dashed Rope Line passing through holes */}
              <path
                d="M 180 120 Q 300 200, 420 120 T 660 120 T 900 120 T 1100 120"
                fill="none"
                stroke="var(--color-tan)"
                strokeWidth="3"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={idx}
                  className="paper-card p-6 relative flex flex-col justify-between min-h-[260px] group transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Left Paper Hole Punch */}
                  <div className="paper-hole-punch -left-2 top-8" />
                  
                  {/* Right Paper Hole Punch */}
                  <div className="paper-hole-punch -right-2 top-8" />

                  {/* Number Mark (Reference Screenshot 3 Style) */}
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
