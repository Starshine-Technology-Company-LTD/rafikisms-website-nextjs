import { MessageSquare, CheckCircle2, Wifi, RotateCcw, Signal } from "lucide-react";
import { FadeIn } from "./ui/fade-in";
import { BorderBeam } from "./ui/border-beam";

const carriers = [
  { name: "Vodacom", rate: 97,   color: "#e11d48" },
  { name: "Airtel",  rate: 96.6, color: "#f59e0b" },
  { name: "Tigo",    rate: 96.2, color: "#3b82f6" },
  { name: "Halotel", rate: 95.8, color: "#8b5cf6" },
  { name: "TTCL",    rate: 95.4, color: "#14b8a6" },
];

export default function Showcase() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="showcase-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <h2
            id="showcase-heading"
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white"
          >
            Built for Tanzania. Trusted at scale.
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            Local support meets enterprise reliability.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Local Support */}
          <FadeIn direction="left">
            <article className="group relative h-full rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111] p-6 sm:p-8 flex flex-col gap-6 overflow-hidden hover:border-[#14b8a6]/30 dark:hover:border-[#14b8a6]/40 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/50 dark:hover:bg-[#1a1a1a] hover:-translate-y-0.5 transition-all duration-300">
              <BorderBeam className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" size={200} duration={8} colorFrom="#14b8a6" colorTo="#14b8a640" />
              <div className="relative flex flex-col gap-6">
                <div>
                  <p className="text-xs font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">Local Support</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Human support, local to Tanzania
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    English and Swahili support coverage with a dedicated onboarding engineer. 98% customer satisfaction.
                  </p>
                </div>

                {/* Chat bubbles */}
                <div className="rounded-xl bg-slate-100 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[color:var(--brand-fill)]/20 border border-[#14b8a6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[color:var(--brand-text)]" aria-hidden="true" />
                    </div>
                    <div className="bg-white dark:bg-[#222] border border-black/5 dark:border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300">
                      Hello! <span className="text-[color:var(--brand-text)] font-medium">Habari yako?</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-slate-600 dark:text-slate-400">U</span>
                    </div>
                    <div className="bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 rounded-2xl rounded-tr-none px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300">
                      Nzuri sana. How do I add a sender ID?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[color:var(--brand-fill)]/20 border border-[#14b8a6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[color:var(--brand-text)]" aria-hidden="true" />
                    </div>
                    <div className="bg-white dark:bg-[#222] border border-black/5 dark:border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <span className="text-[color:var(--brand-text)] font-medium">Nimefurahi kukusaidia!</span>{" "}
                      Go to Sender Names in your dashboard.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" />
                    Message delivered OK
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "98%", label: "CSAT" },
                    { value: "EN + SW", label: "Languages" },
                    { value: "1 day", label: "KYC review" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </FadeIn>

          {/* Reliability */}
          <FadeIn direction="right">
            <article className="group relative h-full rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111] p-6 sm:p-8 flex flex-col gap-6 overflow-hidden hover:border-[#14b8a6]/30 dark:hover:border-[#14b8a6]/40 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/50 dark:hover:bg-[#1a1a1a] hover:-translate-y-0.5 transition-all duration-300">
              <BorderBeam className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" size={200} duration={12} colorFrom="#14b8a600" colorTo="#14b8a640" anchor={270} />
              <div className="relative flex flex-col gap-6">
                <div>
                  <p className="text-xs font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">Reliability</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Reliable delivery at scale
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Direct carrier integrations with Vodacom, Airtel, and Tigo ensure your messages arrive every time.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 p-5 space-y-3">
                  {carriers.map(({ name, rate, color }) => (
                    <div key={name} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 dark:text-slate-400 w-16 shrink-0">{name}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-black/8 dark:bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${rate}%`, backgroundColor: color, opacity: 0.85 }}
                          role="progressbar"
                          aria-valuenow={rate}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${name} delivery rate ${rate}%`}
                        />
                      </div>
                      <span className="text-xs text-slate-700 dark:text-slate-300 w-12 text-right tabular-nums">{rate}%</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2" role="list">
                  {[
                    { icon: Signal,       text: "99.7% delivery rate" },
                    { icon: CheckCircle2, text: "Real-time delivery receipts" },
                    { icon: RotateCcw,    text: "Automatic failover routing" },
                    { icon: Wifi,         text: "Direct carrier integrations" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <Icon className="w-4 h-4 text-[color:var(--brand-text)] shrink-0" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
