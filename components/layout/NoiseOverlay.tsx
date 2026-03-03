'use client';

export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] h-full w-full opacity-[0.025] mix-blend-overlay bg-noise" />
  );
}
