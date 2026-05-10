"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";
import { ConnectionArcs } from "./ConnectionArcs";
import { projectGlobe, snapCoord } from "./globe-project";
import { usePrefersReducedMotion } from "@/components/landing/use-media-query";

const DSM = projectGlobe(-6.7924, 39.2083);

function GlobeDots({
  dots,
}: {
  dots: readonly { x: number; y: number; r: number; o: number }[];
}) {
  return (
    <g className="text-neutral-900 dark:text-neutral-100">
      {dots.map((d, i) => (
        <circle
          key={`g-${i}`}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="currentColor"
          opacity={d.o}
        />
      ))}
    </g>
  );
}

function AfricaDots() {
  const extra = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    for (let lat = -34; lat <= 38; lat += 4.5) {
      for (let lon = -20; lon <= 52; lon += 4.5) {
        if (lat > -20 && lat < 40 && lon > -20 && lon < 45) {
          const p = projectGlobe(lat, lon);
          const dx = p.x - 200;
          const dy = p.y - 200;
          if (dx * dx + dy * dy <= 180 * 180 * 0.98) {
            list.push({ x: snapCoord(p.x), y: snapCoord(p.y) });
          }
        }
      }
    }
    return list;
  }, []);

  return (
    <g className="text-neutral-900/55 dark:text-white/45">
      {extra.map((p, i) => (
        <circle
          key={`af-${i}`}
          cx={p.x}
          cy={p.y}
          r={snapCoord(1.1, 3)}
          fill="currentColor"
        />
      ))}
    </g>
  );
}

function TanzaniaPin({
  glowColor,
  reducedMotion,
}: {
  glowColor: string;
  reducedMotion: boolean;
}) {
  const { x, y } = DSM;
  const labelX = snapCoord(x + 9);
  const labelY = snapCoord(y - 10);
  return (
    <g>
      {!reducedMotion && (
        <>
          <motion.circle
            cx={x}
            cy={y}
            r={10}
            fill="none"
            stroke={glowColor}
            strokeWidth={1.5}
            animate={{ r: [10, 26], opacity: [0.75, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx={x}
            cy={y}
            r={10}
            fill="none"
            stroke={glowColor}
            strokeWidth={1}
            animate={{ r: [10, 20], opacity: [0.55, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.55,
            }}
          />
        </>
      )}
      <circle cx={x} cy={y} r={5} fill={glowColor} />
      <text
        x={labelX}
        y={labelY}
        fill={glowColor}
        fontSize={10}
        fontWeight={600}
        className="font-sans"
      >
        Dar es Salaam
      </text>
    </g>
  );
}

export function EarthGlobe() {
  const reduceMotion = usePrefersReducedMotion();

  const glowColor = "var(--brand-primary)";

  const dots = useMemo(() => {
    const r = 180;
    const cx = 200;
    const cy = 200;
    const out: { x: number; y: number; r: number; o: number }[] = [];
    for (let lat = -78; lat <= 78; lat += 7.5) {
      const latRad = (lat * Math.PI) / 180;
      const shade = 0.55 + 0.45 * Math.max(0, Math.cos(latRad));
      for (let lon = -178; lon <= 178; lon += 7.5) {
        const lonRad = (lon * Math.PI) / 180;
        const x = cx + r * Math.cos(latRad) * Math.sin(lonRad);
        const y = cy - r * Math.sin(latRad);
        const dx = x - cx;
        const dy = y - cy;
        if (dx * dx + dy * dy <= r * r * 0.992) {
          out.push({
            x: snapCoord(x),
            y: snapCoord(y),
            r: snapCoord(0.9, 3),
            o: snapCoord(0.35 * shade, 4),
          });
        }
      }
    }
    return out;
  }, []);

  return (
    <div
      className="
        rafiki-globe relative mx-auto h-[240px] w-[240px]
        min-[375px]:h-[280px] min-[375px]:w-[280px]
        md:h-[340px] md:w-[340px]
        lg:h-[440px] lg:w-[440px]
      "
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--brand-primary), transparent 70%)`,
        }}
      />

      <motion.div
        className="rafiki-globe-ring absolute inset-[-10px] rounded-full border-2 md:inset-[-12px]"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="relative z-[2] h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <GlobeDots dots={dots} />
        <AfricaDots />
        <ConnectionArcs color={glowColor} />
        <TanzaniaPin glowColor={glowColor} reducedMotion={reduceMotion} />
      </svg>

      <Sparkles
        className="absolute inset-0 z-[1] block rounded-full opacity-90 dark:hidden"
        color={glowColor}
        background="transparent"
        density={72}
        opacity={0.22}
        size={0.75}
        speed={0.75}
        hover={false}
        mousemove={false}
        reducedMotion={reduceMotion}
      />
      <Sparkles
        className="absolute inset-0 z-[1] hidden rounded-full opacity-90 dark:block"
        color={glowColor}
        background="transparent"
        density={100}
        opacity={0.32}
        size={1}
        speed={0.75}
        hover={false}
        mousemove={false}
        reducedMotion={reduceMotion}
      />
    </div>
  );
}
