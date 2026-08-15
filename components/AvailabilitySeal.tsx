"use client";

export default function AvailabilitySeal() {
  return (
    <a
      href="#contact"
      data-cursor="hover"
      aria-label="Available for exciting projects — open for new work"
      className="group relative block h-40 w-40 shrink-0 md:h-48 md:w-48"
    >
      {/* rotating circular text */}
      <svg viewBox="0 0 200 200" className="h-full w-full animate-seal-spin group-hover:[animation-duration:5s]">
        <defs>
          <path
            id="sealPath"
            d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
            fill="none"
          />
        </defs>
        <text
          className="fill-muted font-mono text-[15px] uppercase"
          style={{ letterSpacing: "0.22em" }}
        >
          <textPath href="#sealPath" textLength={515} lengthAdjust="spacingAndGlyphs">
            Available for exciting projects • Open for new work •
          </textPath>
        </text>
      </svg>

      {/* center: radar dot + rings */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/40 animate-ping-ring" />
        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/25 animate-ping-ring [animation-delay:0.8s]" />
        <span className="relative block h-4 w-4 rounded-full bg-neon shadow-[0_0_12px_rgba(15,157,88,0.6)]" />
      </span>
    </a>
  );
}
