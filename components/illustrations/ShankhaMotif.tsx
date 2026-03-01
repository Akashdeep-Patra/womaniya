'use client';

export function ShankhaMotif({ className = '', width = 24, height = 24 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract Shankha (Conch Shell) */}
      <path
        d="M20 50 Q 10 20, 40 10 T 80 40 Q 90 70, 70 85 T 20 80 Z"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner swirls */}
      <path
        d="M 35 25 C 45 15, 60 20, 65 30"
        className="stroke-current"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 25 45 C 40 30, 70 35, 75 55"
        className="stroke-current"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 30 65 C 45 50, 65 60, 60 75"
        className="stroke-current"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="50" r="4" className="fill-current" />
    </svg>
  );
}
