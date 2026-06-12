"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

interface NumberTickerProps {
  value: number;
  className?: string;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/**
 * NumberTicker - 21st.dev-style animated number counter.
 * Counts up from 0 when it enters the viewport.
 */
export function NumberTicker({
  value,
  className,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  duration = 1500,
}: NumberTickerProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(eased * value);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {current.toFixed(decimalPlaces)}
      {suffix}
    </span>
  );
}
