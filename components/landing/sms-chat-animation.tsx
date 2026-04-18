"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck, Signal, BatteryFull, Wifi } from "lucide-react";
import { usePrefersReducedMotion } from "./use-media-query";

type Bubble = {
  id: number;
  side: "in" | "out";
  text: string;
  time: string;
  state: 0 | 1 | 2 | 3; // 0 none | 1 single gray | 2 double gray | 3 double teal
};

const SCRIPT: Omit<Bubble, "id" | "state">[] = [
  { side: "out", text: "Habari! Your OTP is 482 109.", time: "09:14" },
  { side: "in", text: "Asante! Nimepokea.", time: "09:14" },
  { side: "out", text: "Payment of TSH 45,000 confirmed.", time: "09:15" },
  { side: "in", text: "Karibu tena, Rafiki!", time: "09:15" },
];

export function SmsChatAnimation() {
  const reduceMotion = usePrefersReducedMotion();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [time, setTime] = useState("9:41");
  const [showNotif, setShowNotif] = useState(false);

  // live clock
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
      );
    };
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, []);

  // reduced-motion: render static final frame
  useEffect(() => {
    if (reduceMotion) {
      setBubbles(
        SCRIPT.map((b, i) => ({
          ...b,
          id: i,
          state: b.side === "out" ? 3 : 0,
        }))
      );
      return;
    }

    let cancelled = false;
    let idx = 0;

    const next = async () => {
      while (!cancelled) {
        // pre-typing
        setTyping(true);
        await wait(900);
        if (cancelled) return;
        setTyping(false);

        // push bubble
        const i = idx % SCRIPT.length;
        const entry: Bubble = { ...SCRIPT[i], id: Date.now() + idx, state: SCRIPT[i].side === "out" ? 1 : 0 };
        setBubbles((prev) => clipLast(prev, entry));

        // outbound tick animation
        if (entry.side === "out") {
          await wait(600);
          if (cancelled) return;
          setBubbles((p) => p.map((b) => (b.id === entry.id ? { ...b, state: 2 } : b)));
          await wait(700);
          if (cancelled) return;
          setBubbles((p) => p.map((b) => (b.id === entry.id ? { ...b, state: 3 } : b)));
        }

        idx++;

        // every 3rd message drop a notification
        if (idx % 3 === 0) {
          setShowNotif(true);
          await wait(2400);
          if (cancelled) return;
          setShowNotif(false);
        }

        await wait(1500);
      }
    };

    next();
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* ambient teal halo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 40%, rgba(20,184,166,0.18), transparent 70%)",
        }}
      />

      {/* drop-down notification banner */}
      <AnimatePresence>
        {showNotif && !reduceMotion && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="surface-invert absolute top-2 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-foreground text-background shadow-xl text-[11px]"
          >
            <span className="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </span>
            <span className="font-medium">SMS delivered</span>
            <span className="opacity-60">+255 •• 342</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* phone */}
      <div className="relative w-[240px] h-[460px] sm:w-[260px] sm:h-[500px] lg:w-[300px] lg:h-[580px]">
        {/* side buttons */}
        <div className="absolute -left-[3px] top-20 w-[3px] h-10 rounded-l bg-foreground/30" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-16 rounded-l bg-foreground/30" />
        <div className="absolute -right-[3px] top-28 w-[3px] h-20 rounded-r bg-foreground/30" />

        {/* body */}
        <div className="absolute inset-0 rounded-[40px] border border-foreground/10 bg-gradient-to-b from-[#0F172A] to-[#0B1220] shadow-[0_30px_80px_-30px_rgba(15,23,42,0.55)] overflow-hidden">
          {/* dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-10" />

          {/* status bar */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-3 pb-1 text-white text-[10px] font-medium">
            <span>{time}</span>
            <span className="flex items-center gap-1">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <BatteryFull className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* chat area (white) */}
          <div className="absolute inset-x-0 top-8 bottom-0 rounded-t-[36px] bg-white flex flex-col">
            {/* chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-foreground/5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-strong flex items-center justify-center text-white text-xs font-semibold ring-2 ring-brand/20">
                  R
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-foreground truncate">Rafiki SMS</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={typing ? "typing" : "online"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] text-brand"
                  >
                    {typing ? "typing…" : "online"}
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="text-[10px] text-muted-foreground">+255</span>
            </div>

            {/* bubbles scroll area */}
            <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col justify-end gap-2">
              <AnimatePresence initial={false}>
                {bubbles.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.96, x: b.side === "in" ? -10 : 10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    className={`flex ${b.side === "in" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11px] leading-snug shadow-sm ${
                        b.side === "in"
                          ? "bg-foreground/[0.05] text-foreground rounded-bl-md"
                          : "bg-gradient-to-br from-brand to-brand-strong text-white rounded-br-md"
                      }`}
                    >
                      <div>{b.text}</div>
                      <div className={`mt-1 flex items-center justify-end gap-1 text-[9px] ${b.side === "in" ? "text-muted-foreground" : "text-white/80"}`}>
                        <span>{b.time}</span>
                        {b.side === "out" && (
                          <span className="inline-flex items-center">
                            {b.state === 1 && <Check className="w-3 h-3" strokeWidth={2.5} />}
                            {b.state === 2 && <CheckCheck className="w-3.5 h-3.5" strokeWidth={2.5} />}
                            {b.state === 3 && <CheckCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.8} />}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div
                    key="typing-ind"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-2xl rounded-bl-md bg-foreground/[0.05] px-3 py-2 flex items-center gap-1">
                      <Dot delay={0} />
                      <Dot delay={0.15} />
                      <Dot delay={0.3} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* bottom bar */}
            <div className="px-3 py-3 border-t border-foreground/5 flex items-center gap-2">
              <div className="flex-1 h-8 rounded-full bg-foreground/[0.05] px-3 flex items-center text-[10px] text-muted-foreground">
                Message
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-strong flex items-center justify-center"
                aria-label="Send"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13" />
                  <path d="m22 2-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>

            {/* home bar */}
            <div className="pb-2 flex justify-center">
              <div className="w-24 h-1 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-brand"
      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function clipLast(prev: Bubble[], next: Bubble): Bubble[] {
  const max = 4;
  const arr = [...prev, next];
  return arr.slice(Math.max(0, arr.length - max));
}
