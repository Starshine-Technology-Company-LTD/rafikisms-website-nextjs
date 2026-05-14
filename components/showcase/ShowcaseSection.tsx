"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/* --- Feature data -------------------------------------------- */
const FEATURES = [
  {
    id: "support",
    tag: "Local support",
    title: "Human support,\nlocal to Tanzania",
    description:
      "Onboarding, training, and day-to-day assistance from a team that speaks your language - in English and Swahili.",
    points: [
      "English + Swahili support coverage",
      "Dedicated onboarding engineer",
      "98% customer satisfaction",
    ],
    visual: "support",
    wide: true,
  },
  {
    id: "delivery",
    tag: "Reliability",
    title: "Reliable delivery\nat scale",
    description:
      "Direct carrier integrations with Vodacom, Airtel, and Tigo ensure your messages arrive - every time.",
    points: [
      "99.7% delivery rate",
      "Real-time delivery receipts",
      "Automatic failover routing",
    ],
    visual: "delivery",
    wide: false,
  },
  {
    id: "pricing",
    tag: "Pricing",
    title: "Simple, transparent\npricing",
    description:
      "Eight tiers in TSH. No hidden fees, no surprises. Pay only for what you send.",
    points: [
      "TSH-denominated billing",
      "No monthly minimums",
      "Volume discounts from Tier 3",
    ],
    visual: "pricing",
    wide: false,
  },
  {
    id: "analytics",
    tag: "Analytics",
    title: "Built-in analytics\ndashboard",
    description:
      "Track delivery rates, campaign performance, and cost-per-message in real time.",
    points: [
      "Live delivery tracking",
      "Campaign-level reporting",
      "Export to CSV / PDF",
    ],
    visual: "analytics",
    wide: true,
  },
] as const;

/* --- Decorative visuals (CSS-only, theme-aware) --------------- */
function SupportVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/8 to-transparent" />
      <div className="relative flex flex-col gap-3">
        {[
          { label: "Hello! Habari yako?", align: "left", delay: 0 },
          { label: "Nimefurahi kukusaidia.", align: "right", delay: 0.1 },
          { label: "Message delivered OK", align: "left", delay: 0.2 },
        ].map((bubble) => (
          <motion.div
            key={bubble.label}
            initial={{ opacity: 0, x: bubble.align === "left" ? -12 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: bubble.delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${bubble.align === "right" ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`max-w-[160px] rounded-2xl px-3.5 py-2 text-[11px] font-medium leading-snug shadow-sm ${
                bubble.align === "left"
                  ? "rounded-tl-sm bg-muted text-foreground/80"
                  : "rounded-tr-sm bg-brand text-white"
              }`}
            >
              {bubble.label}
            </span>
          </motion.div>
        ))}
        <div className="mt-1 flex items-center gap-1.5 pl-1">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand/60 [animation-delay:0ms]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand/60 [animation-delay:150ms]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand/60 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function DeliveryVisual() {
  const carriers = ["Vodacom", "Airtel", "Tigo", "Halotel", "TTCL"];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-brand/6 to-transparent" />
      <div className="relative flex w-full flex-col gap-2">
        {carriers.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="flex items-center gap-2.5"
          >
            <span className="w-14 shrink-0 text-[10px] font-medium text-muted-foreground">
              {name}
            </span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${85 + i * 2}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 + 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-0 left-0 rounded-full bg-brand"
              />
            </div>
            <span className="w-10 shrink-0 text-right text-[10px] font-semibold text-brand">
              {97 - i * 0.4}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PricingVisual() {
  const tiers = [
    { name: "Starter", price: "30", vol: "<=10K" },
    { name: "Growth", price: "25", vol: "<=25K" },
    { name: "Business", price: "23", vol: "<=50K" },
    { name: "Pro", price: "20", vol: "<=100K" },
  ];
  return (
    <div className="relative flex h-full w-full flex-col items-stretch justify-center gap-2 px-3 py-2">
      <div className="absolute inset-0 bg-gradient-to-tr from-brand/6 to-transparent" />
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 + 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-between rounded-xl border border-foreground/8 bg-background/70 px-3 py-2 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-foreground">{tier.name}</span>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
              {tier.vol}
            </span>
          </div>
          <span className="font-mono text-[12px] font-bold text-brand">{tier.price} TSH/SMS</span>
        </motion.div>
      ))}
      <p className="text-center text-[9px] text-muted-foreground">+ 4 more tiers for higher volumes</p>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [62, 78, 55, 91, 84, 96, 88];
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-6 py-4">
      <div className="absolute inset-0 bg-gradient-to-tl from-brand/6 to-transparent" />
      <div className="relative w-full">
        {/* Mini stat row */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { val: "99.7%", lbl: "Delivered" },
            { val: "<4s", lbl: "Avg delay" },
            { val: "1.2M", lbl: "This month" },
          ].map((s) => (
            <div key={s.lbl} className="rounded-lg border border-foreground/8 bg-background/60 p-2 text-center backdrop-blur-sm">
              <div className="text-[13px] font-bold text-brand">{s.val}</div>
              <div className="text-[9px] text-muted-foreground">{s.lbl}</div>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div className="flex h-16 items-end justify-between gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: `${h}%`, originY: 1 }}
                className={`w-full rounded-t-sm ${i === 5 ? "bg-brand" : "bg-brand/30"}`}
              />
              <span className="text-[8px] text-muted-foreground">{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, React.FC> = {
  support: SupportVisual,
  delivery: DeliveryVisual,
  pricing: PricingVisual,
  analytics: AnalyticsVisual,
};

/* --- Card ----------------------------------------------------- */
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const Visual = visuals[feature.visual];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.16)] dark:hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)] ${
        feature.wide ? "sm:flex-row" : "sm:flex-col"
      }`}
    >
      {/* Content zone */}
      <div className={`flex flex-col justify-between p-7 ${feature.wide ? "sm:w-[52%]" : "flex-1"}`}>
        <div>
          <span className="mb-4 inline-flex items-center rounded-full border border-brand/20 bg-brand/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
            {feature.tag}
          </span>
          <h3 className="mb-3 whitespace-pre-line text-xl font-semibold leading-[1.2] tracking-tight text-foreground md:text-[22px]">
            {feature.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </div>
        <ul className="mt-5 space-y-2">
          {feature.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2 text-[12.5px] text-foreground/80">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/15">
                <Check className="h-2.5 w-2.5 text-brand" strokeWidth={3} />
              </span>
              {pt}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual zone */}
      <div
        className={`relative overflow-hidden bg-muted/30 dark:bg-muted/20 ${
          feature.wide
            ? "h-52 sm:h-auto sm:flex-1"
            : "h-48"
        }`}
      >
        <Visual />
        {/* Subtle border glow on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-brand/20 transition-opacity duration-300 group-hover:opacity-100 rounded-inherit" />
      </div>
    </motion.div>
  );
}

/* --- Section --------------------------------------------------- */
export default function ShowcaseSection() {
  return (
    <section id="showcase" className="relative scroll-mt-24 bg-background py-8 lg:scroll-mt-28 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand"
          >
            Showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.07 }}
            className="font-display mx-auto max-w-2xl text-3xl font-light leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
          >
            Everything you need to
            <br />
            <span className="text-brand">run SMS at scale.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-[15px]"
          >
            Purpose-built for Tanzania, proven in production.
          </motion.p>
        </div>

        {/* Bento grid - wide / narrow alternating pattern */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {/* Row 1 */}
          <div className="lg:col-span-7">
            <FeatureCard feature={FEATURES[0]} index={0} />
          </div>
          <div className="lg:col-span-5">
            <FeatureCard feature={FEATURES[1]} index={1} />
          </div>
          {/* Row 2 - reversed width */}
          <div className="lg:col-span-5">
            <FeatureCard feature={FEATURES[2]} index={2} />
          </div>
          <div className="lg:col-span-7">
            <FeatureCard feature={FEATURES[3]} index={3} />
          </div>
        </div>

      </div>
    </section>
  );
}
