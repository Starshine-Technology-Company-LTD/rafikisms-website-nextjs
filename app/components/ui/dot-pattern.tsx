import { cn } from "@/app/lib/utils";
import { useId } from "react";

interface DotPatternProps {
  className?: string;
  cx?: number;
  cy?: number;
  cr?: number;
  width?: number;
  height?: number;
  color?: string;
}

/**
 * DotPattern - 21st.dev-style SVG dot grid background pattern.
 */
export function DotPattern({
  className,
  cx = 1,
  cy = 1,
  cr = 1,
  width = 24,
  height = 24,
  color = "rgba(20,184,166,0.15)",
}: DotPatternProps) {
  const id = `dot-pattern-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
