'use client';

import { motion } from 'framer-motion';

export function BengalWomanHero({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      <motion.svg
        viewBox="0 0 800 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Background Arch/Temple Window */}
        <motion.path
          d="M 100 1000 L 100 400 C 100 200, 400 50, 400 50 C 400 50, 700 200, 700 400 L 700 1000 Z"
          fill="currentColor"
          className="text-bengal-kansa/5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
        />
        
        {/* Inner Arch Line */}
        <motion.path
          d="M 130 1000 L 130 410 C 130 230, 400 90, 400 90 C 400 90, 670 230, 670 410 L 670 1000"
          stroke="currentColor"
          strokeWidth="4"
          className="text-bengal-kansa/30"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Floating Motifs - Left */}
        <motion.g
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M 200 300 Q 220 250 250 300 Q 220 320 200 300 Z" className="fill-bengal-sindoor/40" />
          <circle cx="225" cy="290" r="4" className="fill-bengal-kansa" />
        </motion.g>

        {/* Floating Motifs - Right */}
        <motion.g
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <path d="M 600 350 Q 570 400 550 350 Q 570 330 600 350 Z" className="fill-bengal-sindoor/40" />
          <circle cx="575" cy="360" r="4" className="fill-bengal-kansa" />
        </motion.g>

        {/* The Figure - Abstract Bengali Woman */}
        <g transform="translate(400, 650)">
          {/* Face Contour */}
          <motion.path
            d="M -60 -150 C -60 -250, 60 -250, 60 -150 C 60 -50, 0 0, 0 0 C 0 0, -60 -50, -60 -150 Z"
            className="fill-bengal-mati stroke-bengal-kajal"
            strokeWidth="3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* Hair / Bun (Khopa) */}
          <motion.path
            d="M -70 -160 C -120 -180, -100 -280, -40 -250 C -40 -300, 60 -300, 70 -240 C 120 -230, 100 -150, 60 -140 C 60 -140, 0 -180, -70 -160 Z"
            className="fill-bengal-kajal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          {/* Large Bindi (Teep) */}
          <motion.circle
            cx="0"
            cy="-180"
            r="12"
            className="fill-bengal-sindoor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
          />

          {/* Eyes (Potchitra inspired long eyes) */}
          <motion.path
            d="M -40 -150 Q -20 -170, -10 -150 Q -20 -140, -40 -150 Z"
            className="fill-bengal-kajal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.path
            d="M 40 -150 Q 20 -170, 10 -150 Q 20 -140, 40 -150 Z"
            className="fill-bengal-kajal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />

          {/* Nose line & Nose Pin (Nath) */}
          <path d="M 0 -150 L -5 -110 L 5 -110" stroke="currentColor" strokeWidth="2" className="text-bengal-kajal/50 fill-none" />
          <circle cx="-8" cy="-115" r="4" className="fill-bengal-kansa" />
          <path d="M -12 -115 C -25 -130, -25 -100, -12 -115" stroke="currentColor" strokeWidth="1.5" className="text-bengal-kansa fill-none" />

          {/* Lips */}
          <path d="M -15 -80 Q 0 -90, 15 -80 Q 0 -70, -15 -80 Z" className="fill-bengal-sindoor" />

          {/* Saree Drape - Body */}
          <motion.path
            d="M -120 0 C -120 -50, -60 -20, -30 20 C 0 60, 40 80, 100 50 C 160 20, 180 100, 180 200 L 250 400 L -250 400 L -180 200 C -180 100, -120 50, -120 0 Z"
            className="fill-bengal-cream stroke-bengal-kansa"
            strokeWidth="3"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />

          {/* Saree Pallu / Aanchal Flowing */}
          <motion.path
            d="M -120 0 C -250 100, -300 250, -200 400 C -100 550, -50 350, -60 200 C -70 50, 0 0, 0 0 Z"
            className="fill-bengal-sindoor/10 stroke-bengal-sindoor"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeOut", delay: 1 }}
          />

          {/* Animated Saree Folds/Pleats */}
          <motion.path
            d="M 0 100 L -20 400 M 30 120 L 20 400 M -30 80 L -60 400"
            stroke="currentColor"
            strokeWidth="2"
            className="text-bengal-kansa/50"
            initial={{ strokeDasharray: "0 1000" }}
            animate={{ strokeDasharray: "1000 0" }}
            transition={{ duration: 2, delay: 1.5 }}
          />

          {/* Zari Border Detail on Pallu */}
          <motion.path
            d="M -130 5 C -255 105, -305 250, -205 400"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray="4 8"
            className="text-bengal-kansa"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Ambient Floating Threads (representing loom) */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`thread-${i}`}
            x1={-100}
            y1={100 + i * 120}
            x2={900}
            y2={100 + i * 120}
            stroke="currentColor"
            strokeWidth="1"
            className="text-bengal-kansa/20"
            initial={{ x1: -100, x2: -100 }}
            animate={{ x2: 900 }}
            transition={{ duration: 2 + i * 0.5, delay: 0.5 + i * 0.2 }}
          />
        ))}

      </motion.svg>
    </div>
  );
}
