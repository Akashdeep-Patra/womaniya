'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  }, [currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[3/4] w-full bg-muted/50 flex items-center justify-center rounded-2xl overflow-hidden border border-border">
        <div className="text-muted-foreground/40 flex flex-col items-center gap-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="text-xs tracking-widest uppercase font-sans-en">No images</span>
        </div>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  return (
    <div className="flex flex-col gap-3 md:gap-4 w-full">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full bg-muted/30 rounded-2xl lg:rounded-3xl overflow-hidden border border-border/60 group touch-pan-y">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold || offset.x < -50) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold || offset.x > 50) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
            style={{ touchAction: 'pan-y' }}
          >
            <Image
              src={images[currentIndex]}
              alt={`${productName} - Image ${currentIndex + 1}`}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
              priority={currentIndex === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Image counter badge */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-foreground/70 text-background text-[10px] font-sans-en tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation Arrows — desktop hover reveal */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-11 lg:h-11 bg-background/90 backdrop-blur-sm text-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:scale-105 active:scale-95 shadow-lg border border-border/40 z-10 touch-manipulation hidden md:flex"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-11 lg:h-11 bg-background/90 backdrop-blur-sm text-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:scale-105 active:scale-95 shadow-lg border border-border/40 z-10 touch-manipulation hidden md:flex"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dot indicators — mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 md:hidden z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-primary'
                    : 'w-1.5 h-1.5 bg-background/70 hover:bg-background'
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails — tablet/desktop */}
      {images.length > 1 && (
        <div className="hidden md:flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={cn(
                'relative w-[72px] h-[90px] shrink-0 rounded-xl overflow-hidden transition-all duration-200 border-2',
                idx === currentIndex
                  ? 'border-primary ring-1 ring-primary/20 opacity-100 scale-[1.02]'
                  : 'border-transparent opacity-50 hover:opacity-80 hover:border-border'
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
