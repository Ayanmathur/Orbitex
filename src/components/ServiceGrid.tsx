'use client';

import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  isFeatured?: boolean;
}

interface ServiceGridProps {
  services: ServiceItem[];
  title?: string;
  subtitle?: string;
}

export default function ServiceGrid({
  services,
  title = "Our Core Capabilities",
  subtitle = "Specialized engineering and growth solutions designed for scale and durability.",
}: ServiceGridProps) {
  return (
    <section className="py-20 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">
            {title}
          </h2>
          <p className="text-[#6B6152] text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* 4-Card Grid (2x2 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.slice(0, 4).map((service, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            const isFeatured = service.isFeatured || idx === 0;

            return (
              <div
                key={idx}
                className={`paper-card p-8 relative flex flex-col justify-between min-h-[220px] bg-cream border border-tan group transition-all duration-300 hover:-translate-y-1.5 fold-corner ${
                  isFeatured ? 'tier-4 border-[var(--accent)]/50 torn-paper-edge' : 'tier-3'
                }`}
              >
                {/* Oversized Debossed Ghost Number (Stamped into Paper) */}
                <span className="absolute -top-4 -right-2 font-display text-8xl md:text-9xl font-bold text-tan/40 select-none pointer-events-none drop-shadow-sm group-hover:text-[var(--accent)]/10 transition-colors z-0">
                  {numStr}
                </span>

                {/* Header Row: Icon Badge (Left) */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  {/* Icon Badge Layer (Sits on top with contact shadow) */}
                  <div className="paper-badge bg-ivory p-3 rounded-2xl border border-tan/80 shadow-tier-1 flex items-center justify-center">
                    <img
                      src={`/icons/${service.icon}.svg`}
                      alt=""
                      className="w-6 h-6"
                      onError={(e) => {
                        e.currentTarget.src = '/icons/check.svg';
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="headline-display text-xl md:text-2xl text-[#2A2416]">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#6B6152] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
