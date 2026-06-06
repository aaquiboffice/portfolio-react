import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(query);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [query]);
  return matches;
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

export function useIsSmall() {
  return useMediaQuery('(max-width: 640px)');
}
