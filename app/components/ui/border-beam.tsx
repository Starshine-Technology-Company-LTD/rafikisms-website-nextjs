import { cn } from "@/app/lib/utils";
import { CSSProperties } from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * BorderBeam - animated border sweep effect.
 * Uses @property --border-beam-angle (defined in globals.css) for smooth
 * rotation and var(--bg-surface) so the padding-box masking adapts to
 * both light and dark themes.
 */
export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#14b8a600",
  colorTo = "#14b8a6",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
          "--border-width": borderWidth,
          "--anchor": `${anchor}deg`,
        } as CSSProperties
      }
      className={cn(
        // position + border
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "[border:calc(var(--border-width)*1px)_solid_transparent]",
        // padding-box: var(--bg-surface) adapts light ↔ dark automatically
        // border-box: rotating conic gradient creates the glowing arc
        "[background:linear-gradient(var(--bg-surface),var(--bg-surface))_padding-box,conic-gradient(from_var(--border-beam-angle,0deg),var(--color-from)_0%,var(--color-to)_10%,var(--color-from)_20%)_border-box]",
        // animation defined via @property + @keyframes in globals.css
        "[animation:border-beam_var(--duration)_linear_var(--delay)_infinite]",
        className
      )}
    />
  );
}
