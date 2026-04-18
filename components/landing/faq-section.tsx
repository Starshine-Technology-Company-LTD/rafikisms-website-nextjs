"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { landingContent } from "./content";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const faq = landingContent.faq;

  return (
    <section id="faq" className="relative w-full py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.18em] text-brand mb-4">
            {faq.eyebrow}
          </span>
          <h2 className="text-3xl lg:text-5xl font-display tracking-tight">
            {faq.title} <span className="text-brand">{faq.subtitle}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {faq.description}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`relative rounded-2xl border transition-colors overflow-hidden ${
                  isOpen
                    ? "border-brand/30 bg-brand/[0.03]"
                    : "border-foreground/10 bg-background hover:border-foreground/20"
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
                      <div className="px-5 lg:px-6 pb-5 text-sm lg:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
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
