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
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <g>
        {/* Outer Lotus / "W" Drape with Gradient Fill */}
        <motion.path
          d="M 20 35 C 20 70, 45 90, 50 90 C 55 90, 80 70, 80 35 C 80 15, 65 10, 50 25 C 35 10, 20 15, 20 35 Z"
          fill="url(#mascotBody)"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        
        {/* Internal 3D contour lines */}
        <motion.path
          d="M 28 38 C 28 65, 45 80, 50 82 C 55 80, 72 65, 72 38"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Inner Weave/Threads - Top (Represents Loom/Weaving) */}
        <motion.path
          d="M 38 32 L 50 48 L 62 32"
          stroke="url(#mascotGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        />

        {/* Inner Weave/Threads - Bottom */}
        <motion.path
          d="M 32 48 L 50 72 L 68 48"
          stroke="url(#mascotGold)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
        />

        {/* The Bindi / Sindoor dot (Represents Authentic Womanhood) with glowing core */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 1.8 }}
        >
          <circle cx="50" cy="55" r="7" fill="#E63946" opacity="0.3" />
          <circle cx="50" cy="55" r="5" fill="#9E141E" />
          <circle cx="51" cy="54" r="1.5" fill="#FFF" opacity="0.4" />
        </motion.g>
      </g>
    </motion.svg>
  );
}
