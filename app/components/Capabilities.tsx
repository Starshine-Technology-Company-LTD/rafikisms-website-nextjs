import { Key, BadgeCheck, RefreshCw, BarChart3 } from "lucide-react";
import { BorderBeam } from "./ui/border-beam";
import { FadeIn } from "./ui/fade-in";
import { TextShimmer } from "./ui/text-shimmer";

const capabilities = [
  {
    icon: Key,
    title: "Vendor API authentication",
    description: "Issue and manage vendor API keys so clients send through your Laravel endpoint, never directly to the gateway.",
    delay: 0,
  },
  {
    icon: BadgeCheck,
    title: "Sender ID governance",
    description: "Control assignment and operational eligibility of sender IDs with clear statuses and policy-based enforcement.",
    delay: 80,
  },
  {
    icon: RefreshCw,
    title: "Reliable queued delivery",
    description: "Process messages asynchronously with queue workers, retries, and callbacks that keep throughput stable.",
    delay: 160,
  },
  {
    icon: BarChart3,
    title: "Live reporting and exports",
    description: "Track sent, delivered, failed, and pending messages with filterable reports and export-ready data.",
    delay: 240,
  },
];

export default function Capabilities() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="capabilities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">
            Capabilities
          </p>
          <h2
            id="capabilities-heading"
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white max-w-2xl mx-auto leading-tight"
          >
            Everything you need to{" "}
            <TextShimmer duration={3}>run SMS at scale</TextShimmer>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Purpose-built for Tanzania, proven in production.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map(({ icon: Icon, title, description, delay }) => (
            <FadeIn key={title} delay={delay}>
              <article className="group relative h-full p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] hover:border-[#14b8a6]/30 dark:hover:border-[#14b8a6]/20 hover:shadow-md dark:hover:shadow-none transition-all duration-300 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: "radial-gradient(circle at 50% -10%, var(--glow-soft) 0%, transparent 60%)",
                  }}
                  aria-hidden="true"
                />
                <BorderBeam
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  size={150}
                  duration={8}
                  colorFrom="#14b8a600"
                  colorTo="#14b8a6"
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-5 h-5 text-[color:var(--brand-text)]" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
