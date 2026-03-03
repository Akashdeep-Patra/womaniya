'use client';

import { motion } from 'framer-motion';

export function CottonIcon({
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
        {/* Stem and sepals */}
        <motion.path d="M 32 58 L 32 44" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        <motion.path d="M 32 44 Q 22 40 18 32" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
        <motion.path d="M 32 44 Q 42 40 46 32" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
        <motion.path d="M 32 44 Q 26 36 28 28" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
        <motion.path d="M 32 44 Q 38 36 36 28" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />

        {/* Cotton Boll Fluffs */}
        <motion.path 
          d="M 18 32 C 10 28, 12 16, 20 16 C 24 16, 26 20, 28 22 C 30 14, 34 14, 36 22 C 38 20, 40 16, 44 16 C 52 16, 54 28, 46 32 C 42 34, 38 34, 36 28 C 34 34, 30 34, 28 28 C 26 34, 22 34, 18 32 Z" 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }} 
          whileInView={{ pathLength: 1, opacity: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }} 
        />
        
        {/* Inner fluff details */}
        <motion.path d="M 22 22 Q 26 24 24 28" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 2 }} />
        <motion.path d="M 42 22 Q 38 24 40 28" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 2 }} />
        <motion.path d="M 32 18 L 32 22" strokeWidth="1" opacity="0.6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 2 }} />
      </g>
    </svg>
  );
}
