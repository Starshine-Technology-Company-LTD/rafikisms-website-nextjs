import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DOC_SEQUENCE,
  type DocSlug,
  renderDocPage,
} from "@/lib/docs-pages";

const ROUTE_SLUGS = DOC_SEQUENCE.filter((d) => d.slug !== "overview").map(
  (d) => d.slug
);

const isDocSlug = (s: string): s is DocSlug =>
  ROUTE_SLUGS.includes(s as DocSlug);

export function generateStaticParams() {
  return ROUTE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = DOC_SEQUENCE.find((d) => d.slug === slug);
  if (!entry) return { title: "Documentation | Rafiki SMS" };
  return {
    title: `${entry.title} | RafikiAPI Docs`,
    description: `RafikiAPI - ${entry.title}. Enterprise SMS API documentation.`,
  };
}

export default async function DocSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isDocSlug(slug)) notFound();

  return renderDocPage(slug);
}
