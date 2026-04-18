"use client";

import { useEffect, useState } from "react";
import { landingContent } from "./content";

const testimonials = landingContent.testimonials.items;

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {landingContent.testimonials.eyebrow}
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* Compact boxed story card */}
        <div className="relative border border-foreground/10 rounded-3xl bg-background/60 backdrop-blur-sm p-7 lg:p-10 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-8">
              <blockquote
                className={`transition-all duration-300 ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.15] tracking-tight text-foreground">
                  "{activeTestimonial.quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div
                className={`mt-8 flex items-center gap-4 transition-all duration-300 delay-100 ${
                  isAnimating ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-brand-soft border border-brand/40 flex items-center justify-center">
                  <span className="font-display text-lg text-brand-deep">
                    {activeTestimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activeTestimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {activeTestimonial.role}, {activeTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Metric Highlight */}
            <div className="lg:col-span-4">
              <div
                className={`p-5 lg:p-6 border border-foreground/10 rounded-2xl bg-background/80 transition-all duration-300 ${
                  isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase block mb-3">
                  {landingContent.testimonials.keyResultLabel}
                </span>
                <p className="font-display text-2xl lg:text-3xl text-brand leading-tight">
                  {activeTestimonial.metric}
                </p>
              </div>
            </div>
          </div>

          {/* Pagination pill row */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setActiveIndex(idx);
                    setIsAnimating(false);
                  }, 300);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-brand"
                    : "w-2 bg-foreground/15 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trusted label */}
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mt-14 mb-6 text-center">
          {landingContent.testimonials.trustedLabel}
        </p>
      </div>
      
      {/* Companies marquee - boxed, contained, pill chips */}
      <div className="w-full px-6 lg:px-12">
        <div className="relative max-w-7xl mx-auto border border-foreground/10 rounded-full bg-background/40 backdrop-blur-sm overflow-hidden">
          <span className="marquee-fade-left" />
          <span className="marquee-fade-right" />
          <div className="flex gap-3 items-center marquee py-2">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-3 items-center shrink-0 px-2">
                {landingContent.testimonials.companies.map((company) => (
                  <span
                    key={`${setIdx}-${company}`}
                    className="shrink-0 px-5 py-2 border border-foreground/10 rounded-full bg-background text-sm font-medium text-foreground/60 whitespace-nowrap hover:text-brand hover:border-brand/60 hover:bg-brand-soft transition-colors duration-300"
                  >
                    {company}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
