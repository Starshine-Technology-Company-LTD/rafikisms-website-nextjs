import { Activity, Eye, Code2, Zap } from "lucide-react";
import { NumberTicker } from "./ui/number-ticker";
import { FadeIn } from "./ui/fade-in";

const metrics = [
  { icon: Activity, value: 99.99, suffix: "%",  label: "Platform uptime target",      sub: "Rafiki Operations", decimalPlaces: 2 },
  { icon: Eye,      value: 24,    suffix: "/7",  label: "Delivery monitoring",          sub: "NOC Team",          decimalPlaces: 0 },
  { icon: Code2,    value: 99.7,  suffix: "%",   label: "Delivery rate",                sub: "All carriers",      decimalPlaces: 1 },
  { icon: Zap,      value: 3,     prefix: "<", suffix: "s", label: "Queue to provider handoff", sub: "Rafiki Pipeline", decimalPlaces: 0 },
];

export default function Metrics() {
  return (
    <section
      className="relative py-14 border-y border-black/5 dark:border-white/5 bg-white dark:bg-black transition-colors duration-300"
      aria-label="Platform metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-black/10 dark:lg:divide-white/10">
          {metrics.map(({ icon: Icon, value, suffix, prefix, label, sub, decimalPlaces }, i) => (
            <FadeIn key={label} delay={i * 80} className="text-center px-4 py-2">
              <div className="flex justify-center mb-3">
                <Icon className="w-10 h-10 text-[color:var(--brand-text)]" aria-hidden="true" />
              </div>
              <dt className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 tabular-nums">
                {prefix}
                <NumberTicker value={value} decimalPlaces={decimalPlaces} duration={1400} />
                {suffix}
              </dt>
              <dd className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{label}</dd>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
}
