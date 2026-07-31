'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  value: string; // e.g. "30+", "99.9%", "4.8x", "+320%"
  duration?: number; // duration in ms, default 800
  className?: string;
}

export default function CountUp({ value, duration = 800, className = '' }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Parse numeric target and prefix/suffix strings
  const parseValue = (val: string) => {
    const match = val.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) return { prefix: '', target: 0, suffix: val, isFloat: false };
    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isFloat = match[2].includes('.');
    const decimalPlaces = isFloat ? (match[2].split('.')[1] || '').length : 0;
    return { prefix, target, suffix, isFloat, decimalPlaces };
  };

  useEffect(() => {
    const { prefix, target, suffix, decimalPlaces = 0 } = parseValue(value);
    if (isNaN(target) || target === 0) return;

    const element = ref.current;
    if (!element) return;

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic: 1 - Math.pow(1 - progress, 3)
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = target * easeOutProgress;

            const formattedNumber = decimalPlaces > 0
              ? currentNumber.toFixed(decimalPlaces)
              : Math.round(currentNumber).toString();

            setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(value); // ensure exact target on end
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
