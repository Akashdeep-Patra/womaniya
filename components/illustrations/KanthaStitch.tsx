/**
 * Kantha Stitch — Bengali running stitch pattern.
 * Used as a subtle decorative border/texture element.
 */
export function KanthaStitch({
  className = '',
  color = '#C5A059',
  width = 200,
  rows = 3,
}: {
  className?: string;
  color?: string;
  width?: number;
  rows?: number;
}) {
  const dotSpacing = 10;
  const rowHeight  = 8;
  const height     = rows * rowHeight + 8;
  const dots       = Math.floor(width / dotSpacing);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      {Array.from({ length: rows }).map((_, row) => {
        const y = 4 + row * rowHeight;
        const offset = row % 2 === 0 ? 0 : dotSpacing / 2;
        return Array.from({ length: dots + 1 }).map((_, i) => {
          const x = i * dotSpacing + offset;
          const isStitch = i % 2 === 0;
          return (
            <circle
              key={`${row}-${i}`}
              cx={x}
              cy={y}
              r={isStitch ? 1.5 : 0.8}
              fill={color}
              opacity={isStitch ? (row === 1 ? 0.7 : 0.45) : 0.25}
            />
          );
        });
      })}
    </svg>
  );
}
