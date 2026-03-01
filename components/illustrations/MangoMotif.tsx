export function MangoMotif({
  className = '',
  color = '#C5A059',
  size = 64,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 64" width={size * 0.75} height={size} className={className} aria-hidden>
      <g transform="translate(24,32)" opacity="0.8">
        <path d="M0 -24 C16 -20 20 -4 16 12 C12 24 0 28 0 28 C0 28 -12 24 -16 12 C-20 -4 -16 -20 0 -24Z"
          fill="none" stroke={color} strokeWidth="0.8" />
        <path d="M0 -18 C10 -14 14 -2 10 10 C6 18 0 22 0 22 C0 22 -6 18 -10 10 C-14 -2 -10 -14 0 -18Z"
          fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <path d="M0 -24 C0 -10 0 10 0 28" stroke={color} strokeWidth="0.4" opacity="0.3" />
        <path d="M-8 -8 Q0 -2 8 -8" fill="none" stroke={color} strokeWidth="0.4" opacity="0.3" />
        <path d="M-10 4 Q0 10 10 4" fill="none" stroke={color} strokeWidth="0.4" opacity="0.3" />
        <circle cy="-6" r="2" fill={color} opacity="0.5" />
        <circle cy="-6" r="0.8" fill="#8A1C14" opacity="0.4" />
      </g>
    </svg>
  );
}
