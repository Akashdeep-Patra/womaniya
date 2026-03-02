'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MagneticCursor() {
  const [isHoveringProduct, setIsHoveringProduct] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 500, damping: 28 });
  const y = useSpring(rawY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    // Only set to false after checking we are not on a touch device
    // This avoids setting state on initial render if we don't have to
    setTimeout(() => {
      setIsTouchDevice(false);
    }, 0);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 8);
      rawY.set(e.clientY - 8);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-expand]')) {
        setIsHoveringProduct(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-expand]')) {
        setIsHoveringProduct(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover',  onEnter, { passive: true });
    window.addEventListener('mouseout',   onLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover',  onEnter);
      window.removeEventListener('mouseout',   onLeave);
    };
  }, [rawX, rawY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{ x, y }}
        animate={{
          width:  isHoveringProduct ? 72 : 16,
          height: isHoveringProduct ? 72 : 16,
          background: isHoveringProduct ? 'rgba(138,28,20,0.85)' : '#8A1C14',
          translateX: isHoveringProduct ? -28 : 0,
          translateY: isHoveringProduct ? -28 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {isHoveringProduct && (
          <span className="flex items-center justify-center h-full text-[10px] tracking-widest text-bengal-kori font-sans-en uppercase font-medium">
            View
          </span>
        )}
      </motion.div>
    </>
  );
}
