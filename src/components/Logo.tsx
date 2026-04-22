import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

/**
 * Logo Nusantara.Protocol — kombinasi simbol cube/diamond dengan typography chrome.
 */
export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="Nusantara Protocol Home">
      <div className="relative">
        <div className="size-9 rounded-lg glass flex items-center justify-center transition-all group-hover:border-primary/40">
          <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path
              d="M12 2L22 7V17L12 22L2 17V7L12 2Z"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M12 2V22M2 7L22 17M22 7L2 17" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>
      <span className="font-display text-lg font-bold tracking-tight chrome-text">
        Nusantara<span className="text-primary">.</span>Protocol
      </span>
    </Link>
  );
};
