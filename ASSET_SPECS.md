# TMRD Innovation Week — Asset Specifications

Every image slot on the homepage is image-ready today. Installing final
artwork is a **file drop only** — place the file at the listed repository
path and the site picks it up automatically (no code changes). Until a file
exists, the slot renders a quiet dark fallback that holds the same geometry.

- All slots are declared in `src/data/media.ts` (key, path, alt, aspect
  ratio, crop position).
- Tune a crop by editing that entry's `objectPosition` (CSS
  `object-position` syntax, e.g. `"65% 40%"`).
- Preview every slot's key/spec in the browser with `?mediaDebug=1`.
- Prefer WebP (or AVIF) at the recommended pixel size; keep photography
  dark-friendly — the site sits on near-black surfaces and most slots have
  a dark gradient over their lower third.

## Hero

| Key | Path | Size | Ratio | Art direction |
|---|---|---|---|---|
| `heroDesktop` | `public/assets/hero/hero-tampa-desktop.webp` | 2400 × 1350 | 16:9 | Cinematic dusk waterfront looking toward the district. Dark sky, water in the lower third, lights reading green/blue. Rendered as a right-bleeding panel; keep the key subject around 65% from the left. |

## Built on Each Other (arched pillar windows)

Cropped through an arched (semicircular-top) window. Keep subjects centered
horizontally, meaningful content in the upper 70%.

| Key | Path | Size | Ratio | Art direction |
|---|---|---|---|---|
| `pillarCollaboration` | `public/assets/pillars/pillar-collaborative-ecosystem.webp` | 1200 × 1400 | 6:7 | Human collaboration — clinicians, founders, researchers together. |
| `pillarAcceleration` | `public/assets/pillars/pillar-accelerating-innovation.webp` | 1200 × 1400 | 6:7 | Momentum/build energy — lab, prototype, or data environment. Cool blue tonality. |
| `pillarTranslation` | `public/assets/pillars/pillar-translational-excellence.webp` | 1200 × 1400 | 6:7 | Bench-to-bedside: research hardware or clinical detail with human presence. |
| `pillarMomentum` | `public/assets/pillars/pillar-tampa-momentum.webp` | 1200 × 1400 | 6:7 | Tampa as a place — skyline or district architecture at dusk. |

## Explore the Tracks

Text sits over the lower third behind a dark gradient — keep lower thirds
uncluttered.

| Key | Path | Size | Ratio | Art direction |
|---|---|---|---|---|
| `trackHealthcare` | `public/assets/tracks/track-healthcare.webp` | 1600 × 1000 | 16:10 | Warm, human care moment. |
| `trackAi` | `public/assets/tracks/track-ai-data.webp` | 1600 × 1000 | 16:10 | Applied technology in use — avoid circuit-board clichés. |
| `trackResearch` | `public/assets/tracks/track-research.webp` | 1600 × 1000 | 16:10 | Real research texture — glassware, instruments, focused people. |
| `trackStartups` | `public/assets/tracks/track-startups.webp` | 2000 × 1000 | 2:1 | Founders/investors in conversation. Wide panoramic crop. |
| `trackCommunity` | `public/assets/tracks/track-community.webp` | 2000 × 1000 | 2:1 | People and place — Riverwalk / Water Street at golden or blue hour. |

## Week at a Glance (event cards)

One landscape image per concept event, 1600 × 900 (16:9), path pattern
`public/assets/events/event-<slug>.webp`:

| Key | Filename | Art direction |
|---|---|---|
| `eventOpening` | `event-opening-night.webp` | Opening-night atmosphere: crowd, stage light, waterfront dusk. |
| `eventDistrict` | `event-state-of-district.webp` | Leadership on stage / auditorium scale. |
| `eventCare` | `event-care-delivery.webp` | Hands-on clinical workshop energy. |
| `eventAi` | `event-ai-health.webp` | Applied AI in health — demo or main-stage moment. |
| `eventSecurity` | `event-connected-hospital.webp` | Health-system technology — human, not server-room cliché. |
| `eventRobotics` | `event-robotics.webp` | Live robotics demo in motion. |
| `eventResearch` | `event-research-breakthroughs.webp` | Discovery moment — presenter with real research imagery. |
| `eventBench` | `event-bench-to-bedside.webp` | Fast-paced sprint format in a working lab/studio. |
| `eventPosters` | `event-poster-night.webp` | Open-lab evening — posters, warm interior light. |
| `eventFounders` | `event-founders-investors.webp` | Capital in the room — panel or roundtable. |
| `eventScaling` | `event-scaling-ventures.webp` | Operators on stage — practical, credible. |
| `eventPitch` | `event-reverse-pitch.webp` | Funds pitching founders — playful format. |
| `eventFinale` | `event-tampa-finale.webp` | The district on the water — celebratory, wide. |
| `eventWorkforce` | `event-workforce.webp` | Educators + employers, classroom-to-career. |
| `eventWellness` | `event-wellness.webp` | Movement and mindfulness outdoors by the water. |

## People Moving Momentum (speaker portraits)

4:5 editorial portraits, 1200 × 1500, consistent lighting across the set,
eyes in the upper third (caption gradient occupies the lower quarter).

| Key | Path |
|---|---|
| `speakerSlot1` | `public/assets/speakers/speaker-slot-1.webp` |
| `speakerSlot2` | `public/assets/speakers/speaker-slot-2.webp` |
| `speakerSlot3` | `public/assets/speakers/speaker-slot-3.webp` |
| `speakerSlot4` | `public/assets/speakers/speaker-slot-4.webp` |

When speakers are confirmed, also add `name` / `role` / `org` to
`people.slots` in `src/data/site.ts`.

## Partner logos

Monochrome (white or near-white) logo files, ~320 × 120 safe area, SVG
preferred: `public/assets/partners/partner-01.svg` … `partner-06.svg`.
Slots render only in `?mediaDebug=1` until wired to confirmed partners —
do not add unapproved logos.

## District visualization

| Key | Path | Size | Ratio | Art direction |
|---|---|---|---|---|
| `districtAerial` | `public/assets/district/district-aerial.webp` | 2000 × 1500 | 4:3 | Dusk aerial with water edge. The node/path overlay draws on top; node positions are tuned via `district.venues[].x/y` in `src/data/site.ts`. The visualization stays labeled conceptual — no geographic precision implied. |
