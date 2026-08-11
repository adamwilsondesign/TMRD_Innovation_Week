import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion-utils';

interface Props {
  className?: string;
  /** Draw the arcs on mount (hero) instead of on scroll into view. */
  drawOnMount?: boolean;
  delay?: number;
}

/**
 * Thin luminous orbital arcs — the page's connective motif. Strokes draw
 * themselves in, then the group rotates imperceptibly slowly while two light
 * motes travel the outer paths (SMIL, skipped under reduced motion).
 */
export function ConnectionArcs({ className, drawOnMount = false, delay = 0 }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const paths = svg.querySelectorAll<SVGPathElement>('.arc');
    const ctx = gsap.context(() => {
      paths.forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 2.4,
            delay: delay + i * 0.25,
            ease: 'power2.inOut',
            scrollTrigger: drawOnMount
              ? undefined
              : { trigger: svg, start: 'top 90%', once: true },
            onComplete: () => {
              p.style.strokeDasharray = 'none';
            },
          },
        );
      });
    }, svg);
    return () => ctx.revert();
  }, [drawOnMount, delay]);

  return (
    <svg
      ref={ref}
      className={`connection-arcs ${className ?? ''}`}
      viewBox="0 0 1200 800"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="arc-gb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#55DE82" stopOpacity="0" />
          <stop offset="0.5" stopColor="#55DE82" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3CAECE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="arc-bg" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3CAECE" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3CAECE" stopOpacity="0.5" />
          <stop offset="1" stopColor="#55DE82" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="connection-arcs__spin">
        <path
          id="arc-outer"
          className="arc"
          d="M 40 620 C 180 300 560 120 900 180 C 1120 220 1190 380 1150 520"
          stroke="url(#arc-gb)"
          strokeWidth="1.5"
        />
        <path
          className="arc"
          d="M 120 700 C 300 460 700 320 1050 420"
          stroke="url(#arc-bg)"
          strokeWidth="1.2"
        />
        <path
          className="arc"
          d="M 250 760 C 420 620 780 540 1120 640"
          stroke="url(#arc-gb)"
          strokeWidth="0.9"
          opacity="0.7"
        />
        {!reduced && (
          <>
            <circle r="3.2" fill="#55DE82" className="arc-mote">
              <animateMotion dur="16s" repeatCount="indefinite" rotate="0">
                <mpath href="#arc-outer" />
              </animateMotion>
            </circle>
            <circle r="2.4" fill="#3CAECE" className="arc-mote arc-mote--blue">
              <animateMotion dur="22s" begin="6s" repeatCount="indefinite">
                <mpath href="#arc-outer" />
              </animateMotion>
            </circle>
          </>
        )}
      </g>
    </svg>
  );
}
