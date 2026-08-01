'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function IOSBackButton() {
  const [isIOS, setIsIOS] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Detect iOS devices (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent) || 
      (navigator.maxTouchPoints > 0 && /Macintosh/i.test(userAgent));
    setIsIOS(isIOSDevice);
  }, []);

  // Show back button on iOS when not on root home page '/'
  if (!isIOS || pathname === '/') return null;

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cream/90 border border-tan/60 shadow-tier-1 text-xs font-bold text-[#2A2416] active:scale-95 transition-all cursor-pointer mr-2"
      aria-label="Go back"
    >
      <span className="text-sm font-bold leading-none">‹</span>
      <span className="text-[11px] uppercase tracking-wider">Back</span>
    </button>
  );
}
