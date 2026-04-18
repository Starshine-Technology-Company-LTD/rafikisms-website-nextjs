"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full border border-foreground/10 bg-background/60 hover:border-brand/40 hover:bg-brand/5 transition-colors flex items-center justify-center"
    >
      {/* keep markup stable before mount to avoid hydration flicker */}
      <span className="sr-only">Toggle theme</span>
      {mounted ? (
        isDark ? (
          <Sun className="w-4 h-4 text-foreground" />
        ) : (
          <Moon className="w-4 h-4 text-foreground" />
        )
      ) : (
        <span className="w-4 h-4" aria-hidden />
      )}
    </button>
  );
}
