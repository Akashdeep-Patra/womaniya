export function WallpaperNakshi({
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
        <pattern id="wp-nakshi" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M2 2 L6 6 M6 2 L2 6" stroke={color} strokeWidth="0.4" opacity={opacity * 12} />
          <path d="M10 10 L14 14 M14 10 L10 14" stroke={color} strokeWidth="0.4" opacity={opacity * 12} />
          <circle cx="8" cy="0" r="0.4" fill={color} opacity={opacity * 10} />
          <circle cx="0" cy="8" r="0.4" fill={color} opacity={opacity * 10} />
          <circle cx="16" cy="8" r="0.4" fill={color} opacity={opacity * 10} />
          <circle cx="8" cy="16" r="0.4" fill={color} opacity={opacity * 10} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wp-nakshi)" />
    </svg>
  );
}
