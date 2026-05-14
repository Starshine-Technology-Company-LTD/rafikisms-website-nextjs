"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { cn } from "@/lib/utils";
import { ensureParticlesEngine } from "@/lib/particles-engine";

export type SparklesProps = {
  className?: string;
  color?: string;
  background?: string;
  density?: number;
  opacity?: number;
  size?: number;
  speed?: number;
  hover?: boolean;
  mousemove?: boolean;
  reducedMotion?: boolean;
};

export function Sparkles({
  className,
  color = "var(--brand-primary)",
  background = "transparent",
  density = 400,
  opacity = 0.45,
  size = 1,
  speed = 1,
  hover = true,
  mousemove = true,
  reducedMotion = false,
}: SparklesProps) {
  const particlesId = useId().replace(/:/g, "");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    ensureParticlesEngine()
      .then(() => {
        if (!cancelled) {
          setReady(true);
        }
      })
      .catch(() => {
        /* ignore - canvas stays blank */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: reducedMotion ? 30 : 60,
      detectRetina: true,
      background: {
        color: { value: background },
      },
      particles: {
        number: {
          value: Math.min(900, Math.max(40, Math.round(density))),
          density: { enable: true, width: 800, height: 800 },
        },
        color: { value: color },
        opacity: {
          value: { min: opacity * 0.35, max: opacity },
          animation: {
            enable: !reducedMotion,
            speed: reducedMotion ? 0 : 0.8,
            sync: false,
          },
        },
        shape: { type: "circle" },
        size: {
          value: { min: size * 0.45, max: size * 2.2 },
        },
        move: {
          enable: !reducedMotion,
          speed: reducedMotion ? 0 : speed * 0.35,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        links: { enable: false },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: hover && !reducedMotion,
            mode: mousemove ? "grab" : "bubble",
          },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 140,
            links: { blink: false, consent: false, opacity: 0 },
          },
          bubble: {
            distance: 120,
            size: 2,
            duration: 0.4,
            opacity: 0.4,
          },
        },
      },
    }),
    [
      background,
      color,
      density,
      hover,
      mousemove,
      opacity,
      reducedMotion,
      size,
      speed,
    ]
  );

  if (!ready) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0", className)}
        aria-hidden
      />
    );
  }

  return (
    <Particles
      className={cn("pointer-events-none absolute inset-0", className)}
      options={options}
      id={particlesId}
    />
  );
}
