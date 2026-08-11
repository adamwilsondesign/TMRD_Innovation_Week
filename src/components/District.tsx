import { useLayoutEffect, useRef, useState } from 'react';
import { district, media } from '../data/site';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useIsMobile, useReducedMotion } from '../lib/motion-utils';
import { useReveal } from '../lib/useReveal';
import { MediaFrame } from './media/MediaFrame';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

/** SVG coordinate space for the conceptual district visualization. */
const VW = 800;
const VH = 600;

export function District() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const pathRef = useRef<SVGPathElement>(null);
  const travellerRef = useRef<SVGCircleElement>(null);
  const hoverRef = useRef(false);
  const scrollActiveRef = useRef(0);

  const pts = district.venues.map((v) => ({
    x: (v.x / 100) * VW,
    y: (v.y / 100) * VH,
  }));
  const pathD = `M ${pts[0].x} ${pts[0].y} C ${pts[0].x + 60} ${pts[0].y - 140}, ${pts[1].x - 120} ${pts[1].y + 60}, ${pts[1].x} ${pts[1].y} S ${pts[2].x - 40} ${pts[2].y - 90}, ${pts[2].x} ${pts[2].y} S ${pts[3].x + 80} ${pts[3].y - 60}, ${pts[3].x} ${pts[3].y}`;

  /**
   * Desktop scroll story: the composition pins for ~150vh while the
   * connection path draws itself node-to-node, a traveler light rides it,
   * and locations activate in sequence. Hover/focus overrides the
   * scroll-selected location; the scroll state resumes on leave.
   * Mobile and reduced-motion keep the unpinned accordion model.
   */
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1081px) and (prefers-reduced-motion: no-preference)', () => {
      setPinned(true);
      const path = pathRef.current;
      const traveller = travellerRef.current;
      if (!path || !traveller) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const favorX = gsap.quickTo('.district__viz .media-frame', 'x', {
        duration: 1.2,
        ease: 'power2.out',
      });
      const favorY = gsap.quickTo('.district__viz .media-frame', 'y', {
        duration: 1.2,
        ease: 'power2.out',
      });
      gsap.set('.district__viz .media-frame', { scale: 1.05 });

      const applyProgress = (p: number) => {
        const f = Math.min(1, p * 1.08);
        path.style.strokeDashoffset = `${length * (1 - f)}`;
        const pt = path.getPointAtLength(length * f);
        traveller.setAttribute('cx', String(pt.x));
        traveller.setAttribute('cy', String(pt.y));
        const idx = f < 0.22 ? 0 : f < 0.52 ? 1 : f < 0.82 ? 2 : 3;
        scrollActiveRef.current = idx;
        // favor the active location with a very subtle drift
        favorX(-(pts[idx].x / VW - 0.5) * 26);
        favorY(-(pts[idx].y / VH - 0.5) * 20);
        if (!hoverRef.current) setActive(idx);
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=150%',
        pin: root.querySelector<HTMLElement>('.container'),
        scrub: true,
        onUpdate: (self) => applyProgress(self.progress),
      });
      applyProgress(0);

      return () => {
        st.kill();
        setPinned(false);
        gsap.set('.district__viz .media-frame', { clearProps: 'all' });
        path.style.strokeDasharray = '';
        path.style.strokeDashoffset = '';
      };
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overrideActive = (i: number) => {
    hoverRef.current = true;
    setActive(i);
  };
  const releaseOverride = () => {
    hoverRef.current = false;
    if (pinned) setActive(scrollActiveRef.current);
  };

  const list = (
    <ol
      className="district__list"
      onMouseLeave={releaseOverride}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) releaseOverride();
      }}
    >
      {district.venues.map((venue, i) => (
        <li key={venue.id}>
          <button
            type="button"
            className={`district__item${i === active ? ' district__item--active' : ''}`}
            onClick={() => overrideActive(i)}
            onMouseEnter={() => !isMobile && overrideActive(i)}
            onFocus={() => overrideActive(i)}
            aria-expanded={isMobile ? i === active : undefined}
          >
            <span className="district__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="district__item-text">
              <span className="district__item-name">{venue.name}</span>
              <span className="district__item-body">{venue.body}</span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );

  return (
    <section className="section district" id="district" ref={ref} data-atmosphere="district">
      <div className="container">
        <div className="district__layout">
          <div className="district__copy">
            <div className="section-head section-head--tight">
              <p className="eyebrow" data-reveal="0">{district.eyebrow}</p>
              <RevealText as="h2" className="h2" lines={district.headline} gradientLine={1} />
              <p className="lead" data-reveal="1">{district.body}</p>
            </div>
            {!isMobile && (
              <>
                <div data-reveal="2">{list}</div>
                <div className="district__cta" data-reveal="3">
                  <MagneticButton variant="ghost" href="#district">
                    {district.cta}
                  </MagneticButton>
                </div>
              </>
            )}
          </div>

          <div className="district__viz" data-reveal="1">
            <MediaFrame entry={media[district.mediaKey]} fill />
            <svg
              className="district__overlay"
              viewBox={`0 0 ${VW} ${VH}`}
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="district-path" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#55DE82" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#3CAECE" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              <path
                ref={pathRef}
                className={`district__path${pinned ? ' district__path--draw' : ''}`}
                d={pathD}
                stroke="url(#district-path)"
                strokeWidth="1.6"
                fill="none"
              />

              {!reduced && (
                <circle ref={travellerRef} className="district__traveller" r="4" fill="#55DE82">
                  {!pinned && <animateMotion dur="14s" repeatCount="indefinite" path={pathD} />}
                </circle>
              )}

              {pts.map((p, i) => {
                const isActive = i === active;
                return (
                  <g
                    key={district.venues[i].id}
                    className={`district__node${isActive ? ' district__node--active' : ''}`}
                    onMouseEnter={() => overrideActive(i)}
                    onMouseLeave={releaseOverride}
                    style={{ pointerEvents: 'all' }}
                  >
                    <circle className="district__node-pulse" cx={p.x} cy={p.y} r="16" />
                    <circle className="district__node-ring" cx={p.x} cy={p.y} r="13" />
                    <circle className="district__node-core" cx={p.x} cy={p.y} r="5" />
                    <text x={p.x + 22} y={p.y + 5} className="district__node-num">
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="district__disclaimer">{district.disclaimer}</p>
          </div>

          {isMobile && (
            <>
              <div className="district__accordion">{list}</div>
              <div className="district__cta">
                <MagneticButton variant="ghost" href="#district">
                  {district.cta}
                </MagneticButton>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
