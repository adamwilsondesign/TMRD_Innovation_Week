import { tracks } from '../data/site';
import { scrollToId } from '../lib/scroll';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { RevealText } from './motion/RevealText';

function Arrow() {
  return (
    <span className="track__arrow" aria-hidden="true">
      <svg viewBox="0 0 44 12" fill="none">
        <path d="M0 6h40M35 1l6 5-6 5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

export function Tracks() {
  const ref = useReveal<HTMLElement>();
  usePointerGlow(ref);

  return (
    <section className="section tracks" id="tracks" ref={ref}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{tracks.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={tracks.headline} gradientLine={1} />
          <p className="lead" data-reveal="1">{tracks.body}</p>
        </div>

        <div className="tracks__grid">
          {tracks.items.map((track, i) => (
            <a
              key={track.id}
              className={`track glow-card accent-${track.accent}${track.wide ? ' track--wide' : ''}`}
              href="#schedule"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('schedule');
              }}
              data-reveal={i % 3}
              aria-label={`${track.title} — see the schedule`}
            >
              <div className="track__media" aria-hidden="true">
                <img
                  src={track.image}
                  alt=""
                  loading="lazy"
                  width={track.wide ? 2000 : 1600}
                  height={1000}
                />
                <div className="track__scrim" />
                <div className="track__bloom" />
              </div>
              <div className="track__body">
                <h3 className="track__title">{track.title}</h3>
                <p className="track__desc">{track.body}</p>
                <Arrow />
              </div>
            </a>
          ))}
        </div>

        <aside className="tgh-banner" data-reveal="0" aria-label="TGH Innovation Week">
          <div className="tgh-banner__brand">
            <span className="tgh-banner__kicker">{tracks.tgh.kicker}</span>
            <span className="tgh-banner__audience">{tracks.tgh.audience}</span>
          </div>
          <p className="tgh-banner__body">{tracks.tgh.body}</p>
          <a
            className="btn btn--tgh"
            href="#tickets"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('tickets');
            }}
          >
            <span className="btn__label">{tracks.tgh.cta}</span>
            <Arrow />
          </a>
        </aside>
      </div>
    </section>
  );
}
