'use client';

import { motion } from 'framer-motion';

export function LoomWeaver({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-visible ${className}`}>
      <motion.svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Organic Background Shape */}
        <motion.path 
          d="M 40 250 C 60 100, 200 50, 300 150 C 380 230, 390 350, 280 450 C 150 550, 20 400, 40 250 Z" 
          fill="#FDF8F2" 
          opacity="0.8"
          animate={{ scale: [1, 1.03, 1], rotate: [0, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Abstract Loom Threads (Warp) */}
        <g opacity="0.4">
          {[...Array(20)].map((_, i) => (
            <line
              key={`warp-${i}`}
              x1={80 + i * 12}
              y1="50"
              x2={80 + i * 12}
              y2="450"
              stroke="#D3C9B8"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* Woven Fabric Section */}
        <path d="M 70 300 L 320 300 L 320 450 L 70 450 Z" fill="#C5A059" opacity="0.8" />
        <path d="M 70 300 L 90 300 L 90 450 L 70 450 Z" fill="#8A1C14" />
        <path d="M 300 300 L 320 300 L 320 450 L 300 450 Z" fill="#8A1C14" />

        {/* Animated Flying Shuttle */}
        <motion.g
          animate={{ x: [80, 280, 80] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 0 290 L 30 280 L 60 290 L 30 300 Z" fill="#4A2E1B" />
          <ellipse cx="30" cy="290" rx="8" ry="4" fill="#E63946" />
        </motion.g>

        {/* Weaver Woman Profile - Sitting Position */}
        <motion.g 
          transform="translate(260, 250)"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Back Hair & Bun */}
          <path d="M 40 -80 C 80 -80, 90 -20, 60 10 C 40 30, -10 10, 20 -60 Z" fill="#1A1918" />
          <circle cx="65" cy="-45" r="18" fill="#1A1918" />
          <circle cx="65" cy="-45" r="20" stroke="#F9F6F0" strokeWidth="2" fill="none" strokeDasharray="4 4" />

          {/* Torso & Saree Body */}
          <path d="M -50 40 C 20 0, 70 50, 90 120 C 90 180, 50 200, 0 200 C -60 200, -100 150, -80 80 Z" fill="#2D7A4F" />

          {/* Saree Pallu / Wrap over shoulder */}
          <path d="M -60 60 C -10 0, 40 20, 70 80 L 100 160 C 50 180, 0 160, -60 60 Z" fill="#2D7A4F" opacity="0.9" />
          {/* Zari Border */}
          <path d="M -50 50 C -5 5, 45 25, 75 85" stroke="#C5A059" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M -50 50 C -5 5, 45 25, 75 85" stroke="#8A1C14" strokeWidth="3" fill="none" strokeDasharray="4 4" strokeLinecap="round" />

          {/* Shoulder and Arm Reaching out */}
          <path d="M -80 70 C -40 20, 0 10, 20 40 C 40 60, 40 100, 50 120 L -80 140 Z" fill="#C48B58" />
          
          {/* Forearm and Hand */}
          <motion.path 
            d="M -30 60 C -70 50, -120 70, -140 100 C -160 120, -140 140, -110 120 C -80 100, -40 80, -30 60 Z" 
            fill="#C48B58"
            animate={{ rotate: [0, -8, 0], originX: 0, originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Bangles on Wrist */}
          <motion.g
            animate={{ rotate: [0, -8, 0], originX: 0, originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="-100" y1="80" x2="-80" y2="105" stroke="#8A1C14" strokeWidth="6" strokeLinecap="round" />
            <line x1="-92" y1="75" x2="-72" y2="100" stroke="#F9F6F0" strokeWidth="4" strokeLinecap="round" />
            <line x1="-86" y1="70" x2="-66" y2="95" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* Profile Face & Neck */}
          <path d="M -10 -60 C -40 -60, -60 -20, -50 0 C -40 20, -20 20, 0 10 C 20 0, 30 -30, 20 -50 C 10 -60, 0 -60, -10 -60 Z" fill="#C48B58" />
          
          {/* Eye & Bindi Profile */}
          <path d="M -35 -20 Q -45 -22, -45 -12" stroke="#1A1918" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M -35 -30 Q -45 -35, -52 -28" stroke="#1A1918" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="-25" cy="-25" r="2.5" fill="#8A1C14" />
          
          {/* Earring (Jhumka) */}
          <circle cx="5" cy="-5" r="6" fill="#C5A059" />
          <path d="M 0 0 L 10 0 L 5 10 Z" fill="#C5A059" />

        </motion.g>

        {/* Ambient Gold Dust / Cotton Fibers */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`dust-${i}`}
            cx={100 + i * 50}
            cy={100 + (i * 70) % 200}
            r="2"
            fill="#C5A059"
            animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>
    </div>
  );
}