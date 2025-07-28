import { useEffect, useState } from 'react';

/**
 * Custom hook for detecting if a media query matches.
 *
 * @param query - The media query to check against (e.g., '(max-width: 768px)')
 * @returns A boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null to indicate it hasn't been computed yet
  const [matches, setMatches] = useState<boolean>(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Avoid running during SSR
    if (typeof window === 'undefined') return undefined;

    // Create a media query list
    const mediaQueryList = window.matchMedia(query);

    // Define the handler function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial state
    setMatches(mediaQueryList.matches);

    // Use the modern event listener for compatibility
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Clean up
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Pre-configured media query hooks for common breakpoints
 */
export const useBreakpoints = {
  /**
   * Matches screens below 480px
   */
  useMobile: () => useMediaQuery('(max-width: 479px)'),

  /**
   * Matches screens below 768px (mobile and tablet portrait)
   */
  useTablet: () => useMediaQuery('(max-width: 767px)'),

  /**
   * Matches screens below 1024px (mobile, tablet portrait and landscape)
   */
  useTabletLandscape: () => useMediaQuery('(max-width: 1023px)'),

  /**
   * Matches screens below 1280px (everything except large desktop)
   */
  useDesktop: () => useMediaQuery('(max-width: 1279px)'),

  /**
   * Matches screens at least 1280px (large desktop)
   */
  useLargeDesktop: () => useMediaQuery('(min-width: 1280px)'),

  /**
   * Matches screens when prefers-reduced-motion is enabled
   */
  usePrefersReducedMotion: () => useMediaQuery('(prefers-reduced-motion: reduce)'),

  /**
   * Matches screens when prefers-color-scheme is dark
   */
  usePrefersDarkMode: () => useMediaQuery('(prefers-color-scheme: dark)'),
};
