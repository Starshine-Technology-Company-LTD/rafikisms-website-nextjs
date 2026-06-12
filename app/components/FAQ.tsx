"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "./ui/fade-in";
import { GlobePulse } from "./ui/cobe-globe-pulse";

const faqs = [
  { q: "How do I get started with Rafiki SMS?",                              a: "Sign up for a vendor account at vendor.rafikisms.com, complete KYC verification (business certificate and director ID), and you will receive your API key and approved sender IDs within one business day. No credit card required." },
  { q: "Do I need a registered business to send SMS?",                      a: "Yes. Tanzanian regulations require business registration for commercial SMS. You will need your business registration certificate and a director national ID or passport during KYC." },
  { q: "Is there a free trial or sandbox?",                                  a: "Yes. All accounts get instant sandbox access upon registration so you can test your integration before going live. Student accounts also get sandbox API access with learning resources." },
  { q: "What makes Rafiki SMS different?",                                   a: "We are purpose-built for Tanzania with direct carrier integrations (Vodacom, Airtel, Tigo, Halotel, TTCL), bilingual English and Swahili support, TSH-denominated billing, and a vendor-first architecture designed for resellers and platform builders." },
  { q: "How is the platform architected for scale and reliability?",         a: "We use a queue-based architecture with resilient workers, automatic failover routing, and 24/7 NOC monitoring. Processing regions span Dar es Salaam (primary), Nairobi, Johannesburg, Dubai, London, and Mumbai." },
  { q: "Are messages and delivery statuses guaranteed under load?",          a: "We target 99.99% uptime and 99.7% delivery rates. Queue workers process jobs with automatic retries, and delivery receipts are persisted for real-time dashboard visibility and exports." },
  { q: "Can we integrate status updates into our own systems?",             a: "Yes. Webhook callbacks let you receive real-time delivery status updates directly to your endpoint. Our Business tier and above include webhook callback support." },
  { q: "Which payment methods do you support?",                              a: "We support TSH-denominated billing with multiple payment gateways. Contact our team for enterprise invoicing, quarterly billing, and custom payment arrangements." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="faq-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">FAQ</p>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Common questions
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">
            Everything you need to know to get started.{" "}
            <a href="#contact" className="text-[color:var(--brand-text)] hover:underline cursor-pointer">
              Our team is one message away.
            </a>
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn direction="left">
            <dl className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    open === i
                      ? "border-[#14b8a6]/30 bg-white dark:bg-[#111]/80"
                      : "border-black/8 dark:border-white/8 bg-white dark:bg-[#0a0a0a] hover:border-black/15 dark:hover:border-white/15"
                  }`}
                >
                  <dt>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-800 dark:text-white cursor-pointer"
                      aria-expanded={open === i}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 ml-3 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </dt>
                  {open === i && (
                    <dd className="px-5 pb-5">
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn direction="right" className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <GlobePulse speed={0.005} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
