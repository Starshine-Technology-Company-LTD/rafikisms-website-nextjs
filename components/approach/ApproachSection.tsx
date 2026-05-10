"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  UserPlus,
  FileCheck2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
} from "lucide-react";
import { APPROACH_STEPS } from "./approach.types";

/* ─── Icon + accent per step ──────────────────────────────────── */
const stepConfig = {
  register: {
    Icon: UserPlus,
    accent: "bg-brand/10 text-brand ring-brand/20",
    bar:   "bg-brand",
    glow:  "via-brand/30",
  },
  kyc: {
    Icon: FileCheck2,
    accent: "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-500/20",
    bar:   "bg-violet-500",
    glow:  "via-violet-400/20",
  },
  approve: {
    Icon: ShieldCheck,
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
    bar:   "bg-emerald-500",
    glow:  "via-emerald-400/20",
  },
  send: {
    Icon: Zap,
    accent: "bg-amber-500/10 text-amber-600 dark:text-amberald-400 ring-amber-500/20",
    bar:   "bg-amber-500",
    glow:  "via-amber-400/20",
  },
} as const;

/* ─── Registration mockup (right-side visual) ────────────────── */
function RegisterMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[240px] rounded-2xl border border-foreground/10 bg-background shadow-lg">
      <div className="border-b border-foreground/8 px-4 py-3">
        <p className="text-[11px] font-semibold text-foreground">Create vendor account</p>
        <p className="text-[10px] text-muted-foreground">Step 1 of 4</p>
      </div>
      <div className="space-y-3 p-4">
        {[
          { label: "Business name", val: "AfyaConnect Ltd" },
          { label: "Work email", val: "ops@afyaconnect.co.tz" },
          { label: "Phone", val: "+255 762 000 000" },
        ].map((f) => (
          <div key={f.label}>
            <p className="mb-1 text-[9px] font-medium text-muted-foreground uppercase tracking-wide">{f.label}</p>
            <div className="rounded-lg border border-foreground/10 bg-muted/40 px-2.5 py-1.5">
              <p className="text-[11px] text-foreground">{f.val}</p>
            </div>
          </div>
        ))}
        <div className="mt-1 rounded-lg bg-brand px-3 py-2 text-center">
          <p className="text-[11px] font-semibold text-white">Create account →</p>
        </div>
      </div>
    </div>
  );
}

function KycMockup() {
  const docs = [
    { label: "Business Registration Cert.", done: true },
    { label: "Director National ID", done: true },
    { label: "Proof of address", done: false },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[240px] rounded-2xl border border-foreground/10 bg-background shadow-lg">
      <div className="border-b border-foreground/8 px-4 py-3">
        <p className="text-[11px] font-semibold text-foreground">KYC verification</p>
        <p className="text-[10px] text-muted-foreground">Step 2 of 4</p>
      </div>
      <div className="space-y-2.5 p-4">
        {docs.map((d) => (
          <div key={d.label} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${d.done ? "border-emerald-500/20 bg-emerald-500/6" : "border-dashed border-foreground/15 bg-muted/30"}`}>
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${d.done ? "bg-emerald-500 text-white" : "border border-foreground/20 bg-transparent"}`}>
              {d.done && <Check className="h-3 w-3" strokeWidth={2.5} />}
            </div>
            <p className={`text-[10.5px] leading-snug ${d.done ? "text-foreground" : "text-muted-foreground"}`}>{d.label}</p>
          </div>
        ))}
        <div className="mt-1 rounded-lg border border-dashed border-brand/30 bg-brand/5 px-3 py-2 text-center">
          <p className="text-[10px] font-medium text-brand">+ Upload document</p>
        </div>
      </div>
    </div>
  );
}

function ApproveMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[240px] rounded-2xl border border-emerald-500/20 bg-background shadow-lg">
      <div className="border-b border-foreground/8 px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-foreground">Account approved</p>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>
      </div>
      <div className="space-y-2.5 p-4">
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Your API key</p>
          <div className="flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-muted/40 px-2.5 py-2">
            <p className="font-mono text-[10px] text-foreground">sk_vendor_••••••••</p>
            <span className="ml-auto rounded bg-brand/10 px-1.5 py-0.5 text-[8px] font-medium text-brand">Copy</span>
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Sender IDs</p>
          {["AFYACONNECT", "AFYA-SMS"].map((s) => (
            <div key={s} className="mb-1 flex items-center justify-between rounded-lg border border-foreground/8 bg-muted/30 px-2.5 py-1.5">
              <p className="font-mono text-[10px] text-foreground">{s}</p>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SendMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[240px] rounded-2xl border border-foreground/10 bg-background shadow-lg">
      <div className="border-b border-foreground/8 px-4 py-3">
        <p className="text-[11px] font-semibold text-foreground">First message sent</p>
        <p className="text-[10px] text-muted-foreground">Step 4 of 4</p>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="rounded-lg border border-foreground/8 bg-muted/30 p-2.5">
          <p className="font-mono text-[9.5px] leading-relaxed text-foreground/80">{`POST /v1/vendor/send-sms`}</p>
          <p className="font-mono text-[9.5px] text-muted-foreground">{`X-API-Key: sk_vendor_xxx`}</p>
          <p className="mt-1 font-mono text-[9px] text-brand">{`{ "phone": "255712...", `}</p>
          <p className="font-mono text-[9px] text-brand">{`  "message": "Order confirmed" }`}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/8 px-3 py-2">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
          <div>
            <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">Message delivered</p>
            <p className="text-[9px] text-muted-foreground">Vodacom · 1.2s · AFYACONNECT</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground">🎉 Your first live SMS</p>
        </div>
      </div>
    </div>
  );
}

const mockups = {
  register: RegisterMockup,
  kyc:      KycMockup,
  approve:  ApproveMockup,
  send:     SendMockup,
};

/* ─── Step row ───────────────────────────────────────────────── */
function StepRow({
  step,
  index,
  isLast,
}: {
  step: (typeof APPROACH_STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const cfg  = stepConfig[step.mockupType];
  const Icon = cfg.Icon;
  const Mockup = mockups[step.mockupType];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* Content side */}
      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
        {/* Step badge + duration */}
        <div className="mb-5 flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${cfg.accent}`}>
            <Icon className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Step {step.number}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full border border-transparent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${cfg.accent}`}>
              {step.tag}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-full border border-foreground/10 bg-muted/40 px-2.5 py-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {step.duration}
          </div>
        </div>

        <h3 className="mb-3 whitespace-pre-line text-2xl font-semibold leading-[1.2] tracking-tight text-foreground sm:text-[26px]">
          {step.title}
        </h3>
        <p className="mb-6 text-[14px] leading-relaxed text-muted-foreground">{step.description}</p>

        <ul className="space-y-2.5">
          {step.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-[13px] text-foreground/80">
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand/12">
                <Check className="h-2.5 w-2.5 text-brand" strokeWidth={3} />
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </div>

      {/* Mockup side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`flex justify-center lg:justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative w-full max-w-[280px]">
          {/* Glow */}
          <div className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${cfg.glow} opacity-40 blur-2xl`} />
          <Mockup />
        </div>
      </motion.div>

      {/* Vertical connector (between rows) */}
      {!isLast && (
        <div className="absolute -bottom-10 left-5 hidden h-10 w-px bg-gradient-to-b from-foreground/15 to-transparent lg:left-[calc(50%-0.5px)] lg:block" />
      )}
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative scroll-mt-24 bg-background py-16 lg:scroll-mt-28 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-16 text-center">
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
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-[15px]"
          >
            Getting started with Rafiki SMS is simple. Four easy steps — from creating
            your account to sending your first live SMS in Tanzania.
          </motion.p>

          {/* Progress pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-0 overflow-hidden rounded-full border border-foreground/10 bg-muted/40"
          >
            {APPROACH_STEPS.map((s, i) => {
              const cfg = stepConfig[s.mockupType];
              return (
                <div key={s.number} className="flex items-center">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold`}>
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white ${cfg.bar}`}>
                      {s.number}
                    </span>
                    <span className="hidden text-muted-foreground sm:inline">{s.tag}</span>
                  </div>
                  {i < APPROACH_STEPS.length - 1 && (
                    <span className="text-foreground/20">›</span>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-20 lg:space-y-28">
          {APPROACH_STEPS.map((step, i) => (
            <StepRow
              key={step.number}
              step={step}
              index={i}
              isLast={i === APPROACH_STEPS.length - 1}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-20 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Ready to get started? Registration takes under 10 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Create your account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              Read API docs
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
