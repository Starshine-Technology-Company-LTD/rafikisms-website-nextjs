"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/motion-presets";

export type StackCardProps = {
  mono: string;
  title: string;
  subtitle: string;
  tag: string;
  delay?: number;
};

export function StackCard({
  mono,
  title,
  subtitle,
  tag,
  delay = 0,
}: StackCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      {...cardHover}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "before:bg-gradient-to-r before:from-transparent before:via-[var(--brand-primary)] before:to-transparent"
      )}
    >
      <p className="font-mono text-xl font-semibold text-[var(--brand-primary)]">
        {mono}
      </p>
      <h3 className="mt-4 font-sans text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
      <span className="mt-6 inline-flex rounded-full border border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--brand-primary)]">
        {tag}
      </span>
    </motion.article>
  );
}
