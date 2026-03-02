'use client';

import { motion } from 'framer-motion';

export function BengalVillage({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <motion.svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Soft Organic Backdrop (replaces the hard circle) */}
        <motion.path 
          d="M 50 150 C 100 -20, 300 0, 350 150 C 400 300, 350 450, 200 450 C 50 450, 0 300, 50 150 Z" 
          fill="#EAE1D8" 
          opacity="0.4"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* The Sun / Moon */}
        <motion.circle
          cx="280"
          cy="120"
          r="60"
          fill="#E63946"
          opacity="0.9"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Flowing River Silhouette */}
        <motion.path
          d="M 0 350 Q 100 320, 200 350 T 400 340 L 400 500 L 0 500 Z"
          fill="#A4B5B4"
          opacity="0.5"
          animate={{ d: [
            "M 0 350 Q 100 320, 200 350 T 400 340 L 400 500 L 0 500 Z",
            "M 0 350 Q 100 360, 200 350 T 400 380 L 400 500 L 0 500 Z",
            "M 0 350 Q 100 320, 200 350 T 400 340 L 400 500 L 0 500 Z"
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Elegant Village Woman Walking */}
        <motion.g 
          transform="translate(160, 280)"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Saree Drape Body (Base) */}
          <path d="M 0 0 C 60 20, 80 100, 40 200 L -40 200 C -80 100, -40 20, 0 0 Z" fill="#D4A017" />
          
          {/* Saree Pleats */}
          <path d="M -10 100 Q 0 150, 10 200 M 10 100 Q 20 150, 30 200 M -30 100 Q -20 150, -10 200" stroke="#F9F6F0" strokeWidth="3" opacity="0.6" fill="none" />
          
          {/* Pallu (Ghomta) over Head */}
          <path d="M -30 -120 C 40 -110, 60 -30, 20 20 C 0 40, -30 40, -40 -10 C -50 -50, -40 -100, -30 -120 Z" fill="#D4A017" opacity="0.95" />
          
          {/* Zari Border */}
          <path d="M -30 -120 C 40 -110, 60 -30, 20 20" stroke="#8A1C14" strokeWidth="8" fill="none" />
          <path d="M -25 -115 C 40 -105, 55 -30, 15 15" stroke="#C5A059" strokeWidth="3" fill="none" strokeDasharray="4 4" />
          <path d="M 40 200 L -40 200" stroke="#8A1C14" strokeWidth="12" />

          {/* Profile Face & Neck */}
          <path d="M 10 -100 C 40 -100, 50 -70, 40 -40 C 30 -20, 10 -20, 0 -40 C -10 -60, -10 -80, 10 -100 Z" fill="#A86F45" />
          <path d="M 10 -100 C 30 -100, 40 -70, 30 -40 C 20 -20, 0 -20, -10 -40 C -20 -60, -20 -80, 10 -100 Z" fill="#C48B58" />
          <path d="M 0 -40 L -10 -10 L 20 10 L 30 -30 Z" fill="#B37A47" />

          {/* Hair Bun */}
          <path d="M -30 -90 C -60 -110, -40 -140, 0 -120 C 30 -100, 10 -60, -30 -90 Z" fill="#1A1918" />

          {/* Face Details */}
          <path d="M 38 -75 Q 45 -78, 48 -70" stroke="#1A1918" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="28" cy="-80" r="2.5" fill="#8A1C14" />
          
          {/* Brass Pot (Kalash) carried on waist */}
          <path d="M -70 50 C -90 50, -110 80, -90 110 C -70 140, -30 130, -30 100 C -30 70, -50 50, -70 50 Z" fill="#C5A059" />
          <path d="M -80 50 L -60 50 L -64 40 L -76 40 Z" fill="#C5A059" />
          <path d="M -70 50 C -90 50, -110 80, -90 110" stroke="#8A6C35" strokeWidth="3" fill="none" opacity="0.5" />

          {/* Arm holding the Kalash */}
          <path d="M 10 0 C -20 30, -60 70, -40 100 L -20 90 C -40 70, 0 30, 30 0 Z" fill="#C48B58" />
          
          {/* Bangles */}
          <line x1="-35" y1="80" x2="-20" y2="70" stroke="#8A1C14" strokeWidth="5" strokeLinecap="round" />
          <line x1="-32" y1="85" x2="-17" y2="75" stroke="#F9F6F0" strokeWidth="4" strokeLinecap="round" />
        </motion.g>

        {/* Gentle Foreground Reeds/Kash Phool */}
        <motion.g
          animate={{ skewX: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          transform="origin-bottom"
        >
          {[300, 330, 360, 390].map((x, i) => (
            <g key={`reed-${i}`} transform={`translate(${x}, 380)`}>
              <path d="M 0 120 Q -10 50, 10 0" stroke="#586B5A" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="10" cy="0" r="5" fill="#FDF8F2" opacity="0.9" />
            </g>
          ))}
        </motion.g>

      </motion.svg>
    </div>
  );
}