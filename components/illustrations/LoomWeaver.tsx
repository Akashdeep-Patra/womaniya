'use client';

import { motion } from 'framer-motion';

export function LoomWeaver({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <motion.svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="skinBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#A86F45" />
          </linearGradient>
          
          <linearGradient id="sareeWeaver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9E141E" />
            <stop offset="100%" stopColor="#E63946" />
          </linearGradient>

          <linearGradient id="goldThreadWeaver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2C980" />
            <stop offset="100%" stopColor="#C5A059" />
          </linearGradient>
          
          <linearGradient id="woodGradientWeaver" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6B4226" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>
        </defs>

        {/* Ambient Circle Background */}
        <circle cx="250" cy="250" r="230" fill="#F9F6F0" opacity="0.8" />
        <circle cx="250" cy="250" r="230" stroke="url(#goldThreadWeaver)" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.3" />

        {/* Abstract Wooden Loom Elements */}
        <g opacity="0.8">
          <rect x="80" y="100" width="20" height="300" rx="4" fill="url(#woodGradientWeaver)" />
          <rect x="400" y="100" width="20" height="300" rx="4" fill="url(#woodGradientWeaver)" />
          <rect x="60" y="120" width="380" height="15" rx="4" fill="#A87B51" />
          <rect x="90" y="380" width="320" height="30" rx="8" fill="url(#woodGradientWeaver)" />
        </g>

        {/* Vertical Threads */}
        <g opacity="0.5">
          {[...Array(25)].map((_, i) => (
            <line
              key={`warp-${i}`}
              x1={130 + i * 10}
              y1="135"
              x2={130 + i * 10}
              y2="380"
              stroke="#D3C9B8"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* Woven Fabric Section */}
        <path d="M 125 320 L 375 320 L 375 380 L 125 380 Z" fill="url(#sareeWeaver)" opacity="0.9" />
        <path d="M 125 320 L 140 320 L 140 380 L 125 380 Z" fill="url(#goldThreadWeaver)" />
        <path d="M 360 320 L 375 320 L 375 380 L 360 380 Z" fill="url(#goldThreadWeaver)" />

        {/* Animated Flying Shuttle */}
        <motion.g
          animate={{ x: [130, 340, 130] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 0 315 L 25 305 L 50 315 L 25 325 Z" fill="#4A2E1B" />
          <ellipse cx="25" cy="315" rx="6" ry="3" fill="#E63946" />
        </motion.g>

        {/* The Weaver Woman (Elegant Profile) */}
        <motion.g 
          transform="translate(250, 260)"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Hair Bun */}
          <path d="M 30 -60 C 60 -70, 70 -30, 50 -10 C 30 10, -10 -10, 30 -60 Z" fill="#1A1A1A" />
          
          {/* Shoulder and Arm */}
          <path d="M -80 80 C -50 40, -10 20, 20 50 C 40 70, 70 120, 90 120 L -80 120 Z" fill="url(#skinBase)" />
          
          {/* Profile Face */}
          <path d="M -10 -50 C -40 -50, -50 -20, -45 0 C -40 10, -30 20, -10 20 C 10 20, 20 0, 20 -20 C 20 -40, 10 -50, -10 -50 Z" fill="url(#skinBase)" />
          
          {/* Elegant Saree Drape over Shoulder */}
          <path d="M -80 120 C -40 50, 0 30, 40 80 L 90 120 Z" fill="url(#goldThreadWeaver)" opacity="0.9" />
          <path d="M -70 120 C -30 60, 0 40, 40 80 L 90 120 Z" fill="#C5A059" opacity="0.8" />
          
          {/* Hand reaching out to loom */}
          <motion.path 
            d="M -30 50 C -60 40, -100 60, -110 80 C -120 100, -100 110, -80 100 C -60 90, -40 70, -30 50 Z" 
            fill="url(#skinBase)"
            animate={{ rotate: [0, -5, 0], originX: 0, originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Bangles */}
          <motion.g
            animate={{ rotate: [0, -5, 0], originX: 0, originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="-90" y1="70" x2="-75" y2="85" stroke="#9E141E" strokeWidth="4" strokeLinecap="round" />
            <line x1="-85" y1="65" x2="-70" y2="80" stroke="#F9F6F0" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* Simple Eye Profile */}
          <path d="M -35 -20 Q -45 -22, -40 -15" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" />
        </motion.g>

      </motion.svg>
    </div>
  );
}