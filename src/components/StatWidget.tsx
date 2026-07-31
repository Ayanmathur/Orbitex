"use client";

import React, { useEffect, useState } from 'react';
import Icon from './Icon';

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
    <div className="paper-card bg-cream border border-tan rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow duration-350 ease-out w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <div className="paper-badge bg-ivory rounded-xl p-2 border border-tan shadow-sm flex items-center justify-center">
             <Icon name="check" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-near-black">{title}</h3>
            <p className="text-xs text-warm-taupe">{subtitle || 'Last 30 days'}</p>
          </div>
        </div>
        <div className="flex items-center bg-ivory rounded-full px-2.5 py-1 border border-tan">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
          <span className="text-[10px] font-bold text-near-black uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Hero Metric & Trend */}
      <div className="flex items-baseline space-x-4 mb-6">
        <h2 className="font-display text-4xl font-bold text-near-black">{mainMetric}</h2>
        <div 
          className="flex items-center px-2 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
            color: accentColor 
          }}
        >
          {trendPositive ? '+' : '-'}{trendValue}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-24 mb-6 relative overflow-hidden rounded-lg bg-ivory/50">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.2" />
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={mounted ? 'animate-[dash_1.5s_ease-out_forwards]' : ''}
            strokeDasharray="200"
            strokeDashoffset={mounted ? "0" : "200"}
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-2">
        {footerStats.map((stat, idx) => (
          <div key={idx} className="bg-ivory border border-tan rounded-xl p-3 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-warm-taupe mb-1">{stat.label}</span>
            <span className="font-semibold text-near-black text-sm">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
