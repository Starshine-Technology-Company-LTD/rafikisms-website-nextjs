"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { WordRotate } from "./ui/word-rotate";
import { FadeIn } from "./ui/fade-in";
import { DottedSurface } from "./ui/dotted-surface";

const rotatingWords = ["notify", "alert", "confirm", "remind", "engage"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-black" aria-label="Hero">
      <DottedSurface className="absolute z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 flex flex-col items-center text-center">
        {/* Slogan */}
        <FadeIn delay={40}>
          <p className="text-base sm:text-lg font-slogan tracking-[0.15em] text-[color:var(--brand-text)] uppercase mb-4 opacity-90">
            # RAFIKI WA UJUMBE
          </p>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={80}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 max-w-4xl leading-[1.07]">
            Enterprise SMS API{" "}
            <span
              className="text-[color:var(--brand-text)]"
              style={{ textShadow: "0 0 40px var(--glow-text)" }}
            >
              platform
            </span>
          </h1>
        </FadeIn>

        {/* Subtitle with word rotation */}
        <FadeIn delay={160}>
          <p className="text-xl sm:text-2xl text-slate-700 dark:text-white mb-3 font-light">
            The platform to{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              <WordRotate words={rotatingWords} className="text-[color:var(--brand-text)]" />
            </span>
          </p>
        </FadeIn>

        <FadeIn delay={240}>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mb-10 leading-relaxed">
            Queue, send, and track SMS with vendor API keys, sender ID governance,
            and delivery reports your team can trust.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={320}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://vendor.rafikisms.com/auth/vendor-register"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[color:var(--brand-fill)] hover:bg-[color:var(--brand-fill-hover)] text-white font-semibold text-sm transition-all duration-200 btn-glow cursor-pointer shadow-lg shadow-[#14b8a6]/20 dark:shadow-[#14b8a6]/40"
            >
              Get Started
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://developers.rafikisms.com/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/8 text-slate-700 dark:text-white font-medium text-sm transition-all duration-200 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              Read API docs
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
