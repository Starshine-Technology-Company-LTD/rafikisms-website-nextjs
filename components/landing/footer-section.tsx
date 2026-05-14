"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SignalWaveAnimation } from "./signal-wave-animation";
import { landingContent } from "./content";

const DEFAULT_LOGO = "/images/rafiki-logo.png";

const footerLinks = landingContent.footer.links;
const socialLinks = landingContent.footer.social;

export type FooterSectionProps = {
  logoSrc?: string | null;
};

export function FooterSection({ logoSrc }: FooterSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const logo = logoSrc?.trim() || DEFAULT_LOGO;
  const logoRemote = /^https?:\/\//i.test(logo);

  return (
    <footer ref={footerRef} className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <SignalWaveAnimation />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div 
              className={`col-span-2 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href="/"
                className="inline-flex items-center mb-6 group focus-brand rounded-md"
                aria-label={landingContent.brand.name}
              >
                <Image
                  src={logo}
                  alt={landingContent.brand.name}
                  width={200}
                  height={200}
                  unoptimized={logoRemote}
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
                />
              </Link>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                {landingContent.footer.description}
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link, i) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors duration-300 flex items-center gap-1 group/social focus-brand rounded-sm"
                    style={{
                      transitionDelay: isVisible ? `${i * 50}ms` : "0ms"
                    }}
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/social:opacity-100 group-hover/social:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links], colIndex) => (
              <div 
                key={title}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${(colIndex + 1) * 100}ms` }}
              >
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link, linkIndex) => {
                    const badge =
                      "badge" in link &&
                      typeof link.badge === "string" &&
                      link.badge
                        ? link.badge
                        : null;
                    return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 inline-flex items-center gap-2 focus-brand rounded-sm hover:translate-x-0.5"
                      >
                        {link.name}
                        {badge ? (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {badge}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {landingContent.footer.copyright}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-brand status-pulse" />
                <span className="absolute inset-0 rounded-full bg-brand" />
              </span>
              {landingContent.footer.statusLabel}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
