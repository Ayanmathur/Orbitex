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
  const checklist = [
    "Expert team of engineers and growth specialists",
    "Transparent pricing and timelines",
    "99.9% Uptime Benchmark for custom software",
    "Dedicated project manager for every build"
  ];

  return (
    <section id="contact" className={`py-10 sm:py-14 px-4 sm:px-6 md:px-12 division-${division}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left: Headline, Subheadline & Checklist */}
          <div className="lg:col-span-5 space-y-5 pr-0 lg:pr-6">
            <div className="space-y-3">
              <h2 className="headline-display text-2xl sm:text-3xl md:text-4xl text-[#2A2416] leading-snug">
                {headline}
              </h2>
              <p className="text-[#6B6152] text-xs sm:text-sm md:text-base">
                {subheadline}
              </p>
            </div>

            <ul className="space-y-4 pt-4">
              {checklist.map((item, idx) => (
                <li key={idx} className="flex items-start text-[#2A2416] font-medium text-sm md:text-base">
                  <div className="mt-0.5 mr-3 flex-shrink-0 paper-badge bg-ivory p-1.5 rounded-lg border border-tan/60 shadow-sm">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Lead Form Card (Tier 4 depth) */}
          <div className="lg:col-span-7 w-full flex justify-end">
            <div className="w-full max-w-2xl relative">
              {/* Optional Tier 3 decorative background paper behind the form */}
              <div className="hidden md:block absolute -inset-4 bg-cream/50 border border-tan/30 rounded-[28px] rotate-1 shadow-sm -z-10" />
              <LeadForm division={division} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
