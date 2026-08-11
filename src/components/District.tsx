import { useState } from 'react';
import { district, media } from '../data/site';
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
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const pts = district.venues.map((v) => ({
    x: (v.x / 100) * VW,
    y: (v.y / 100) * VH,
  }));
  const pathD = `M ${pts[0].x} ${pts[0].y} C ${pts[0].x + 60} ${pts[0].y - 140}, ${pts[1].x - 120} ${pts[1].y + 60}, ${pts[1].x} ${pts[1].y} S ${pts[2].x - 40} ${pts[2].y - 90}, ${pts[2].x} ${pts[2].y} S ${pts[3].x + 80} ${pts[3].y - 60}, ${pts[3].x} ${pts[3].y}`;

  const list = (
    <ol className="district__list">
      {district.venues.map((venue, i) => (
        <li key={venue.id}>
          <button
            type="button"
            className={`district__item${i === active ? ' district__item--active' : ''}`}
            onClick={() => setActive(i)}
            onMouseEnter={() => !isMobile && setActive(i)}
            onFocus={() => setActive(i)}
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
    <section className="section district" id="district" ref={ref}>
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

              <path className="district__path" d={pathD} stroke="url(#district-path)" strokeWidth="1.6" fill="none" />

              {!reduced && (
                <circle className="district__traveller" r="4" fill="#55DE82">
                  <animateMotion dur="14s" repeatCount="indefinite" path={pathD} />
                </circle>
              )}

              {pts.map((p, i) => {
                const isActive = i === active;
                return (
                  <g
                    key={district.venues[i].id}
                    className={`district__node${isActive ? ' district__node--active' : ''}`}
                    onMouseEnter={() => setActive(i)}
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
