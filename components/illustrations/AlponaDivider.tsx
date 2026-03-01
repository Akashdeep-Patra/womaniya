/**
 * Alpona Divider — inspired by Bengali alpona (rice paste floor art).
 * Used as decorative section separators throughout the site.
 */
export function AlponaDivider({
  className = '',
  color = '#C5A059',
  width = 320,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  const h = 48;
  const cx = width / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${h}`}
      width={width}
      height={h}
      className={className}
      aria-hidden
    >
      {/* Left line */}
      <line x1="0" y1={h / 2} x2={cx - 72} y2={h / 2}
        stroke={color} strokeWidth="0.75" opacity="0.35" />

      {/* Central alpona rosette */}
      <g transform={`translate(${cx}, ${h / 2})`} opacity="0.8">
        {/* Outer ring of petals — 12 */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = Math.cos(angle) * 18;
          const y = Math.sin(angle) * 18;
          return (
            <ellipse
              key={i}
              cx={x} cy={y}
              rx="3" ry="6"
              transform={`rotate(${i * 30},${x},${y})`}
              fill={color}
              opacity="0.35"
            />
          );
        })}
        {/* Middle ring — 8 petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x = Math.cos(angle) * 11;
          const y = Math.sin(angle) * 11;
          return (
            <ellipse
              key={i}
              cx={x} cy={y}
              rx="2" ry="4.5"
              transform={`rotate(${i * 45},${x},${y})`}
              fill={color}
              opacity="0.5"
            />
          );
        })}
        {/* Centre flower — 6 petals */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const x = Math.cos(angle) * 5.5;
          const y = Math.sin(angle) * 5.5;
          return (
            <ellipse
              key={i}
              cx={x} cy={y}
              rx="1.5" ry="3"
              transform={`rotate(${i * 60},${x},${y})`}
              fill={color}
              opacity="0.7"
            />
          );
        })}
        {/* Core dot */}
        <circle cx="0" cy="0" r="2.5" fill={color} opacity="0.9" />
        <circle cx="0" cy="0" r="1"   fill="#8A1C14" opacity="0.7" />
      </g>

      {/* Side accent diamonds */}
      <path
        d={`M${cx - 54} ${h / 2} L${cx - 48} ${h / 2 - 5} L${cx - 42} ${h / 2} L${cx - 48} ${h / 2 + 5} Z`}
        fill="none" stroke={color} strokeWidth="0.7" opacity="0.5"
      />
      <path
        d={`M${cx + 42} ${h / 2} L${cx + 48} ${h / 2 - 5} L${cx + 54} ${h / 2} L${cx + 48} ${h / 2 + 5} Z`}
        fill="none" stroke={color} strokeWidth="0.7" opacity="0.5"
      />

      {/* Right line */}
      <line x1={cx + 72} y1={h / 2} x2={width} y2={h / 2}
        stroke={color} strokeWidth="0.75" opacity="0.35" />
    </svg>
  );
}
