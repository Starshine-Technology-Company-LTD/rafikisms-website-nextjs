import type { Metadata } from "next";
import { DocOverview } from "@/lib/docs-pages";

export const metadata: Metadata = {
  title: "Overview · RafikiAPI Docs",
  description:
    "RafikiAPI documentation — SMS delivery, receipts, and vendor operations over HTTPS.",
};

export default function DocsPage() {
  return <DocOverview />;
}
