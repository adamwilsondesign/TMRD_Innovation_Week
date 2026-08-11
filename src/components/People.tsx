import { people } from '../data/site';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

export function People() {
  const ref = useReveal<HTMLElement>();
  usePointerGlow(ref);

  return (
    <section className="section people" id="speakers" ref={ref}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{people.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={people.headline} gradientLine={1} />
          <p className="lead" data-reveal="1">{people.body}</p>
        </div>

        <div className="speakers">
          {people.speakers.map((speaker, i) => (
            <article
              className={`speaker glow-card accent-${speaker.accent}`}
              data-reveal={i}
              key={speaker.name}
            >
              <div className="speaker__portrait">
                <img
                  src={speaker.image}
                  alt={`Placeholder portrait artwork for ${speaker.name}`}
                  loading="lazy"
                  width={900}
                  height={1200}
                  data-reveal-img
                />
                <span className="speaker__initials" aria-hidden="true">
                  {speaker.initials}
                </span>
                <span className="speaker__edge" aria-hidden="true" />
              </div>
              <h3 className="speaker__name">{speaker.name}</h3>
              <p className="speaker__role">{speaker.role}</p>
              <p className="speaker__org">{speaker.org}</p>
            </article>
          ))}
        </div>

        <div className="partners" data-reveal="0">
          <div className="partners__kicker">
            {people.partnersKicker.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <p className="partners__body">{people.partnersBody}</p>
          <ul className="partners__list" aria-label="Partners">
            {people.partners.map((partner) => (
              <li className="partners__mark" key={partner}>
                {partner}
              </li>
            ))}
          </ul>
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
