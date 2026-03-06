'use client';

export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 left-1/2 -translate-x-1/2 max-w-[1800px] z-[9998] h-full w-full opacity-[0.025] mix-blend-overlay bg-noise" />
  );
}
