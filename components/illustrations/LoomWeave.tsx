export function LoomWeave({
  className = '',
  color = '#C5A059',
  width = 320,
  height = 16,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  const cy = height / 2;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={className} aria-hidden>
      <defs>
        <pattern id="loom-unit" x="0" y="0" width="24" height={height} patternUnits="userSpaceOnUse">
          <path d={`M0 ${cy - 2} Q6 ${cy - 5} 12 ${cy - 2} Q18 ${cy + 1} 24 ${cy - 2}`}
            fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <path d={`M0 ${cy + 2} Q6 ${cy + 5} 12 ${cy + 2} Q18 ${cy - 1} 24 ${cy + 2}`}
            fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
          <circle cx="12" cy={cy} r="1" fill={color} opacity="0.6" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#loom-unit)" />
    </svg>
  );
}
