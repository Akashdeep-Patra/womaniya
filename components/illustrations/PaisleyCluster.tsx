/**
 * Paisley / Boteh Cluster — traditional Indian teardrop motif.
 * Used decoratively on product cards and section backgrounds.
 */
export function PaisleyCluster({
  className = '',
  color = '#C5A059',
  accent = '#8A1C14',
  size = 80,
}: {
  className?: string;
  color?: string;
  accent?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {/* Large paisley — main */}
      <path
        d="M50 10 C50 10 70 14 74 32 C78 50 66 68 54 72 C42 76 30 68 28 56 C26 44 34 30 42 24 C46 21 50 10 50 10 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.7"
      />
      {/* Inner paisley outline */}
      <path
        d="M50 18 C50 18 63 22 66 36 C69 50 61 62 52 65 C43 68 35 61 34 52 C33 43 40 32 46 27 C48 24 50 18 50 18 Z"
        fill={color}
        opacity="0.08"
      />
      {/* Inner flower */}
      <g transform="translate(51,46)" opacity="0.6">
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * 60 * Math.PI) / 180;
          return (
            <ellipse
              key={i}
              cx={Math.cos(a) * 5} cy={Math.sin(a) * 5}
              rx="1.8" ry="3.5"
              transform={`rotate(${i * 60},${Math.cos(a) * 5},${Math.sin(a) * 5})`}
              fill={color}
            />
          );
        })}
        <circle cx="0" cy="0" r="2" fill={accent} opacity="0.7" />
      </g>
      {/* Curl tip accent */}
      <circle cx="50" cy="12" r="2.5" fill={color} opacity="0.5" />
      <circle cx="50" cy="12" r="1.2" fill={accent} opacity="0.6" />
      {/* Small scattered dots — alpona style */}
      <circle cx="36" cy="56" r="1.2" fill={color} opacity="0.4" />
      <circle cx="65" cy="40" r="1.2" fill={color} opacity="0.4" />
      <circle cx="58" cy="66" r="1" fill={color} opacity="0.35" />
      {/* Secondary small paisley — rotated */}
      <g transform="translate(78,72) rotate(120) scale(0.42)" opacity="0.5">
        <path
          d="M50 10 C50 10,70 14,74 32 C78 50,66 68,54 72 C42 76,30 68,28 56 C26 44,34 30,42 24 C46 21,50 10,50 10 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
        <circle cx="50" cy="12" r="3" fill={color} />
      </g>
      {/* Third mini paisley */}
      <g transform="translate(18,76) rotate(220) scale(0.3)" opacity="0.4">
        <path
          d="M50 10 C50 10,70 14,74 32 C78 50,66 68,54 72 C42 76,30 68,28 56 C26 44,34 30,42 24 C46 21,50 10,50 10 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
