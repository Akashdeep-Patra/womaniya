'use client';

import { motion } from 'framer-motion';

export function BengalVillage({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9F6F0" />
            <stop offset="100%" stopColor="#E5DFD3" />
          </linearGradient>

          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#9E141E" />
          </linearGradient>

          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A4B5B4" />
            <stop offset="100%" stopColor="#7E928F" />
          </linearGradient>

          <linearGradient id="skinVill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#A86F45" />
          </linearGradient>

          <linearGradient id="sareeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8A1C14" />
          </linearGradient>
        </defs>

        {/* Circular Frame / Background */}
        <circle cx="200" cy="200" r="190" fill="url(#skyGrad)" />
        <circle cx="200" cy="200" r="190" stroke="#C5A059" strokeWidth="4" strokeDasharray="10 10" fill="none" opacity="0.4" />

        {/* Sun/Moon - simple vector */}
        <motion.circle
          cx="280"
          cy="120"
          r="45"
          fill="url(#sunGrad)"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Distant Clouds - Performant translation */}
        <motion.g
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          opacity="0.8"
        >
          <path d="M 80 100 Q 100 80, 130 100 Q 150 90, 160 110 Q 140 120, 130 110 Q 100 120, 80 100 Z" fill="#FFF" />
          <path d="M 280 80 Q 300 60, 330 80 Q 350 70, 360 90 Q 340 100, 330 90 Q 300 100, 280 80 Z" fill="#FFF" />
        </motion.g>

        {/* Background Trees Silhouette */}
        <path d="M 10 240 Q 50 180, 100 240 T 200 220 T 300 250 T 390 230 L 390 300 L 10 300 Z" fill="#8E998B" opacity="0.4" />

        {/* Ground / Riverbank */}
        <path d="M 10 280 Q 150 270, 250 280 T 390 290 L 390 390 L 10 390 Z" fill="#A3967C" />

        {/* The River */}
        <path d="M 10 320 Q 100 290, 200 320 T 390 310 L 390 390 L 10 390 Z" fill="url(#riverGrad)" />

        {/* Elegant River Waves (Minimal animation for perf) */}
        <motion.path
          d="M 20 340 Q 80 320, 150 340 T 280 340 T 380 330"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
          fill="none"
          animate={{
            d: [
              "M 20 340 Q 80 320, 150 340 T 280 340 T 380 330",
              "M 20 340 Q 80 350, 150 340 T 280 340 T 380 330",
              "M 20 340 Q 80 320, 150 340 T 280 340 T 380 330"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Village Woman Walking with Kalash (Water Pot) */}
        <motion.g 
          transform="translate(180, 250)"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Kalash (Brass Pot) on waist */}
          <path d="M -35 25 C -45 25, -55 40, -45 55 C -35 70, -15 65, -15 50 C -15 35, -25 25, -35 25 Z" fill="#C5A059" />
          <path d="M -40 25 L -30 25 L -32 20 L -38 20 Z" fill="#C5A059" />

          {/* Saree Drape Body */}
          <path d="M 0 -20 C 30 -10, 40 40, 20 100 L -20 100 C -40 40, -20 0, 0 -20 Z" fill="url(#sareeBlue)" />
          
          {/* Hair Bun Profile */}
          <path d="M -15 -50 C -30 -60, -20 -80, 0 -70 C 15 -60, 5 -40, -15 -50 Z" fill="#1A1A1A" />
          
          {/* Profile Face & Neck */}
          <path d="M 5 -60 C 20 -60, 25 -45, 20 -30 C 15 -20, 5 -20, 0 -30 C -5 -40, -5 -50, 5 -60 Z" fill="url(#skinVill)" />
          <path d="M 0 -30 L -5 -10 L 10 0 L 15 -20 Z" fill="url(#skinVill)" />
          
          {/* Saree Pallu over head (Ghomta) */}
          <path d="M 0 -75 C 30 -70, 40 -30, 20 0 C 10 15, -10 15, -20 -10 C -25 -30, -20 -60, 0 -75 Z" fill="url(#sareeBlue)" opacity="0.95" />
          
          {/* Arm holding Kalash */}
          <path d="M -5 -5 C -20 10, -40 30, -30 45 L -20 40 C -30 30, -10 15, 5 0 Z" fill="url(#skinVill)" />
          
          {/* Zari Border details */}
          <path d="M 0 -75 C 30 -70, 40 -30, 20 0" stroke="#C5A059" strokeWidth="3" fill="none" />
          <path d="M 20 100 L -20 100" stroke="#C5A059" strokeWidth="6" />
        </motion.g>

        {/* Foreground Reeds (Kash Phool) - simplified animation */}
        <motion.g
          animate={{ skewX: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          transform="origin-bottom"
        >
          <path d="M 320 390 Q 310 350, 330 330" stroke="#586B5A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 330 390 Q 335 340, 350 320" stroke="#4A5D4E" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 340 390 Q 355 350, 370 330" stroke="#586B5A" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Fluffy tops */}
          <circle cx="330" cy="330" r="4" fill="#F9F6F0" />
          <circle cx="350" cy="320" r="5" fill="#F9F6F0" />
          <circle cx="370" cy="330" r="3" fill="#F9F6F0" />
        </motion.g>

      </motion.svg>
    </div>
  );
}