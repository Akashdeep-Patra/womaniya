/**
 * Jamdani Diamond Motif — inspired by traditional Dhakai Jamdani patterns.
 * Geometric diamond lattice with stylised lotus at each intersection.
 */
export function JamdaniMotif({
  className = '',
  opacity = 0.18,
  color = '#C5A059',
}: {
  className?: string;
  opacity?: number;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
    >
      <defs>
        <pattern id="jamdani-tile" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Diamond frame */}
          <path
            d="M30 4 L56 30 L30 56 L4 30 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity={opacity * 2}
          />
          {/* Inner diamond */}
          <path
            d="M30 14 L46 30 L30 46 L14 30 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 1.5}
          />
          {/* Central lotus — 8 petals */}
          <g transform="translate(30,30)" opacity={opacity * 3}>
            <ellipse cx="0" cy="-7" rx="2" ry="4.5" fill={color} />
            <ellipse cx="0" cy="7"  rx="2" ry="4.5" fill={color} />
            <ellipse cx="-7" cy="0" rx="4.5" ry="2" fill={color} />
            <ellipse cx="7"  cy="0" rx="4.5" ry="2" fill={color} />
            <ellipse cx="-4.9" cy="-4.9" rx="2" ry="4" transform="rotate(-45,-4.9,-4.9)" fill={color} opacity="0.75" />
            <ellipse cx="4.9"  cy="-4.9" rx="2" ry="4" transform="rotate(45,4.9,-4.9)"  fill={color} opacity="0.75" />
            <ellipse cx="-4.9" cy="4.9"  rx="2" ry="4" transform="rotate(45,-4.9,4.9)"  fill={color} opacity="0.75" />
            <ellipse cx="4.9"  cy="4.9"  rx="2" ry="4" transform="rotate(-45,4.9,4.9)"  fill={color} opacity="0.75" />
            {/* Pollen dot */}
            <circle cx="0" cy="0" r="2.5" fill={color} />
            <circle cx="0" cy="0" r="1.2" fill="#8A1C14" opacity="0.6" />
          </g>
          {/* Corner dots */}
          <circle cx="0"  cy="0"  r="1.5" fill={color} opacity={opacity * 2} />
          <circle cx="60" cy="0"  r="1.5" fill={color} opacity={opacity * 2} />
          <circle cx="0"  cy="60" r="1.5" fill={color} opacity={opacity * 2} />
          <circle cx="60" cy="60" r="1.5" fill={color} opacity={opacity * 2} />
          {/* Diamond tips cross-marks */}
          <path d="M30 4 L30 0 M30 56 L30 60 M4 30 L0 30 M56 30 L60 30"
            stroke={color} strokeWidth="0.5" opacity={opacity * 2} />
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#jamdani-tile)" />
    </svg>
  );
}
