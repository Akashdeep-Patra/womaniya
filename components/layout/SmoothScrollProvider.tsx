'use client';

/**
 * SmoothScrollProvider — Lenis disabled to fix scroll issues.
 * Native scroll + CSS scroll-behavior handles anchor links.
 * Re-enable Lenis later if needed with proper integration.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
