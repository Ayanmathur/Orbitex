'use client';

import React from 'react';

export default function BentoCollage() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Crisp paper shape backdrop instead of blurred blob */}
      <div className="absolute inset-0 max-w-3xl mx-auto rounded-[40px] bg-beige/60 border border-tan/30 -rotate-1 shadow-tier-1 pointer-events-none -z-10" />

      {/* Layered Bento Photo Stack (Overlapped Left, Center, Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Photo Card (Paper Mount Treatment) */}
        <div className="md:col-span-4 transform md:-rotate-2 hover:rotate-0 transition-transform duration-300">
          <div className="paper-card p-4 bg-cream border border-tan shadow-tier-3">
            <div className="p-2 bg-ivory rounded-xl border border-tan/40 shadow-inner">
              <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-beige">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Engineering Team Session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="pt-3 text-center">
              <span className="text-xs font-semibold text-[#2A2416]">Engineering Collaboration</span>
            </div>
          </div>
        </div>

        {/* Center Main Photo Card (Torn Edge Roughness Moment + Tier 4 Shadow) */}
        <div className="md:col-span-5 z-20 transform md:scale-105">
          <div className="paper-card p-4 bg-cream border border-tan shadow-tier-4 torn-paper-edge relative">
            <div className="p-2.5 bg-ivory rounded-xl border border-tan/50 shadow-inner">
              <div className="aspect-[16/10] rounded-lg overflow-hidden relative bg-beige">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80"
                  alt="Product Design & Strategy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="pt-3 flex justify-between items-center px-1">
              <span className="text-sm font-bold font-display text-[#2A2416]">Unified Product Team</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/20">
                Orbitex Studio
              </span>
            </div>
          </div>
        </div>

        {/* Right Photo Card (Paper Mount) */}
        <div className="md:col-span-3 transform md:rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="paper-card p-4 bg-cream border border-tan shadow-tier-3">
            <div className="p-2 bg-ivory rounded-xl border border-tan/40 shadow-inner">
              <div className="aspect-square rounded-lg overflow-hidden relative bg-beige">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
                  alt="Analytics & Performance"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="pt-3 text-center">
              <span className="text-xs font-semibold text-[#2A2416]">Measurable Growth</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
