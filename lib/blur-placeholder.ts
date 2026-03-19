/**
 * Universal blur placeholder for Next.js <Image> components.
 *
 * A 1×1 px PNG in the brand cream (#F9F6F0 / bengal-kori).
 * Used as `blurDataURL` with `placeholder="blur"` to give all
 * lazily-loaded product/category images a smooth fade-in instead
 * of a hard pop-in.
 *
 * For local static images, Next.js can auto-generate blurDataURL at
 * build time — but for dynamic blob URLs we need this fallback.
 */
export const BLUR_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4+e0DAAXLAuCQ1h8WAAAAAElFTkSuQmCC';
