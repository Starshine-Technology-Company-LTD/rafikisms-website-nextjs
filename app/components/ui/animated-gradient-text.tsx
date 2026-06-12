import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * AnimatedGradientText - badge with rotating conic gradient border.
 * Background and border adapt to both light and dark themes.
 */
export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "group relative flex max-w-fit items-center justify-center rounded-full",
        // border adapts: subtle on both light and dark
        "border border-black/10 dark:border-white/10",
        // background: white-glass in light, dark-glass in dark
        "bg-white/80 dark:bg-black/80",
        "px-4 py-1.5 text-sm",
        "shadow-[inset_0_-6px_10px_#14b8a615] dark:shadow-[inset_0_-6px_10px_#14b8a625]",
        "backdrop-blur-sm",
        "transition-shadow duration-500 ease-out hover:shadow-[inset_0_-6px_10px_#14b8a625] dark:hover:shadow-[inset_0_-6px_10px_#14b8a640]",
        className
      )}
    >
      {/* Rotating gradient ring */}
      <span
        className="absolute inset-0 rounded-full overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="absolute inset-[-1px] rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg 270deg, var(--brand) 360deg)",
            animation: "spin 3s linear infinite",
          }}
        />
        {/* Inner fill matches card background - adapts to theme */}
        <span className="absolute inset-[1px] rounded-full bg-white dark:bg-black" />
      </span>
      <span className="relative z-10">{children}</span>
    </div>
  );
}
