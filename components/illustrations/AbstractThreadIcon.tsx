'use client';

import { motion } from 'framer-motion';

export function AbstractThreadIcon({
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
        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.9" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <motion.g 
        fill="none" 
        stroke="url(#threadGradient)" 
        strokeLinecap="round"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Main Sensual Curves - Figure 8 / Infinity Flow */}
        <motion.path 
          d="M 20 50 C 20 20, 50 20, 50 50 C 50 80, 80 80, 80 50 C 80 20, 50 20, 50 50 C 50 80, 20 80, 20 50 Z" 
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        
        {/* Overlapping offset paths for depth and 'thread' look */}
        <motion.path 
          d="M 23 50 C 23 24, 48 24, 48 50 C 48 76, 77 76, 77 50 C 77 24, 48 24, 48 50 C 48 76, 23 76, 23 50 Z" 
          strokeWidth="1"
          opacity="0.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
        />

        <motion.path 
          d="M 17 50 C 17 16, 52 16, 52 50 C 52 84, 83 84, 83 50 C 83 16, 52 16, 52 50 C 52 84, 17 84, 17 50 Z" 
          strokeWidth="0.75"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
        />

        <motion.path 
          d="M 26 50 C 26 28, 46 28, 46 50 C 46 72, 74 72, 74 50 C 74 28, 46 28, 46 50 C 46 72, 26 72, 26 50 Z" 
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.6 }}
        />
      </motion.g>

      {/* Pulsing focal point */}
      <motion.circle 
        cx="50" cy="50" r="2" 
        fill={color}
        filter="url(#glow)"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        viewport={{ once: true }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </svg>
  );
}
