"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MessageFlowAnimation } from "./message-flow-animation";
import { landingContent } from "./content";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 overflow-hidden"
      id="start"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`relative rounded-[32px] border border-border/70 bg-card text-card-foreground overflow-hidden shadow-[0_26px_70px_-42px_rgba(0,0,0,0.28)] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* static radial teal glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-90"
            style={{
              background:
                "radial-gradient(60% 80% at 80% 50%, rgba(20,184,166,0.22), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(50% 50% at 15% 20%, rgba(20,184,166,0.12), transparent 70%)",
            }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* Left content */}
              <div className="flex-1 max-w-2xl">
                <h2 className="text-4xl lg:text-6xl font-display tracking-tight leading-[0.95]">
                  Start with us{" "}
                  <span className="text-brand">today</span>.
                </h2>

                <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {landingContent.cta.description}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="btn-brand px-7 h-12 text-sm rounded-full group"
                  >
                    Create an account
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-7 text-sm rounded-full border-border bg-transparent text-foreground hover:bg-muted"
                  >
                    Sign in
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-6 font-mono">
                  {landingContent.cta.note}
                </p>
              </div>

              {/* Right animation (hidden on small) */}
              <div className="hidden lg:flex items-center justify-center w-[340px] h-[340px]">
                <MessageFlowAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
