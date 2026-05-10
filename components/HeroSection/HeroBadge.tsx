"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroBadgeProps = {
  inView: boolean;
  label: string;
  className?: string;
};

export function HeroBadge({ inView, label, className }: HeroBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 }}
      className={cn("flex items-center gap-2", className)}
    >
      <div className="h-px w-8 bg-[var(--brand-primary)]" />
      <span className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </motion.div>
  );
}
