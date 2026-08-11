import { useState } from 'react';
import { footer, site } from '../data/site';
import { Logo } from './Logo';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const anchorFor = (label: string): string => {
  const map: Record<string, string> = {
    About: '#about',
    Tracks: '#tracks',
    Schedule: '#schedule',
    Speakers: '#speakers',
    'Innovation District': '#district',
    'Passes & Pricing': '#tickets',
  };
  return map[label] ?? '#top';
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'success'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState('error');
      return;
    }
    setState('success');
  };

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__blurb">{footer.blurb}</p>
            <a className="footer__tmrd-link" href={site.tmrdWebsiteUrl}>
              {footer.tmrdLinkLabel}
              <span aria-hidden="true"> →</span>
            </a>
            <ul className="footer__social" aria-label="Social media">
              {footer.social.map((network) => (
                <li key={network}>
                  <a href="#top" aria-label={`${site.name} on ${network} (demo link)`}>
                    {network}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((col) => (
            <nav className="footer__col" key={col.title} aria-label={col.title}>
              <h3 className="footer__col-title">{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href={anchorFor(link)}>{link}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__newsletter">
            <h3 className="footer__col-title">{footer.newsletter.title}</h3>
            <p>{footer.newsletter.body}</p>
            {state === 'success' ? (
              <p className="footer__success" role="status">
                {footer.newsletter.success}
              </p>
            ) : (
              <form className="footer__form" onSubmit={onSubmit} noValidate>
                <label className="visually-hidden" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder={footer.newsletter.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === 'error') setState('idle');
                  }}
                  aria-invalid={state === 'error'}
                  aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
                />
                <button type="submit" className="btn btn--primary btn--sm">
                  <span className="btn__label">{footer.newsletter.cta}</span>
                </button>
                {state === 'error' && (
                  <p className="footer__error" id="newsletter-error" role="alert">
                    {footer.newsletter.error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <p>{footer.copyright}</p>
          <ul className="footer__legal">
            {footer.legal.map((link) => (
              <li key={link}>
                <a href="#top">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
