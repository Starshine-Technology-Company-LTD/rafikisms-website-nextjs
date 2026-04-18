"use client";

export function SignalWaveAnimation() {
  const ringDelays = [0, 0.6, 1.2, 1.8];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
        {/* Expanding concentric rings */}
        {ringDelays.map((delay, i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-brand signal-pulse"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        {/* Static inner soft glow */}
        <div className="absolute w-24 h-24 rounded-full bg-brand/10 blur-xl" />

        {/* SMS / tower icon core */}
        <div className="relative flex flex-col items-center gap-1.5">
          {/* Tower cap / signal dots */}
          <div className="flex items-end gap-1 h-5">
            <span className="w-1 h-2 rounded-sm bg-brand/40" />
            <span className="w-1 h-3 rounded-sm bg-brand/60" />
            <span className="w-1 h-4 rounded-sm bg-brand/80" />
            <span className="w-1 h-5 rounded-sm bg-brand" />
          </div>

          {/* Chat bubble core */}
          <div className="relative px-4 py-2.5 rounded-2xl border-2 border-brand bg-background/80 backdrop-blur-sm shadow-[0_8px_30px_-12px_rgba(13,148,136,0.6)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14C20 15.1046 19.1046 16 18 16H9L5 20V16H6C4.89543 16 4 15.1046 4 14V6Z"
                stroke="var(--brand-strong)"
                strokeWidth="1.6"
                fill="var(--brand-soft)"
              />
              <circle cx="9" cy="10" r="1" fill="var(--brand-strong)" />
              <circle cx="12" cy="10" r="1" fill="var(--brand-strong)" />
              <circle cx="15" cy="10" r="1" fill="var(--brand-strong)" />
            </svg>
            {/* Little pointer */}
            <span className="absolute -bottom-1 left-4 w-2 h-2 rotate-45 bg-background border-r-2 border-b-2 border-brand" />
          </div>

          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand">
            broadcasting
          </div>
        </div>
      </div>
    </div>
  );
}
