'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bengal-kori">
      <div className="flex flex-col items-center gap-6">
        {/* Subtle breathing animation for a logo/icon substitute */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-12 h-12 flex items-center justify-center rounded-full border border-bengal-kansa/40"
        >
          <div className="w-2 h-2 rounded-full bg-bengal-sindoor" />
        </motion.div>
        
        {/* Animated text tracking */}
        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[10px] tracking-[0.3em] uppercase text-bengal-kajal/60 font-sans-en"
        >
          Loading
        </motion.p>
      </div>
    </div>
  );
}
