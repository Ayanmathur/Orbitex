'use client';

import React from 'react';
import LeadForm from './LeadForm';

interface ContactSectionProps {
  division?: 'hub' | 'software' | 'web' | 'marketing';
  headline?: string;
  subheadline?: string;
}

export default function ContactSection({
  division = 'hub',
  headline = "Not sure which team you need? Let's talk.",
  subheadline = "Tell us about your project goals, timeline, and requirements. We will route your request to the right specialist team and prepare a custom quote.",
}: ContactSectionProps) {
  return (
    <section id="contact" className={`py-20 px-6 md:px-12 section-muted division-${division}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="headline-display text-3xl md:text-4xl text-[#2A2416]">
            {headline}
          </h2>
          <p className="text-[#6B6152] text-base md:text-lg">
            {subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Lead Form */}
          <div className="lg:col-span-7">
            <LeadForm division={division} />
          </div>

          {/* Right: Growth Overview Widget Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="paper-card bg-cream border border-tan rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow duration-350 ease-out w-full max-w-md sticky top-28">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="paper-badge bg-ivory rounded-xl p-2 border border-tan shadow-sm flex items-center justify-center">
                    <img src="/icons/check.svg" alt="check icon" width="20" height="20" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2A2416]">Growth Overview</h3>
                    <p className="text-xs text-[#6B6152]">Last 30 days</p>
                  </div>
                </div>
                <div className="flex items-center bg-ivory rounded-full px-2.5 py-1 border border-tan">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
                  <span className="text-[10px] font-bold text-[#2A2416] uppercase tracking-wider">Live</span>
                </div>
              </div>

              <div className="flex items-baseline space-x-4 mb-6">
                <h2 className="headline-display text-4xl font-bold text-[#2A2416]">30+</h2>
                <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)' }}>
                  +12%
                </div>
              </div>

              <div className="w-full h-24 mb-6 relative overflow-hidden rounded-lg bg-ivory/50 border border-tan/40">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25"></stop>
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 40 L0 25 Q 10 30, 25 15 T 50 20 T 75 10 T 100 5 L100 40 Z" fill="url(#gradientArea)"></path>
                  <path d="M0 25 Q 10 30, 25 15 T 50 20 T 75 10 T 100 5" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-ivory border border-tan rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-[#6B6152] mb-1">Products</span>
                  <span className="font-semibold text-[#2A2416] text-sm">6</span>
                </div>
                <div className="bg-ivory border border-tan rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-[#6B6152] mb-1">Divisions</span>
                  <span className="font-semibold text-[#2A2416] text-sm">3</span>
                </div>
                <div className="bg-ivory border border-tan rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-[#6B6152] mb-1">Clients</span>
                  <span className="font-semibold text-[#2A2416] text-sm">30+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
