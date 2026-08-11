/**
 * Central media manifest.
 *
 * No final photography, portraits, or logos exist yet. Every future image on
 * the page is declared here so art can be installed later by dropping a file
 * at the listed path — no code changes required. Until a file exists,
 * <MediaFrame> renders a tasteful dark fallback that preserves the exact
 * geometry of the future artwork.
 *
 * See ASSET_SPECS.md for the full art-direction brief per asset.
 * Enable `?mediaDebug=1` to see asset keys/specs overlaid on each slot.
 */

export interface MediaEntry {
  key: string;
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "16 / 9". Wrappers may override via layout. */
  aspectRatio: string;
  /** CSS object-position — tune the crop without touching components. */
  objectPosition: string;
  recommendedSize: string;
  /** Fallback accent light while the asset is missing. */
  accent: 'green' | 'blue';
  /** Position of the fallback accent light. */
  accentPosition?: string;
  /** Show the faint architectural grid in the fallback. */
  grid?: boolean;
  /** Short art-direction note (also surfaced in ASSET_SPECS.md). */
  note: string;
}

const entries = [
  /* ---------- hero ---------- */
  {
    key: 'heroDesktop',
    src: '/assets/hero/hero-tampa-desktop.webp',
    alt: 'Tampa waterfront and innovation district at blue hour',
    aspectRatio: '16 / 9',
    objectPosition: '65% 50%',
    recommendedSize: '2400 × 1350',
    accent: 'blue',
    accentPosition: '38% 72%',
    note: 'Cinematic dusk waterfront looking toward the district. Dark sky, water in the lower third, lights reading green/blue.',
  },

  /* ---------- Built on Each Other pillars (arched windows) ---------- */
  {
    key: 'pillarCollaboration',
    src: '/assets/pillars/pillar-collaborative-ecosystem.webp',
    alt: 'People collaborating inside a TMRD facility',
    aspectRatio: '6 / 7',
    objectPosition: '50% 40%',
    recommendedSize: '1200 × 1400',
    accent: 'green',
    accentPosition: '50% 30%',
    note: 'Warm human collaboration — clinicians, founders, researchers together. Crops through an arched window.',
  },
  {
    key: 'pillarAcceleration',
    src: '/assets/pillars/pillar-accelerating-innovation.webp',
    alt: 'Lab or engineering environment in motion',
    aspectRatio: '6 / 7',
    objectPosition: '50% 45%',
    recommendedSize: '1200 × 1400',
    accent: 'blue',
    accentPosition: '55% 35%',
    note: 'Momentum and build energy — lab, prototype, or data environment. Cool blue tonality.',
  },
  {
    key: 'pillarTranslation',
    src: '/assets/pillars/pillar-translational-excellence.webp',
    alt: 'Research translating to patient care',
    aspectRatio: '6 / 7',
    objectPosition: '50% 40%',
    recommendedSize: '1200 × 1400',
    accent: 'green',
    accentPosition: '45% 32%',
    note: 'Bench-to-bedside: research hardware or clinical detail with human presence.',
  },
  {
    key: 'pillarMomentum',
    src: '/assets/pillars/pillar-tampa-momentum.webp',
    alt: 'Tampa cityscape rising at dusk',
    aspectRatio: '6 / 7',
    objectPosition: '50% 55%',
    recommendedSize: '1200 × 1400',
    accent: 'blue',
    accentPosition: '50% 40%',
    note: 'Tampa as a place — skyline or district architecture, dusk, aspirational.',
  },

  /* ---------- tracks ---------- */
  {
    key: 'trackHealthcare',
    src: '/assets/tracks/track-healthcare.webp',
    alt: 'Clinicians and patients in a modern care environment',
    aspectRatio: '16 / 10',
    objectPosition: '50% 42%',
    recommendedSize: '1600 × 1000',
    accent: 'green',
    accentPosition: '30% 55%',
    note: 'Human, warm care moment. Reads clearly behind a dark lower gradient.',
  },
  {
    key: 'trackAi',
    src: '/assets/tracks/track-ai-data.webp',
    alt: 'Technology and data environment',
    aspectRatio: '16 / 10',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 1000',
    accent: 'blue',
    accentPosition: '60% 40%',
    note: 'Applied technology — hardware, screens-in-use, robotics. Avoid abstract circuit clichés.',
  },
  {
    key: 'trackResearch',
    src: '/assets/tracks/track-research.webp',
    alt: 'Researchers at work in a laboratory',
    aspectRatio: '16 / 10',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 1000',
    accent: 'green',
    accentPosition: '40% 45%',
    note: 'Real research texture — glassware, instruments, focused people.',
  },
  {
    key: 'trackStartups',
    src: '/assets/tracks/track-startups.webp',
    alt: 'Founders and investors in conversation',
    aspectRatio: '2 / 1',
    objectPosition: '50% 40%',
    recommendedSize: '2000 × 1000',
    accent: 'blue',
    accentPosition: '68% 50%',
    note: 'Deal energy — founders pitching, whiteboards, capital conversations. Wide panoramic crop.',
  },
  {
    key: 'trackCommunity',
    src: '/assets/tracks/track-community.webp',
    alt: 'Tampa community gathering along the waterfront',
    aspectRatio: '2 / 1',
    objectPosition: '50% 55%',
    recommendedSize: '2000 × 1000',
    accent: 'green',
    accentPosition: '34% 60%',
    note: 'People and place — Riverwalk, Water Street, festival energy at golden/blue hour.',
  },

  /* ---------- week at a glance (one slot per concept event) ---------- */
  {
    key: 'eventOpening',
    src: '/assets/events/event-opening-night.webp',
    alt: 'Evening festival gathering on the waterfront',
    aspectRatio: '16 / 9',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'Opening-night atmosphere: crowd, stage light, waterfront dusk.',
  },
  {
    key: 'eventDistrict',
    src: '/assets/events/event-state-of-district.webp',
    alt: 'District leadership session',
    aspectRatio: '16 / 9',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 900',
    accent: 'blue',
    note: 'Leadership on stage / auditorium scale.',
  },
  {
    key: 'eventCare',
    src: '/assets/events/event-care-delivery.webp',
    alt: 'Care delivery workshop',
    aspectRatio: '16 / 9',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'Hands-on clinical workshop energy.',
  },
  {
    key: 'eventAi',
    src: '/assets/events/event-ai-health.webp',
    alt: 'AI and health technology session',
    aspectRatio: '16 / 9',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 900',
    accent: 'blue',
    note: 'Applied AI in health — demo or main-stage moment.',
  },
  {
    key: 'eventSecurity',
    src: '/assets/events/event-connected-hospital.webp',
    alt: 'Health-system technology session',
    aspectRatio: '16 / 9',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 900',
    accent: 'blue',
    note: 'Infrastructure/security topic — keep human, not server-room cliché.',
  },
  {
    key: 'eventRobotics',
    src: '/assets/events/event-robotics.webp',
    alt: 'Robotics demonstration',
    aspectRatio: '16 / 9',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 900',
    accent: 'blue',
    note: 'Live robotics demo — surgical or logistics platform in motion.',
  },
  {
    key: 'eventResearch',
    src: '/assets/events/event-research-breakthroughs.webp',
    alt: 'Research presentation',
    aspectRatio: '16 / 9',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'Discovery moment — presenter with real research imagery.',
  },
  {
    key: 'eventBench',
    src: '/assets/events/event-bench-to-bedside.webp',
    alt: 'Translational research sprint',
    aspectRatio: '16 / 9',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'Fast-paced pitch/sprint format in a working lab or studio.',
  },
  {
    key: 'eventPosters',
    src: '/assets/events/event-poster-night.webp',
    alt: 'Evening research poster session',
    aspectRatio: '16 / 9',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'Open-lab evening — posters, conversation, warm interior light.',
  },
  {
    key: 'eventFounders',
    src: '/assets/events/event-founders-investors.webp',
    alt: 'Founders and investors forum',
    aspectRatio: '16 / 9',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 900',
    accent: 'blue',
    note: 'Capital in the room — panel or roundtable with founder energy.',
  },
  {
    key: 'eventScaling',
    src: '/assets/events/event-scaling-ventures.webp',
    alt: 'Scaling health ventures session',
    aspectRatio: '16 / 9',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 900',
    accent: 'blue',
    note: 'Operators on stage — practical, credible.',
  },
  {
    key: 'eventPitch',
    src: '/assets/events/event-reverse-pitch.webp',
    alt: 'Investor reverse pitch event',
    aspectRatio: '16 / 9',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 900',
    accent: 'blue',
    note: 'Playful format — funds pitching founders.',
  },
  {
    key: 'eventFinale',
    src: '/assets/events/event-tampa-finale.webp',
    alt: 'Closing celebration on the Riverwalk',
    aspectRatio: '16 / 9',
    objectPosition: '50% 55%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'The whole district on the water — celebratory, wide.',
  },
  {
    key: 'eventWorkforce',
    src: '/assets/events/event-workforce.webp',
    alt: 'Workforce development session',
    aspectRatio: '16 / 9',
    objectPosition: '50% 45%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'Educators + employers, classroom-to-career.',
  },
  {
    key: 'eventWellness',
    src: '/assets/events/event-wellness.webp',
    alt: 'Community wellness on the Riverwalk',
    aspectRatio: '16 / 9',
    objectPosition: '50% 50%',
    recommendedSize: '1600 × 900',
    accent: 'green',
    note: 'Movement and mindfulness outdoors by the water.',
  },

  /* ---------- speakers (announcement slots) ---------- */
  {
    key: 'speakerSlot1',
    src: '/assets/speakers/speaker-slot-1.webp',
    alt: 'Speaker portrait — to be announced',
    aspectRatio: '4 / 5',
    objectPosition: '50% 30%',
    recommendedSize: '1200 × 1500',
    accent: 'green',
    accentPosition: '50% 24%',
    note: 'Editorial portrait, consistent lighting across the set, eyes in the upper third.',
  },
  {
    key: 'speakerSlot2',
    src: '/assets/speakers/speaker-slot-2.webp',
    alt: 'Speaker portrait — to be announced',
    aspectRatio: '4 / 5',
    objectPosition: '50% 30%',
    recommendedSize: '1200 × 1500',
    accent: 'blue',
    accentPosition: '50% 24%',
    note: 'Editorial portrait, consistent lighting across the set, eyes in the upper third.',
  },
  {
    key: 'speakerSlot3',
    src: '/assets/speakers/speaker-slot-3.webp',
    alt: 'Speaker portrait — to be announced',
    aspectRatio: '4 / 5',
    objectPosition: '50% 30%',
    recommendedSize: '1200 × 1500',
    accent: 'green',
    accentPosition: '50% 24%',
    note: 'Editorial portrait, consistent lighting across the set, eyes in the upper third.',
  },
  {
    key: 'speakerSlot4',
    src: '/assets/speakers/speaker-slot-4.webp',
    alt: 'Speaker portrait — to be announced',
    aspectRatio: '4 / 5',
    objectPosition: '50% 30%',
    recommendedSize: '1200 × 1500',
    accent: 'blue',
    accentPosition: '50% 24%',
    note: 'Editorial portrait, consistent lighting across the set, eyes in the upper third.',
  },

  /* ---------- district ---------- */
  {
    key: 'districtAerial',
    src: '/assets/district/district-aerial.webp',
    alt: 'Aerial view of the Tampa Medical & Research District at dusk',
    aspectRatio: '4 / 3',
    objectPosition: '50% 50%',
    recommendedSize: '2000 × 1500',
    accent: 'blue',
    accentPosition: '58% 38%',
    grid: true,
    note: 'Dusk aerial with water edge. Node overlay positions are tuned in src/data/site.ts (venue x/y).',
  },
] as const satisfies readonly MediaEntry[];

export type MediaKey = (typeof entries)[number]['key'];

export const media = Object.fromEntries(entries.map((e) => [e.key, e])) as Record<
  MediaKey,
  MediaEntry
>;

export const mediaList: readonly MediaEntry[] = entries;
