"use client";

import { motion } from "framer-motion";
import { projectGlobe, snapCoord } from "./globe-project";
import { usePrefersReducedMotion } from "@/components/landing/use-media-query";

const DSM = projectGlobe(-6.7924, 39.2083);

const DESTINATIONS = [
  { id: "nairobi", lat: -1.2921, lon: 36.8219, label: "Nairobi" },
  { id: "dubai", lat: 25.2048, lon: 55.2708, label: "Dubai" },
  { id: "london", lat: 51.5074, lon: -0.1278, label: "London" },
  { id: "lagos", lat: 6.5244, lon: 3.3792, label: "Lagos" },
] as const;

function quadPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  bend: number
) {
  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2 - bend;
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

type ConnectionArcsProps = {
  color: string;
};

export function ConnectionArcs({ color }: ConnectionArcsProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <g aria-hidden>
      {DESTINATIONS.map((city, i) => {
        const end = projectGlobe(city.lat, city.lon);
        const bend = 36 + i * 6;
        const d = quadPath(DSM, end, bend);
        const dur = `${3.2 + i * 0.35}s`;

        return (
          <g key={city.id}>
            <motion.path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={1.25}
              strokeOpacity={0.55}
              strokeDasharray="4 8"
              vectorEffect="non-scaling-stroke"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={
                reduceMotion ? { opacity: 0.55 } : { pathLength: 1, opacity: 1 }
              }
              transition={{
                pathLength: { duration: 1.6, delay: 0.12 * i, ease: "easeOut" },
                opacity: { duration: 0.5, delay: 0.12 * i },
              }}
            />
            {!reduceMotion && (
              <circle r={3} fill={color}>
                <animateMotion
                  dur={dur}
                  repeatCount="indefinite"
                  rotate="auto"
                  path={d}
                />
              </circle>
            )}
            <text
              x={snapCoord(
                end.x + (city.id === "nairobi" ? -52 : city.id === "lagos" ? -34 : 6)
              )}
              y={snapCoord(
                end.y + (city.id === "dubai" ? -6 : city.id === "london" ? -8 : 4)
              )}
              fill={color}
              fontSize={9}
              fontWeight={600}
              opacity={0.85}
            >
              {city.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
