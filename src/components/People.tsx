import { media, people } from '../data/site';
import { mediaDebugEnabled, MediaFrame } from './media/MediaFrame';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

/**
 * No speakers are confirmed yet — this section renders image-ready
 * announcement slots. When speakers are announced, extend the slot data in
 * src/data/site.ts with name/role/org and drop 4:5 portraits at the media
 * manifest paths.
 */
export function People() {
  const ref = useReveal<HTMLElement>();
  usePointerGlow(ref);
  const debug = mediaDebugEnabled();

  return (
    <section className="section people" id="speakers" ref={ref} data-atmosphere="people">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{people.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={people.headline} gradientLine={1} />
          <p className="lead" data-reveal="1">{people.body}</p>
        </div>

        <div className="speakers">
          {people.slots.map((slot, i) => (
            <article
              className={`speaker glow-card accent-${media[slot.mediaKey].accent}`}
              data-reveal={i}
              key={slot.mediaKey}
            >
              <div className="speaker__portrait" data-mask-y>
                <MediaFrame entry={media[slot.mediaKey]} fill overlay="strong" />
                <div className="speaker__caption">
                  <p className="speaker__category">{slot.category}</p>
                  <p className="speaker__announce">{people.announcement}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="partners" data-reveal="0">
          <div className="partners__kicker-block">
            <span className="partners__kicker">{people.partners.kicker}</span>
            <p className="partners__body">{people.partners.body}</p>
          </div>
          {debug ? (
            <ul className="partners__slots" aria-label="Partner logo slots (debug)">
              {Array.from({ length: people.partners.slotCount }, (_, i) => (
                <li className="partners__slot" key={i}>
                  <span>partner-{String(i + 1).padStart(2, '0')}.svg</span>
                  <span>320 × 120 · monochrome</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="partners__rule" aria-hidden="true" />
          )}
          <div className="partners__cta">
            <MagneticButton variant="ghost" href="#speakers">
              {people.cta}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
