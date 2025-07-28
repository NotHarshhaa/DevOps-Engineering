"use client";

import { useEffect, useState } from "react";
import { useBreakpoints } from "@/hooks/use-media-query";

/**
 * A component that handles mobile viewport issues with browser UI
 * and ensures consistent layout on mobile devices
 */
export function MobileViewportHandler() {
  const isMobile = useBreakpoints.useMobile();
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!isMobile) return;

    // Function to update CSS custom property with current viewport height
    const updateViewportHeight = () => {
      // Small delay to ensure we get the correct height after any browser UI changes
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        setViewportHeight(window.innerHeight);
      }, 100);
    };

    // Initial update
    updateViewportHeight();

    // Add event listeners
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    // Handle iOS Safari address bar appearance/disappearance
    window.addEventListener('scroll', updateViewportHeight);

    // Some mobile browsers need this to handle soft keyboard appearance
    if ('visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', updateViewportHeight);
    }

    // Apply initial fix for iOS Safari 100vh issue
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

    // Add class to body for mobile-specific CSS
    document.body.classList.add('is-mobile');

    // Prevent pull-to-refresh and overscroll behaviors
    document.body.style.overscrollBehavior = 'none';

    // Prevent context menu on long press (optional, uncomment if needed)
    // document.addEventListener('contextmenu', e => e.preventDefault());

    return () => {
      // Clean up event listeners
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
      window.removeEventListener('scroll', updateViewportHeight);

      if ('visualViewport' in window) {
        window.visualViewport?.removeEventListener('resize', updateViewportHeight);
      }

      // Remove mobile class
      document.body.classList.remove('is-mobile');

      // Reset overscroll behavior
      document.body.style.overscrollBehavior = '';
    };
  }, [isMobile]);

  // Add fallback CSS for browsers without custom property support
  useEffect(() => {
    if (!isMobile || !viewportHeight) return;

    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --app-height: ${viewportHeight}px;
      }
      .vh-fix {
        height: ${viewportHeight}px !important;
        height: var(--app-height) !important;
        height: calc(var(--vh, 1vh) * 100) !important;
      }
      .min-vh-fix {
        min-height: ${viewportHeight}px !important;
        min-height: var(--app-height) !important;
        min-height: calc(var(--vh, 1vh) * 100) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isMobile, viewportHeight]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Hook that returns the current mobile viewport height
 * Useful for dynamic calculations in components
 */
export function useViewportHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      const vh = window.innerHeight;
      setHeight(vh);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return height;
}
