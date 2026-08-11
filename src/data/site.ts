/**
 * Central content for the TMRD Innovation Week homepage.
 *
 * PLACEHOLDER / CONCEPT CONTENT
 * -----------------------------
 * Final programming, speakers, partners, venues, and imagery are not yet
 * approved. Everything marked `status: 'concept'` is design-development
 * content meant to be replaced before launch:
 *   - `schedule.days[].events` — concept sessions (no real speakers/venues)
 *   - `people.slots`           — speaker announcement placeholders
 *   - `people.partners`        — partner announcements pending
 * Imagery lives in src/data/media.ts; drop files at the listed paths to
 * install final art (see ASSET_SPECS.md).
 */

import { media, type MediaKey } from './media';

export type ContentStatus = 'approved' | 'concept';

export const site = {
  name: 'TMRD Innovation Week',
  poweredBy: 'Tampa General Hospital',
  dates: 'February 22–26, 2027',
  location: 'Tampa, FL',
  eyebrowDate: 'February 22–26, 2027 · Tampa, FL',
  strap: ['Five Days', 'Five Tracks', 'One District'],
  /** Set the final TMRD district site URL before launch. */
  tmrdWebsiteUrl: '#',
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Tickets', href: '#tickets' },
];

export const hero = {
  headline: ['Not a Conference.', 'A Movement.'],
  subhead:
    'A district-wide ecosystem festival that makes the world feel Tampa’s innovation momentum.',
  supporting:
    'Five days. Five tracks. A city-spanning experience built for what’s next in health and beyond.',
  primaryCta: 'Buy Tickets',
  secondaryCta: 'Explore Schedule',
  mediaKey: 'heroDesktop' as MediaKey,
};

export const pillars = {
  eyebrow: 'The Power of the District',
  headline: ['Built on', 'Each Other'],
  body: 'At TMRD, you don’t build alone. Your ideas gain the support, expertise and coordination needed to move from concept to real-world impact.',
  cards: [
    {
      title: 'Collaborative Ecosystem',
      body: 'A district built around shared services, shared purpose, and shared success.',
      mediaKey: 'pillarCollaboration' as MediaKey,
      accent: 'green' as const,
    },
    {
      title: 'Accelerating Innovation',
      body: 'A launchpad for breakthroughs in biotech, medtech, digital health, AI, and data-driven care.',
      mediaKey: 'pillarAcceleration' as MediaKey,
      accent: 'blue' as const,
    },
    {
      title: 'Translational Excellence',
      body: 'Rapid pathways that translate research into real-world clinical and commercial impact.',
      mediaKey: 'pillarTranslation' as MediaKey,
      accent: 'green' as const,
    },
    {
      title: 'Tampa’s Innovation Momentum',
      body: 'A city rising as a national destination for life sciences, health AI, and medical innovation.',
      mediaKey: 'pillarMomentum' as MediaKey,
      accent: 'blue' as const,
    },
  ],
};

export type TrackAccent = 'green' | 'blue';

export const tracks = {
  eyebrow: 'Five Tracks. Endless Possibilities.',
  headline: ['Explore', 'the Tracks'],
  body: 'Five focused tracks. Hundreds of bold ideas. Unlimited potential. Discover the ideas, people, and momentum shaping Tampa’s innovation ecosystem.',
  items: [
    {
      id: 'healthcare',
      title: 'Healthcare',
      body: 'Clinical innovation, patient experience, and the future of care delivery.',
      mediaKey: 'trackHealthcare' as MediaKey,
      accent: 'green' as TrackAccent,
      wide: false,
    },
    {
      id: 'ai-data',
      title: 'AI, Data & the Future',
      body: 'Applied AI, machine learning, data systems, cybersecurity, robotics, and emerging technology.',
      mediaKey: 'trackAi' as MediaKey,
      accent: 'blue' as TrackAccent,
      wide: false,
    },
    {
      id: 'research',
      title: 'Research & Discovery',
      body: 'Academic and translational research, from bench to bedside.',
      mediaKey: 'trackResearch' as MediaKey,
      accent: 'green' as TrackAccent,
      wide: false,
    },
    {
      id: 'startups',
      title: 'Startups, Capital & Growth',
      body: 'Founders, investors, commercialization, and the capital ecosystem building what’s next.',
      mediaKey: 'trackStartups' as MediaKey,
      accent: 'blue' as TrackAccent,
      wide: true,
    },
    {
      id: 'community',
      title: 'Tampa & Community',
      body: 'Local culture, civic partnership, wellness, placemaking, and community-facing programming.',
      mediaKey: 'trackCommunity' as MediaKey,
      accent: 'green' as TrackAccent,
      wide: true,
    },
  ],
  tgh: {
    kicker: 'TGH Innovation Week',
    audience: 'For TGH Team Members',
    lead: 'A week of internal innovation events and activities happening across all campuses.',
    body: 'TGH Innovation Week runs alongside all five community-facing tracks. TGH team members have access to the public programming plus TGH-only events.',
    cta: 'Learn More',
  },
};

export interface EventItem {
  status: ContentStatus;
  time: string;
  title: string;
  track: string;
  trackId: string;
  description: string;
  mediaKey: MediaKey;
  featured?: boolean;
}

export interface DayItem {
  id: string;
  weekday: string;
  date: string;
  label: string;
  events: EventItem[];
}

/**
 * February 2027: the 22nd is a Monday.
 * All events are CONCEPT programming for design development — no real
 * speakers, hosts, or venues are named or implied.
 */
export const schedule = {
  eyebrow: 'Five Days of Momentum',
  headline: ['Week at', 'a Glance'],
  body: 'Five days. Five tracks. Dozens of ways to learn, connect, and move what’s next forward.',
  cta: 'View Full Schedule',
  days: [
    {
      id: 'mon',
      weekday: 'Monday',
      date: 'Feb 22',
      label: 'Monday, Feb 22',
      events: [
        {
          status: 'concept',
          time: 'Evening',
          title: 'Opening Night: A Movement Starts Here',
          track: 'Tampa & Community',
          trackId: 'community',
          description:
            'Kick off the week with inspiration, connection, and a bold look at what’s ahead for the district.',
          mediaKey: 'eventOpening',
          featured: true,
        },
        {
          status: 'concept',
          time: 'Morning',
          title: 'State of the District',
          track: 'Tampa & Community',
          trackId: 'community',
          description:
            'A look at the year ahead — the projects, partnerships, and momentum behind the district.',
          mediaKey: 'eventDistrict',
        },
        {
          status: 'concept',
          time: 'Afternoon',
          title: 'Care Delivery Reimagined',
          track: 'Healthcare',
          trackId: 'healthcare',
          description:
            'Rethinking the patient journey, from first touch to follow-up.',
          mediaKey: 'eventCare',
        },
      ],
    },
    {
      id: 'tue',
      weekday: 'Tuesday',
      date: 'Feb 23',
      label: 'Tuesday, Feb 23',
      events: [
        {
          status: 'concept',
          time: 'Morning',
          title: 'AI & Health Frontiers',
          track: 'AI, Data & the Future',
          trackId: 'ai-data',
          description:
            'How AI and data are reshaping care — improving outcomes and driving efficiency.',
          mediaKey: 'eventAi',
          featured: true,
        },
        {
          status: 'concept',
          time: 'Afternoon',
          title: 'Securing the Connected Hospital',
          track: 'AI, Data & the Future',
          trackId: 'ai-data',
          description:
            'Protecting patients, data, and trust in an always-connected health system.',
          mediaKey: 'eventSecurity',
        },
        {
          status: 'concept',
          time: 'Late afternoon',
          title: 'Robotics in the Real World',
          track: 'AI, Data & the Future',
          trackId: 'ai-data',
          description:
            'Demonstrations of surgical, logistics, and rehabilitation robotics built in Florida.',
          mediaKey: 'eventRobotics',
        },
      ],
    },
    {
      id: 'wed',
      weekday: 'Wednesday',
      date: 'Feb 24',
      label: 'Wednesday, Feb 24',
      events: [
        {
          status: 'concept',
          time: 'Afternoon',
          title: 'Research Breakthroughs',
          track: 'Research & Discovery',
          trackId: 'research',
          description:
            'From lab to life — discover the latest breakthroughs and what’s next.',
          mediaKey: 'eventResearch',
          featured: true,
        },
        {
          status: 'concept',
          time: 'Morning',
          title: 'Bench to Bedside Sprints',
          track: 'Research & Discovery',
          trackId: 'research',
          description:
            'Translational teams share the discoveries closest to changing clinical practice.',
          mediaKey: 'eventBench',
        },
        {
          status: 'concept',
          time: 'Evening',
          title: 'Poster Night & Lab Crawl',
          track: 'Research & Discovery',
          trackId: 'research',
          description:
            'An evening walk through the district’s open labs, posters, and works-in-progress.',
          mediaKey: 'eventPosters',
        },
      ],
    },
    {
      id: 'thu',
      weekday: 'Thursday',
      date: 'Feb 25',
      label: 'Thursday, Feb 25',
      events: [
        {
          status: 'concept',
          time: 'Morning',
          title: 'Founders & Investors Forum',
          track: 'Startups, Capital & Growth',
          trackId: 'startups',
          description:
            'Founders, funds, and first customers — the capital ecosystem building what’s next.',
          mediaKey: 'eventFounders',
          featured: true,
        },
        {
          status: 'concept',
          time: 'Afternoon',
          title: 'Scaling Health Ventures',
          track: 'Startups, Capital & Growth',
          trackId: 'startups',
          description:
            'Operators who have scaled health companies share what actually worked.',
          mediaKey: 'eventScaling',
        },
        {
          status: 'concept',
          time: 'Evening',
          title: 'Investor Reverse Pitch',
          track: 'Startups, Capital & Growth',
          trackId: 'startups',
          description:
            'The tables turn — funds make the case for why they’re the right partner.',
          mediaKey: 'eventPitch',
        },
      ],
    },
    {
      id: 'fri',
      weekday: 'Friday',
      date: 'Feb 26',
      label: 'Friday, Feb 26',
      events: [
        {
          status: 'concept',
          time: 'Evening',
          title: 'Tampa Together Finale',
          track: 'Tampa & Community',
          trackId: 'community',
          description:
            'The whole district on the water — celebrating a week of ideas and the people moving them forward.',
          mediaKey: 'eventFinale',
          featured: true,
        },
        {
          status: 'concept',
          time: 'Morning',
          title: 'Workforce of What’s Next',
          track: 'Tampa & Community',
          trackId: 'community',
          description:
            'Building the talent pipeline the district runs on.',
          mediaKey: 'eventWorkforce',
        },
        {
          status: 'concept',
          time: 'Midday',
          title: 'Wellness on the Water',
          track: 'Healthcare',
          trackId: 'healthcare',
          description:
            'Community wellness programming — movement, mindfulness, and health along the river.',
          mediaKey: 'eventWellness',
        },
      ],
    },
  ] as DayItem[],
};

export const people = {
  eyebrow: 'Leaders Driving What’s Next',
  headline: ['People Moving', 'Momentum'],
  body: 'From visionary founders to world-class clinicians, researchers, and investors, the people behind TMRD Innovation Week are shaping a healthier, more innovative future.',
  cta: 'View All Speakers',
  announcement: 'Speaker announcements coming soon',
  /**
   * Speaker slots — no confirmed speakers yet. Each slot is image-ready:
   * when real speakers are announced, add name / role / org and drop a 4:5
   * portrait at the media path.
   */
  slots: [
    { status: 'concept' as ContentStatus, category: 'Clinical Innovation', mediaKey: 'speakerSlot1' as MediaKey },
    { status: 'concept' as ContentStatus, category: 'Research', mediaKey: 'speakerSlot2' as MediaKey },
    { status: 'concept' as ContentStatus, category: 'Entrepreneurship', mediaKey: 'speakerSlot3' as MediaKey },
    { status: 'concept' as ContentStatus, category: 'Technology', mediaKey: 'speakerSlot4' as MediaKey },
  ],
  partners: {
    status: 'concept' as ContentStatus,
    kicker: 'Stronger Together',
    body: 'Partner announcements coming soon.',
    /** Logo-ready slots — visible only in ?mediaDebug=1 until assets exist. */
    slotCount: 6,
  },
};

export const district = {
  eyebrow: 'At the Heart of Innovation',
  headline: ['One District.', 'Endless Connections.'],
  body: 'The Tampa Medical & Research District is where collaboration comes naturally. Hospitals, research institutions, startups, and communities are woven together—creating impact that extends far beyond the walls of any one organization.',
  cta: 'Explore Venues',
  disclaimer: 'Conceptual visualization — not to geographic scale.',
  mediaKey: 'districtAerial' as MediaKey,
  /** Node positions are percentages within the visualization frame (conceptual, not geographic). */
  venues: [
    {
      id: 'tgh',
      name: 'TGH Main Campus',
      body: 'Leading patient care, research, and innovation.',
      x: 26,
      y: 66,
    },
    {
      id: 'usf',
      name: 'USF Health',
      body: 'Academic excellence driving the future of health.',
      x: 46,
      y: 30,
    },
    {
      id: 'moffitt',
      name: 'Moffitt Cancer Center',
      body: 'World-class cancer research and treatment.',
      x: 68,
      y: 48,
    },
    {
      id: 'water-street',
      name: 'Water Street / Sparkman Wharf',
      body: 'Where innovation meets community and culture.',
      x: 55,
      y: 78,
    },
  ],
};

export interface PassItem {
  id: string;
  name: string;
  earlyBird: number;
  standard: number;
  summary: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const passes = {
  eyebrow: 'Multiple Ways to Participate',
  headline: ['Passes That', 'Move You Forward.'],
  body: 'Whether you’re here to learn, connect, or lead, there’s a pass that meets you where you are and takes you further.',
  items: [
    {
      id: 'general',
      name: 'General Pass',
      earlyBird: 129,
      standard: 159,
      summary:
        'Access to all five tracks and standard programming. Excludes flagship events.',
      features: [
        'All five tracks',
        'Standard programming all week',
        'District expo & showcases',
      ],
    },
    {
      id: 'track',
      name: 'Track Pass',
      earlyBird: 69,
      standard: 89,
      summary:
        'Access to one track’s sessions only. Excludes flagship events.',
      features: [
        'One focused track',
        'Track sessions & workshops',
        'District expo & showcases',
      ],
    },
    {
      id: 'all-access',
      name: 'All Access Pass',
      earlyBird: 199,
      standard: 269,
      summary:
        'Access to all five tracks plus flagship events, networking, opening, and closing programming.',
      features: [
        'All five tracks',
        'Flagship opening & closing events',
        'Networking programming',
      ],
      highlighted: true,
      badge: 'All Access',
    },
  ] as PassItem[],
};

export const finalCta = {
  eyebrow: 'Five Days. Five Tracks. One District.',
  headline: ['Be Part of', 'What’s Next.'],
  body: 'Five days of ideas, connection, and innovation that move Tampa—and each other—forward.',
  primaryCta: 'Buy Tickets',
  secondaryCta: 'Explore Schedule',
};

export const footer = {
  blurb:
    'TMRD Innovation Week is a district-wide festival bringing together care, research, technology, capital, and community.',
  tmrdLinkLabel: 'Visit the TMRD website',
  columns: [
    {
      title: 'Event',
      links: ['About', 'Tracks', 'Schedule', 'Speakers', 'Innovation District', 'News & Updates'],
    },
    {
      title: 'Attend',
      links: ['Passes & Pricing', 'Why Attend', 'Visitor Information', 'Travel & Hotels', 'Accessibility', 'FAQ'],
    },
    {
      title: 'Connect',
      links: ['Partners', 'Exhibitors', 'Sponsors', 'Volunteer', 'Media Inquiries', 'Contact Us'],
    },
    {
      title: 'Resources',
      links: ['Session Library', 'Event Guide', 'For Startups', 'For Researchers', 'For Investors', 'Community Impact'],
    },
  ],
  newsletter: {
    title: 'Stay in the Know',
    body: 'Get the latest updates, speaker announcements, and event news delivered to your inbox.',
    placeholder: 'Enter your email',
    cta: 'Subscribe',
    success: 'You’re on the list. See you in February.',
    error: 'Please enter a valid email address.',
  },
  social: ['LinkedIn', 'X', 'Instagram', 'YouTube'],
  legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Site Map'],
  copyright: '© 2027 TMRD Innovation Week',
};

export { media };
