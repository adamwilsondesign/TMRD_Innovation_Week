import { finalCta } from '../data/site';
import { useReveal } from '../lib/useReveal';
import { scrollToId } from '../lib/scroll';
import { ConnectionArcs } from './motion/ConnectionArcs';
import { MagneticButton } from './motion/MagneticButton';
import { RevealText } from './motion/RevealText';

export function FinalCTA() {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="section final" ref={ref} aria-label="Be part of what's next">
      <div className="final__bg" aria-hidden="true">
        <div className="final__light final__light--green" />
        <div className="final__light final__light--blue" />
        <div className="final__haze" />
        <ConnectionArcs className="final__arcs" />
      </div>
      <div className="container final__inner">
        <p className="eyebrow" data-reveal="0">{finalCta.eyebrow}</p>
        <RevealText as="h2" className="final__title" lines={finalCta.headline} gradientLine={1} />
        <p className="lead final__lead" data-reveal="1">{finalCta.body}</p>
        <div className="final__actions" data-reveal="2">
          <MagneticButton onClick={() => scrollToId('tickets')}>
            {finalCta.primaryCta}
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToId('schedule')}>
            {finalCta.secondaryCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
