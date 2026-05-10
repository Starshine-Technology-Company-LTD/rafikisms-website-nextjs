"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DocsSidebar } from "./docs-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-[100] border-b border-border bg-card/95 text-card-foreground shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 md:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open documentation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[260px] border-border bg-sidebar p-0 text-sidebar-foreground sm:max-w-[260px]"
            >
              <SheetHeader className="border-b border-sidebar-border px-4 py-4 text-left">
                <SheetTitle className="font-mono text-sm text-[var(--brand-primary)]">
                  RafikiAPI Docs
                </SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto px-3 pt-4">
                <DocsSidebar onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <Link
            href="/docs"
            className="font-mono text-sm font-semibold tracking-tight text-[var(--brand-primary)] md:text-base"
          >
            RafikiAPI Docs
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "hidden gap-2 font-mono text-xs sm:inline-flex",
                "border-border/80 text-muted-foreground"
              )}
              aria-label="Search documentation"
            >
              <Search className="h-3.5 w-3.5" />
              Search
              <kbd className="hidden rounded border border-border bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] lg:inline">
                ⌘K
              </kbd>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <a href="https://github.com" rel="noreferrer" target="_blank">
                GitHub
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <a href="/#contact">Support</a>
            </Button>
            <Button
              size="sm"
              asChild
              className="rounded-full border-0 bg-[var(--brand-primary)] px-4 text-xs font-medium text-[var(--brand-foreground)] shadow-sm hover:bg-[var(--brand-primary-dk)]"
            >
              <a href="#" aria-label="Vendor dashboard">
                Dashboard →
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[220px] shrink-0 overflow-y-auto border-r border-sidebar-border bg-sidebar/90 px-5 py-8 text-sidebar-foreground md:block">
          <DocsSidebar />
        </aside>
        <div className="min-w-0 flex-1 bg-background px-4 py-8 md:px-10 md:py-10 lg:px-14">
          {children}
        </div>
      </div>
    </div>
  );
}
