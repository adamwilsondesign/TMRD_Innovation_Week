import { createElement, useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion-utils';

interface RevealTextProps {
  /** Each entry renders as its own masked line. */
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  /** Index of a line to paint with the brand gradient. */
  gradientLine?: number;
  /** 'scroll' reveals when scrolled into view; 'load' plays immediately. */
  trigger?: 'scroll' | 'load';
  delay?: number;
}

/**
 * Masked word-by-word headline reveal. Words rise out of an overflow-hidden
 * clip per word; with reduced motion the text simply renders.
 */
export function RevealText({
  lines,
  as = 'div',
  className,
  gradientLine,
  trigger = 'scroll',
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll<HTMLElement>('.rt__word');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: 'power4.out',
          stagger: 0.05,
          delay,
          scrollTrigger:
            trigger === 'scroll'
              ? { trigger: el, start: 'top 86%', once: true }
              : undefined,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, trigger]);

  // Re-measure scroll positions once fonts settle so triggers stay accurate.
  useLayoutEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }, []);

  return createElement(
    as,
    { ref, className: `rt ${className ?? ''}` },
    lines.map((line, i) => (
      <span className="rt__line" key={i}>
        {line.split(' ').map((word, j) => (
          <span className="rt__mask" key={j}>
            <span
              className={`rt__word${i === gradientLine ? ' text-gradient' : ''}`}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    )),
  );
}
