"use client";

import { SKILL_ICONS } from "@/lib/skillIcons";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ items, reverse = false, className = "" }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track relative flex w-full overflow-hidden ${className}`}>
      <div
        className={`marquee-inner flex shrink-0 items-center gap-7 pr-7 will-change-transform ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => {
          const entry = SKILL_ICONS[item];
          return (
            <span key={i} className="flex shrink-0 items-center gap-7 whitespace-nowrap">
              {entry ? (
                <entry.icon
                  title={item}
                  aria-label={item}
                  color={entry.color}
                  className="h-8 w-8 transition-opacity duration-300 hover:opacity-70 md:h-10 md:w-10"
                />
              ) : (
                <span className="font-display text-2xl font-bold text-ink/30 md:text-4xl">
                  {item}
                </span>
              )}
              <span className="text-blue">✦</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
