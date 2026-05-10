"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export type TryConsoleProps = {
  /** Default JSON shown in the editor */
  defaultBody?: string;
};

/** Opens a right drawer — wire your vendor endpoint when backend URL is configured */
export function TryConsole({ defaultBody }: TryConsoleProps) {
  const [body, setBody] = useState(
    defaultBody ??
      `{\n  "phone": "255712345678",\n  "message": "Hello from Rafiki",\n  "source_address": "YOUR_SENDER"\n}`
  );
  const [apiKey, setApiKey] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const send = () => {
    setResponse(
      "// Demo mode — set NEXT_PUBLIC_VENDOR_API_URL and call from your backend.\n" +
        JSON.stringify({ ok: false, demo: true }, null, 2)
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-[var(--brand-primary)]/35 font-mono text-xs text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10"
        >
          Try in console <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto border-border bg-card text-card-foreground sm:max-w-lg"
      >
        <SheetHeader className="border-b border-border pb-4 text-left">
          <SheetTitle className="font-mono text-lg">API console</SheetTitle>
          <SheetDescription>
            Paste a sandbox key and edit JSON. Production traffic should originate from your servers,
            not the browser.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4 pt-6">
          <label className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              API key
            </span>
            <input
              type="password"
              autoComplete="off"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk_vendor_xxx"
              className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 font-mono text-sm outline-none ring-[var(--brand-primary)] focus:ring-2"
            />
          </label>
          <label className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Request body (JSON)
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              spellCheck={false}
              rows={12}
              className="w-full resize-y rounded-lg border border-border bg-[var(--docs-code-bg)] p-4 font-mono text-[13px] leading-relaxed text-[var(--docs-code-fg)] outline-none ring-[var(--brand-primary)] focus:ring-2"
            />
          </label>
          <Button
            type="button"
            className="rounded-full bg-[var(--brand-primary)] font-medium text-[var(--brand-foreground)] hover:bg-[var(--brand-primary-dk)]"
            onClick={send}
          >
            Send request
          </Button>
          {response ? (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Response
              </p>
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground">
                {response}
              </pre>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
