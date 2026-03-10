import { notFound } from 'next/navigation';

/**
 * Catch-all route for unknown paths under a valid locale.
 * Triggers the locale-level not-found.tsx with full providers & animations.
 */
export default function CatchAllPage() {
  notFound();
}
