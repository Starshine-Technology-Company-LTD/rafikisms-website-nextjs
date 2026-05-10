/** Example curl for developers tab — built without nested quotes in a template literal (avoids parse/runtime issues). */
const DEVELOPERS_SEND_CURL = [
  'curl -X POST "/v1/vendor/send-sms" \\',
  '  -H "X-API-Key: sk_vendor_xxx" \\',
  '  -H "Content-Type: application/json" \\',
  "  -d '" +
    JSON.stringify({
      phone: "255712345678",
      message: "Hello",
      source_address: "STARSHINE",
    }) +
    "'",
].join("\n");

export const landingContent = {
  brand: {
    name: "Rafiki SMS",
    shortName: "Rafiki",
  },
  metadata: {
    title: "Rafiki SMS - Enterprise Messaging Platform",
    description:
      "Send reliable SMS through a secure, API-first platform built for modern teams and high-volume delivery.",
  },
  navigation: {
    links: [
      { name: "About", href: "#about" },
      { name: "Features", href: "#features" },
      { name: "Approach", href: "#approach" },
      { name: "Careers", href: "/careers" },
      { name: "Docs", href: "/docs" },
      { name: "Developers", href: "#developers" },
      { name: "Pricing", href: "#pricing" },
      { name: "Team", href: "#team" },
    ],
    signInLabel: "Vendor sign in",
    ctaLabel: "Start sending",
  },
  about: {
    eyebrow: "About Rafiki SMS",
    title: "The messaging backbone",
    subtitle: "for modern Tanzanian businesses.",
    description:
      "Rafiki SMS is a secure, API-first SMS platform built for enterprises that cannot tolerate unreliable delivery. We route, queue and govern millions of SMS per month through a resilient SMPP backbone with vendor-level access control, sender ID compliance, and full audit trails.",
    paragraphs: [
      "Built in-house at Starshine Technology, Rafiki SMS powers OTPs, transaction alerts, campaigns, and operational notifications for fintech, logistics and public sector teams across Tanzania.",
      "Every message is queued, tracked and reconciled. Every API key is scoped. Every sender ID is governed. You get a platform you can ship against, an ops team you can call, and receipts for every SMS your business sends.",
    ],
    chips: [
      { value: "1.2M+", label: "SMS / month" },
      { value: "99.9%", label: "uptime target" },
      { value: "200+", label: "vendor accounts" },
      { value: "<4s", label: "avg queue time" },
    ],
    imageAlt: "Rafiki SMS mobile experience",
  },
  approach: {
    eyebrow: "Our Approach",
    title: "Three principles.",
    subtitle: "One reliable SMS platform.",
    description:
      "Rafiki SMS is engineered around reliability, compliance, and scale — in that order. These principles guide every line of code and every operational decision.",
    pillars: [
      {
        number: "01",
        title: "Engineered for reliability",
        description:
          "A Laravel-driven SMPP pipeline with automatic retries, vendor failover, and real-time delivery-report reconciliation keeps every SMS accounted for.",
      },
      {
        number: "02",
        title: "Designed for compliance",
        description:
          "Sender ID governance, vendor-scoped API keys, and per-message audit trails give you the paperwork regulators and finance teams need, without the spreadsheet chaos.",
      },
      {
        number: "03",
        title: "Built for scale",
        description:
          "Horizontally scaled queue workers, a durable message store, and observability built in from day one — so traffic spikes become a non-event.",
      },
    ],
    imageAlt: "Rafiki SMS chat delivery flow",
  },
  hero: {
    eyebrow: "Enterprise SMS API platform",
    headlineStart: "The platform",
    headlinePrefix: "to",
    rotatingWords: ["notif", "engage", "connect", "reach"],
    description:
      "Queue, send, and track SMS with vendor API keys, sender ID governance, and delivery reports your team can trust.",
    primaryCta: "Start free trial",
    secondaryCta: "Read API docs",
    marqueeStats: [
      { value: "99.99%", label: "platform uptime target", company: "RAFIKI OPERATIONS" },
      { value: "24/7", label: "delivery monitoring", company: "NOC TEAM" },
      { value: "API-first", label: "vendor integrations", company: "RAFIKI API" },
      { value: "<3s", label: "queue to provider handoff", company: "RAFIKI PIPELINE" },
    ],
  },
  features: {
    eyebrow: "Capabilities",
    title: "Everything you need to run SMS.",
    subtitle: "From API keys to delivery status, in one platform.",
    items: [
      {
        number: "01",
        title: "Vendor API authentication",
        description:
          "Issue and manage vendor API keys so clients send through your Laravel endpoint, never directly to the gateway.",
        visual: "deploy",
      },
      {
        number: "02",
        title: "Sender ID governance",
        description:
          "Control assignment and operational eligibility of sender IDs with clear statuses and policy-based enforcement.",
        visual: "security",
      },
      {
        number: "03",
        title: "Reliable queued delivery",
        description:
          "Process messages asynchronously with queue workers, retries, and callbacks that keep throughput stable.",
        visual: "ai",
      },
      {
        number: "04",
        title: "Live reporting and exports",
        description:
          "Track sent, delivered, failed, and pending messages with filterable reports and export-ready data.",
        visual: "collab",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Process",
    title: "Three steps.",
    subtitle: "Production-grade SMS flow.",
    fileName: "send-sms.ts",
    readyLabel: "Ready",
    steps: [
      {
        number: "I",
        title: "Authenticate with vendor key",
        description:
          "Clients call your API with X-API-Key. Rafiki credentials stay server-side for security.",
        code: `POST /v1/vendor/send-sms
X-API-Key: sk_vendor_xxx
{
  "phone": "255712345678",
  "message": "Order confirmed",
  "source_address": "STARSHINE"
}`,
      },
      {
        number: "II",
        title: "Validate sender and credits",
        description:
          "The platform checks sender authorization, account status, and billing eligibility before dispatch.",
        code: `validateSenderId(vendorId, sourceAddress)
validateBilling(vendorId, payload)
queueDispatch({
  provider: "rafiki",
  retry: true
})`,
      },
      {
        number: "III",
        title: "Queue, dispatch, and track",
        description:
          "Jobs send via Rafiki gateway and persist delivery status for real-time dashboards and exports.",
        code: `dispatch(SendSmsJob::class)
  ->onQueue("default");

saveSmsLog({
  status: "queued",
  message_id: "..."
});`,
      },
    ],
  },
  infrastructure: {
    eyebrow: "Infrastructure",
    title: "Built for",
    subtitle: "high-volume delivery.",
    description:
      "Queue-based architecture, resilient workers, and auditable logs help teams process large SMS traffic with confidence.",
    stats: [
      { value: "24/7", label: "delivery monitoring" },
      { value: "99.99%", label: "service uptime target" },
      { value: "<5s", label: "job processing target" },
    ],
    panelTitle: "Message Processing Regions",
    panelStatus: "All operational",
    locations: [
      { city: "Dar es Salaam", region: "Primary", latency: "12ms" },
      { city: "Nairobi", region: "East Africa", latency: "24ms" },
      { city: "Johannesburg", region: "Southern Africa", latency: "38ms" },
      { city: "Dubai", region: "Middle East", latency: "55ms" },
      { city: "London", region: "Europe", latency: "92ms" },
      { city: "Mumbai", region: "Asia", latency: "110ms" },
    ],
  },
  metrics: {
    eyebrow: "Live metrics",
    title: "Performance you can",
    subtitle: "track in real time.",
    liveLabel: "Live",
    cards: [
      { value: 1250000, suffix: "+", prefix: "", label: "SMS queued this month" },
      { value: 99, suffix: ".9%", prefix: "", label: "Queue worker uptime" },
      { value: 4, suffix: "s", prefix: "<", label: "Average processing delay" },
      { value: 200, suffix: "+", prefix: "", label: "Vendor accounts supported" },
    ],
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Built to plug into",
    subtitle: "your existing systems.",
    description:
      "Connect CRM, ERP, support, and commerce tools to trigger SMS flows from events your teams already use.",
    items: [
      { name: "Laravel API", category: "Backend" },
      { name: "Postman", category: "Testing" },
      { name: "Shopify", category: "E-Commerce" },
      { name: "HubSpot", category: "CRM" },
      { name: "Salesforce", category: "CRM" },
      { name: "Zapier", category: "Automation" },
      { name: "Meta Ads", category: "Campaigns" },
      { name: "WooCommerce", category: "E-Commerce" },
      { name: "Power BI", category: "Analytics" },
      { name: "Google Sheets", category: "Operations" },
      { name: "Slack", category: "Alerts" },
      { name: "Webhook Events", category: "Custom" },
    ],
  },
  security: {
    eyebrow: "Security",
    title: "Trust is",
    subtitle: "built in.",
    description:
      "Role controls, API-key isolation, and auditable workflows protect sender governance, delivery operations, and billing visibility.",
    certifications: ["Audit Logs", "Role Permissions", "API Key Isolation", "Queue Retries", "Access Policies"],
    features: [
      {
        title: "Sender authorization",
        description: "Only approved sender IDs can dispatch for a vendor account.",
      },
      {
        title: "Secure API access",
        description: "Vendor keys authenticate requests while gateway credentials remain server-side.",
      },
      {
        title: "Operational monitoring",
        description: "Track queue health and status changes with clear visibility for support teams.",
      },
      {
        title: "Compliance-ready logs",
        description: "Maintain message, billing, and audit trails for investigations and reporting.",
      },
    ],
  },
  developers: {
    eyebrow: "For developers",
    title: "API-first experience.",
    subtitle: "Production-ready delivery.",
    description:
      "Use familiar JSON APIs to send, track, and report messages with clean integration paths for Node, .NET, Python, or your own services.",
    tabs: [
      {
        label: "Send",
        code: DEVELOPERS_SEND_CURL,
      },
      {
        label: "Auth",
        code: `const headers = {
  "Content-Type": "application/json",
  "X-API-Key": process.env.VENDOR_API_KEY,
};`,
      },
      {
        label: "Status",
        code: `const report = await fetch("/v1/vendor/sms-logs", {
  headers: { "X-API-Key": apiKey },
});

const data = await report.json();`,
      },
    ],
    points: [
      { title: "RESTful endpoints", description: "Simple request/response patterns for quick adoption." },
      { title: "Queue-friendly", description: "Designed for asynchronous high-volume dispatch flows." },
      { title: "Clear errors", description: "Actionable error codes for invalid sender IDs and account states." },
      { title: "Docs-first", description: "OpenAPI-friendly structure for easy testing and onboarding." },
    ],
    docsLabel: "Read API docs",
    githubLabel: "Integration guide",
  },
  testimonials: {
    eyebrow: "Customer stories",
    keyResultLabel: "Key Result",
    trustedLabel: "Trusted by growing organizations",
    items: [
      {
        quote: "Rafiki SMS gave us one reliable API flow for OTP and transaction alerts across all our products.",
        author: "Neema Ally",
        role: "Head of Engineering",
        company: "NiaPay",
        metric: "98% delivery in under 10s",
      },
      {
        quote: "Sender ID controls and audit logs solved our compliance reviews without slowing operations.",
        author: "David Kimaro",
        role: "Operations Manager",
        company: "AfyaConnect",
        metric: "100% sender policy compliance",
      },
      {
        quote: "We moved campaign sends to queued jobs and finally stopped timeout incidents during peak traffic.",
        author: "Amina Suleiman",
        role: "Platform Lead",
        company: "RetailWave",
        metric: "3x higher campaign throughput",
      },
      {
        quote: "The vendor API key model let us onboard partners faster while keeping gateway credentials private.",
        author: "Peter Mushi",
        role: "Product Owner",
        company: "SwiftBills",
        metric: "2-week faster partner launch",
      },
    ],
    companies: [
      "NiaPay",
      "AfyaConnect",
      "RetailWave",
      "SwiftBills",
      "Bongo Logistics",
      "EduTrack",
      "CarePoint",
      "Tangaza",
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Eight tiers, one transparent",
    subtitle: "per-SMS model.",
    description:
      "Pay only for what you send. Rates step down as your monthly volume grows, from pilot projects to enterprise-scale traffic.",
    currency: "TSH",
    unitLabel: "TSH/SMS",
    volumeUnit: "SMS",
    bestValueLabel: "Best value",
    ctaLabel: "Sign up",
    tiers: [
      {
        name: "Starter",
        tagline: "Pilot projects and low-volume testing.",
        minVolume: 1,
        maxVolume: 10000,
        pricePerSms: 30,
        highlights: [
          "Bulk SMS and delivery reports",
          "Vendor API key access",
          "Email support",
        ],
        popular: false,
      },
      {
        name: "Growth",
        tagline: "Active products running regular sends.",
        minVolume: 10001,
        maxVolume: 25000,
        pricePerSms: 25,
        highlights: [
          "Multiple sender IDs",
          "Detailed delivery reports",
          "Priority queue throughput",
        ],
        popular: false,
      },
      {
        name: "Business",
        tagline: "Growing teams running active campaigns.",
        minVolume: 25001,
        maxVolume: 50000,
        pricePerSms: 23,
        highlights: [
          "Priority support",
          "Advanced analytics",
          "Webhook callbacks",
        ],
        popular: false,
      },
      {
        name: "Professional",
        tagline: "Scaling products with mission-critical sends.",
        minVolume: 50001,
        maxVolume: 100000,
        pricePerSms: 20,
        highlights: [
          "Custom sender IDs",
          "Dedicated onboarding",
          "SLA-backed delivery",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        tagline: "High-volume operations and multi-product teams.",
        minVolume: 100001,
        maxVolume: 250000,
        pricePerSms: 18,
        highlights: [
          "Dedicated account manager",
          "Compliance-ready exports",
          "Usage forecasting",
        ],
        popular: false,
      },
      {
        name: "Corporate",
        tagline: "Cross-unit traffic across business lines.",
        minVolume: 250001,
        maxVolume: 500000,
        pricePerSms: 16,
        highlights: [
          "Dedicated infrastructure",
          "Custom integrations",
          "Quarterly business reviews",
        ],
        popular: false,
      },
      {
        name: "Scale",
        tagline: "Nationwide programs and heavy campaign cycles.",
        minVolume: 500001,
        maxVolume: 1000000,
        pricePerSms: 14,
        highlights: [
          "Architecture review",
          "Custom SLAs",
          "24/7 escalation channel",
        ],
        popular: false,
      },
      {
        name: "Ultimate",
        tagline: "Enterprise-grade volume at the best rate.",
        minVolume: 1000001,
        maxVolume: 20000000,
        pricePerSms: 12,
        highlights: [
          "Volume-based discounts",
          "Billing and invoicing controls",
          "White-glove support",
        ],
        popular: false,
      },
    ],
    bottomNote:
      "All tiers include API access, delivery reports, and sender ID controls. Higher volumes unlock priority support, advanced analytics, and dedicated account management.",
  },
  team: {
    eyebrow: "Team",
    title: "Our brilliant",
    subtitle: "teammates.",
    description:
      "The people behind Rafiki SMS — engineers, operators, and designers building a reliable messaging platform for East Africa and beyond.",
    members: [
      { name: "Team Member 1", role: "CEO & Founder", initials: "01" },
      { name: "Team Member 2", role: "Lead Developer", initials: "02" },
      { name: "Team Member 3", role: "Product Manager", initials: "03" },
      { name: "Team Member 4", role: "UI/UX Designer", initials: "04" },
      { name: "Team Member 5", role: "Backend Engineer", initials: "05" },
      { name: "Team Member 6", role: "DevOps Engineer", initials: "06" },
      { name: "Team Member 7", role: "Marketing Director", initials: "07" },
      { name: "Team Member 8", role: "CTO", initials: "08" },
    ],
  },
  showcase: {
    eyebrow: "Showcase",
    title: "Everything you need to run SMS at scale.",
    subtitle: "Purpose-built for Tanzania, proven in production.",
    cards: [
      {
        id: "local-expertise",
        number: "01",
        total: "04",
        title: "Human support, local to Tanzania",
        lead:
          "Onboarding, training, and day-to-day assistance from a team that speaks your language — in English and Swahili.",
        bullets: [
          "English + Swahili support coverage",
          "Dedicated onboarding engineer",
          "98% customer satisfaction",
        ],
        theme: "light-teal",
        visual: "local-expertise",
      },
      {
        id: "local-partners",
        number: "02",
        total: "04",
        title: "Optimised for every Tanzanian network",
        lead:
          "Deep integrations with Airtel, Vodacom, Yas, Halotel, and TTCL deliver consistent performance, nationwide.",
        bullets: [
          "Direct MNO connections",
          "Intelligent failover routing",
          "National coverage, no black spots",
        ],
        theme: "light",
        visual: "local-partners",
      },
      {
        id: "about-rafiki",
        number: "03",
        total: "04",
        cardEyebrow: "About Rafiki SMS",
        title: "The messaging backbone",
        titleAccent: "for modern Tanzanian businesses.",
        lead:
          "Rafiki SMS is a secure, API-first SMS platform built for enterprises that cannot tolerate unreliable delivery. We route, queue and govern millions of SMS per month through a resilient SMPP backbone with vendor-level access control, sender ID compliance, and full audit trails.",
        bullets: [
          "Built in-house at Starshine Technology — OTPs, alerts, campaigns for fintech, logistics, and public sector across Tanzania.",
          "Every message queued, tracked, and reconciled; every API key scoped; every sender ID governed.",
          "1.2M+ SMS / month · 99.9% uptime target · 200+ vendor accounts · <4s avg queue time",
        ],
        theme: "light",
        visual: "about-rafiki",
      },
      {
        id: "campaign-intelligence",
        number: "04",
        total: "04",
        title: "Built-in campaign intelligence",
        lead:
          "Budget alerts, AI-routed delivery, and ROI tracking let teams make decisions without reaching for a spreadsheet.",
        bullets: [
          "Live campaign metrics",
          "AI routing for best delivery cost",
          "ROI + revenue attribution",
        ],
        theme: "graphite",
        visual: "campaign-intelligence",
      },
    ],
  },
  /** Vendor onboarding journey — synced with ui-website/process.md */
  process: {
    steps: [
      {
        id: "onboarding",
        title: "Onboarding & discovery",
        description:
          "Align on who sends what, which countries/operators, message types (OTP, transactional, campaigns), volumes, and compliance (consent, opt-out where required, content rules). Decide gateway (e.g. Rafiki vs Beem), default sender behaviour, and whether you need delivery reports (DLR) or vendor webhooks for downstream systems.",
        illustrationLabel: "Snapshot",
        points: [
          "Stakeholder workshops and success metrics (delivery rate, latency, support tickets).",
          "Technical constraints: only Laravel is the public SMS edge; Rafiki keys stay on the server.",
          "Rollout plan: pilot numbers, staging vs production base URL, who approves go-live.",
        ],
      },
      {
        id: "sender-access",
        title: "Sender ID, account & access",
        description:
          "Vendor user must be in good standing: active, email verified (and any internal “approved” steps your ops use). Sender IDs are registered in your system, tied to the right gateway, marked active, and assigned to that vendor—the API rejects source_address values that are not on the vendor’s approved list. If you use sender name / registration flows with the operator (e.g. Beam/Rafiki processes), complete those before treating the ID as production-ready.",
        illustrationLabel: "Prototype / readiness checklist",
        points: [
          "Sender ID list: name, gateway, active, assignment to the vendor.",
          "Default sender for the vendor when source_address is omitted (if you rely on that).",
          "Admin/vendor UI paths for requests and status (pending → progress → done), aligned with how you operate today.",
        ],
      },
      {
        id: "integration",
        title: "Integration, keys & hardening",
        description:
          "Platform: Laravel has RAFIKI_SMS_* (or a Sending Server row), SMS_DEFAULT_PROVIDER=rafiki (or equivalent), timeouts/retries, and optional DLR callback URL if you use Rafiki callbacks. Vendor integration: create a vendor API key (plain text shown once), store it in the vendor’s secret manager, and call POST /v1/vendor/send-sms with X-API-Key, JSON body phone, message, optional source_address. Add automated tests (single + bulk), idempotency or retry policy on the client if needed, and logging/monitoring for INVALID_SENDER_ID, INSUFFICIENT_CREDITS, and upstream failures.",
        illustrationLabel: "Implementation board",
        points: [
          "API contract documented (errors, codes, max message length).",
          "Staged rollout: dev/stage base URL → production; smoke tests with real MSISDNs where allowed.",
          "Observability: delivery reports page/job pipeline, alerts on error spikes.",
        ],
      },
      {
        id: "credits-launch",
        title: "Credits, launch & support",
        description:
          "SMS credits must cover traffic; sends fail fast with INSUFFICIENT_CREDITS when balance is too low. Go-live: runbook (who rotates API keys, how to revoke keys), rollback (disable key or deactivate vendor), and support playbooks for “message not received” (operator, DLR, malformed MSISDN). Post-launch: regular review of credits, DLR/vendor webhooks, sender ID changes, and gateway incidents.",
        illustrationLabel: "Launch snapshot",
        points: [
          "Launch checklist: credits, sender IDs, API key in prod, base URL, DLR/webhooks.",
          "On-call / escalation for Rafiki/Laravel and account issues.",
          "Cadence: weekly metrics, credit top-ups, and integration health.",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Here are some common",
    subtitle: "enquiries we face.",
    description:
      "Everything you need to know to get started. Can't find what you're looking for? Our team is one message away.",
    items: [
      {
        q: "How do I get started with Rafiki SMS?",
        a: "Create a vendor account, verify your organisation, and our onboarding team will activate your API keys and a test sender ID within the same business day.",
      },
      {
        q: "Do I need a registered business to send SMS?",
        a: "Yes. To comply with Tanzanian regulations we require a registered business, a verified sender ID, and a signed service agreement before production traffic is enabled.",
      },
      {
        q: "Is there a free trial or sandbox?",
        a: "Every new account includes a free sandbox sender ID and a small bundle of test credits so your developers can run integration tests before going live.",
      },
      {
        q: "What makes Rafiki SMS different?",
        a: "An API-first SMS platform built on a queued, observable pipeline: vendor-scoped keys, gateway-grade SMPP routing to Tanzanian networks, structured delivery receipts and callbacks, full audit trails, plus a Dar es Salaam operations team when you need a human.",
      },
      {
        q: "How is the platform architected for scale and reliability?",
        a: "Traffic enters through authenticated APIs and validation layers, persists to durable storage before dispatch, then flows through prioritized asynchronous workers and carrier-facing SMPP paths. Supporting services handle delivery reports (DLRs), retries, and webhook callbacks — so bursts are absorbed without sacrificing traceability.",
      },
      {
        q: "Are messages and delivery statuses guaranteed under load?",
        a: "We design for at-least-once processing end-to-end: accepts are recorded, outbound work is queued for resilient workers, and downstream systems receive status updates through DLR ingestion and HTTPS callbacks — with bounded retries instead of silent drops when carriers or endpoints hiccup.",
      },
      {
        q: "Can we integrate status updates into our own systems?",
        a: "Yes. Beyond the dashboard and APIs, you can consume delivery lifecycle events via webhooks and structured logs — ideal for reconciling CRM records, billing, or support workflows without polling carrier consoles.",
      },
      {
        q: "Which payment methods do you support?",
        a: "We accept bank transfers, mobile money (M-Pesa, Airtel Money, HaloPesa, Yas), and invoice-based billing with NET-30 terms for enterprise accounts.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Still have questions?",
    subtitle: "We'd love to hear from you.",
    description:
      "Tell us about your project. Our team replies within 24 hours on business days, usually faster.",
    channels: [
      {
        icon: "phone",
        label: "Call us",
        value: "+255 762 000 000",
        hint: "Mon – Fri, 08:00 – 18:00 EAT",
      },
      {
        icon: "mail",
        label: "Email",
        value: "hello@rafiki.sms",
        hint: "We reply within 24 hours",
      },
      {
        icon: "map-pin",
        label: "Office",
        value: "Mikocheni, Dar es Salaam",
        hint: "Tanzania",
      },
    ],
    form: {
      firstNameLabel: "First name",
      lastNameLabel: "Last name",
      emailLabel: "Work email",
      phoneLabel: "Phone (optional)",
      messageLabel: "How can we help?",
      submitLabel: "Send message",
      successTitle: "Thanks — we got it.",
      successBody: "A member of our team will reply within 24 hours.",
    },
  },
  cta: {
    title: "Ready to deliver",
    subtitle: "messages at scale?",
    description:
      "Launch with Rafiki SMS and give your teams secure APIs, reliable queues, and clear delivery visibility.",
    primaryLabel: "Start sending now",
    secondaryLabel: "Talk to sales",
    note: "No credit card required",
  },
  footer: {
    description:
      "Rafiki SMS is a secure, API-first messaging platform for teams that need reliable delivery and operational control.",
    statusLabel: "All systems operational",
    links: {
      Product: [
        { name: "Features", href: "#features" },
        { name: "How it works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Integrations", href: "#integrations" },
      ],
      Developers: [
        { name: "API Documentation", href: "#developers" },
        { name: "Integration Guide", href: "#developers" },
        { name: "Status", href: "#" },
      ],
      Company: [
        { name: "Team", href: "#team" },
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Support", href: "#" },
      ],
      Legal: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Security", href: "#security" },
      ],
    },
    social: [
      { name: "LinkedIn", href: "#" },
      { name: "GitHub", href: "#" },
      { name: "Contact", href: "#" },
    ],
    copyright: "2026 Rafiki SMS. All rights reserved.",
  },
} as const;
