'use client';

import { motion } from 'framer-motion';

export function BengalVillage({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9F6F0" />
            <stop offset="100%" stopColor="#E5DFD3" />
          </linearGradient>

          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#9E141E" />
          </linearGradient>

          <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A4B5B4" />
            <stop offset="100%" stopColor="#7E928F" />
          </linearGradient>

          <linearGradient id="hutRoof" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8A6C35" />
          </linearGradient>

          <linearGradient id="hutWall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EAD8C0" />
            <stop offset="100%" stopColor="#D4BA9A" />
          </linearGradient>

          <filter id="villageShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3F2E1E" floodOpacity="0.2"/>
          </filter>

          <filter id="sunGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Circular Frame / Background */}
        <circle cx="200" cy="200" r="190" fill="url(#skyGradient)" />
        <circle cx="200" cy="200" r="190" stroke="#C5A059" strokeWidth="4" strokeDasharray="10 10" fill="none" opacity="0.4" />

        {/* Sun/Moon */}
        <motion.circle
          cx="280"
          cy="120"
          r="45"
          fill="url(#sunGradient)"
          filter="url(#sunGlow)"
          variants={{
            hidden: { y: 100, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 2, ease: "easeOut" } }
          }}
        />

        {/* Distant Clouds */}
        <motion.g
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          opacity="0.6"
        >
          <path d="M 80 100 Q 100 80, 130 100 Q 150 90, 160 110 Q 140 120, 130 110 Q 100 120, 80 100 Z" fill="#FFF" />
          <path d="M 280 80 Q 300 60, 330 80 Q 350 70, 360 90 Q 340 100, 330 90 Q 300 100, 280 80 Z" fill="#FFF" />
        </motion.g>

        {/* Background Trees / Forest Silhouette */}
        <motion.path
          d="M 10 240 Q 50 180, 100 240 T 200 220 T 300 250 T 390 230 L 390 300 L 10 300 Z"
          fill="#8E998B"
          opacity="0.5"
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 0.5, transition: { duration: 1.5, delay: 0.3 } }
          }}
        />

        {/* Banana Tree / Palm Tree on the left */}
        <motion.g
          variants={{
            hidden: { scaleY: 0, originY: 1 },
            visible: { scaleY: 1, transition: { duration: 1.2, delay: 0.8, ease: "easeOut" } }
          }}
        >
          {/* Trunk */}
          <path d="M 70 280 Q 80 200, 75 140 Q 65 200, 60 280 Z" fill="#5C4D3C" />
          {/* Leaves */}
          <motion.g animate={{ rotate: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M 75 140 Q 130 100, 140 150 Q 100 150, 75 140 Z" fill="#4A5D4E" />
            <path d="M 75 140 Q 90 80, 130 90 Q 100 110, 75 140 Z" fill="#3D4D40" />
            <path d="M 75 140 Q 30 100, 20 150 Q 50 150, 75 140 Z" fill="#4A5D4E" />
            <path d="M 75 140 Q 50 80, 10 90 Q 40 110, 75 140 Z" fill="#3D4D40" />
            <path d="M 75 140 Q 75 70, 95 60 Q 80 100, 75 140 Z" fill="#586B5A" />
            <path d="M 75 140 Q 75 70, 55 60 Q 70 100, 75 140 Z" fill="#586B5A" />
          </motion.g>
        </motion.g>

        {/* Central Traditional Bengali Hut (Do-chaala) */}
        <motion.g
          filter="url(#villageShadow)"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 1.2 } }
          }}
        >
          {/* Wall */}
          <rect x="150" y="210" width="120" height="70" fill="url(#hutWall)" />
          {/* Wall Texture/Lines */}
          {[...Array(5)].map((_, i) => (
            <line key={`wall-line-${i}`} x1={150} y1={220 + i * 12} x2={270} y2={220 + i * 12} stroke="#B8A082" strokeWidth="1" opacity="0.5" />
          ))}
          {/* Door */}
          <path d="M 195 240 L 225 240 L 225 280 L 195 280 Z" fill="#5C4D3C" />
          <path d="M 195 240 C 210 230, 225 240, 225 240 L 195 240 Z" fill="#3F2E1E" />
          {/* Window */}
          <rect x="160" y="245" width="20" height="20" fill="#3F2E1E" />
          <line x1="170" y1="245" x2="170" y2="265" stroke="#B8A082" strokeWidth="1" />
          <line x1="160" y1="255" x2="180" y2="255" stroke="#B8A082" strokeWidth="1" />
          
          {/* Roof (Chaala) */}
          <path d="M 130 220 C 180 150, 240 150, 290 220 L 270 230 C 230 180, 190 180, 150 230 Z" fill="url(#hutRoof)" />
          <path d="M 140 215 C 185 155, 235 155, 280 215" stroke="#FFF" strokeWidth="2" opacity="0.3" fill="none" />
          
          {/* Roof Texture Lines */}
          {[...Array(8)].map((_, i) => (
            <path key={`roof-line-${i}`} d={`M ${150 + i*15} 220 C ${170 + i*10} 180, ${180 + i*5} 170, ${190 + i*5} 165`} stroke="#8A6C35" strokeWidth="1" fill="none" opacity="0.6"/>
          ))}
        </motion.g>

        {/* Ground / Riverbank */}
        <motion.path
          d="M 10 280 Q 150 270, 250 280 T 390 290 L 390 390 L 10 390 Z"
          fill="#A3967C"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } }
          }}
        />

        {/* River */}
        <motion.path
          d="M 10 320 Q 100 290, 200 320 T 390 310 L 390 390 L 10 390 Z"
          fill="url(#riverGradient)"
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 1.5, delay: 1.5 } }
          }}
        />

        {/* Animated River Waves */}
        <motion.path
          d="M 20 340 Q 80 320, 150 340 T 280 340 T 380 330"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
          fill="none"
          animate={{
            d: [
              "M 20 340 Q 80 320, 150 340 T 280 340 T 380 330",
              "M 20 340 Q 80 360, 150 340 T 280 340 T 380 330",
              "M 20 340 Q 80 320, 150 340 T 280 340 T 380 330"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 50 360 Q 120 340, 190 360 T 320 360 T 390 350"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.2"
          fill="none"
          animate={{
            d: [
              "M 50 360 Q 120 340, 190 360 T 320 360 T 390 350",
              "M 50 360 Q 120 380, 190 360 T 320 360 T 390 350",
              "M 50 360 Q 120 340, 190 360 T 320 360 T 390 350"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Detailed Boat (Nouka) */}
        <motion.g
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: [0, 15, 0], y: [0, 3, 0], rotate: [0, 1, 0], opacity: 1 }}
          transition={{ 
            opacity: { duration: 1, delay: 2 },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Boat Body */}
          <path d="M 80 330 C 100 350, 160 350, 180 330 L 170 345 C 150 360, 110 360, 90 345 Z" fill="#3F2E1E" filter="url(#villageShadow)" />
          <path d="M 80 330 C 100 350, 160 350, 180 330 L 175 335 C 150 355, 110 355, 85 335 Z" fill="#5C4D3C" />
          
          {/* Boat Hood/Cover (Chhauni) */}
          <path d="M 110 335 C 110 310, 150 310, 150 335 Z" fill="#D4BA9A" />
          <path d="M 115 335 C 115 315, 145 315, 145 335 Z" fill="#B8A082" />
          <path d="M 110 335 C 110 310, 150 310, 150 335 Z" stroke="#8A6C35" strokeWidth="1.5" fill="none" />
          
          {/* Oar */}
          <line x1="160" y1="325" x2="190" y2="350" stroke="#3F2E1E" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Foreground Grass/Reeds (Kash Phool) */}
        <motion.g
          animate={{ skewX: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          transform="origin-bottom"
        >
          <path d="M 320 390 Q 310 350, 330 330" stroke="#586B5A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 330 390 Q 335 340, 350 320" stroke="#4A5D4E" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 340 390 Q 355 350, 370 330" stroke="#586B5A" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* White tops for Kash Phool */}
          <circle cx="330" cy="330" r="4" fill="#FFF" opacity="0.8" filter="blur(1px)"/>
          <circle cx="350" cy="320" r="5" fill="#FFF" opacity="0.8" filter="blur(1px)"/>
          <circle cx="370" cy="330" r="3" fill="#FFF" opacity="0.8" filter="blur(1px)"/>
        </motion.g>

      </motion.svg>
    </div>
  );
}
