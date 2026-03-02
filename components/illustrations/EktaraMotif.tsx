'use client';

import { motion } from 'framer-motion';

export function EktaraMotif({ className = '', width = 100, height = 100 }: { className?: string; width?: number | string; height?: number | string }) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-md`}
      animate={{ y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="ektaraWood" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A87B51" />
          <stop offset="50%" stopColor="#8A5A44" />
          <stop offset="100%" stopColor="#4A2E1B" />
        </linearGradient>
        
        <linearGradient id="ektaraGourd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2C980" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8A6C35" />
        </linearGradient>

        <linearGradient id="ektaraSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9F6F0" />
          <stop offset="100%" stopColor="#D3C9B8" />
        </linearGradient>

        <filter id="ektaraShadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#3F2E1E" floodOpacity="0.3"/>
        </filter>
      </defs>

      <g filter="url(#ektaraShadow)">
        {/* The Gourd Base (Lau) */}
        <circle cx="50" cy="75" r="22" fill="url(#ektaraGourd)" />
        <circle cx="50" cy="75" r="20" fill="url(#ektaraSkin)" />
        
        {/* Gourd Texture/Shadow */}
        <path d="M 30 75 A 20 20 0 0 0 70 75" fill="none" stroke="#C5A059" strokeWidth="4" opacity="0.4" />
        <path d="M 35 85 A 15 15 0 0 0 65 85" fill="none" stroke="#C5A059" strokeWidth="2" opacity="0.3" />

        {/* Bamboo Neck (Two splits) */}
        <path d="M 50 12 Q 28 35, 30 70" fill="none" stroke="url(#ektaraWood)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 50 12 Q 72 35, 70 70" fill="none" stroke="url(#ektaraWood)" strokeWidth="6" strokeLinecap="round" />

        {/* Top Peg (Kaan) */}
        <rect x="42" y="8" width="16" height="6" rx="2" fill="url(#ektaraWood)" />
        <circle cx="50" cy="5" r="4" fill="url(#ektaraGourd)" />

        {/* The Single String (Ek-tara) */}
        <line x1="50" y1="14" x2="50" y2="75" stroke="#F9F6F0" strokeWidth="1.5" />
        
        {/* String Vibration Animation */}
        <motion.line 
          x1="50" y1="14" x2="50" y2="75" 
          stroke="#C5A059" strokeWidth="1" opacity="0.5"
          animate={{ x1: [49, 51, 49], x2: [49, 51, 49] }}
          transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
        />

        {/* Resonator hole */}
        <circle cx="50" cy="75" r="4" fill="#3F2E1E" />
        <path d="M 45 75 L 55 75" stroke="#3F2E1E" strokeWidth="1" />
      </g>
    </motion.svg>
  );
}
