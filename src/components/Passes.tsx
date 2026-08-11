import { useState } from 'react';
import { passes } from '../data/site';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

function Check() {
  return (
    <svg className="pass__check" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2 6.2 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Passes() {
  const ref = useReveal<HTMLElement>();
  usePointerGlow(ref);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="section passes" id="tickets" ref={ref}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{passes.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={passes.headline} gradientLine={1} />
          <p className="lead" data-reveal="1">{passes.body}</p>
        </div>

        <div className="passes__grid">
          {passes.items.map((pass, i) => {
            const isSelected = selected === pass.id;
            return (
              <article
                key={pass.id}
                className={`pass glow-card${pass.highlighted ? ' pass--highlight' : ''}${isSelected ? ' pass--selected' : ''}`}
                data-reveal={i}
              >
                {pass.badge && <span className="pass__badge">{pass.badge}</span>}
                <h3 className="pass__name">{pass.name}</h3>
                <div className="pass__price">
                  <p className="pass__tier">
                    <span className="pass__tier-label">Early Bird</span>
                    <span className="pass__amount">
                      <span className="pass__currency" aria-hidden="true">$</span>
                      {pass.earlyBird}
                    </span>
                  </p>
                  <p className="pass__tier pass__tier--standard">
                    <span className="pass__tier-label">Standard</span>
                    <span className="pass__amount pass__amount--sm">
                      <span className="pass__currency" aria-hidden="true">$</span>
                      {pass.standard}
                    </span>
                  </p>
                </div>
                <p className="pass__summary">{pass.summary}</p>
                <ul className="pass__features">
                  {pass.features.map((feature) => (
                    <li key={feature}>
                      <Check />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pass__cta">
                  <MagneticButton
                    variant={pass.highlighted ? 'primary' : 'ghost'}
                    onClick={() => setSelected(pass.id)}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? `${pass.name} Selected` : `Select ${pass.name}`}
                  </MagneticButton>
                </div>
              </article>
            );
          })}
        </div>

        <p className="passes__footnote" data-reveal="0" role="status" aria-live="polite">
          {selected
            ? `${passes.items.find((p) => p.id === selected)?.name} selected — ticketing opens with the full schedule announcement.`
            : 'Concept pricing shown for design development.'}
        </p>
      </div>
    </section>
  );
}
