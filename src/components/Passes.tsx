import { useEffect, useState } from 'react';
import { passes, type PassItem } from '../data/site';
import { prefersReducedMotion } from '../lib/motion-utils';
import { usePointerGlow } from '../lib/usePointerGlow';
import { useReveal } from '../lib/useReveal';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

type PriceMode = 'earlyBird' | 'standard';

function Check() {
  return (
    <svg className="pass__check" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2 6.2 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * Price with a short vertical roll when the mode flips. The outgoing value
 * animates out while the incoming one rises in; the block height is fixed
 * by the static value, so cards never shift.
 */
function RollingPrice({ value }: { value: number }) {
  const [state, setState] = useState({ display: value, outgoing: null as number | null });

  useEffect(() => {
    setState((s) =>
      s.display === value
        ? s
        : { display: value, outgoing: prefersReducedMotion() ? null : s.display },
    );
  }, [value]);

  const { display, outgoing } = state;

  return (
    <span className="pass__roll">
      <span
        className="pass__roll-value"
        key={display}
        onAnimationEnd={() => setState((s) => ({ ...s, outgoing: null }))}
      >
        <span className="pass__currency" aria-hidden="true">$</span>
        {display}
      </span>
      {outgoing !== null && (
        <span className="pass__roll-value pass__roll-value--out" aria-hidden="true">
          <span className="pass__currency">$</span>
          {outgoing}
        </span>
      )}
    </span>
  );
}

export function Passes() {
  const ref = useReveal<HTMLElement>();
  usePointerGlow(ref);
  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<PriceMode>('earlyBird');

  const otherMode: PriceMode = mode === 'earlyBird' ? 'standard' : 'earlyBird';
  const modeLabel = (m: PriceMode) => (m === 'earlyBird' ? 'Early Bird' : 'Standard');
  const price = (pass: PassItem, m: PriceMode) =>
    m === 'earlyBird' ? pass.earlyBird : pass.standard;

  return (
    <section className="section passes" id="tickets" ref={ref} data-atmosphere="passes">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{passes.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={passes.headline} gradientLine={1} />
          <p className="lead" data-reveal="1">{passes.body}</p>
        </div>

        <div
          className="passes__mode"
          role="group"
          aria-label="Price tier"
          data-reveal="0"
        >
          {(['earlyBird', 'standard'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
            >
              {modeLabel(m)}
            </button>
          ))}
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
                    <span className="pass__tier-label">{modeLabel(mode)}</span>
                    <span className="pass__amount">
                      <RollingPrice value={price(pass, mode)} />
                    </span>
                  </p>
                  <p className="pass__tier pass__tier--standard">
                    <span className="pass__tier-label">{modeLabel(otherMode)}</span>
                    <span className="pass__amount pass__amount--sm">
                      <span className="pass__currency" aria-hidden="true">$</span>
                      {price(pass, otherMode)}
                    </span>
                  </p>
                </div>
                <p className="pass__summary">{pass.summary}</p>
                <ul className="pass__features" data-stagger-children>
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
