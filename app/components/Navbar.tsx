"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { ThemeToggle } from "./ui/theme-toggle";
import { GlassFilter } from "./ui/liquid-glass";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Approach", href: "#approach" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "border-none" : "bg-transparent",
      )}
    >
      <GlassFilter />
      {scrolled && (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              backdropFilter: "blur(8px)",
              filter: "url(#glass-distortion)",
              isolation: "isolate",
            }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: "rgba(255, 255, 255, 0.01)" }}
          />
          <div
            className="absolute inset-0 z-[2]"
            style={{
              boxShadow:
                "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.08), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.06)",
            }}
          />
        </>
      )}
      <nav
        className={cn(
          "relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-25 flex items-center justify-between gap-4",
          scrolled && "dark:brightness-[0.91]",
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          aria-label="Rafiki SMS home"
        >
          <img src="/logo.png" alt="Rafiki SMS" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul
          className="hidden md:flex items-center gap-1 flex-1 justify-center"
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <a
            href="https://vendor.rafikisms.com/auth/login"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
          >
            Sign in
          </a>
          <a
            href="https://vendor.rafikisms.com/auth/vendor-register"
            className="text-sm px-4 py-2 rounded-lg bg-[color:var(--brand-fill)] hover:bg-[color:var(--brand-fill-hover)] text-white font-semibold transition-all duration-200 cursor-pointer shadow-sm shadow-[#14b8a6]/20 dark:shadow-[#14b8a6]/40"
          >
            Start sending
          </a>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="relative z-[3] bg-white/80 dark:bg-black/80 backdrop-blur-xl px-4 py-3 flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 mt-1 flex flex-col gap-1.5">
            <a
              href="https://vendor.rafikisms.com/auth/login"
              className="px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
            >
              Sign in
            </a>
            <a
              href="https://vendor.rafikisms.com/auth/vendor-register"
              className="px-3 py-2.5 rounded-lg text-sm bg-[color:var(--brand-fill)] hover:bg-[color:var(--brand-fill-hover)] text-white font-semibold text-center transition-colors duration-200"
            >
              Start sending
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
