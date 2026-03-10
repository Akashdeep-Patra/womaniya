'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { JamdaniBackdrop } from '@/components/illustrations/SectionBackdrop';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Animated broken thread SVG ─────────────────────────────── */
function BrokenThread({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Left thread end — flowing curve */}
      <motion.path
        d="M 0 100 C 40 100, 60 60, 100 70 C 140 80, 150 110, 170 95"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.4}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
      />
      {/* Loose strand from left */}
      <motion.path
        d="M 165 97 C 172 85, 178 102, 185 90"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.3}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE }}
      />

      {/* Right thread end — flowing curve */}
      <motion.path
        d="M 400 100 C 360 100, 340 140, 300 130 C 260 120, 250 90, 230 105"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.4}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
      />
      {/* Loose strand from right */}
      <motion.path
        d="M 235 103 C 228 115, 222 98, 215 110"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.3}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: EASE }}
      />

      {/* Tiny frayed wisps in the gap */}
      {[
        'M 188 92 C 192 88, 195 94, 198 86',
        'M 190 98 C 194 102, 198 96, 202 100',
        'M 210 108 C 206 104, 204 110, 200 106',
        'M 208 98 C 205 94, 202 100, 199 96',
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="var(--primary)"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity={0.2}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 0.8, delay: 1.6 + i * 0.15, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* ─── Subtle floating loom grid (background) ─────────────────── */
function LoomGrid({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Vertical warp threads */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={50 + i * 48}
          y1={0}
          x2={50 + i * 48}
          y2={600}
          stroke="var(--primary)"
          strokeWidth="0.5"
          opacity={0.06}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: i * 0.08, ease: EASE }}
        />
      ))}
      {/* Horizontal weft threads — some broken in the middle */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 50 + i * 48;
        const isBroken = i >= 4 && i <= 7;
        if (isBroken) {
          return (
            <g key={`h-${i}`}>
              <motion.line
                x1={0} y1={y} x2={200} y2={y}
                stroke="var(--accent)"
                strokeWidth="0.5"
                opacity={0.06}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.08, ease: EASE }}
              />
              <motion.line
                x1={400} y1={y} x2={600} y2={y}
                stroke="var(--accent)"
                strokeWidth="0.5"
                opacity={0.06}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.08, ease: EASE }}
              />
            </g>
          );
        }
        return (
          <motion.line
            key={`h-${i}`}
            x1={0} y1={y} x2={600} y2={y}
            stroke="var(--accent)"
            strokeWidth="0.5"
            opacity={0.06}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 + i * 0.08, ease: EASE }}
          />
        );
      })}
    </svg>
  );
}

/* ─── Main 404 Page ────────────────────────────────────────────── */
export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isBn = locale === 'bn';
  const skip = !!useReducedMotion();

  const title = isBn ? 'সুতো ছিঁড়ে গেছে' : 'The thread is lost';
  const subtitle = isBn
    ? 'এই পৃষ্ঠাটি তাঁতে আর নেই। সুতোগুলো হারিয়ে গেছে, কিন্তু বয়ন চলছে অন্যত্র।'
    : 'This page has unraveled from the loom. The threads have come undone, but the weave continues elsewhere.';
  const backLabel = isBn ? 'ফিরে যান' : 'Back to Home';
  const shopLabel = isBn ? 'শপ দেখুন' : 'Explore Shop';

  const fadeUp = (delay: number) =>
    skip
      ? {}
      : {
          initial: { opacity: 0, y: 24 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* ── Jamdani backdrop (rich cultural pattern) ── */}
      <JamdaniBackdrop className="opacity-100" />

      {/* Background loom grid overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <LoomGrid className="w-full max-w-3xl h-auto opacity-100" />
      </div>

      {/* Soft radial highlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_60%)] opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] opacity-[0.04]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto">

        {/* 404 number */}
        <motion.div {...fadeUp(0.1)}>
          <span
            className={cn(
              'font-sans-en font-black leading-none tracking-[0.04em] select-none block',
              'text-[120px] sm:text-[160px] md:text-[200px] lg:text-[240px]',
              'text-transparent bg-clip-text',
              'bg-linear-to-b from-primary/15 via-accent/20 to-transparent'
            )}
          >
            404
          </span>
        </motion.div>

        {/* Broken thread illustration */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm -mt-6 mb-4"
          {...fadeUp(0.3)}
        >
          <BrokenThread className="w-full h-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className={cn(
            'text-2xl sm:text-3xl md:text-4xl mb-3 leading-tight',
            isBn ? 'font-bengali-serif' : 'font-editorial italic'
          )}
          {...fadeUp(0.45)}
        >
          {title}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          className="w-12 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent mb-4"
          initial={skip ? undefined : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        />

        {/* Subtitle */}
        <motion.p
          className={cn(
            'text-muted-foreground text-sm md:text-[0.9rem] max-w-sm leading-relaxed mb-8',
            isBn ? 'font-bengali' : 'font-sans-en'
          )}
          {...fadeUp(0.6)}
        >
          {subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          {...fadeUp(0.75)}
        >
          <Link
            href={`/${locale}`}
            className="group flex items-center justify-center gap-2.5 h-11 px-7 bg-primary text-primary-foreground rounded-full text-[10px] tracking-[0.2em] uppercase font-medium shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-70 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all"
            >
              <path
                d="M3 12h18M3 12l6-6M3 12l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {backLabel}
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="group flex items-center justify-center gap-2.5 h-11 px-7 bg-background text-foreground border border-border hover:border-accent/40 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-muted/50 transition-all duration-300 cursor-pointer"
          >
            {shopLabel}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Brand mark */}
        <motion.p
          className="mt-12 text-[7px] tracking-[0.4em] uppercase text-muted-foreground/30 font-sans-en select-none"
          {...fadeUp(0.9)}
        >
          W O M A N I Y A
        </motion.p>
      </div>
    </div>
  );
}
