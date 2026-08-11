import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { nav } from '../data/site';
import { scrollToId, startScroll, stopScroll } from '../lib/scroll';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 32);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Active-section detection drives the sliding nav indicator.
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    nav.forEach((item) => {
      const el = document.querySelector(item.href);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSection(item.href),
          onEnterBack: () => setActiveSection(item.href),
          onLeave: () => setActiveSection((cur) => (cur === item.href ? null : cur)),
          onLeaveBack: () => setActiveSection((cur) => (cur === item.href ? null : cur)),
        }),
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    const list = navListRef.current;
    const ind = indicatorRef.current;
    if (!list || !ind) return;
    const position = () => {
      const link = activeSection
        ? list.querySelector<HTMLElement>(`a[href="${activeSection}"]`)
        : null;
      if (!link) {
        ind.classList.remove('is-visible');
        return;
      }
      ind.style.transform = `translateX(${link.offsetLeft + 14}px)`;
      ind.style.width = `${link.offsetWidth - 28}px`;
      ind.classList.add('is-visible');
    };
    position();
    window.addEventListener('resize', position);
    return () => window.removeEventListener('resize', position);
  }, [activeSection]);

  const close = useCallback(() => {
    setOpen(false);
    startScroll();
    document.documentElement.classList.remove('menu-open');
    toggleRef.current?.focus();
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    stopScroll();
    document.documentElement.classList.add('menu-open');
  }, []);

  // Escape + focus containment while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !menu) return;
      const focusables = menu.querySelectorAll<HTMLElement>('a, button');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    if (open) close();
    scrollToId(href.slice(1));
    history.replaceState(null, '', href);
  };

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container-wide">
        <a
          className="header__brand"
          href="#top"
          onClick={(e) => onNav(e, '#top')}
          aria-label="TMRD Innovation Week — home"
        >
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Primary">
          <ul ref={navListRef}>
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => onNav(e, item.href)}
                  className={activeSection === item.href ? 'is-active' : undefined}
                  aria-current={activeSection === item.href ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          </ul>
        </nav>

        <div className="header__actions">
          <a
            className="btn btn--primary btn--sm header__cta"
            href="#tickets"
            onClick={(e) => onNav(e, '#tickets')}
          >
            <span className="btn__label">Buy Tickets</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : openMenu())}
          >
            <span className="header__toggle-box" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${open ? ' mobile-menu--open' : ''}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.label} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}>
                <a href={item.href} onClick={(e) => onNav(e, item.href)} tabIndex={open ? 0 : -1}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__foot" style={{ transitionDelay: open ? '0.4s' : '0s' }}>
          <a
            className="btn btn--primary"
            href="#tickets"
            onClick={(e) => onNav(e, '#tickets')}
            tabIndex={open ? 0 : -1}
          >
            <span className="btn__label">Buy Tickets</span>
          </a>
          <p>February 22–26, 2027 · Tampa, FL</p>
        </div>
      </div>
    </header>
  );
}
