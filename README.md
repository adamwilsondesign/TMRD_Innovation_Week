# TMRD Innovation Week — Homepage

Editorial, image-ready homepage for TMRD Innovation Week (February 22–26,
2027 · Tampa, FL), powered by Tampa General Hospital. Cinematic dark
foundation, green/blue light as the connective brand motif, disciplined
3- and 4-column layouts — built to accept final photography, portraits, and
logos as simple file drops.

## Install / Run / Build

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run smoke      # Playwright checks + full-page screenshots into artifacts/
```

The smoke script expects a Chromium binary at `/opt/pw-browsers/chromium`
(override with `CHROMIUM_PATH=/path/to/chrome`).

## Where things live

| What | Where |
|---|---|
| **All page content** (copy, tracks, events, speaker slots, venues, pricing, footer) | `src/data/site.ts` |
| **Media manifest** (every image slot: path, alt, ratio, crop) | `src/data/media.ts` |
| Image-ready frame component | `src/components/media/MediaFrame.tsx` |
| Sections | `src/components/*.tsx` |
| Motion system | `src/components/motion/` + `src/lib/` (useReveal, usePointerGlow) |
| Design tokens | `src/styles/globals.css` (`:root` custom properties) |
| Section styles | `src/styles/sections.css` · atmosphere in `src/styles/motion.css` |
| Asset brief for the art team | `ASSET_SPECS.md` |

## Installing final imagery

No final photography, portraits, or logos are bundled. Every future image
slot already exists with correct geometry and a tasteful dark fallback.

1. Check `ASSET_SPECS.md` for the slot's path, size, and art direction.
2. Drop the file at that path under `public/assets/…` — the site detects it
   automatically. No code changes.
3. To adjust a crop, edit that entry's `objectPosition` in
   `src/data/media.ts` (CSS `object-position` syntax, e.g. `"65% 40%"`).

### Media debug mode

Open the site with **`?mediaDebug=1`** to overlay each media slot with its
asset key, expected filename, and recommended dimensions, and to reveal the
partner logo slots. The labels never render in normal use.

## Replacing concept content

Programming, speakers, and partners are not yet confirmed. Everything
provisional is marked `status: 'concept'` in `src/data/site.ts`:

- **Events** (`schedule.days[].events`) — concept sessions with no real
  speakers, hosts, or venues. Replace titles/times/descriptions as the real
  program lands.
- **Speaker slots** (`people.slots`) — render as "Speaker announcements
  coming soon". Add `name` / `role` / `org` fields and a portrait file when
  speakers are confirmed.
- **Partners** (`people.partners`) — "Partner announcements coming soon";
  logo-ready slots appear only in media-debug mode.
- Set `site.tmrdWebsiteUrl` to the real TMRD site before launch.

## Stack & behavior

React 18 + TypeScript + Vite · GSAP/ScrollTrigger (scroll choreography) ·
Lenis (smooth scroll) · Manrope variable font (Neulis Sans stand-in — swap
in `--font-sans` when licensed files are available).

Accessible date tabs (arrow keys / Home / End), focus-trapped mobile menu,
validated newsletter form, visible focus states, and full
`prefers-reduced-motion` support (no smooth scroll, no pointer light, no
continuous motion; content immediately visible).
