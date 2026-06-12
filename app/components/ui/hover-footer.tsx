"use client";
import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPos, setMaskPos] = useState({ cx: "50%", cy: "50%" });

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setMaskPos({
      cx: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      cy: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        {hovered && (
          <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#80eeb4" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        )}
        <radialGradient id="revealMask" gradientUnits="userSpaceOnUse" r="20%" cx={maskPos.cx} cy={maskPos.cy}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#14b8a6] font-[helvetica] text-7xl font-bold dark:stroke-[#14b8a699] draw-stroke"
      >
        {text}
      </text>
      {hovered && (
        <text
          x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
          stroke="url(#textGradient)" strokeWidth="0.3"
          mask="url(#textMask)"
          className="fill-transparent font-[helvetica] text-7xl font-bold"
        >
          {text}
        </text>
      )}
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #14b8a633 100%)",
      }}
    />
  );
};
