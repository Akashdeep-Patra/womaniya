'use client';

export function AlponaCircle({ className = '', width = 100, height = 100 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="100" cy="100" r="10" className="fill-current" />
      
      {/* Inner Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={`petal-${angle}`} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M 100 85 Q 110 65 100 45 Q 90 65 100 85"
            className="stroke-current"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="100" cy="35" r="3" className="fill-current" />
        </g>
      ))}

      {/* Outer Vines */}
      <circle cx="100" cy="100" r="60" className="stroke-current" strokeWidth="1" strokeDasharray="4 4" fill="none" />

      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={`vine-${angle}`} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M 100 40 C 120 20, 140 30, 130 50 C 120 70, 100 60, 100 40 Z"
            className="stroke-current"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      ))}
      
      <circle cx="100" cy="100" r="90" className="stroke-current" strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="95" className="stroke-current" strokeWidth="0.5" fill="none" />
    </svg>
  );
}
