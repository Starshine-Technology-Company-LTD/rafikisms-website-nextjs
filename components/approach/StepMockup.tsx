"use client";

import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

const E = [0.22, 1, 0.36, 1] as const;

const CHROME_DOTS = ["#D1D5DB", "#B8B8B4", "#9CA3AF"] as const;

type MockupType = "onboarding" | "code" | "launch" | "analytics";

export function StepMockup({ type }: { type: MockupType }) {
  const shell: CSSProperties = {
    background: "#ffffff",
    border: "0.5px solid #E5E5E0",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow:
      "0 10px 56px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",
    width: "100%",
    maxWidth: 520,
    minWidth: 260,
  };

  const bar = (url: string) => (
    <div
      style={{
        background: "#F8F7F4",
        borderBottom: "0.5px solid #E5E5E0",
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {CHROME_DOTS.map((c) => (
        <div
          key={c}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: c,
          }}
        />
      ))}
      <span
        style={{
          marginLeft: 10,
          fontSize: 11,
          color: "#9CA3AF",
          fontFamily: "monospace",
        }}
      >
        {url}
      </span>
    </div>
  );

  const check = (
    <span
      style={{
        width: 17,
        height: 17,
        borderRadius: "50%",
        background: "#0D94881A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="8" height="6" viewBox="0 0 7 5" fill="none" aria-hidden>
        <path
          d="M1 2.5L2.5 4L6 1"
          stroke="#0D9488"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );

  const label = (text: string) => (
    <p
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#9CA3AF",
        marginBottom: 7,
      }}
    >
      {text}
    </p>
  );

  const field = (value: string, done = true) => (
    <div style={{ marginBottom: 13 }}>
      <div
        style={{
          background: "#F8F7F4",
          border: "0.5px solid #E5E5E0",
          borderRadius: 10,
          padding: "11px 14px",
          fontSize: 13,
          color: "#374151",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {value}
        {done ? check : null}
      </div>
    </div>
  );

  const btn = (text: string, outline = false) => (
    <div
      style={{
        background: outline ? "transparent" : "#0D9488",
        border: outline ? "0.5px solid #0D948850" : "none",
        color: outline ? "#0D9488" : "#ffffff",
        borderRadius: 11,
        padding: "13px 18px",
        fontSize: 13,
        fontWeight: 500,
        textAlign: "center",
        marginTop: 18,
        cursor: "default",
      }}
    >
      {text}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.5, delay: 0.1, ease: E }}
        style={shell}
      >
        {type === "onboarding" && (
          <>
            {bar("rafiki.tz / onboarding")}
            <div style={{ padding: "22px 22px 24px" }}>
              {label("Business name")}
              {field("Acme Tanzania Ltd")}
              {label("Sender ID")}
              {field("ACMETZ")}
              {label("Operator")}
              {field("Vodacom + Airtel + Tigo")}
              {label("Message type")}
              {field("Transactional", false)}
              {btn("Submit for review ->")}
            </div>
          </>
        )}

        {type === "code" && (
          <>
            {bar("rafiki.tz / sandbox")}
            <div style={{ padding: "22px 22px 24px" }}>
              <div
                style={{
                  background: "#0F1117",
                  borderRadius: 12,
                  padding: 18,
                  fontFamily: "monospace",
                  fontSize: 12,
                  lineHeight: 1.95,
                }}
              >
                <div style={{ color: "#6B7280", marginBottom: 10, fontSize: 10 }}>
                  SendSMS.php
                </div>
                <div>
                  <span style={{ color: "#6B7280" }}>use </span>
                  <span style={{ color: "#0D9488" }}>Rafiki\SMS\Facades\SMS</span>
                  <span style={{ color: "#9CA3AF" }}>;</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ color: "#E5E7EB" }}>SMS::</span>
                  <span style={{ color: "#0D9488" }}>send</span>
                  <span style={{ color: "#E5E7EB" }}>({"["})</span>
                </div>
                {[
                  ["'to'", "'+255712345678'"],
                  ["'message'", "'Habari! Akaunti...'"],
                  ["'sender'", "'RAFIKI'"],
                ].map(([key, val]) => (
                  <div key={key} style={{ paddingLeft: 20 }}>
                    <span style={{ color: "#E5E7EB" }}>{key} </span>
                    <span style={{ color: "#9CA3AF" }}>{"=> "}</span>
                    <span style={{ color: "#D1D5DB" }}>{val}</span>
                    <span style={{ color: "#9CA3AF" }}>,</span>
                  </div>
                ))}
                <div>
                  <span style={{ color: "#E5E7EB" }}>]);</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 12,
                      background: "#0D9488",
                      marginLeft: 4,
                      borderRadius: 1,
                      verticalAlign: "middle",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  border: "0.5px solid #0D948830",
                  borderRadius: 9,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#0D94880A",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#0D9488",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      color: "#6B7280",
                      fontFamily: "monospace",
                    }}
                  >
                    DLR received
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    color: "#0D9488",
                    fontWeight: 600,
                    fontFamily: "monospace",
                  }}
                >
                  DELIVRD
                </span>
              </div>
            </div>
          </>
        )}

        {type === "launch" && (
          <>
            {bar("rafiki.tz / sender-id")}
            <div style={{ padding: "22px 22px 24px" }}>
              {label("Sender ID approval status")}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 300,
                  color: "#0A0A0A",
                  marginBottom: 18,
                }}
              >
                RAFISMSTZ
              </div>
              {[
                { op: "Vodacom", pct: 100 },
                { op: "Airtel", pct: 100 },
                { op: "Tigo", pct: 65 },
                { op: "TTCL", pct: 20 },
              ].map(({ op, pct }) => (
                <div key={op} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: "#374151" }}>{op}</span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        color:
                          pct === 100 ? "#0D9488" : pct > 50 ? "#6B7280" : "#9CA3AF",
                      }}
                    >
                      {pct === 100 ? "Approved" : pct > 50 ? "In review" : "Queued"}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: "#F3F4F6",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, ease: E }}
                      style={{
                        height: "100%",
                        background: pct === 100 ? "#0D9488" : "#D1D5DB",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              ))}
              {btn("First message delivered OK", true)}
            </div>
          </>
        )}

        {type === "analytics" && (
          <>
            {bar("rafiki.tz / analytics")}
            <div style={{ padding: "22px 22px 24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div>
                  {label("Delivery rate")}
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 300,
                      color: "#0A0A0A",
                      lineHeight: 1,
                    }}
                  >
                    99.7%
                  </div>
                </div>
                <span
                  style={{
                    background: "#0D94881A",
                    borderRadius: 20,
                    padding: "5px 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#0D9488",
                  }}
                >
                  ^ 2.1% this week
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 5,
                  height: 84,
                  marginBottom: 16,
                }}
              >
                {[78, 91, 85, 97, 88, 94, 99].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: E }}
                    style={{
                      flex: 1,
                      background: i === 6 ? "#0D9488" : "#0D94882A",
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  ["Sent", "48,291"],
                  ["Delivered", "48,148"],
                  ["Cost", "TZS 1.2M"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    style={{
                      background: "#F8F7F4",
                      borderRadius: 10,
                      padding: "10px 8px",
                      textAlign: "center",
                      border: "0.5px solid #E5E5E0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        color: "#9CA3AF",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {l}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#0A0A0A",
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
