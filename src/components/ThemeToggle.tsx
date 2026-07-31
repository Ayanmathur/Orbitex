'use client';

import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    // Check saved preference or system theme
    const saved = localStorage.getItem('orbitex-theme');
    if (saved === 'night') {
      setIsNight(true);
      document.documentElement.classList.add('theme-night');
    }
  }, []);

  const toggleTheme = () => {
    if (isNight) {
      document.documentElement.classList.remove('theme-night');
      localStorage.setItem('orbitex-theme', 'day');
      setIsNight(false);
    } else {
      document.documentElement.classList.add('theme-night');
      localStorage.setItem('orbitex-theme', 'night');
      setIsNight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-tan/60 bg-cream/80 hover:bg-ivory transition-all shadow-sm cursor-pointer"
      title="Toggle Night Studio / Daylight Mode"
    >
      <span className="text-sm">{isNight ? '🌙' : '💡'}</span>
      <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#2A2416]">
        {isNight ? 'Night Studio' : 'Daylight'}
      </span>
    </button>
  );
}
