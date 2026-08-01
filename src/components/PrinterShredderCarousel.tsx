'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '@/lib/data';

/* ─── Configuration ──────────────────────────────────────── */
const SPEED       = 55;     // px/s — comfortable reading pace
const CARD_W      = 340;    // px — fixed card width
const CARD_H      = 220;    // px — fixed card height
const GAP         = 24;     // px between cards
const MACHINE_W   = 80;     // px — machine illustration width
const EMERGE_MS   = 700;    // card emergence from printer
const SHRED_MS    = 500;    // card consumption at shredder
const STRIPS      = 5;      // vertical shred strips
const STRIP_LAG   = 30;     // ms stagger per strip
const RESUME_MS   = 3500;   // resume auto-scroll after interaction
const LANE_PAD_Y  = 20;     // px vertical padding in lane

/* ─── Types ──────────────────────────────────────────────── */
interface Slot {
  key: number;
  pIdx: number;       // product index
  x: number;          // current left-edge x position
  phase: 'emerge' | 'drift' | 'shred' | 'done';
  t0: number;         // timestamp when current phase began
}

interface Props {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

/* ─── Helpers ────────────────────────────────────────────── */
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/* ═══════════════════════════════════════════════════════════
   PRINTER SVG — flat paper-cutout, right edge, source
   Output slot faces LEFT (toward the card lane)
   ═══════════════════════════════════════════════════════════ */
function PrinterSVG() {
  return (
    <svg
      width="80" height="220" viewBox="0 0 80 220"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Shadow base */}
      <ellipse cx="40" cy="213" rx="30" ry="5" fill="rgba(42,36,22,0.07)" />

      {/* Paper tray (top) */}
      <rect x="14" y="40" width="52" height="16" rx="4" fill="#F5EFE3" stroke="#D9C8A9" strokeWidth="1" />
      <rect x="20" y="44" width="40" height="2" rx="1" fill="#FBF7F0" opacity="0.7" />
      <rect x="18" y="48" width="44" height="2" rx="1" fill="#FBF7F0" opacity="0.5" />

      {/* Main body */}
      <rect x="4" y="54" width="72" height="115" rx="8" fill="#EDE3D0" stroke="#D9C8A9" strokeWidth="1.5" />

      {/* Front panel (output side — left face) */}
      <rect x="4" y="72" width="36" height="56" rx="4" fill="#E5D9C6" />

      {/* Output slot — thin opening on left */}
      <rect x="0" y="96" width="10" height="5" rx="1.5" fill="#2A2416" opacity="0.3" />

      {/* Accent trim stripe */}
      <rect x="4" y="164" width="72" height="3" rx="1.5" fill="var(--accent)" opacity="0.6" />

      {/* Status light (accent, breathing pulse) */}
      <circle cx="62" cy="66" r="3.5" fill="var(--accent)" className="animate-breathing-pulse" />

      {/* Detail dots */}
      <circle cx="52" cy="66" r="2" fill="#D9C8A9" opacity="0.5" />
      <circle cx="44" cy="66" r="2" fill="#D9C8A9" opacity="0.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHREDDER SVG — flat paper-cutout, left edge, sink
   Mouth faces RIGHT (toward the card lane) with teeth
   ═══════════════════════════════════════════════════════════ */
function ShredderSVG() {
  return (
    <svg
      width="80" height="220" viewBox="0 0 80 220"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Shadow base */}
      <ellipse cx="40" cy="213" rx="30" ry="5" fill="rgba(42,36,22,0.07)" />

      {/* Main body — slightly angular/utilitarian */}
      <path
        d="M 8 48 L 72 48 Q 76 48 76 52 L 78 170 Q 78 174 74 174 L 6 174 Q 2 174 2 170 L 4 52 Q 4 48 8 48 Z"
        fill="#EDE3D0" stroke="#D9C8A9" strokeWidth="1.5"
      />

      {/* Top panel */}
      <rect x="8" y="48" width="64" height="22" rx="4" fill="#E5D9C6" />

      {/* Mouth slot (right face) — dark opening */}
      <rect x="70" y="90" width="10" height="8" rx="1.5" fill="#2A2416" opacity="0.35" />

      {/* Teeth — triangular blades in mouth */}
      <polygon points="70,90 73,95 76,90" fill="#C4B18E" />
      <polygon points="75,90 78,95 80,90" fill="#C4B18E" />
      <polygon points="70,98 73,93 76,98" fill="#C4B18E" />
      <polygon points="75,98 78,93 80,98" fill="#C4B18E" />

      {/* Status light (muted accent, breathing pulse) */}
      <circle cx="18" cy="60" r="3.5" fill="var(--accent)" opacity="0.35" className="animate-breathing-pulse" />

      {/* Detail dot */}
      <circle cx="28" cy="60" r="2" fill="#D9C8A9" opacity="0.5" />

      {/* Waste bin at bottom */}
      <rect x="14" y="150" width="52" height="18" rx="4" fill="#E5D9C6" stroke="#D9C8A9" strokeWidth="0.75" />

      {/* Paper strips in bin */}
      <rect x="22" y="154" width="3" height="9" rx="1" fill="#F5EFE3" transform="rotate(-8 23 158)" />
      <rect x="30" y="153" width="3" height="10" rx="1" fill="#F5EFE3" transform="rotate(5 31 158)" />
      <rect x="38" y="154" width="3" height="9" rx="1" fill="#F5EFE3" transform="rotate(-3 39 158)" />
      <rect x="46" y="153" width="3" height="10" rx="1" fill="#F5EFE3" transform="rotate(6 47 158)" />
      <rect x="54" y="154" width="3" height="9" rx="1" fill="#F5EFE3" transform="rotate(-5 55 158)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function PrinterShredderCarousel({ products, onProductClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElsRef   = useRef<Map<number, HTMLDivElement>>(new Map());
  const slotsRef     = useRef<Slot[]>([]);
  const pausedRef    = useRef(false);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cachedW      = useRef(1200);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [, rerender] = useState(0);

  /* ── Reduced Motion Detection ─────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  /* ── Resize Observer ──────────────────────────────────── */
  useEffect(() => {
    const update = () => {
      cachedW.current = containerRef.current?.clientWidth ?? 1200;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ── Animation Loop ───────────────────────────────────── */
  useEffect(() => {
    if (reducedMotion || products.length === 0) return;

    let lastT   = 0;
    let raf     = 0;
    let nextP   = 0;
    let keyCtr  = 0;
    const slots = slotsRef;
    const els   = cardElsRef;

    const getW = () => cachedW.current;
    const isMobile = () => getW() < 768;

    /* Spawn a new card */
    function spawn(ts: number, preX?: number) {
      const w = getW();
      const s: Slot = {
        key: keyCtr++,
        pIdx: nextP % products.length,
        x: preX ?? w,
        phase: preX !== undefined ? 'drift' : 'emerge',
        t0: ts,
      };
      nextP++;
      slots.current.push(s);
    }

    /* Pre-fill the visible lane with drifting cards */
    function init(ts: number) {
      const w       = getW();
      const mobile  = isMobile();
      const laneEnd = mobile ? w : w - MACHINE_W;
      const spacing = CARD_W + GAP;

      let cx = laneEnd - CARD_W;
      while (cx + CARD_W > (mobile ? 0 : MACHINE_W) + 10) {
        spawn(ts, cx);
        cx -= spacing;
      }
      rerender(n => n + 1);
    }

    /* Per-frame animation tick */
    function tick(ts: number) {
      if (!lastT) { lastT = ts; init(ts); }
      const dt = Math.min((ts - lastT) / 1000, 0.05);
      lastT = ts;

      /* Keep lastT fresh even while paused to avoid jump on resume */
      if (pausedRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const w         = getW();
      const mobile    = isMobile();
      const printerX  = mobile ? w : w - MACHINE_W;
      const shredderX = mobile ? 0 : MACHINE_W;
      let dirty       = false;

      for (const s of slots.current) {
        switch (s.phase) {

          /* ── EMERGENCE: slide out from behind printer ──── */
          case 'emerge': {
            const p = Math.min((ts - s.t0) / EMERGE_MS, 1);
            const e = easeOutCubic(p);
            // Start: x = printerX (hidden behind printer)
            // End:   x = printerX - CARD_W (fully visible)
            s.x = printerX - CARD_W * e;
            if (p >= 1) { s.phase = 'drift'; s.t0 = ts; }
            break;
          }

          /* ── DRIFT: steady right-to-left scroll ───────── */
          case 'drift': {
            s.x -= SPEED * dt;
            const shredTrigger = mobile ? -CARD_W : shredderX + 30;
            if (s.x <= shredTrigger) {
              if (mobile) {
                // On mobile (no shredder visual): just remove
                s.phase = 'done';
              } else {
                s.phase = 'shred';
                s.t0 = ts;
              }
              dirty = true;
            }
            break;
          }

          /* ── SHRED: split into strips at shredder mouth ─ */
          case 'shred': {
            const p = Math.min((ts - s.t0) / SHRED_MS, 1);
            s.x -= SPEED * dt * 0.3; // decelerate
            if (p >= 1) { s.phase = 'done'; dirty = true; }

            // Animate individual strips via direct DOM
            const el = els.current.get(s.key);
            if (el) {
              const strips = el.querySelectorAll<HTMLElement>('.shred-strip');
              strips.forEach((strip, i) => {
                const delay  = i * STRIP_LAG;
                const sp     = Math.max(0, ts - s.t0 - delay) / Math.max(1, SHRED_MS - delay);
                const se     = easeOutCubic(Math.min(sp, 1));
                const dy     = se * (14 + i * 5);
                const dx     = se * -(8 + i * 3);
                const rot    = se * (i % 2 ? 3 : -2.5);
                strip.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
                strip.style.opacity   = `${Math.max(0, 1 - se * 1.4)}`;
              });
            }
            break;
          }
        }

        /* Update DOM position */
        const el = els.current.get(s.key);
        if (el) {
          el.style.transform = `translateX(${s.x}px)`;
          // "Just printed" contrast boost during early emergence
          if (s.phase === 'emerge') {
            const p = (ts - s.t0) / EMERGE_MS;
            el.style.filter = p < 0.35 ? 'contrast(1.06) brightness(1.03)' : '';
          } else if (el.style.filter) {
            el.style.filter = '';
          }
        }
      }

      /* Remove completed slots */
      const before = slots.current.length;
      slots.current = slots.current.filter(s => s.phase !== 'done');
      if (slots.current.length !== before) dirty = true;

      /* Spawn new card at printer when there's room */
      const rightmost = slots.current.reduce<Slot | null>(
        (m, s) => (!m || s.x > m.x ? s : m), null
      );
      if (!rightmost || rightmost.x <= printerX - CARD_W - GAP) {
        spawn(ts);
        dirty = true;
      }

      if (dirty) rerender(n => n + 1);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      slots.current = [];
      rerender(n => n + 1);
    };
  }, [reducedMotion, products.length]);

  /* ── Pause / Resume Handlers ──────────────────────────── */
  const pause = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };
  const deferredResume = () => {
    resumeTimer.current = setTimeout(resume, RESUME_MS);
  };

  // Cleanup resume timer on unmount
  useEffect(() => {
    return () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  }, []);

  /* ════════════════════════════════════════════════════════
     REDUCED MOTION FALLBACK
     Static scroll-snap list with decorative bookends
     ════════════════════════════════════════════════════════ */
  if (reducedMotion) {
    return (
      <section className="py-20 overflow-hidden torn-paper-edge">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <h2 className="headline-display text-3xl md:text-4xl mb-3 text-[#2A2416]">Our Products</h2>
          <p className="text-[#6B6152] text-base">
            We build for clients, and we build for ourselves. Explore the Orbitex product ecosystem.
          </p>
        </div>
        <div className="relative max-w-7xl mx-auto">
          {/* Shredder bookend (left, desktop only) */}
          <div
            className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 items-center pointer-events-none"
            style={{ width: MACHINE_W }}
            aria-hidden="true"
          >
            <ShredderSVG />
          </div>

          {/* Static scroll-snap list */}
          <div
            className="flex overflow-x-auto pb-8 snap-x gap-6"
            style={{ paddingLeft: MACHINE_W + 8, paddingRight: MACHINE_W + 8 }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`paper-card p-6 snap-center flex flex-col justify-between flex-shrink-0 ${
                  product.comingSoon ? 'opacity-70 border-dashed bg-transparent' : 'bg-cream tier-3'
                }`}
                style={{ width: CARD_W, height: CARD_H }}
              >
                <div>
                  <h3 className="headline-display text-xl mb-2 text-[#2A2416]">{product.name}</h3>
                  <p className="text-[#6B6152] text-xs leading-relaxed mb-4">{product.description}</p>
                </div>
                {product.comingSoon ? (
                  <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#6B6152] bg-tan/30 px-3 py-1 rounded-full self-start">
                    Coming Soon
                  </span>
                ) : (
                  <button
                    onClick={() => onProductClick?.(product)}
                    className="btn-outline text-xs py-2 px-4 inline-flex items-center self-start cursor-pointer hover:border-[var(--accent)]"
                  >
                    <span>Explore Product</span>
                    <span className="ml-1.5">→</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Printer bookend (right, desktop only) */}
          <div
            className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 items-center pointer-events-none"
            style={{ width: MACHINE_W }}
            aria-hidden="true"
          >
            <PrinterSVG />
          </div>
        </div>
      </section>
    );
  }

  /* ════════════════════════════════════════════════════════
     FULL ANIMATION RENDER
     Printer → Card Lane → Shredder
     ════════════════════════════════════════════════════════ */
  const activeSlots = slotsRef.current.filter(s => s.phase !== 'done');

  return (
    <section className="py-20 overflow-hidden torn-paper-edge">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="headline-display text-3xl md:text-4xl mb-3 text-[#2A2416]">Our Products</h2>
        <p className="text-[#6B6152] text-base">
          We build for clients, and we build for ourselves. Explore the Orbitex product ecosystem.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto"
        style={{ height: CARD_H + LANE_PAD_Y * 2, overflow: 'hidden' }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={() => deferredResume()}
        onTouchStart={pause}
        onTouchEnd={() => deferredResume()}
        role="region"
        aria-label="Our Products — continuously scrolling carousel"
      >
        {/* ── SHREDDER (left edge) ─────────────────────── */}
        <div
          className="absolute left-0 top-0 bottom-0 z-20 hidden md:flex items-center pointer-events-none"
          style={{ width: MACHINE_W }}
          aria-hidden="true"
        >
          <ShredderSVG />
        </div>

        {/* ── CARD LANE ────────────────────────────────── */}
        <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
          {activeSlots.map((slot) => {
            const product    = products[slot.pIdx];
            const isShred    = slot.phase === 'shred';

            return (
              <div
                key={slot.key}
                ref={(el) => {
                  if (el) cardElsRef.current.set(slot.key, el);
                  else cardElsRef.current.delete(slot.key);
                }}
                className="absolute"
                style={{
                  top: LANE_PAD_Y,
                  width: CARD_W,
                  height: CARD_H,
                  willChange: 'transform',
                }}
              >
                {/* Card Content */}
                <div
                  className={`h-full flex flex-col justify-between rounded-2xl border p-6 transition-opacity duration-100 ${
                    product.comingSoon
                      ? 'opacity-70 border-dashed bg-transparent border-[var(--color-tan)]'
                      : 'bg-cream border-[var(--color-tan)] shadow-[var(--shadow-tier-3)]'
                  } ${isShred ? '!opacity-0' : ''}`}
                >
                  <div>
                    <h3 className="headline-display text-xl mb-2 text-[#2A2416]">
                      {product.name}
                    </h3>
                    <p className="text-[#6B6152] text-xs leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>
                  {product.comingSoon ? (
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-[#6B6152] bg-tan/30 px-3 py-1 rounded-full self-start">
                      Coming Soon
                    </span>
                  ) : (
                    <button
                      onClick={() => onProductClick?.(product)}
                      className="btn-outline text-xs py-2 px-4 inline-flex items-center self-start cursor-pointer hover:border-[var(--accent)]"
                    >
                      <span>Explore Product</span>
                      <span className="ml-1.5">→</span>
                    </button>
                  )}
                </div>

                {/* Shred Strips — paper-colored vertical bands */}
                {isShred &&
                  Array.from({ length: STRIPS }, (_, i) => {
                    const stripW = CARD_W / STRIPS - 2;
                    return (
                      <div
                        key={i}
                        className="shred-strip absolute top-0 rounded-sm"
                        style={{
                          left: i * (CARD_W / STRIPS) + 1,
                          width: stripW,
                          height: '100%',
                          background: 'var(--color-cream)',
                          border: '1px solid var(--color-tan)',
                          willChange: 'transform, opacity',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0 0.09 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>

        {/* ── PRINTER (right edge) ─────────────────────── */}
        <div
          className="absolute right-0 top-0 bottom-0 z-20 hidden md:flex items-center pointer-events-none"
          style={{ width: MACHINE_W }}
          aria-hidden="true"
        >
          <PrinterSVG />
        </div>
      </div>
    </section>
  );
}
