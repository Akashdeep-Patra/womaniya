export function TempleArch({
  className = '',
  color = '#C5A059',
  width = 280,
  height = 100,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  const cx = width / 2;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={className} aria-hidden>
      <path d={`M16 ${height} V40 Q16 12 ${cx} 8 Q${width - 16} 12 ${width - 16} 40 V${height}`}
        fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d={`M24 ${height} V44 Q24 20 ${cx} 16 Q${width - 24} 20 ${width - 24} 44 V${height}`}
        fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <g transform={`translate(${cx},12)`}>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = ((i * 60 + 30) * Math.PI) / 180;
          const px = Number((Math.cos(a) * 5).toFixed(4));
          const py = Number((Math.sin(a) * 5).toFixed(4));
          return (
            <ellipse key={i} cx={px} cy={py}
              rx="1" ry="2.5" transform={`rotate(${i * 60 + 30},${px},${py})`}
              fill={color} opacity="0.5" />
          );
        })}
        <circle r="1.5" fill={color} opacity="0.7" />
      </g>
      <circle cx={16} cy={40} r="1.2" fill={color} opacity="0.4" />
      <circle cx={width - 16} cy={40} r="1.2" fill={color} opacity="0.4" />
    </svg>
  );
}
