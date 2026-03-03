'use client';

import { motion } from 'framer-motion';

export function AbstractConnectionIcon({
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
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={`${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="connGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <motion.g 
        fill="none" 
        stroke="url(#connGradient)" 
        strokeLinecap="round"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Two abstract overlapping teardrop / hand shapes */}
        <motion.path 
          d="M 30 70 C 10 70, 10 40, 30 30 C 50 20, 60 40, 50 60 C 45 70, 35 70, 30 70 Z" 
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        <motion.path 
          d="M 70 30 C 90 30, 90 60, 70 70 C 50 80, 40 60, 50 40 C 55 30, 65 30, 70 30 Z" 
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Inner intricate lines mapping the contour */}
        <motion.path 
          d="M 32 65 C 16 65, 16 42, 32 34 C 47 26, 55 42, 47 58 C 43 65, 36 65, 32 65 Z" 
          strokeWidth="0.75" opacity="0.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.path 
          d="M 68 35 C 84 35, 84 58, 68 66 C 53 74, 45 58, 53 42 C 57 35, 64 35, 68 35 Z" 
          strokeWidth="0.75" opacity="0.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
        />

        {/* Central connecting core lines */}
        <motion.path 
          d="M 40 50 C 45 40, 55 40, 60 50 C 55 60, 45 60, 40 50 Z" 
          strokeWidth="1" opacity="0.8"
          initial={{ pathLength: 0, fill: "transparent" }}
          whileInView={{ pathLength: 1, fill: `${color}1A` }} // 1A is ~10% opacity
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
        />
        
        {/* Orbiting dot representing collaboration/energy */}
        <motion.circle 
          cx="50" cy="25" r="2" fill={color} stroke="none"
          animate={{
            cx: [50, 75, 50, 25, 50],
            cy: [25, 50, 75, 50, 25],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.g>
    </svg>
  );
}
