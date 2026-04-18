"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaAws } from "react-icons/fa";
import {
  SiCloudflare,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiJira,
  SiLinear,
  SiNotion,
  SiPostgresql,
  SiRedis,
  SiSlack,
  SiStripe,
  SiSupabase,
  SiTwilio,
  SiVercel,
} from "react-icons/si";

export interface IntegrationLogoItem {
  id: string;
  label: string;
  icon: ReactNode;
}

const ROW_A: IntegrationLogoItem[] = [
  { id: "figma", label: "Figma", icon: <SiFigma className="h-7 w-7" /> },
  { id: "github", label: "GitHub", icon: <SiGithub className="h-7 w-7" /> },
  { id: "stripe", label: "Stripe", icon: <SiStripe className="h-7 w-7" /> },
  { id: "aws", label: "AWS", icon: <FaAws className="h-7 w-7" /> },
  { id: "slack", label: "Slack", icon: <SiSlack className="h-7 w-7" /> },
  { id: "notion", label: "Notion", icon: <SiNotion className="h-7 w-7" /> },
  { id: "vercel", label: "Vercel", icon: <SiVercel className="h-7 w-7" /> },
  {
    id: "postgres",
    label: "PostgreSQL",
    icon: <SiPostgresql className="h-7 w-7" />,
  },
];

const ROW_B: IntegrationLogoItem[] = [
  { id: "linear", label: "Linear", icon: <SiLinear className="h-7 w-7" /> },
  { id: "twilio", label: "Twilio", icon: <SiTwilio className="h-7 w-7" /> },
  {
    id: "supabase",
    label: "Supabase",
    icon: <SiSupabase className="h-7 w-7" />,
  },
  { id: "docker", label: "Docker", icon: <SiDocker className="h-7 w-7" /> },
  {
    id: "firebase",
    label: "Firebase",
    icon: <SiFirebase className="h-7 w-7" />,
  },
  { id: "jira", label: "Jira", icon: <SiJira className="h-7 w-7" /> },
  { id: "redis", label: "Redis", icon: <SiRedis className="h-7 w-7" /> },
  {
    id: "cloudflare",
    label: "Cloudflare",
    icon: <SiCloudflare className="h-7 w-7" />,
  },
];

const ROW_C: IntegrationLogoItem[] = [
  ...ROW_A.slice(0, 4),
  ...ROW_B.slice(0, 4),
];

const MARQUEE_ROWS: { items: IntegrationLogoItem[]; direction: "left" | "right" }[] =
  [
    { items: ROW_A, direction: "left" },
    { items: ROW_B, direction: "right" },
    { items: ROW_C, direction: "left" },
  ];

interface MarqueeRowProps {
  items: IntegrationLogoItem[];
  direction: "left" | "right";
  animate: boolean;
}

function LogoCard({ item }: { item: IntegrationLogoItem }) {
  return (
    <div
      className="flex h-20 w-[120px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card px-2 text-foreground opacity-60 grayscale transition duration-[250ms] ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0"
    >
      <span className="text-brand" aria-hidden>
        {item.icon}
      </span>
      <span className="line-clamp-1 text-center text-[10px] font-medium leading-tight text-muted-foreground">
        {item.label}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction, animate }: MarqueeRowProps) {
  const trackClass =
    direction === "left"
      ? animate
        ? "marquee-left"
        : "marquee-left marquee-left--static"
      : animate
        ? "marquee-right"
        : "marquee-right marquee-right--static";

  return (
    <div className="marquee-wrapper relative py-2">
      <div className={`flex w-max gap-3 ${trackClass}`}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 gap-3">
            {items.map((item) => (
              <LogoCard key={`${item.id}-${dup}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

  const maskStyle = {
    maskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
  } as const;

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={maskStyle}
      role="region"
      aria-label="Integration partners"
    >
      <motion.div
        className="space-y-2 md:space-y-3"
        style={{
          transformPerspective: 1000,
          rotateX: prefersReducedMotion ? 0 : rotateX,
        }}
      >
        {MARQUEE_ROWS.map((row, index) => (
          <div
            key={`marquee-row-${row.direction}-${index}`}
            className={index === 2 ? "hidden md:block" : "block"}
          >
            <MarqueeRow
              items={row.items}
              direction={row.direction}
              animate={!prefersReducedMotion}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
