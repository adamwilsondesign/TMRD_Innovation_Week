import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion-utils';

/**
 * A soft light that trails the cursor on fine-pointer devices — pure
 * atmosphere, never a replacement for the native pointer.
 */
export function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' });
    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to(el, { opacity: 1, duration: 1.2 });
        gsap.set(el, { x: e.clientX, y: e.clientY });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      gsap.killTweensOf(el);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="cursor-light" aria-hidden="true" />;
}
