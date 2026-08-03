# Orbitex — Paper Diorama Design System & Architecture Guide

> **Core Philosophy**: *"Every screen is a physical paper diorama, lit and photographed — not a digital interface with paper-flavored decoration."*

---

## 📋 Table of Contents
1. [Color Tokens & Division Themes](#1-color-tokens--division-themes)
2. [5-Tier Parallax Depth System](#2-5-tier-parallax-depth-system)
3. [Frame Architectures](#3-frame-architectures)
4. [Interactive Machine Carousel](#4-interactive-machine-carousel)
5. [Paper Micro-Details & Craft Moments](#5-paper-micro-details--craft-moments)
6. [Typography & Mobile Responsive System](#6-typography--mobile-responsive-system)
7. [Component Reference & Code Snippets](#7-component-reference--code-snippets)

---

## 1. Color Tokens & Division Themes

### Base Color Tokens
| Variable | Hex / Value | Description & Purpose |
| :--- | :--- | :--- |
| `--color-ivory` | `#FBF7F0` | Clean base paper canvas, body background, input fields |
| `--color-cream` | `#F5EFE3` | Paper card bodies, pill backgrounds, elevated paper mounts |
| `--color-beige` | `#EDE3D0` | Section-muted base, secondary paper layer, card borders |
| `--color-grainy-grey` | `#D5CDC0` / `#CFC5B4` | 6-Products Showcase section background, grainy grey frames |
| `--color-warm-black` | `#2A2416` | Primary headlines, high-contrast text, slot openings |
| `--color-warm-taupe` | `#6B6152` | Subheadlines, muted labels, secondary metadata |
| `--color-tan` | `#D9C8A9` | Card borders, twine rope base stroke, inner matting bevels |

### Division-Scoped Accent Tokens
Each division sets `--accent` and `--accent-secondary` via a root wrapper class (`.division-hub`, `.division-software`, `.division-web`, `.division-marketing`):

```css
/* Hub (Amber / Warm Gold) */
.division-hub {
  --accent: #D97706;
  --accent-secondary: #C2622D;
}

/* Software Division (Vibrant Purple) */
.division-software {
  --accent: #7C3AED;
  --accent-secondary: #4F46E5;
}

/* Web Division (Electric Cyan) */
.division-web {
  --accent: #06B6D4;
  --accent-secondary: #2563EB;
}

/* Marketing Division (Terracotta / Warm Coral) */
.division-marketing {
  --accent: #C2622D;
  --accent-secondary: #D97706;
}
```

---

## 2. 5-Tier Parallax Depth System

All physical layers derive their elevation from standard box-shadow tiers defined in `src/styles/globals.css`:

```css
/* ── 5-TIER DEPTH UTILITIES ── */
--shadow-tier-1: 0px 4px 8px -4px rgba(42, 36, 22, 0.10);  /* Flat chips, badges */
--shadow-tier-2: 0px 12px 24px -10px rgba(42, 36, 22, 0.14); /* Hovered items, secondary frames */
--shadow-tier-3: 0px 20px 40px -14px rgba(42, 36, 22, 0.16); /* Elevated paper cards (default) */
--shadow-tier-4: 0px 32px 64px -20px rgba(42, 36, 22, 0.20); /* Floating modals, lead form */
```

---

## 3. Frame Architectures

The codebase explicitly distinguishes between physical wood molding and grainy paper molding:

### 1. Physical Wood Grain Frame (`.wooden-picture-frame-4sided`)
- **Usage**: Testimonial cards across all pages.
- **Molding**: Real physical wood gradient (`#8B6F47` ➔ `#6E532F`).
- **Corner Joints**: Mitered 45° corner joints with 4 brass corner brackets (`#B89B5E`).

### 2. Grainy Grey Paper Frame (`.grainy-grey-paper-frame`)
- **Usage**: 6 Products Showcase gallery on `/software`.
- **Molding**: Grainy grey paper molding (`#CFC5B4` + SVG fractal noise overlay).
- **Corner Brackets**: 4 brass corner brackets (`#B89B5E`).
- **Inner Matting**: Cream inner matting bevel (`.wooden-frame-inner-mat`).

```html
<!-- Example: Grainy Grey Paper Frame -->
<div class="grainy-grey-paper-frame relative group">
  <div class="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-[#B89B5E] border border-[#7A613D] shadow-sm z-20 pointer-events-none"></div>
  <div class="wooden-frame-inner-mat h-full">
    <div class="paper-card p-5 sm:p-8 bg-cream border border-tan fold-corner tier-3">
      ...
    </div>
  </div>
</div>
```

---

## 4. Interactive Machine Carousel

### Machine Components (`PrinterSVG` & `ShredderSVG`)
- **Printer (`PrinterSVG`)**: Positioned at left edge (`viewBox="0 0 80 280"`, height `280px`). Emerge slot faces right.
- **Shredder (`ShredderSVG`)**: Positioned at right edge (`viewBox="0 0 80 280"`, height `280px`). Utilitarian angular silhouette, narrow mouth slot near top with blade teeth, waste bin window.
- **Speed**: `SPEED = 115 px/s`.
- **Daylight Theme**: Shredder palette matches printer warm cream color (`--shredder-body: #EDE3D0`, `--shredder-stroke: #D9C8A9`, `--shredder-cap: #E5D9C6`).

---

## 5. Paper Micro-Details & Craft Moments

1. **Hover-Activated Twine / Rope Scrollbar (`RopeScrollbar.tsx`)**:
   - Fixed vertical hemp twine scrollbar line (`#D9C8A9` with `#A89572` 45° twist dash).
   - Hidden by default (`opacity-0 hover:opacity-100 group`).
   - Smoothly reveals on hover over both light and dark page sections.

2. **Horizontal Rope Divider (Nav & Footer)**:
   - Wavy horizontal SVG rope line (`#D9C8A9` base, `#C4B18E` dash) rendered at bottom of `Nav` and top of `Footer`.

3. **Die-Cut Fold-Corner Flap (`.fold-corner`)**:
   - Light grey die-cut paper fold corner flap on top-right of paper cards.

4. **Paper Hole Punch (`.paper-hole-punch`)**:
   - Die-cut circular hole with inset shadow and dark interior backing.

5. **Native iOS Back Button (`IOSBackButton.tsx`)**:
   - Native-feel back button (`‹ BACK`) rendered on iOS devices (`iPhone | iPad | iPod`) on subpages and modal drawers.

---

## 6. Typography & Mobile Responsive System

### Responsive Spacing Guidelines
- **Section Padding**: `py-10 sm:py-14 px-4 sm:px-6` (prevents oversized vertical whitespace).
- **Header Bottom Margins**: `mb-6 sm:mb-8 md:mb-10`.
- **Card Internal Padding**: `p-4 sm:p-5 md:p-6`.
- **Grid Gaps**: `gap-4 sm:gap-5 md:gap-6`.

### Typography Rules (6.1" to 6.7" Viewports)
- **Hero Display Headline**: `headline-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2A2416] leading-snug`.
- **Section Headings**: `headline-display text-2xl sm:text-3xl md:text-4xl text-[#2A2416]`.
- **Subtitles**: `text-xs sm:text-sm md:text-base text-[#6B6152]`.

---

## 7. Component Reference & Code Snippets

### Hero Component
```tsx
<Hero
  headline="Software, web, and growth — engineered by one team."
  subheadline="Orbitex is a founder-led studio behind 6 products, 30+ client partnerships, and three specialist teams under one roof."
  primaryCta={{ text: 'Get a Quote', href: '#contact' }}
  secondaryCta={{ text: 'Explore Divisions', href: '#divisions' }}
/>
```

### LeadForm Component
```tsx
<LeadForm division="hub" />
```

### ServiceGrid Component
```tsx
<ServiceGrid
  services={services}
  title="Engineered Capabilities"
  subtitle="Four core disciplines driving our product development."
/>
```
