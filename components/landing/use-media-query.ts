"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState<boolean>(defaultValue);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 640px)", false);
}

export function useIsTablet(): boolean {
  return useMediaQuery("(max-width: 1024px)", false);
}

/**
 * When true, render showcase as a vertical card list (no sticky scrub).
 * Uses max-width 767px (below Tailwind `md`) — not the global 1024px tablet query —
 * so inset IDE / Cursor preview panes (often ≤1024px wide) still get the scroll-driven
 * deck; only phones/small viewports stack.
 */
export function useShowcaseStackedList(): boolean {
  const narrow = useMediaQuery("(max-width: 767px)", false);
  const reduceMotion = usePrefersReducedMotion();
  return narrow || reduceMotion;
}
