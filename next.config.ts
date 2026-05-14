import type { NextConfig } from "next";

const DEFAULT_LAN = "192.168.1.109";

/** Next compares Origin **hostname** only - full URLs like http://host:3000 often fail matching. */
function normalizeAllowEntry(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  try {
    if (/^https?:\/\//i.test(s)) {
      return new URL(s).hostname.toLowerCase();
    }
  } catch {
    /* fall through */
  }
  return s.replace(/^https?:\/\//i, "").split("/")[0]?.split(":")[0]?.toLowerCase() ?? null;
}

function buildAllowedDevOrigins(): string[] {
  const fromEnv = process.env.NEXT_DEV_LAN_HOST ?? DEFAULT_LAN;
  const extras = process.env.NEXT_DEV_EXTRA_ORIGINS?.split(",") ?? [];
  const merged = new Set<string>(["localhost", "127.0.0.1", fromEnv, ...extras]);

  const out = new Set<string>();
  for (const entry of merged) {
    const n = normalizeAllowEntry(entry);
    if (n) out.add(n);
  }
  return [...out];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: buildAllowedDevOrigins(),
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@tsparticles/react",
      "react-icons",
    ],
  },
};

export default nextConfig;
