"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsNavSections } from "@/lib/docs-navigation";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const activeForHref = (href: string) => {
    if (href === "/docs") return pathname === "/docs";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-8 pb-10">
      {docsNavSections.map((section) => (
        <div key={section.label}>
          <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-sidebar-foreground/55">
            {section.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const active = activeForHref(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center rounded-md py-2 pl-3 text-sm transition-colors",
                      active
                        ? "border-l-2 border-[var(--brand-primary)] bg-[var(--brand-soft)] font-medium text-[var(--brand-primary)]"
                        : "border-l-2 border-transparent text-sidebar-foreground/90 hover:bg-sidebar-accent/80"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
