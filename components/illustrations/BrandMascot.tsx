'use client';

import { motion } from 'framer-motion';

interface BrandMascotProps {
  className?: string;
  size?: number | string;
}

export function BrandMascot({ className = '', size = 48 }: BrandMascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Lotus / "W" Drape (Represents Saree Pallu & Lotus) */}
      <motion.path
        d="M 20 35 C 20 70, 45 90, 50 90 C 55 90, 80 70, 80 35 C 80 15, 65 10, 50 25 C 35 10, 20 15, 20 35 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Inner Weave/Threads - Top (Represents Loom/Weaving) */}
      <motion.path
        d="M 38 32 L 50 48 L 62 32"
        stroke="#C5A059" // bengal-kansa
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
      />

      {/* Inner Weave/Threads - Bottom */}
      <motion.path
        d="M 32 48 L 50 72 L 68 48"
        stroke="#C5A059" // bengal-kansa
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
      />

      {/* The Bindi / Sindoor dot (Represents Authentic Womanhood) */}
      <motion.circle
        cx="50"
        cy="55"
        r="5"
        fill="#8A1C14" // bengal-sindoor
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 1.5 }}
      />
    </svg>
  );
}
