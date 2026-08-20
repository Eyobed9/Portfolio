import { useId } from "react";

/**
 * Eyobed's monogram: an open "C" ring crossed by a bar to read as an "e", with
 * a dot at the upper left and a crosshair at the right.
 *
 * Drawn as vector rather than shipped as a raster so it stays crisp at favicon
 * size, weighs almost nothing, and inherits `currentColor` from whatever it
 * sits in. The thin line inside the bar is knocked out through a mask, so the
 * page background shows through it on either theme instead of being painted a
 * fixed colour.
 */
const Logo = ({ className = "" }: { className?: string }) => {
  // Unique per instance: the mark renders in both the header and the rail.
  const maskId = useId();

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <mask id={maskId}>
        <rect width="100" height="100" fill="black" />
        {/* Ring, open on the right. */}
        <path
          d="M 76 29.7 A 33 33 0 1 0 76 70.3"
          fill="none"
          stroke="white"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Crossbar that turns the C into an e. */}
        <rect x="20" y="43" width="50" height="14" rx="3" fill="white" />
        {/* Dot, upper left. */}
        <circle cx="28" cy="22" r="7" fill="white" />
        {/* Crosshair at the right terminal. */}
        <rect x="76.6" y="36" width="4.8" height="28" rx="2.4" fill="white" />
        <rect x="68" y="47.6" width="23" height="4.8" rx="2.4" fill="white" />
        {/* Knocked back out of the bar. */}
        <rect x="29" y="48.5" width="24" height="3" rx="1.5" fill="black" />
      </mask>

      <rect width="100" height="100" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
};

export default Logo;
