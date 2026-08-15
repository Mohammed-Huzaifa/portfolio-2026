"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { PERSONAL } from "@/lib/data";

const ICONS: Record<string, string> = {
  book: "📖",
  pen: "✍️",
  spark: "✨",
  loop: "♾️",
};

export default function Personal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="personal" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      {/* soft orb */}
      <div className="pointer-events-none absolute right-[-12%] top-1/4 h-[480px] w-[480px] rounded-full bg-blue-soft/60 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading label="Beyond Work" title="What keeps me" italicAccent="curious" />

        <div ref={ref} className="divide-y divide-line">
          {PERSONAL.map((item, i) => {
            const flip = i % 2 === 1;
            return <Spread key={item.title} item={item} index={i} flip={flip} inView={inView} />;
          })}
        </div>
      </div>
    </section>
  );
}

function Spread({
  item,
  index,
  flip,
  inView,
}: {
  item: (typeof PERSONAL)[number];
  index: number;
  flip: boolean;
  inView: boolean;
}) {
  const spreadRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spreadRef,
    offset: ["start end", "end start"],
  });
  // ghost number drifts slower than the page — parallax
  const yNum = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yContent = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.article
      ref={spreadRef}
      className="group relative py-14 first:pt-4 md:py-20"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* giant ghost number */}
      <motion.span
        style={{ y: yNum, WebkitTextStroke: "1.5px rgba(28, 26, 23, 0.08)" }}
        className={`pointer-events-none absolute select-none font-display text-[9rem] font-bold leading-none text-transparent md:text-[15rem] ${
          flip ? "left-0 md:-left-6" : "right-0 md:-right-6"
        } -top-10 md:-top-20`}
      >
        0{index + 1}
      </motion.span>

      <motion.div
        style={{ y: yContent }}
        className={`relative z-10 grid gap-8 md:grid-cols-12 md:items-center md:gap-10 ${
          flip ? "" : ""
        }`}
      >
        {/* icon + meta */}
        <div className={`md:col-span-3 ${flip ? "md:order-2" : ""}`}>
          <div className={`flex items-center gap-5 ${flip ? "md:flex-row-reverse" : ""}`}>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-2xl shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-blue md:h-20 md:w-20 md:text-3xl">
              {ICONS[item.icon] ?? "✦"}
            </span>
            <span className="font-mono text-xs tracking-[0.2em] text-faint">
              {String(index + 1).padStart(2, "0")} / 04
            </span>
          </div>
        </div>

        {/* title + desc */}
        <div className={`md:col-span-9 ${flip ? "md:order-1 md:text-right" : ""}`}>
          <p className={`font-mono text-[11px] uppercase tracking-[0.3em] text-blue ${flip ? "md:justify-end" : ""} flex items-center gap-3`}>
            <span className="h-px w-8 bg-blue/50" />
            {item.tag}
          </p>
          <h3
            className={`mt-4 font-display text-4xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-blue md:text-6xl ${
              flip ? "md:text-right" : ""
            }`}
          >
            {item.title}
          </h3>
          <div className={`mt-5 ${flip ? "md:flex md:justify-end" : ""}`}>
            <p className={`max-w-xl leading-relaxed text-muted ${flip ? "md:text-right" : ""}`}>
              {item.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
