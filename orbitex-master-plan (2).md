# Orbitex — Master Website Plan
*Single source of truth for design, copy, and build prompts. Use section-wise with Antigravity (or any build agent).*

---

## 0. Company Facts (as given)
- Founder-led (single founder, no cofounders)
- 6 software products (each links to its own external domain, provided separately)
- 30 clients (client work/portfolio entries also link externally — name + link for each to be provided by founder)
- 3 divisions: Software Development, Web Development Agency, Digital Marketing Agency
- 4 properties to build: `orbitex.com` (hub) + `software.orbitex.com` + `web.orbitex.com` + `marketing.orbitex.com`
- No dark/light toggle — one warm-neutral identity, division accent colors
- Pricing: custom quote only, no public tiers
- PWA-ready from the start (installable on desktop + mobile)

---

## 1. Design System (shared across all 4 properties)

### 1.1 Color Tokens

**Base neutrals (identical on every property):**
```
color.bg.page        = ivory      (#FBF7F0 approx)
color.bg.raised       = cream      (#F5EFE3 approx — cards, raised panels)
color.bg.muted        = beige      (#EDE3D0 approx — section bands, alt backgrounds)
color.border.default  = tan        (#D9C8A9 approx)
color.border.muted    = tan/50%
color.text.primary    = warm near-black (#2A2416 approx — not pure black, keeps warmth)
color.text.secondary  = warm taupe (#6B6152 approx)
color.text.tertiary   = warm taupe/70%
```

**Division accents (used only for CTAs, links, icon fills, active nav state, gradient accents):**
```
software.accent.primary   = violet   (#7C3AED)
software.accent.secondary = indigo   (#4F46E5)

web.accent.primary         = cyan     (#06B6D4)
web.accent.secondary       = blue     (#2563EB)

marketing.accent.primary   = terracotta (#C2622D)  ← NOT pure amber, needed for AA contrast on cream
marketing.accent.secondary = warm amber (#D97706)

hub.accent (orbitex.com)   = rotates all three OR neutral charcoal-gold — see 2.1
```

> Rule: never use accent color as a large background fill. Use as button fill, link color, icon badge fill, thin gradient blob, border-on-hover, active nav underline. Base neutrals carry 90% of every page.

### 1.2 Typography
```
font.family.primary = Inter (body copy, UI, nav, buttons, forms — everything functional)
font.family.display = a warm, hand-crafted display face for hero headlines + section titles only 
  (e.g. Fraunces — soft organic serif with real character, or Gochi Hand/Caveat-style script 
  reserved for a single accent word per hero, not full headlines — pick one before build)
font.size.base = 16px / line-height 24px
scale: xs 12 / sm 14 / md 16 / lg 18 / xl 24 / 2xl 32 / 3xl 48 / 4xl 64
font.weight: body 400, subhead 600, headline 700-800 (display face: use its natural weight, don't force-bold)
```
**Display typography direction (added per reference — hand-lettered, personality-driven headline type, seen on [pinned reference](https://pin.it/5IdVItd1i)):**
- Use the display face ONLY for hero headlines and major section titles — never for body copy, nav, buttons, or forms, which stay in Inter for legibility and B2B professionalism
- Two implementation options — pick one and apply consistently across all 4 properties:
  1. **Full display headline**: entire hero headline set in a warm organic serif/display face (e.g. Fraunces) — brings personality without going into casual handwriting territory, works for a professional agency tone
  2. **Accent-word treatment**: headline mostly in Inter, but ONE key word rendered in a looser brush/script-style face (mirroring how the reference does "stand out") — more playful, higher risk of feeling off-brand for a 30-client B2B agency; use sparingly if at all, and only on the hub, not the more technical subdomains
- Recommend option 1 (full display headline in a warm serif) as the safer fit for Orbitex's tone — it picks up the "hand-crafted, not generic-SaaS" feeling from the reference without the whimsical/personal-blog vibe that doesn't match a multi-division B2B brand
- Division subdomains keep the same display face as the hub for brand consistency — only the accent color changes per division, not the typography

### 1.3 Spacing / Radius / Shadow / Motion
```
space scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 96
radius.sm = 12px (inputs, small badges)
radius.md = 20px (cards)
radius.full = 9999px (buttons, pills, nav items)
shadow.card = soft warm-toned shadow, e.g. rgba(42,36,22,0.08) 0px 20px 50px -24px
motion.instant = 150ms, motion.fast = 250ms, motion.normal = 350ms — ease-out on entrances, no bouncy easing
```

### 1.4 Accessibility Baseline (applies everywhere)
- WCAG 2.2 AA minimum, keyboard-first, visible focus rings (accent-colored, 2px, offset)
- Every interactive element: default / hover / focus-visible / active / disabled states defined before build
- Text on `bg.muted`/`bg.raised` must be checked against warm-neutral contrast — do not assume standard dark-on-white ratios hold with cream/tan combos; verify each pairing

---

## 2. Shared Component Patterns (build once, reuse on all 4 properties)

### 2.1 Nav
- Pill-style floating nav, sticky, transparent → solid `bg.page` with subtle shadow on scroll
- Active link: rounded pill background in low-opacity accent color
- Logo: same lockup everywhere, only the accent-color dot/mark shifts per division
- CTA button on far right: solid accent, "Get a Quote" (not "Contact Us" — reinforces custom-quote positioning)
- Mobile: hamburger → full slide-out panel, same visual language
- No theme toggle button (removed by decision)
- Footer of every subdomain must cross-link to the other 2 subdomains + hub — this is the mechanism that proves "one brand"

### 2.2 Hero
- Warm neutral background, NOT dark
- Depth via large soft blurred blobs in division accent color at 8-15% opacity — replaces old particle/orbit animations which only worked on dark bg
- Optional: floating "dashboard preview" card (stat mockup) — reuse pattern from both old drafts, re-skinned: cream card, tan border, accent-colored numbers/chart line
- Headline: static, confident, no typewriter effect
- Dual CTA: solid accent primary button + outline secondary button
- Small trust row under CTAs: stat chips (e.g. "30 Clients" / "6 Products") — pull real division-relevant number per subdomain (no years-active stat, per decision)

### 2.3 Cards
- `radius.md`, `bg.raised`, `border.muted`, `shadow.card` on hover only (flat until hover)
- Icon badge: rounded-square, accent-color fill, white icon, top-left or top of card
- Hover: lift (-translate-y), border shifts to accent/40%, shadow intensifies

### 2.4 Section Rhythm (repeat on every property's homepage)
```
1. Hero
2. Trust bar (client logos marquee OR stat counters — hub uses stats, subdomains can use logos relevant to that division)
3. Core offering grid (Capabilities on hub / Services on subdomains)
4. Process timeline (Discover → Strategy/Plan → Execute/Build → Optimize → Scale — same 5-step skeleton, relabel per division)
5. Portfolio / Case studies preview
6. Testimonials (single large rotating quote, not grid — stronger pattern from Adorion draft)
7. FAQ (accordion, inline — not a separate nav item)
8. CTA band (accent-color background, contrasts against neutral base — the one place accent CAN be a large fill)
9. Footer
```

### 2.5 Forms (Contact)
- Two-column layout: left = contact info + socials + "what happens next" mini-steps, right = form
- Field styling: `bg.raised` fill, `border.default`, focus ring in division accent
- Fields: Name, Email, Company (optional), Project Type (dropdown, division-specific options), Message
- No budget-range field (custom-quote-only — asking budget upfront contradicts that positioning)
- Submit CTA: "Request a Quote"

### 2.6 Icons
- Custom flat, filled, slightly rounded cut-paper silhouette icons for all hero/feature/service icon badges — bespoke asset set, not a stroke-icon library, since thin-line icons don't read as "paper"
- lucide-react retained only as fallback for small utility UI chrome (nav toggles, form affordances) where a custom icon isn't needed
- Icon badges rendered as a distinct smaller "paper piece" layered on top of its parent card/element with its own small offset shadow — a glued-on cutout, not an inline icon

### 2.11 Art Direction — Paper Diorama (applies globally, all 4 properties)
Full custom illustration treatment — every visual surface reinforces layered-paper-cutout depth rather than flat/gradient modern-SaaS style:
```
Hero: replace blurred color blobs with 3-4 stacked flat-shape paper cutout illustrations (abstract geometric forms representing the division's theme — e.g. "software," "web," "growth") at varied scale/depth, soft directional drop shadow of each layer onto the one behind it, subtle parallax on scroll/mouse-move so layers visibly separate
Cards: card = a paper layer floating above the page layer — offset directional shadow (not centered blur), optional torn/deckled top edge on featured cards, icon badge as separate smaller paper piece glued on top with its own tiny shadow
Bento photo collage (About): each photo masked with irregular/torn or clean die-cut edge, paper-colored mat/border around it like a cutout mounted on cardstock, layered offset shadows so photos read as sitting at different depths in the scene
Stat/metric widget: card reads as a paper card standing upright in the scene; mini-chart illustrated with thick rounded strokes (no glassy gradients); satellite mini-cards behind it are smaller paper pieces propped at an angle
Client logo marquee: tiles become small paper cards on a shelf/strip, each with its own individual small shadow — scroll mechanic unchanged
Background texture: every base surface (ivory/cream/beige) gets a subtle paper-grain texture (barely-there noise) — this is what sells "paper" vs. flat pastel
Icons: see §2.6 — bespoke flat cut-paper silhouette set required, not stroke icons
```
This is a full custom illustration/asset undertaking (hero shapes, icon set, photo treatment, textures — all bespoke) — flag as an asset-production workstream alongside build, not something generated inline by the build agent from a text prompt alone. Recommend producing the illustration/icon set first (or in parallel) as its own deliverable, then wiring components to consume those assets.

---

### 2.7 Signature Component — Bento Image Collage (use on About / Brand Story sections)
Asymmetric photo grid on a 6-col/6-row frame, creates depth and premium feel vs. a flat single image:
```
- Large image: col-span-4 row-span-4, col-start-1 row-start-1, aspect [5/4]
- Medium image: col-span-3 row-span-3, col-start-4 row-start-3, aspect square (overlaps/offsets the large one)
- Small image: col-span-3 row-span-2, col-start-1 row-start-5, aspect [4/3]
- All images: rounded-3xl, border (color.border.default), shadow.card
- Each image wrapped in its own div with independent subtle parallax (translateY tied to scroll position, ~±5-8px range — do NOT overdo, should feel like a whisper not a bounce)
- Two blurred accent-color blobs behind the grid (one top-right, one bottom-left, ~160-192px, 10-20% opacity) for depth — use division accent color per property
```
On warm-neutral base: swap the dark `shadow-[...var(--ink)]` for a warm-toned soft shadow per §1.3, and border stays `tan`. This pattern needs 3 real photos per property (workspace/team, strategy/whiteboard or code session, collaboration shot) — flag as an asset need per subdomain.

### 2.8 Signature Component — Floating Stat/Metric Widget (use in Hero, as the "dashboard preview" card)
A self-contained card that visually proves credibility without needing real live data — safe to use illustrative numbers if clearly framed as such elsewhere on page:
```
Card: bg.raised, border.default, radius.md, shadow.card, padding 24-28px
Header row: icon badge (accent fill) + label ("Growth Overview" / "Product Health" / "Campaign Snapshot" — reword per division) + small muted subtext ("Last 30 days") + "Live" pill badge (accent/15% bg, accent text, pulsing dot)
Hero metric row: large number (font-display, 4xl-5xl) + small trend chip (+X% vs last period) in accent color
Mini chart: SVG line/area chart, accent-color gradient fill fading to transparent, animated draw-in on scroll-into-view (stroke-dashoffset animation)
Footer row: 3 small stat chips in a grid (bg.page/60%, border.default, radius.sm) — pick 3 metrics relevant to the division (e.g. software: Uptime/Deploys/Response Time · web: Load Time/Lighthouse/Conversion · marketing: ROAS/Leads/CTR)
```
Position: floats over/beside hero copy, can have 1-2 smaller "satellite" cards peeking from behind it at offset angles (e.g. a small "SEO Ranking" or "Conversions" mini-card) — reuse this pattern from the Adorion hero, re-skinned to warm neutral + division accent.

### 2.9 Client Logo Marquee (confirmed keep — trust bar)
- Infinite horizontal scroll, duplicated logo set for seamless loop, `animate-marquee` ~40-45s linear infinite
- Pause on hover (`group-hover:[animation-play-state:paused]`)
- Each logo: grayscale + 65% opacity at rest → full color + 100% opacity + slight lift + scale on hover
- Logo tiles: rounded-2xl, bg.raised/60%, border.muted, fixed height (~80px), min-width (~180px)
- Respect `motion-reduce` — disable animation for reduced-motion users
- Since 30 clients exist with links (per earlier note), each logo tile should link out to the client's site where provided
- Use on hub (aggregate/best logos) + each subdomain (division-relevant client subset)

### 2.10 Lead / Quote Request Form (contact page + CTA-band modal/inline)
Field-by-field spec, consistent across all 4 properties (options in the dropdown change per division):
```
Card wrapper: bg.raised, border.default, radius.md (~24px), shadow.card, generous padding (24px mobile / 40px desktop)

Row 1 (2-col on sm+): Full name* | Email address*
Row 2 (2-col on sm+): Phone number* | Company name (optional)
Row 3 (full width): "Service/Project interested in"* — dropdown, division-specific options 
  (e.g. software.orbitex.com: Custom Software / Product Development / API & Backend / AI Automation / Not sure yet)
Row 4 (full width): Message* — textarea, 5 rows, placeholder "Goals, timeline, and anything else that'll help us scope this"
Consent row: checkbox + "I agree to the Privacy Policy" (linked, underlined)
Submit: pill button, solid accent fill, "Request a Quote" (not "Send Message" — reinforces custom-quote positioning), arrow icon that rotates 45° on hover, subtle lift on hover
```
All inputs: h-12, radius.sm, bg.page fill, border.default, focus:border-accent (2px), no budget field (per earlier custom-quote-only decision — do not reintroduce it here even though the reference draft had one).



**Role:** Pure landing/routing page. Brand story + proof + 3 division cards that route out. Not a full company site with deep service pages — those live on subdomains.

### Sections (in order)
1. **Hero** — founder-direct tone. Headline should communicate "one team, three disciplines" without being generic. 
   - Draft headline: *"One team. Software, web, and growth — built to work together."*
   - Subhead: *"Orbitex is a founder-led studio behind 6 products, 30+ client partnerships, and three specialist teams under one roof."*
2. **Stat bar** — 6 Products · 30+ Clients · 3 Divisions
3. **Division cards (the core routing mechanism)** — 3 large cards, one per subdomain:
   - Software Development → violet accent → "Custom software & products" → links to software.orbitex.com
   - Web Development → cyan accent → "Websites & web apps" → links to web.orbitex.com
   - Digital Marketing → terracotta accent → "Growth & performance marketing" → links to marketing.orbitex.com
   - Each card: icon badge, 3-line description, 3 bullet capabilities, "Explore [Division] →" CTA
4. **Products strip** — horizontal scroll or grid of 6 product cards, each links externally to its own domain (logo/name/one-line description/"Visit product →")
5. **Brand story** (short version — full story lives in About)
   - Structure: origin → what changed (single dev → 3 divisions) → belief/principles → where it's going
6. **Values grid** (4 cards — reuse Adorion's Innovation/Transparency/Performance/Partnership structure, rewritten in founder voice)
7. **Testimonial** (single rotating quote, pull best one across all divisions)
8. **CTA band** — "Not sure which team you need? Let's talk." → single unified contact form (routes inquiry, doesn't need division picked)
9. **Footer** — links to all 3 subdomains explicitly, plus standard footer content

### About page (on hub, since founder-only story belongs at brand level)
- Founder photo + first-person opening statement (not "we") 
- Origin story → growth to 3 divisions + 6 products
- Tech/capability tag cloud (reuse Orbitex draft's stack chips — Java, Flutter, React, Python, Node, etc. — expand with marketing tools too: SEO/Ads/Analytics platforms)
- No "our team" plural section — single founder honestly presented, can mention "the team" generically when referring to contractors/employees without naming a co-founder structure

### Blog (lives on hub, shared engine)
- Featured post + filterable grid + tag-by-division (Software / Web / Marketing tags)
- Each subdomain can pull a filtered feed of its own tag from this single blog
- Seed topics:
  - Software: product engineering case studies from the 6 products
  - Web: Core Web Vitals, stack decisions, performance case studies
  - Marketing: SEO/ads playbooks, campaign breakdowns

### Build Prompt (for Antigravity)
```
Build orbitex.com as a single-page (+ /about, /blog routes) marketing hub for Orbitex, 
a founder-led company with 3 divisions (software dev, web dev, digital marketing) and 
6 software products. Use warm neutral palette (ivory/cream/beige/tan base, near-black 
warm text) with NO dark mode. Division accent colors appear only on the 3 division 
routing cards (violet=software, cyan=web, terracotta=marketing) and nowhere else on 
this page. Hero must NOT use particle/orbit animations — use soft blurred color blobs 
at low opacity instead. No pricing page — all CTAs say "Get a Quote" and route to a 
single contact form. Build as PWA-ready (manifest, service worker, installable). 
Sections in order: Hero, Stat bar, Division routing cards (3), Products strip (6, 
external links), Brand story, Values grid, Testimonial, CTA band, Footer with links 
to all 3 subdomains.
```

---

## 4. software.orbitex.com

**Accent:** violet/indigo
**Role:** Deep-dive on custom software development services + showcase the 6 products

### Sections
1. Hero — headline around "custom software built to run your business," trust chips relevant to software (uptime, products shipped, client count)
2. Services grid — custom software dev, product engineering, API/backend, AI/automation integration, maintenance & support
3. **6 Products showcase** — full case-study style cards (not just logos): problem → what we built → external link to product's own domain
4. Process (Discover → Scope → Build → Test → Ship & Support)
5. Case studies / portfolio filtered to software work
6. Tech stack chips (languages/frameworks used)
7. Testimonial
8. FAQ (software-specific: maintenance, ownership of code, timelines, tech stack choices)
9. CTA band → contact form (Project Type dropdown pre-set to software options)
10. Footer with cross-links to hub + other 2 subdomains

### Build Prompt
```
Build software.orbitex.com, the software development division site for Orbitex. 
Inherit the shared Orbitex design system (warm neutral base, Inter type, card/nav/
footer patterns) but use violet/indigo as the sole accent color for this property 
(buttons, links, icon fills, active states). Centerpiece: a "6 Products" section 
where each product card links externally to its own domain (placeholder links for 
now). No public pricing — all CTAs are "Get a Quote". Footer must link back to 
orbitex.com, web.orbitex.com, and marketing.orbitex.com. PWA-ready.
```

---

## 5. web.orbitex.com

**Accent:** cyan/blue
**Role:** Web development agency — websites, web apps, e-commerce

### Sections
1. Hero — "fast, elegant, conversion-first websites" positioning
2. Services grid — website design & dev, web apps, e-commerce, CMS builds, performance/CRO, ongoing maintenance
3. Process (Discover → Design → Build → Launch → Iterate)
4. Portfolio — filtered to web projects, live-preview screenshots (reuse the mshots-style live preview pattern from the old Orbitex portfolio — genuinely nice touch)
5. Case studies (before/after where possible — load time, conversion lift)
6. Tech stack chips (React, Next.js, Tailwind, etc.)
7. Testimonial
8. FAQ (web-specific: hosting, domain, CMS handoff, revisions)
9. CTA band → contact form (Project Type pre-set to web options)
10. Footer with cross-links

### Build Prompt
```
Build web.orbitex.com, the web development agency site for Orbitex. Inherit the 
shared Orbitex design system but use cyan/blue as the sole accent color. Portfolio 
section should use live-preview-style screenshots of shipped websites (thumbnail 
+ hover overlay with view/visit icons). No public pricing — CTAs say "Get a Quote". 
Footer links back to orbitex.com, software.orbitex.com, marketing.orbitex.com. 
PWA-ready.
```

---

## 6. marketing.orbitex.com

**Accent:** terracotta/warm amber
**Role:** Digital marketing agency — SEO, ads, social, branding, content, AI automation (this is where the Adorion content gets rebranded and reused most directly)

### Sections
1. Hero — performance-marketing positioning, "measurable growth" framing (reuse Adorion's dashboard-preview hero card pattern, re-skin to warm neutral + terracotta)
2. Services grid (8 cards from Adorion draft, keep all): SEO, Google Ads, Meta Ads, Social Media Marketing, Website Development *(cross-link to web.orbitex.com instead of duplicating)*, Branding, Content Marketing, AI Automation
3. "Why Adorion→Orbitex Marketing works" section (reuse Adorion's 4-card value prop: Performance Focused / Data Driven / Creative Strategy / Continuous Optimization)
4. Process (Discovery → Research → Planning → Execution → Optimization → Growth — 6-step version from Adorion draft is fine here, more detailed than other divisions since it's inherited)
5. Example performance metrics band (keep Adorion's "illustrative benchmark" framing — +320% organic, +180% leads, 4.8x ROAS — clearly labeled as illustrative, not client-specific claims)
6. Industries served grid (keep from Adorion — healthcare, education, real estate, restaurants, startups, finance, e-commerce, construction)
7. Testimonial (single rotating quote pattern)
8. FAQ (reuse Adorion's FAQ content, adjust brand name)
9. CTA band → contact form (Project Type pre-set to marketing options)
10. Footer with cross-links

### Build Prompt
```
Build marketing.orbitex.com, the digital marketing division site for Orbitex 
(this division absorbs the former "Adorion Media" brand — fully rebrand to 
Orbitex, no Adorion references remain). Inherit the shared Orbitex design system 
but use terracotta/warm-amber as the sole accent color. This property can carry 
the most content depth (8 service cards, metrics band, industries grid) since it 
inherits the richest existing draft. No public pricing — CTAs say "Get a Quote". 
Footer links back to orbitex.com, software.orbitex.com, web.orbitex.com. PWA-ready.
```

---

## 7. Copy Starters (placeholders — edit or approve)

**Hub tagline (selected):**
> "Software, web, and growth — engineered by one team."

**Founder About opening (placeholder, first-person — Mr. Ayan Mathur):**
> "I started Orbitex to solve a problem I kept running into: businesses needing software, a website, and marketing that actually work together — instead of hiring three disconnected vendors who don't talk to each other. Today that's grown into three specialist teams, six products, and thirty client partnerships — but the reason hasn't changed."

Founder name: **Ayan Mathur**. Photo to be uploaded via admin CMS (§11). Bio text is editable in the same admin subsite, not hardcoded — treat the About page founder block as a CMS-driven field, not static copy.

**Values (4, reusable across hub + subdomains):**
1. Built to Last — not just shipped, maintained
2. Transparent by Default — clear scope, clear pricing conversations, clear reporting
3. One Team, Full Stack — software, web, and growth working from the same playbook
4. Measured, Not Guessed — every engagement tied to a real outcome

**Products (confirmed):**
```
1. Billdoor — one-stop billing, review, and appointment system with WhatsApp automation
2. SkillItLearn — student guidance platform mapping courses/degree to relevant skills, with certifications per skill learned
3. Addicted Zero — platform to help quit addictions (smoking, alcohol, drugs, porn)
4. WTW (What to Wear) — occasion-based clothing platform (airport look, beach look, wedding look, date look, etc.)
5. [Placeholder — not yet named/planned]
6. [Placeholder — not yet named/planned]
```
All 6 product cards, all 30 client entries, and all testimonials are managed through the admin CMS (see §11) — not hardcoded in the build. Placeholders 5 & 6 render as "Coming Soon" cards until filled via admin.

## 11. Admin CMS (editable content outside the codebase)

**Why:** Products, client logos/links, and testimonials will keep changing (new products, changed links, new clients, new testimonials, retired items) — this content must not require a code edit/redeploy every time.

**Access:** `orbitex.com/admin` (single shared admin, since it feeds all 4 properties) — simple password-gated login (not public, not linked from nav/footer), but built securely:
- Hashed password (never stored/compared in plaintext), session cookie, rate-limited login attempts
- Even though it's "simple," this is still the front door to editing a public site — no auth shortcuts

**Manages:**
```
Products (6 slots): name, one-line description, logo/thumbnail image, external link, "coming soon" flag (for unfilled placeholder slots), which division it's associated with (for filtering on subdomains)
Clients (30 slots, expandable): name, logo image, external link — feeds the client logo marquee/trust bar on hub + relevant subdomain automatically
Testimonials (unlimited, add/remove freely): quote text, author name, author role/company, which division(s) it should appear on
Founder bio (About page): bio text field, editable independent of code — photo upload handled here too (see §7)
```
Each entry: add / edit / delete / reorder. Changes reflect on the live site without a deploy (content pulled from a small database/CMS store, not hardcoded in components).

**Build implication:** components (products strip, client marquee, testimonials rotator, founder bio block) must read from this data source rather than static arrays — flag this to the build agent explicitly so it doesn't hardcode the 6 products/30 clients as static JSX.
- `manifest.json` per property (name, icons, theme_color = that property's accent, background_color = ivory)
- Service worker: cache-first for static assets, network-first for content
- Install prompt handling (custom "Install App" button, not just relying on browser default)
- Offline fallback page in base neutral palette
- Icons: maskable + any-purpose variants, per property (same mark, accent-tinted)

---

## 9. Build Order Recommendation
1. Design system tokens (shared) — build once as a component library / shared CSS variables file
2. `orbitex.com` hub — smallest scope, defines the shared shell (nav/footer/card/button patterns) everything else inherits
3. `marketing.orbitex.com` — richest existing content to adapt, fastest to a "real" feeling site
4. `web.orbitex.com`
5. `software.orbitex.com` — needs product info/links from you, so naturally last

---

## 10. Open Items (need founder input before final copy lock)
- [x] 6 product names — 4 confirmed (Billdoor, SkillItLearn, Addicted Zero, WTW), 2 placeholders pending; descriptions/links added via admin CMS (§11), not hardcoded
- [ ] 30 client names + external links + logos — added via admin CMS (§11) as they come in, no need to have all 30 before launch
- [x] Tagline chosen — "Software, web, and growth — engineered by one team."
- [x] Founder name — Ayan Mathur; photo + bio managed via admin CMS (§11)
- [ ] Real client logos for trust bar (need permission/assets) — add via admin CMS as available
- [ ] Real testimonials — add via admin CMS as available (currently placeholder-worthy patterns only)
- [ ] Confirm division names as public-facing labels (e.g. "Digital Marketing" vs "Growth" vs "Marketing") — see explanation below
- [ ] Paper-diorama illustration/icon asset set (§2.11) — full custom build: hero cutout shapes (per division theme), bespoke icon silhouette set, photo mat/die-cut treatment, paper-grain texture — see separate icon-prompt sheet provided alongside this plan

### On "confirm division names as public-facing labels"
This is about what visitors actually read in the nav, page titles, and section headers — not the internal/technical names. Right now the plan uses "Software Development," "Web Development Agency," and "Digital Marketing" internally, but each could be worded differently in public copy, and the choice changes tone:
```
"Digital Marketing"  → sounds like a services agency (SEO/ads/social) — precise, slightly generic
"Growth"              → sounds like a modern, outcome-focused team — punchier, less literal about services
"Marketing"           → plain, broad, safe — least distinctive
```
Same applies to the other two divisions — e.g. "Software Development" vs. "Software" vs. "Product Engineering"; "Web Development Agency" vs. "Web" vs. "Web & Digital". The label picked shows up everywhere: nav item, subdomain page titles, division cards on the hub, footer links. Since it's copy-only (no structural impact), you can decide this anytime before final copy lock — happy to draft 2-3 label sets for each division if useful.
