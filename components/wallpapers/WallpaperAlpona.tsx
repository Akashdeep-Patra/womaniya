export function WallpaperAlpona({
  className = '',
  color = '#C5A059',
  opacity = 0.03,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <pattern id="wp-alpona" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 10} />
          <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="0.4" opacity={opacity * 8} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const x = 30 + Math.cos(a) * 20;
            const y = 30 + Math.sin(a) * 20;
            return (
              <ellipse key={i} cx={x} cy={y} rx="1.5" ry="4"
                transform={`rotate(${i * 45},${x},${y})`}
                fill={color} opacity={opacity * 12} />
            );
          })}
          <circle cx="30" cy="30" r="3" fill={color} opacity={opacity * 15} />
          <circle cx="30" cy="30" r="1.2" fill="#8A1C14" opacity={opacity * 10} />
          <circle cx="0" cy="0" r="1" fill={color} opacity={opacity * 8} />
          <circle cx="60" cy="0" r="1" fill={color} opacity={opacity * 8} />
          <circle cx="0" cy="60" r="1" fill={color} opacity={opacity * 8} />
          <circle cx="60" cy="60" r="1" fill={color} opacity={opacity * 8} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wp-alpona)" />
    </svg>
  );
}
