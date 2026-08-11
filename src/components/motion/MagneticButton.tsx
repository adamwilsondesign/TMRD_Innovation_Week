import {
  useLayoutEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { gsap } from '../../lib/gsap';
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion-utils';

type BaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'tgh';
  className?: string;
};

type AsAnchor = BaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type AsButton = BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type Props = AsAnchor | AsButton;

/**
 * Primary CTA with a restrained magnetic pull on fine-pointer devices.
 * The element drifts up to ~7px toward the cursor; the label drifts a
 * touch further for depth. Renders an <a> when href is given.
 */
export function MagneticButton({ children, variant = 'primary', className, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label || !hasFinePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    const lxTo = gsap.quickTo(label, 'x', { duration: 0.45, ease: 'power3.out' });
    const lyTo = gsap.quickTo(label, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * 0.22);
      yTo(dy * 0.3);
      lxTo(dx * 0.1);
      lyTo(dy * 0.14);
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
      gsap.to(label, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf([el, label]);
    };
  }, []);

  const cls = `btn btn--${variant} ${className ?? ''}`;
  const inner = <span className="btn__label" ref={labelRef}>{children}</span>;

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a ref={ref} className={cls} {...(rest as AsAnchor)}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} {...(rest as AsButton)}>
      {inner}
    </button>
  );
}
