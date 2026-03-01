export function WallpaperKantha({
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
        <pattern id="wp-kantha" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <line x1="0" y1="6" x2="24" y2="6" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" opacity={opacity * 15} />
          <line x1="0" y1="18" x2="24" y2="18" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" opacity={opacity * 15} />
          <line x1="6" y1="0" x2="6" y2="24" stroke={color} strokeWidth="0.4" strokeDasharray="2 4" opacity={opacity * 12} />
          <line x1="18" y1="0" x2="18" y2="24" stroke={color} strokeWidth="0.4" strokeDasharray="2 4" opacity={opacity * 12} />
          <circle cx="12" cy="12" r="0.6" fill={color} opacity={opacity * 20} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wp-kantha)" />
    </svg>
  );
}
