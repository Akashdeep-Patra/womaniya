'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  images: string[];
  alt: string;
  title?: string;
  autoPlayInterval?: number;
  className?: string;
  overlay?: React.ReactNode;
}

export function HeroCarousel({
  images,
  alt,
  title,
  autoPlayInterval = 4500,
  className = '',
  overlay,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, next, autoPlayInterval, total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setIsPaused(false);
  };

  if (total === 0) return null;

  if (total === 1) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {overlay}
      </div>
    );
  }

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? '100%' : '-100%',
      opacity: 0.4,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? '-100%' : '100%',
      opacity: 0.4,
      scale: 1.05,
    }),
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 200, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${alt} — ${current + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {overlay}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-1 px-4 pb-4 md:px-6 md:pb-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-[3px] flex-1 rounded-full overflow-hidden bg-white/25 transition-all"
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: autoPlayInterval / 1000,
                  ease: 'linear',
                }}
                key={`progress-${current}`}
              />
            )}
            {i < current && (
              <div className="absolute inset-0 bg-white/60 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-sans-en tabular-nums backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full">
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );
}
