"use client";

import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface TextShimmerProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  duration?: number;
}

/**
 * TextShimmer - animated shimmer text effect, adapts to light/dark theme.
 * Uses CSS variables (--shimmer-base, --shimmer-peak) defined in globals.css
 * so the text is always legible in both modes.
 */
const TextShimmer: FC<TextShimmerProps> = ({
  children,
  className,
  shimmerWidth = 100,
  duration = 2.5,
}) => {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
          "--duration": `${duration}s`,
        } as CSSProperties
      }
      className={cn(
        // clip text to reveal gradient
        "relative inline-block bg-clip-text text-transparent",
        // background size drives the sweep animation
        "bg-[length:200%_100%]",
        // theme-adaptive gradient defined in globals.css
        "text-shimmer-adaptive",
        // run the shimmer keyframe
        "animate-[shimmer_var(--duration)_linear_infinite]",
        className
      )}
    >
      {children}
    </span>
  );
};

export { TextShimmer };
