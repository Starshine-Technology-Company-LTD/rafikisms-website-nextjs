"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { landingContent } from "./content";

const codeExamples = landingContent.developers.tabs;
const features = landingContent.developers.points;

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-6px);
    animation: devLineReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .dev-code-char {
    opacity: 0;
    filter: blur(4px);
    animation: devCharReveal 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    will-change: opacity, filter;
  }
  
  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .dev-code-line,
    .dev-code-char {
      animation: none !important;
      opacity: 1;
      filter: none;
      transform: none;
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="developers" ref={sectionRef} className="relative py-20 lg:py-24 overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="mx-auto min-w-0 max-w-7xl px-6 lg:px-12">
        <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`min-w-0 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              {landingContent.developers.eyebrow}
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              {landingContent.developers.title}
              <br />
              <span className="text-muted-foreground">{landingContent.developers.subtitle}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {landingContent.developers.description}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group rounded-2xl border border-foreground/10 bg-background p-4 transition-all duration-500 hover:border-brand/30 hover:bg-brand-soft/30 hover:shadow-sm ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <div className="mb-2 inline-flex items-center justify-center w-7 h-7 rounded-md bg-brand/15 text-brand transition-transform duration-300 group-hover:scale-110">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <h3 className="font-medium mb-1 text-sm group-hover:text-brand transition-colors duration-300">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Code block - min-w-0 + overflow-x-auto so long curl lines stay inside the viewport */}
          <div
            className={`min-w-0 w-full max-w-full lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-foreground/10">
              {/* Tabs */}
              <div className="flex min-w-0 items-center overflow-x-auto border-b border-foreground/10">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`shrink-0 px-4 py-3 text-sm font-mono transition-all duration-300 sm:px-6 sm:py-4 relative focus-brand ${
                      activeTab === idx
                        ? "text-brand"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand shadow-[0_0_8px_rgba(20,184,166,0.4)] transition-all duration-300" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-4 py-4 transition-all duration-300 focus-brand rounded-md ${
                    copied 
                      ? "text-brand bg-brand/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                  aria-label={copied ? "Copied!" : "Copy code"}
                >
                  {copied ? (
                    <Check className="w-4 h-4 animate-in zoom-in-50 duration-200" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Code content */}
              <div className="min-h-[220px] min-w-0 overflow-x-auto overscroll-x-contain bg-foreground/[0.01] p-4 font-mono text-sm sm:p-8">
                <pre className="w-max min-w-full text-foreground/80">
                  {codeExamples[activeTab].code.split('\n').map((line, lineIndex) => (
                    <div 
                      key={`${activeTab}-${lineIndex}`} 
                      className="leading-loose dev-code-line whitespace-nowrap"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="inline-flex">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeTab}-${lineIndex}-${charIndex}`}
                            className="dev-code-char"
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
            </div>
            
            {/* Links */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <a href="#developers" className="text-foreground hover:underline underline-offset-4">
                {landingContent.developers.docsLabel}
              </a>
              <span className="text-foreground/20">|</span>
              <a href="#developers" className="text-muted-foreground hover:text-foreground">
                {landingContent.developers.githubLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
