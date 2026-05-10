"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { landingContent } from "./content";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const faq = landingContent.faq;

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/35 to-transparent"
      />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-mono uppercase tracking-[0.18em] text-brand">
            {faq.eyebrow}
          </span>
          <h2 className="font-display text-3xl tracking-tight lg:text-5xl">
            {faq.title}{" "}
            <span className="text-brand">{faq.subtitle}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            {faq.description}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`relative overflow-hidden rounded-2xl border bg-background/80 backdrop-blur-[2px] transition-colors ${
                  isOpen
                    ? "border-brand/35 bg-gradient-to-br from-brand/[0.06] to-transparent shadow-[0_12px_40px_-24px_rgba(10,175,160,0.35)] dark:from-brand/[0.08]"
                    : "border-foreground/10 hover:border-foreground/20"
                }`}
              >
                {/* teal left bar when open */}
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 bottom-0 w-1 bg-brand origin-center"
                />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left px-5 lg:px-6 py-5"
                >
                  <span className="text-sm lg:text-base font-medium">
                    {item.q}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isOpen
                        ? "bg-brand text-white"
                        : "bg-foreground/[0.04] text-foreground/70"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-2xl px-5 pb-5 text-sm leading-relaxed text-muted-foreground lg:px-6 lg:text-[15px]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
