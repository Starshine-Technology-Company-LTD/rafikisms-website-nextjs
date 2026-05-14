const REVALIDATE_SEC = 300;

export type PublicBrandingPayload = {
  logo_url: string | null;
  favicon_url: string | null;
  sender_signature_url?: string | null;
  sender_stamp_url?: string | null;
};

export type ApiTeamMember = {
  id: number;
  name: string;
  role: string;
  image_url: string | null;
};

export type ApiPricingRow = {
  id: number;
  name: string | null;
  min_volume: number;
  max_volume: number | null;
  price_per_sms: string | number;
  sort_order?: number;
  max_cost?: number | null;
  formatted_max_cost?: string | null;
};

export type PricingTierView = {
  name: string;
  tagline: string;
  minVolume: number;
  maxVolume: number | null;
  pricePerSms: number;
  highlights: string[];
  popular: boolean;
};

export type TeamMemberView = {
  id: number;
  name: string;
  role: string;
  initials: string;
  imageUrl: string | null;
};

type SuccessEnvelope<T> = {
  success?: boolean;
  data?: T;
};

function getApiBaseUrl(): string | null {
  const raw =
    process.env.LANDING_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const a = parts[0][0];
  const b = parts[parts.length - 1][0];
  return `${a}${b}`.toUpperCase();
}

function toNumber(v: string | number): number {
  if (typeof v === "number") return v;
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function mapPricingRow(row: ApiPricingRow, idx: number): PricingTierView {
  const name = (row.name && row.name.trim()) || `Tier ${idx + 1}`;
  const min = row.min_volume;
  const max = row.max_volume ?? null;
  const price = toNumber(row.price_per_sms);
  const band =
    max === null
      ? `${min.toLocaleString()}+ SMS/month`
      : `${min.toLocaleString()} - ${max.toLocaleString()} SMS/month`;
  const cap =
    row.formatted_max_cost && row.max_volume != null
      ? `Up to ${row.formatted_max_cost} at this band`
      : null;
  const highlights = [
    band,
    cap ?? `${price.toLocaleString()} TSH per SMS at this tier`,
    "API access, delivery reports, and sender ID governance",
  ];
  const slug = name.toLowerCase();
  const popular = slug.includes("professional");
  return {
    name,
    tagline:
      max === null
        ? `${min.toLocaleString()}+ SMS/month and beyond.`
        : `Monthly band ${min.toLocaleString()} - ${max.toLocaleString()} SMS.`,
    minVolume: min,
    maxVolume: max,
    pricePerSms: price,
    highlights,
    popular,
  };
}

async function getJson<T>(path: string): Promise<T | null> {
  const base = getApiBaseUrl();
  if (!base) return null;
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SEC },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchPublicBranding(): Promise<PublicBrandingPayload | null> {
  const json = await getJson<SuccessEnvelope<PublicBrandingPayload>>("/v1/public/branding");
  const d = json?.data;
  if (!d || typeof d !== "object") return null;
  return d;
}

export async function fetchPublicTeam(): Promise<TeamMemberView[] | null> {
  const json = await getJson<SuccessEnvelope<ApiTeamMember[]>>("/v1/teams");
  const rows = json?.data;
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    initials: initialsFromName(r.name),
    imageUrl: r.image_url,
  }));
}

export async function fetchPublicPricings(): Promise<PricingTierView[] | null> {
  const json = await getJson<SuccessEnvelope<ApiPricingRow[]>>("/v1/pricings");
  const rows = json?.data;
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const sorted = [...rows].sort((a, b) => {
    const ao = a.sort_order ?? 0;
    const bo = b.sort_order ?? 0;
    if (ao !== bo) return ao - bo;
    return a.min_volume - b.min_volume;
  });
  return sorted.map((row, idx) => mapPricingRow(row, idx));
}

export async function fetchLandingPublicData(): Promise<{
  branding: PublicBrandingPayload | null;
  team: TeamMemberView[] | null;
  pricings: PricingTierView[] | null;
}> {
  const [branding, team, pricings] = await Promise.all([
    fetchPublicBranding(),
    fetchPublicTeam(),
    fetchPublicPricings(),
  ]);
  return { branding, team, pricings };
}
