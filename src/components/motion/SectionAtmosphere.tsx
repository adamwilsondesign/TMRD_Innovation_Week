import { useEffect } from 'react';
import { ScrollTrigger } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion-utils';
import { setAtmosphere } from '../../lib/atmosphere';

/**
 * Watches every `[data-atmosphere]` section and retargets the page-level
 * light field as each chapter becomes active. The canvas eases toward the
 * new state over ~1.5s (lerp in AmbientField), so transitions read as one
 * continuous system. No-op under reduced motion (the field is static).
 */
export function SectionAtmosphere() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const sections = document.querySelectorAll<HTMLElement>('[data-atmosphere]');
    const triggers: ScrollTrigger[] = [];
    sections.forEach((el) => {
      const name = el.dataset.atmosphere!;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setAtmosphere(name),
          onEnterBack: () => setAtmosphere(name),
        }),
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);
  return null;
}
