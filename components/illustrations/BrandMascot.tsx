'use client';

import { motion } from 'framer-motion';

interface BrandMascotProps {
  className?: string;
  size?: number | string;
}

export function BrandMascot({ className = '', size = 48 }: BrandMascotProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-md`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <defs>
        <linearGradient id="mascotGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2C980" />
          <stop offset="50%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#9B7A3D" />
        </linearGradient>

        <linearGradient id="mascotBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8A1C14" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1A1918" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <g>
        {/* Soft elegant drop shape behind */}
        <motion.path
          d="M 50 15 C 80 15, 90 40, 80 70 C 70 90, 30 90, 20 70 C 10 40, 20 15, 50 15 Z"
          fill="url(#mascotBody)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Continuous Line - Sharp, Sensual Side Profile */}
        <motion.path
          d="M 60 15 C 45 15, 35 25, 35 35 C 35 38, 30 42, 28 45 C 25 48, 25 50, 28 52 C 25 55, 25 58, 32 60 C 40 62, 45 70, 42 80 C 40 88, 48 95, 60 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: 'easeInOut' }}
        />

        {/* Sultry Eye - Minimalist lash */}
        <motion.path
          d="M 35 42 C 40 40, 45 42, 48 45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        {/* Plump Red Lip Accent */}
        <motion.path
          d="M 28 52 C 32 50, 35 52, 33 54 C 30 54, 28 52, 28 52 Z"
          fill="#B3241C"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 1.8 }}
        />

        {/* Sharp Bindi */}
        <motion.circle
          cx="30"
          cy="32"
          r="2.5"
          fill="#B3241C"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 1.2 }}
        />

        {/* Elegant Gold Jhumka/Earring */}
        <motion.path
          d="M 45 55 L 45 65 M 40 60 C 45 58, 50 62, 50 65"
          fill="none"
          stroke="url(#mascotGold)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        />
        
        {/* Tiny gold jewel drop */}
        <motion.circle
          cx="45"
          cy="68"
          r="2.5"
          fill="url(#mascotGold)"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        />
      </g>
    </motion.svg>
  );
}