import { useLayoutEffect } from 'react';
import { finalCta } from '../data/site';
import { gsap } from '../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion-utils';
import { useReveal } from '../lib/useReveal';
import { scrollToId } from '../lib/scroll';
import { ConnectionArcs } from './motion/ConnectionArcs';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

export function FinalCTA() {
  const ref = useReveal<HTMLElement>();

  // The big light fields drift very slowly toward the pointer (≤16px);
  // the type never moves.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !hasFinePointer() || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const gx = gsap.quickTo('.final__light--green', 'x', { duration: 2.4, ease: 'power2.out' });
      const gy = gsap.quickTo('.final__light--green', 'y', { duration: 2.4, ease: 'power2.out' });
      const bx = gsap.quickTo('.final__light--blue', 'x', { duration: 2.8, ease: 'power2.out' });
      const by = gsap.quickTo('.final__light--blue', 'y', { duration: 2.8, ease: 'power2.out' });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        gx(nx * 16);
        gy(ny * 12);
        bx(nx * -14);
        by(ny * -10);
      };
      root.addEventListener('pointermove', onMove, { passive: true });
      return () => root.removeEventListener('pointermove', onMove);
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section final" ref={ref} aria-label="Be part of what's next" data-atmosphere="final">
      <div className="final__bg" aria-hidden="true">
        <div className="final__light final__light--green" />
        <div className="final__light final__light--blue" />
        <div className="final__haze" />
        <ConnectionArcs className="final__arcs" />
      </div>
      <div className="container final__inner">
        <p className="eyebrow" data-reveal="0">{finalCta.eyebrow}</p>
        <RevealText as="h2" className="final__title" lines={finalCta.headline} gradientLine={1} />
        <p className="lead final__lead" data-reveal="1">{finalCta.body}</p>
        <div className="final__actions" data-reveal="2">
          <MagneticButton onClick={() => scrollToId('tickets')}>
            {finalCta.primaryCta}
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToId('schedule')}>
            {finalCta.secondaryCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
