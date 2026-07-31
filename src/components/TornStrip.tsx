import React from 'react';

interface TornStripProps {
  className?: string;
  accentOpacity?: number;
  height?: number;
}

export default function TornStrip({
  className = '',
  accentOpacity = 0.08,
  height = 30,
}: TornStripProps) {
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
    >
      {/* Accent-tinted fill */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `color-mix(in srgb, var(--accent) ${accentOpacity * 100}%, var(--cream, #F5EFDF))` }}
      />

      {/* Torn top edge */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 10"
        preserveAspectRatio="none"
        style={{ height: 10, marginTop: -9 }}
      >
        <path
          d="M0,8 Q20,2 40,7 T80,5 T120,8 T160,4 T200,7 T240,3 T280,8 T320,5 T360,7 T400,3 T440,8 T480,4 T520,7 T560,5 T600,8 T640,3 T680,6 T720,8 T760,4 T800,7 T840,5 T880,8 T920,3 T960,6 T1000,8 T1040,4 T1080,7 T1120,5 T1160,8 T1200,3 T1240,7 T1280,5 T1320,8 T1360,4 T1400,7 T1440,6 L1440,10 L0,10 Z"
          fill="var(--ivory, #FBF7F0)"
        />
      </svg>

      {/* Torn bottom edge */}
      <svg
        className="absolute bottom-0 left-0 w-full rotate-180"
        viewBox="0 0 1440 10"
        preserveAspectRatio="none"
        style={{ height: 10, marginBottom: -9 }}
      >
        <path
          d="M0,8 Q25,3 50,7 T100,5 T150,8 T200,3 T250,7 T300,5 T350,8 T400,4 T450,7 T500,5 T550,8 T600,3 T650,6 T700,8 T750,4 T800,7 T850,5 T900,8 T950,3 T1000,6 T1050,8 T1100,4 T1150,7 T1200,5 T1250,8 T1300,3 T1350,7 T1400,5 T1440,7 L1440,10 L0,10 Z"
          fill="var(--ivory, #FBF7F0)"
        />
      </svg>

      {/* Subtle shadow cast downward */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[6px] translate-y-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(42,36,22,0.06), transparent)',
        }}
      />
    </div>
  );
}
