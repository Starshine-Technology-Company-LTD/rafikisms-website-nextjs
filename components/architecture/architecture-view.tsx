"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion-presets";
import { StackCard } from "./stack-card";
import { LifecycleFlow } from "./lifecycle-flow";
import { ArchitectureStatsStrip } from "./stats-strip";
import { ArchitectureDeepDive } from "./deep-dive";

const STACK = [
  {
    mono: "Go",
    title: "Golang",
    subtitle: "Core API engine & SMPP connection workers. Goroutine-heavy dispatch paths.",
    tag: "backend",
  },
  {
    mono: "⚡",
    title: "Kafka",
    subtitle: "Distributed event streaming for parallel SMS dispatch and ordered retries.",
    tag: "messaging",
  },
  {
    mono: "▲",
    title: "Next.js",
    subtitle: "Marketing & dashboards with SSR where it matters; edge-ready assets.",
    tag: "frontend",
  },
  {
    mono: "⚙",
    title: "Laravel",
    subtitle: "Admin, billing, vendor lifecycle — operational surfaces your team uses daily.",
    tag: "platform",
  },
  {
    mono: "∥",
    title: "Parallel pools",
    subtitle: "Concurrent SMPP sessions with multiplexed gateways and health-aware routing.",
    tag: "infra",
  },
  {
    mono: "⬡",
    title: "React",
    subtitle: "Interactive dashboards — delivery timelines, queues, and operational drill-downs.",
    tag: "ui",
  },
];

export function ArchitectureView() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/60 px-4 pb-16 pt-28 md:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.09]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(10,175,160,0.25) 1px, transparent 1px),
                linear-gradient(90deg, rgba(10,175,160,0.25) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <motion.div
          className="relative mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          <motion.p
            variants={staggerItem}
            className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand-primary)]"
          >
            // system architecture
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl"
          >
            Built for scale.
            <br />
            <span className="text-muted-foreground">Engineered for reliability.</span>
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Every component chosen for throughput, fault tolerance, and East African network
            conditions — without sacrificing observability or auditability.
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-7 py-3 font-medium text-white shadow-lg shadow-[var(--brand-primary)]/25 transition hover:bg-[var(--brand-primary-dk)]"
            >
              View live status ↗
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 font-medium transition hover:bg-muted/60"
            >
              Read API docs
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Stack</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Core systems aligned to how SMS actually moves: APIs, queues, carriers, and humans.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((card, i) => (
            <StackCard key={card.title} {...card} delay={i * 0.05} />
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Request lifecycle
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            A simplified happy path — each hop is monitored, metered, and logged.
          </p>
          <div className="mt-10">
            <LifecycleFlow />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          Deep dives
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Expand sections for queue semantics, DLR paths, and how layers fit together.
        </p>
        <div className="mt-8">
          <ArchitectureDeepDive />
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/15 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Operational posture
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Targets and commitments — your integration SLAs depend on disciplined operations.
          </p>
          <div className="mt-10">
            <ArchitectureStatsStrip />
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            Traffic is engineered for compliant East African posture. SMPP sessions stay
            persistent and multiplexed, with Prometheus &amp; Grafana visibility for queue
            health, latency, and error budgets.
          </p>
        </div>
      </section>
    </main>
  );
}
