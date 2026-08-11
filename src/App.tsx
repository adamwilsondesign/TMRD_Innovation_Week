import { lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';
import { prefersReducedMotion } from './lib/motion-utils';
import { setLenis } from './lib/scroll';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BuiltOnEachOther } from './components/BuiltOnEachOther';
import { Tracks } from './components/Tracks';
import { WeekAtAGlance } from './components/WeekAtAGlance';
import { People } from './components/People';
import { District } from './components/District';
import { Passes } from './components/Passes';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AmbientField } from './components/motion/AmbientField';
import { CursorLight } from './components/motion/CursorLight';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { SectionAtmosphere } from './components/motion/SectionAtmosphere';

const ReferenceOverlay = import.meta.env.DEV
  ? lazy(() =>
      import('./components/motion/ReferenceOverlay').then((m) => ({
        default: m.ReferenceOverlay,
      })),
    )
  : null;

export default function App() {
  // Smooth scrolling wired into GSAP's ticker (skipped under reduced motion).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11 });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AmbientField />
      <SectionAtmosphere />
      <CursorLight />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <BuiltOnEachOther />
        <Tracks />
        <WeekAtAGlance />
        <People />
        <District />
        <Passes />
        <FinalCTA />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
      {ReferenceOverlay && (
        <Suspense fallback={null}>
          <ReferenceOverlay />
        </Suspense>
      )}
    </>
  );
}
