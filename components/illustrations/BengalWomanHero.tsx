'use client';

import { motion } from 'framer-motion';

export function BengalWomanHero({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <motion.svg
        viewBox="0 0 800 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain drop-shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <defs>
          <linearGradient id="skinGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#A86F45" />
          </linearGradient>
          
          <linearGradient id="sareeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9F6F0" />
            <stop offset="100%" stopColor="#E5DFD3" />
          </linearGradient>

          <linearGradient id="sareeBorder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9B7A3D" />
          </linearGradient>

          <linearGradient id="sindoorRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#9E141E" />
          </linearGradient>
        </defs>

        {/* Ambient Background Aura - Replaced heavy filter with simple opacity layer */}
        <motion.circle
          cx="400"
          cy="450"
          r="300"
          fill="url(#sareeBorder)"
          opacity="0.08"
          animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Simple Arch Background */}
        <path
          d="M 200 1000 L 200 450 C 200 250, 400 150, 400 150 C 400 150, 600 250, 600 450 L 600 1000 Z"
          fill="currentColor"
          className="text-bengal-kansa/5"
        />

        {/* Ethereal Floating Lotus Motifs - Simplified */}
        {[
          { x: 250, y: 350, scale: 0.8, delay: 0 },
          { x: 550, y: 400, scale: 1.1, delay: 1.5 },
          { x: 220, y: 600, scale: 0.6, delay: 0.8 },
          { x: 600, y: 650, scale: 0.9, delay: 2.2 }
        ].map((lotus, i) => (
          <motion.g
            key={`lotus-${i}`}
            transform={`translate(${lotus.x}, ${lotus.y}) scale(${lotus.scale})`}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: lotus.delay }}
            opacity="0.8"
          >
            <path d="M 0 0 C -20 -30, -40 -10, 0 -50 C 40 -10, 20 -30, 0 0 Z" fill="url(#sindoorRed)" opacity="0.8" />
            <circle cx="0" cy="-10" r="5" fill="url(#sareeBorder)" />
          </motion.g>
        ))}

        {/* The Figure - Elegant Bengali Woman */}
        <motion.g 
          transform="translate(400, 620)"
          animate={{ y: [0, -6, 0] }} // Gentle breathing
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Back Hair */}
          <path
            d="M -120 -150 C -180 -100, -160 50, -80 120 C 0 160, 120 120, 140 20 C 160 -80, 100 -200, 0 -220 C -80 -230, -100 -180, -120 -150 Z"
            fill="#111111"
          />

          {/* Neck and Shoulders */}
          <path d="M -40 -50 L -50 80 C -100 120, -150 150, -200 250 L 200 250 C 150 150, 100 120, 50 80 L 40 -50 Z" fill="url(#skinGlow)" />
          
          {/* Face Contour */}
          <path
            d="M -70 -180 C -80 -100, -60 -20, 0 10 C 60 -20, 80 -100, 70 -180 C 60 -250, -60 -250, -70 -180 Z"
            fill="url(#skinGlow)"
            stroke="#111111"
            strokeWidth="2"
          />
          
          {/* Front Hair & Bun */}
          <path d="M -70 -180 C -40 -200, 0 -220, 0 -220 C 0 -220, 40 -200, 70 -180 C 80 -250, -80 -250, -70 -180 Z" fill="#1A1A1A" />
          <path d="M -70 -180 C -90 -120, -80 -60, -75 -40 C -85 -80, -95 -140, -70 -180 Z" fill="#111111" />
          <path d="M 70 -180 C 90 -120, 80 -60, 75 -40 C 85 -80, 95 -140, 70 -180 Z" fill="#111111" />
          
          {/* Floral Gajra */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const r = 90;
            const cx = Math.cos(angle) * r;
            const cy = -190 + Math.sin(angle) * (r * 0.4);
            if (cy > -180) return null;
            return <circle key={`flower-${i}`} cx={cx} cy={cy} r="8" fill="#F9F6F0" opacity="0.9" />;
          })}

          {/* Majestic Large Teep (Bindi) */}
          <circle cx="0" cy="-160" r="14" fill="url(#sindoorRed)" />
          <circle cx="0" cy="-160" r="15" stroke="url(#sareeBorder)" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />

          {/* Expressive Potchitra Eyes */}
          <g transform="translate(0, -20)">
            {/* Left Eye */}
            <path d="M -50 -90 Q -25 -110, -10 -85 Q -25 -80, -50 -90 Z" fill="#F9F6F0" />
            <path d="M -50 -90 Q -25 -115, -10 -85" stroke="#111" strokeWidth="4" fill="none" />
            <circle cx="-30" cy="-93" r="5" fill="#111" />
            <circle cx="-31" cy="-94" r="1.5" fill="#FFF" />
            <path d="M -55 -85 C -65 -80, -70 -75, -75 -65" stroke="#111" strokeWidth="2" fill="none" />
            
            {/* Right Eye */}
            <path d="M 50 -90 Q 25 -110, 10 -85 Q 25 -80, 50 -90 Z" fill="#F9F6F0" />
            <path d="M 50 -90 Q 25 -115, 10 -85" stroke="#111" strokeWidth="4" fill="none" />
            <circle cx="30" cy="-93" r="5" fill="#111" />
            <circle cx="31" cy="-94" r="1.5" fill="#FFF" />
            <path d="M 55 -85 C 65 -80, 70 -75, 75 -65" stroke="#111" strokeWidth="2" fill="none" />
            
            {/* Elegant Eyebrows */}
            <path d="M -10 -110 Q -30 -125, -55 -110" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M 10 -110 Q 30 -125, 55 -110" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </g>

          {/* Sculpted Nose and Classic Nath */}
          <path d="M 0 -105 C 5 -80, 10 -60, 12 -50 C 5 -45, -5 -45, -12 -50 C -10 -60, -5 -80, 0 -105" fill="none" stroke="#A86F45" strokeWidth="2" opacity="0.6"/>
          <circle cx="-15" cy="-55" r="18" stroke="url(#sareeBorder)" strokeWidth="2" fill="none" />
          <circle cx="-15" cy="-37" r="3" fill="#E63946" />
          <path d="M -33 -55 Q -60 -60, -75 -100" stroke="url(#sareeBorder)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

          {/* Full Lips */}
          <g transform="translate(0, -10)">
            <path d="M -18 -15 Q 0 -25, 18 -15 Q 0 -15, -18 -15 Z" fill="url(#sindoorRed)" />
            <path d="M -18 -15 Q 0 -5, 18 -15 Q 0 -10, -18 -15 Z" fill="#9E141E" />
          </g>

          {/* Masterful Saree Drape */}
          <path
            d="M -150 120 C -120 180, -80 300, -100 450 L 100 450 C 80 300, 120 180, 150 120 C 100 150, 50 180, 0 180 C -50 180, -100 150, -150 120 Z"
            fill="url(#sareeGradient)"
          />

          {/* Saree Aanchal */}
          <path
            d="M -150 120 C -280 200, -350 350, -250 500 C -150 650, -50 450, -80 250 C -100 180, -120 150, -150 120 Z"
            fill="url(#sindoorRed)"
            opacity="0.95"
          />

          {/* Intricate Zari Border */}
          <path
            d="M -145 125 C -265 205, -330 350, -235 500"
            stroke="url(#sareeBorder)"
            strokeWidth="20"
            fill="none"
          />
          <path
            d="M -145 125 C -265 205, -330 350, -235 500"
            stroke="#9E141E"
            strokeWidth="18"
            strokeDasharray="8 8"
            fill="none"
          />
        </motion.g>

        {/* Foreground Dust/Magic Particles - Simplified and reduced count for perf */}
        {[...Array(8)].map((_, i) => {
          const cx = (i * 97) % 800;
          const cy = (i * 113) % 1000;
          const duration = 5 + (i % 3);

          return (
            <motion.circle
              key={`dust-${i}`}
              cx={cx}
              cy={cy}
              r={2}
              fill="url(#sareeBorder)"
              opacity={0.5}
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.2, 0.6, 0.2] 
              }}
              transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}

      </motion.svg>
    </div>
  );
}