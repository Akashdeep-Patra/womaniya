'use client';

import { motion } from 'framer-motion';

export function LoomWeaver({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        initial="hidden"
        animate="visible"
      >
        <rect width="400" height="400" rx="40" className="fill-bengal-mati" />
        
        {/* Loom Wooden Frame */}
        <motion.path
          d="M 50 50 L 350 50 L 350 350 L 50 350 Z"
          className="stroke-bengal-kajal/20"
          strokeWidth="20"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } }
          }}
        />
        <line x1="100" y1="50" x2="100" y2="350" stroke="currentColor" strokeWidth="10" className="text-bengal-kajal/20" />
        <line x1="300" y1="50" x2="300" y2="350" stroke="currentColor" strokeWidth="10" className="text-bengal-kajal/20" />

        {/* Warp Threads (Vertical) */}
        {[...Array(15)].map((_, i) => (
          <line
            key={`warp-${i}`}
            x1={120 + i * 11}
            y1="60"
            x2={120 + i * 11}
            y2="340"
            stroke="currentColor"
            strokeWidth="2"
            className="text-bengal-kansa/40"
          />
        ))}

        {/* Weft Threads (Horizontal) - Animated to simulate weaving */}
        <motion.g
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 110 250 L 290 250 M 110 260 L 290 260 M 110 270 L 290 270 M 110 280 L 290 280 M 110 290 L 290 290"
            stroke="currentColor"
            strokeWidth="4"
            className="text-bengal-sindoor"
          />
          <path
            d="M 110 300 L 290 300 M 110 310 L 290 310 M 110 320 L 290 320"
            stroke="currentColor"
            strokeWidth="4"
            className="text-bengal-sindoor/60"
          />
        </motion.g>

        {/* Shuttle (Maku) moving back and forth */}
        <motion.path
          d="M 150 240 L 180 235 L 210 240 L 180 245 Z"
          className="fill-bengal-kansa"
          animate={{ x: [-30, 90, -30] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Abstract hands of the artisan */}
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 50 200 C 100 200, 120 230, 140 240" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-bengal-kajal/60 fill-none" />
          <path d="M 350 200 C 300 200, 280 230, 260 240" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-bengal-kajal/60 fill-none" />
        </motion.g>

        <circle cx="200" cy="200" r="100" className="fill-bengal-cream mix-blend-overlay opacity-30" />
      </motion.svg>
    </div>
  );
}
