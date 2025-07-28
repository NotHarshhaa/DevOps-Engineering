"use client";

import { useLazyLoad } from "@/hooks/use-lazy-load";
import { useBreakpoints } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  /**
   * Fallback image to display when an error occurs
   */
  fallbackSrc?: string;
  /**
   * Optional blur hash data URL for placeholder
   */
  blurDataURL?: string;
  /**
   * Optional class for the placeholder wrapper
   */
  placeholderClassName?: string;
  /**
   * Root margin for the IntersectionObserver
   * @default "200px"
   */
  rootMargin?: string;
  /**
   * Additional classes for the wrapper div
   */
  wrapperClassName?: string;
}

/**
 * A component that lazy loads images only when they enter the viewport
 * for better performance and reduced initial load time
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  className,
  placeholderClassName,
  wrapperClassName,
  rootMargin = "200px",
  blurDataURL,
  placeholder = blurDataURL ? "blur" : "empty",
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, hasIntersected } = useLazyLoad<HTMLDivElement>({
    rootMargin,
    threshold: 0.1,
  });

  const isMobile = useBreakpoints.useMobile();
  const isTablet = useBreakpoints.useTablet();

  // Determine responsive sizes if dimensions are provided
  const responsiveWidth = isMobile && width && typeof width === 'number'
    ? Math.round(width * 0.8)
    : isTablet && width && typeof width === 'number'
    ? Math.round(width * 0.9)
    : width;

  const responsiveHeight = isMobile && height && typeof height === 'number'
    ? Math.round(height * 0.8)
    : isTablet && height && typeof height === 'number'
    ? Math.round(height * 0.9)
    : height;

  // Handle loading state
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle error state
  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        wrapperClassName
      )}
      style={{
        width: typeof responsiveWidth === 'number' ? `${responsiveWidth}px` : 'auto',
        height: typeof responsiveHeight === 'number' ? `${responsiveHeight}px` : 'auto'
      }}
    >
      {/* Placeholder shown before image loads */}
      {!isLoaded && (
        <div
          className={cn(
            "absolute inset-0 bg-muted/30 animate-pulse rounded",
            placeholderClassName
          )}
          aria-hidden="true"
        />
      )}

      {/* Only render the image when it's in or near the viewport */}
      {hasIntersected && (
        <Image
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          width={responsiveWidth}
          height={responsiveHeight}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          {...props}
        />
      )}
    </div>
  );
}
