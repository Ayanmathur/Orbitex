'use client';

import React, { useEffect } from 'react';
import TechStackChips from './TechStackChips';

export interface DrawerItem {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDetails?: string;
  image?: string;
  techStack?: string[];
  metrics?: { label: string; value: string }[];
  features?: string[];
  link?: string;
}

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: DrawerItem | null;
}

export default function ProductDrawer({ isOpen, onClose, item }: ProductDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!item) return null;

  return (
    <div className={`fixed inset-0 z-[100] transition-visibility duration-300 ${isOpen ? 'visible' : 'invisible pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className={`absolute inset-0 bg-[#2A2416]/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Slide-Over Paper Panel */}
      <div 
        className={`absolute top-0 right-0 bottom-0 w-full max-w-xl bg-cream border-l border-tan shadow-tier-4 flex flex-col transition-transform duration-300 cubic-bezier(0.16,1,0.3,1) ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Paper Grain Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.06]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          }} 
        />

        {/* Drawer Header */}
        <div className="p-6 border-b border-tan/60 flex items-center justify-between relative z-10 bg-ivory">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
              {item.category}
            </span>
            <h2 className="headline-display text-xl font-bold text-[#2A2416]">{item.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cream border border-tan/60 text-[#2A2416] transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          {/* Image Preview */}
          {item.image && (
            <div className="aspect-video rounded-2xl overflow-hidden border border-tan/60 bg-beige shadow-tier-2 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-lg text-[#2A2416]">Overview</h3>
            <p className="text-sm text-warm-taupe leading-relaxed">
              {item.fullDetails || item.description}
            </p>
          </div>

          {/* Metric Chips if available */}
          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {item.metrics.map((m, idx) => (
                <div key={idx} className="bg-ivory border border-tan/60 rounded-xl p-3 text-center shadow-tier-1">
                  <span className="block font-display font-bold text-lg text-[var(--accent)]">{m.value}</span>
                  <span className="block text-xs text-warm-taupe font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Feature Highlights */}
          {item.features && item.features.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-display font-bold text-base text-[#2A2416]">Key Capabilities</h3>
              <ul className="space-y-2">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-[#2A2416]">
                    <span className="text-[var(--accent)] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          {item.techStack && item.techStack.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-display font-bold text-base text-[#2A2416]">Engineered With</h3>
              <TechStackChips techs={item.techStack} />
            </div>
          )}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-6 border-t border-tan/60 bg-ivory relative z-10 flex items-center justify-between">
          <button onClick={onClose} className="btn-outline text-xs py-2.5 px-5">
            Close Panel
          </button>
          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary text-xs py-2.5 px-6 inline-flex items-center space-x-1.5"
            >
              <span>Visit Product Live</span>
              <span>→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
