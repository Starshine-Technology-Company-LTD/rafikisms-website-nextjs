import { Lock, ShieldCheck, Layers } from "lucide-react";
import { FadeIn } from "./ui/fade-in";

const steps = [
  { roman: "I",   icon: Lock,       title: "Authenticate with vendor key",   description: "Clients call your API with X-API-Key. Rafiki credentials stay server-side for security." },
  { roman: "II",  icon: ShieldCheck, title: "Validate sender and credits",     description: "The platform checks sender authorization, account status, and billing eligibility before dispatch." },
  { roman: "III", icon: Layers,      title: "Queue, dispatch, and track",      description: "Jobs send via Rafiki gateway and persist delivery status for real-time dashboards and exports." },
];

export default function Process() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <FadeIn direction="left">
            <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">How it works</p>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Three steps. Production-grade SMS flow.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 text-sm leading-relaxed">
              A clean, auditable pipeline from client request to confirmed delivery, with no gateway credentials exposed to the client.
            </p>
            <ol className="relative space-y-10" role="list">
              {steps.map(({ roman, icon: Icon, title, description }, i) => (
                <li key={roman} className="relative flex items-start gap-5">
                  {/* Number badge */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[color:var(--brand-fill)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {roman}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-[#14b8a6]/40 to-transparent mt-2" aria-hidden="true" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-[color:var(--brand-fill)]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[color:var(--brand-text)]" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-10">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeIn>

          {/* Right: code */}
          <FadeIn direction="right">
            <div className="rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#111] overflow-hidden glow-box-brand">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-[#0a0a0a]/60">
                <span className="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 dark:bg-yellow-500/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-green-400/80 dark:bg-green-500/70" aria-hidden="true" />
                <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-mono">API Request</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-0.5 leading-relaxed overflow-x-auto">
                <p><span className="text-purple-600 dark:text-purple-400">POST</span> <span className="text-slate-600 dark:text-slate-400">/v1/vendor/send-sms</span></p>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Headers</p>
                <p className="pl-4"><span className="text-slate-600 dark:text-slate-400">X-API-Key:</span> <span className="text-green-700 dark:text-green-300">sk_vendor_xxx</span></p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">&#123;</p>
                <p className="pl-6"><span className="text-sky-600 dark:text-sky-300">&quot;phone&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;255712345678&quot;</span><span className="text-slate-500 dark:text-slate-400">,</span></p>
                <p className="pl-6"><span className="text-sky-600 dark:text-sky-300">&quot;message&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;Order confirmed&quot;</span><span className="text-slate-500 dark:text-slate-400">,</span></p>
                <p className="pl-6"><span className="text-sky-600 dark:text-sky-300">&quot;source_address&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;STARSHINE&quot;</span></p>
                <p className="text-slate-600 dark:text-slate-400">&#125;</p>
                <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
                  {[
                    { stage: "Auth",     status: "sk_vendor verified" },
                    { stage: "Validate", status: "STARSHINE active" },
                    { stage: "Queue",    status: "Job dispatched" },
                    { stage: "Deliver",  status: "Vodacom 1.2s" },
                  ].map(({ stage, status }) => (
                    <div key={stage} className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400 w-14">{stage}</span>
                      <span className="text-xs text-green-600 dark:text-green-400">&#10003; {status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
