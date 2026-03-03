'use client';

import { motion } from 'framer-motion';

export function AbstractDrapeIcon({
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
        <linearGradient id="drapeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <motion.g 
        fill="none" 
        strokeLinecap="round"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Sensual, flowing fabric draping lines */}
        {[
          { d: "M 20 10 C 40 40, 20 70, 50 90", w: 1.5, o: 1, delay: 0 },
          { d: "M 35 10 C 55 40, 35 70, 65 90", w: 1.25, o: 0.8, delay: 0.2 },
          { d: "M 50 10 C 70 40, 50 70, 80 90", w: 1, o: 0.6, delay: 0.4 },
          { d: "M 65 10 C 85 40, 65 70, 90 85", w: 0.75, o: 0.4, delay: 0.6 },
          { d: "M 10 15 C 25 45, 10 65, 35 85", w: 0.5, o: 0.3, delay: 0.8 },
        ].map((line, i) => (
          <motion.path 
            key={i}
            d={line.d} 
            stroke="url(#drapeGradient)"
            strokeWidth={line.w}
            opacity={line.o}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: line.delay }}
          />
        ))}

        {/* Horizontal intersecting woven waves */}
        <motion.path 
          d="M 10 40 C 40 20, 60 60, 90 30" 
          stroke={color} strokeWidth="0.5" opacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
        />
        <motion.path 
          d="M 15 60 C 45 40, 65 80, 85 50" 
          stroke={color} strokeWidth="0.5" opacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Floating ethereal dust/zari specs */}
        {[
          { cx: 30, cy: 30, r: 1 },
          { cx: 70, cy: 50, r: 1.5 },
          { cx: 45, cy: 75, r: 1 },
          { cx: 80, cy: 20, r: 0.75 },
        ].map((dot, i) => (
          <motion.circle 
            key={`dot-${i}`}
            cx={dot.cx} cy={dot.cy} r={dot.r} 
            fill={color} stroke="none"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5 + i * 0.2 }}
          />
        ))}
      </motion.g>
    </svg>
  );
}
