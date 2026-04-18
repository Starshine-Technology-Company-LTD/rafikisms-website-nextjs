"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { FaClipboardList, FaIdCard, FaPlug, FaRocket } from "react-icons/fa";
import { landingContent } from "@/components/landing/content";

export interface ProcessStep {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  points: string[];
  illustrationLabel: string;
}

const processStepIconClass = "h-6 w-6 text-brand";

function iconForProcessStepId(id: string): ReactNode {
  switch (id) {
    case "onboarding":
      return <FaClipboardList className={processStepIconClass} aria-hidden />;
    case "sender-access":
      return <FaIdCard className={processStepIconClass} aria-hidden />;
    case "integration":
      return <FaPlug className={processStepIconClass} aria-hidden />;
    case "credits-launch":
      return <FaRocket className={processStepIconClass} aria-hidden />;
    default:
      return <FaClipboardList className={processStepIconClass} aria-hidden />;
  }
}

const STEPS: ProcessStep[] = landingContent.process.steps.map((s) => ({
  id: s.id,
  title: s.title,
  description: s.description,
  points: [...s.points],
  illustrationLabel: s.illustrationLabel,
  icon: iconForProcessStepId(s.id),
}));

interface StepSectionProps {
  step: ProcessStep;
  index: number;
  onStepActive: (index: number) => void;
  prefersReducedMotion: boolean;
}

const STEP_IN_VIEW_OPTS = {
  // Wider band than -42% so tall steps (esp. 3–4) still register while reading mid-card copy.
  margin: "-32% 0px -32% 0px" as const,
  amount: "some" as const,
};

function StepSection({
  step,
  index,
  onStepActive,
  prefersReducedMotion,
}: StepSectionProps) {
  // Long process cards: a single top pixel can sit outside the intersection band while the reader
  // is mid-card. Top + mid (50% of card) + bottom sentinels — any one in band activates the step.
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const midSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  const topIn = useInView(topSentinelRef, STEP_IN_VIEW_OPTS);
  const midIn = useInView(midSentinelRef, STEP_IN_VIEW_OPTS);
  const bottomIn = useInView(bottomSentinelRef, STEP_IN_VIEW_OPTS);

  useEffect(() => {
    if (topIn || midIn || bottomIn) onStepActive(index);
  }, [topIn, midIn, bottomIn, index, onStepActive]);

  const isLast = index === STEPS.length - 1;

  return (
    <div
      className={`scroll-mt-32 md:scroll-mt-40 ${isLast ? "pb-16 md:pb-28" : ""}`}
    >
      <div
        ref={topSentinelRef}
        className="pointer-events-none h-px w-full shrink-0"
        aria-hidden
      />
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={
          prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: "-20%" }}
        className="relative mb-16 rounded-2xl border border-brand/25 bg-card p-6 shadow-sm md:mb-20 md:p-8 dark:bg-card"
      >
        <div
          ref={midSentinelRef}
          className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-px -translate-y-1/2"
          aria-hidden
        />
        <div className="mb-4 flex items-center gap-3 md:hidden">
          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-brand/40 bg-card px-2 font-mono text-xs font-medium text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Step
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:items-start">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {step.description}
            </p>
            <ul className="mt-6 space-y-2">
              {step.points.map((p) => (
                <li
                  key={p}
                  className="flex gap-2 text-sm text-foreground/90 md:text-base"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    aria-hidden
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-brand/30 bg-muted/40 p-4 text-center text-xs font-medium text-muted-foreground dark:bg-muted/25"
            aria-label={step.illustrationLabel}
          >
            {step.illustrationLabel}
          </div>
        </div>
      </motion.div>
      <div
        ref={bottomSentinelRef}
        className="pointer-events-none h-px w-full shrink-0"
        aria-hidden
      />
    </div>
  );
}

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [maxReachedStep, setMaxReachedStep] = useState(-1);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const onStepActive = useCallback((index: number) => {
    setActiveStep(index);
    setMaxReachedStep((prev) => Math.max(prev, index));
  }, []);

  const total = STEPS.length;
  const fillScale =
    total <= 1 ? 1 : maxReachedStep < 0 ? 0 : (maxReachedStep + 1) / total;

  return (
    <div className="relative isolate grid grid-cols-1 gap-8 md:grid-cols-[80px_1fr] md:relative">
      {/* Left sticky rail — desktop only */}
      <div className="relative hidden md:flex md:flex-col md:items-center">
        <div className="sticky top-[50vh] flex -translate-y-1/2 flex-col items-center self-start">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand/40 bg-card shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={STEPS[activeStep]?.id ?? "idle"}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, scale: 0.8 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, scale: 1 }
                }
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {STEPS[activeStep]?.icon}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-3 flex min-h-[180px] w-px flex-1 origin-top">
            <div
              className="absolute inset-0 border-l-2 border-dashed border-brand/30"
              aria-hidden
            />
            <motion.div
              className="absolute inset-0 border-l-2 border-brand origin-top"
              aria-hidden
              initial={false}
              animate={{
                scaleY: prefersReducedMotion ? 1 : fillScale,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              style={{ transformOrigin: "top" }}
            />
          </div>
        </div>
      </div>

      <div>
        {STEPS.map((step, index) => (
          <StepSection
            key={step.id}
            step={step}
            index={index}
            onStepActive={onStepActive}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
