"use client";

import { useEffect, useRef, useState } from "react";
import { landingContent } from "./content";

const steps = landingContent.howItWorks.steps;

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card p-5 text-card-foreground shadow-[0_24px_60px_-36px_rgba(0,0,0,0.25)] sm:p-8 lg:p-14">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-14">
          <span className="mb-5 inline-flex items-center gap-2 text-sm font-mono text-muted-foreground sm:mb-6 sm:gap-3">
            <span className="h-px w-6 shrink-0 bg-foreground/30 sm:w-8" />
            {landingContent.howItWorks.eyebrow}
          </span>
          <h2
            className={`max-w-[100%] text-balance text-[clamp(1.625rem,5.2vw+0.6rem,2.25rem)] font-display leading-[1.12] tracking-tight transition-all duration-700 sm:text-4xl sm:leading-[1.1] lg:text-6xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {landingContent.howItWorks.title}
            <br />
            <span className="text-muted-foreground">{landingContent.howItWorks.subtitle}</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Steps */}
          <div className="min-w-0 space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full min-w-0 py-6 text-left transition-all duration-500 max-sm:active:opacity-90 sm:py-8 ${
                  index < steps.length - 1 ? "border-b border-border/80" : ""
                } group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex min-w-0 items-start gap-3 sm:gap-6">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-colors sm:h-10 sm:w-10 sm:text-sm ${
                      activeStep === index
                        ? "bg-brand text-brand-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 break-words text-xl font-display leading-snug transition-transform duration-300 sm:mb-3 sm:text-2xl sm:leading-tight lg:text-3xl sm:group-hover:translate-x-1 lg:group-hover:translate-x-2">
                      {step.title}
                    </h3>
                    <p className="break-words text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-border overflow-hidden">
                        <div 
                          className="h-full bg-foreground w-0"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/50">
              {/* Window header */}
              <div className="flex items-center justify-between gap-3 border-b border-border/80 px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex shrink-0 gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted sm:h-3 sm:w-3" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted sm:h-3 sm:w-3" />
                </div>
                <span className="truncate text-[10px] font-mono text-muted-foreground sm:text-xs">{landingContent.howItWorks.fileName}</span>
              </div>

              {/* Code content */}
              <div className="min-h-[220px] overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:min-h-[280px] sm:p-8 sm:text-sm [-webkit-overflow-scrolling:touch]">
                <pre className="min-w-min text-foreground/75">
                  {steps[activeStep].code.split('\n').map((line, lineIndex) => (
                    <div 
                      key={`${activeStep}-${lineIndex}`} 
                      className="leading-loose code-line-reveal"
                      style={{ 
                        animationDelay: `${lineIndex * 80}ms`,
                      }}
                    >
                      <span className="inline-block w-6 shrink-0 select-none text-muted-foreground/60 tabular-nums sm:w-8">{lineIndex + 1}</span>
                      <span className="inline-flex">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 border-t border-border/80 px-4 py-3 sm:px-6 sm:py-4">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">{landingContent.howItWorks.readyLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
