export function LotusMedallion({
  className = '',
  color = '#C5A059',
  size = 64,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  const c = 32;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
      <circle cx={c} cy={c} r="28" fill="none" stroke={color} strokeWidth="0.7" opacity="0.3" />
      <circle cx={c} cy={c} r="24" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <g transform={`translate(${c},${c})`}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const px = Number((Math.cos(a) * 14).toFixed(4));
          const py = Number((Math.sin(a) * 14).toFixed(4));
          return (
            <ellipse key={i} cx={px} cy={py}
              rx="2.5" ry="6" transform={`rotate(${i * 30},${px},${py})`}
              fill={color} opacity="0.25" />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const px = Number((Math.cos(a) * 8).toFixed(4));
          const py = Number((Math.sin(a) * 8).toFixed(4));
          return (
            <ellipse key={`i${i}`} cx={px} cy={py}
              rx="1.5" ry="4" transform={`rotate(${i * 45},${px},${py})`}
              fill={color} opacity="0.4" />
          );
        })}
        <circle r="3.5" fill={color} opacity="0.6" />
        <circle r="1.5" fill="#8A1C14" opacity="0.5" />
      </g>
    </svg>
  );
}
