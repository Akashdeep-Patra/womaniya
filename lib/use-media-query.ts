import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Initialise synchronously on the client so the first paint matches reality
  // and avoids a hydration mismatch that causes layout shift.
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    // Sync in case the value drifted between the useState initialiser and the
    // first effect run (e.g. SSR → hydration boundary).
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
