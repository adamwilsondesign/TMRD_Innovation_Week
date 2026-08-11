import { useLayoutEffect, useRef } from 'react';
import { gsap } from './gsap';
import { prefersReducedMotion } from './motion-utils';

/**
 * Section-level scroll choreography.
 *
 * Inside the returned ref's subtree:
 *  - `[data-reveal]`       fades/rises in; the attribute value (a number)
 *                          staggers items that arrive together.
 *  - `[data-window]`       reveals through a curved clip mask (arched images).
 *  - `[data-reveal-img]`   settles from scale 1.08 to 1 while its wrapper reveals.
 *
 * Everything is triggered per-element so long sections stay honest, and the
 * whole context reverts cleanly on unmount / HMR.
 */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const order = parseFloat(el.dataset.reveal || '0');
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            delay: order * 0.09,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });

      root.querySelectorAll<HTMLElement>('[data-window]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(62% 6% 0% 6% round 999px 999px 14px 14px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 999px 999px 14px 14px)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        );
      });

      root.querySelectorAll<HTMLElement>('[data-reveal-img]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        );
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
