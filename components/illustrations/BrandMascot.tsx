'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

interface BrandMascotProps {
  className?: string;
  size?: number | string;
}

export function BrandMascot({ className = '', size = 56 }: BrandMascotProps) {
  const id = useId().replace(/:/g, '');
  const prefersReducedMotion = useReducedMotion();
  const skip = !!prefersReducedMotion;

  const gradientId = `sindoor-${id}`;
  const goldId = `gold-${id}`;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-md`}
      whileHover={skip ? undefined : { scale: 1.08, rotate: 2 }}
      whileTap={skip ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="15%" y1="5%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#D94A3E" />
          <stop offset="50%" stopColor="#C0392B" />
          <stop offset="100%" stopColor="#A42E24" />
        </linearGradient>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0DDA4" />
          <stop offset="50%" stopColor="#D4A843" />
          <stop offset="100%" stopColor="#B8923A" />
        </linearGradient>
      </defs>

      {/* Red circle — organic, hand-painted feel */}
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        fill={`url(#${gradientId})`}
        initial={skip ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {/* Subtle inner glow for depth */}
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {/*
        Single continuous calligraphic "W" path.
        Left curl → down → up → down → up → top flourish curl
        Bold strokes so it reads clearly even at 20px.
      */}
      <motion.path
        d={[
          'M 19 36',
          'C 16 34, 14 37, 15 40',
          'C 16 42, 19 42, 20 40',
          'L 34 72',
          'C 35 74, 36 74, 37 72',
          'L 47 40',
          'C 48 38, 49 38, 50 40',
          'L 60 72',
          'C 61 74, 62 74, 63 72',
          'L 76 28',
          'C 77 24, 80 22, 82 24',
          'C 84 26, 83 30, 80 31',
          'C 77 32, 75 30, 76 28',
        ].join(' ')}
        fill="none"
        stroke="#FBF8F1"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={skip ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.2, delay: 0.4 },
        }}
      />

      {/* Gold bindi — pops in with a spring at the end */}
      <motion.circle
        cx="48"
        cy="30"
        r="3"
        fill={`url(#${goldId})`}
        initial={skip ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 15,
          delay: 1.8,
        }}
      />

      {/* Idle shimmer — subtle gold sparkle that loops */}
      <motion.circle
        cx="48"
        cy="30"
        r="3"
        fill="none"
        stroke={`url(#${goldId})`}
        strokeWidth="1.5"
        initial={skip ? false : { scale: 1, opacity: 0 }}
        animate={
          skip
            ? { opacity: 0 }
            : {
                scale: [1, 1.8, 1],
                opacity: [0, 0.6, 0],
              }
        }
        transition={{
          duration: 2.5,
          delay: 2.5,
          repeat: Infinity,
          repeatDelay: 4,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}
