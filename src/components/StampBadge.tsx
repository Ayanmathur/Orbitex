'use client';

import React, { useRef, useEffect, useState } from 'react';

interface StampBadgeProps {
  value: string;
  label: string;
  rotation?: number;
  size?: number;
}

export default function StampBadge({
  value,
  label,
  rotation = -4,
  size = 110,
}: StampBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Generate a wobbly circle path (irregular stamp ring)
  const r = size / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const points = 36;
  const wobblePath = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2;
    // Pseudo-random wobble based on index
    const wobble = ((Math.sin(i * 7.3) * 1.5) + (Math.cos(i * 13.1) * 1.0));
    const pr = r + wobble;
    const x = cx + pr * Math.cos(angle);
    const y = cy + pr * Math.sin(angle);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ') + ' Z';

  return (
    <div
      ref={ref}
      className="inline-flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg) scale(${visible ? 1 : 1.15})`,
        opacity: visible ? 1 : 0,
        transition: 'transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease-out',
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0"
      >
        <defs>
          <filter id={`stampGrain-${size}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="multiply" in2="SourceGraphic" />
          </filter>
        </defs>
        {/* Wobbly outer ring */}
        <path
          d={wobblePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.65"
          filter={`url(#stampGrain-${size})`}
        />
        {/* Inner ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 6}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.35"
          strokeDasharray="2 2"
        />
      </svg>

      {/* Grain overlay for ink texture */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-[0.09]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span
          className="font-display font-bold leading-none"
          style={{ color: 'var(--accent)', opacity: 0.75, fontSize: size * 0.28 }}
        >
          {value}
        </span>
        <span
          className="font-semibold uppercase tracking-widest leading-tight mt-0.5"
          style={{ color: 'var(--accent)', opacity: 0.6, fontSize: Math.max(8, size * 0.09) }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
