'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // If there are no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[3/4] md:aspect-square w-full bg-bengal-kori/50 flex items-center justify-center rounded-2xl overflow-hidden border border-bengal-kansa/20">
        <Image src="/placeholder-saree.svg" alt={productName} fill className="object-cover opacity-50" />
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
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const handleThumbnailClick = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="relative aspect-[3/4] md:aspect-[4/5] w-full bg-bengal-kori/50 rounded-2xl md:rounded-3xl overflow-hidden border border-bengal-kansa/20 group touch-pan-y">
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
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={currentIndex === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (Desktop) */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 text-bengal-kajal rounded-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-lg border border-bengal-kansa/10 z-10 touch-manipulation"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 text-bengal-kajal rounded-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-lg border border-bengal-kansa/10 z-10 touch-manipulation"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dot Indicators (Mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-bengal-sindoor'
                    : 'w-1.5 h-1.5 bg-white/70 hover:bg-white'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails (Desktop/Tablet) */}
      {images.length > 1 && (
        <div className="hidden md:flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative w-20 h-24 shrink-0 rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                idx === currentIndex
                  ? 'border-bengal-sindoor opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-bengal-kansa/30'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}