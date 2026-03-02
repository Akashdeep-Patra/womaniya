'use client';

import { motion } from 'framer-motion';

export function AlponaCircle({ className = '', width = 200, height = 200 }: { className?: string; width?: number | string; height?: number | string }) {
  // Redesigned to feature an elegant Bengali woman's profile integrated into the Alpona mandala
  // Highly performant: purely path-based with no heavy SVG filters
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-md`}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <radialGradient id="alponaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Gentle pulsing background aura */}
      <circle 
        cx="100" cy="100" r="95" 
        fill="url(#alponaGlow)" 
        className="animate-pulse-soft"
      />

      <g className="animate-spin-super-slow" style={{ transformOrigin: '100px 100px' }}>
        {/* Outer Connecting Vines/Arches */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <g key={`arch-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <motion.path
              d="M 100 15 Q 115 5, 126 15"
              className="stroke-current"
              strokeWidth="1.5"
              fill="none"
              variants={{
                hidden: { pathLength: 0 },
                visible: { pathLength: 1, transition: { duration: 1, delay: 0.5 + i * 0.05 } }
              }}
            />
            <circle cx="100" cy="5" r="2.5" className="fill-current" />
            <circle cx="100" cy="10" r="1" className="fill-current" />
          </g>
        ))}
        
        {/* Double Outer Rings */}
        <motion.circle 
          cx="100" cy="100" r="92" 
          className="stroke-current" strokeWidth="2" fill="none"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } }
          }}
        />
        <motion.circle 
          cx="100" cy="100" r="96" 
          className="stroke-current" strokeWidth="0.5" fill="none"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut", delay: 0.2 } }
          }}
        />

        {/* Inner Mandala Ring */}
        <motion.circle 
          cx="100" cy="100" r="75" 
          className="stroke-current" strokeWidth="1" strokeDasharray="3 6" fill="none"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1, delay: 1 } }
          }}
        />
      </g>

      {/* The Central Figure - Elegant Bengali Woman Profile (Static inside rotating mandala) */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut", delay: 0.8 } }
        }}
      >
        {/* Face contour */}
        <path d="M 85 60 C 110 60, 115 85, 115 100 C 115 110, 105 125, 100 135 C 95 125, 75 115, 80 95 C 80 85, 75 75, 85 60 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Elegant Eye */}
        <path d="M 98 90 Q 105 88, 110 93" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="103" cy="91" r="1.5" className="fill-current" />
        
        {/* Eyebrow */}
        <path d="M 95 82 Q 105 78, 112 85" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Large Bindi */}
        <circle cx="108" cy="80" r="3" className="fill-current" />
        
        {/* Nose Ring (Nath) */}
        <circle cx="116" cy="108" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 116 112 Q 105 115, 95 105" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Hair and Bun */}
        <path d="M 85 60 C 60 70, 65 110, 80 120 C 65 110, 50 80, 85 60 Z" fill="currentColor" />
        <circle cx="70" cy="95" r="15" className="fill-current" />
        <circle cx="70" cy="95" r="17" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

        {/* Elegant Saree Drape Lines */}
        <path d="M 100 135 C 120 145, 130 160, 130 175" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 85 120 C 60 140, 70 170, 75 175" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 95 130 C 110 150, 115 170, 115 175" fill="none" stroke="currentColor" strokeWidth="1" />
      </motion.g>

    </motion.svg>
  );
}