"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { APPROACH_STEPS } from "./approach.types";
import { StepContent } from "./StepContent";
import { StepMockup } from "./StepMockup";
import { WipeOverlay } from "./WipeOverlay";

const TOTAL = APPROACH_STEPS.length;

/** Scroll distance per step — keep total track short so the section doesn’t feel like endless blank canvas. */
const STEP_SCROLL_VH = 48;

export default function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isWiping, setIsWiping] = useState(false);

  const isWipingRef = useRef(false);
  const lastTriggeredRef = useRef(0);
  const timersRef = useRef<{
    mid?: ReturnType<typeof setTimeout>;
    end?: ReturnType<typeof setTimeout>;
  }>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const triggerWipe = useCallback((nextStep: number) => {
    if (isWipingRef.current) return;
    if (nextStep === lastTriggeredRef.current) return;

    lastTriggeredRef.current = nextStep;
    isWipingRef.current = true;
    setIsWiping(true);

    if (timersRef.current.mid) clearTimeout(timersRef.current.mid);
    if (timersRef.current.end) clearTimeout(timersRef.current.end);

    timersRef.current.mid = setTimeout(() => {
      setActive(nextStep);
    }, 300);

    timersRef.current.end = setTimeout(() => {
      setIsWiping(false);
      isWipingRef.current = false;
    }, 650);
  }, []);

  useEffect(() => {
    const stepFromProgress = (v: number) =>
      Math.max(0, Math.min(Math.floor(v * TOTAL), TOTAL - 1));

    lastTriggeredRef.current = stepFromProgress(scrollYProgress.get());
    setActive(lastTriggeredRef.current);

    const onChange = (latest: number) => {
      const clamped = stepFromProgress(latest);
      if (clamped === lastTriggeredRef.current) return;
      triggerWipe(clamped);
    };

    return scrollYProgress.on("change", onChange);
  }, [scrollYProgress, triggerWipe]);

  useEffect(() => {
    return () => {
      if (timersRef.current.mid) clearTimeout(timersRef.current.mid);
      if (timersRef.current.end) clearTimeout(timersRef.current.end);
    };
  }, []);

  const step = APPROACH_STEPS[active];

  return (
    <section
      id="approach"
      className="relative scroll-mt-24 bg-background py-8 lg:scroll-mt-28 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Boxed shell — matches HowItWorks / site cards; no overflow-hidden (sticky-safe). */}
        <div className="rounded-3xl border border-foreground/10 bg-card text-card-foreground shadow-[0_24px_60px_-36px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)]">
          {/* Compact header */}
          <div className="border-b border-foreground/10 px-5 py-5 text-center md:px-8 md:py-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand md:mb-3">
              Our Approach
            </p>
            <h2 className="font-display mx-auto max-w-2xl text-3xl font-light leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.75rem]">
              A collaboration journey,
              <br />
              <span className="text-brand">from concept to delivery</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-[15px]">
              Four stages. One seamless handoff. Built for Tanzanian businesses.
            </p>
          </div>

          <div
            ref={containerRef}
            style={{
              height: `${TOTAL * STEP_SCROLL_VH}vh`,
            }}
            className="relative"
          >
            {/* Flex: main band + HUD in document flow (no absolute footer gap). */}
            <div className="sticky top-0 flex h-[100dvh] min-h-0 w-full flex-col bg-card">
              <WipeOverlay isWiping={isWiping} />

              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                {/* Start-aligned — avoids huge empty bands above/below from justify-center */}
                <div className="relative flex min-h-0 flex-1 flex-col justify-start overflow-y-auto overscroll-contain px-5 pb-3 pt-4 md:px-8 md:pb-4 md:pt-5 lg:px-10">
                  <div
                    className="pointer-events-none absolute bottom-2 right-0 select-none font-bold leading-none md:bottom-4"
                    style={{
                      fontSize: "clamp(96px, 18vw, 220px)",
                      color: "currentColor",
                      opacity: 0.045,
                      letterSpacing: "-0.05em",
                      lineHeight: 0.85,
                    }}
                    aria-hidden
                  >
                    {step.number}
                  </div>

                  <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-x-10 md:gap-y-5 md:items-start">
                    <StepContent step={step} />

                    <div className="hidden justify-center md:flex md:justify-end">
                      <StepMockup type={step.mockupType} />
                    </div>
                  </div>
                </div>

                <div className="relative z-20 shrink-0 border-t border-foreground/10 bg-card/95 backdrop-blur-sm">
                  <div className="flex px-5 pb-2.5 pt-2.5 md:px-8 md:pb-3 md:pt-3">
                    {APPROACH_STEPS.map((s, i) => (
                      <div
                        key={s.number}
                        className="flex flex-1 flex-col gap-0.5 transition-opacity duration-500"
                        style={{ opacity: i === active ? 1 : 0.35 }}
                      >
                        <span
                          className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
                            i === active ? "text-brand" : "text-muted-foreground"
                          }`}
                        >
                          {s.number}
                        </span>
                        <span className="hidden text-[10px] font-medium text-foreground md:block">
                          {s.tag}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px w-full bg-foreground/10">
                    <div
                      className="h-full bg-brand transition-all duration-700"
                      style={{
                        width: `${((active + 1) / TOTAL) * 100}%`,
                        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {active === 0 && (
                <div className="pointer-events-none absolute bottom-20 right-4 z-30 flex flex-col items-center gap-1.5 opacity-40 md:bottom-24 md:right-7">
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    Scroll
                  </span>
                  <div className="h-8 w-px animate-pulse bg-gradient-to-b from-foreground/35 to-transparent md:h-9" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
