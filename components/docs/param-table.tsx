import { cn } from "@/lib/utils";

export type ParamRow = {
  name: string;
  type: string;
  required?: boolean;
  description: string;
};

export type ParamTableProps = {
  params: ParamRow[];
  className?: string;
};

export function ParamTable({ params, className }: ParamTableProps) {
  return (
    <div className={cn("-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0", className)}>
      <table className="w-full min-w-[520px] border-collapse text-sm md:min-w-0">
        <thead>
          <tr className="border-b border-border text-left font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <th className="pb-3 pr-4 font-medium">Parameter</th>
            <th className="pb-3 pr-4 font-medium">Type</th>
            <th className="pb-3 pr-4 font-medium">Required</th>
            <th className="pb-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((row) => (
            <tr key={row.name} className="border-b border-border/60 align-top">
              <td className="py-3 pr-4 font-mono text-[var(--brand-primary)]">{row.name}</td>
              <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{row.type}</td>
              <td className="py-3 pr-4">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
                    row.required
                      ? "border border-destructive/30 bg-destructive/10 text-destructive"
                      : "border border-border bg-muted/60 text-muted-foreground"
                  )}
                >
                  {row.required ? "required" : "optional"}
                </span>
              </td>
              <td className="py-3 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
