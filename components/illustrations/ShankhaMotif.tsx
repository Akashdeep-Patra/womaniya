'use client';

import { motion } from 'framer-motion';

export function ShankhaMotif({ className = '', width = 100, height = 100 }: { className?: string; width?: number | string; height?: number | string }) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-lg`}
      animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="shankhaBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F9F6F0" />
          <stop offset="100%" stopColor="#D3C9B8" />
        </linearGradient>

        <linearGradient id="shankhaShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D3C9B8" />
          <stop offset="100%" stopColor="#A89F8F" />
        </linearGradient>

        <linearGradient id="shankhaGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#E2C980" />
          <stop offset="100%" stopColor="#9B7A3D" />
        </linearGradient>
      </defs>

      <g>
        {/* Main Body of the Conch */}
        <path
          d="M 15 50 Q 5 15, 40 10 T 85 45 Q 95 75, 70 90 T 15 85 Z"
          fill="url(#shankhaBody)"
        />
        
        {/* Core Shadow/Depth for 3D effect */}
        <path
          d="M 15 50 Q 5 15, 40 10 T 85 45 Q 90 60, 75 75 T 25 70 Z"
          fill="url(#shankhaShadow)"
          opacity="0.3"
        />

        {/* Intricate Swirls/Spirals (The natural ridges) */}
        <path
          d="M 35 25 C 45 15, 65 20, 75 35"
          stroke="url(#shankhaGold)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 25 45 C 45 25, 75 35, 80 60"
          stroke="url(#shankhaGold)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 25 65 C 45 45, 75 55, 65 80"
          stroke="url(#shankhaGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 35 80 C 45 65, 60 70, 55 85"
          stroke="url(#shankhaGold)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* The Tip (Mouth of the shell) */}
        <circle cx="18" cy="48" r="6" fill="url(#shankhaShadow)" />
        <circle cx="16" cy="46" r="3" fill="#3F2E1E" opacity="0.8" />
        
        {/* Golden Adornment around the tip */}
        <path d="M 10 40 Q 25 35, 30 50 Q 25 65, 10 60" fill="none" stroke="url(#shankhaGold)" strokeWidth="2" />
        
        {/* Vermilion (Sindoor) dots representing a holy item */}
        <circle cx="50" cy="25" r="2.5" fill="#E63946" />
        <circle cx="70" cy="50" r="2" fill="#E63946" />
        <circle cx="55" cy="75" r="1.5" fill="#E63946" />
      </g>
    </motion.svg>
  );
}
