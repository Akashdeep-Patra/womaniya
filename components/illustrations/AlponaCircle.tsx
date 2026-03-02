'use client';

import { motion } from 'framer-motion';

export function AlponaCircle({ className = '', width = 200, height = 200 }: { className?: string; width?: number | string; height?: number | string }) {
  // Complex Alpona pattern with drawing animation
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
      whileHover="hover"
    >
      <defs>
        <radialGradient id="alponaGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle 
        cx="100" cy="100" r="100" 
        fill="url(#alponaGlow)" 
        opacity="0.1" 
        animate={{ scale: [1, 1.05, 1] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
      />

      <motion.g animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        {/* Center Bindu and Star */}
        <circle cx="100" cy="100" r="4" className="fill-current" />
        <motion.path 
          d="M 100 85 L 105 95 L 115 100 L 105 105 L 100 115 L 95 105 L 85 100 L 95 95 Z" 
          className="fill-current"
          variants={{
            hidden: { scale: 0 },
            visible: { scale: 1, transition: { duration: 1, ease: "backOut" } }
          }}
        />

        {/* 1st Layer: Sharp Lotus Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={`layer1-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <motion.path
              d="M 100 80 Q 112 60 100 35 Q 88 60 100 80"
              className="stroke-current"
              strokeWidth="1.5"
              fill="none"
              variants={{
                hidden: { pathLength: 0 },
                visible: { pathLength: 1, transition: { duration: 1.5, delay: 0.2 + i * 0.1 } }
              }}
            />
            {/* Inner detail line */}
            <motion.line x1="100" y1="75" x2="100" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
            <circle cx="100" cy="28" r="2" className="fill-current" />
          </g>
        ))}

        {/* First Circle Boundary */}
        <motion.circle 
          cx="100" cy="100" r="75" 
          className="stroke-current" strokeWidth="1" strokeDasharray="3 6" fill="none"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1, delay: 1 } }
          }}
        />

        {/* 2nd Layer: Curving Mango/Paisley Motifs (Kalka) */}
        {[15, 75, 135, 195, 255, 315].map((angle, i) => (
          <g key={`layer2-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <motion.path
              d="M 100 25 C 130 5, 145 35, 125 45 C 110 52, 90 40, 100 25 Z"
              className="stroke-current"
              strokeWidth="1.5"
              fill="none"
              variants={{
                hidden: { pathLength: 0 },
                visible: { pathLength: 1, transition: { duration: 2, delay: 1.5 + i * 0.15 } }
              }}
            />
            {/* Inner dots inside paisley */}
            <circle cx="118" cy="35" r="1.5" className="fill-current" />
            <circle cx="112" cy="30" r="1" className="fill-current" />
          </g>
        ))}

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
                visible: { pathLength: 1, transition: { duration: 1, delay: 2.5 + i * 0.05 } }
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
            visible: { pathLength: 1, transition: { duration: 3, ease: "easeInOut", delay: 1 } }
          }}
        />
        <motion.circle 
          cx="100" cy="100" r="96" 
          className="stroke-current" strokeWidth="0.5" fill="none"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 3, ease: "easeInOut", delay: 1.2 } }
          }}
        />
      </motion.g>
    </motion.svg>
  );
}
