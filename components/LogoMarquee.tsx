"use client";

import Image from "next/image";

export interface LogoItem {
  name: string;
  src: string;
}

interface LogoMarqueeProps {
  items: LogoItem[];
  className?: string;
}

export default function LogoMarquee({ items, className = "" }: LogoMarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track relative flex w-full overflow-hidden ${className}`}>
      <div className="marquee-inner flex shrink-0 items-center gap-9 pr-9 will-change-transform animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-9"
            title={item.name}
            aria-label={item.name}
          >
            <Image
              src={item.src}
              alt={item.name}
              width={200}
              height={70}
              className="h-10 w-auto max-w-[180px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-12 md:max-w-[220px]"
            />
            <span className="text-blue">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
