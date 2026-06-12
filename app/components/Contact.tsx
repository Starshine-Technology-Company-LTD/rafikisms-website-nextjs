"use client";

import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { FadeIn } from "./ui/fade-in";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <FadeIn direction="left">
            <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Still have questions?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
              We&apos;d love to hear from you. Tell us about your project. Our
              team replies within 24 hours on business days, usually faster.
            </p>

            <ul className="space-y-5" role="list">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[color:var(--brand-text)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Call us</p>
                  <a
                    href="tel:+255762000000"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-[color:var(--brand-text-hover)] transition-colors duration-200 cursor-pointer"
                  >
                    +255 762 000 000
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-600 mt-0.5">Mon to Fri, 08:00 to 18:00 EAT</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[color:var(--brand-text)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Email us</p>
                  <a
                    href="mailto:hello@rafiki.sms"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-[color:var(--brand-text-hover)] transition-colors duration-200 cursor-pointer"
                  >
                    hello@rafiki.sms
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-600 mt-0.5">We reply within 24 hours</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[color:var(--brand-fill)]/10 border border-[#14b8a6]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[color:var(--brand-text)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Office</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Mikocheni, Dar es Salaam</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Tanzania</p>
                </div>
              </li>
            </ul>
          </FadeIn>

          {/* Right: form */}
          <FadeIn direction="right">
            <form
              className="rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111] p-8 space-y-5"
              aria-label="Contact form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
                  >
                    First name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="Amina"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:border-[color:var(--brand-text)] transition-colors duration-200"
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
                  >
                    Last name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    placeholder="Hassan"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:border-[color:var(--brand-text)] transition-colors duration-200"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.co.tz"
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:border-[color:var(--brand-text)] transition-colors duration-200"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
                >
                  Phone{" "}
                  <span className="text-slate-500 dark:text-slate-600">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+255 762 000 000"
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:border-[color:var(--brand-text)] transition-colors duration-200"
                  autoComplete="tel"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project and SMS needs..."
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:border-[color:var(--brand-text)] transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[color:var(--brand-fill)] hover:bg-[color:var(--brand-fill-hover)] text-white text-sm font-semibold transition-colors duration-200 cursor-pointer"
              >
                Send message
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
