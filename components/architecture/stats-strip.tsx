"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS: {
  value: string;
  countEnd?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}[] = [
  {
    value: "",
    countEnd: 120,
    prefix: "<",
    suffix: "ms",
    label: "API response",
    detail: "target | regional edge",
  },
  {
    value: "",
    countEnd: 99.97,
    suffix: "%",
    label: "uptime discipline",
    detail: "operations practice",
  },
  {
    value: "inf",
    label: "horizontal scale",
    detail: "workers | partitions",
  },
  {
    value: "3+",
    label: "MNO integrations",
    detail: "direct carrier routes",
  },
  {
    value: "SMPP v3.4",
    label: "protocol",
    detail: "carrier-facing submit",
  },
  {
    value: "PostgreSQL + Redis",
    label: "data layer",
    detail: "durable + fast path",
  },
];

function CountValue({
  prefix = "",
  end,
  suffix = "",
}: {
  prefix?: string;
  end: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - p) ** 3;
      setV(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  const decimals = end % 1 !== 0 ? 2 : 0;
  const shown =
    decimals > 0 ? v.toFixed(decimals) : String(Math.round(v));

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

export function ArchitectureStatsStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STATS.map((s) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-1 rounded-xl border border-border/60 bg-card/60 px-5 py-4"
        >
          <span className="font-mono text-xl font-semibold tracking-tight text-[var(--brand-primary)] md:text-2xl">
            {s.countEnd !== undefined ? (
              <CountValue
                prefix={s.prefix}
                end={s.countEnd}
                suffix={s.suffix}
              />
            ) : (
              <span>{s.value}</span>
            )}
          </span>
          <span className="text-sm font-medium">{s.label}</span>
          <span className="text-xs text-muted-foreground">{s.detail}</span>
        </motion.div>
      ))}
    </div>
  );
}
