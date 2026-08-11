import { useEffect, useState } from 'react';
import type { MediaEntry } from '../../data/media';

/**
 * Image-ready frame for artwork that does not exist yet.
 *
 * - When the file at `entry.src` exists, it renders as a normal <img> with
 *   the manifest's aspect ratio and object-position — installing final art
 *   is a file drop, no code changes.
 * - While the file is missing, a tasteful fallback holds the exact same
 *   geometry: deep blue-black surface, one soft accent light, subtle grain,
 *   optional faint architectural grid. Nothing pretends to be photography.
 * - Availability is checked once per unique URL with a cached HEAD request,
 *   so nothing 404-spams the console and missing art never breaks layout.
 * - `?mediaDebug=1` overlays the asset key, filename, and target size.
 */

const availabilityCache = new Map<string, Promise<boolean>>();

function checkAvailable(src: string): Promise<boolean> {
  let cached = availabilityCache.get(src);
  if (!cached) {
    cached = fetch(src, { method: 'HEAD' })
      .then(
        (res) =>
          res.ok &&
          (res.headers.get('content-type') ?? '').startsWith('image/'),
      )
      .catch(() => false);
    availabilityCache.set(src, cached);
  }
  return cached;
}

export const mediaDebugEnabled = () =>
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('mediaDebug') === '1';

interface MediaFrameProps {
  entry: MediaEntry;
  className?: string;
  /** Darkening overlay for text sitting on the media. */
  overlay?: 'none' | 'soft' | 'strong';
  /** Fill the parent instead of enforcing the manifest aspect ratio. */
  fill?: boolean;
  priority?: boolean;
}

export function MediaFrame({
  entry,
  className,
  overlay = 'none',
  fill = false,
  priority = false,
}: MediaFrameProps) {
  const [available, setAvailable] = useState(false);
  const debug = mediaDebugEnabled();

  useEffect(() => {
    let alive = true;
    checkAvailable(entry.src).then((ok) => {
      if (alive && ok) setAvailable(true);
    });
    return () => {
      alive = false;
    };
  }, [entry.src]);

  return (
    <div
      className={`media-frame media-frame--${entry.accent} ${className ?? ''}`}
      style={{
        aspectRatio: fill ? undefined : entry.aspectRatio,
        ['--media-accent-pos' as string]: entry.accentPosition ?? '50% 45%',
      }}
      role={available ? undefined : 'img'}
      aria-label={available ? undefined : entry.alt}
    >
      {available ? (
        <img
          src={entry.src}
          alt={entry.alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{ objectPosition: entry.objectPosition }}
        />
      ) : (
        <div className="media-frame__fallback" aria-hidden="true">
          {entry.grid && <div className="media-frame__grid" />}
        </div>
      )}
      {overlay !== 'none' && (
        <div className={`media-frame__overlay media-frame__overlay--${overlay}`} aria-hidden="true" />
      )}
      {debug && (
        <div className="media-frame__debug">
          <strong>{entry.key}</strong>
          <span>{entry.src}</span>
          <span>
            {entry.recommendedSize} · {entry.aspectRatio.replace(/\s/g, '')}
          </span>
        </div>
      )}
    </div>
  );
}
