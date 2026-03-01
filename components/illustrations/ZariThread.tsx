export function ZariThread({
  className = '',
  color = '#C5A059',
  width = 200,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} 8`} width={width} height={8} className={className} aria-hidden>
      <defs>
        <linearGradient id="zari-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="40%" stopColor={color} stopOpacity="0.7" />
          <stop offset="60%" stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <line x1="0" y1="4" x2={width} y2="4" stroke="url(#zari-shimmer)" strokeWidth="1.5" />
      <line x1="0" y1="4" x2={width} y2="4" stroke={color} strokeWidth="0.3" opacity="0.2" />
    </svg>
  );
}
