interface LogoProps {
  className?: string;
  withPoweredBy?: boolean;
}

/** Text lockup for the TMRD Innovation Week identity (no official logo files bundled). */
export function Logo({ className, withPoweredBy = true }: LogoProps) {
  return (
    <span className={`logo ${className ?? ''}`}>
      <svg
        className="logo__mark"
        viewBox="0 0 30 30"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M2 5h16v5H2z" fill="#55DE82" />
        <path d="M7 12.5h16v5H7z" fill="#3CAECE" />
        <path d="M12 20h16v5H12z" fill="#F5F7F7" />
      </svg>
      <span className="logo__word" aria-label="TMRD Innovation Week">
        <span aria-hidden="true">TMRD</span>
        <span aria-hidden="true">Innovation</span>
        <span aria-hidden="true">Week</span>
      </span>
      {withPoweredBy && (
        <span className="logo__powered">
          <span className="logo__powered-label">Powered by</span>
          <span className="logo__powered-org">Tampa General Hospital</span>
        </span>
      )}
    </span>
  );
}
