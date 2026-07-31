'use client';

import React from 'react';

export default function BentoCollage() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Background Soft Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[var(--accent)] opacity-10 blur-3xl pointer-events-none" />

      {/* Layered Bento Photo Stack (Overlapped Left, Center, Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Photo Card */}
        <div className="md:col-span-4 transform md:-rotate-2 hover:rotate-0 transition-transform duration-300">
          <div className="paper-card p-3 bg-cream border border-tan shadow-paper">
            <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-beige">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Engineering Team Session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <span className="text-xs font-semibold text-[#2A2416]">Engineering Collaboration</span>
            </div>
          </div>
        </div>

        {/* Center Main Photo Card (Overlapping) */}
        <div className="md:col-span-5 z-20 transform md:scale-105 shadow-2xl">
          <div className="paper-card p-3.5 bg-ivory border-2 border-tan shadow-card">
            <div className="aspect-[16/10] rounded-xl overflow-hidden relative bg-beige">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80"
                alt="Product Design & Strategy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm font-bold font-display text-[#2A2416]">Unified Product Team</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                Orbitex Studio
              </span>
            </div>
          </div>
        </div>

        {/* Right Photo Card */}
        <div className="md:col-span-3 transform md:rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="paper-card p-3 bg-cream border border-tan shadow-paper">
            <div className="aspect-square rounded-xl overflow-hidden relative bg-beige">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
                alt="Analytics & Performance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <span className="text-xs font-semibold text-[#2A2416]">Measurable Growth</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
