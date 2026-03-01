export function WallpaperJamdani({
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
        <pattern id="wp-jamdani" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 2 L38 20 L20 38 L2 20 Z" fill="none" stroke={color} strokeWidth="0.5" opacity={opacity * 12} />
          <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="none" stroke={color} strokeWidth="0.3" opacity={opacity * 8} />
          <circle cx="20" cy="20" r="1.5" fill={color} opacity={opacity * 15} />
          <circle cx="0" cy="0" r="0.8" fill={color} opacity={opacity * 10} />
          <circle cx="40" cy="0" r="0.8" fill={color} opacity={opacity * 10} />
          <circle cx="0" cy="40" r="0.8" fill={color} opacity={opacity * 10} />
          <circle cx="40" cy="40" r="0.8" fill={color} opacity={opacity * 10} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wp-jamdani)" />
    </svg>
  );
}
