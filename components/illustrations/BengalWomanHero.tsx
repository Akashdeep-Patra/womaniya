'use client';

import { motion } from 'framer-motion';

export function BengalWomanHero({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      <motion.svg
        viewBox="0 0 800 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <defs>
          <linearGradient id="skinGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="50%" stopColor="#C48B58" />
            <stop offset="100%" stopColor="#A86F45" />
          </linearGradient>
          
          <linearGradient id="sareeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9F6F0" />
            <stop offset="100%" stopColor="#E5DFD3" />
          </linearGradient>

          <linearGradient id="sareeBorder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="50%" stopColor="#E2C980" />
            <stop offset="100%" stopColor="#9B7A3D" />
          </linearGradient>

          <linearGradient id="sindoorRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#9E141E" />
          </linearGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#3F2E1E" floodOpacity="0.3"/>
          </filter>

          <filter id="glowEffect">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Background Aura */}
        <motion.circle
          cx="400"
          cy="450"
          r="300"
          fill="url(#sareeBorder)"
          opacity="0.05"
          filter="url(#glowEffect)"
          animate={{ scale: [1, 1.05, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Majestic Temple Arch Background */}
        <motion.path
          d="M 150 1000 L 150 450 C 150 250, 400 100, 400 100 C 400 100, 650 250, 650 450 L 650 1000 Z"
          fill="currentColor"
          className="text-bengal-kansa/5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.path
          d="M 180 1000 L 180 460 C 180 280, 400 140, 400 140 C 400 140, 620 280, 620 460 L 620 1000"
          stroke="url(#sareeBorder)"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Ethereal Floating Lotus Motifs */}
        {[
          { x: 220, y: 350, scale: 0.8, delay: 0 },
          { x: 600, y: 400, scale: 1.1, delay: 1.5 },
          { x: 180, y: 600, scale: 0.6, delay: 0.8 },
          { x: 650, y: 650, scale: 0.9, delay: 2.2 }
        ].map((lotus, i) => (
          <motion.g
            key={`lotus-${i}`}
            transform={`translate(${lotus.x}, ${lotus.y}) scale(${lotus.scale})`}
            animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: lotus.delay }}
            opacity="0.8"
          >
            <path d="M 0 0 C -20 -30, -40 -10, 0 -50 C 40 -10, 20 -30, 0 0 Z" fill="url(#sindoorRed)" opacity="0.6" />
            <path d="M 0 0 C -30 -20, -50 10, -10 -30 C 0 -40, 10 -40, 10 -30 C 50 10, 30 -20, 0 0 Z" fill="url(#sindoorRed)" opacity="0.4" />
            <circle cx="0" cy="-10" r="5" fill="url(#sareeBorder)" filter="url(#glowEffect)" />
          </motion.g>
        ))}

        {/* The Figure - Abstract but Detailed Bengali Woman */}
        <motion.g 
          transform="translate(400, 620)"
          animate={{ y: [0, -8, 0] }} // Gentle breathing
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#softShadow)"
        >
          {/* Back Hair Voluminous */}
          <motion.path
            d="M -120 -150 C -180 -100, -160 50, -80 120 C 0 160, 120 120, 140 20 C 160 -80, 100 -200, 0 -220 C -80 -230, -100 -180, -120 -150 Z"
            fill="#111111"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          {/* Neck and Shoulders */}
          <path d="M -40 -50 L -50 80 C -100 120, -150 150, -200 250 L 200 250 C 150 150, 100 120, 50 80 L 40 -50 Z" fill="url(#skinGlow)" />
          
          {/* Collarbone shadows */}
          <path d="M -45 80 C -80 100, -120 110, -150 140" stroke="#A86F45" strokeWidth="4" fill="none" opacity="0.5" filter="blur(2px)"/>
          <path d="M 45 80 C 80 100, 120 110, 150 140" stroke="#A86F45" strokeWidth="4" fill="none" opacity="0.5" filter="blur(2px)"/>

          {/* Face Contour with refined jawline and chin */}
          <motion.path
            d="M -70 -180 C -80 -100, -60 -20, 0 10 C 60 -20, 80 -100, 70 -180 C 60 -250, -60 -250, -70 -180 Z"
            fill="url(#skinGlow)"
            stroke="#111111"
            strokeWidth="2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
          
          {/* Cheekbone highlights */}
          <path d="M -55 -120 C -45 -100, -30 -90, -20 -90" stroke="#F9F6F0" strokeWidth="6" fill="none" opacity="0.15" filter="blur(4px)"/>
          <path d="M 55 -120 C 45 -100, 30 -90, 20 -90" stroke="#F9F6F0" strokeWidth="6" fill="none" opacity="0.15" filter="blur(4px)"/>

          {/* Front Hair & Intricate Khopa (Bun) with Gajra */}
          <path d="M -70 -180 C -40 -200, 0 -220, 0 -220 C 0 -220, 40 -200, 70 -180 C 80 -250, -80 -250, -70 -180 Z" fill="#1A1A1A" />
          <path d="M -70 -180 C -90 -120, -80 -60, -75 -40 C -85 -80, -95 -140, -70 -180 Z" fill="#111111" />
          <path d="M 70 -180 C 90 -120, 80 -60, 75 -40 C 85 -80, 95 -140, 70 -180 Z" fill="#111111" />
          
          {/* Floral Gajra (Jasmine Garland) around the hair */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const r = 90;
            const cx = Math.cos(angle) * r;
            const cy = -190 + Math.sin(angle) * (r * 0.4);
            if (cy > -180) return null; // Only show behind/top
            return (
              <circle key={`flower-${i}`} cx={cx} cy={cy} r="8" fill="#F9F6F0" opacity="0.9" filter="url(#glowEffect)" />
            );
          })}

          {/* Majestic Large Teep (Bindi) with intricate detailing */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, delay: 1.5 }}
          >
            <circle cx="0" cy="-160" r="14" fill="url(#sindoorRed)" filter="url(#softShadow)" />
            <circle cx="0" cy="-160" r="15" stroke="url(#sareeBorder)" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
            {/* Chandan dots around Bindi */}
            {[...Array(9)].map((_, i) => (
              <circle 
                key={`chandan-${i}`} 
                cx={Math.cos((i * Math.PI * 2) / 9) * 22} 
                cy={-160 + Math.sin((i * Math.PI * 2) / 9) * 22} 
                r="1.5" 
                fill="#F9F6F0" 
              />
            ))}
          </motion.g>

          {/* Expressive Potchitra Eyes */}
          <g transform="translate(0, -20)">
            {/* Left Eye */}
            <motion.path
              d="M -50 -90 Q -25 -110, -10 -85 Q -25 -80, -50 -90 Z"
              fill="#F9F6F0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
            <path d="M -50 -90 Q -25 -115, -10 -85" stroke="#111" strokeWidth="4" fill="none" />
            <circle cx="-30" cy="-93" r="5" fill="#111" />
            <circle cx="-31" cy="-94" r="1.5" fill="#FFF" />
            <path d="M -55 -85 C -65 -80, -70 -75, -75 -65" stroke="#111" strokeWidth="2" fill="none" /> {/* Extended eyeliner */}
            
            {/* Right Eye */}
            <motion.path
              d="M 50 -90 Q 25 -110, 10 -85 Q 25 -80, 50 -90 Z"
              fill="#F9F6F0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
            <path d="M 50 -90 Q 25 -115, 10 -85" stroke="#111" strokeWidth="4" fill="none" />
            <circle cx="30" cy="-93" r="5" fill="#111" />
            <circle cx="31" cy="-94" r="1.5" fill="#FFF" />
            <path d="M 55 -85 C 65 -80, 70 -75, 75 -65" stroke="#111" strokeWidth="2" fill="none" />
            
            {/* Elegant Eyebrows */}
            <path d="M -10 -110 Q -30 -125, -55 -110" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M 10 -110 Q 30 -125, 55 -110" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </g>

          {/* Sculpted Nose and Classic Nath (Nose Ring) */}
          <path d="M 0 -105 C 5 -80, 10 -60, 12 -50 C 5 -45, -5 -45, -12 -50 C -10 -60, -5 -80, 0 -105" fill="none" stroke="#A86F45" strokeWidth="2" opacity="0.6"/>
          <path d="M -12 -50 C -20 -50, -25 -55, -20 -60" fill="none" stroke="#A86F45" strokeWidth="2" opacity="0.8"/>
          
          {/* Nath (Nose Ring) with chain */}
          <motion.g
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <circle cx="-15" cy="-55" r="18" stroke="url(#sareeBorder)" strokeWidth="2" fill="none" />
            <circle cx="-15" cy="-37" r="3" fill="#E63946" /> {/* Pearl/Ruby on Nath */}
            {/* Chain to hair */}
            <path d="M -33 -55 Q -60 -60, -75 -100" stroke="url(#sareeBorder)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          </motion.g>

          {/* Full Lips */}
          <g transform="translate(0, -10)">
            <path d="M -18 -15 Q 0 -25, 18 -15 Q 0 -15, -18 -15 Z" fill="url(#sindoorRed)" />
            <path d="M -18 -15 Q 0 -5, 18 -15 Q 0 -10, -18 -15 Z" fill="#9E141E" />
            <path d="M -10 -18 Q 0 -20, 10 -18" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.3" /> {/* Lip highlight */}
          </g>

          {/* Heavy Traditional Necklace (Choker and Sita Haar) */}
          <motion.g
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
          >
            {/* Choker */}
            <path d="M -45 50 Q 0 80, 45 50 Q 0 65, -45 50 Z" fill="url(#sareeBorder)" filter="url(#softShadow)" />
            <path d="M -40 60 Q 0 95, 40 60" stroke="url(#sindoorRed)" strokeWidth="4" strokeDasharray="4 6" fill="none" />
            
            {/* Long Necklace (Sita Haar) */}
            <path d="M -80 90 Q 0 250, 80 90" stroke="url(#sareeBorder)" strokeWidth="6" fill="none" filter="url(#softShadow)"/>
            <path d="M -60 100 Q 0 200, 60 100" stroke="url(#sareeBorder)" strokeWidth="3" fill="none" />
            <circle cx="0" cy="175" r="20" fill="url(#sareeBorder)" filter="url(#softShadow)"/>
            <circle cx="0" cy="175" r="10" fill="url(#sindoorRed)" />
          </motion.g>

          {/* Masterful Saree Drape - Jamdani Texture and rich folds */}
          {/* Main body drape */}
          <motion.path
            d="M -150 120 C -120 180, -80 300, -100 450 L 100 450 C 80 300, 120 180, 150 120 C 100 150, 50 180, 0 180 C -50 180, -100 150, -150 120 Z"
            fill="url(#sareeGradient)"
            filter="url(#softShadow)"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />

          {/* Saree Aanchal / Pallu flowing over the left shoulder */}
          <motion.path
            d="M -150 120 C -280 200, -350 350, -250 500 C -150 650, -50 450, -80 250 C -100 180, -120 150, -150 120 Z"
            fill="url(#sindoorRed)"
            opacity="0.95"
            filter="url(#softShadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 1 }}
          />

          {/* Intricate Zari Border on Aanchal */}
          <motion.path
            d="M -145 125 C -265 205, -330 350, -235 500"
            stroke="url(#sareeBorder)"
            strokeWidth="20"
            fill="none"
            initial={{ strokeDasharray: "0 1000" }}
            animate={{ strokeDasharray: "1000 0" }}
            transition={{ duration: 3, delay: 1.2 }}
          />
          <motion.path
            d="M -145 125 C -265 205, -330 350, -235 500"
            stroke="#9E141E"
            strokeWidth="18"
            strokeDasharray="8 8"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          />

          {/* Realistic Fabric Folds using shading paths */}
          <path d="M -20 180 C -10 250, -40 350, -30 450" stroke="#D3C9B8" strokeWidth="8" fill="none" filter="blur(3px)"/>
          <path d="M 40 180 C 30 280, 60 380, 50 450" stroke="#D3C9B8" strokeWidth="12" fill="none" filter="blur(4px)"/>
          <path d="M -80 160 C -60 250, -90 350, -80 450" stroke="#D3C9B8" strokeWidth="6" fill="none" filter="blur(2px)"/>
          
        {/* Subtle Jamdani Motifs on Saree Body */}
        <g opacity="0.15" fill="url(#sareeBorder)">
          {[...Array(6)].map((_, i) => (
            <polygon key={`jamdani-${i}`} points="0,-10 10,0 0,10 -10,0" transform={`translate(${i % 2 === 0 ? 30 : -30}, ${250 + i * 40})`} />
          ))}
        </g>

        </motion.g>

        {/* Cinematic Foreground Elements - Loom Threads floating */}
        {[...Array(6)].map((_, i) => (
          <motion.line
            key={`loom-thread-${i}`}
            x1={-200}
            y1={200 + i * 150}
            x2={1000}
            y2={150 + i * 160}
            stroke="url(#sareeBorder)"
            strokeWidth={i % 2 === 0 ? 1 : 2}
            opacity="0.3"
            filter="url(#glowEffect)"
            initial={{ x1: -500, x2: -500 }}
            animate={{ x1: -200, x2: 1000 }}
            transition={{ duration: 3 + i * 0.5, delay: 0.5 + i * 0.2, ease: "circOut" }}
          />
        ))}

        {/* Foreground Dust/Magic Particles */}
        {[...Array(15)].map((_, i) => {
          // Pre-calculate pseudo-random values based on index to ensure deterministic rendering
          const cx = (i * 53) % 800;
          const cy = (i * 67) % 1000;
          const r = (i % 3) + 1;
          const opacity = ((i % 5) * 0.1) + 0.2;
          const xDrift = (i % 20) - 10;
          const duration = 4 + (i % 3);

          return (
            <motion.circle
              key={`dust-${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="url(#sareeBorder)"
              filter="url(#glowEffect)"
              opacity={opacity}
              animate={{ 
                y: [0, -30, 0], 
                x: [0, xDrift, 0],
                opacity: [0.2, 0.8, 0.2] 
              }}
              transition={{ duration: duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}

      </motion.svg>
    </div>
  );
}
