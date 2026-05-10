"use client";

import { motion } from "framer-motion";
import { Check, Compass, Plug2, Rocket, TrendingUp } from "lucide-react";
import { APPROACH_STEPS } from "./approach.types";

const stepIcons = {
  onboarding: Compass,
  code: Plug2,
  launch: Rocket,
  analytics: TrendingUp,
} as const;

const stepColors = [
  { ring: "ring-brand/20", icon: "bg-brand/10 text-brand", line: "from-brand/30 to-brand/10" },
  { ring: "ring-brand/25", icon: "bg-brand/15 text-brand", line: "from-brand/25 to-brand/10" },
  { ring: "ring-brand/30", icon: "bg-brand/20 text-brand", line: "from-brand/20 to-brand/5" },
  { ring: "ring-brand/35", icon: "bg-brand/25 text-brand", line: "from-brand/15 to-transparent" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative scroll-mt-24 bg-background py-8 lg:scroll-mt-28 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="rounded-3xl border border-foreground/10 bg-card text-card-foreground shadow-[0_24px_60px_-36px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)]">

          {/* ── Header ── */}
          <div className="border-b border-foreground/10 px-6 py-8 text-center md:px-10 md:py-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand"
            >
              Our Approach
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="font-display mx-auto max-w-2xl text-3xl font-light leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
            >
              A collaboration journey,
              <br />
              <span className="text-brand">from concept to delivery</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-[15px]"
            >
              Four stages. One seamless handoff. Built for Tanzanian businesses.
            </motion.p>
          </div>

          {/* ── Step cards ── */}
          <div className="px-6 py-10 md:px-10 md:py-12">

            {/* Desktop connector line */}
            <div className="relative hidden lg:block">
              <div className="absolute left-[calc(12.5%+1.25rem)] right-[calc(12.5%+1.25rem)] top-[2.75rem] h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {APPROACH_STEPS.map((step, i) => {
                const Icon = stepIcons[step.mockupType];
                const color = stepColors[i];

                return (
                  <motion.div
                    key={step.number}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="group relative flex flex-col rounded-2xl border border-foreground/8 bg-background/60 p-6 transition-shadow duration-300 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]"
                  >
                    {/* Connector dot (desktop) */}
                    <div className="absolute -top-[2.825rem] left-1/2 hidden -translate-x-1/2 lg:flex">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand/40 ring-2 ring-brand/20 ring-offset-2 ring-offset-card transition-colors duration-300 group-hover:bg-brand group-hover:ring-brand/40" />
                    </div>

                    {/* Tag pill */}
                    <span className="mb-4 inline-flex w-fit items-center rounded-full border border-brand/20 bg-brand/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                      {step.tag}
                    </span>

                    {/* Icon */}
                    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${color.ring} ${color.icon} transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 whitespace-pre-line text-[17px] font-semibold leading-[1.25] tracking-tight text-foreground">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-5 text-[13px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>

                    {/* Points */}
                    <ul className="mt-auto space-y-2">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[12.5px] text-foreground/75">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2.5} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Subtle bottom teal glow on hover */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px rounded-b-2xl bg-gradient-to-r from-transparent via-brand/0 to-transparent transition-all duration-500 group-hover:via-brand/40" />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
