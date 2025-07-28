"use client";

import { useEffect, useState } from "react";
import Footer from "../landing/footer";
import { Header } from "./header";
import { cn } from "@/lib/utils";
import { useBreakpoints } from "@/hooks/use-media-query";
import { optimizeForLowEndDevices } from "@/lib/optimize-performance";

interface LandingLayoutProps {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function LandingLayout({
  children,
  className,
  hideHeader = false,
  hideFooter = false,
}: LandingLayoutProps) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const isMobile = useBreakpoints.useMobile();
  const prefersReducedMotion = useBreakpoints.usePrefersReducedMotion();

  // Initialize performance optimizations
  useEffect(() => {
    // Set loaded state for fade-in animations
    setIsPageLoaded(true);

    // Apply performance optimizations for mobile and low-end devices
    if (isMobile || prefersReducedMotion) {
      optimizeForLowEndDevices(document.body);
    }

    // Optimize scroll behavior
    const handleScroll = () => {
      // Add a small delay before processing scroll events on mobile
      if (isMobile) {
        return window.requestAnimationFrame(() => {
          // Implement any scroll-based UI changes here
        });
      }
    };

    // Add passive event listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background",
        isPageLoaded ? "animate-fade-in" : "opacity-0",
        className
      )}
    >
      {!hideHeader && <Header />}
      <main
        className={cn(
          "container-safe flex-1",
          isMobile ? "compact-mobile" : ""
        )}
      >
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
