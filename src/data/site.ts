/**
 * Central demo content for TMRD Innovation Week.
 * Every string, price, profile, event, and image path on the page lives here
 * so real content can be swapped in without touching components.
 *
 * All imagery is procedurally generated (see scripts/generate-assets.mjs) and
 * lives in /public/images. Replace any path below with a real photograph of
 * the same aspect ratio and the layout will not shift.
 */

export const img = (name: string) => `/images/${name}.jpg`;

export const site = {
  name: 'TMRD Innovation Week',
  poweredBy: 'Tampa General Hospital',
  dates: 'February 22–26, 2027',
  location: 'Tampa, FL',
  eyebrowDate: 'FEBRUARY 22–26, 2027 · TAMPA, FL',
  strap: ['Five Days', 'Five Tracks', 'One District'],
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
  image: img('hero-skyline'),
  imageAlt:
    'Night view of a waterfront innovation district, towers lit in green and blue reflecting over dark water',
};

export const pillars = {
  eyebrow: 'The Power of the District',
  headline: 'Built on Each Other',
  body: 'TMRD is where world-class care, research, startups, and community converge—advancing discoveries and delivering impact, together.',
  footnote:
    'Five tracks. One week. TGH Innovation Week happens all week alongside the community.',
  cards: [
    {
      title: 'Collaborative Ecosystem',
      body: 'Bringing together leading institutions, startups, and community partners to solve complex challenges.',
      image: img('pillar-collaboration'),
      imageAlt: 'Threads of green light converging toward a single bright meeting point',
      accent: 'green' as const,
    },
    {
      title: 'Accelerating Innovation',
      body: 'Fueling bold ideas with resources, talent, and data to move breakthroughs from concept to care.',
      image: img('pillar-acceleration'),
      imageAlt: 'Streaks of blue light accelerating upward through darkness',
      accent: 'blue' as const,
    },
    {
      title: 'Translational Excellence',
      body: 'Turning research into real-world solutions that improve health and transform lives.',
      image: img('pillar-translation'),
      imageAlt: 'A luminous pulse waveform travelling from left to right through deep blue haze',
      accent: 'green' as const,
    },
    {
      title: 'Tampa’s Innovation Momentum',
      body: 'A global destination—rooted in a vibrant community and driven by what’s next.',
      image: img('pillar-momentum'),
      imageAlt: 'A dark skyline silhouette washed in teal light rising over calm water',
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
      body: 'Advancing clinical innovation, patient experience, and the future of care delivery.',
      image: img('track-healthcare'),
      imageAlt: 'A soft green cardiac waveform glowing through darkness',
      accent: 'green' as TrackAccent,
      wide: false,
    },
    {
      id: 'ai-data',
      title: 'AI, Data & the Future',
      body: 'Applied AI, machine learning, data systems, cybersecurity, robotics, and emerging technology.',
      image: img('track-ai'),
      imageAlt: 'A luminous blue lattice of connected data nodes receding into space',
      accent: 'blue' as TrackAccent,
      wide: false,
    },
    {
      id: 'research',
      title: 'Research & Discovery',
      body: 'Academic and translational research, from bench to bedside.',
      image: img('track-research'),
      imageAlt: 'Molecular rings of green and blue light orbiting in dark space',
      accent: 'green' as TrackAccent,
      wide: false,
    },
    {
      id: 'startups',
      title: 'Startups, Capital & Growth',
      body: 'Founders, investors, commercialization, and the capital ecosystem building what’s next.',
      image: img('track-startups'),
      imageAlt: 'Columns of light rising like a skyline chart in blue and green',
      accent: 'blue' as TrackAccent,
      wide: true,
    },
    {
      id: 'community',
      title: 'Tampa & Community',
      body: 'Culture, civic partnership, placemaking, workforce, wellness, and community-facing programming.',
      image: img('track-community'),
      imageAlt: 'Warm bokeh city lights along a waterfront promenade at night',
      accent: 'green' as TrackAccent,
      wide: true,
    },
  ],
  tgh: {
    kicker: 'TGH Innovation Week',
    audience: 'For TGH Team Members',
    body: 'TGH Innovation Week runs alongside all five community-facing tracks. TGH team members have access to public programming plus TGH-only events.',
    cta: 'Learn More',
  },
};

export interface EventItem {
  time: string;
  title: string;
  track: string;
  trackId: string;
  venue: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface DayItem {
  id: string;
  weekday: string;
  short: string;
  date: string;
  label: string;
  events: EventItem[];
}

/** February 2027: the 22nd is a Monday. */
export const schedule = {
  eyebrow: 'Five Days of Momentum',
  headline: ['Week at', 'a Glance'],
  body: 'Five days. Five tracks. Dozens of ways to learn, connect, and move what’s next forward.',
  cta: 'View Full Schedule',
  footnote: 'More speakers. More sessions. More reasons to be part of what’s next.',
  days: [
    {
      id: 'mon',
      weekday: 'Monday',
      short: 'Mon',
      date: 'Feb 22',
      label: 'Monday, Feb 22',
      events: [
        {
          time: '6:00 PM – 9:00 PM',
          title: 'Opening Night: A Movement Starts Here',
          track: 'Tampa & Community',
          trackId: 'community',
          venue: 'Sparkman Wharf',
          description:
            'Kick off the week with inspiration, connection, and a bold look at what’s ahead for the district.',
          image: img('event-opening'),
          imageAlt: 'Warm festival bokeh lights over a waterfront gathering at dusk',
          featured: true,
        },
        {
          time: '9:00 AM – 10:30 AM',
          title: 'State of the District',
          track: 'Tampa & Community',
          trackId: 'community',
          venue: 'TGH Main Campus',
          description:
            'District leaders map the year ahead—capital projects, partnerships, and the momentum behind them.',
          image: img('event-district'),
          imageAlt: 'An aerial night view of glowing city blocks beside dark water',
        },
        {
          time: '1:00 PM – 4:00 PM',
          title: 'Care Delivery Reimagined',
          track: 'Healthcare',
          trackId: 'healthcare',
          venue: 'USF Health CAMLS',
          description:
            'Clinicians and designers rethink the patient journey, from first touch to follow-up.',
          image: img('event-care'),
          imageAlt: 'A calm green pulse of light moving through a dark clinical space',
        },
      ],
    },
    {
      id: 'tue',
      weekday: 'Tuesday',
      short: 'Tue',
      date: 'Feb 23',
      label: 'Tuesday, Feb 23',
      events: [
        {
          time: '9:45 AM – 12:00 PM',
          title: 'AI & Health Frontiers',
          track: 'AI, Data & the Future',
          trackId: 'ai-data',
          venue: 'Water Street Stage',
          description:
            'Explore how AI and data are reshaping care—improving outcomes, and driving efficiency.',
          image: img('event-ai'),
          imageAlt: 'Blue neural pathways of light branching across a dark field',
          featured: true,
        },
        {
          time: '1:30 PM – 3:00 PM',
          title: 'Securing the Connected Hospital',
          track: 'AI, Data & the Future',
          trackId: 'ai-data',
          venue: 'Embarc Collective',
          description:
            'Cybersecurity leaders on protecting patients, data, and trust in an always-connected system.',
          image: img('event-security'),
          imageAlt: 'A lattice of blue light forming a protective grid in darkness',
        },
        {
          time: '4:00 PM – 6:00 PM',
          title: 'Robotics in the Real World',
          track: 'AI, Data & the Future',
          trackId: 'ai-data',
          venue: 'USF Research Park',
          description:
            'Live demonstrations of surgical, logistics, and rehabilitation robotics built in Florida.',
          image: img('event-robotics'),
          imageAlt: 'Precise arcs of cool light tracing mechanical motion paths',
        },
      ],
    },
    {
      id: 'wed',
      weekday: 'Wednesday',
      short: 'Wed',
      date: 'Feb 24',
      label: 'Wednesday, Feb 24',
      events: [
        {
          time: '1:00 PM – 4:00 PM',
          title: 'Research Breakthroughs',
          track: 'Research & Discovery',
          trackId: 'research',
          venue: 'Moffitt McKinley Campus',
          description:
            'From lab to life—discover the latest breakthroughs and what’s next.',
          image: img('event-research'),
          imageAlt: 'Green and blue molecular rings glowing against deep black',
          featured: true,
        },
        {
          time: '9:00 AM – 11:30 AM',
          title: 'Bench to Bedside Sprints',
          track: 'Research & Discovery',
          trackId: 'research',
          venue: 'USF Health',
          description:
            'Translational teams pitch the discoveries closest to changing clinical practice.',
          image: img('event-bench'),
          imageAlt: 'A pulse of green light crossing from a dark left field into blue',
        },
        {
          time: '5:30 PM – 7:30 PM',
          title: 'Poster Night & Lab Crawl',
          track: 'Research & Discovery',
          trackId: 'research',
          venue: 'District-wide',
          description:
            'An evening walk through the district’s open labs, posters, and works-in-progress.',
          image: img('event-posters'),
          imageAlt: 'Soft luminous panels of teal light receding down a dark corridor',
        },
      ],
    },
    {
      id: 'thu',
      weekday: 'Thursday',
      short: 'Thu',
      date: 'Feb 25',
      label: 'Thursday, Feb 25',
      events: [
        {
          time: '10:00 AM – 1:00 PM',
          title: 'Founders & Investors Forum',
          track: 'Startups, Capital & Growth',
          trackId: 'startups',
          venue: 'Embarc Collective',
          description:
            'Founders, funds, and first customers—the capital ecosystem building what’s next, in one room.',
          image: img('event-founders'),
          imageAlt: 'Rising columns of blue and green light like a growth chart',
          featured: true,
        },
        {
          time: '2:00 PM – 4:00 PM',
          title: 'Scaling Health Ventures',
          track: 'Startups, Capital & Growth',
          trackId: 'startups',
          venue: 'Water Street Stage',
          description:
            'Operators who have scaled health companies share what actually worked.',
          image: img('event-scaling'),
          imageAlt: 'Accelerating streaks of light sweeping upward through darkness',
        },
        {
          time: '6:00 PM – 8:00 PM',
          title: 'Investor Reverse Pitch',
          track: 'Startups, Capital & Growth',
          trackId: 'startups',
          venue: 'Sparkman Wharf',
          description:
            'The tables turn—funds pitch founders on why they’re the right partner.',
          image: img('event-pitch'),
          imageAlt: 'Two beams of green and blue light meeting at center stage',
        },
      ],
    },
    {
      id: 'fri',
      weekday: 'Friday',
      short: 'Fri',
      date: 'Feb 26',
      label: 'Friday, Feb 26',
      events: [
        {
          time: '5:00 PM – 9:00 PM',
          title: 'Tampa Together Finale',
          track: 'Tampa & Community',
          trackId: 'community',
          venue: 'Riverwalk',
          description:
            'The whole district on the water—celebrating a week of ideas and the people moving them forward.',
          image: img('event-finale'),
          imageAlt: 'A wide waterfront of warm and teal lights reflected across dark water',
          featured: true,
        },
        {
          time: '9:30 AM – 11:00 AM',
          title: 'Workforce of What’s Next',
          track: 'Tampa & Community',
          trackId: 'community',
          venue: 'TGH Main Campus',
          description:
            'Educators and employers on building the talent pipeline the district runs on.',
          image: img('event-workforce'),
          imageAlt: 'Parallel paths of light converging toward a shared horizon',
        },
        {
          time: '12:00 PM – 2:00 PM',
          title: 'Wellness on the Water',
          track: 'Healthcare',
          trackId: 'healthcare',
          venue: 'Riverwalk',
          description:
            'Community wellness programming—movement, mindfulness, and health checks along the river.',
          image: img('event-wellness'),
          imageAlt: 'Gentle green light rippling like water in a calm dark scene',
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
  partnersKicker: ['Built Together.', 'Stronger Together.'],
  partnersBody:
    'Proud to partner with the leading organizations advancing health, innovation, and community.',
  /**
   * Demo speaker profiles — replaceable placeholder people, not real
   * individuals. `image` points at a generated luminous field; drop a real
   * portrait (3:4 crop) at the same path to replace it.
   */
  speakers: [
    {
      name: 'Dr. Maya Chen',
      role: 'Chief Innovation Officer',
      org: 'Tampa General Hospital',
      initials: 'MC',
      image: img('portrait-1'),
      accent: 'green' as const,
    },
    {
      name: 'Andre Wallace',
      role: 'Founder & CEO',
      org: 'Harbor Health AI',
      initials: 'AW',
      image: img('portrait-2'),
      accent: 'blue' as const,
    },
    {
      name: 'Sofia Ramirez',
      role: 'Professor of Medicine',
      org: 'USF Health',
      initials: 'SR',
      image: img('portrait-3'),
      accent: 'green' as const,
    },
    {
      name: 'Jordan Ellis',
      role: 'Managing Partner',
      org: 'Gulf Coast Ventures',
      initials: 'JE',
      image: img('portrait-4'),
      accent: 'blue' as const,
    },
  ],
  /** Rendered as refined text wordmarks — official logo files are not bundled. */
  partners: [
    'USF Health',
    'Moffitt Cancer Center',
    'University of South Florida',
    'Jabil',
    'Synapse Florida',
    'GuideWell Innovation',
    'Embarc Collective',
  ],
};

export const district = {
  eyebrow: 'At the Heart of Innovation',
  headline: ['One District.', 'Endless Connections.'],
  body: 'The Tampa Medical & Research District is where collaboration comes naturally. Hospitals, research institutions, startups, and communities are woven together—creating impact that extends far beyond the walls of any one organization.',
  cta: 'Explore Venues',
  disclaimer: 'Conceptual district visualization — not to geographic scale.',
  image: img('district-aerial'),
  imageAlt:
    'Conceptual night aerial of an innovation district: glowing blocks and streets beside dark water',
  /** Node positions are percentages within the visualization frame. */
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
  tagline: string;
  earlyBird: number;
  standard: number;
  features: string[];
  excludes?: string;
  highlighted?: boolean;
  badge?: string;
}

export const passes = {
  eyebrow: 'Multiple Ways to Participate',
  headline: ['Passes That', 'Move You Forward.'],
  body: 'Whether you’re here to learn, connect, or lead, there’s a pass that meets you where you are and takes you further.',
  earlyBirdNote: 'Early-bird pricing shown — available for a limited release of passes.',
  items: [
    {
      id: 'general',
      name: 'General Pass',
      tagline: 'Go deeper across the whole week.',
      earlyBird: 129,
      standard: 159,
      features: [
        'Access to all five tracks',
        'Standard programming all week',
        'District expo & showcases',
        'On-demand session replays',
      ],
      excludes: 'Excludes flagship events.',
    },
    {
      id: 'track',
      name: 'Track Pass',
      tagline: 'Your pass to the track that drives you forward.',
      earlyBird: 69,
      standard: 89,
      features: [
        'Access to one focused track',
        'Track-specific sessions & workshops',
        'District expo & showcases',
        'Curated track networking',
      ],
      excludes: 'Excludes flagship events.',
    },
    {
      id: 'all-access',
      name: 'All-Access Pass',
      tagline: 'The complete experience. All tracks. All access.',
      earlyBird: 199,
      standard: 269,
      features: [
        'Access to all five tracks',
        'Flagship opening & closing events',
        'Exclusive networking experiences',
        'Priority seating at keynotes',
        'On-demand session replays',
      ],
      highlighted: true,
      badge: 'Most Complete',
    },
  ] as PassItem[],
  footnote: 'Secure checkout at launch. Instant confirmation. Refunds available up to February 1, 2027.',
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
    'A district-wide ecosystem festival that makes the world feel Tampa’s innovation momentum. February 22–26, 2027.',
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
    body: 'Get the latest updates, speaker announcements, and exclusive access—delivered to your inbox.',
    placeholder: 'Enter your email',
    cta: 'Subscribe',
    success: 'You’re on the list. See you in February.',
    error: 'Please enter a valid email address.',
  },
  social: ['LinkedIn', 'X', 'Instagram', 'YouTube'],
  legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Site Map'],
  copyright: '© 2027 TMRD Innovation Week. All rights reserved.',
};
