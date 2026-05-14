"use client";

import { motion } from "framer-motion";

const STEPS = [
  { id: "client", label: "Client", sub: "REST", width: 72 },
  { id: "gateway", label: "Gateway", sub: "auth | rate", width: 92 },
  { id: "queue", label: "Queue", sub: "sms.send", width: 88 },
  { id: "pool", label: "SMPP pool", sub: "parallel", width: 92 },
  { id: "net", label: "Networks", sub: "TZ | KE | UG", width: 96 },
];

export function LifecycleFlow() {
  return (
    <div className="relative w-full overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
      <div className="flex min-w-[720px] items-center gap-0 px-2">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex shrink-0 flex-col items-center rounded-xl border border-[var(--brand-primary)]/35 bg-[var(--brand-primary)]/5 px-4 py-3 shadow-[0_0_0_1px_rgba(10,175,160,0.08)]"
              style={{ minWidth: step.width }}
            >
              <span className="font-mono text-[11px] font-medium text-[var(--brand-primary)]">
                {step.label}
              </span>
              <span className="mt-0.5 text-center text-[10px] text-muted-foreground">
                {step.sub}
              </span>
            </motion.div>
            {i < STEPS.length - 1 && (
              <FlowArrow delay={i * 0.08 + 0.15} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowArrow({ delay }: { delay: number }) {
  return (
    <div className="relative mx-1 flex h-8 w-12 shrink-0 items-center">
      <motion.svg
        width="48"
        height="12"
        viewBox="0 0 48 12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.35 }}
        className="text-[var(--brand-primary)]"
      >
        <motion.path
          d="M0 6 H36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.05, duration: 0.45, ease: "easeOut" }}
        />
        <path
          d="M38 3 L45 6 L38 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}
