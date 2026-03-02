'use client';

import { motion } from 'framer-motion';

/**
 * Jamdani Diamond Motif — inspired by traditional Dhakai Jamdani patterns.
 * Geometric diamond lattice with stylised lotus at each intersection.
 * Upgraded to be a beautiful, gently pulsating background asset.
 */
export function JamdaniMotif({
  className = '',
  opacity = 0.18,
  color = '#C5A059',
}: {
  className?: string;
  opacity?: number;
  color?: string;
}) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <pattern id="jamdani-tile" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Glowing Aura around intersection */}
          <circle cx="30" cy="30" r="15" fill={color} opacity={opacity * 0.3} />

          {/* Diamond frame - animated drawing effect not possible in pure pattern easily, but we give it a rich stroke */}
          <path
            d="M30 4 L56 30 L30 56 L4 30 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity={opacity * 2.5}
            strokeDasharray="4 2"
          />
          {/* Inner diamond */}
          <path
            d="M30 14 L46 30 L30 46 L14 30 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 2}
          />
          {/* Central lotus — 8 petals with gradient-like look */}
          <g transform="translate(30,30)" opacity={opacity * 4}>
            {/* Base cross petals */}
            <path d="M 0 -10 Q 5 -5, 0 0 Q -5 -5, 0 -10 Z" fill={color} />
            <path d="M 0 10 Q 5 5, 0 0 Q -5 5, 0 10 Z" fill={color} />
            <path d="M -10 0 Q -5 -5, 0 0 Q -5 5, -10 0 Z" fill={color} />
            <path d="M 10 0 Q 5 -5, 0 0 Q 5 5, 10 0 Z" fill={color} />
            
            {/* Diagonal petals */}
            <ellipse cx="-5" cy="-5" rx="1.5" ry="4" transform="rotate(-45,-5,-5)" fill={color} opacity="0.8" />
            <ellipse cx="5"  cy="-5" rx="1.5" ry="4" transform="rotate(45,5,-5)"  fill={color} opacity="0.8" />
            <ellipse cx="-5" cy="5"  rx="1.5" ry="4" transform="rotate(45,-5,5)"  fill={color} opacity="0.8" />
            <ellipse cx="5"  cy="5"  rx="1.5" ry="4" transform="rotate(-45,5,5)"  fill={color} opacity="0.8" />
            
            {/* Pollen dot */}
            <circle cx="0" cy="0" r="2.5" fill={color} />
            <circle cx="0" cy="0" r="1.2" fill="#E63946" opacity="0.9" /> {/* Pop of red */}
          </g>
          {/* Corner dots with glow */}
          <circle cx="0"  cy="0"  r="2" fill={color} opacity={opacity * 2.5} />
          <circle cx="60" cy="0"  r="2" fill={color} opacity={opacity * 2.5} />
          <circle cx="0"  cy="60" r="2" fill={color} opacity={opacity * 2.5} />
          <circle cx="60" cy="60" r="2" fill={color} opacity={opacity * 2.5} />
          
          {/* Connecting Web Lines */}
          <line x1="0" y1="30" x2="10" y2="30" stroke={color} strokeWidth="0.5" opacity={opacity} />
          <line x1="50" y1="30" x2="60" y2="30" stroke={color} strokeWidth="0.5" opacity={opacity} />
          <line x1="30" y1="0" x2="30" y2="10" stroke={color} strokeWidth="0.5" opacity={opacity} />
          <line x1="30" y1="50" x2="30" y2="60" stroke={color} strokeWidth="0.5" opacity={opacity} />

          {/* Diamond tips cross-marks */}
          <path d="M30 4 L30 0 M30 56 L30 60 M4 30 L0 30 M56 30 L60 30"
            stroke={color} strokeWidth="0.8" opacity={opacity * 3} />
        </pattern>
      </defs>
      
      {/* We use framer-motion to slowly drift the pattern across the rect */}
      <motion.rect 
        width="200%" 
        height="200%" 
        fill="url(#jamdani-tile)" 
        animate={{ x: [0, -60], y: [0, -60] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </motion.svg>
  );
}
