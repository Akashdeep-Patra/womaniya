export function NakshiPattern({
  className = '',
  color = '#C5A059',
  opacity = 0.15,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <pattern id="nakshi-stitch" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="5" x2="8" y2="5" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" opacity={opacity * 2} />
          <line x1="10" y1="15" x2="18" y2="15" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" opacity={opacity * 2} />
          <line x1="5" y1="0" x2="5" y2="8" stroke={color} strokeWidth="0.5" strokeDasharray="1.5 2.5" opacity={opacity * 1.5} />
          <line x1="15" y1="10" x2="15" y2="18" stroke={color} strokeWidth="0.5" strokeDasharray="1.5 2.5" opacity={opacity * 1.5} />
          <circle cx="10" cy="10" r="0.8" fill={color} opacity={opacity * 2.5} />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#nakshi-stitch)" />
    </svg>
  );
}
