"use client";

import { cn } from "@/lib/utils";
import { useBreakpoints } from "@/hooks/use-media-query";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Whether to disable transitions on mobile devices
   * @default true
   */
  disableOnMobile?: boolean;
  /**
   * Animation duration in milliseconds
   * @default 300
   */
  duration?: number;
  /**
   * Whether to fade in/out or slide in/out
   * @default "fade"
   */
  type?: "fade" | "slide" | "none";
}

/**
 * A component that provides smooth transitions between pages
 * with optimized performance for mobile devices
 */
export function PageTransition({
  children,
  className,
  disableOnMobile = true,
  duration = 300,
  type = "fade",
}: PageTransitionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString();
  const isMobile = useBreakpoints.useMobile();
  const prefersReducedMotion = useBreakpoints.usePrefersReducedMotion();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  // Skip animations if user prefers reduced motion or on mobile (if configured)
  const shouldAnimate =
    !prefersReducedMotion &&
    !(disableOnMobile && isMobile) &&
    type !== "none";

  useEffect(() => {
    // No need to animate if disabled
    if (!shouldAnimate) {
      setDisplayChildren(children);
      return;
    }

    // Start transition
    setIsTransitioning(true);

    // After animation out completes, update children
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, duration / 2);

    return () => clearTimeout(timer);
  }, [pathname, search, children, shouldAnimate, duration]);

  // Get transition styles based on type
  const getTransitionStyles = () => {
    if (!shouldAnimate) return {};

    const baseStyles = {
      transition: `opacity ${duration / 2}ms ease, transform ${duration / 2}ms ease`,
    };

    if (type === "fade") {
      return {
        ...baseStyles,
        opacity: isTransitioning ? 0 : 1,
      };
    }

    if (type === "slide") {
      return {
        ...baseStyles,
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
      };
    }

    return {};
  };

  return (
    <div
      className={cn("min-h-screen w-full", className)}
      style={getTransitionStyles()}
    >
      {displayChildren}
    </div>
  );
}
