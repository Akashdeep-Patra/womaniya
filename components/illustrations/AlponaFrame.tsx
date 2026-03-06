export function AlponaFrame({
  className = '',
  color = '#C5A059',
  width = 400,
  height = 200,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  const sw = 0.6;
  const inset = 8;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <rect x={inset} y={inset} width={width - inset * 2} height={height - inset * 2}
        fill="none" stroke={color} strokeWidth={sw} opacity="0.3" rx="2" />
      <rect x={inset + 4} y={inset + 4} width={width - inset * 2 - 8} height={height - inset * 2 - 8}
        fill="none" stroke={color} strokeWidth={sw * 0.7} opacity="0.2" rx="1" />
      {[[inset, inset], [width - inset, inset], [inset, height - inset], [width - inset, height - inset]].map(
        ([cx, cy], i) => (
          <g key={i} transform={`translate(${cx},${cy})`}>
            {Array.from({ length: 6 }).map((_, j) => {
              const a = (j * 60 * Math.PI) / 180;
              const px = Number((Math.cos(a) * 6).toFixed(4));
              const py = Number((Math.sin(a) * 6).toFixed(4));
              return (
                <ellipse key={j} cx={px} cy={py}
                  rx="1.2" ry="2.8" transform={`rotate(${j * 60},${px},${py})`}
                  fill={color} opacity="0.35" />
              );
            })}
            <circle cx="0" cy="0" r="2" fill={color} opacity="0.6" />
            <circle cx="0" cy="0" r="0.8" fill="#8A1C14" opacity="0.5" />
          </g>
        ),
      )}
      {[[width / 2, inset], [width / 2, height - inset], [inset, height / 2], [width - inset, height / 2]].map(
        ([cx, cy], i) => (
          <g key={`m${i}`} transform={`translate(${cx},${cy})`}>
            <path d="M0 -4 L3 0 L0 4 L-3 0 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
            <circle cx="0" cy="0" r="1" fill={color} opacity="0.5" />
          </g>
        ),
      )}
    </svg>
  );
}
