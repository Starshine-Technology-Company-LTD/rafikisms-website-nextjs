"use client";

import { motion, AnimatePresence } from "framer-motion";

interface WipeOverlayProps {
  isWiping: boolean;
}

const WIPE_EASE = [0.77, 0, 0.18, 1] as const;

export function WipeOverlay({ isWiping }: WipeOverlayProps) {
  return (
    <AnimatePresence>
      {isWiping && (
        <motion.div
          key="wipe"
          initial={{ clipPath: "inset(0 100% 0 0%)" }}
          animate={{
            clipPath: [
              "inset(0 100% 0 0%)",
              "inset(0 0% 0 0%)",
              "inset(0 0% 0 100%)",
            ],
          }}
          transition={{
            duration: 0.62,
            ease: WIPE_EASE,
            times: [0, 0.48, 1],
          }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#0D9488",
            zIndex: 50,
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}
