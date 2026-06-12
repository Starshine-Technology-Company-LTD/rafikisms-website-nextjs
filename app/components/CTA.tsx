import { ArrowRight } from "lucide-react";
import { FadeIn } from "./ui/fade-in";
import { TextShimmer } from "./ui/text-shimmer";
import { DotPattern } from "./ui/dot-pattern";

export default function CTA() {
  return (
    <section
      className="relative py-32 overflow-hidden bg-white dark:bg-black transition-colors duration-300"
      aria-labelledby="cta-heading"
    >
      {/* Dot pattern */}
      <DotPattern
        className="opacity-20 dark:opacity-30"
        width={20}
        height={20}
        color="rgba(20,184,166,0.2)"
      />

      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, var(--glow-med) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2
            id="cta-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight"
          >
            <TextShimmer duration={3.5}>Start with us today</TextShimmer>
          </h2>
        </FadeIn>

        <FadeIn delay={80}>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-2 max-w-xl mx-auto leading-relaxed">
            Launch with Rafiki SMS and give your teams secure APIs, reliable
            queues, and clear delivery visibility.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-600 mb-12">No credit card required</p>
        </FadeIn>

        <FadeIn delay={160}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://vendor.rafikisms.com/auth/vendor-register"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[color:var(--brand-fill)] hover:bg-[color:var(--brand-fill-hover)] text-white font-bold text-base transition-all duration-200 btn-glow hover:shadow-2xl hover:shadow-[#14b8a6]/30 dark:hover:shadow-[#14b8a6]/50 cursor-pointer"
            >
              Create an account
              <ArrowRight
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="https://vendor.rafikisms.com/auth/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-white dark:bg-white/5 hover:bg-black/3 dark:hover:bg-white/8 text-slate-700 dark:text-white font-semibold text-base transition-all duration-200 cursor-pointer"
            >
              Sign in
            </a>
            <a
              href="https://developers.rafikisms.com/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-white dark:bg-white/5 hover:bg-black/3 dark:hover:bg-white/8 text-slate-700 dark:text-white font-semibold text-base transition-all duration-200 cursor-pointer"
            >
              Read API docs
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
