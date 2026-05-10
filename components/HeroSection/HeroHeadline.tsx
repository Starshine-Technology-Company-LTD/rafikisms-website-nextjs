"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedTypewriter({
  words,
  className,
  intervalMs = 2200,
}: {
  words: readonly string[];
  className?: string;
  intervalMs?: number;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [words.length, intervalMs]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[idx]}
        className={className}
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {words[idx]}
      </motion.span>
    </AnimatePresence>
  );
}
