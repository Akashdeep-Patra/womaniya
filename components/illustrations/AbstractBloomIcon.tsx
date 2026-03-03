'use client';

import { motion } from 'framer-motion';

export function AbstractBloomIcon({
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
        <radialGradient id="bloomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="40" fill="url(#bloomGlow)" />

      <motion.g 
        fill="none" 
        stroke={color} 
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Generative organic multi-petal bloom */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const rotation = i * 60;
          return (
            <motion.g key={i} transform={`rotate(${rotation} 50 50)`}>
              {/* Outer organic petal */}
              <motion.path 
                d="M 50 50 C 50 20, 70 10, 50 10 C 30 10, 50 20, 50 50 Z" 
                strokeWidth="1"
                opacity="0.8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut", delay: i * 0.15 }}
              />
              {/* Inner delicate petal */}
              <motion.path 
                d="M 50 50 C 50 30, 60 20, 50 20 C 40 20, 50 30, 50 50 Z" 
                strokeWidth="0.5"
                opacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + i * 0.15 }}
              />
              {/* Central stamen line */}
              <motion.line 
                x1="50" y1="50" x2="50" y2="30" 
                strokeWidth="0.75"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 1 + i * 0.1 }}
              />
              <motion.circle 
                cx="50" cy="28" r="1" 
                fill={color} stroke="none"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
              />
            </motion.g>
          );
        })}

        {/* Slow continuous rotation of the whole bloom for a hypnotic effect */}
        <motion.circle 
          cx="50" cy="50" r="6"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 2 }}
        />
        <motion.circle 
          cx="50" cy="50" r="2"
          fill={color} stroke="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2.5 }}
        />
      </motion.g>
    </svg>
  );
}
