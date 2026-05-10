import Link from "next/link";
import { Endpoint } from "@/components/docs/endpoint";
import { CodeBlock } from "@/components/docs/code-block";
import { ParamTable } from "@/components/docs/param-table";
import { TryConsole } from "@/components/docs/try-console";

export type DocSlug =
  | "overview"
  | "quickstart"
  | "authentication"
  | "errors"
  | "send-sms"
  | "bulk-sms"
  | "delivery-reports"
  | "otp-generate"
  | "otp-verify"
  | "balance"
  | "sender-names";

export const DOC_SEQUENCE: { slug: DocSlug; href: string; title: string }[] = [
  { slug: "overview", href: "/docs", title: "Overview" },
  { slug: "quickstart", href: "/docs/quickstart", title: "Quickstart" },
  { slug: "authentication", href: "/docs/authentication", title: "Authentication" },
  { slug: "errors", href: "/docs/errors", title: "Error handling" },
  { slug: "send-sms", href: "/docs/send-sms", title: "Send single SMS" },
  { slug: "bulk-sms", href: "/docs/bulk-sms", title: "Send bulk SMS" },
  {
    slug: "delivery-reports",
    href: "/docs/delivery-reports",
    title: "Delivery reports",
  },
  { slug: "otp-generate", href: "/docs/otp-generate", title: "Generate OTP" },
  { slug: "otp-verify", href: "/docs/otp-verify", title: "Verify OTP" },
  { slug: "balance", href: "/docs/balance", title: "Check balance" },
  { slug: "sender-names", href: "/docs/sender-names", title: "Sender names" },
];

export function DocPager({ slug }: { slug: DocSlug }) {
  const idx = DOC_SEQUENCE.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? DOC_SEQUENCE[idx - 1] : null;
  const next = idx >= 0 && idx < DOC_SEQUENCE.length - 1 ? DOC_SEQUENCE[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="text-sm text-muted-foreground transition hover:text-[var(--brand-primary)]"
        >
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="text-sm font-medium text-[var(--brand-primary)]"
        >
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

export function DocOverview() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Overview
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        RafikiAPI is a vendor-first HTTP API for SMS delivery, receipts, and account operations.
        All examples use JSON over TLS; authenticate with your vendor API key on every request.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold tracking-tight text-foreground">
        Base URL
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-[var(--docs-code-bg)] p-4 font-mono text-sm text-[var(--docs-code-fg)]">
        https://api.rafiki.example.com
      </pre>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Replace with the hostname your onboarding team provides. The same base path is used across
        sandbox and production; keys determine environment.
      </p>
      <DocPager slug="overview" />
    </article>
  );
}

export function DocQuickstart() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Quickstart
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Create a key in the vendor dashboard, then send a test SMS in under a minute.
      </p>
      <ol className="mt-6 list-decimal space-y-3 pl-5 text-muted-foreground leading-relaxed">
        <li>Log in to the vendor dashboard and create an API key.</li>
        <li>
          Add <code className="font-mono text-[var(--brand-primary)]">X-API-Key</code> to every
          request.
        </li>
        <li>
          Call <code className="font-mono">POST /v1/vendor/send-sms</code> with E.164 phone and
          message body.
        </li>
      </ol>
      <DocPager slug="quickstart" />
    </article>
  );
}

export function DocAuthentication() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Authentication
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Send your vendor secret using the <code className="font-mono">X-API-Key</code> header. Keys
        are rotatable in the dashboard; old keys can be revoked instantly.
      </p>
      <div className="mt-8">
        <CodeBlock
          tabs={["curl", "node"]}
          examples={{
            curl: `curl -sS https://api.rafiki.example.com/v1/vendor/balance \\\n  -H "X-API-Key: sk_vendor_xxx"`,
            node: `const res = await fetch("https://api.rafiki.example.com/v1/vendor/balance", {\n  headers: { "X-API-Key": process.env.RAFIKI_API_KEY! },\n});\nconsole.log(await res.json());`,
          }}
        />
      </div>
      <DocPager slug="authentication" />
    </article>
  );
}

export function DocErrors() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Error handling
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Errors return JSON with a machine-readable <code className="font-mono">code</code> and human{" "}
        <code className="font-mono">message</code>. Retry 429 and 5xx with exponential backoff.
      </p>
      <pre className="mt-8 overflow-x-auto rounded-lg border border-border bg-[var(--docs-code-bg)] p-4 font-mono text-sm text-[var(--docs-code-fg)]">
        {`{\n  "error": {\n    "code": "invalid_sender",\n    "message": "Sender ID not registered for this vendor."\n  }\n}`}
      </pre>
      <DocPager slug="errors" />
    </article>
  );
}

const SEND_SMS_CODE = {
  curl: `curl -X POST "https://api.rafiki.example.com/v1/vendor/send-sms" \\
  -H "X-API-Key: sk_vendor_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"phone":"255712345678","message":"Hello","source_address":"MYBRAND"}'`,
  node: `await fetch("https://api.rafiki.example.com/v1/vendor/send-sms", {\n  method: "POST",\n  headers: {\n    "X-API-Key": process.env.RAFIKI_API_KEY!,\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({\n    phone: "255712345678",\n    message: "Hello",\n    source_address: "MYBRAND",\n  }),\n});`,
  python: `import os, requests\nr = requests.post(\n  "https://api.rafiki.example.com/v1/vendor/send-sms",\n  headers={"X-API-Key": os.environ["RAFIKI_API_KEY"]},\n  json={\n    "phone": "255712345678",\n    "message": "Hello",\n    "source_address": "MYBRAND",\n  },\n)\nprint(r.json())`,
  php: `<?php\n$key = getenv("RAFIKI_API_KEY");\n$payload = json_encode([\n  "phone" => "255712345678",\n  "message" => "Hello",\n  "source_address" => "MYBRAND",\n]);\n// Use your HTTP client of choice — shown condensed for docs.`,
};

export function DocSendSms() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Send a single SMS
      </h1>
      <p className="mt-3 text-muted-foreground">
        Delivers one message to a single E.164 number. Ideal for OTPs and transactional sends.
      </p>
      <div className="mt-8 space-y-6">
        <Endpoint
          method="POST"
          path="/v1/vendor/send-sms"
          description="Send to a single recipient"
        />
        <div className="flex flex-wrap items-center gap-3">
          <TryConsole />
        </div>
        <CodeBlock tabs={["curl", "node", "python", "php"]} examples={SEND_SMS_CODE} />
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Parameters</h2>
          <div className="mt-4">
            <ParamTable
              params={[
                {
                  name: "phone",
                  type: "string",
                  required: true,
                  description: "Destination in E.164 format",
                },
                {
                  name: "message",
                  type: "string",
                  required: true,
                  description: "GSM-7 or UCS-2 body; split long messages per carrier rules",
                },
                {
                  name: "source_address",
                  type: "string",
                  required: false,
                  description: "Registered sender ID for this vendor",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <DocPager slug="send-sms" />
    </article>
  );
}

export function DocBulkSms() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Send bulk SMS
      </h1>
      <p className="mt-3 text-muted-foreground">
        Batch many recipients in one request; the platform fans out to workers and reports
        per-message IDs for tracking.
      </p>
      <div className="mt-8">
        <Endpoint method="POST" path="/v1/vendor/send-bulk-sms" />
      </div>
      <DocPager slug="bulk-sms" />
    </article>
  );
}

export function DocDeliveryReports() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Delivery reports
      </h1>
      <p className="mt-3 text-muted-foreground">
        Pull DLR status for messages you have sent. Use message IDs returned from send APIs.
      </p>
      <div className="mt-8">
        <Endpoint
          method="GET"
          path="/v1/vendor/delivery-reports"
          description="Query parameters: message_id, range, pagination cursors"
        />
      </div>
      <DocPager slug="delivery-reports" />
    </article>
  );
}

export function DocOtpGenerate() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Generate OTP
      </h1>
      <p className="mt-3 text-muted-foreground">Creates a one-time code and sends via SMS.</p>
      <div className="mt-8">
        <Endpoint method="POST" path="/v1/otp/generate" />
      </div>
      <DocPager slug="otp-generate" />
    </article>
  );
}

export function DocOtpVerify() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Verify OTP
      </h1>
      <p className="mt-3 text-muted-foreground">
        Validates a code for a phone number within the allowed time window.
      </p>
      <div className="mt-8">
        <Endpoint method="POST" path="/v1/otp/verify" />
      </div>
      <DocPager slug="otp-verify" />
    </article>
  );
}

export function DocBalance() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Check balance
      </h1>
      <p className="mt-3 text-muted-foreground">Returns prepaid credits or postpaid snapshot.</p>
      <div className="mt-8">
        <Endpoint method="GET" path="/v1/vendor/balance" />
      </div>
      <DocPager slug="balance" />
    </article>
  );
}

export function DocSenderNames() {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
        Sender names
      </h1>
      <p className="mt-3 text-muted-foreground">
        Lists sender IDs approved for your vendor account per regulator rules.
      </p>
      <div className="mt-8">
        <Endpoint method="GET" path="/v1/vendor/sender-names" />
      </div>
      <DocPager slug="sender-names" />
    </article>
  );
}

export function renderDocPage(slug: DocSlug) {
  switch (slug) {
    case "overview":
      return <DocOverview />;
    case "quickstart":
      return <DocQuickstart />;
    case "authentication":
      return <DocAuthentication />;
    case "errors":
      return <DocErrors />;
    case "send-sms":
      return <DocSendSms />;
    case "bulk-sms":
      return <DocBulkSms />;
    case "delivery-reports":
      return <DocDeliveryReports />;
    case "otp-generate":
      return <DocOtpGenerate />;
    case "otp-verify":
      return <DocOtpVerify />;
    case "balance":
      return <DocBalance />;
    case "sender-names":
      return <DocSenderNames />;
    default:
      return null;
  }
}
