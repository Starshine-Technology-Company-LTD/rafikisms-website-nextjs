"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type MobileNavSection = {
  label: string;
  links: { label: string; href: string }[];
};

/** Sectioned slide-down panel — styled with Rafiki `--brand-primary` tokens */
export const MOBILE_NAV_SECTIONS: MobileNavSection[] = [
  {
    label: "PRODUCT",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Approach", href: "/#approach" },
      { label: "Developers", href: "/#developers" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    label: "RESOURCES",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "API reference", href: "/docs/send-sms" },
      { label: "Status", href: "/#contact" },
    ],
  },
];

function isHrefActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) return false;
  if (href.includes("#")) {
    const [path] = href.split("#");
    if (path && path !== "/" && pathname.startsWith(path)) return true;
    return pathname === path || pathname === `${path}/`;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-hidden
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[118] bg-[var(--bg-overlay, rgba(6,14,9,0.72))] backdrop-blur-[20px] md:hidden dark:bg-black/75"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            id="mobile-navigation-panel"
            role="navigation"
            aria-label="Main navigation"
            initial={{ height: 0, opacity: 0.96 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[119] overflow-hidden border-b border-[var(--brand-primary)]/15 bg-background/95 shadow-lg backdrop-blur-xl md:hidden"
          >
            <div className="max-h-[min(78dvh,560px)] overflow-y-auto overscroll-contain px-4 pb-6 pt-3">
              {MOBILE_NAV_SECTIONS.map((section) => (
                <div key={section.label} className="border-t border-border/60 py-4 first:border-t-0 first:pt-1">
                  <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-muted-foreground">
                    {section.label}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {section.links.map((link) => {
                      const active = isHrefActive(pathname, link.href);
                      return (
                        <li key={link.label + link.href}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className={`flex items-center rounded-md py-2.5 pl-3 font-sans text-[15px] transition-colors ${
                              active
                                ? "border-l-2 border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 font-medium text-[var(--brand-primary)]"
                                : "border-l-2 border-transparent text-foreground/90 hover:bg-muted/40"
                            }`}
                          >
                            <span className="mr-2 text-muted-foreground">
                              {active ? "●" : "▸"}
                            </span>
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="mt-4 border-t border-border/60 pt-4">
                <Link
                  href="/#contact"
                  onClick={onClose}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--brand-primary)] font-medium text-white shadow-md shadow-[var(--brand-primary)]/25 transition hover:bg-[var(--brand-primary-dk)]"
                >
                  Start sending →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Compact toggle icon — pairs with MobileNav panel */
export function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center" aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="x"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <X className="h-6 w-6 text-foreground" strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center justify-center gap-[5px]"
          >
            <span className="block h-0.5 w-[22px] rounded-full bg-foreground" />
            <span className="block h-0.5 w-[22px] rounded-full bg-foreground" />
            <span className="block h-0.5 w-[11px] self-end rounded-full bg-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
