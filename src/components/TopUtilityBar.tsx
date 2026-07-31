'use client';

import React from 'react';

export default function TopUtilityBar() {
  return (
    <div className="bg-[#2A2416] text-[#FBF7F0] text-xs py-2 px-6 border-b border-tan/30">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <span className="text-base">🇮🇳</span>
            <span className="font-medium">India: +91-9923290693 / +91-9096300320</span>
          </span>
          <span className="hidden sm:inline text-tan/40">|</span>
          <span className="hidden sm:inline font-medium">Email: contact@orbitex.com</span>
        </div>
        <div className="flex items-center space-x-3 text-ivory/80">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-3.5 h-3.5 invert opacity-80" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <img src="/icons/instagram.svg" alt="Instagram" className="w-3.5 h-3.5 invert opacity-80" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-3.5 h-3.5 invert opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
