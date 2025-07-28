import { useEffect, useState, useRef } from 'react';

type UseLazyLoadOptions = {
  /**
   * The root element to use as the viewport for checking visibility
   */
  root?: Element | Document | null;
  /**
   * Margin around the root element
   */
  rootMargin?: string;
  /**
   * Threshold at which the callback should be triggered
   */
  threshold?: number | number[];
  /**
   * Whether to keep observing after the element has been intersected
   */
  keepObserving?: boolean;
};

/**
 * A custom hook that detects when an element enters the viewport
 * and can be used for lazy loading components or images
 */
export const useLazyLoad = <T extends Element>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  keepObserving = false,
}: UseLazyLoadOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (isElementIntersecting) {
          setHasIntersected(true);

          // If we don't need to keep observing, unobserve after first intersection
          if (!keepObserving) {
            observer.unobserve(element);
          }
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [root, rootMargin, threshold, keepObserving]);

  return { ref, isIntersecting, hasIntersected };
};
