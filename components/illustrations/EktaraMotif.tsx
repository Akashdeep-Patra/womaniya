'use client';

export function EktaraMotif({ className = '', width = 24, height = 24 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Base / Gourd */}
      <circle cx="50" cy="75" r="20" className="stroke-current" strokeWidth="4" fill="none" />
      <path d="M 35 75 L 65 75" className="stroke-current" strokeWidth="2" />
      
      {/* Bamboo neck splits */}
      <path d="M 50 10 Q 30 30, 32 70" className="stroke-current" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 50 10 Q 70 30, 68 70" className="stroke-current" strokeWidth="4" fill="none" strokeLinecap="round" />
      
      {/* The one string */}
      <line x1="50" y1="15" x2="50" y2="95" className="stroke-current" strokeWidth="2" />
      
      {/* Top peg */}
      <rect x="45" y="8" width="10" height="4" className="fill-current" />
      <circle cx="50" cy="5" r="3" className="fill-current" />
    </svg>
  );
}
