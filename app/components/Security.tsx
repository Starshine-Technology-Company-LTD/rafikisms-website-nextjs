import { ScrollText, UserCog, Key, RefreshCw, ShieldAlert, BadgeCheck } from "lucide-react";
import { FadeIn } from "./ui/fade-in";
import { BorderBeam } from "./ui/border-beam";
import { GradientDots } from "./ui/gradient-dots";

const pillars = [
  { icon: BadgeCheck, title: "Sender authorization",    description: "Only approved sender IDs can dispatch for a vendor account." },
  { icon: Key,        title: "Secure API access",       description: "Vendor keys authenticate requests while gateway credentials remain server-side." },
  { icon: RefreshCw,  title: "Operational monitoring",  description: "Track queue health and status changes with clear visibility for support teams." },
  { icon: ScrollText, title: "Compliance-ready logs",   description: "Maintain message, billing, and audit trails for investigations and reporting." },
];

const tags    = [ScrollText, UserCog, Key, RefreshCw, ShieldAlert].map((i, x) => [
  ["Audit Logs", "Role Permissions", "API Key Isolation", "Queue Retries", "Access Policies"][x],
  i,
] as [string, typeof ScrollText]);

const roles = [
  { role: "Super Admin",    access: "Full platform control",                          color: "text-red-600 dark:text-red-400" },
  { role: "Admin",          access: "Vendor, sender and billing management",           color: "text-orange-600 dark:text-orange-400" },
  { role: "Finance",        access: "Revenue and export reports only",                 color: "text-yellow-600 dark:text-yellow-400" },
  { role: "Vendor / Client",access: "Send SMS, manage sender IDs, sub-accounts",       color: "text-[color:var(--brand-text)]" },
  { role: "Student",        access: "Sandbox API and learning resources",              color: "text-sky-600 dark:text-sky-400" },
];

export default function Security() {
  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300 overflow-hidden" aria-labelledby="security-heading">
      <GradientDots duration={40} colorCycleDuration={8} className="z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <FadeIn direction="left">
            <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">Security</p>
            <h2 id="security-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Trust is built in
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-8">
              Role controls, API-key isolation, and auditable workflows protect sender governance, delivery operations, and billing visibility.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map(([label, Icon]) => (
                <div key={label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#14b8a6]/20 bg-[color:var(--brand-fill)]/5 text-sm text-slate-700 dark:text-slate-200">
                  <Icon className="w-3.5 h-3.5 text-[color:var(--brand-text)]" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111] p-5">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider font-medium">Role-based access control</p>
              <div className="space-y-3">
                {roles.map(({ role, access, color }) => (
                  <div key={role} className="flex items-start gap-3 text-xs">
                    <span className={`font-semibold w-28 shrink-0 ${color}`}>{role}</span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{access}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right */}
          <FadeIn direction="right">
            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map(({ icon: Icon, title, description }) => (
                <div key={title} className="group relative p-5 rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111] hover:border-[#14b8a6]/30 dark:hover:border-[#14b8a6]/20 hover:shadow-sm dark:hover:shadow-none transition-all duration-200 overflow-hidden">
                  <BorderBeam className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={120} duration={8} colorFrom="#14b8a600" colorTo="#14b8a640" />
                  <div className="relative">
                    <div className="w-9 h-9 rounded-lg bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-4 h-4 text-[color:var(--brand-text)]" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">{title}</h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
