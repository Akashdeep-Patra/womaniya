'use client';

import { motion } from 'framer-motion';

export function LotusMedallion({
  className = '',
  color = '#C5A059',
  size = 64,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  const c = 32;
  return (
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width={size} 
      height={size} 
      className={className} 
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={c} cy={c} r="30" fill="url(#lotusGlow)" />
      
      <motion.circle 
        cx={c} cy={c} r="28" 
        fill="none" stroke={color} strokeWidth="0.7" opacity="0.4" 
        strokeDasharray="4 4"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '32px 32px' }}
      />
      <circle cx={c} cy={c} r="24" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      
      <g transform={`translate(${c},${c})`}>
        {/* Outer 12 Petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const px = Number((Math.cos(a) * 14).toFixed(4));
          const py = Number((Math.sin(a) * 14).toFixed(4));
          return (
            <motion.path
              key={`outer-${i}`}
              d="M 0 -6 C 4 -2, 4 2, 0 6 C -4 2, -4 -2, 0 -6 Z"
              fill={color} opacity="0.35"
              transform={`translate(${px},${py}) rotate(${i * 30 + 90})`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
          );
        })}
        
        {/* Inner 8 Petals */}
        <motion.g
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const px = Number((Math.cos(a) * 8).toFixed(4));
            const py = Number((Math.sin(a) * 8).toFixed(4));
            return (
              <motion.path
                key={`inner-${i}`}
                d="M 0 -4 C 2 -1, 2 1, 0 4 C -2 1, -2 -1, 0 -4 Z"
                fill={color} opacity="0.6"
                transform={`translate(${px},${py}) rotate(${i * 45 + 90})`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
              />
            );
          })}
        </motion.g>

        {/* Core */}
        <motion.circle 
          r="4" 
          fill={color} 
          opacity="0.8" 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle r="1.5" fill="#E63946" opacity="0.9" />
        
        {/* Decorative inner dots */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle 
            key={`dot-${i}`}
            cx={Math.cos((i * 45 * Math.PI) / 180) * 6}
            cy={Math.sin((i * 45 * Math.PI) / 180) * 6}
            r="0.5"
            fill="#F9F6F0"
          />
        ))}
      </g>
    </motion.svg>
  );
}
