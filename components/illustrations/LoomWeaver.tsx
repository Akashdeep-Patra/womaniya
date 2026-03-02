'use client';

import { motion } from 'framer-motion';

export function LoomWeaver({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <motion.svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A5A44" />
            <stop offset="50%" stopColor="#6B4226" />
            <stop offset="100%" stopColor="#4A2E1B" />
          </linearGradient>
          <linearGradient id="woodLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A87B51" />
            <stop offset="100%" stopColor="#8A5A44" />
          </linearGradient>
          
          <linearGradient id="sareeRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9E141E" />
            <stop offset="50%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#9E141E" />
          </linearGradient>

          <linearGradient id="goldThread" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2C980" />
            <stop offset="100%" stopColor="#C5A059" />
          </linearGradient>

          <filter id="loomShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#2D1A11" floodOpacity="0.5"/>
          </filter>
        </defs>

        {/* Background Ambience */}
        <circle cx="250" cy="250" r="230" fill="#F9F6F0" opacity="0.8" />
        <circle cx="250" cy="250" r="230" stroke="url(#goldThread)" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.3" />

        {/* Detailed Wooden Loom Frame */}
        <motion.g filter="url(#loomShadow)"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
          }}
        >
          {/* Back Beams */}
          <rect x="80" y="80" width="30" height="340" rx="5" fill="url(#woodGradient)" />
          <rect x="390" y="80" width="30" height="340" rx="5" fill="url(#woodGradient)" />
          
          {/* Cross Beams */}
          <rect x="60" y="100" width="380" height="20" rx="4" fill="url(#woodLight)" />
          <rect x="60" y="400" width="380" height="25" rx="4" fill="url(#woodLight)" />
          
          {/* Roller Beam (Warp Beam) */}
          <rect x="90" y="140" width="320" height="40" rx="10" fill="url(#woodGradient)" />
          {/* Woven Fabric on Roller */}
          <rect x="110" y="135" width="280" height="50" rx="8" fill="url(#sareeRed)" />
          <path d="M 110 160 L 390 160" stroke="#C5A059" strokeWidth="4" strokeDasharray="8 4" opacity="0.6"/>
        </motion.g>

        {/* Tightly Packed Warp Threads (Vertical) */}
        <g opacity="0.7">
          {[...Array(35)].map((_, i) => (
            <line
              key={`warp-${i}`}
              x1={120 + i * 8}
              y1="180"
              x2={120 + i * 8}
              y2="400"
              stroke="#D3C9B8"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* Heddle Frames moving up and down (shedding) */}
        <motion.g
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="100" y="240" width="300" height="15" rx="3" fill="url(#woodLight)" />
          <rect x="100" y="270" width="300" height="15" rx="3" fill="url(#woodLight)" />
          {/* Vertical Heddle Wires */}
          {[...Array(15)].map((_, i) => (
            <line key={`heddle-${i}`} x1={130 + i * 17} y1="240" x2={130 + i * 17} y2="285" stroke="#888" strokeWidth="1" />
          ))}
        </motion.g>

        {/* The Weft / Woven Fabric (Growing) */}
        <motion.g filter="url(#loomShadow)">
          <path d="M 115 350 L 385 350 L 385 410 L 115 410 Z" fill="url(#sareeRed)" />
          {/* Zari Gold Border */}
          <path d="M 115 350 L 140 350 L 140 410 L 115 410 Z" fill="url(#goldThread)" />
          <path d="M 360 350 L 385 350 L 385 410 L 360 410 Z" fill="url(#goldThread)" />
          
          {/* Jamdani Motifs being woven */}
          {[...Array(3)].map((_, i) => (
            <polygon key={`motif-${i}`} points="0,-10 10,0 0,10 -10,0" transform={`translate(${200 + i * 50}, 380)`} fill="url(#goldThread)" />
          ))}
          
          {/* Animated top edge of fabric */}
          <motion.line
            x1="115" y1="350" x2="385" y2="350"
            stroke="url(#goldThread)" strokeWidth="3"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* The Shuttle (Maku) flying back and forth */}
        <motion.g
          animate={{ x: [110, 360, 110] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          {/* Shuttle Body */}
          <path d="M 0 345 L 30 335 L 60 345 L 30 355 Z" fill="url(#woodGradient)" />
          {/* Thread Spool inside shuttle */}
          <ellipse cx="30" cy="345" rx="8" ry="4" fill="#E63946" />
          <line x1="15" y1="345" x2="45" y2="345" stroke="#C5A059" strokeWidth="1" />
        </motion.g>

        {/* Floating Ambient Cotton Dust */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={`dust-${i}`}
            cx={100 + Math.random() * 300}
            cy={100 + Math.random() * 300}
            r={Math.random() * 2 + 1}
            fill="#FFF"
            opacity={Math.random() * 0.5 + 0.2}
            animate={{ 
              y: [0, -40, 0], 
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.8, 0] 
            }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Abstract Elegant Hands of the Artisan */}
        <motion.g
          animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left Hand */}
          <path d="M 40 360 C 80 340, 100 345, 110 350 C 115 355, 100 365, 80 370 C 60 375, 40 380, 40 360 Z" fill="#C48B58" filter="url(#loomShadow)" />
          {/* Right Hand */}
          <motion.path 
            d="M 460 360 C 420 340, 400 345, 390 350 C 385 355, 400 365, 420 370 C 440 375, 460 380, 460 360 Z" 
            fill="#C48B58" 
            filter="url(#loomShadow)"
            animate={{ y: [10, 0, 10], rotate: [2, 0, 2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
          />
          {/* Red Pola & White Shankha Bangles on wrists */}
          <path d="M 55 353 L 65 373" stroke="#9E141E" strokeWidth="6" strokeLinecap="round" />
          <path d="M 45 355 L 55 375" stroke="#F9F6F0" strokeWidth="5" strokeLinecap="round" />
          
          <path d="M 445 353 L 435 373" stroke="#9E141E" strokeWidth="6" strokeLinecap="round" />
          <path d="M 455 355 L 445 375" stroke="#F9F6F0" strokeWidth="5" strokeLinecap="round" />
        </motion.g>

      </motion.svg>
    </div>
  );
}
