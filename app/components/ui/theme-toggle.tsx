"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-lg border border-black/8 dark:border-white/10 bg-transparent",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer",
        "border border-black/8 dark:border-white/10",
        "bg-white dark:bg-white/5",
        "text-slate-600 dark:text-slate-400",
        "hover:border-[#14b8a6]/40 dark:hover:border-[#14b8a6]/60 hover:text-[color:var(--brand-text-hover)] hover:bg-[color:var(--brand-fill)]/5",
        "transition-all duration-200",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
