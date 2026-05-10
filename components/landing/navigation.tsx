"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { landingContent } from "./content";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav, HamburgerIcon } from "@/components/nav/mobile-nav";

const navLinks = landingContent.navigation.links;

const LOGO_EASE = [0.22, 1, 0.36, 1] as const;

const logoVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    rotate: -12,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: LOGO_EASE,
    },
  },
};


// Map nav link names to section IDs for active state detection
const sectionIds: Record<string, string> = {
  Features: "features",
  Pricing: "pricing",
  Developers: "developers",
  About: "about",
};

function navLinkActive(
  pathname: string,
  href: string,
  activeSection: string | null,
  linkName: string
) {
  if (href.startsWith("/") && !href.includes("#")) {
    if (href === "/docs") {
      return pathname === "/docs" || pathname.startsWith("/docs/");
    }
    if (href === "/careers") {
      return pathname === "/careers" || pathname.startsWith("/careers/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return activeSection === linkName;
}

export function Navigation() {
  const pathname = usePathname();
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
        className={`fixed left-0 right-0 z-[110] transition-all duration-500 ${
          isMounted ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        } ${
          isScrolled ? "top-4 left-4 right-4" : "top-0"
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
          {/* Logo — staged reveal (full mark: blur → sharp + scale) */}
          <a
            href="#"
            className="group flex items-center rounded-md focus-brand"
            aria-label={landingContent.brand.name}
          >
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate={isMounted ? "show" : "hidden"}
              className="flex items-center"
            >
              <motion.div variants={iconVariants} className="relative shrink-0">
                <motion.div
                  className="rounded-lg p-0.5 ring-transparent transition-shadow duration-300 group-hover:ring-2 group-hover:ring-[var(--brand-primary)]/35"
                  animate={
                    isMounted
                      ? { y: [0, -2.5, 0] }
                      : undefined
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.06,
                    transition: { type: "spring", stiffness: 420, damping: 20 },
                  }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Image
                    src="/images/rafiki-logo.png"
                    alt={landingContent.brand.name}
                    width={200}
                    height={200}
                    priority
                    className={`w-auto select-none transition-[filter,height] duration-300 group-hover:brightness-110 dark:group-hover:drop-shadow-[0_0_14px_rgba(10,175,160,0.35)] ${
                      isScrolled ? "h-8" : "h-11"
                    }`}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link, index) => {
              const isActive = navLinkActive(
                pathname,
                link.href,
                activeSection,
                link.name
              );
              return (
                <Link
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
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
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
            type="button"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            className="rounded-md p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand-primary)]"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon open={isMobileMenuOpen} />
          </button>
          </div>
        </div>

      </nav>

      <MobileNav
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
    </>
  );
}
