"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { landingContent } from "./content";

const pricing = landingContent.pricing;

function formatVolume(min: number, max: number | null) {
  if (max === null) {
    return `${min.toLocaleString()}+`;
  }
  return `${min.toLocaleString()} – ${max.toLocaleString()}`;
}

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`max-w-3xl mb-10 lg:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground uppercase tracking-widest mb-5">
            <span className="w-8 h-px bg-foreground/30" />
            {pricing.eyebrow}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.05] mb-5">
            {pricing.title}
            <br />
            <span className="text-brand">{pricing.subtitle}</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-xl">
            {pricing.description}
          </p>
        </div>

        {/* Tiers grid — 4x2, staggered reveal, boxed rail */}
        <div className="relative max-w-7xl mx-auto border border-foreground/10 rounded-3xl overflow-hidden bg-background/40 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
          {pricing.tiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`group relative bg-background p-5 lg:p-6 flex flex-col transition-all duration-700 ease-out hover:bg-brand-soft/30 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${tier.popular ? "ring-2 ring-brand ring-inset ring-pulse" : ""}`}
              style={{
                transitionDelay: `${idx * 80}ms`,
                animationDelay: `${idx * 350}ms`,
              }}
            >
              {tier.popular && (
                <span className="absolute -top-px right-4 inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-gradient text-brand-foreground text-[10px] font-mono uppercase tracking-widest">
                  {pricing.bestValueLabel}
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    className="tick-cycle text-brand-foreground"
                    aria-hidden
                  >
                    <path
                      d="M1 4.5L3.5 7L8 1.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.5 4.5L8 7L13 1.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}

              {/* Row 1: index + volume range */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {formatVolume(tier.minVolume, tier.maxVolume)} {pricing.volumeUnit}
                </span>
              </div>

              {/* Row 2: name */}
              <h3 className="font-display text-xl text-foreground mb-3">
                {tier.name}
              </h3>

              {/* Row 3: price */}
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="font-display text-3xl lg:text-4xl text-brand leading-none transition-transform duration-300 origin-left group-hover:scale-110">
                  {tier.pricePerSms}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {pricing.unitLabel}
                </span>
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand"
                  aria-hidden
                >
                  <path
                    d="M1 4.5L3.5 7L8 1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.5 4.5L8 7L13 1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Row 4: tagline */}
              <p className="text-xs leading-relaxed text-muted-foreground mb-4 min-h-[2.5em]">
                {tier.tagline}
              </p>

              {/* Row 5: highlights */}
              <ul className="space-y-2 mb-6 flex-1">
                {tier.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-brand mt-0.5 shrink-0" />
                    <span className="text-xs text-foreground/80 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Row 6: minimal CTA link */}
              <a
                href="#"
                className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  tier.popular
                    ? "text-brand hover:text-brand-deep"
                    : "text-foreground hover:text-brand"
                }`}
              >
                {pricing.ctaLabel}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-xs lg:text-sm text-muted-foreground max-w-2xl mx-auto">
          {pricing.bottomNote}
        </p>
      </div>
    </section>
  );
}
