import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Always start false so server and client render the same HTML during
  // hydration. useEffect updates to the real value after mount.
  const [matches, setMatches] = useState<boolean>(false);

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
