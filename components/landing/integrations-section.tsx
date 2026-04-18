"use client";

import { IntegrationMarquee } from "@/components/IntegrationMarquee";
import { useEffect, useState, useRef } from "react";
import { landingContent } from "./content";

export function IntegrationsSection() {
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
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {landingContent.integrations.eyebrow}
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            {landingContent.integrations.title}
            <br />
            {landingContent.integrations.subtitle}
          </h2>
          <p className="text-xl text-muted-foreground">
            {landingContent.integrations.description}
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl border border-foreground/10 bg-background/40 px-2 py-4 backdrop-blur-sm sm:px-4 sm:py-6">
          <IntegrationMarquee />
        </div>
      </div>
    </section>
  );
}
