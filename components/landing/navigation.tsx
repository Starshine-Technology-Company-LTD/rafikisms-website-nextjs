"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { landingContent } from "./content";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = landingContent.navigation.links;

// Map nav link names to section IDs for active state detection
const sectionIds: Record<string, string> = {
  Features: "features",
  Pricing: "pricing",
  Developers: "developers",
  About: "about",
};

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mount animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via Intersection Observer
  useEffect(() => {
    const sectionElements = Object.values(sectionIds)
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Get the section with the most visibility
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            prev.intersectionRatio > curr.intersectionRatio ? prev : curr
          );
          const sectionName = Object.entries(sectionIds).find(
            ([, id]) => id === mostVisible.target.id
          )?.[0];
          if (sectionName) setActiveSection(sectionName);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: "-20% 0px -60% 0px" }
    );

    sectionElements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        } ${
          isScrolled 
            ? "top-4 left-4 right-4" 
            : "top-0 left-0 right-0"
        }`}
      >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center group focus-brand rounded-md" 
            aria-label={landingContent.brand.name}
          >
            <Image
              src="/images/rafiki-logo.png"
              alt={landingContent.brand.name}
              width={200}
              height={200}
              priority
              className={`w-auto transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110 ${
                isScrolled ? "h-8" : "h-11"
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-all duration-300 relative group focus-brand rounded-sm ${
                    isActive 
                      ? "text-foreground font-medium" 
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    opacity: isMounted ? 1 : 0,
                    transform: isMounted ? "translateY(0)" : "translateY(-4px)",
                    transition: `opacity 0.4s ease ${index * 50}ms, transform 0.4s ease ${index * 50}ms, color 0.3s ease`
                  }}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-px bg-brand transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-foreground/40"
                    }`} 
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a 
              href="#" 
              className={`text-foreground/60 hover:text-foreground transition-all duration-300 focus-brand rounded-sm ${
                isScrolled ? "text-xs" : "text-sm"
              }`}
            >
              {landingContent.navigation.signInLabel}
            </a>
            <Button
              size="sm"
              variant="ghost"
              className={`btn-brand rounded-full transition-all duration-300 hover-glow focus-brand ${
                isScrolled ? "px-4 h-8 text-xs" : "px-6"
              }`}
            >
              {landingContent.navigation.ctaLabel}
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          </div>
        </div>

      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Bottom CTAs */}
          <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button 
              variant="outline" 
              className="flex-1 rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {landingContent.navigation.signInLabel}
            </Button>
            <Button 
              variant="ghost"
              className="flex-1 btn-brand rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {landingContent.navigation.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
