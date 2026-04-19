"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check, ArrowRight, Users, Sparkles } from "lucide-react";
import { landingContent } from "./content";
import { useShowcaseStackedList } from "./use-media-query";

type Card = (typeof landingContent.showcase.cards)[number];

/** Keep scroll-linked spline inputs inside [0, 1]. */
function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/** Shorter scroll than 64vh/card; tail helps `end end` reach p≈1 on short viewports. */
const SHOWCASE_SCROLL_VH_PER_CARD = 44;
const SHOWCASE_SCROLL_TAIL_VH = 8;

const transformClamp = { clamp: true } as const;

export function ShowcaseSection() {
  const stackedList = useShowcaseStackedList();

  // Narrow phones / reduced motion: stacked list (no useScroll — avoids Framer warning when ref is unused).
  if (stackedList) {
    return <ShowcaseStackedLayout />;
  }

  return <ShowcaseStickyScrollDeck />;
}

function ShowcaseStackedLayout() {
  const cards = landingContent.showcase.cards;
  return (
    <section
      id="showcase"
      className="showcase-stack relative z-0 pt-8 lg:pt-10 pb-0"
    >
      <div className="relative z-[0] w-full max-w-6xl mx-auto px-6 lg:px-12 pb-6 text-center">
        <span className="inline-block text-xs font-mono uppercase tracking-[0.18em] text-brand mb-3">
          {landingContent.showcase.eyebrow}
        </span>
        <h2 className="text-3xl lg:text-5xl font-display tracking-tight">
          {landingContent.showcase.title}
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {landingContent.showcase.subtitle}
        </p>
      </div>
      <div className="relative space-y-8">
        {cards.map((card, i) => (
          <div key={card.id} className="px-6 lg:px-12">
            <ShowcaseCardShell card={card} index={i} total={cards.length} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ShowcaseStickyScrollDeck() {
  const cards = landingContent.showcase.cards;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="showcase" className="showcase-stack relative z-0 pt-8 lg:pt-10 pb-0">
      <div className="relative z-[0] w-full max-w-6xl mx-auto px-6 lg:px-12 pb-1 text-center">
        <span className="inline-block text-xs font-mono uppercase tracking-[0.18em] text-brand mb-3">
          {landingContent.showcase.eyebrow}
        </span>
        <h2 className="text-3xl lg:text-5xl font-display tracking-tight">
          {landingContent.showcase.title}
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {landingContent.showcase.subtitle}
        </p>
      </div>

      {/* Outer scroll container — drives scroll-linked scale/rotate for every card */}
      <div
        ref={containerRef}
        className="relative isolate"
        style={{
          height: `calc(${cards.length * SHOWCASE_SCROLL_VH_PER_CARD}vh + ${SHOWCASE_SCROLL_TAIL_VH}vh)`,
        }}
      >
        {cards.map((card, i) => (
          <ShowcaseStickyCard
            key={card.id}
            card={card}
            index={i}
            total={cards.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function ShowcaseStickyCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: Card;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const isLast = index === total - 1;
  const segment = 1 / total;
  const center = (index + 0.5) / total;

  // Refined 5-point spline: wider opacity-1 plateau per segment + smoother handoffs for premium feel
  const plateauPad = segment * 0.22;
  const fadeLead = segment * 0.2;
  const isFirst = index === 0;

  const opacityInput = [
    isFirst ? 0 : clamp01(start - fadeLead),
    clamp01(start + plateauPad),
    center,
    clamp01(end - plateauPad),
    isLast ? 1 : clamp01(end + fadeLead),
  ];
  const opacityOutput = [isFirst ? 1 : 0, 1, 1, 1, isLast ? 1 : 0];

  const opacity = useTransform(
    scrollYProgress,
    opacityInput,
    opacityOutput,
    transformClamp
  );

  // Outgoing push-back: scale 1 -> 0.94 and rotate 0 -> -2.5deg as next card enters.
  // Slightly subtler than before for a more premium feel.
  // Last card stays at rest so the section unpins cleanly at the bottom.
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    isLast ? [1, 1] : [1, 0.94],
    transformClamp
  );
  const rotate = useTransform(
    scrollYProgress,
    [start, end],
    isLast ? [0, 0] : [0, -2.5],
    transformClamp
  );
  
  // Shadow depth varies based on position for enhanced depth perception
  const shadowOpacity = useTransform(
    scrollYProgress,
    [start, center, end],
    [0.15, 0.35, 0.2],
    transformClamp
  );

  const aboutAnchor = card.id === "about-rafiki";

  return (
    <motion.article
      id={aboutAnchor ? "about" : undefined}
      className={`sticky top-0 min-h-0 h-[min(100dvh,100vh)] flex items-start justify-center px-6 lg:px-12 pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-8 pointer-events-none ${
        aboutAnchor ? "scroll-mt-28 md:scroll-mt-32" : ""
      }`}
      style={{
        scale,
        rotate,
        opacity,
        zIndex: index + 1,
      }}
    >
      <ShowcaseCardShell card={card} index={index} total={total} />
    </motion.article>
  );
}

function ShowcaseCardShell({
  card,
  index,
  total,
}: {
  card: Card;
  index: number;
  total: number;
}) {
  const theme = card.theme;

  const isLastCard = index === total - 1;
  const isLastGraphite = theme === "graphite" && isLastCard;

  const shellClass =
    theme === "graphite"
      ? isLastCard
        ? "bg-background/88 backdrop-blur-xl backdrop-saturate-150 text-foreground border-brand/25 shadow-[0_28px_70px_-42px_rgba(15,118,110,0.32)] dark:border-white/12 dark:bg-background/82"
        : "bg-muted/55 text-foreground border-border/70"
      : theme === "light-teal"
        ? "bg-gradient-to-br from-[rgba(20,184,166,0.10)] via-background to-background border-brand/20"
        : "bg-background border-foreground/10";

  const numberPillClass =
    theme === "graphite"
      ? "bg-foreground/10 text-brand"
      : "bg-brand/10 text-brand";

  const leadClass =
    theme === "graphite"
      ? "text-muted-foreground"
      : "text-foreground/70";

  // No whileInView on this shell: inside sticky stacked articles, in-view + `once`
  // often never fires for later steps (03/04), leaving opacity stuck at 0. Scroll opacity
  // on the parent `motion.article` is the only gate we need.
  return (
    <div
      className={`relative w-full max-w-6xl mx-auto rounded-[32px] border ${shellClass} ${
        isLastGraphite
          ? ""
          : "shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]"
      } overflow-hidden pointer-events-auto transition-shadow duration-500 hover:shadow-[0_35px_90px_-35px_rgba(0,0,0,0.4)]`}
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 p-6 lg:p-11 items-center">
        {/* Copy column — opaque backing on last graphite step so About never bleeds through copy */}
        <div
          className={`flex flex-col gap-6 ${
            isLastGraphite
              ? "rounded-2xl bg-background/95 px-5 py-6 lg:px-7 lg:py-7 dark:bg-background/92"
              : ""
          }`}
        >
          <span
            className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-xs font-mono ${numberPillClass}`}
          >
            {card.number}{" "}
            <span className="opacity-50">
              / {card.total ?? String(total).padStart(2, "0")}
            </span>
          </span>
          {"cardEyebrow" in card && card.cardEyebrow ? (
            <span className="inline-flex items-center gap-3 self-start font-mono text-xs tracking-widest text-muted-foreground uppercase">
              <span className="w-8 h-px bg-foreground/30" aria-hidden />
              {card.cardEyebrow}
            </span>
          ) : null}
          <h3 className="text-3xl lg:text-4xl font-display tracking-tight leading-tight">
            {card.title}
            {"titleAccent" in card && card.titleAccent ? (
              <>
                <br />
                <span className="text-brand">{card.titleAccent}</span>
              </>
            ) : null}
          </h3>
          <p className={`text-base lg:text-lg leading-relaxed max-w-md ${leadClass}`}>
            {card.lead}
          </p>
          <ul className="flex flex-col gap-2">
            {card.bullets.map((b, i) => (
              <li
                key={b}
                className="flex items-start gap-2 text-sm"
                style={{ ["--i" as string]: i }}
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    theme === "graphite"
                      ? "bg-brand/20 text-brand"
                      : "bg-brand/15 text-brand"
                  }`}
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span className={leadClass}>{b}</span>
              </li>
            ))}
          </ul>
          {card.id !== "about-rafiki" ? (
            <a
              href="#pricing"
              className={`inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all`}
            >
              See it in action
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : null}
        </div>

        {/* Visual column */}
        <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[1/1] w-full">
          <ShowcaseVisual kind={card.visual} index={index} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Visuals                                                                   */
/* -------------------------------------------------------------------------- */

/* 1. Local Expertise — chat widget + orbiting chips */
function VisualLocalExpertise() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        aria-hidden
        className="absolute inset-6 rounded-3xl"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 50%, rgba(20,184,166,0.18), transparent 70%)",
        }}
      />
      <div className="relative z-10 w-[92%] h-[92%] flex items-center justify-center">
        <Image
          src="/images/rafiki-support-family.png"
          alt="Rafiki SMS human support team"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 80vw, 460px"
        />
      </div>

      {/* orbit chips - varied timing for organic feel */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-foreground/10 shadow-sm soft-float hover:border-brand/30 transition-colors duration-300"
      >
        <span className="w-5 h-5 rounded-full bg-brand/15 text-brand flex items-center justify-center text-[10px]">
          ✉
        </span>
        <span className="text-xs font-medium">English</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-10 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-foreground/10 shadow-sm soft-float hover:border-brand/30 transition-colors duration-300"
        style={{ animationDelay: "1.5s" }}
      >
        <span className="text-[10px]">🇹🇿</span>
        <span className="text-xs font-medium">Swahili</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-14 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-foreground/10 shadow-sm soft-float hover:border-brand/30 transition-colors duration-300"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="text-[10px]">🇫🇷</span>
        <span className="text-xs font-medium">French</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.65, type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-background border border-foreground/10 shadow-sm soft-float hover:border-brand/30 transition-colors duration-300"
        style={{ animationDelay: "2.2s" }}
      >
        <span className="text-[10px]">����🇿</span>
        <span className="text-xs font-medium">Swahili</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute top-14 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-foreground/10 shadow-sm soft-float"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="text-[10px]">🇫🇷</span>
        <span className="text-xs font-medium">French</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.65 }}
        className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-background border border-foreground/10 shadow-sm soft-float"
        style={{ animationDelay: "2.2s" }}
      >
        <span className="text-lg font-display text-brand leading-none">98%</span>
        <span className="text-[11px] leading-tight text-foreground/70">
          Satisfaction
          <br />
          Rate
        </span>
      </motion.div>
    </div>
  );
}

/* 2. Local Partners — Tanzanian mobile network orbital (image) */
function VisualLocalPartners() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        aria-hidden
        className="absolute inset-8 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 50%, rgba(20,184,166,0.22), transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[92%] h-[92%] flex items-center justify-center soft-float"
      >
        <Image
          src="/images/rafiki-networks-orbital.png"
          alt="Rafiki SMS connected to Tanzanian mobile networks (Airtel, Vodacom, Yas, Halotel, TTCL)"
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 80vw, 460px"
        />
      </motion.div>
    </div>
  );
}

/* 3. About Rafiki — phone hero (matches standalone About visual) */
function VisualAboutRafiki() {
  const about = landingContent.about;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[280px] lg:h-[280px] rounded-full bg-brand/20 blur-3xl radial-pulse" />
      </div>
      <div className="absolute inset-4 rounded-3xl border border-dashed border-foreground/10 pointer-events-none" />

      <div className="relative z-10 float-hang drop-shadow-[0_20px_40px_rgba(13,148,136,0.25)]">
        <Image
          src="/images/rafiki-phone-product.png"
          alt={about.imageAlt}
          width={480}
          height={640}
          className="w-[200px] sm:w-[240px] lg:w-[300px] h-auto object-contain select-none mx-auto"
        />
      </div>

      <div
        className="absolute top-8 right-4 lg:right-8 inline-flex items-center gap-2 px-3 py-1.5 border border-brand/40 rounded-full bg-background shadow-sm soft-float"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-deep">live</span>
      </div>
    </div>
  );
}

/* 4. Campaign Intelligence — dashboard mock */
function VisualCampaignIntelligence() {
  const rows = [
    { name: "Flash Sale Alert - TZ", status: "Delivered" },
    { name: "Welcome Sequence #1", status: "Delivered" },
    { name: "OTP Batch — Apr 16", status: "Delivered" },
  ];

  return (
    <div className="relative w-full h-full">
      {/* browser frame */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0F1519] border border-white/10 shadow-2xl">
        {/* titlebar */}
        <div className="h-7 border-b border-white/5 flex items-center px-3 gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-3 text-[10px] text-white/40 font-mono">accounts.rafiki.africa</span>
        </div>

        <div className="grid grid-cols-[80px_1fr] h-[calc(100%-28px)]">
          {/* sidebar */}
          <aside className="border-r border-white/5 p-3 flex flex-col gap-3 text-[10px] text-white/50">
            <div className="font-semibold text-white text-xs">Rafiki</div>
            <div className="mt-2 space-y-1.5">
              <div>Overview</div>
              <div className="text-brand inline-flex items-center gap-1">
                Campaigns <span className="text-[9px] bg-brand/20 rounded px-1">12</span>
              </div>
              <div>Customers</div>
              <div>Analytics</div>
            </div>
          </aside>

          {/* main */}
          <main className="p-3 flex flex-col gap-2">
            {/* alert bar */}
            <div className="text-[9px] px-2 py-1.5 rounded border border-brand/30 bg-brand/10 text-brand">
              Campaign Budget Alert — Q4 used 87% of allocation.
            </div>

            <div className="flex items-start justify-between">
              <div>
                <div className="text-white font-semibold text-sm">Q4 Marketing Blast</div>
                <div className="text-[9px] text-brand">Active · updated 2m ago</div>
              </div>
              <button className="text-[9px] px-2 py-1 rounded bg-brand text-white font-medium">
                New Campaign
              </button>
            </div>

            {/* metric tiles */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { k: "Sent", v: "124,059", d: "+12%" },
                { k: "Delivered", v: "99.8%", d: "+0.4%" },
                { k: "Open", v: "42.3%", d: "+5.1%" },
              ].map((m) => (
                <div key={m.k} className="rounded-lg border border-white/5 bg-white/[0.03] p-2">
                  <div className="text-[9px] text-white/50">{m.k}</div>
                  <div className="text-white text-xs font-semibold">{m.v}</div>
                  <div className="text-[8px] text-brand">↗ {m.d}</div>
                </div>
              ))}
            </div>

            {/* rows */}
            <div className="rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="grid grid-cols-[1fr_70px] text-[9px] px-2 py-1.5 text-white/40 border-b border-white/5">
                <span>Message Subject</span>
                <span>Status</span>
              </div>
              {rows.map((r, i) => (
                <div
                  key={r.name}
                  className={`grid grid-cols-[1fr_70px] text-[10px] px-2 py-1.5 items-center ${
                    i !== rows.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <span className="text-white/80 truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    {r.name}
                  </span>
                  <span className="text-[9px] text-brand bg-brand/10 rounded px-1.5 py-0.5 w-fit">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* floating Audience Insights card */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, type: "spring", stiffness: 260, damping: 22 }}
        className="absolute -left-4 bottom-6 w-40 rounded-xl bg-background text-foreground shadow-2xl border border-foreground/10 p-3"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-medium">
          <Users className="w-3 h-3 text-brand" />
          Audience Insights
        </div>
        <div className="mt-1.5 text-lg font-display">47,293</div>
        <div className="text-[9px] text-foreground/60">across all campaigns</div>
        <div className="mt-2 text-[9px] space-y-1">
          <div className="flex justify-between">
            <span>Delivered</span>
            <span className="text-brand">99.1%</span>
          </div>
          <div className="flex justify-between">
            <span>SMS Sent</span>
            <span>47,000</span>
          </div>
        </div>
      </motion.div>

      {/* floating Campaign Revenue card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 22 }}
        className="absolute -right-4 top-14 w-44 rounded-xl bg-background text-foreground shadow-2xl border border-foreground/10 p-3"
      >
        <div className="text-[10px] font-medium text-foreground/60">Campaign Revenue</div>
        <div className="mt-1 text-[10px]">Total Generated</div>
        <div className="text-lg font-display text-brand">Tzs 12.8M</div>
        <div className="text-[9px] text-brand">↗ +18.5% vs last</div>
        <div className="mt-2">
          <div className="flex justify-between text-[9px]">
            <span>Budget Used</span>
            <span className="text-brand">87%</span>
          </div>
          <div className="mt-1 h-1 rounded-full bg-foreground/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand to-brand-strong"
              initial={{ width: "0%" }}
              whileInView={{ width: "87%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* toast */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 22 }}
        className="absolute top-2 right-3 inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-background text-foreground shadow-xl border border-foreground/10"
      >
        <span className="w-5 h-5 rounded-full bg-brand/15 text-brand flex items-center justify-center">
          <Sparkles className="w-3 h-3" />
        </span>
        <span className="text-[10px] font-medium">Campaign optimised</span>
      </motion.div>
    </div>
  );
}

function ShowcaseVisual({ kind }: { kind: string; index: number }) {
  if (kind === "local-expertise") return <VisualLocalExpertise />;
  if (kind === "local-partners") return <VisualLocalPartners />;
  if (kind === "about-rafiki") return <VisualAboutRafiki />;
  if (kind === "campaign-intelligence") return <VisualCampaignIntelligence />;
  return null;
}
