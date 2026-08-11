import { useEffect, type RefObject } from 'react';
import { hasFinePointer, prefersReducedMotion, clamp } from './motion-utils';

/**
 * One delegated pointermove listener per container.
 *
 * Elements with `.glow-card` get `--mx` / `--my` (0–100%) for a local light
 * bloom, and elements that also carry `data-tilt` get `--rx` / `--ry`
 * (degrees, max ~3) for a very slight 3D tilt. Fine pointers only; throttled
 * to animation frames.
 */
export function usePointerGlow(container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = container.current;
    if (!root || !hasFinePointer() || prefersReducedMotion()) return;

    let raf = 0;
    let ev: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      if (!ev) return;
      const card = (ev.target as HTMLElement).closest<HTMLElement>('.glow-card');
      if (!card || !root.contains(card)) return;
      const r = card.getBoundingClientRect();
      const px = clamp(((ev.clientX - r.left) / r.width) * 100, 0, 100);
      const py = clamp(((ev.clientY - r.top) / r.height) * 100, 0, 100);
      card.style.setProperty('--mx', `${px}%`);
      card.style.setProperty('--my', `${py}%`);
      card.style.setProperty('--dx', `${((px - 50) / 50).toFixed(3)}`);
      card.style.setProperty('--dy', `${((py - 50) / 50).toFixed(3)}`);
      if (card.hasAttribute('data-tilt')) {
        card.style.setProperty('--ry', `${((px - 50) / 50) * 2.6}deg`);
        card.style.setProperty('--rx', `${((py - 50) / 50) * -2.2}deg`);
      }
    };

    const onMove = (e: PointerEvent) => {
      ev = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.glow-card');
      if (!card) return;
      card.style.setProperty('--dx', '0');
      card.style.setProperty('--dy', '0');
      if (card.hasAttribute('data-tilt')) {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      }
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onOut, true);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onOut, true);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [container]);
}
