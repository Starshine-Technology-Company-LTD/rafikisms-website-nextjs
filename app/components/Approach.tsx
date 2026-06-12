import { UserPlus, FileCheck, KeyRound, Rocket } from "lucide-react";
import { FadeIn } from "./ui/fade-in";
import { FallingPattern } from "./ui/falling-pattern";

const steps = [
  {
    num: "01", icon: UserPlus, title: "Register", time: "~2 min",
    subtitle: "Create your vendor account",
    description: "Sign up in under two minutes. Enter your business name, work email, and contact details. No credit card required to get started.",
    features: ["Business email + company name", "No credit card required", "Instant access to sandbox"],
    visual: (
      <div className="rounded-xl bg-slate-50 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-4 space-y-3">
        <div className="space-y-2">
          {[
            { label: "Business name", value: "AfyaConnect Ltd" },
            { label: "Work email",    value: "ops@afyaconnect.co.tz" },
            { label: "Phone",         value: "+255 762 000 000" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
              <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-black/80 border border-black/8 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                {value}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2 rounded-lg bg-[color:var(--brand-fill)]/10 dark:bg-[color:var(--brand-fill)]/20 border border-[#14b8a6]/30 text-[color:var(--brand-text)] text-xs font-medium cursor-default" tabIndex={-1} aria-hidden="true">
          Create account
        </button>
      </div>
    ),
  },
  {
    num: "02", icon: FileCheck, title: "KYC", time: "~5 min",
    subtitle: "Verify your business",
    description: "Upload your business registration certificate and director national ID. Our compliance team reviews submissions within one business day.",
    features: ["Business registration certificate", "Director national ID or passport", "Reviewed within 1 business day"],
    visual: (
      <div className="rounded-xl bg-slate-50 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-4 space-y-3">
        {[
          { label: "Business certificate", status: "Uploaded",     color: "text-green-600 dark:text-green-400" },
          { label: "Director national ID",  status: "Uploaded",     color: "text-green-600 dark:text-green-400" },
          { label: "Review status",          status: "Under review", color: "text-yellow-600 dark:text-yellow-400" },
        ].map(({ label, status, color }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
            <span className={`text-xs font-medium ${color}`}>{status}</span>
          </div>
        ))}
          <div className="h-1.5 rounded-full bg-black/8 dark:bg-white/5 overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-yellow-400/70 dark:bg-yellow-500/40" aria-hidden="true" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Est. review: 1 business day</p>
      </div>
    ),
  },
  {
    num: "03", icon: KeyRound, title: "Approved", time: "1 business day",
    subtitle: "Receive your credentials",
    description: "Once verified, we activate your vendor account, issue your API key, and assign your approved sender IDs. Ready to test in the sandbox.",
    features: ["API key issued instantly on approval", "Sender ID activated across all carriers", "Full sandbox access with test credits"],
    visual: (
      <div className="rounded-xl bg-slate-50 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-4 space-y-3 font-mono text-xs">
        <div>
          <p className="text-slate-500 dark:text-slate-400 mb-1">API Key</p>
          <p className="text-[color:var(--brand-text)]">sk_vendor_████████████</p>
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 mb-1">Sender IDs</p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-green-50 dark:bg-green-400/10 border border-green-200 dark:border-green-400/20 text-green-700 dark:text-green-400">AFYACONNECT</span>
            <span className="px-2 py-0.5 rounded bg-green-50 dark:bg-green-400/10 border border-green-200 dark:border-green-400/20 text-green-700 dark:text-green-400">AFYA-SMS</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse inline-block" aria-hidden="true" />
          Account active
        </div>
      </div>
    ),
  },
  {
    num: "04", icon: Rocket, title: "Go Live", time: "Same day",
    subtitle: "Start sending SMS today",
    description: "One REST endpoint. Integrate with Laravel, Node, or Python. Your dedicated onboarding engineer stays available until your first live message is confirmed.",
    features: ["One API call to any Tanzanian network", "Dedicated engineer on first go-live", "Real-time delivery receipts from day one"],
    visual: (
      <div className="rounded-xl bg-slate-50 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-4 font-mono text-xs space-y-1 overflow-x-auto">
        <p><span className="text-purple-600 dark:text-purple-400">POST</span> <span className="text-slate-600 dark:text-slate-400">/v1/vendor/send-sms</span></p>
        <p><span className="text-slate-600 dark:text-slate-400">X-API-Key:</span> <span className="text-green-700 dark:text-green-300">sk_vendor_xxx</span></p>
        <p className="text-slate-600 dark:text-slate-400">&#123;</p>
        <p className="pl-4"><span className="text-sky-600 dark:text-sky-300">&quot;phone&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;255712...&quot;</span></p>
        <p className="pl-4"><span className="text-sky-600 dark:text-sky-300">&quot;message&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;Order confirmed&quot;</span></p>
        <p className="text-slate-600 dark:text-slate-400">&#125;</p>
        <div className="pt-2 border-t border-black/5 dark:border-white/5">
          <p className="text-green-600 dark:text-green-400">Delivered | Vodacom | 1.2s</p>
        </div>
      </div>
    ),
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300 overflow-hidden" aria-labelledby="approach-heading">
      <FallingPattern
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,var(--background))]"
        color="var(--primary)"
        backgroundColor="var(--background)"
        duration={200}
        density={2}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">Approach</p>
          <h2 id="approach-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            A collaboration journey, from concept to delivery
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Getting started with Rafiki SMS is simple. Four easy steps, from creating your account to sending your first live SMS in Tanzania.
          </p>
        </FadeIn>

        <div className="space-y-16">
          {steps.map(({ num, icon: Icon, title, time, subtitle, description, features, visual }, idx) => (
            <FadeIn key={num} direction={idx % 2 === 0 ? "left" : "right"}>
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                {/* Content */}
                <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-600">{num}</span>
                    <div className="w-8 h-8 rounded-lg bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[color:var(--brand-text)]" aria-hidden="true" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">{time}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                    {title}{" "}
                    <span className="text-slate-600 dark:text-slate-400 font-normal text-base">{subtitle}</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{description}</p>
                  <ul className="space-y-2" role="list">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--brand-fill)] shrink-0" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={`rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111] p-6 ${idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  {visual}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200} className="mt-14 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
            Ready to get started? Registration takes under 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://vendor.rafikisms.com/auth/vendor-register" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[color:var(--brand-fill)] hover:bg-[color:var(--brand-fill-hover)] text-white font-semibold transition-colors duration-200 cursor-pointer">
              Create your account
            </a>
            <a href="https://developers.rafikisms.com/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-white font-medium transition-colors duration-200 cursor-pointer">
              Read API docs
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
