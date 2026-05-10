"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  Users,
  Zap,
  Heart,
  Globe,
  TrendingUp,
  Code2,
  Headphones,
  BarChart3,
  ShieldCheck,
  Megaphone,
  ExternalLink,
  X,
  CheckCircle2,
  Paperclip,
  ChevronRight,
  Building2,
  Wifi,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

/* ─── Types ─────────────────────────────────────────────────── */
type Tab = "overview" | "apply";

/* ─── Job listings ──────────────────────────────────────────── */
const JOBS = [
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    icon: Code2,
    type: "Full-time",
    location: "Dar es Salaam, TZ",
    remote: "Hybrid",
    summary:
      "Build and scale the Laravel API layer that powers millions of SMS messages per month.",
    about:
      "As a Backend Engineer at Rafiki SMS you'll own the core API, queue workers, SMPP integrations, and delivery-reporting pipelines that thousands of businesses depend on every day. You'll collaborate closely with the product team and work directly with enterprise clients to understand their integration needs.",
    responsibilities: [
      "Design and maintain the Laravel REST API handling vendor SMS dispatch",
      "Build and tune queue workers for high-volume message throughput",
      "Integrate with Tanzanian carrier SMPP endpoints and handle DLR callbacks",
      "Write automated tests and lead code reviews",
      "Own observability — logs, metrics, and alerts",
    ],
    requirements: [
      "3+ years with Laravel or a comparable PHP framework",
      "Solid understanding of async queues (Redis, Horizon, etc.)",
      "Experience with MySQL performance tuning",
      "Ability to read and debug SMPP protocol traces",
      "Fluent in English; Swahili is a bonus",
    ],
    skills: ["Laravel / PHP", "MySQL", "Redis", "Queue systems"],
    featured: true,
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    icon: Code2,
    type: "Full-time",
    location: "Dar es Salaam, TZ",
    remote: "Hybrid",
    summary:
      "Own the vendor dashboard, public website, and API docs UI used by hundreds of businesses.",
    about:
      "As a Frontend Engineer you'll be the primary owner of every pixel that faces our vendors and developers. From the Rafiki SMS dashboard to this very website, you'll shape the experience our customers use daily to manage campaigns, monitor delivery, and consume our API.",
    responsibilities: [
      "Build and iterate on the Next.js vendor dashboard",
      "Own the public marketing site and API documentation UI",
      "Collaborate with designers to implement high-fidelity, accessible interfaces",
      "Write component libraries and maintain the design system",
      "Monitor Core Web Vitals and drive performance improvements",
    ],
    requirements: [
      "3+ years building production React/Next.js applications",
      "Deep familiarity with TypeScript and Tailwind CSS",
      "Understanding of accessibility (WCAG 2.1 AA)",
      "Experience with animation libraries (Framer Motion preferred)",
      "Keen eye for visual design and UX quality",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "devops-engineer",
    title: "DevOps / Infrastructure Engineer",
    department: "Engineering",
    icon: ShieldCheck,
    type: "Full-time",
    location: "Dar es Salaam, TZ",
    remote: "Remote-friendly",
    summary:
      "Own CI/CD pipelines, server provisioning, and observability for our SMPP and Laravel stack.",
    about:
      "Rafiki SMS runs on a resilient, queued architecture. As our DevOps engineer you'll keep that infrastructure running reliably across Tanzanian carrier connections, manage our deployment pipelines, and ensure we hit our 99.9% uptime targets.",
    responsibilities: [
      "Manage and provision Linux servers running Laravel workers and SMPP daemons",
      "Build and maintain CI/CD pipelines for zero-downtime deployments",
      "Own monitoring, alerting, and incident response runbooks",
      "Implement and manage Docker containerisation",
      "Work with the engineering team to capacity-plan for traffic spikes",
    ],
    requirements: [
      "3+ years in a DevOps or SRE role",
      "Strong Linux administration and Bash scripting",
      "Experience with Docker and at least one CI/CD platform",
      "Familiarity with Nginx, queues, and background workers",
      "On-call comfort — this role has pager duty",
    ],
    skills: ["Linux", "Docker", "Nginx", "CI/CD"],
    featured: false,
  },
  {
    id: "product-manager",
    title: "Product Manager",
    department: "Product",
    icon: BarChart3,
    type: "Full-time",
    location: "Dar es Salaam, TZ",
    remote: "On-site",
    summary:
      "Drive the Rafiki SMS product roadmap from API features to vendor onboarding flows.",
    about:
      "As Product Manager you'll sit at the intersection of engineering, sales, and our enterprise customers. You'll own the roadmap, run discovery, write clear specs, and make sure we're always solving the right problems for Tanzanian businesses.",
    responsibilities: [
      "Define and prioritise the product roadmap in collaboration with engineering",
      "Run customer interviews and usability studies with vendors",
      "Write detailed product specs and acceptance criteria",
      "Partner with sales to translate customer feedback into features",
      "Track key metrics and report progress to leadership",
    ],
    requirements: [
      "3+ years in product management, ideally on API or developer-facing products",
      "Strong written and verbal communication in English",
      "Data-driven: comfortable with SQL, dashboards, and A/B tests",
      "Experience in a fast-moving startup environment",
      "Bonus: prior experience in fintech, telecom, or East African markets",
    ],
    skills: ["Product strategy", "User research", "API products", "Agile"],
    featured: false,
  },
  {
    id: "customer-success",
    title: "Customer Success Manager",
    department: "Customer Success",
    icon: Headphones,
    type: "Full-time",
    location: "Dar es Salaam, TZ",
    remote: "On-site",
    summary:
      "Be the first point of contact for vendor onboarding, integration support, and account health.",
    about:
      "Our Customer Success team is the reason our vendors trust us. You'll guide new businesses through onboarding, help them get the most from the platform, and act as their advocate internally when they need something fixed or built.",
    responsibilities: [
      "Own the onboarding journey for new vendor accounts",
      "Resolve integration and technical support queries in English and Swahili",
      "Monitor account health metrics and proactively engage at-risk accounts",
      "Collect and route product feedback to the engineering team",
      "Maintain support documentation and knowledge-base articles",
    ],
    requirements: [
      "2+ years in customer success, account management, or technical support",
      "Fluent in both English and Swahili — this is essential",
      "Comfortable reading API documentation and basic code samples",
      "Empathetic, patient, and highly organised",
      "Experience with CRM tools",
    ],
    skills: ["Client onboarding", "Technical support", "English + Swahili", "CRM"],
    featured: false,
  },
  {
    id: "sales-bd",
    title: "Sales & Business Development",
    department: "Commercial",
    icon: Megaphone,
    type: "Full-time",
    location: "Dar es Salaam, TZ",
    remote: "Hybrid",
    summary:
      "Grow Rafiki SMS's vendor base across Tanzania and East Africa.",
    about:
      "As our Sales & Business Development lead you'll build a pipeline of enterprise customers in fintech, logistics, healthcare, and public sector. You'll own deals from first contact to signed contract and work with the CS team to ensure successful onboarding.",
    responsibilities: [
      "Identify and qualify enterprise SMS opportunities across Tanzania and East Africa",
      "Lead discovery calls, product demos, and proposal negotiations",
      "Manage a CRM pipeline from lead to close",
      "Work with CS and engineering on technical onboarding for new accounts",
      "Represent Rafiki SMS at industry events",
    ],
    requirements: [
      "3+ years in B2B SaaS sales, ideally with technical products",
      "Proven ability to close 6-figure enterprise contracts",
      "Strong network in the Tanzanian business community",
      "Excellent presentation and negotiation skills in English and Swahili",
      "Self-starter who can operate independently",
    ],
    skills: ["B2B sales", "Enterprise SaaS", "East Africa market", "CRM"],
    featured: false,
  },
] as const;

type Job = (typeof JOBS)[number];

/* ─── Benefits ──────────────────────────────────────────────── */
const BENEFITS = [
  { icon: TrendingUp, title: "Grow fast", desc: "Your impact is immediate and measurable — no giant org to navigate." },
  { icon: Globe, title: "Local + global scope", desc: "Build infrastructure for Tanzania today and East Africa tomorrow." },
  { icon: Heart, title: "Inclusive culture", desc: "English and Swahili spoken equally. Every background valued." },
  { icon: Zap, title: "Modern tooling", desc: "Laravel, Next.js, TypeScript, Redis. No legacy maintenance marathons." },
  { icon: Users, title: "Small, focused team", desc: "Engineers talk directly to customers. You shape the product." },
  { icon: Briefcase, title: "Competitive pay", desc: "Market-rate TSH salaries, performance reviews, and career support." },
] as const;

/* ─── Colour maps ────────────────────────────────────────────── */
const deptColors: Record<string, string> = {
  Engineering:        "bg-brand/10 text-brand border-brand/20",
  Product:            "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  "Customer Success": "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  Commercial:         "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const remoteColors: Record<string, string> = {
  "Hybrid":           "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Remote-friendly":  "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "On-site":          "bg-foreground/8 text-muted-foreground",
};

/* ─── Application form schema ────────────────────────────────── */
const schema = z.object({
  firstName:  z.string().min(1, "Required"),
  lastName:   z.string().min(1, "Required"),
  email:      z.string().email("Valid email required"),
  phone:      z.string().optional(),
  linkedin:   z.string().optional(),
  coverLetter:z.string().min(30, "Please write at least a sentence or two"),
});
type FormData = z.infer<typeof schema>;

/* ─── Application form ───────────────────────────────────────── */
function ApplicationForm({ job, onSuccess }: { job: Job; onSuccess: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="firstName" className="text-[12px] font-medium">First name <span className="text-brand">*</span></Label>
          <Input id="firstName" placeholder="Amina" {...register("firstName")} className="h-9 text-sm" />
          {errors.firstName && <p className="text-[11px] text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName" className="text-[12px] font-medium">Last name <span className="text-brand">*</span></Label>
          <Input id="lastName" placeholder="Suleiman" {...register("lastName")} className="h-9 text-sm" />
          {errors.lastName && <p className="text-[11px] text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-[12px] font-medium">Work email <span className="text-brand">*</span></Label>
        <Input id="email" type="email" placeholder="amina@company.co.tz" {...register("email")} className="h-9 text-sm" />
        {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-[12px] font-medium">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input id="phone" type="tel" placeholder="+255 7XX XXX XXX" {...register("phone")} className="h-9 text-sm" />
      </div>

      {/* LinkedIn / Portfolio */}
      <div className="space-y-1.5">
        <Label htmlFor="linkedin" className="text-[12px] font-medium">LinkedIn or portfolio <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input id="linkedin" placeholder="https://linkedin.com/in/..." {...register("linkedin")} className="h-9 text-sm" />
      </div>

      {/* Applying for (read-only) */}
      <div className="space-y-1.5">
        <Label className="text-[12px] font-medium">Applying for</Label>
        <div className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-muted/40 px-3 py-2">
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${deptColors[job.department]}`}>{job.department}</span>
          <span className="text-[13px] font-medium text-foreground">{job.title}</span>
        </div>
      </div>

      {/* Cover letter */}
      <div className="space-y-1.5">
        <Label htmlFor="coverLetter" className="text-[12px] font-medium">Cover letter <span className="text-brand">*</span></Label>
        <Textarea
          id="coverLetter"
          placeholder={`Tell us why you're excited about this role and what you'd bring to the Rafiki SMS team…`}
          rows={5}
          {...register("coverLetter")}
          className="resize-none text-sm leading-relaxed"
        />
        {errors.coverLetter && <p className="text-[11px] text-red-500">{errors.coverLetter.message}</p>}
      </div>

      {/* File upload */}
      <div className="space-y-1.5">
        <Label className="text-[12px] font-medium">CV / Résumé <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center gap-2.5 rounded-lg border border-dashed border-foreground/20 bg-muted/30 px-4 py-3 text-left transition-colors hover:border-brand/40 hover:bg-brand/4"
        >
          <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-[13px] text-muted-foreground">
            {fileName ?? "Attach PDF, DOC, or DOCX · max 5 MB"}
          </span>
          {fileName && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setFileName(null); if (fileRef.current) fileRef.current.value = ""; }}
              className="ml-auto rounded-full p-0.5 hover:text-foreground"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}
        </button>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand text-white hover:bg-brand/90 disabled:opacity-60"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Submitting…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Submit application
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>

      <p className="text-center text-[11px] text-muted-foreground">
        We reply to every application within 5 business days.
      </p>
    </form>
  );
}

/* ─── Success state ──────────────────────────────────────────── */
function SuccessState({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center px-6 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 280, damping: 18 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/15"
      >
        <CheckCircle2 className="h-8 w-8 text-brand" strokeWidth={1.8} />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-2 text-xl font-semibold text-foreground"
      >
        Application submitted!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.27 }}
        className="mb-1 text-[13px] leading-relaxed text-muted-foreground"
      >
        Thanks for applying for{" "}
        <span className="font-medium text-foreground">{job.title}</span> at Rafiki SMS.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="mb-8 text-[13px] text-muted-foreground"
      >
        Our team will review your application and be in touch within 5 business days.
      </motion.p>

      {/* Decorative timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8 w-full max-w-xs rounded-2xl border border-foreground/8 bg-muted/40 p-5 text-left"
      >
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">What happens next</p>
        {[
          { step: "Application review", time: "Within 5 days" },
          { step: "Intro call (30 min)", time: "Week 1–2" },
          { step: "Technical interview", time: "Week 2–3" },
          { step: "Offer", time: "Week 3–4" },
        ].map((s, i) => (
          <div key={s.step} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${i === 0 ? "bg-brand text-white" : "bg-foreground/8 text-muted-foreground"}`}>
                {i + 1}
              </div>
              {i < 3 && <div className="h-6 w-px bg-foreground/10" />}
            </div>
            <div className="pb-2">
              <p className="text-[12px] font-medium text-foreground">{s.step}</p>
              <p className="text-[11px] text-muted-foreground">{s.time}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
      >
        <Button variant="outline" onClick={onClose} className="rounded-full">
          Back to open roles
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Job detail sheet ───────────────────────────────────────── */
function JobSheet({ job, open, onClose }: { job: Job | null; open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [submitted, setSubmitted] = useState(false);

  const handleOpenChange = (v: boolean) => {
    if (!v) { onClose(); setTimeout(() => { setTab("overview"); setSubmitted(false); }, 300); }
  };

  if (!job) return null;
  const Icon = job.icon;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-hidden border-l border-foreground/10 bg-background p-0 sm:max-w-[600px]"
      >
        {/* Header */}
        <SheetHeader className="shrink-0 border-b border-foreground/10 bg-card/60 px-6 py-5 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/6 text-foreground/60">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <SheetTitle className="text-[17px] font-semibold leading-tight text-foreground">
                  {job.title}
                </SheetTitle>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${deptColors[job.department]}`}>
                    {job.department}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{job.location}</span>
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${remoteColors[job.remote]}`}>
                    {job.remote}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          {!submitted && (
            <div className="mt-4 flex gap-1 rounded-xl border border-foreground/10 bg-muted/40 p-1">
              {(["overview", "apply"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 rounded-lg py-1.5 text-[12px] font-medium capitalize transition-all duration-200 ${
                    tab === t
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "apply" ? "Apply now" : "Overview"}
                </button>
              ))}
            </div>
          )}
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessState key="success" job={job} onClose={onClose} />
            ) : tab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="space-y-7 px-6 py-6"
              >
                {/* Meta chips */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Clock, label: job.type },
                    { icon: MapPin, label: job.location },
                    { icon: Wifi, label: job.remote },
                    { icon: Building2, label: job.department },
                  ].map((m) => {
                    const MIcon = m.icon;
                    return (
                      <span key={m.label} className="flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-muted/50 px-3 py-1.5 text-[12px] text-foreground/70">
                        <MIcon className="h-3.5 w-3.5" />
                        {m.label}
                      </span>
                    );
                  })}
                </div>

                {/* About */}
                <div>
                  <h4 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">About this role</h4>
                  <p className="text-[14px] leading-relaxed text-foreground/80">{job.about}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">What you&apos;ll do</h4>
                  <ul className="space-y-2.5">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-[13.5px] text-foreground/80">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">What we&apos;re looking for</h4>
                  <ul className="space-y-2.5">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-[13.5px] text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s) => (
                      <span key={s} className="rounded-lg border border-foreground/10 bg-muted/50 px-3 py-1 text-[12px] text-foreground/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply CTA */}
                <Button
                  onClick={() => setTab("apply")}
                  className="w-full rounded-full bg-brand text-white hover:bg-brand/90"
                >
                  Apply for this role
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="apply"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-6"
              >
                <ApplicationForm job={job} onSuccess={() => setSubmitted(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Job card ───────────────────────────────────────────────── */
function JobCard({
  job,
  index,
  onView,
  onApply,
}: {
  job: Job;
  index: number;
  onView: (j: Job) => void;
  onApply: (j: Job) => void;
}) {
  const Icon = job.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_10px_36px_-10px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_36px_-10px_rgba(0,0,0,0.38)] ${
        job.featured ? "border-brand/25 ring-1 ring-brand/10" : "border-foreground/10"
      }`}
    >
      {job.featured && (
        <span className="absolute right-5 top-5 rounded-full bg-brand/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
          Featured
        </span>
      )}

      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/6 text-foreground/60">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
        <div>
          <h3 className="text-[16px] font-semibold leading-snug text-foreground">{job.title}</h3>
          <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${deptColors[job.department]}`}>
            {job.department}
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3" />{job.location}
        </span>
        <span className="text-[11px] text-muted-foreground">·</span>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" />{job.type}
        </span>
        <span className="text-[11px] text-muted-foreground">·</span>
        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${remoteColors[job.remote]}`}>
          {job.remote}
        </span>
      </div>

      <p className="mb-5 text-[13px] leading-relaxed text-muted-foreground">{job.summary}</p>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {job.skills.map((s) => (
          <span key={s} className="rounded-md border border-foreground/10 bg-muted/50 px-2 py-0.5 text-[11px] text-foreground/70">{s}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-3">
        <button
          onClick={() => onApply(job)}
          className="flex-1 rounded-full bg-brand px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Apply now
        </button>
        <button
          onClick={() => onView(job)}
          className="flex items-center gap-1 text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground"
        >
          View role
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetTab, setSheetTab] = useState<Tab>("overview");
  const [sheetOpen, setSheetOpen] = useState(false);

  const openSheet = (job: Job, tab: Tab) => {
    setSelectedJob(job);
    setSheetTab(tab);
    setSheetOpen(true);
  };

  const featuredJobs = JOBS.filter((j) => j.featured);
  const otherJobs    = JOBS.filter((j) => !j.featured);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-24 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/8 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
            We&apos;re hiring
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display mt-4 text-4xl font-light leading-[1.06] tracking-tight text-foreground sm:text-5xl md:text-[3.4rem]"
          >
            Build the infrastructure{" "}
            <br className="hidden sm:block" />
            <span className="text-brand">Tanzania runs on</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]"
          >
            Join a small, focused team building the SMS backbone for hundreds of
            Tanzanian businesses — from fintech to logistics to healthcare.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#open-roles"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              See open roles <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:careers@rafiki.sms"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Send your CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { val: `${JOBS.length}`, label: "Open positions" },
              { val: "Dar es Salaam", label: "Headquarters" },
              { val: "English + Swahili", label: "Working languages" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="text-[15px] font-bold text-foreground">{s.val}</span>
                <span className="text-[11px] text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Open roles ───────────────────────────────────────── */}
      <section id="open-roles" className="pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Featured roles
            </motion.p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {featuredJobs.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={i}
                  onView={(j) => openSheet(j, "overview")}
                  onApply={(j) => openSheet(j, "apply")}
                />
              ))}
            </div>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              All open positions
            </motion.p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {otherJobs.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={i + featuredJobs.length}
                  onView={(j) => openSheet(j, "overview")}
                  onApply={(j) => openSheet(j, "apply")}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="border-t border-foreground/8 bg-card/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand"
            >
              Why Rafiki SMS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
              className="font-display text-2xl font-light tracking-tight text-foreground sm:text-3xl"
            >
              A place to do{" "}
              <span className="text-brand">your best work</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.48, delay: (i % 3) * 0.09 }}
                  className="flex flex-col gap-3 rounded-2xl border border-foreground/8 bg-card p-6"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-foreground">{b.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Speculative ──────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-brand/15 bg-brand/5 px-8 py-10"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand">
              <Briefcase className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <h2 className="font-display mb-3 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
              Don&apos;t see your role?
            </h2>
            <p className="mb-6 text-[14px] leading-relaxed text-muted-foreground">
              We&apos;re always looking for talented people who care about reliability,
              communication, and building things that matter. Send your CV and tell us
              what you&apos;d like to work on.
            </p>
            <a
              href="mailto:careers@rafiki.sms?subject=General Application — Rafiki SMS"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Send a speculative application
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <p className="mt-4 text-[11px] text-muted-foreground">
              careers@rafiki.sms · We reply to every application
            </p>
          </motion.div>
        </div>
      </section>

      <FooterSection />

      {/* ── Job detail + apply sheet ─────────────────────────── */}
      <JobSheet
        job={selectedJob}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </main>
  );
}
