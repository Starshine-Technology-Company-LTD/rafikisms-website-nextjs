"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
} from "framer-motion";

const FEATURES = [
  {
    index: "01",
    title: "Human support, local to Tanzania",
    description:
      "Onboarding, training, and day-to-day assistance from a team that speaks your language — in English and Swahili.",
    points: [
      "English + Swahili support coverage",
      "Dedicated onboarding engineer",
      "98% customer satisfaction",
    ],
  },
  {
    index: "02",
    title: "Reliable delivery at scale",
    description:
      "Direct carrier integrations with Vodacom, Airtel, and Tigo ensure your messages arrive — every time.",
    points: [
      "99.7% delivery rate",
      "Real-time delivery receipts",
      "Automatic failover routing",
    ],
  },
  {
    index: "03",
    title: "Simple, transparent pricing",
    description:
      "Eight tiers in TSH. No hidden fees, no surprises. Pay only for what you send.",
    points: [
      "TSH-denominated billing",
      "No monthly minimums",
      "Volume discounts from Tier 3",
    ],
  },
  {
    index: "04",
    title: "Built-in analytics dashboard",
    description:
      "Track delivery rates, campaign performance, and cost-per-message in real time.",
    points: [
      "Live delivery tracking",
      "Campaign-level reporting",
      "Export to CSV / PDF",
    ],
  },
] as const;

const TOTAL = FEATURES.length;

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const onChange = (v: number) => {
      const raw = v * TOTAL;
      const clamped = Math.min(Math.floor(raw), TOTAL - 1);
      setActiveIndex(Math.max(0, clamped));
    };
    onChange(scrollYProgress.get());
    return scrollYProgress.on("change", onChange);
  }, [scrollYProgress]);

  const feature = FEATURES[activeIndex];

  return (
    <section id="showcase">
      {/* Header — scrolls away above the pinned zone */}
      <div className="bg-background px-6 pb-10 pt-24 text-center md:pt-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Showcase
        </p>
        <h2 className="font-display mx-auto max-w-2xl text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
          Everything you need to
          <br />
          run SMS at scale.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
          Purpose-built for Tanzania, proven in production.
        </p>
      </div>

      {/* Tall scroll budget — sticky child pins for TOTAL × 100vh */}
      <div
        ref={containerRef}
        className="relative bg-background"
        style={{ height: `${TOTAL * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center px-6 md:px-12">
          {/* Progress — brand active, muted inactive (theme-aware) */}
          <div className="absolute left-1/2 top-8 z-10 flex -translate-x-1/2 items-center gap-2">
            {FEATURES.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === activeIndex ? 24 : 6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`h-1.5 shrink-0 rounded-full ${
                  i === activeIndex
                    ? "bg-brand-strong dark:bg-brand"
                    : "bg-muted-foreground/35 dark:bg-muted-foreground/45"
                }`}
              />
            ))}
          </div>

          {/* One card — matches Features / Pricing surfaces */}
          <div className="flex h-[75vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card shadow-sm md:flex-row dark:border-border dark:bg-card">
            <div className="flex flex-1 flex-col justify-center overflow-y-auto p-8 md:p-12 lg:p-14">
              <motion.div
                key={`counter-${activeIndex}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/10 bg-muted/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm dark:bg-muted/40"
              >
                <span className="font-mono font-semibold text-foreground">
                  {feature.index}
                </span>
                <span>/</span>
                <span className="font-mono">{String(TOTAL).padStart(2, "0")}</span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${activeIndex}`}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-5 max-w-sm font-display text-3xl font-light leading-tight text-foreground md:text-4xl"
                >
                  {feature.title}
                </motion.h3>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeIndex}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-8 max-w-sm text-base leading-relaxed text-muted-foreground"
                >
                  {feature.description}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={`points-${activeIndex}`}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="mb-10 space-y-3"
                >
                  {feature.points.map((point) => (
                    <motion.li
                      key={point}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      className="flex items-center gap-3 text-sm text-foreground/90"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-strong">
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              <motion.a
                key={`cta-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                href="#pricing"
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-brand transition-opacity hover:opacity-90"
              >
                See it in action
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </div>

            {/* RIGHT — crossfade; surfaces follow theme */}
            <div className="relative hidden flex-1 overflow-hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${activeIndex}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center bg-muted/30 dark:bg-muted/20"
                >
                  <div
                    className="h-56 w-56 rounded-full bg-brand/25 opacity-70 blur-3xl dark:bg-brand/20 dark:opacity-80"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-8 rounded-2xl border border-dashed border-foreground/15 dark:border-foreground/20" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {activeIndex === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Scroll
                </span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    ease: "easeInOut",
                  }}
                  className="h-6 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
