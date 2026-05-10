export interface ApproachStep {
  number: string;
  tag: string;
  title: string;
  description: string;
  points: string[];
  mockupType: "onboarding" | "code" | "launch" | "analytics";
}

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    tag: "Discovery",
    title: "Align before\nyou build",
    description:
      "Align on operators, message types, volumes, and compliance. " +
      "Decide gateway behaviour and delivery receipt needs before " +
      "writing a single line of code.",
    points: [
      "Stakeholder workshops & success metrics",
      "Technical constraints mapped to your stack",
      "Pilot → staging → production rollout plan",
    ],
    mockupType: "onboarding",
  },
  {
    number: "02",
    tag: "Integration",
    title: "Connect in\nminutes",
    description:
      "One REST endpoint. SDKs for Laravel, Node, and Python. " +
      "A sandbox environment with simulated delivery receipts lets " +
      "your team test without spending a single shilling.",
    points: [
      "composer require rafiki/sms",
      "Webhook simulator for DLR testing",
      "Postman collection included on signup",
    ],
    mockupType: "code",
  },
  {
    number: "03",
    tag: "Launch",
    title: "Go live with\nconfidence",
    description:
      "We handle Sender ID whitelisting with all Tanzanian operators. " +
      "Your dedicated onboarding engineer stays on the call until your " +
      "first live message is confirmed delivered.",
    points: [
      "Approved across Vodacom, Airtel, Tigo",
      "Dedicated engineer on first go-live",
      "98% customer satisfaction on onboarding",
    ],
    mockupType: "launch",
  },
  {
    number: "04",
    tag: "Scale",
    title: "Grow without\nlimits",
    description:
      "Real-time dashboard shows delivery rates, latency, and " +
      "cost-per-message. Set spend alerts in TSH and export reports " +
      "for your finance team — all in one place.",
    points: [
      "Live delivery & latency monitoring",
      "TSH spend alerts & auto tier upgrades",
      "CSV / PDF export for finance",
    ],
    mockupType: "analytics",
  },
];
