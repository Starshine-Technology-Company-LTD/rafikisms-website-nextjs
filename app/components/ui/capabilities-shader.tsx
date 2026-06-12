"use client"

import { useState } from "react"
import { Warp } from "@paper-design/shaders-react"
import { Key, BadgeCheck, RefreshCw, BarChart3, CheckCircle2 } from "lucide-react"
import { FadeIn } from "./fade-in"
import { TextShimmer } from "./text-shimmer"
import { Dialog } from "./dialog"

const capabilities = [
  {
    icon: Key,
    title: "Vendor API authentication",
    description: "Issue and manage vendor API keys so clients send through your Laravel endpoint, never directly to the gateway.",
    details: [
      "Generate and revoke vendor-specific API keys from your dashboard",
      "Set granular permissions per API key (send, view reports, manage senders)",
      "All SMS traffic routes through your Laravel backend - vendors never call the gateway directly",
      "Audit log tracks every API key action for compliance",
      "Rate limiting and IP whitelisting per vendor key",
      "Automatic key rotation support with zero-downtime migration",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Sender ID governance",
    description: "Control assignment and operational eligibility of sender IDs with clear statuses and policy-based enforcement.",
    details: [
      "Approve or reject sender ID requests with one click",
      "Assign sender IDs to specific vendors with expiration dates",
      "Real-time sender ID status: pending, approved, rejected, expired, suspended",
      "Policy engine enforces business rules (e.g., alphanumeric only, length limits)",
      "Bulk assign sender IDs to multiple vendors at once",
      "Full audit trail for every sender ID lifecycle event",
    ],
  },
  {
    icon: RefreshCw,
    title: "Reliable queued delivery",
    description: "Process messages asynchronously with queue workers, retries, and callbacks that keep throughput stable.",
    details: [
      "Messages are queued immediately and processed asynchronously via Laravel Horizon",
      "Automatic retry with exponential backoff for failed deliveries (up to 3 retries)",
      "Queue workers scale horizontally to handle traffic spikes without slowdown",
      "Delivery callbacks notify your webhook endpoint on status changes",
      "Priority queuing - route urgent messages (OTPs) ahead of bulk campaigns",
      "Dead-letter queue captures permanently failed messages for manual review",
    ],
  },
  {
    icon: BarChart3,
    title: "Live reporting and exports",
    description: "Track sent, delivered, failed, and pending messages with filterable reports and export-ready data.",
    details: [
      "Real-time dashboard with sent, delivered, failed, and pending counts",
      "Filter by date range, vendor, sender ID, status, and more",
      "Export reports as CSV or Excel with a single click",
      "Scheduled report delivery via email (daily, weekly, monthly)",
      "Drill down into individual message status and delivery receipts",
      "API endpoints to pull reporting data programmatically",
    ],
  },
]

const shaderConfigs = [
  {
    proportion: 0.35,
    softness: 0.9,
    distortion: 0.18,
    swirl: 0.7,
    swirlIterations: 10,
    shape: "checks" as const,
    shapeScale: 0.1,
    colors: ["hsl(170, 100%, 20%)", "hsl(160, 100%, 50%)", "hsl(180, 90%, 30%)", "hsl(165, 100%, 70%)"],
  },
  {
    proportion: 0.4,
    softness: 1.0,
    distortion: 0.2,
    swirl: 0.8,
    swirlIterations: 12,
    shape: "stripes" as const,
    shapeScale: 0.12,
    colors: ["hsl(200, 100%, 20%)", "hsl(180, 100%, 55%)", "hsl(160, 90%, 30%)", "hsl(190, 100%, 70%)"],
  },
  {
    proportion: 0.3,
    softness: 0.85,
    distortion: 0.15,
    swirl: 0.65,
    swirlIterations: 8,
    shape: "checks" as const,
    shapeScale: 0.09,
    colors: ["hsl(150, 100%, 20%)", "hsl(140, 100%, 50%)", "hsl(130, 90%, 30%)", "hsl(145, 100%, 65%)"],
  },
  {
    proportion: 0.38,
    softness: 0.95,
    distortion: 0.22,
    swirl: 0.75,
    swirlIterations: 9,
    shape: "edge" as const,
    shapeScale: 0.11,
    colors: ["hsl(190, 100%, 20%)", "hsl(170, 100%, 55%)", "hsl(150, 90%, 30%)", "hsl(175, 100%, 70%)"],
  },
]

export default function CapabilitiesShader() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="features" className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300" aria-labelledby="capabilities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-medium text-[color:var(--brand-text)] uppercase tracking-widest mb-3">
            Capabilities
          </p>
          <h2
            id="capabilities-heading"
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white max-w-2xl mx-auto leading-tight"
          >
            Everything you need to{" "}
            <TextShimmer duration={3}>run SMS at scale</TextShimmer>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Purpose-built for Tanzania, proven in production.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map(({ icon: Icon, title, description, details }, index) => {
            const config = shaderConfigs[index]
            return (
              <FadeIn key={title}>
                <div className="relative h-[320px] rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0">
                    <Warp
                      style={{ height: "100%", width: "100%" }}
                      proportion={config.proportion}
                      softness={config.softness}
                      distortion={config.distortion}
                      swirl={config.swirl}
                      swirlIterations={config.swirlIterations}
                      shape={config.shape}
                      shapeScale={config.shapeScale}
                      scale={1}
                      rotation={0}
                      speed={0.6}
                      colors={config.colors}
                    />
                  </div>

                  <div className="relative z-10 p-6 h-full flex flex-col bg-black/70 border border-white/10 rounded-2xl group-hover:bg-black/60 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm leading-snug">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-200 leading-relaxed flex-grow">
                      {description}
                    </p>
                    <button
                      onClick={() => setSelected(index)}
                      className="mt-4 flex items-center text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="mr-1">Learn more</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <Dialog
                  open={selected === index}
                  onClose={() => setSelected(null)}
                  title={title}
                  icon={<Icon className="w-5 h-5 text-[color:var(--brand-text)]" />}
                >
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{description}</p>
                  <ul className="space-y-2.5">
                    {details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[color:var(--brand-text)] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Dialog>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
