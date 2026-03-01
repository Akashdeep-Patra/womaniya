export function PaisleyBorder({
  className = '',
  color = '#C5A059',
  width = 320,
  height = 24,
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
        <pattern id="paisley-strip" x="0" y="0" width="32" height={height} patternUnits="userSpaceOnUse">
          <path d={`M8 ${cy} C8 ${cy - 6} 16 ${cy - 8} 20 ${cy - 4} C24 ${cy} 20 ${cy + 4} 16 ${cy + 2} C12 ${cy} 8 ${cy + 4} 8 ${cy}`}
            fill="none" stroke={color} strokeWidth="0.7" opacity="0.5" />
          <circle cx="12" cy={cy - 2} r="1" fill={color} opacity="0.4" />
          <path d={`M24 ${cy} C24 ${cy + 6} 28 ${cy + 6} 30 ${cy + 2}`}
            fill="none" stroke={color} strokeWidth="0.4" opacity="0.3" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#paisley-strip)" />
    </svg>
  );
}
