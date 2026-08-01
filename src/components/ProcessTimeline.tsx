'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

/* ─── Types ──────────────────────────────────────────────── */
interface ProcessStep {
  title: string;
  description: string;
  icon?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

/* ─── Configuration ──────────────────────────────────────── */
const BOARD_H       = 55;     // px — wooden board height
const SUPPORT_H     = 45;     // px — support ropes above board
const ROPE_GAP_BASE = 55;     // px — base rope drop (board → card)
const ROPE_VARIANCE = 14;     // px — max ± variance per card
const MOBILE_GAP    = 36;     // px — rope gap between chained cards
const SWAY_MIN_DUR  = 4.5;    // s — min sway cycle
const SWAY_MAX_DUR  = 6.5;    // s — max sway cycle
const SWAY_AMP      = 0.7;    // deg — max sway rotation
const MOBILE_DAMP   = 0.7;    // damping factor per chain link

/* ─── Seeded PRNG (consistent across renders) ────────────── */
function seeded(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ═══════════════════════════════════════════════════════════
   SVG BUILDING BLOCKS — Rope, Hook, Board
   All use vectorEffect="non-scaling-stroke" so strokes stay
   constant regardless of viewBox→element scaling.
   ═══════════════════════════════════════════════════════════ */

/* ─── Single Rope Strand (shadow + base + twist) ─────────── */
function RopeStrand({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(42,36,22,0.12)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <path d={d} fill="none" stroke="#D9C8A9" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <path d={d} fill="none" stroke="#C4B18E" strokeWidth="1.5" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
    </>
  );
}

/* ─── Metal Ring / Eye-Hook ──────────────────────────────── */
function Hook({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="4.5" fill="none" stroke="#9E8E78" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <circle cx={cx} cy={cy} r="1.5" fill="#9E8E78" opacity="0.25" vectorEffect="non-scaling-stroke" />
    </>
  );
}

/* ─── Rope Pair SVG (two ropes between attachment points) ── */
function RopePairSVG({ height, variant = 'board' }: { height: number; variant?: 'board' | 'chain' }) {
  const vw = 200; // abstract viewBox width, mapped to 100% via preserveAspectRatio="none"
  let tl: number, tr: number, bl: number, br: number;

  if (variant === 'board') {
    // Board → Card: ropes angle slightly outward
    tl = 55; tr = 145; bl = 18; br = 182;
  } else {
    // Card → Card (chain): ropes go nearly vertical
    tl = 22; tr = 178; bl = 22; br = 178;
  }

  const sagY = height * 0.55;
  const leftD  = `M ${tl} 4 Q ${(tl + bl) / 2 - 4} ${sagY}, ${bl} ${height - 4}`;
  const rightD = `M ${tr} 4 Q ${(tr + br) / 2 + 4} ${sagY}, ${br} ${height - 4}`;

  return (
    <svg
      viewBox={`0 0 ${vw} ${height}`}
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full z-10 pointer-events-none"
      style={{ height }}
      aria-hidden="true"
    >
      <RopeStrand d={leftD} />
      <RopeStrand d={rightD} />
      <Hook cx={tl} cy={6} />
      <Hook cx={tr} cy={6} />
      <Hook cx={bl} cy={height - 6} />
      <Hook cx={br} cy={height - 6} />
    </svg>
  );
}

/* ─── Wooden Board SVG ───────────────────────────────────── */
function WoodenBoard() {
  const w = 1000;
  const h = BOARD_H;
  // Gentle arched top, flat bottom
  const arch = `M 0 ${h} L 0 14 Q ${w / 2} 0, ${w} 14 L ${w} ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height: h }} aria-hidden="true">
      {/* Shadow */}
      <path d={arch} fill="rgba(42,36,22,0.09)" transform="translate(0 3)" />
      {/* Body */}
      <path d={arch} fill="#8B6F47" />
      {/* Grain streaks (subtle, horizontal) */}
      <line x1="20"  y1={h * 0.30} x2={w - 20}  y2={h * 0.30 - 0.4} stroke="#7A613D" strokeWidth="0.8" opacity="0.28" />
      <line x1="35"  y1={h * 0.47} x2={w - 35}  y2={h * 0.47 + 0.5} stroke="#7A613D" strokeWidth="0.6" opacity="0.20" />
      <line x1="15"  y1={h * 0.63} x2={w - 15}  y2={h * 0.63 - 0.3} stroke="#7A613D" strokeWidth="0.7" opacity="0.16" />
      <line x1="45"  y1={h * 0.80} x2={w - 45}  y2={h * 0.80 + 0.3} stroke="#7A613D" strokeWidth="0.5" opacity="0.12" />
      {/* Highlight band */}
      <rect x="0" y={h * 0.38} width={w} height="3" fill="#A08060" opacity="0.10" rx="1" />
      {/* Edge border */}
      <path d={arch} fill="none" stroke="#6B5535" strokeWidth="1.5" />
      {/* Bottom highlight edge */}
      <line x1="12" y1={h - 1} x2={w - 12} y2={h - 1} stroke="#A08060" strokeWidth="1" opacity="0.14" />
    </svg>
  );
}

/* ─── Support Ropes (extending off-screen upward) ────────── */
function SupportRopes() {
  const w = 1000;
  const h = SUPPORT_H;
  const lx = w * 0.22;
  const rx = w * 0.78;

  const leftD  = `M ${lx} ${h} Q ${lx - 12} ${h * 0.35}, ${lx + 18} 0`;
  const rightD = `M ${rx} ${h} Q ${rx + 12} ${h * 0.35}, ${rx - 18} 0`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full pointer-events-none" style={{ height: h }} aria-hidden="true">
      <RopeStrand d={leftD} />
      <Hook cx={lx} cy={h - 4} />
      <RopeStrand d={rightD} />
      <Hook cx={rx} cy={h - 4} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function ProcessTimeline({
  steps,
  title = "Our Engineering & Growth Process",
  subtitle = "A structured collaborative journey connected by a continuous thread of quality.",
}: ProcessTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ── Reduced Motion Detection ─────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  /* ── Intersection Observer (entrance trigger) ──────────── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsInView(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Per-card sway / rope parameters (seeded, stable) ─── */
  const cardParams = useMemo(() =>
    steps.map((_, i) => ({
      swayDur:   SWAY_MIN_DUR + seeded(i * 7)  * (SWAY_MAX_DUR - SWAY_MIN_DUR),
      swayPhase: -seeded(i * 13) * 7,
      swayAmp:   SWAY_AMP * (0.85 + seeded(i * 19) * 0.3),
      ropeGap:   ROPE_GAP_BASE + Math.round(seeded(i * 23) * ROPE_VARIANCE * 2 - ROPE_VARIANCE),
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [steps.length]
  );

  /* ── Shared card content renderer ─────────────────────── */
  const renderCard = (step: ProcessStep, idx: number) => {
    const numStr = String(idx + 1).padStart(2, '0');
    return (
      <div className="hanging-frame-border relative flex flex-col justify-between min-h-[260px] p-6 group hover:-translate-y-1 transition-all duration-300">
        {/* Header: Ghost number + icon badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-display text-4xl md:text-5xl font-bold text-[#2A2416]/20 group-hover:text-[var(--accent)] transition-colors">
            {numStr}
          </span>
          <div className="w-10 h-10 rounded-xl bg-ivory border border-tan flex items-center justify-center shadow-sm">
            <img
              src={`/icons/${step.icon || 'settings'}.svg`}
              alt=""
              className="w-5 h-5 opacity-75"
              onError={(e) => { e.currentTarget.src = '/icons/check.svg'; }}
            />
          </div>
        </div>
        {/* Body */}
        <div>
          <h3 className="font-bold text-lg text-[#2A2416] mb-2 font-display">{step.title}</h3>
          <p className="text-xs text-[#6B6152] leading-relaxed">{step.description}</p>
        </div>
      </div>
    );
  };

  /* ════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════ */
  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 relative overflow-hidden section-muted">
      <div className="max-w-7xl mx-auto">

        {/* ── Subtitle Lead-in ── */}
        <p
          className="text-center text-[#6B6152] text-sm md:text-base max-w-2xl mx-auto mb-6"
          style={{
            opacity: isInView ? 1 : 0,
            transition: 'opacity 300ms ease-out 250ms',
          }}
        >
          {subtitle}
        </p>

        {/* ── Wooden Support Board ── */}
        <div
          className="relative mx-auto z-20"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView && !reducedMotion ? 'translateY(0)' : isInView ? 'none' : 'translateY(-18px)',
            transition: reducedMotion
              ? 'opacity 400ms ease-out'
              : 'opacity 350ms ease-out, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className="relative">
            <WoodenBoard />
            <h2
              className="absolute inset-0 flex items-center justify-center headline-display text-base sm:text-lg md:text-xl lg:text-2xl text-[#FBF7F0] font-bold tracking-wide pointer-events-none z-10 px-8 text-center"
              style={{ textShadow: '0 1.5px 3px rgba(42,36,22,0.5)' }}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
           DESKTOP (lg+) — Gallery wall, ropes hang from board
           ══════════════════════════════════════════════════ */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 relative -mt-1">
          {steps.map((step, i) => {
            const p = cardParams[i];
            const delay = 450 + i * 110;

            return (
              <div key={i} className="relative" style={{ paddingTop: p.ropeGap }}>
                {/* Ropes from bottom of board to top of card */}
                <RopePairSVG height={p.ropeGap} variant="board" />

                {/* Entrance wrapper (fade + drop settle) */}
                <div
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView && !reducedMotion ? 'translateY(0)' : 'translateY(-14px)',
                    transition: reducedMotion
                      ? `opacity 300ms ease-out ${delay}ms`
                      : `opacity 260ms ease-out ${delay}ms, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
                  }}
                >
                  {/* Sway wrapper (pendulum rotation) */}
                  <div
                    style={{
                      transformOrigin: 'top center',
                      animation: !reducedMotion && isInView
                        ? `hangingSway ${p.swayDur.toFixed(2)}s ease-in-out ${p.swayPhase.toFixed(2)}s infinite`
                        : 'none',
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ['--sway-amp' as any]: `${p.swayAmp.toFixed(2)}deg`,
                    }}
                  >
                    {renderCard(step, i)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════
           MOBILE (< lg) — Chained descent from board
           ══════════════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col items-center relative -mt-1">
          {steps.map((step, i) => {
            const gap = i === 0 ? ROPE_GAP_BASE : MOBILE_GAP;
            const delay = 450 + i * 180;
            const dampedAmp = SWAY_AMP * Math.pow(MOBILE_DAMP, i);
            const swayLag = i * 0.4;

            return (
              <div key={i} className="relative w-full max-w-md" style={{ paddingTop: gap }}>
                {/* Ropes: first card from board, subsequent from card above */}
                <RopePairSVG height={gap} variant={i === 0 ? 'board' : 'chain'} />

                {/* Entrance wrapper */}
                <div
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView && !reducedMotion ? 'translateY(0)' : 'translateY(-10px)',
                    transition: reducedMotion
                      ? `opacity 300ms ease-out ${delay}ms`
                      : `opacity 250ms ease-out ${delay}ms, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
                  }}
                >
                  {/* Sway wrapper (damped propagation) */}
                  <div
                    style={{
                      transformOrigin: 'top center',
                      animation: !reducedMotion && isInView
                        ? `hangingSway ${cardParams[0].swayDur.toFixed(2)}s ease-in-out ${(-swayLag).toFixed(2)}s infinite`
                        : 'none',
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ['--sway-amp' as any]: `${dampedAmp.toFixed(2)}deg`,
                    }}
                  >
                    {renderCard(step, i)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
