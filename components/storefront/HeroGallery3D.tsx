'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  PanInfo,
} from 'framer-motion';

const GALLERY_IMAGES = [
  {
    src: '/instagram/2026-01-30_12-28-39_UTC_5.jpg',
    alt: 'Ikkat Rupkotha — Blue Pochampally handloom bustier dress editorial portrait',
    pos: '50% 10%',
  },
  {
    src: '/instagram/2026-02-23_06-34-00_UTC_1.jpg',
    alt: 'Red handloom Jamdani patchwork skirt against heritage red wall',
    pos: '50% 20%',
  },
  {
    src: '/instagram/2026-02-02_12-37-01_UTC_2.jpg',
    alt: 'Meher — spinning in Ikkat Pochampally dress, capturing movement and craft',
    pos: '50% 15%',
  },
  {
    src: '/instagram/2026-02-25_12-56-26_UTC_1.jpg',
    alt: 'Womaniya handloom editorial — artisan weave detail',
    pos: '50% 30%',
  },
  {
    src: '/instagram/2026-02-02_12-37-01_UTC_6.jpg',
    alt: 'Close-up of Ikkat Pochampally handwoven textile pattern',
    pos: '30% 50%',
  },
  {
    src: '/instagram/2026-01-30_12-28-39_UTC_3.jpg',
    alt: 'Womaniya handloom editorial — styled portrait',
    pos: '50% 5%',
  },
  {
    src: '/instagram/2026-01-28_12-45-56_UTC_2.jpg',
    alt: 'Ajrakh hand block print saree draped on model',
    pos: '50% 10%',
  },
  {
    src: '/instagram/2026-02-09_12-41-33_UTC_1.jpg',
    alt: 'Jamdani craft details and artisan working',
    pos: '50% 20%',
  },
];

const ITEM_COUNT = GALLERY_IMAGES.length;

function GalleryCard({
  img,
  index,
  progress,
  isMobile,
}: {
  img: typeof GALLERY_IMAGES[0];
  index: number;
  progress: any; // MotionValue
  isMobile: boolean;
}) {
  // rel = 0 means this card is active (front)
  // rel = -1 means it's the next card in the stack (behind)
  // rel = 1 means it's the previous card (flown away)
  const rel = useTransform(progress, (p: number) => p - index);

  const domain = [-5, -4, -3, -2, -1, 0, 1];

  // Desktop scatter: creates a beautiful zigzag fanned spread
  const xOutputDesktop = ["-40%", "-30%", "45%", "-40%", "50%", "-10%", "-80%"];
  const yOutputDesktop = ["-20%", "-15%", "-10%", "0%", "10%", "5%", "30%"];

  // Mobile scatter: tighter spread for narrow screens
  const xOutputMobile = ["-15%", "-10%", "25%", "-20%", "25%", "0%", "-60%"];
  const yOutputMobile = ["-20%", "-15%", "-8%", "0%", "8%", "2%", "20%"];

  const scaleOutput = [0.4, 0.5, 0.65, 0.8, 0.95, 1.1, 1.3];
  const zOutput = [-400, -300, -200, -100, -50, 0, 200];
  const rotateZOutput = [4, -8, 6, -4, 4, -2, -15];
  const opacityOutput = [0, 0, 0.3, 0.7, 0.9, 1, 0];

  const x = useTransform(rel, domain, isMobile ? xOutputMobile : xOutputDesktop);
  const y = useTransform(rel, domain, isMobile ? yOutputMobile : yOutputDesktop);
  const scale = useTransform(rel, domain, scaleOutput);
  const z = useTransform(rel, domain, zOutput);
  const rotateZ = useTransform(rel, domain, rotateZOutput);
  const opacity = useTransform(rel, domain, opacityOutput);

  const boxShadow = useTransform(
    rel,
    [-1, 0],
    [
      "0px 10px 30px -10px rgba(0,0,0,0.3)",
      "0px 40px 80px -20px rgba(0,0,0,0.5)"
    ]
  );

  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="w-[55vw] sm:w-[260px] lg:w-[320px] xl:w-[380px] aspect-3/4 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 will-change-transform bg-background"
        style={{
          x,
          y,
          z,
          rotateZ,
          scale,
          opacity,
          boxShadow,
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover"
          style={{ objectPosition: img.pos }}
          sizes="(max-width: 1024px) 55vw, 400px"
          priority={index < 3}
        />
        {/* Darken cards behind the active one */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{
            opacity: useTransform(rel, [-3, 0], [0.4, 0]),
          }}
        />
      </motion.div>
    </div>
  );
}

export function HeroGallery3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const progressRaw = useMotionValue(0);
  const progress = useSpring(progressRaw, { stiffness: 70, damping: 20, mass: 0.8 });

  const mouseY = useMotionValue(0);
  // Add a subtle overall tilt based on Y movement
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [4, -4]), { stiffness: 60, damping: 20 });
  // Rotate the whole scene slightly as you scrub through
  const rotateY = useTransform(progress, [0, ITEM_COUNT - 1], [-8, 8]);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const width = window.innerWidth;

    // Map horizontal mouse position to gallery progress
    const newProgress = (clientX / width) * (ITEM_COUNT - 1);
    progressRaw.set(newProgress);

    // Map vertical mouse position to tilt
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const cy = clientY - rect.top - rect.height / 2;
      mouseY.set(cy);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseY.set(0);
    // Optional: snap back to nearest index on leave, but keeping the position is nice
  };

  // Mobile swipe interaction
  const handlePan = (e: any, info: PanInfo) => {
    if (!isMobile) return;
    // Map pan distance to progress (e.g., 200px pan = 1 card)
    const p = activeIndex - (info.offset.x / 200);
    progressRaw.set(Math.max(0, Math.min(ITEM_COUNT - 1, p)));
  };

  const handlePanEnd = (e: any, info: PanInfo) => {
    if (!isMobile) return;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let nextIndex = activeIndex;
    if (offset < -50 || velocity < -300) nextIndex++;
    else if (offset > 50 || velocity > 300) nextIndex--;

    nextIndex = Math.max(0, Math.min(ITEM_COUNT - 1, nextIndex));
    setActiveIndex(nextIndex);

    // Snap to the exact index
    animate(progressRaw, nextIndex, { type: 'spring', stiffness: 200, damping: 25 });
  };

  if (!isMounted) {
    // Initial SSR placeholder
    return (
      <div className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[88vh] flex items-center justify-center">
        <div className="w-[55vw] sm:w-[260px] lg:w-[320px] xl:w-[380px] aspect-3/4 rounded-2xl md:rounded-3xl bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[88vh] flex items-center justify-center overflow-hidden cursor-crosshair lg:cursor-default touch-pan-y"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ perspective: '1400px' }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            rotateX,
            rotateY,
          }}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          {/* We reverse so the first element (index 0) is placed last in DOM and naturally appears on top if z indexes are equal. But preserve-3d handles the actual z-sorting perfectly. */}
          {GALLERY_IMAGES.map((img, i) => (
            <GalleryCard
              key={i}
              img={img}
              index={i}
              progress={progress}
              isMobile={isMobile}
            />
          )).reverse()}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
        className="absolute z-50 bottom-[10%] lg:bottom-[15%] right-[10%] lg:right-[20%] rotate-3 pointer-events-none"
      >
        <div className="bg-background/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-border/40 shadow-xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-sans-en font-bold">
            Interactive Gallery
          </span>
        </div>
      </motion.div>

      {isMobile && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-50 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <path d="M17 8l4 4-4 4M7 16l-4-4 4-4M3 12h18" />
          </svg>
          <span className="text-[9px] tracking-widest uppercase font-sans-en font-medium">
            Swipe to explore
          </span>
        </div>
      )}
    </div>
  );
}
