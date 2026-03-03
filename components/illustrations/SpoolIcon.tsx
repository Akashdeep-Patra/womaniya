'use client';

import { motion } from 'framer-motion';

export function SpoolIcon({
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
      viewBox="0 0 64 64" 
      width={size} 
      height={size} 
      className={`${className}`}
      aria-hidden
    >
      <g stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Spool Top and Bottom */}
        <motion.path d="M 22 14 L 42 14 L 38 20 L 26 20 Z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        <motion.path d="M 22 50 L 42 50 L 38 44 L 26 44 Z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
        
        {/* Spool Core */}
        <motion.line x1="26" y1="20" x2="26" y2="44" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />
        <motion.line x1="38" y1="20" x2="38" y2="44" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />

        {/* Thread wrapped around the core */}
        <g strokeWidth="1" opacity="0.8">
          {[24, 28, 32, 36, 40].map((y, i) => (
            <motion.path key={i} d={`M 26 ${y} Q 32 ${y+3} 38 ${y}`} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }} />
          ))}
        </g>

        {/* Unwinding thread */}
        <motion.path 
          d="M 38 32 C 50 32, 54 44, 46 52 C 38 60, 26 50, 16 54 C 10 56, 6 48, 12 42" 
          strokeWidth="1.2"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 1.5 }} 
        />
      </g>
    </svg>
  );
}
