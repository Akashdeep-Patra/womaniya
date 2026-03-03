'use client';

import { motion } from 'framer-motion';

export function CharkhaIcon({
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
        {/* Base Frame */}
        <motion.path d="M 10 50 L 54 50" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        <motion.path d="M 14 50 L 14 42 M 50 50 L 50 42" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} />
        <motion.path d="M 10 42 L 54 42" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />

        {/* Right Wheel Support */}
        <motion.path d="M 44 42 L 44 26 M 50 42 L 50 26" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1 }} />
        
        {/* Left Spindle Support */}
        <motion.path d="M 18 42 L 18 30 M 24 42 L 24 30" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1 }} />
        
        {/* The Big Wheel */}
        <motion.circle 
          cx="47" cy="26" r="14" 
          initial={{ pathLength: 0 }} 
          whileInView={{ pathLength: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.5 }} 
        />
        {/* Wheel Spokes */}
        <g opacity="0.6" strokeWidth="1">
          {[0, 45, 90, 135].map((angle, i) => (
            <motion.line 
              key={i}
              x1="47" y1="12" x2="47" y2="40" 
              transform={`rotate(${angle} 47 26)`}
              initial={{ pathLength: 0 }} 
              whileInView={{ pathLength: 1 }} 
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2 + i * 0.2 }} 
            />
          ))}
        </g>
        
        {/* Drive Band (string connecting wheel to spindle) */}
        <motion.path 
          d="M 47 12 L 21 28 L 47 40" 
          strokeWidth="0.75" opacity="0.8"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 3 }} 
        />

        {/* Spindle Rod */}
        <motion.path d="M 14 30 L 28 30" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.5 }} />
      </g>
    </svg>
  );
}
