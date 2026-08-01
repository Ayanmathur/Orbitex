'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '@/lib/data';

/* ─── Configuration ──────────────────────────────────────── */
const SPEED       = 46;     // px/s — energetic, smooth reading drift pace
const CARD_W      = 340;    // px — fixed card width
const CARD_H      = 220;    // px — fixed card height
const GAP         = 60;     // px — generous distance between cards
const MACHINE_W   = 80;     // px — machine illustration width
const EMERGE_MS   = 2000;   // card emergence from printer
const SHRED_MS    = 1200;   // card consumption at shredder
const STRIPS      = 5;      // vertical shred strips
const STRIP_LAG   = 35;     // ms stagger per strip
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
   PRINTER SVG — flat paper-cutout, LEFT edge (source)
   Output slot faces RIGHT (toward the card lane)
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

      {/* Front panel (output side — right face) */}
      <rect x="40" y="72" width="36" height="56" rx="4" fill="#E5D9C6" />

      {/* Output slot — opening on right edge */}
      <rect x="70" y="96" width="10" height="5" rx="1.5" fill="#2A2416" opacity="0.35" />

      {/* Accent trim stripe */}
      <rect x="4" y="164" width="72" height="3" rx="1.5" fill="var(--accent)" opacity="0.6" />

      {/* Status light (accent, breathing pulse) */}
      <circle cx="18" cy="66" r="3.5" fill="var(--accent)" className="animate-breathing-pulse" />

      {/* Detail dots */}
      <circle cx="28" cy="66" r="2" fill="#D9C8A9" opacity="0.5" />
      <circle cx="36" cy="66" r="2" fill="#D9C8A9" opacity="0.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHREDDER SVG — Industrial paper shredder, RIGHT edge (sink)
   Dark charcoal housing, cutter mouth on left, clear waste bin
   ═══════════════════════════════════════════════════════════ */
function ShredderSVG() {
  return (
    <svg
      width="80" height="220" viewBox="0 0 80 220"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Shadow base */}
      <ellipse cx="40" cy="213" rx="30" ry="5" fill="rgba(42,36,22,0.12)" />

      {/* Main Shredder Housing (Dark industrial charcoal) */}
      <rect x="4" y="45" width="72" height="162" rx="8" fill="#2A2416" stroke="#1C1914" strokeWidth="1.5" />

      {/* Shredder Head Unit (Top heavy control unit) */}
      <rect x="2" y="42" width="76" height="42" rx="6" fill="#3D3526" stroke="#5A4E38" strokeWidth="1" />
      <rect x="8" y="46" width="64" height="6" rx="2" fill="#1C1914" />

      {/* Left Input Mouth Slot (where cards enter to be shredded) */}
      <rect x="0" y="80" width="12" height="28" rx="2" fill="#1C1914" stroke="#4A3F2C" strokeWidth="1" />

      {/* Steel Shredder Blade Teeth inside left mouth */}
      <polygon points="0,82 4,87 8,82" fill="#D9C8A9" />
      <polygon points="0,90 4,95 8,90" fill="#D9C8A9" />
      <polygon points="0,98 4,103 8,98" fill="#D9C8A9" />
      <polygon points="0,106 4,111 8,106" fill="#D9C8A9" />

      {/* Control buttons & warning status light */}
      <circle cx="62" cy="58" r="4" fill="var(--accent)" className="animate-breathing-pulse" />
      <rect x="44" y="56" width="10" height="4" rx="1" fill="#D9C8A9" opacity="0.6" />
      <rect x="30" y="56" width="10" height="4" rx="1" fill="#D9C8A9" opacity="0.4" />

      {/* Translucent Waste Bin Window */}
      <rect x="10" y="112" width="60" height="84" rx="6" fill="#1C1914" stroke="#4A3F2C" strokeWidth="1" />
      <rect x="14" y="116" width="52" height="76" rx="4" fill="#24201A" opacity="0.9" />

      {/* Shredded paper strips accumulated inside waste bin */}
      <rect x="18" y="145" width="4" height="42" rx="1" fill="#FBF7F0" opacity="0.85" transform="rotate(-12 20 166)" />
      <rect x="26" y="135" width="4" height="52" rx="1" fill="#F5EFE3" opacity="0.9" transform="rotate(6 28 161)" />
      <rect x="34" y="140" width="4" height="48" rx="1" fill="#EDE3D0" opacity="0.8" transform="rotate(-4 36 164)" />
      <rect x="42" y="130" width="4" height="56" rx="1" fill="#FBF7F0" opacity="0.85" transform="rotate(10 44 158)" />
      <rect x="50" y="142" width="4" height="45" rx="1" fill="#F5EFE3" opacity="0.9" transform="rotate(-8 52 164)" />
      <rect x="58" y="150" width="4" height="36" rx="1" fill="#EDE3D0" opacity="0.75" transform="rotate(14 60 168)" />
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

  /* ── Animation Loop: Left to Right ────────────────────── */
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

    /* Spawn a new card at Printer on LEFT */
    function spawn(ts: number, preX?: number) {
      const mobile  = isMobile();
      const printerX = mobile ? 0 : MACHINE_W;
      const startX  = printerX - CARD_W;
      const s: Slot = {
        key: keyCtr++,
        pIdx: nextP % products.length,
        x: preX ?? startX,
        phase: preX !== undefined ? 'drift' : 'emerge',
        t0: ts,
      };
      nextP++;
      slots.current.push(s);
    }

    /* Pre-fill the visible lane sequentially from left to right */
    function init(ts: number) {
      const w       = getW();
      const mobile  = isMobile();
      const printerX = mobile ? 0 : MACHINE_W;
      const shredderX = mobile ? w : w - MACHINE_W;
      const spacing = CARD_W + GAP;

      let cx = printerX + 20;
      while (cx < shredderX - 100) {
        spawn(ts, cx);
        cx += spacing;
      }
      rerender(n => n + 1);
    }

    /* Per-frame animation tick (Left to Right — Uniform Velocity) */
    function tick(ts: number) {
      if (!lastT) { lastT = ts; init(ts); }
      const dt = Math.min((ts - lastT) / 1000, 0.05);
      lastT = ts;

      /* Keep lastT fresh while paused */
      if (pausedRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const w         = getW();
      const mobile    = isMobile();
      const printerX  = mobile ? 0 : MACHINE_W;
      const shredderX = mobile ? w : w - MACHINE_W;
      let dirty       = false;

      for (const s of slots.current) {
        /* ALL cards move at uniform reading speed (constant velocity) */
        s.x += SPEED * dt;

        switch (s.phase) {

          /* ── EMERGENCE: glides out of printer at uniform speed ── */
          case 'emerge': {
            if (s.x >= printerX) {
              s.phase = 'drift';
              dirty = true;
            }
            break;
          }

          /* ── DRIFT: steady left-to-right scroll ────────── */
          case 'drift': {
            const shredTrigger = mobile ? w : shredderX - CARD_W - 10;
            if (s.x >= shredTrigger) {
              if (mobile) {
                s.phase = 'done';
              } else {
                s.phase = 'shred';
                s.t0 = ts;
              }
              dirty = true;
            }
            break;
          }

          /* ── SHRED: split into strips at shredder mouth ── */
          case 'shred': {
            const p = Math.min((ts - s.t0) / SHRED_MS, 1);
            if (p >= 1 || s.x >= shredderX) {
              s.phase = 'done';
              dirty = true;
            }

            // Animate individual strips moving rightward into shredder mouth
            const el = els.current.get(s.key);
            if (el) {
              const strips = el.querySelectorAll<HTMLElement>('.shred-strip');
              strips.forEach((strip, i) => {
                const delay  = i * STRIP_LAG;
                const sp     = Math.max(0, ts - s.t0 - delay) / Math.max(1, SHRED_MS - delay);
                const se     = easeOutCubic(Math.min(sp, 1));
                const dy     = se * (16 + i * 6);
                const dx     = se * (10 + i * 4);
                const rot    = se * (i % 2 ? 3.5 : -3);
                strip.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
                strip.style.opacity   = `${Math.max(0, 1 - se * 1.5)}`;
              });
            }
            break;
          }
        }

        /* Update DOM position */
        const el = els.current.get(s.key);
        if (el) {
          el.style.transform = `translateX(${s.x}px)`;
        }
      }

      /* Remove completed slots */
      const before = slots.current.length;
      slots.current = slots.current.filter(s => s.phase !== 'done');
      if (slots.current.length !== before) dirty = true;

      /* Spawn new card at printer on LEFT only when leftmost card has moved far enough */
      const leftmost = slots.current.reduce<Slot | null>(
        (m, s) => (!m || s.x < m.x ? s : m), null
      );

      const spawnThreshold = printerX + GAP;
      if (!leftmost || leftmost.x >= spawnThreshold) {
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

          {/* Shredder bookend (right, desktop only) */}
          <div
            className="hidden md:flex absolute right-0 top-0 bottom-0 z-20 items-center pointer-events-none"
            style={{ width: MACHINE_W }}
            aria-hidden="true"
          >
            <ShredderSVG />
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
        {/* ── PRINTER (left edge) ─────────────────────── */}
        <div
          className="absolute left-0 top-0 bottom-0 z-20 hidden md:flex items-center pointer-events-none"
          style={{ width: MACHINE_W }}
          aria-hidden="true"
        >
          <PrinterSVG />
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

        {/* ── SHREDDER (right edge) ─────────────────────── */}
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
