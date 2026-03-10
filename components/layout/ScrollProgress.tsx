'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1800px] h-[2px] bg-bengal-sindoor z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}
