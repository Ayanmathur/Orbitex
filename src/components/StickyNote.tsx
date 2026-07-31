import React from 'react';

interface StickyNoteProps {
  children: React.ReactNode;
  rotation?: number;
  className?: string;
}

export default function StickyNote({
  children,
  rotation = -2,
  className = '',
}: StickyNoteProps) {
  return (
    <div
      className={`relative w-full max-w-[260px] p-5 shadow-tier-2 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        backgroundColor: 'color-mix(in srgb, var(--accent) 12%, var(--cream, #F5EFDF))',
        borderRadius: '4px',
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] rounded"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner peel */}
      <div
        className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(42,36,22,0.06) 50%, rgba(42,36,22,0.12) 100%)',
          borderRadius: '0 0 4px 0',
        }}
      />

      <div className="relative z-10 text-sm font-medium text-[#2A2416] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
