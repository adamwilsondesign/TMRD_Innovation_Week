import { useEffect, useRef } from 'react';
import { clamp, lerp, prefersReducedMotion } from '../../lib/motion-utils';

interface Blob {
  bx: number; // base position, viewport fractions
  by: number;
  r: number; // radius as a fraction of the larger viewport side
  color: [number, number, number];
  alpha: number;
  speed: number;
  phase: number;
  ampX: number;
  ampY: number;
  depth: number; // pointer parallax factor
}

const GREEN: [number, number, number] = [85, 222, 130];
const BLUE: [number, number, number] = [60, 174, 206];
const GREEN_DEEP: [number, number, number] = [0, 104, 72];
const BLUE_DEEP: [number, number, number] = [0, 82, 154];

const BLOBS: Blob[] = [
  { bx: 0.16, by: 0.28, r: 0.42, color: GREEN_DEEP, alpha: 0.16, speed: 0.045, phase: 0.0, ampX: 0.05, ampY: 0.06, depth: 0.012 },
  { bx: 0.85, by: 0.2, r: 0.48, color: BLUE_DEEP, alpha: 0.18, speed: 0.034, phase: 2.1, ampX: 0.06, ampY: 0.05, depth: 0.02 },
  { bx: 0.55, by: 0.85, r: 0.5, color: BLUE_DEEP, alpha: 0.13, speed: 0.028, phase: 4.2, ampX: 0.07, ampY: 0.04, depth: 0.016 },
  { bx: 0.32, by: 0.65, r: 0.3, color: GREEN, alpha: 0.05, speed: 0.06, phase: 1.2, ampX: 0.04, ampY: 0.07, depth: 0.028 },
  { bx: 0.72, by: 0.55, r: 0.32, color: BLUE, alpha: 0.055, speed: 0.052, phase: 5.3, ampX: 0.05, ampY: 0.05, depth: 0.034 },
];

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  green: boolean;
}

/**
 * The page-wide ambient light layer: a fixed canvas of slow green/blue
 * light fields plus a handful of drifting particles. Responds gently to
 * pointer position and scroll velocity. Capped at ~30fps, paused when the
 * tab is hidden, simplified on small screens, static under reduced motion.
 */
export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const small = window.innerWidth < 768;
    const blobs = small ? BLOBS.slice(0, 3) : BLOBS;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = clamp(window.devicePixelRatio || 1, 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: Particle[] = [];
    if (!small && !reduced) {
      for (let i = 0; i < 22; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.6,
          vy: -(2 + Math.random() * 7),
          vx: (Math.random() - 0.5) * 3,
          a: 0.08 + Math.random() * 0.2,
          green: Math.random() < 0.5,
        });
      }
    }

    let px = 0.5; // pointer, viewport fractions (lerped)
    let py = 0.4;
    let tx = 0.5;
    let ty = 0.4;
    const onPointer = (e: PointerEvent) => {
      tx = e.clientX / w;
      ty = e.clientY / h;
    };
    if (!small && !reduced) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    let lastScroll = window.scrollY;
    let scrollVel = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const side = Math.max(w, h);
      for (const b of blobs) {
        const ox = Math.sin(t * b.speed + b.phase) * b.ampX;
        const oy = Math.cos(t * b.speed * 0.9 + b.phase * 1.7) * b.ampY;
        const pxOff = (px - 0.5) * b.depth * side;
        const pyOff = (py - 0.5) * b.depth * side;
        const x = (b.bx + ox) * w + pxOff;
        const y = (b.by + oy) * h + pyOff - scrollVel * b.depth * 26;
        const r = b.r * side;
        const [cr, cg, cb] = b.color;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${b.alpha})`);
        g.addColorStop(0.55, `rgba(${cr},${cg},${cb},${b.alpha * 0.4})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      for (const p of particles) {
        const [cr, cg, cb] = p.green ? GREEN : BLUE;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reduced) {
      draw(1.8);
      const onResize = () => {
        resize();
        draw(1.8);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const FRAME = 1000 / 30;
    let hidden = document.hidden;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = now - last;
      last = now;
      if (hidden) return;
      acc += dt;
      if (acc < FRAME) return;
      const step = Math.min(acc, 100) / 1000;
      acc = 0;

      px = lerp(px, tx, 0.05);
      py = lerp(py, ty, 0.05);

      const sy = window.scrollY;
      scrollVel = lerp(scrollVel, clamp((sy - lastScroll) / 18, -8, 8), 0.12);
      lastScroll = sy;

      for (const p of particles) {
        p.x += p.vx * step;
        p.y += (p.vy - scrollVel * 3) * step;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.y > h + 8) { p.y = -8; p.x = Math.random() * w; }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
      }

      draw(now / 1000);
    };
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      hidden = document.hidden;
      last = performance.now();
    };
    const onResize = () => resize();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-field" aria-hidden="true" />;
}
