"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { landingContent } from "./content";

const approach = landingContent.approach;

export function ApproachSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`relative max-w-6xl mx-auto border border-foreground/10 rounded-3xl bg-background/50 backdrop-blur-sm p-7 lg:p-12 overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header row with mini chat-image strip */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-10">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
                <span className="w-8 h-px bg-foreground/30" />
                {approach.eyebrow}
              </span>
              <h2 className="font-display text-3xl lg:text-5xl tracking-tight leading-[1.05] mb-4">
                {approach.title}
                <br />
                <span className="text-brand">{approach.subtitle}</span>
              </h2>
              <p className="text-sm lg:text-base text-muted-foreground max-w-xl">
                {approach.description}
              </p>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[220px] lg:min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[280px] lg:h-[280px] rounded-full bg-brand/15 blur-3xl radial-pulse" />
              </div>
              <div className="relative float-hang drop-shadow-[0_20px_40px_rgba(13,148,136,0.2)]">
                <Image
                  src="/images/rafiki-phone-chat.png"
                  alt={approach.imageAlt}
                  width={480}
                  height={640}
                  className="w-[160px] sm:w-[200px] lg:w-[260px] h-auto object-contain select-none"
                />
              </div>
            </div>
          </div>

          {/* Pillar cards */}
          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden">
            {approach.pillars.map((p, idx) => (
              <div
                key={p.number}
                className={`group relative bg-background p-6 lg:p-7 transition-all duration-700 hover:bg-brand-soft/30 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    {p.number}
                  </span>
                  {/* Hover double-tick */}
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand"
                    aria-hidden
                  >
                    <path
                      d="M1 5L4 8L9 2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 5L9 8L15 2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl lg:text-2xl text-foreground leading-snug mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>

                {/* Hover teal bar */}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-brand to-brand-strong group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
