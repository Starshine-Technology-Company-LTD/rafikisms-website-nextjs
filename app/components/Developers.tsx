import { ArrowRight, Zap, Layers, AlertCircle, BookOpen } from "lucide-react";
import { FadeIn } from "./ui/fade-in";

const features = [
  { icon: Zap,         title: "RESTful endpoints",   description: "Simple request/response patterns for quick adoption." },
  { icon: Layers,      title: "Queue-friendly",       description: "Designed for asynchronous high-volume dispatch flows." },
  { icon: AlertCircle, title: "Clear errors",         description: "Actionable error codes for invalid sender IDs and account states." },
  { icon: BookOpen,    title: "Docs-first",           description: "OpenAPI-friendly structure for easy testing and onboarding." },
];

export default function Developers() {
  return (
    <section id="developers" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="dev-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: code */}
          <FadeIn direction="left">
            <div className="rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#0a0a0a] overflow-hidden glow-box-brand">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-black">
                <span className="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 dark:bg-yellow-500/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-green-400/80 dark:bg-green-500/70" aria-hidden="true" />
                <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-mono">curl example</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-0.5 leading-relaxed overflow-x-auto">
                <p><span className="text-purple-600 dark:text-purple-400">curl</span> <span className="text-yellow-600 dark:text-yellow-300">-X POST</span> <span className="text-slate-500 dark:text-slate-600">\</span></p>
                <p className="pl-4"><span className="text-green-700 dark:text-green-300">&quot;https://api.rafikisms.com/v1/vendor/send-sms&quot;</span> <span className="text-slate-500 dark:text-slate-600">\</span></p>
                <p className="pl-4"><span className="text-slate-500 dark:text-slate-400">-H </span><span className="text-green-700 dark:text-green-300">&quot;X-API-Key: sk_vendor_xxx&quot;</span> <span className="text-slate-500 dark:text-slate-600">\</span></p>
                <p className="pl-4"><span className="text-slate-500 dark:text-slate-400">-H </span><span className="text-green-700 dark:text-green-300">&quot;Content-Type: application/json&quot;</span> <span className="text-slate-500 dark:text-slate-600">\</span></p>
                <p className="pl-4"><span className="text-slate-500 dark:text-slate-400">-d </span><span className="text-green-700 dark:text-green-300">&apos;&#123;</span></p>
                <p className="pl-8"><span className="text-sky-600 dark:text-sky-300">&quot;phone&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;255712345678&quot;</span><span className="text-slate-500 dark:text-slate-400">,</span></p>
                <p className="pl-8"><span className="text-sky-600 dark:text-sky-300">&quot;message&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;Hello&quot;</span><span className="text-slate-500 dark:text-slate-400">,</span></p>
                <p className="pl-8"><span className="text-sky-600 dark:text-sky-300">&quot;source_address&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;STARSHINE&quot;</span></p>
                <p><span className="text-green-700 dark:text-green-300">&apos;&#125;&apos;</span></p>
                <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">Response 200</p>
                  <p className="text-slate-600 dark:text-slate-400">&#123;</p>
                  <p className="pl-4"><span className="text-sky-600 dark:text-sky-300">&quot;status&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;delivered&quot;</span><span className="text-slate-500 dark:text-slate-400">,</span></p>
                  <p className="pl-4"><span className="text-sky-600 dark:text-sky-300">&quot;carrier&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-green-700 dark:text-green-300">&quot;Vodacom&quot;</span><span className="text-slate-500 dark:text-slate-400">,</span></p>
                  <p className="pl-4"><span className="text-sky-600 dark:text-sky-300">&quot;latency_ms&quot;</span><span className="text-slate-500 dark:text-slate-400">: </span><span className="text-yellow-600 dark:text-yellow-300">1200</span></p>
                  <p className="text-slate-600 dark:text-slate-400">&#125;</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: content */}
          <FadeIn direction="right">
            <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">Developers</p>
            <h2 id="dev-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              API-first experience. Production-ready delivery.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
              Use familiar JSON APIs to send, track, and report messages with clean integration paths for Node, .NET, Python, or your own services.
            </p>
            <ul className="space-y-4 mb-8" role="list">
              {features.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[color:var(--brand-text)]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="https://developers.rafikisms.com/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[color:var(--brand-fill)] hover:bg-[color:var(--brand-fill-hover)] text-white text-sm font-semibold transition-colors duration-200 cursor-pointer">
                Read API docs
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="https://developers.rafikisms.com/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-white text-sm font-medium transition-colors duration-200 cursor-pointer">
                Integration guide
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
