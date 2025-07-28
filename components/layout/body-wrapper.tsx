"use client";

import { cn } from "@/lib/utils";
import { optimizeForLowEndDevices } from "@/lib/optimize-performance";
import { MobileViewportHandler } from "@/components/ui/mobile-viewport-handler";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { useEffect } from "react";

interface BodyWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Client component wrapper for the body to handle client-side functionality
 * like optimizing for low-end devices on load
 */
export function BodyWrapper({ children, className }: BodyWrapperProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      optimizeForLowEndDevices(document.body);
    }
  }, []);

  return (
    <div className={cn("w-full h-full", className)}>
      <MobileViewportHandler />
      <ServiceWorkerRegister />
      {children}
    </div>
  );
}
