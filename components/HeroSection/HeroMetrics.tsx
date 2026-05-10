"use client";

import { cn } from "@/lib/utils";

export type MetricItem = {
  value: string;
  label: string;
  sub: string;
};

type HeroMetricsProps = {
  metrics: MetricItem[];
  className?: string;
};

export function HeroMetrics({ metrics, className }: HeroMetricsProps) {
  const cardShell =
    "rounded-2xl border border-black/[0.07] bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]";

  return (
    <div className={cn("w-full min-w-0", className)}>
      <ul className="grid grid-cols-1 gap-3 sm:hidden">
        {metrics.map((m) => (
          <li key={`${m.value}-${m.sub}-m`}>
            <div className={cn("px-4 py-4", cardShell)}>
              <p className="font-display text-2xl font-semibold tabular-nums tracking-tight text-gray-900 dark:text-white">
                {m.value}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-gray-600 dark:text-gray-400">
                {m.label}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-primary)]">
                {m.sub}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <ul className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:hidden">
        {metrics.map((m) => (
          <li key={`${m.value}-${m.sub}-t`}>
            <div
              className={cn(
                "flex h-full flex-col justify-center px-5 py-4",
                cardShell
              )}
            >
              <p className="font-display text-xl font-semibold tabular-nums tracking-tight text-gray-900 sm:text-2xl dark:text-white">
                {m.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-gray-600 dark:text-gray-400">
                {m.label}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-primary)]">
                {m.sub}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <ul className="hidden w-full min-w-0 flex-row items-start justify-between gap-8 lg:flex lg:gap-10 xl:gap-14">
        {metrics.map((m) => (
          <li
            key={`${m.value}-${m.sub}-d`}
            className="flex min-w-0 flex-1 basis-0 flex-col gap-1"
          >
            <p className="font-display text-xl font-semibold tabular-nums tracking-tight text-gray-900 xl:text-2xl dark:text-white">
              {m.value}
            </p>
            <p className="max-w-[18ch] text-xs leading-snug text-gray-600 xl:text-[13px] dark:text-gray-400">
              {m.label}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)]">
              {m.sub}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
