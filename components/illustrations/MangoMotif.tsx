'use client';

import { motion } from 'framer-motion';

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
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 80" 
      width={size * 0.8} 
      height={size} 
      className={`${className} drop-shadow-md animate-float-medium`}
      style={{ animationDuration: '4s' }}
      aria-hidden
    >
      <defs>
        <radialGradient id="mangoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="40" r="30" fill="url(#mangoGlow)" />

      <motion.g 
        transform="translate(32, 45)" 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Main Outer Paisley Shape */}
        <motion.path 
          d="M0 -35 C 20 -30, 25 -5, 20 15 C 15 35, 0 35, -5 35 C -10 35, -25 30, -20 15 C -15 -5, -10 -25, 0 -35 Z"
          fill="none" stroke={color} strokeWidth="1.5" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        
        {/* Inner Decorative Curve */}
        <path 
          d="M0 -25 C 12 -20, 15 -2, 12 12 C 9 24, 0 25, -2 25 C -5 25, -15 20, -12 12 C -9 -2, -5 -15, 0 -25 Z"
          fill="none" stroke={color} strokeWidth="1" opacity="0.6" 
        />
        
        {/* Intricate Fill Lines / Veins */}
        <path d="M0 -35 C 0 -15, 0 15, -2 35" stroke={color} strokeWidth="0.5" opacity="0.4" />
        {[...Array(6)].map((_, i) => (
          <path key={`vein-r-${i}`} d={`M -1 ${-15 + i*8} Q 10 ${-20 + i*8} 15 ${-10 + i*8}`} fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
        ))}
        {[...Array(6)].map((_, i) => (
          <path key={`vein-l-${i}`} d={`M -1 ${-10 + i*8} Q -12 ${-15 + i*8} -15 ${-5 + i*8}`} fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
        ))}

        {/* Central Core/Seed */}
        <circle 
          cy="-5" r="3" 
          fill={color} 
          className="animate-pulse-fast"
        />
        <circle cy="-5" r="1.5" fill="#8A1C14" opacity="0.8" />
        
        {/* Outer Dots (Bindi accents) */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * Math.PI) / 4 - Math.PI / 2;
          const rx = 24 + Math.abs(Math.sin(angle)) * 4;
          const ry = 30 + Math.abs(Math.cos(angle)) * 4;
          return (
            <circle 
              key={`dot-${i}`}
              cx={Math.cos(angle) * rx} 
              cy={Math.sin(angle) * ry} 
              r="1" 
              fill={color} 
              opacity="0.5" 
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
