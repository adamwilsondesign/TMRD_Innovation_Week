# TMRD Innovation Week — Homepage Demo

A high-fidelity, highly animated demo of the TMRD Innovation Week homepage:
a district-wide innovation festival in Tampa, FL (February 22–26, 2027),
powered by Tampa General Hospital. Built as a creative-development showcase —
cinematic dark atmosphere, green/blue light as the connective motif, and a
restrained editorial layout.

## Install / Run / Build

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run smoke      # Playwright smoke tests + full-page screenshots into artifacts/
```

The smoke script expects a Chromium binary at `/opt/pw-browsers/chromium`
(override with `CHROMIUM_PATH=/path/to/chrome`).

## Main dependencies

- **React 18 + TypeScript + Vite** — application shell
- **GSAP + ScrollTrigger** — load choreography, scroll reveals, parallax
- **Lenis** — smooth scrolling (disabled under `prefers-reduced-motion`)
- **@fontsource-variable/manrope** — self-hosted variable font (Neulis Sans
  stand-in; drop the real files into `src/styles` and update `--font-sans`)
- **Playwright** (dev-only) — smoke tests, screenshots, and the artwork generator

## Where things live

| What | Where |
|---|---|
| **All page content** (copy, tracks, events, speakers, venues, pricing, footer) | `src/data/site.ts` |
| Sections | `src/components/*.tsx` (Hero, BuiltOnEachOther, Tracks, WeekAtAGlance, People, District, Passes, FinalCTA, Footer) |
| Motion system | `src/components/motion/` (AmbientField canvas, CursorLight, MagneticButton, RevealText, ConnectionArcs, ScrollProgress) + `src/lib/` (useReveal, usePointerGlow) |
| Design tokens | `src/styles/globals.css` (`:root` custom properties) |
| Section styles | `src/styles/sections.css` · atmosphere/motion in `src/styles/motion.css` |

## Replacing imagery

All imagery in `public/images/` is **procedurally generated abstract artwork**
(light, geometry, atmosphere — no stock photos, no fabricated people). This
environment has no external network access, so the art is produced locally by
`scripts/assets/generator.html` + `scripts/generate-assets.mjs`:

```bash
node scripts/generate-assets.mjs              # regenerate everything
node scripts/generate-assets.mjs hero-skyline # regenerate one artwork
```

To use real photography, drop a file with the same name and aspect ratio into
`public/images/` (paths are centralized in `src/data/site.ts` via the `img()`
helper). Speaker cards are luminous monogram placeholders — replace
`portrait-*.jpg` with real 3:4 portraits and remove the `initials` overlay in
`src/components/People.tsx` if desired. Partner logos are rendered as text
wordmarks; swap in official assets when licensed files are available.

## Reference comparison mode (dev only)

Put the long reference composite at `public/reference.png`, then:

- open `http://localhost:5173/?reference=1`, or press **R** on the page
- press **O** (or use the chip, bottom-left) to cycle overlay opacity 50% → 100% → 0%

The overlay is `pointer-events: none` and is excluded from production builds.

## Accessibility & motion

Semantic landmarks, one `h1`, keyboard-accessible day tabs (arrow keys /
Home / End), focus-trapped mobile menu, native `<dialog>` pass modal, visible
focus states, and full `prefers-reduced-motion` support (no smooth scroll, no
particles/cursor light, content immediately visible).
