"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ArchitectureDeepDive() {
  return (
    <Accordion type="single" collapsible className="w-full rounded-2xl border border-border/60 bg-card/40 px-2">
      <AccordionItem value="queue" className="border-border/50 px-3">
        <AccordionTrigger className="font-mono text-sm hover:no-underline md:text-base">
          Message queue &amp; processing
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            inbound API → validation → durable write → publish to work queues → SMPP
            workers with retries, dead-letter paths, and carrier-level back-pressure.
          </p>
          <div className="flex flex-wrap gap-2 rounded-lg border border-[var(--brand-primary)]/20 bg-background/60 p-4 font-mono text-[11px] text-[var(--brand-primary)]">
            <QueueChip label="sms.send" />
            <QueueChip label="sms.dlr" />
            <QueueChip label="sms.retry" />
            <span className="text-muted-foreground">→ workers → gateways</span>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="lifecycle" className="border-border/50 px-3">
        <AccordionTrigger className="font-mono text-sm hover:no-underline md:text-base">
          Delivery receipts &amp; callbacks
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            DLR ingestion normalizes carrier statuses into your datastore and fans out webhooks so your CRM or billing systems stay aligned without polling.
          </p>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4 font-mono text-[11px] leading-relaxed">
            <span className="text-[var(--brand-primary)]">telco</span>
            <span className="text-muted-foreground"> → </span>
            <span className="text-blue-400">DLR adapter</span>
            <span className="text-muted-foreground"> → </span>
            <span className="text-amber-600/90 dark:text-amber-400">HTTPS callback</span>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="layers" className="border-border/50 px-3">
        <AccordionTrigger className="font-mono text-sm hover:no-underline md:text-base">
          Layered architecture
        </AccordionTrigger>
        <AccordionContent className="pb-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { t: "Edge & API", d: "Auth · rate limits · routing" },
              { t: "Workers", d: "Queues · pools · retries" },
              { t: "Carriers", d: "SMPP · DLR · observability" },
            ].map((row) => (
              <div
                key={row.t}
                className="rounded-xl border border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/5 p-4"
              >
                <p className="font-mono text-xs font-medium text-[var(--brand-primary)]">
                  {row.t}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{row.d}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function QueueChip({ label }: { label: string }) {
  return (
    <span className="rounded border border-[var(--brand-primary)]/40 px-2 py-1">
      {label}
    </span>
  );
}
