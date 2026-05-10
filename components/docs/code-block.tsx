"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export type CodeBlockProps = {
  tabs: string[];
  examples: Record<string, string>;
  className?: string;
};

export function CodeBlock({ tabs, examples, className }: CodeBlockProps) {
  const ordered = tabs.filter((t) => examples[t]);
  const [tab, setTab] = useState(ordered[0] ?? "");
  const [copied, setCopied] = useState(false);
  const code = examples[tab] ?? "";

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-[var(--docs-code-bg)] text-[var(--docs-code-fg)] shadow-sm",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--docs-code-tab-border)] px-2 pt-2">
        {ordered.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-3 py-1.5 font-mono text-xs capitalize transition-colors",
              tab === t
                ? "bg-[var(--brand-soft)] text-[var(--brand-primary)]"
                : "text-[var(--docs-code-muted)] hover:bg-foreground/5 hover:text-[var(--docs-code-fg)]"
            )}
          >
            {t}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 pb-1">
          <button
            type="button"
            onClick={copy}
            className="rounded-md p-2 text-[var(--docs-code-muted)] opacity-0 transition-opacity hover:bg-foreground/5 hover:text-[var(--docs-code-fg)] group-hover:opacity-100"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-[var(--brand-primary)]" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.8] text-[var(--docs-code-muted)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
