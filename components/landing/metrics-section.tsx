"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { landingContent } from "./content";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Slightly longer duration for more dramatic effect
          const duration = 2200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smoother easing curve for premium feel
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div
      ref={ref}
      className="font-display text-4xl lg:text-5xl tracking-tight text-brand leading-none transition-transform duration-300 group-hover:scale-[1.02]"
    >
      {prefix}
      <span className="tabular-nums">{count.toLocaleString()}</span>
      {suffix}
    </div>
  );
}

const metrics = landingContent.metrics.cards;

export function MetricsSection() {
  const [time, setTime] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

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
      id="metrics"
      ref={sectionRef}
      className="relative py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
              <span className="w-8 h-px bg-foreground/30" />
              {landingContent.metrics.eyebrow}
            </span>
            <h2
              className={`text-3xl lg:text-5xl font-display tracking-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {landingContent.metrics.title}
              <br />
              {landingContent.metrics.subtitle}
            </h2>
          </div>
        </div>

        {/* Compact boxed split panel */}
        <div className="relative max-w-7xl mx-auto border border-foreground/10 rounded-3xl bg-gradient-to-br from-background via-background to-brand-soft/30 p-6 lg:p-10 overflow-hidden">
          {/* Live clock top-right */}
          <div className="absolute top-5 right-6 flex items-center gap-3 font-mono text-xs text-muted-foreground z-20">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              {landingContent.metrics.liveLabel}
            </span>
            <span className="text-foreground/30">|</span>
            <span suppressHydrationWarning className="tabular-nums min-w-[68px] inline-block">
              {time || "--:--:--"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left — floating phone hero */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] lg:min-h-[460px]">
              {/* Soft teal radial glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[380px] lg:h-[380px] rounded-full bg-brand/25 blur-3xl radial-pulse" />
              </div>

              {/* Decorative dotted ring */}
              <div className="absolute inset-6 rounded-full border border-dashed border-foreground/10 pointer-events-none" />

              {/* Phone image */}
              <div className="relative float-hang drop-shadow-[0_20px_40px_rgba(13,148,136,0.25)]">
                <Image
                  src="/images/rafiki-phone-product.png"
                  alt="Rafiki SMS app in hand"
                  width={480}
                  height={640}
                  priority={false}
                  className="w-[200px] sm:w-[260px] lg:w-[360px] h-auto object-contain select-none"
                />
              </div>
            </div>

            {/* Right — 2x2 boxed metric tiles */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`group relative border border-foreground/10 rounded-2xl p-5 lg:p-6 bg-background/70 backdrop-blur-sm soft-float transition-all duration-500 hover:border-brand/40 hover:bg-brand-soft/40 hover:shadow-lg hover:shadow-brand/5 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      animationDelay: `${index * 0.6}s`,
                    }}
                  >
                    {/* Corner index */}
                    <span className="absolute top-3 right-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 group-hover:text-brand/60 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <AnimatedCounter
                      end={typeof metric.value === "number" ? metric.value : 0}
                      suffix={metric.suffix}
                      prefix={metric.prefix}
                    />
                    <div className="mt-2 text-sm lg:text-base text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                      {metric.label}
                    </div>

                    {/* Hover teal bar - refined animation */}
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-brand to-brand-strong group-hover:w-full transition-all duration-700 ease-out rounded-b-2xl" />
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
