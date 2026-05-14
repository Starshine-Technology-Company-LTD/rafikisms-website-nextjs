"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { landingContent } from "./content";

const securityIcons = [Shield, Lock, Eye, FileCheck];

const securityFeatures = landingContent.security.features.map((feature, index) => ({
  icon: securityIcons[index] ?? Shield,
  title: feature.title,
  description: feature.description,
}));

const certifications = landingContent.security.certifications;

export function SecuritySection() {
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
    <section id="security" ref={sectionRef} className="relative py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 rounded-3xl border border-foreground/10 bg-foreground/[0.03] backdrop-blur-sm py-10 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              {landingContent.security.eyebrow}
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              {landingContent.security.title}
              <br />
              {landingContent.security.subtitle}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              {landingContent.security.description}
            </p>

            {/* Certifications / trust tags - brand teal (not default border) */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`inline-flex items-center rounded-full border border-[var(--brand-primary)]/45 bg-[var(--brand-primary)]/10 px-3.5 py-1.5 text-xs font-mono text-[var(--brand-primary)] shadow-sm shadow-[var(--brand-primary)]/5 transition-all duration-500 dark:border-[var(--brand-primary)]/50 dark:bg-[var(--brand-primary)]/12 dark:text-[var(--brand-primary)] sm:px-4 sm:py-2 sm:text-sm ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--brand-primary)]/35 bg-[var(--brand-primary)]/8 text-[var(--brand-primary)] transition-colors duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-white dark:border-[var(--brand-primary)]/45 dark:bg-[var(--brand-primary)]/12">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
