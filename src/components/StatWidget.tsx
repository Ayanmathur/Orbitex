"use client";

import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import CountUp from './CountUp';

interface StatFooter {
  label: string;
  value: string;
}

interface StatWidgetProps {
  title: string;
  subtitle?: string;
  mainMetric: string;
  trendValue: string;
  trendPositive: boolean;
  footerStats: StatFooter[];
  accentColor?: string;
}

export default function StatWidget({
  title,
  subtitle,
  mainMetric,
  trendValue,
  trendPositive,
  footerStats,
  accentColor = 'var(--accent)',
}: StatWidgetProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Decorative satellite mini-card behind main widget at Tier 2 */}
      <div className="hidden sm:block absolute -top-3 -right-3 w-32 h-24 bg-cream/70 border border-tan/50 rounded-2xl rotate-3 shadow-tier-2 -z-10 group-hover:rotate-6 transition-transform duration-300 ease-out" />

      {/* Main Tier 4 Metric Card */}
      <div className="paper-card bg-cream border border-tan rounded-[24px] p-6 shadow-tier-4 w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className="paper-badge bg-ivory rounded-xl p-2 border border-tan shadow-tier-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-250">
               <Icon name="check" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-near-black">{title}</h3>
              <p className="text-xs text-warm-taupe">{subtitle || 'Last 30 days'}</p>
            </div>
          </div>
          <div className="flex items-center bg-ivory rounded-full px-2.5 py-1 border border-tan/60 shadow-tier-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
            <span className="text-[10px] font-bold text-near-black uppercase tracking-wider">Live</span>
          </div>
        </div>

        {/* Hero Metric & Trend */}
        <div className="flex items-baseline space-x-4 mb-6">
          <h2 className="font-display text-4xl font-bold text-near-black">
            <CountUp value={mainMetric} />
          </h2>
          <div 
            className="flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-tan/30"
            style={{ 
              backgroundColor: `color-mix(in srgb, ${accentColor} 12%, var(--color-cream))`,
              color: accentColor 
            }}
          >
            {trendPositive ? '+' : '-'}{trendValue}
          </div>
        </div>

        {/* Flat Mini-Chart with Thick Stroke */}
        <div className="w-full h-24 mb-6 relative overflow-hidden rounded-xl bg-ivory border border-tan/40">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0 40 L0 25 Q 10 30, 25 15 T 50 20 T 75 10 T 100 5 L100 40 Z"
              fill="url(#gradientArea)"
            />
            <path
              d="M0 25 Q 10 30, 25 15 T 50 20 T 75 10 T 100 5"
              fill="none"
              stroke={accentColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={mounted ? 'transition-all duration-1000 ease-out' : ''}
            />
          </svg>
        </div>

        {/* Footer Satellite Mini-cards (Tier 1) */}
        <div className="grid grid-cols-3 gap-2">
          {footerStats.map((stat, idx) => (
            <div key={idx} className="bg-ivory border border-tan/50 rounded-xl p-2.5 text-center shadow-tier-1">
              <span className="block text-xs font-bold text-near-black font-display">
                <CountUp value={stat.value} />
              </span>
              <span className="block text-[10px] text-warm-taupe truncate font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
