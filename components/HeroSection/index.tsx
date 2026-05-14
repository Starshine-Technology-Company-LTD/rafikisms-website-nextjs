"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { landingContent } from "@/components/landing/content";
import { useIsMobile } from "./hooks/useIsMobile";
import { EarthGlobe } from "./EarthGlobe";
import { SparklesBackground } from "./SparklesBackground";
import { AnimatedTypewriter } from "./HeroHeadline";
import { HeroBadge } from "./HeroBadge";
import { HeroMetrics, type MetricItem } from "./HeroMetrics";
import { usePrefersReducedMotion } from "@/components/landing/use-media-query";

const TAGS = ["Live Chat", "People", "Campaign", "Dashboard"] as const;

const METRICS: MetricItem[] = [
  {
    value: "99.99%",
    label: "platform uptime target",
    sub: "RAFIKI OPERATIONS",
  },
  { value: "24/7", label: "delivery monitoring", sub: "NOC TEAM" },
  {
    value: "API-first",
    label: "vendor integrations",
    sub: "RAFIKI API",
  },
  {
    value: "<3s",
    label: "queue to provider handoff",
    sub: "RAFIKI PIPELINE",
  },
];

type HeroSectionProps = {
  /** Vendor SPA registration (falls back to /register when omitted). */
  vendorRegisterUrl?: string;
};

export default function HeroSection({ vendorRegisterUrl }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();

  const words = landingContent.hero.rotatingWords;
  const hero = landingContent.hero;

  return (
    <section
      id="main-content"
      ref={ref}
      className="relative w-full px-4 pb-16 pt-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-black/[0.08] bg-white/80 backdrop-blur-sm shadow-[0_4px_32px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] transition-colors dark:border-white/10 dark:bg-[#0f0f0f] dark:shadow-[0_0_80px_rgba(10,175,160,0.12),0_25px_50px_rgba(0,0,0,0.5)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(128,128,128,0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(128,128,128,0.35) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <SparklesBackground
          densityOverride={
            reduceMotion ? 120 : isMobile ? 180 : undefined
          }
          reducedMotion={reduceMotion}
        />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-10">
            <div className="w-full flex-1 space-y-6 lg:w-[55%]">
              <HeroBadge inView={inView} label={hero.eyebrow} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="font-display text-[clamp(2.25rem,8vw,3.45rem)] font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-[clamp(2.6rem,7vw,3.85rem)] lg:text-[clamp(3rem,4.2vw,4.5rem)] dark:text-white">
                  <span className="block">{hero.headlineStart}</span>
                  <span className="block">
                    {hero.headlinePrefix}{" "}
                    <span className="relative inline-block">
                      <AnimatedTypewriter
                        words={words}
                        className="text-[var(--brand-primary)] underline decoration-[var(--brand-primary)]/40 underline-offset-[6px]"
                      />
                    </span>
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.45 }}
                className="max-w-md text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400"
              >
                {hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href={vendorRegisterUrl ?? "/register"}
                  className="
                    inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 py-3
                    font-medium text-white shadow-lg shadow-[rgba(10,175,160,0.22)] transition-all duration-200
                    hover:scale-[1.02] hover:bg-[var(--brand-primary-dk)] hover:shadow-[rgba(10,175,160,0.35)]
                  "
                >
                  {hero.primaryCta}
                  <span aria-hidden>{"->"}</span>
                </a>
                <a
                  href="#developers"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 font-medium text-gray-800 transition-all duration-200 hover:scale-[1.02] hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/8"
                >
                  {hero.secondaryCta}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.65 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {TAGS.map((tag, i) => (
                  <span
                    key={tag}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
                      i === 2
                        ? "border-[var(--brand-primary)]/50 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                        : "border-black/10 text-gray-400 dark:border-white/10 dark:text-gray-500"
                    }`}
                  >
                    {i === 2 && (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-primary)]" />
                    )}
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.35,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex w-full shrink-0 justify-center lg:w-[45%]"
            >
              <EarthGlobe />
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 border-t border-black/6 bg-black/[0.015] px-5 py-6 sm:px-8 sm:py-7 md:px-12 lg:px-16 dark:border-white/8 dark:bg-white/[0.02]">
          <HeroMetrics metrics={METRICS} />
        </div>
      </motion.div>
    </section>
  );
}
