"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";

interface WordRotateProps {
  words: string[];
  className?: string;
  interval?: number;
}

/**
 * WordRotate - 21st.dev-style cycling word animation in hero headlines.
 */
export function WordRotate({ words, className, interval = 2500 }: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setShow(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={cn("inline-block transition-all duration-300", className)}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      {words[index]}
    </span>
  );
}
