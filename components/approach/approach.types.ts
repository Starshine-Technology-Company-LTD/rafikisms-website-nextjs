export interface ApproachStep {
  number: string;
  tag: string;
  title: string;
  description: string;
  points: string[];
  mockupType: "register" | "kyc" | "approve" | "send";
  duration: string;
}

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    tag: "Register",
    title: "Create your\nvendor account",
    description:
      "Sign up in under two minutes. Enter your business name, work email, and contact details. No credit card required to get started.",
    points: [
      "Business email + company name",
      "No credit card required",
      "Instant access to sandbox",
    ],
    mockupType: "register",
    duration: "~2 min",
  },
  {
    number: "02",
    tag: "KYC",
    title: "Verify your\nbusiness",
    description:
      "Upload your business registration certificate and director's national ID. Our compliance team reviews submissions within one business day.",
    points: [
      "Business registration certificate",
      "Director national ID / passport",
      "Reviewed within 1 business day",
    ],
    mockupType: "kyc",
    duration: "~5 min",
  },
  {
    number: "03",
    tag: "Approved",
    title: "Receive your\ncredentials",
    description:
      "Once verified, we activate your vendor account, issue your API key, and assign your approved sender IDs. Ready to test in the sandbox.",
    points: [
      "API key issued instantly on approval",
      "Sender ID activated across all carriers",
      "Full sandbox access with test credits",
    ],
    mockupType: "approve",
    duration: "1 business day",
  },
  {
    number: "04",
    tag: "Go Live",
    title: "Start sending\nSMS today",
    description:
      "One REST endpoint. Integrate with Laravel, Node, or Python. Your dedicated onboarding engineer stays available until your first live message is confirmed.",
    points: [
      "One API call to send to any Tanzanian network",
      "Dedicated engineer on your first go-live",
      "Real-time delivery receipts from day one",
    ],
    mockupType: "send",
    duration: "Same day",
  },
];
