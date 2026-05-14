"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { landingContent } from "./content";
import type { TeamMemberView } from "@/lib/rafiki-public-api";

const teamStatic = landingContent.team;

function normalizeMembers(fromApi?: TeamMemberView[] | null): TeamMemberView[] {
  if (fromApi && fromApi.length > 0) return fromApi;
  return teamStatic.members.map((m, idx) => ({
    id: idx,
    name: m.name,
    role: m.role,
    initials: m.initials,
    imageUrl: null,
  }));
}

const teamFx = [
  "team-fx-tilt",
  "team-fx-shine",
  "team-fx-wash",
  "team-fx-lift",
  "team-fx-corners",
  "team-fx-scan",
  "team-fx-glitch",
  "team-fx-zoom",
] as const;

type TileMember = TeamMemberView;

function TeamTile({
  member,
  idx,
  isVisible,
  fillHeight = false,
  suppressEntrance = false,
}: {
  member: TileMember;
  idx: number;
  isVisible: boolean;
  fillHeight?: boolean;
  suppressEntrance?: boolean;
}) {
  const fx = teamFx[idx % teamFx.length];
  const entranceOn = suppressEntrance || isVisible;
  const remoteImg = member.imageUrl ? /^https?:\/\//i.test(member.imageUrl) : false;
  return (
    <div
      className={`group relative bg-background p-5 lg:p-6 cursor-pointer ${fx} ${
        fillHeight ? "h-full flex flex-col" : ""
      } ${
        entranceOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } transition-all duration-700`}
      style={suppressEntrance ? undefined : { transitionDelay: `${idx * 60}ms` }}
    >
      {/* Portrait tile */}
      <div
        className={`team-portrait relative w-full mb-4 overflow-hidden border border-foreground/10 bg-foreground/[0.02] rounded-xl ${
          fillHeight ? "flex-1 min-h-0" : "aspect-[17/25]"
        }`}
      >
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            unoptimized={remoteImg}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="team-initials font-display text-5xl lg:text-6xl text-foreground/25 transition-colors duration-500">
              {member.initials}
            </span>
          </div>
        )}

        {/* Corner ticks */}
        <span className="corner-tick h absolute top-2 left-2 w-3 h-px bg-foreground/30" />
        <span className="corner-tick v absolute top-2 left-2 w-px h-3 bg-foreground/30" />
        <span className="corner-tick h absolute top-2 right-2 w-3 h-px bg-foreground/30" />
        <span className="corner-tick v absolute top-2 right-2 w-px h-3 bg-foreground/30" />
        <span className="corner-tick h absolute bottom-2 left-2 w-3 h-px bg-foreground/30" />
        <span className="corner-tick v absolute bottom-2 left-2 w-px h-3 bg-foreground/30" />
        <span className="corner-tick h absolute bottom-2 right-2 w-3 h-px bg-foreground/30" />
        <span className="corner-tick v absolute bottom-2 right-2 w-px h-3 bg-foreground/30" />

        {/* Hover double-tick badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            className="text-brand"
          >
            <path
              d="M1 5L4 8L9 2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 5L9 8L15 2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-foreground leading-snug">
            {member.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase shrink-0 mt-1">
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export type TeamSectionProps = {
  members?: TeamMemberView[] | null;
};

export function TeamSection({ members: membersProp }: TeamSectionProps) {
  const members = normalizeMembers(membersProp ?? undefined);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const deckMinHeightVh = members.length * 8 + 16;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`max-w-3xl mb-12 lg:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-5">
            {teamStatic.eyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-4">
            {teamStatic.title}
            <br />
            <span className="text-stroke">{teamStatic.subtitle}</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-xl">
            {teamStatic.description}
          </p>
        </div>

        {/* Sticky stacking deck (scroll-linked) */}
        <div className="relative max-w-2xl mx-auto border border-foreground/10 rounded-3xl bg-background/40 backdrop-blur-sm p-3 sm:p-4 lg:p-5 overflow-visible">
          {prefersReducedMotion ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {members.map((member, idx) => (
                <TeamTile
                  key={member.id}
                  member={member}
                  idx={idx}
                  isVisible={isVisible}
                  suppressEntrance
                />
              ))}
            </div>
          ) : (
            <div
              ref={deckRef}
              className="relative mx-auto max-w-xl sm:max-w-2xl"
              style={{ minHeight: `${deckMinHeightVh}vh` }}
            >
              {members.map((member, idx) => (
                <div
                  key={member.id}
                  className="sticky mb-[min(10vh,5.5rem)] last:mb-0"
                  style={{
                    top: `clamp(4.5rem, ${4.75 + idx * 0.75}rem, 9.5rem)`,
                    zIndex: idx + 1,
                  }}
                >
                  <div className="rounded-2xl border border-foreground/10 bg-background shadow-[0_16px_48px_-28px_rgba(0,0,0,0.22)] dark:shadow-[0_16px_48px_-28px_rgba(0,0,0,0.45)]">
                    <TeamTile
                      member={member}
                      idx={idx}
                      isVisible
                      suppressEntrance
                    />
                  </div>
                </div>
              ))}
              <div className="h-[14vh] min-h-[100px]" aria-hidden />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
