"use client";

import { useEffect, useState, useRef } from "react";
import { landingContent } from "./content";

const locations = landingContent.infrastructure.locations;

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`min-w-0 transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <span className="mb-5 inline-flex items-center gap-2 text-sm font-mono text-muted-foreground sm:mb-6 sm:gap-3">
              <span className="h-px w-6 shrink-0 bg-foreground/30 sm:w-8" />
              {landingContent.infrastructure.eyebrow}
            </span>
            <h2 className="mb-6 max-w-[22ch] text-balance font-display text-[clamp(1.75rem,5vw+0.5rem,2.35rem)] leading-[1.08] tracking-tight sm:mb-8 sm:text-4xl sm:leading-[1.06] lg:text-6xl">
              {landingContent.infrastructure.title}
              <br />
              <span className="text-muted-foreground">
                {landingContent.infrastructure.subtitle}
              </span>
            </h2>
            <p className="mb-10 max-w-prose text-base leading-relaxed text-muted-foreground sm:mb-12 sm:text-xl">
              {landingContent.infrastructure.description}
            </p>

            {/* Stats - stack on mobile, row from sm up */}
            <ul className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
              {landingContent.infrastructure.stats.map((stat) => (
                <li key={stat.label}>
                  <div className="rounded-2xl border border-foreground/10 bg-background p-5 sm:min-h-[132px] sm:p-6">
                    <div className="font-display text-3xl tabular-nums text-brand sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs leading-snug text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Location list */}
          <div
            className={`min-w-0 transition-all duration-700 delay-200 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-2xl border border-foreground/10 shadow-sm">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 px-4 py-3 sm:px-6 sm:py-4">
                <span className="text-xs font-mono text-muted-foreground sm:text-sm">
                  {landingContent.infrastructure.panelTitle}
                </span>
                <span className="flex items-center gap-2 text-[11px] font-mono text-green-600 sm:text-xs">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-brand" />
                  {landingContent.infrastructure.panelStatus}
                </span>
              </div>

              {/* Locations */}
              <div>
                {locations.map((location, index) => (
                  <div
                    key={location.city}
                    className={`flex items-center justify-between gap-4 border-b border-foreground/5 px-4 py-4 last:border-b-0 sm:px-6 sm:py-5 ${
                      activeLocation === index ? "bg-foreground/[0.02]" : ""
                    } transition-colors duration-300`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-brand" : "bg-foreground/20"
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="truncate font-medium">{location.city}</div>
                        <div className="truncate text-sm text-muted-foreground">
                          {location.region}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground sm:text-sm">
                      {location.latency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
