export function JamdaniDiamond({
  className = '',
  color = '#C5A059',
  size = 48,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden>
      <g transform="translate(24,24)" opacity="0.85">
        <path d="M0 -20 L20 0 L0 20 L-20 0 Z" fill="none" stroke={color} strokeWidth="0.8" />
        <path d="M0 -14 L14 0 L0 14 L-14 0 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <path d="M0 -8 L8 0 L0 8 L-8 0 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
        {Array.from({ length: 4 }).map((_, i) => {
          const angles = [0, 90, 180, 270];
          const a = (angles[i] * Math.PI) / 180;
          return (
            <ellipse key={i} cx={Math.cos(a) * 11} cy={Math.sin(a) * 11}
              rx="1.5" ry="3.5" transform={`rotate(${angles[i]},${Math.cos(a) * 11},${Math.sin(a) * 11})`}
              fill={color} opacity="0.5" />
          );
        })}
        <circle r="2.5" fill={color} opacity="0.7" />
        <circle r="1" fill="#8A1C14" opacity="0.5" />
      </g>
    </svg>
  );
}
