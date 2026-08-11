import { media, tracks } from '../data/site';
import { scrollToId } from '../lib/scroll';
import { nudgeAtmosphere } from '../lib/atmosphere';
import { hasFinePointer } from '../lib/motion-utils';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { MediaFrame } from './media/MediaFrame';
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
    <section className="section tracks" id="tracks" ref={ref} data-atmosphere="tracks">
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
              onMouseEnter={() => {
                if (!hasFinePointer()) return;
                // the section's ambient field leans toward the hovered track
                nudgeAtmosphere(
                  track.accent === 'green'
                    ? { gx: 0.28 + (i % 3) * 0.2, gy: 0.55, ga: 0.22 }
                    : { bx: 0.3 + (i % 3) * 0.2, by: 0.5, ba: 0.24 },
                );
              }}
            >
              <MediaFrame
                entry={media[track.mediaKey]}
                fill
                overlay="strong"
                className="track__media"
              />
              <div className="track__bloom" aria-hidden="true" />
              <div className="track__body">
                <h3 className="track__title">{track.title}</h3>
                <p className="track__desc">{track.body}</p>
                <Arrow />
              </div>
            </a>
          ))}
        </div>

        <aside className="tgh-banner" data-reveal="0" aria-label="TGH Innovation Week">
          <div className="tgh-banner__rule" aria-hidden="true" />
          <div className="tgh-banner__grid">
            <div className="tgh-banner__brand" data-reveal="1" data-reveal-from="left">
              <span className="tgh-banner__kicker">{tracks.tgh.kicker}</span>
              <span className="tgh-banner__audience">{tracks.tgh.audience}</span>
            </div>
            <div className="tgh-banner__copy" data-reveal="2" data-reveal-from="right">
              <p className="tgh-banner__lead">{tracks.tgh.lead}</p>
              <p className="tgh-banner__body">{tracks.tgh.body}</p>
            </div>
            <a
              className="btn btn--tgh"
              data-reveal="4"
              href="#tickets"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('tickets');
              }}
            >
              <span className="btn__label">{tracks.tgh.cta}</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
