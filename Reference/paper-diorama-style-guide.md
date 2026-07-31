# Orbitex — Paper Diorama Style Guide
*Standalone visual-craft reference. Paste this whole file into Antigravity (or any build agent) as the governing aesthetic spec, alongside the design tokens and component patterns from the master plan.*

---

## 0. The One-Sentence Brief

**Every screen is a physical paper diorama, lit and photographed — not a digital interface with paper-flavored decoration.** If a technique wouldn't make sense on an actual cut-paper scene sitting on a desk under a lamp, don't use it.

---

## 1. Reference Language (what to study before building)

Give the build agent these reference points explicitly — they anchor the aesthetic in real craft traditions rather than a vague "papery" vibe:

- **Kirigami / layered paper-cut art** — Japanese/Chinese layered paper cutting, where multiple flat cut sheets are stacked at intervals to create depth (this is the core structural metaphor for card stacking and hero layering)
- **Diorama shoebox art** — school-project dioramas and museum diorama boxes: flat cutout figures/scenery placed at different depths inside a box, each casting its own shadow onto the layer behind
- **Stop-motion set design** — *Fantastic Mr. Fox*, *Coraline*, *Isle of Dogs* — tactile handmade materials, visible texture, imperfect but deliberate craft, warm practical lighting rather than digital gradients
- **Pop-up book engineering** — v-fold and layer mechanisms, where flat paper becomes dimensional through folding and layering, not through rendering tricks
- **Riso print / letterpress texture** — for the grain reference specifically: subtle ink-on-paper imperfection, not photographic film grain, not "grunge" texture packs
- **Torn paper collage art** (Eric Carle's collage illustration style, Matisse's late cut-paper works) — for edge-tear reference: organic, deliberate, never jagged like ripped notebook paper

Explicitly tell the build agent: **reference these traditions conceptually for shadow logic, edge quality, and layering — do not literally reproduce any artist's copyrighted work.**

---

## 2. Physical Logic — Why Paper Behaves the Way It Does

Before any code, the agent needs the physical model, because every visual rule below derives from it:

1. **Paper is flat but not weightless.** It sits at a height above the surface below it. Height = shadow size + shadow softness + slight desaturation of what's beneath it (things further away read hazier).
2. **Light comes from one consistent direction** (upper-left, soft, like window light) across the entire site. Every shadow, every highlight, every "lifted edge" glow follows this single light source. Never mix shadow directions on the same screen.
3. **Paper has a grain/fiber direction and a slight texture** — it's never perfectly flat/smooth like a rendered polygon. This is what the grain overlay simulates.
4. **Paper can be cut cleanly (die-cut, scissors) or torn (hand-torn deckle edge).** These are two distinct edge qualities and must not be visually confused:
   - **Cut edge** = crisp, clean curve or straight line, default for 90% of elements (cards, buttons, containers)
   - **Torn edge** = irregular, organic, slightly fibrous-looking, reserved for 1-2 emphasis elements per screen maximum
5. **Paper can be creased or slightly crumpled** without tearing — a subtle bend/fold, catching light differently along the crease line. This is the "crunch" — a barely-there fold line or corner lift, not a fully crumpled ball.
6. **Paper pieces overlap and are sometimes physically glued/pinned on top of each other** (icon badge on top of a card, a small satellite card leaning against a bigger one) — each overlap must show a contact shadow where the top piece meets the piece below it.

---

## 3. Grain — Detailed Spec

Grain is the single most important texture cue and the easiest to get wrong (too much = "grunge poster," too little = "flat digital pastel").

**Technique:** SVG `feTurbulence` + `feColorMatrix`, applied as a `background-image` data-URI or an `<svg>` filter overlay — NOT a JPEG noise texture (those compress poorly and look muddy at scale).

```
Reference SVG filter recipe:
<filter id="paperGrain">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" 
                 stitchTiles="stitch" result="noise"/>
  <feColorMatrix in="noise" type="matrix" 
                 values="0 0 0 0 0.16   0 0 0 0 0.14   0 0 0 0 0.09   0 0 0 0.04 0"/>
  <!-- last row alpha channel (0.04) controls grain opacity — keep between 0.03-0.06 -->
</filter>
```

**Rules:**
- Grain opacity: 3-6% max on base page background, up to 8% on card surfaces for slightly more "cardstock" feel
- `baseFrequency` between 0.8-1.0 for fine grain (higher = finer, more like quality paper; lower = coarser, more like recycled kraft paper — pick fine for a premium feel)
- Grain must be **static, not animated** — a subtle vibrating grain reads as glitchy/error state, not tactile
- Apply grain as a `mix-blend-mode: multiply` or `overlay` layer so it interacts naturally with the base color beneath rather than sitting as a flat gray haze
- Different grain intensity per depth layer is acceptable: background layer slightly coarser/more visible, foreground "closer" cards slightly finer/crisper (mimics how closer objects show more detail)

---

## 4. Tears — Detailed Spec

**Where to use:** Maximum 1-2 torn edges per viewport. Candidates: one edge of the hero's primary illustrated/photo layer, the top edge of a single "featured" card (testimonial spotlight, featured product, featured case study). Never on: buttons, form fields, nav, footer, standard grid cards.

**Technique:** SVG `clip-path` with a hand-tuned irregular path, OR a reusable `<mask>` with a noise-perturbed edge.

```
Two build approaches, pick one per project:

A) Static hand-authored torn-edge SVG path (more control, less "sameness" risk 
   if you author 3-4 variants and randomize/rotate which one applies where):
   - Draw a roughly straight edge in an SVG path editor, then add 8-14 small 
     irregular vertices along it with varying inward/outward jitter of about 
     2-6px at the scale the element will render. Avoid symmetry or repeating 
     rhythm — real tears are not sinusoidal.

B) Procedural: feTurbulence-driven displacement on a straight clip-path edge 
   (feDisplacementMap with a turbulence noise input, low scale ~4-8px) — 
   faster to generate many variants, slightly less "hand-crafted" looking, 
   fine for background/decorative torn shapes but use approach A for the 
   ONE hero-featured tear per page since that one gets the most visual attention.
```

**Rules:**
- Torn edge always has a **thin lighter-value inner rim** (1-2px, a shade lighter than the paper's face color) simulating the exposed inner fiber of the tear catching light — this single detail sells the effect more than the jaggedness of the path itself
- Pair every torn edge with technique from §2.4 (directional shadow) cast onto the layer below — a torn edge with a flat/no shadow looks like a broken PNG mask, not paper
- Do not combine a torn edge with a perfectly straight opposite edge on the same shape unless it's clearly "this is one torn strip" — usually torn edges belong on one side of an otherwise clean-cut shape (e.g., photo is cleanly rectangular except the bottom edge is torn, as if ripped from a larger sheet)

---

## 5. Crunches / Creases — Detailed Spec

The subtlest and most premium-feeling effect — a slight fold or lift, not damage.

**Technique:** A soft linear or curved highlight+shadow pair along a crease line, plus (optionally) a very slight rotation/skew of the paper section on either side of the crease to imply a fold plane change.

```
CSS approach for a corner lift (e.g. corner of a card looking slightly peeled):
- Apply a subtle radial-gradient highlight at the corner (lighter, ~8-12% white 
  overlay) fading over 20-30px
- Pair with a small dark contact-shadow crescent just inside that corner 
  (the shadow the lifted paper casts onto itself/the surface below)
- Optional: a 1-2deg rotation on just that corner via a clip-path + transform 
  trick, or a very subtle CSS mask gradient — used sparingly (one card per 
  section max) as a "this piece isn't perfectly flat" detail

CSS approach for a crease line across a flat panel:
- A ~1-2px line using a linear-gradient combining a light highlight edge and 
  dark shadow edge sitting immediately next to each other (light-then-dark 
  in the direction of the implied fold) — like a valley or mountain fold line
- Never more than one crease per element; this is a texture accent, not a 
  structural pattern
```

**Rules:**
- Reserve crunches/creases for: hero illustration pieces, one "hand-placed" satellite card near the main stat widget, maybe one corner of the About section's largest bento photo — 1-3 uses sitewide per page, not a repeating pattern
- Never apply a crease to text-heavy content cards (forms, FAQ accordions, blog post cards) — it reduces legibility-feel and looks accidental rather than intentional there

---

## 6. Depth & Shadow System — Full Spec

This ties §2-5 together into one coherent z-axis language.

**Five depth tiers, each with its own shadow/scale/grain treatment:**

```
TIER 0 — Page background (the "table" the diorama sits on)
  shadow: none
  grain: baseFrequency 0.7 (coarser), opacity 3%
  color: color.bg.page (ivory), most desaturated tier

TIER 1 — Background scenery shapes (flat accent-color paper cutout shapes, 
          decorative, sit just above the table)
  shadow: 0 4px 8px -4px rgba(42,36,22,0.10) — small, soft, close-contact
  grain: opacity 4%
  motion: parallax rate 0.3x scroll speed (moves slowest — furthest away)

TIER 2 — Secondary content layer (supporting cards, secondary photos in a 
          bento grid, satellite mini-cards)
  shadow: 0 12px 24px -10px rgba(42,36,22,0.14)
  grain: opacity 5%
  motion: parallax rate 0.6x scroll speed

TIER 3 — Primary content layer (main service cards, primary bento photo, 
          standard interactive cards)
  shadow: 0 20px 40px -14px rgba(42,36,22,0.16), 0 4px 10px -4px rgba(42,36,22,0.10)
  grain: opacity 6% (finest/most detailed — it's closest to viewer)
  motion: parallax rate 1x (moves with normal scroll, no lag)

TIER 4 — Hero/featured element (the stat widget, one featured torn-edge card, 
          primary CTA button)
  shadow: 0 32px 64px -20px rgba(42,36,22,0.20), 0 8px 16px -6px rgba(42,36,22,0.12)
  grain: opacity 6-8%
  motion: parallax rate 1.1-1.2x (slightly OVERSHOOTS scroll — reads as 
          "closest to the glass/viewer," a classic diorama-box parallax trick)
  extra: this tier is the ONLY tier allowed a torn edge or crease treatment 
         as the emphasis element per section
```

**Cross-tier contact shadows:** wherever a Tier 3/4 element visually overlaps a Tier 1/2 element (e.g., icon badge on a card, satellite card leaning on the main stat widget), add a small additional "contact shadow" — tighter, darker, closer to the overlap point — separate from that element's main ambient shadow. This is what makes the stack read as physically touching rather than just floating at different opacities.

---

## 7. Skills / Techniques Checklist (what the build agent needs to be fluent in)

Give this as an explicit capability list so nothing gets skipped or half-implemented:

- [ ] SVG `feTurbulence` + `feColorMatrix` for procedural grain generation
- [ ] SVG `clip-path` / `<mask>` authoring for torn-edge shapes (hand-authored path preferred for hero elements)
- [ ] SVG `feDisplacementMap` for procedural edge perturbation (background/decorative tears only)
- [ ] CSS custom properties for the 5-tier shadow system (§6) so shadows stay consistent and swappable per division accent
- [ ] `mix-blend-mode` (multiply/overlay) for grain-over-color compositing
- [ ] Scroll-linked parallax (CSS `scroll-timeline`/`animation-timeline` where supported, with an Intersection-Observer + transform fallback) for the tiered depth-of-field motion in §6
- [ ] Radial/linear gradient authoring for corner-lift and crease highlight/shadow pairs (§5)
- [ ] `prefers-reduced-motion` handling — parallax and settle-in motion must degrade gracefully to simple opacity fades
- [ ] Responsive scaling of all the above — grain/shadow/tear values are tuned in the spec at desktop scale; they must be proportionally reduced (roughly 60-75% of desktop shadow blur/spread, torn-edge jitter scaled down) on mobile so the effect doesn't overwhelm smaller card sizes

---

## 8. What NOT To Do (explicit anti-patterns)

- ❌ Photographic paper-texture JPEGs/PNGs as background-image — always procedural/vector, never a stock texture photo (looks muddy, doesn't scale, adds file weight)
- ❌ Torn edges on more than 1-2 elements per screen — instantly reads as a "torn paper theme pack" rather than considered craft
- ❌ Full crumpled/wrinkled paper effect anywhere — this design language uses flat cut/layered paper with occasional subtle creases, not crumpled balls
- ❌ Drop shadows with no directional consistency (shadows pointing different directions on the same page breaks the single-light-source illusion)
- ❌ Glassmorphism, neon glow, gradient-mesh backgrounds — these are "digital" visual languages that directly conflict with paper-craft
- ❌ Heavy grunge/distressed textures (coffee stains, ink splatters, heavily degraded edges) — this is clean, premium, quality-cardstock paper, not scrapbook/zine aesthetic
- ❌ Uniform identical shadow on every single element regardless of depth tier — flattens the whole hierarchy this system exists to create
- ❌ Animating grain/noise (static only) or animating tears (tears are a fixed shape property, not a transition)

---

## 9. Quick Reference — Per-Element Cheat Sheet

| Element | Depth Tier | Torn edge? | Crease? | Grain opacity |
|---|---|---|---|---|
| Page background | 0 | No | No | 3% |
| Decorative accent shapes | 1 | No | No | 4% |
| Nav bar | 3 (static, no parallax) | No | No | 4% |
| Standard service/capability card | 3 | No | Rare (1 per section max) | 6% |
| Featured/spotlight card (testimonial, featured product) | 4 | Optional, 1 per page | Optional | 6-8% |
| Bento photo grid — primary photo | 4 | Yes (1 edge) | Optional (1 corner) | 6-8% |
| Bento photo grid — secondary/tertiary photos | 2-3 | No | No | 5% |
| Stat/metric widget (hero) | 4 | No (keep clean/legible — it's data) | No | 6% |
| Satellite mini-cards near stat widget | 2 | No | Optional (1 corner lift) | 5% |
| Icon badges | Sits on parent tier +1 contact shadow | No | No | N/A (flat fill shape) |
| Buttons/CTAs | 3-4 depending on prominence | No | No | N/A (flat fill) |
| Form fields, footer, body text blocks | Flat, no diorama treatment | No | No | 0% (functional UI zone) |

---

## 10. Master Antigravity Prompt Block (paste-ready, all of the above condensed)

```
Apply the Orbitex Paper Diorama style system to this build. Full spec reference: 
paper-diorama-style-guide.md. Summary of governing rules:

- 5-tier depth system (page → decorative → secondary → primary → hero), each 
  tier has its own shadow size/softness, grain opacity, and scroll-parallax rate 
  (see §6 of the style guide for exact values).
- Grain: procedural SVG feTurbulence noise, 3-8% opacity depending on tier, 
  never a texture photo, never animated.
- Torn edges: SVG clip-path, hand-authored irregular path with a light inner 
  rim, maximum 1-2 uses per screen, only on Tier 4 hero/featured elements.
- Creases/crunches: subtle corner-lift or fold-line highlight+shadow pairs, 
  1-3 uses per page max, reserved for hero/illustration elements — never on 
  text-heavy or functional UI (forms, footer, nav).
- Single consistent light source (upper-left, soft) governs every shadow 
  direction sitewide — no exceptions.
- Icons: flat filled cutout-style shapes for feature/hero icons; thin-stroke 
  lucide-react OK for small utility UI icons only.
- Photography: paper-mounted treatment — photo sits on a slightly larger 
  paper-colored mat, casts its own tiered shadow, one hero photo per page may 
  carry a torn edge.
- Motion: elements "settle" into place on entrance (translateY + shadow fade-in, 
  300-400ms ease-out), tiered parallax on scroll per §6, all disabled/simplified 
  under prefers-reduced-motion.
- Explicitly forbidden: glassmorphism, neon glow, gradient-mesh backgrounds, 
  photographic texture files, full-crumple effects, grunge/distressed styling, 
  inconsistent shadow directions, animated grain.
- Functional UI zones (form fields, nav bar, footer link columns, body text) 
  stay clean/flat with no diorama treatment beyond base card shadow — the 
  paper-craft language is for the showcase/visual layer, not the entire interface.
```
