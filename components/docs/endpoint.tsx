import { cn } from "@/lib/utils";

const METHOD_CLASS: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  POST: "bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] border-[var(--brand-primary)]/30",
  PUT: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25",
  PATCH: "bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/25",
  DELETE: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/25",
};

export type EndpointProps = {
  method: keyof typeof METHOD_CLASS | string;
  path: string;
  description?: string;
  className?: string;
};

export function Endpoint({
  method,
  path,
  description,
  className,
}: EndpointProps) {
  const m = method.toUpperCase();
  const badge =
    METHOD_CLASS[m] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 shadow-sm", className)}>
      <div className="flex flex-wrap items-center gap-3 gap-y-2">
        <span
          className={cn(
            "rounded-md border px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide",
            badge
          )}
        >
          {m}
        </span>
        <code className="font-mono text-sm font-medium text-foreground">{path}</code>
      </div>
      {description ? (
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
