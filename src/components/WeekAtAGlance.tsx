import { useEffect, useRef, useState } from 'react';
import { media, schedule, tracks } from '../data/site';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { MediaFrame } from './media/MediaFrame';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

const trackAccent = (trackId: string) =>
  tracks.items.find((t) => t.id === trackId)?.accent ?? 'green';

export function WeekAtAGlance() {
  const ref = useReveal<HTMLElement>();
  usePointerGlow(ref);

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0); // the day currently rendered
  const [stage, setStage] = useState<'in' | 'out'>('in');
  const dirRef = useRef(1);
  const tablistRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>();

  const select = (i: number) => {
    if (i === active) return;
    dirRef.current = i > active ? 1 : -1;
    setActive(i);
  };

  // Restrained two-stage swap: fade the old panel out, stagger the new in.
  useEffect(() => {
    if (active === shown) return;
    setStage('out');
    timer.current = window.setTimeout(() => {
      setShown(active);
      setStage('in');
    }, 240);
    return () => window.clearTimeout(timer.current);
  }, [active, shown]);

  // The gradient underline follows the active date, and the panel's
  // descending light stays connected to it.
  useEffect(() => {
    const tablist = tablistRef.current;
    const glowEl = glowRef.current;
    const panel = panelRef.current;
    if (!tablist || !glowEl) return;
    const position = () => {
      const tab = tablist.querySelectorAll<HTMLElement>('[role="tab"]')[active];
      if (!tab) return;
      glowEl.style.transform = `translateX(${tab.offsetLeft}px)`;
      glowEl.style.width = `${tab.offsetWidth}px`;
      panel?.style.setProperty('--tab-x', `${tab.offsetLeft}px`);
      panel?.style.setProperty('--tab-w', `${tab.offsetWidth}px`);
    };
    position();
    window.addEventListener('resize', position);
    return () => window.removeEventListener('resize', position);
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = schedule.days.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tablistRef.current
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus();
  };

  const day = schedule.days[shown];

  return (
    <section className="section week" id="schedule" ref={ref} data-atmosphere="week">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{schedule.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={schedule.headline} gradientLine={1} />
          <p className="lead" data-reveal="1">{schedule.body}</p>
        </div>

        <div className="week__tabs-wrap" data-reveal="0">
          <div
            className="week__tabs"
            role="tablist"
            aria-label="Event days"
            ref={tablistRef}
            onKeyDown={onKeyDown}
          >
            {schedule.days.map((d, i) => (
              <button
                key={d.id}
                role="tab"
                id={`day-tab-${d.id}`}
                aria-selected={i === active}
                aria-controls="day-panel"
                tabIndex={i === active ? 0 : -1}
                className="week__tab"
                onClick={() => select(i)}
              >
                <span className="week__tab-day">{d.weekday}</span>
                <span className="week__tab-date">{d.date}</span>
              </button>
            ))}
            <span className="week__tab-glow" ref={glowRef} aria-hidden="true" />
          </div>
        </div>

        <div
          id="day-panel"
          role="tabpanel"
          aria-labelledby={`day-tab-${schedule.days[active].id}`}
          className="week__panel"
          ref={panelRef}
        >
          <p className="visually-hidden" role="status">
            Showing {day.label}: {day.events.length} events
          </p>
          <div
            className="week__events"
            data-stage={stage}
            style={{ '--dir': dirRef.current } as React.CSSProperties}
            key={day.id}
          >
            {day.events.map((event, i) => (
              <article
                className={`event glow-card accent-${trackAccent(event.trackId)}${event.featured ? ' event--featured' : ''}`}
                style={{ '--i': i } as React.CSSProperties}
                key={event.title}
              >
                <div className="event__media">
                  <MediaFrame entry={media[event.mediaKey]} fill />
                  {event.featured && <span className="event__flag">Featured</span>}
                </div>
                <div className="event__body">
                  <p className="event__meta">
                    {day.label} · {event.time}
                  </p>
                  <h3 className="event__title">{event.title}</h3>
                  <p className="event__track">
                    <span className="event__track-dot" aria-hidden="true" />
                    {event.track}
                  </p>
                  <p className="event__desc">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="week__foot" data-reveal="0">
          <MagneticButton variant="ghost" href="#schedule">
            {schedule.cta}
          </MagneticButton>
          <p className="week__footnote">
            Concept programming shown — the full schedule will be announced.
          </p>
        </div>
      </div>
    </section>
  );
}
