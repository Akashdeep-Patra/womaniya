'use client';

import { motion } from 'framer-motion';

export function LoomIcon({
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
        <motion.path d="M14 12 L50 12 M14 52 L50 52" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
        <motion.path d="M18 10 L18 54 M46 10 L46 54" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }} />
        
        {/* Threads */}
        <g strokeWidth="0.75" opacity="0.7">
          {[22, 26, 30, 34, 38, 42].map((x, i) => (
            <motion.line key={`v-${i}`} x1={x} y1={12} x2={x} y2={52} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }} />
          ))}
        </g>
        
        <g strokeWidth="1">
          {[24, 28, 32, 36].map((y, i) => (
            <motion.line key={`h-${i}`} x1={18} y1={y} x2={46} y2={y} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 + i * 0.1 }} />
          ))}
        </g>

        {/* Shuttle weaving through */}
        <motion.path 
          d="M 16 44 L 22 41 L 42 41 L 48 44 L 42 47 L 22 47 Z" 
          strokeWidth="1.2"
          initial={{ x: -10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
        />
        <motion.circle cx="32" cy="44" r="1.5" fill={color} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2 }} />
      </g>
    </svg>
  );
}
