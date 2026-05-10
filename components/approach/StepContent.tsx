"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ApproachStep } from "./approach.types";

const E = [0.22, 1, 0.36, 1] as const;

const ITEM = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: E, delay: d },
  }),
};

export function StepContent({ step }: { step: ApproachStep }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.number}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        className="flex flex-col"
      >
        <motion.div
          custom={0}
          variants={ITEM}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 md:mb-5 md:px-3.5 md:py-1.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
            {step.tag}
          </span>
        </motion.div>

        <motion.h3
          custom={0.04}
          variants={ITEM}
          className="font-display mb-3 max-w-[20ch] text-foreground [font-size:clamp(1.75rem,3.5vw+0.5rem,2.75rem)] font-light leading-[1.06] tracking-[-0.04em] [white-space:pre-line] md:mb-4"
        >
          {step.title}
        </motion.h3>

        <motion.div
          custom={0.08}
          variants={ITEM}
          className="mb-4 h-0.5 w-10 rounded-full bg-brand md:mb-5"
        />

        <motion.p
          custom={0.11}
          variants={ITEM}
          className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {step.description}
        </motion.p>

        <motion.ul custom={0.15} variants={ITEM} className="mb-6 space-y-2.5 md:mb-8 md:space-y-3">
          {step.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm text-foreground/85 md:gap-3"
            >
              <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-brand/15">
                <svg
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                  className="text-brand"
                  aria-hidden
                >
                  <path
                    d="M1 3L2.8 5L7 1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </motion.ul>

        <motion.a
          custom={0.2}
          variants={ITEM}
          href="#pricing"
          className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-brand"
        >
          See it in action
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </motion.a>
      </motion.div>
    </AnimatePresence>
  );
}
