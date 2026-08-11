import { useEffect, useRef, useState } from 'react';
import { passes, type PassItem } from '../data/site';
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
  const [pending, setPending] = useState<PassItem | null>(null);
  const [selected, setSelected] = useState<PassItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pending && !dialog.open) dialog.showModal();
    if (!pending && dialog.open) dialog.close();
  }, [pending]);

  const confirm = () => {
    setSelected(pending);
    setPending(null);
  };

  return (
    <section className="section passes" id="tickets" ref={ref}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="0">{passes.eyebrow}</p>
          <RevealText as="h2" className="h2" lines={passes.headline} gradientLine={1} />
          <p className="lead" data-reveal="1">{passes.body}</p>
        </div>

        <div className="passes__grid">
          {passes.items.map((pass, i) => (
            <article
              key={pass.id}
              className={`pass glow-card${pass.highlighted ? ' pass--highlight' : ''}`}
              data-reveal={i}
              data-tilt
            >
              {pass.badge && <span className="pass__badge">{pass.badge}</span>}
              <h3 className="pass__name">{pass.name}</h3>
              <p className="pass__tagline">{pass.tagline}</p>
              <p className="pass__price">
                <span className="pass__amount">
                  <span className="pass__currency" aria-hidden="true">$</span>
                  {pass.earlyBird}
                  <span className="pass__usd"> USD</span>
                </span>
                <span className="pass__standard">
                  Early bird · standard ${pass.standard}
                </span>
              </p>
              <ul className="pass__features">
                {pass.features.map((feature) => (
                  <li key={feature}>
                    <Check />
                    {feature}
                  </li>
                ))}
              </ul>
              {pass.excludes && <p className="pass__excludes">{pass.excludes}</p>}
              <div className="pass__cta">
                <MagneticButton
                  variant={pass.highlighted ? 'primary' : 'ghost'}
                  onClick={() => setPending(pass)}
                >
                  Select {pass.name}
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>

        <p className="passes__footnote" data-reveal="0" aria-live="polite">
          {selected
            ? `${selected.name} selected — this demo stops short of checkout. See you in February.`
            : passes.footnote}
        </p>
      </div>

      <dialog
        ref={dialogRef}
        className="pass-modal"
        aria-labelledby="pass-modal-title"
        onClose={() => setPending(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setPending(null);
        }}
      >
        {pending && (
          <div className="pass-modal__inner">
            <p className="eyebrow">TMRD Innovation Week · Feb 22–26, 2027</p>
            <h3 id="pass-modal-title" className="pass-modal__title">
              {pending.name}
            </h3>
            <p className="pass-modal__price">
              ${pending.earlyBird}
              <span> USD · early bird (standard ${pending.standard})</span>
            </p>
            <ul className="pass__features">
              {pending.features.map((feature) => (
                <li key={feature}>
                  <Check />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="pass-modal__note">
              This is a design demo — checkout isn’t wired up. Selecting simply
              remembers your choice on this page.
            </p>
            <div className="pass-modal__actions">
              <MagneticButton onClick={confirm}>Select this pass</MagneticButton>
              <button type="button" className="btn btn--ghost" onClick={() => setPending(null)}>
                <span className="btn__label">Close</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
