"use client";

export function MessageFlowAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px]">
        {/* Orbiting small bubbles */}
        <div
          className="absolute top-4 left-8 px-3 py-1.5 rounded-2xl rounded-bl-sm border border-foreground/15 bg-background/70 backdrop-blur-sm text-[10px] text-foreground/70 bubble-drift"
          style={{ animationDelay: "0.2s", animationDuration: "7s" }}
        >
          Welcome
        </div>
        <div
          className="absolute bottom-6 right-4 px-3 py-1.5 rounded-2xl rounded-br-sm border border-brand/40 bg-brand-soft text-[10px] text-brand-deep bubble-drift"
          style={{ animationDelay: "2.5s", animationDuration: "7s" }}
        >
          Delivered
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 left-2 px-3 py-1.5 rounded-2xl rounded-bl-sm border border-foreground/15 bg-background/70 backdrop-blur-sm text-[10px] text-foreground/70 bubble-drift"
          style={{ animationDelay: "4s", animationDuration: "7s" }}
        >
          OTP 481023
        </div>

        {/* Center hero bubble */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-end gap-3 w-[200px] sm:w-[240px] lg:w-[300px]">
            <div className="w-full px-5 py-4 rounded-3xl rounded-br-md border border-brand/50 bg-brand-soft shadow-[0_12px_40px_-16px_rgba(13,148,136,0.45)]">
              <div className="text-xs font-mono text-brand-deep/70 uppercase tracking-widest mb-2">
                outbound sms
              </div>
              <div className="text-sm text-foreground font-medium mb-3">
                Your Rafiki SMS API is sending...
              </div>

              {/* Typing dots */}
              <div className="flex items-center gap-1.5 mb-3">
                <span
                  className="w-2 h-2 rounded-full bg-brand/60 typing-dot"
                  style={{ animationDelay: "0s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-brand/60 typing-dot"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-brand/60 typing-dot"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>

              {/* Progress line */}
              <div className="relative h-[2px] rounded-full bg-foreground/10 overflow-hidden mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-strong flow-line rounded-full" />
              </div>
            </div>

            {/* Status + ticks */}
            <div className="flex items-center gap-2 pr-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                read receipt
              </span>
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                className="tick-cycle"
              >
                <path
                  d="M1 5.5L4 8.5L10 2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 5.5L10 8.5L17 2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
