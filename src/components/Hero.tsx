import { useLayoutEffect, useRef } from 'react';
import { hero, media, site } from '../data/site';
import { gsap } from '../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion-utils';
import { scrollToId } from '../lib/scroll';
import { MediaFrame } from './media/MediaFrame';
import { ConnectionArcs } from './motion/ConnectionArcs';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Load sequence: nav → eyebrow → headline (RevealText) → copy → CTAs.
      // Total choreography lands ~1.6s; nothing blocks reading.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.header', { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
        .fromTo('.hero__media', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: 'power2.out' }, 0.15)
        .fromTo('.hero__eyebrow', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3)
        // headline words reveal via RevealText (delay 0.45)
        .fromTo('.hero__subhead', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.95)
        .fromTo('.hero__supporting', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.1)
        .fromTo('.hero__actions', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.25)
        .fromTo(
          '.hero__strap-item',
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          1.4,
        );

      // Gentle depth on scroll — media sinks slightly slower than the page.
      gsap.to('.hero__media-inner', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Restrained pointer response on the media light only.
      if (hasFinePointer()) {
        const x = gsap.quickTo('.hero__media-light', 'x', { duration: 1.6, ease: 'power3.out' });
        const y = gsap.quickTo('.hero__media-light', 'y', { duration: 1.6, ease: 'power3.out' });
        const onMove = (e: PointerEvent) => {
          x((e.clientX / window.innerWidth - 0.5) * 60);
          y((e.clientY / window.innerHeight - 0.5) * 40);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={ref} aria-label="TMRD Innovation Week">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">{site.eyebrowDate}</p>
          <RevealText
            as="h1"
            className="hero__title"
            lines={hero.headline}
            gradientLine={1}
            trigger="load"
            delay={0.45}
          />
          <p className="hero__subhead">{hero.subhead}</p>
          <p className="hero__supporting">{hero.supporting}</p>
          <div className="hero__actions">
            <MagneticButton onClick={() => scrollToId('tickets')}>
              {hero.primaryCta}
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollToId('schedule')}>
              {hero.secondaryCta}
            </MagneticButton>
          </div>
        </div>

        <div className="hero__media" aria-hidden="false">
          <div className="hero__media-inner">
            <MediaFrame entry={media.heroDesktop} fill priority className="hero__frame" />
            <div className="hero__media-light" aria-hidden="true" />
            <ConnectionArcs className="hero__arcs" drawOnMount delay={0.9} />
            <div className="hero__media-reflection" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="hero__strap" aria-label="Five days, five tracks, one district">
        <div className="container hero__strap-inner">
          {site.strap.map((item) => (
            <span className="hero__strap-item" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
