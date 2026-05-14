"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { landingContent } from "./content";

const about = landingContent.about;

export function AboutSection() {
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
      id="about"
      ref={sectionRef}
      className="relative z-10 py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`relative max-w-6xl mx-auto border border-foreground/10 rounded-3xl bg-gradient-to-br from-background via-background to-brand-soft/25 p-7 lg:p-12 overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left - copy */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase mb-5">
                <span className="w-8 h-px bg-foreground/30" />
                {about.eyebrow}
              </span>
              <h2 className="font-display text-3xl lg:text-5xl tracking-tight leading-[1.05] mb-5">
                {about.title}
                <br />
                <span className="text-brand">{about.subtitle}</span>
              </h2>
              <p className="text-base lg:text-lg text-foreground/80 mb-5">
                {about.description}
              </p>
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm lg:text-base text-muted-foreground mb-4 leading-relaxed"
                >
                  {p}
                </p>
              ))}

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mt-6">
                {about.chips.map((chip, idx) => (
                  <div
                    key={chip.label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-foreground/10 rounded-full bg-background soft-float"
                    style={{ animationDelay: `${idx * 0.4}s` }}
                  >
                    <span className="font-display text-sm text-brand leading-none">
                      {chip.value}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {chip.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - floating phone image */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[320px] lg:min-h-[440px]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[340px] lg:h-[340px] rounded-full bg-brand/20 blur-3xl radial-pulse" />
              </div>
              <div className="absolute inset-4 rounded-3xl border border-dashed border-foreground/10 pointer-events-none" />

              <div className="relative float-hang drop-shadow-[0_20px_40px_rgba(13,148,136,0.25)]">
                <Image
                  src="/images/rafiki-phone-product.png"
                  alt={about.imageAlt}
                  width={480}
                  height={640}
                  className="w-[200px] sm:w-[240px] lg:w-[340px] h-auto object-contain select-none"
                />
              </div>

              {/* Orbit mini chip */}
              <div
                className="absolute top-8 right-4 lg:right-8 inline-flex items-center gap-2 px-3 py-1.5 border border-brand/40 rounded-full bg-background shadow-sm soft-float"
                style={{ animationDelay: "1.2s" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep">
                  live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
