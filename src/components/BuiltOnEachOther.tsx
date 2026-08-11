import { useLayoutEffect } from 'react';
import { pillars } from '../data/site';
import { gsap } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion-utils';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { RevealText } from './motion/RevealText';

export function BuiltOnEachOther() {
  const ref = useReveal<HTMLElement>();
  usePointerGlow(ref);

  // A single pulse of light travels the connective line behind the four
  // pillars the first time the grid enters the viewport.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pillars__pulse-dot',
        { left: '-4%', opacity: 0 },
        {
          left: '104%',
          opacity: 1,
          duration: 2.6,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.pillars', start: 'top 70%', once: true },
          onComplete: () => {
            gsap.to('.pillars__pulse-dot', { opacity: 0, duration: 0.8 });
          },
        },
      );
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section built" id="about" ref={ref}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{pillars.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={[pillars.headline]} />
          <p className="lead" data-reveal="1">{pillars.body}</p>
        </div>

        <div className="pillars">
          <div className="pillars__pulse" aria-hidden="true">
            <span className="pillars__pulse-dot" />
          </div>
          {pillars.cards.map((card, i) => (
            <article
              className={`pillar glow-card accent-${card.accent}`}
              data-reveal={i}
              key={card.title}
            >
              <h3 className="pillar__title">{card.title}</h3>
              <p className="pillar__body">{card.body}</p>
              <div className="pillar__window" data-window>
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  loading="lazy"
                  width={1000}
                  height={1000}
                  data-reveal-img
                />
                <div className="pillar__window-glow" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <p className="built__footnote" data-reveal="0">{pillars.footnote}</p>
      </div>
    </section>
  );
}
