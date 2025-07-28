"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { useBreakpoints } from "@/hooks/use-media-query";
import { StaticImageData } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ResponsiveImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  /**
   * Mobile-specific image source
   */
  mobileSrc?: string;
  /**
   * Tablet-specific image source
   */
  tabletSrc?: string;
  /**
   * Width ratios for different breakpoints (percentage of parent container)
   */
  widthRatio?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /**
   * Blur hash for placeholder
   */
  blurHash?: string;
  /**
   * Container class name
   */
  containerClassName?: string;
  /**
   * Whether to enable lazy loading (defaults to true)
   */
  lazyLoad?: boolean;
}

/**
 * A performance-optimized responsive image component that:
 * - Automatically selects the appropriate image source based on screen size
 * - Uses lazy loading for improved performance
 * - Handles loading states with a placeholder
 * - Prevents layout shifts with correct aspect ratio
 */
export function ResponsiveImage({
  src,
  mobileSrc,
  tabletSrc,
  alt,
  width,
  height,
  widthRatio,
  blurHash,
  className,
  containerClassName,
  lazyLoad = true,
  priority = false,
  quality = 85,
  ...props
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | StaticImageData | StaticImport | undefined>(src);

  const isMobile = useBreakpoints.useMobile();
  const isTablet = useBreakpoints.useTablet();

  // Update image source based on screen size
  useEffect(() => {
    if (isMobile && mobileSrc) {
      setImgSrc(mobileSrc);
    } else if (isTablet && tabletSrc) {
      setImgSrc(tabletSrc);
    } else {
      setImgSrc(src);
    }
  }, [isMobile, isTablet, mobileSrc, tabletSrc, src]);

  // Calculate responsive dimensions
  const getResponsiveSize = (size: number | `${number}` | undefined, type: 'width' | 'height') => {
    if (!size || typeof size !== 'number') return size;

    // Apply ratio adjustments based on breakpoint
    if (widthRatio) {
      const ratio = isMobile
        ? widthRatio.mobile ?? 1
        : isTablet
        ? widthRatio.tablet ?? 1
        : widthRatio.desktop ?? 1;

      // Only adjust width, keep aspect ratio for height
      if (type === 'width') {
        return Math.round(size * ratio);
      }
    }

    return size;
  };

  const responsiveWidth = getResponsiveSize(width, 'width');
  const responsiveHeight = getResponsiveSize(height, 'height');

  // Calculate aspect ratio for placeholder
  const aspectRatio =
    typeof width === "number" && typeof height === "number"
      ? height / width
      : undefined;

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image loading error
  const handleError = () => {
    setIsError(true);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        containerClassName
      )}
      style={{
        aspectRatio: aspectRatio,
        width: typeof responsiveWidth === 'number' ? `${responsiveWidth}px` : undefined,
        height: typeof responsiveHeight === 'number' ? `${responsiveHeight}px` : undefined
      }}
    >
      {/* Loading state placeholder */}
      {!isLoaded && !priority && (
        <div
          className="absolute inset-0 bg-muted/20 animate-pulse rounded"
          aria-hidden="true"
        />
      )}

      <Image
        src={isError ? "/placeholder.jpg" : imgSrc ?? ""}
        alt={alt}
        width={responsiveWidth}
        height={responsiveHeight}
        className={cn(
          "transition-opacity duration-300",
          isLoaded || priority ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : lazyLoad ? "lazy" : "eager"}
        placeholder={blurHash ? "blur" : "empty"}
        blurDataURL={blurHash}
        quality={quality}
        priority={priority}
        {...props}
      />
    </div>
  );
}
