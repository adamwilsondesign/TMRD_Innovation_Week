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
        const from = el.dataset.revealFrom;
        const start =
          from === 'left'
            ? { autoAlpha: 0, x: -30, y: 0 }
            : from === 'right'
              ? { autoAlpha: 0, x: 30, y: 0 }
              : { autoAlpha: 0, y: 26 };
        gsap.fromTo(el, start, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 1.1,
          delay: order * 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // TGH banner: the yellow rule sweeps in once as the module enters
      root.querySelectorAll<HTMLElement>('.tgh-banner__rule').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        );
      });

      root.querySelectorAll<HTMLElement>('[data-window]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(62% 6% 0% 6% round 999px 999px 14px 14px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 999px 999px 14px 14px)',
            duration: 1.3,
            delay: i * 0.14,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 94%', once: true },
          },
        );
      });

      // soft vertical mask (editorial portraits)
      root.querySelectorAll<HTMLElement>('[data-mask-y]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 62% 0% round 16px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            duration: 1.2,
            delay: i * 0.1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        );
      });

      // brief stagger of small children (e.g. pass feature checklists)
      root.querySelectorAll<HTMLElement>('[data-stagger-children]').forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: 'power2.out',
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
