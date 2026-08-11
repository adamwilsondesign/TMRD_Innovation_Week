import { useEffect, useState } from 'react';

const LEVELS = [0.5, 1, 0];

/**
 * Development-only comparison tool. Enable with ?reference=1 or the R key;
 * press O (or use the chip) to cycle overlay opacity. Expects the long
 * reference composite at /public/reference.png — it is not bundled with the
 * repo, so drop it in locally to compare. Excluded from production builds.
 */
export function ReferenceOverlay() {
  const [visible, setVisible] = useState(
    () => new URLSearchParams(window.location.search).get('reference') === '1',
  );
  const [level, setLevel] = useState(0);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, [contenteditable]')) return;
      if (e.key === 'r' || e.key === 'R') setVisible((v) => !v);
      if ((e.key === 'o' || e.key === 'O') && visible)
        setLevel((l) => (l + 1) % LEVELS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div className="ref-overlay" style={{ opacity: LEVELS[level] }}>
        {!missing && (
          <img
            src="/reference.png"
            alt=""
            onError={() => setMissing(true)}
          />
        )}
      </div>
      <div className="ref-overlay__chip">
        {missing ? (
          <span>reference: put the composite at public/reference.png</span>
        ) : (
          <span>reference {Math.round(LEVELS[level] * 100)}%</span>
        )}
        <button type="button" onClick={() => setLevel((l) => (l + 1) % LEVELS.length)}>
          opacity (O)
        </button>
        <button type="button" onClick={() => setVisible(false)}>
          hide (R)
        </button>
      </div>
    </>
  );
}
