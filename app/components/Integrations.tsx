import { FadeIn } from "./ui/fade-in";

const integrations = [
  { name: "Figma",      color: "#a259ff" },
  { name: "GitHub",     color: "#6e7681" },
  { name: "Stripe",     color: "#635bff" },
  { name: "AWS",        color: "#ff9900" },
  { name: "Slack",      color: "#4a154b" },
  { name: "Notion",     color: "#6b6b6b" },
  { name: "Vercel",     color: "#6b6b6b" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Linear",     color: "#5e6ad2" },
  { name: "Twilio",     color: "#f22f46" },
  { name: "Supabase",   color: "#3ecf8e" },
  { name: "Docker",     color: "#2496ed" },
  { name: "Firebase",   color: "#ffca28" },
  { name: "Jira",       color: "#0052cc" },
  { name: "Redis",      color: "#dc382d" },
  { name: "Cloudflare", color: "#f6821f" },
];

export default function Integrations() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="integrations-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">Integrations</p>
          <h2 id="integrations-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Built to plug into your existing systems
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Connect CRM, ERP, support, and commerce tools to trigger SMS flows from events your teams already use.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-2.5">
            {integrations.map(({ name, color }, i) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/8 dark:border-white/8 bg-white dark:bg-[#111] text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-[#14b8a6]/30 dark:hover:border-[#14b8a6]/20 hover:shadow-sm dark:hover:shadow-none transition-all duration-200 cursor-default animate-swing"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="w-2.5 h-2.5 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/10" style={{ backgroundColor: color }} aria-hidden="true" />
                {name}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
