export function AlponaCorner({
  className = '',
  color = '#C5A059',
  size = 64,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <g opacity="0.8">
        <path d="M4 60 Q4 4 60 4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
        <path d="M8 60 Q8 8 60 8" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
        <path d="M14 60 Q14 14 60 14" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = ((i * 90) / 6) * (Math.PI / 180);
          const r = 42;
          const cx = Number((4 + Math.cos(angle) * r).toFixed(4));
          const cy = Number((60 - Math.sin(angle) * r).toFixed(4));
          return <circle key={i} cx={cx} cy={cy} r="1.5" fill={color} opacity="0.5" />;
        })}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = ((i * 90) / 4) * (Math.PI / 180);
          const r = 28;
          const cx = Number((4 + Math.cos(angle) * r).toFixed(4));
          const cy = Number((60 - Math.sin(angle) * r).toFixed(4));
          return (
            <ellipse
              key={`p${i}`}
              cx={cx}
              cy={cy}
              rx="1.5"
              ry="3.5"
              transform={`rotate(${-i * 22.5},${cx},${cy})`}
              fill={color}
              opacity="0.4"
            />
          );
        })}
        <circle cx="4" cy="60" r="3" fill={color} opacity="0.6" />
        <circle cx="4" cy="60" r="1.2" fill="#8A1C14" opacity="0.5" />
      </g>
    </svg>
  );
}
