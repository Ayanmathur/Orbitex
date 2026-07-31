'use client';

import React from 'react';

interface WaxSealStampProps {
  title?: string;
  subtitle?: string;
  onReset?: () => void;
}

export default function WaxSealStamp({
  title = "SCOPE RECEIVED",
  subtitle = "Orbitex Studio Seal of Quality",
  onReset,
}: WaxSealStampProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
      {/* Physical Wax Seal Circle */}
      <div 
        className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-tier-4 cursor-pointer group"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #DC2626 0%, #B91C1C 50%, #991B1B 80%, #7F1D1D 100%)',
          boxShadow: '0 12px 28px -6px rgba(127, 29, 29, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.25)',
          animation: 'waxStampImpact 450ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
      >
        {/* Scalloped Wax Rim Effect */}
        <div 
          className="absolute inset-[-4px] rounded-full border-2 border-dashed border-[#EF4444]/40 opacity-70 pointer-events-none"
        />

        {/* Debossed Inner Ring */}
        <div 
          className="w-24 h-24 rounded-full border-2 border-red-300/40 flex flex-col items-center justify-center p-2 text-center"
          style={{
            boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Star/Check Icon */}
          <svg className="w-8 h-8 text-amber-100 drop-shadow-md mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          {/* Embossed Text */}
          <span 
            className="font-display font-bold text-[9px] uppercase tracking-widest text-amber-100/90 leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
          >
            {title}
          </span>
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="headline-display text-2xl font-bold text-[#2A2416]">
          Project Scoped & Confirmed!
        </h3>
        <p className="text-sm text-warm-taupe leading-relaxed">
          Your request has been officially stamped and assigned to our lead engineering team. We will review your goals and reach out within 24 hours.
        </p>
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="btn-outline text-xs py-2 px-5 mt-2"
        >
          Submit Another Request
        </button>
      )}
    </div>
  );
}
