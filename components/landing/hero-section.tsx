"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SmsChatAnimation } from "./sms-chat-animation";
import { landingContent } from "./content";
import { usePrefersReducedMotion } from "./use-media-query";

type Slot =
  | { kind: "component"; render: () => React.ReactNode; label: string }
  | { kind: "image"; src: string; alt: string; label: string };

const SLOTS: Slot[] = [
  { kind: "component", render: () => <SmsChatAnimation />, label: "Live chat" },
  { kind: "image", src: "/images/rafiki-hero-thumbs.png", alt: "Rafiki SMS customer", label: "People" },
  { kind: "image", src: "/images/rafiki-hero-group.png", alt: "Rafiki SMS billboard", label: "Campaign" },
  { kind: "image", src: "/images/rafiki-hero-dashboard.png", alt: "Rafiki SMS dashboard", label: "Dashboard" },
];

function useTypewriter(
  words: readonly string[],
  { typeSpeed = 70, deleteSpeed = 40, pause = 1400 }: { typeSpeed?: number; deleteSpeed?: number; pause?: number } = {}
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "delete">("type");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const current = words[index];
    if (phase === "type") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        t = setTimeout(() => setPhase("hold"), pause);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("delete"), 200);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setPhase("type");
        setIndex((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, index, words, typeSpeed, deleteSpeed, pause]);

  return { text, index };
}

export function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const words = useMemo(() => landingContent.hero.rotatingWords, []);
  const { text: typedWord } = useTypewriter(words, { typeSpeed: 80, deleteSpeed: 45, pause: 1600 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % SLOTS.length), 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reduceMotion) return;
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % SLOTS.length), 6000);
  };

  return (
    <section className="relative min-h-[92svh] lg:min-h-screen flex flex-col overflow-hidden">
      {/* Right-side auto-rotating visual stage */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-[460px] h-[560px] xl:w-[560px] xl:h-[660px] 2xl:w-[620px] 2xl:h-[720px] opacity-95 pointer-events-none">
        <CarouselStage active={active} />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-12 lg:pr-[30rem] xl:pr-[36rem] pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-16">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            {landingContent.hero.eyebrow}
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-8 lg:mb-10">
          <h1
            className={`text-[clamp(2.25rem,7vw,5.75rem)] font-display leading-[0.93] tracking-tight transition-all duration-1000 lg:max-w-[52%] xl:max-w-[50%] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">{landingContent.hero.headlineStart}</span>
            <span className="block">
              {landingContent.hero.headlinePrefix}{" "}
              <span className="relative inline-block align-baseline">
                <span className="inline-flex items-baseline">
                  <span className="text-brand">{typedWord}</span>
                  <span
                    aria-hidden
                    className="cursor-blink inline-block w-[0.06em] h-[0.85em] ml-[0.04em] bg-brand translate-y-[0.08em]"
                  />
                </span>
                {/* teal underline that sweeps under the live word */}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-2 bg-brand-soft rounded-sm"
                  style={{
                    width: `${Math.max(typedWord.length, 1) * 0.55}em`,
                    transition: "width 120ms linear",
                  }}
                />
              </span>
            </span>
          </h1>
        </div>

        {/* Mobile/tablet visual stage */}
        <div className="lg:hidden mb-8 w-full max-w-lg mx-auto h-[300px] sm:h-[360px] md:h-[420px]">
          <CarouselStage active={active} />
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-8 lg:gap-12 items-end">
          <p
            className={`text-base sm:text-lg lg:text-[1.125rem] xl:text-xl text-muted-foreground leading-relaxed max-w-prose lg:max-w-[46ch] transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {landingContent.hero.description}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="lg"
              variant="ghost"
              className="btn-brand px-8 h-14 text-base rounded-full group"
            >
              {landingContent.hero.primaryCta}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
              asChild
            >
              <a href="#developers">{landingContent.hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="mt-10 flex items-center gap-3">
          {SLOTS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              aria-label={`Show ${s.label}`}
              onClick={() => {
                setActive(i);
                resetTimer();
              }}
              className="group inline-flex items-center gap-2 focus:outline-none"
            >
              <span
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === active ? "w-8 bg-brand" : "w-2 bg-foreground/20 group-hover:bg-foreground/40"
                }`}
              />
              <span
                className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${
                  i === active ? "text-brand" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats marquee - boxed, contained, with edge fades */}
      <div
        className={`relative z-10 w-full px-6 lg:px-12 pb-10 lg:pb-14 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative max-w-7xl mx-auto border border-foreground/10 rounded-2xl bg-background/60 backdrop-blur-sm overflow-hidden">
          <span className="marquee-fade-left" />
          <span className="marquee-fade-right" />
          <div className="flex gap-4 marquee whitespace-nowrap py-4 lg:py-5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 shrink-0 px-2">
                {landingContent.hero.marqueeStats.map((stat) => (
                  <motion.div
                    key={`${stat.company}-${i}`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="shrink-0 inline-flex items-center gap-3 px-4 py-2 border border-foreground/10 rounded-full bg-background"
                  >
                    <span className="text-xl lg:text-2xl font-display text-brand leading-none">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground leading-tight">
                      {stat.label}
                      <span className="block font-mono text-[10px] mt-0.5 tracking-widest uppercase">
                        {stat.company}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselStage({ active }: { active: number }) {
  const slot = SLOTS[active];
  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {slot.kind === "component" ? (
            slot.render()
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={slot.src}
                alt={slot.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 95vw, (max-width: 1536px) 560px, 620px"
                priority
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
