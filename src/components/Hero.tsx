import { useLayoutEffect, useRef } from 'react';
import { hero, site } from '../data/site';
import { gsap } from '../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion-utils';
import { scrollToId } from '../lib/scroll';
import { ConnectionArcs } from './motion/ConnectionArcs';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Opening sequence: darkness → light → type → skyline → strap.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero__wash', { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0)
        .fromTo(
          '.hero__img-wrap',
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1, duration: 2.6, ease: 'power2.out' },
          0.35,
        )
        .fromTo('.hero__eyebrow', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.55)
        // headline words handled by RevealText (delay 0.8)
        .fromTo('.hero__subhead', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.55)
        .fromTo('.hero__supporting', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.75)
        .fromTo('.hero__actions', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.95)
        .fromTo(
          '.hero__strap-item',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.14 },
          2.35,
        );

      // Camera-like drift on scroll: image sinks slower than the page.
      gsap.to('.hero__img', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__content', {
        yPercent: -8,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root, start: '30% top', end: 'bottom top', scrub: true },
      });

      // Pointer parallax: skyline and wash lean gently away from the cursor.
      if (hasFinePointer()) {
        const imgX = gsap.quickTo('.hero__img', 'x', { duration: 1.4, ease: 'power3.out' });
        const imgY = gsap.quickTo('.hero__img', 'y', { duration: 1.4, ease: 'power3.out' });
        const washX = gsap.quickTo('.hero__wash', 'x', { duration: 1.8, ease: 'power3.out' });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          imgX(nx * -14);
          imgY(ny * -8);
          washX(nx * 22);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={ref} aria-label="TMRD Innovation Week">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__img-wrap">
          <img
            className="hero__img"
            src={hero.image}
            alt=""
            width={2400}
            height={1400}
          />
        </div>
        <div className="hero__wash" />
        <ConnectionArcs className="hero__arcs" drawOnMount delay={1.2} />
      </div>

      <div className="container hero__content">
        <p className="eyebrow hero__eyebrow">{site.eyebrowDate}</p>
        <RevealText
          as="h1"
          className="hero__title"
          lines={hero.headline}
          gradientLine={1}
          trigger="load"
          delay={0.8}
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

      <div className="hero__strap" aria-label="Five days, five tracks, one district">
        {site.strap.map((item) => (
          <span className="hero__strap-item" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
