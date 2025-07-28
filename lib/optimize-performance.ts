/**
 * Performance optimization utilities for Next.js applications
 */

// Add types for performance entries
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory: number;
}

interface NavigatorWithConcurrency extends Navigator {
  hardwareConcurrency: number;
}

/**
 * Defers non-critical resources by dynamically loading scripts after the main page load
 * @param {string} src - URL of the script to load
 * @param {boolean} async - Whether to load the script asynchronously
 * @param {string} id - Optional ID for the script element
 */
export function deferScript(src: string, async = true, id?: string): void {
  if (typeof window === 'undefined') return;

  const loadScript = () => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    if (id) script.id = id;
    document.body.appendChild(script);
  };

  if (document.readyState === 'complete') {
    loadScript();
  } else {
    window.addEventListener('load', loadScript);
  }
}

/**
 * Preloads critical assets to improve performance
 * @param {string[]} resources - Array of resource URLs to preload
 * @param {string} type - Resource type (e.g., 'image', 'script', 'style', 'font')
 */
export function preloadResources(resources: string[], type: 'image' | 'script' | 'style' | 'font'): void {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = type;
    link.href = resource;
    if (type === 'font') {
      link.setAttribute('crossorigin', 'anonymous');
    }
    document.head.appendChild(link);
  });
}

/**
 * Prevents layout shifts by pre-allocating space for elements that load dynamically
 * @param {HTMLElement} element - The element to apply the placeholder to
 * @param {number} width - Width of the element in pixels
 * @param {number} height - Height of the element in pixels
 * @param {string} bgColor - Background color of the placeholder
 */
export function createPlaceholder(
  element: HTMLElement | null,
  width: number,
  height: number,
  bgColor = 'transparent'
): void {
  if (!element) return;

  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.backgroundColor = bgColor;
  element.style.display = 'block';
}

/**
 * Optimizes image loading by setting appropriate fetch priority
 * @param {HTMLImageElement} imgElement - The image element to optimize
 * @param {'high' | 'low' | 'auto'} priority - Loading priority
 */
export function optimizeImageLoading(imgElement: HTMLImageElement | null, priority: 'high' | 'low' | 'auto' = 'auto'): void {
  if (!imgElement) return;

  // Set loading attribute based on priority
  if (priority === 'high') {
    imgElement.setAttribute('loading', 'eager');
    imgElement.setAttribute('fetchpriority', 'high');
  } else if (priority === 'low') {
    imgElement.setAttribute('loading', 'lazy');
    imgElement.setAttribute('fetchpriority', 'low');
  } else {
    imgElement.setAttribute('loading', 'lazy');
  }

  // Add decoding attribute for better rendering performance
  imgElement.setAttribute('decoding', 'async');
}

/**
 * Debounces a function to prevent excessive executions
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttles a function to limit execution frequency
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Monitors and reports Core Web Vitals metrics
 * @returns Object with methods to access performance metrics
 */
export function monitorWebVitals() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return { getCLS: () => null, getFID: () => null, getLCP: () => null };
  }

  let lcp: number | null = null;
  let fid: number | null = null;
  let cls: number | null = null;

  // Largest Contentful Paint
  try {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      lcp = lastEntry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP monitoring not supported', e);
  }

  // First Input Delay
  try {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        const firstInputEntry = entry as unknown as FirstInputEntry;
        if (!fid || entry.startTime < fid) {
          fid = firstInputEntry.processingStart - entry.startTime;
        }
      });
    }).observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID monitoring not supported', e);
  }

  // Cumulative Layout Shift
  try {
    let cumulativeLayoutShift = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        const layoutShiftEntry = entry as unknown as LayoutShiftEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          cumulativeLayoutShift += layoutShiftEntry.value;
          cls = cumulativeLayoutShift;
        }
      });
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('CLS monitoring not supported', e);
  }

  return {
    getCLS: () => cls,
    getFID: () => fid,
    getLCP: () => lcp
  };
}

/**
 * Checks if the device is a mobile device
 * @returns {boolean} True if the device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia('(max-width: 767px)').matches);
}

/**
 * Reduces animation complexity on low-end devices
 * @param {HTMLElement} element - Element to apply optimization to
 */
export function optimizeForLowEndDevices(element: HTMLElement | null): void {
  if (!element || typeof window === 'undefined') return;

  const hasLowMemory = 'deviceMemory' in navigator && 
    (navigator as NavigatorWithMemory).deviceMemory < 4;
  const hasLowCores = 'hardwareConcurrency' in navigator && 
    (navigator as NavigatorWithConcurrency).hardwareConcurrency < 4;

  const isLowEnd = isMobileDevice() || hasLowMemory || hasLowCores;

  if (isLowEnd) {
    element.classList.add('reduced-motion');
    document.documentElement.classList.add('reduce-motion');
  }
}
