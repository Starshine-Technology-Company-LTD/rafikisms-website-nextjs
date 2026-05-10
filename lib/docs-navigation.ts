export type DocsNavItem = {
  title: string;
  href: string;
};

export type DocsNavSection = {
  label: string;
  items: DocsNavItem[];
};

export const docsNavSections: DocsNavSection[] = [
  {
    label: "Getting Started",
    items: [
      { title: "Overview", href: "/docs" },
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "Authentication", href: "/docs/authentication" },
      { title: "Error Handling", href: "/docs/errors" },
    ],
  },
  {
    label: "Messaging",
    items: [
      { title: "Send Single SMS", href: "/docs/send-sms" },
      { title: "Send Bulk SMS", href: "/docs/bulk-sms" },
      { title: "Delivery Reports", href: "/docs/delivery-reports" },
    ],
  },
  {
    label: "OTP",
    items: [
      { title: "Generate OTP", href: "/docs/otp-generate" },
      { title: "Verify OTP", href: "/docs/otp-verify" },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Check Balance", href: "/docs/balance" },
      { title: "Sender Names", href: "/docs/sender-names" },
    ],
  },
];
