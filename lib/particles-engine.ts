import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

/** Single shared init — avoids races when multiple <Sparkles> mount together. */
let engineReady: Promise<void> | null = null;

export function ensureParticlesEngine(): Promise<void> {
  if (!engineReady) {
    engineReady = initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }
  return engineReady;
}
