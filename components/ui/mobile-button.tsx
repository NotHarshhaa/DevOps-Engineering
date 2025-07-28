"use client";

import React, { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { useBreakpoints } from "@/hooks/use-media-query";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-11 px-8 rounded-md text-base",
        icon: "h-10 w-10",
        mobile: "h-9 py-1.5 px-3 text-sm", // Mobile-optimized size
        compact: "h-8 py-1 px-2.5 text-xs rounded-sm", // Extra compact for small screens
      },
      fullWidth: {
        true: "w-full",
      },
      mobileFullWidth: {
        true: "sm:w-auto w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  adaptToMobile?: boolean;
  activeTouchEffect?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

/**
 * A mobile-optimized button component with touch feedback,
 * appropriate sizing, and performance optimizations
 */
const MobileButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      mobileFullWidth,
      asChild = false,
      isLoading = false,
      loadingText,
      adaptToMobile = true,
      activeTouchEffect = true,
      icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const isMobile = useBreakpoints.useMobile();

    // Determine the appropriate size based on mobile detection
    const responsiveSize = adaptToMobile && isMobile
      ? size === "lg" ? "default" : size === "default" ? "mobile" : "compact"
      : size;

    // Responsive full width (only on mobile if mobileFullWidth is true)
    const useMobileFullWidth = mobileFullWidth && isMobile;

    const Comp = asChild ? Slot : "button";

    const handleTouchStart = () => {
      if (activeTouchEffect) {
        setIsPressed(true);
      }
    };

    const handleTouchEnd = () => {
      if (activeTouchEffect) {
        setIsPressed(false);
      }
    };

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size: responsiveSize,
            fullWidth: useMobileFullWidth ? true : fullWidth,
            className,
          }),
          isPressed && "scale-[0.98] opacity-90 transition-transform duration-100",
          isLoading && "opacity-90 pointer-events-none"
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && icon && iconPosition === "left" && (
          <span className="mr-2 inline-flex shrink-0">{icon}</span>
        )}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && icon && iconPosition === "right" && (
          <span className="ml-2 inline-flex shrink-0">{icon}</span>
        )}
      </Comp>
    );
  }
);

MobileButton.displayName = "MobileButton";

export { MobileButton, buttonVariants };
