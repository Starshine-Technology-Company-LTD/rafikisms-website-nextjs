"use client";

import { Sparkles } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

type SparklesBackgroundProps = {
  className?: string;
  densityOverride?: number;
  reducedMotion?: boolean;
};

/** Theme via `dark:` layers so SSR matches `.dark` on `<html>` - no `useTheme` flash. */
export function SparklesBackground({
  className,
  densityOverride,
  reducedMotion,
}: SparklesBackgroundProps) {
  const lightDensity = densityOverride ?? 320;
  const darkDensity =
    densityOverride !== undefined ? Math.round(densityOverride * 1.35) : 520;

  return (
    <>
      <Sparkles
        className={cn(
          "absolute inset-0 z-0 block dark:hidden",
          className
        )}
        color="var(--brand-primary)"
        background="transparent"
        density={lightDensity}
        opacity={0.35}
        size={0.95}
        speed={1.2}
        hover={false}
        mousemove={false}
        reducedMotion={reducedMotion}
      />
      <Sparkles
        className={cn(
          "absolute inset-0 z-0 hidden dark:block",
          className
        )}
        color="var(--brand-primary)"
        background="transparent"
        density={darkDensity}
        opacity={0.65}
        size={1.35}
        speed={1.2}
        hover={false}
        mousemove={false}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
