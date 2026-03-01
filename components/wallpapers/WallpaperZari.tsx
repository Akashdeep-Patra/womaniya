export function WallpaperZari({
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
        <pattern id="wp-zari" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="20" y2="0" stroke={color} strokeWidth="0.4" opacity={opacity * 12} />
          <line x1="0" y1="10" x2="20" y2="10" stroke={color} strokeWidth="0.6" opacity={opacity * 15} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wp-zari)" />
    </svg>
  );
}
