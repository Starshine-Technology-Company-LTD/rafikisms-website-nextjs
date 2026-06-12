import { Monitor, TrendingUp, Cpu, Globe } from "lucide-react";
import { FadeIn } from "./ui/fade-in";

const regions = [
  { city: "Dar es Salaam", role: "Primary",        ms: 12,  active: true },
  { city: "Nairobi",       role: "East Africa",    ms: 24,  active: true },
  { city: "Johannesburg",  role: "Southern Africa",ms: 38,  active: true },
  { city: "Dubai",         role: "Middle East",    ms: 55,  active: true },
  { city: "London",        role: "Europe",         ms: 92,  active: true },
  { city: "Mumbai",        role: "Asia",           ms: 110, active: true },
];

const infraFeatures = [
  { icon: Monitor,    title: "24/7 delivery monitoring",    description: "NOC team watches queue health and delivery status around the clock." },
  { icon: TrendingUp, title: "99.99% service uptime target", description: "Redundant workers and failover routing keep throughput stable." },
  { icon: Cpu,        title: "Less than 5s job processing", description: "Queue-based architecture designed for high-volume dispatch flows." },
  { icon: Globe,      title: "6 global regions",             description: "Processing nodes from Dar es Salaam to Mumbai for low-latency delivery." },
];

export default function Infrastructure() {
  const maxMs = Math.max(...regions.map((r) => r.ms));

  return (
    <section className="overflow-hidden py-16 md:py-32 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="infra-heading">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <FadeIn className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3">Infrastructure</p>
          <h2 id="infra-heading" className="text-4xl font-semibold lg:text-5xl text-slate-900 dark:text-white">
            Built for high-volume delivery
          </h2>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Queue-based architecture, resilient workers, and auditable logs help teams process large SMS traffic with confidence.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="relative -mx-4 rounded-3xl p-3 md:-mx-12">
            <div className="[perspective:800px]">
              <div className="[transform:skewY(-2deg)skewX(-2deg)rotateX(6deg)]">
                <div className="aspect-[88/36] relative rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent" />
                  <div className="p-6 sm:p-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">Message Processing Regions</h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-400/10 border border-teal-200 dark:border-teal-400/20 text-teal-700 dark:text-teal-400 font-medium">
                        All operational
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {regions.map(({ city, role, ms, active }) => (
                        <div key={city} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${active ? "bg-teal-500" : "bg-slate-400"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-900 dark:text-white truncate">{city}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 ml-2 tabular-nums">{ms}ms</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={160}>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            {infraFeatures.map(({ icon: Icon, title, description }) => (
              <div key={title} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <Icon className="size-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
