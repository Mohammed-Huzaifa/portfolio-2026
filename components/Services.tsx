"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LuBrainCircuit, LuCode, LuWorkflow, LuCompass } from "react-icons/lu";
import type { IconType } from "react-icons";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES } from "@/lib/data";

const SERVICE_VISUALS: { icon: IconType; gradient: string }[] = [
  { icon: LuBrainCircuit, gradient: "from-[#e3e9ff] to-[#f3f6ff]" },
  { icon: LuCode, gradient: "from-[#fdf0e4] to-[#fff8f0]" },
  { icon: LuWorkflow, gradient: "from-[#e8f3ea] to-[#f4faf5]" },
  { icon: LuCompass, gradient: "from-[#f3e8f8] to-[#faf4fc]" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const n = SERVICES.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const countLabel = useTransform(scrollYProgress, (v) => {
    const idx = Math.min(n - 1, Math.floor(v * n));
    return `0${idx + 1}`;
  });

  return (
    <section id="services" ref={sectionRef} className="relative scroll-mt-24">
      {/* 4 viewport-heights of scroll room for the takeover */}
      <div className="h-[420vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* pinned heading */}
          <div className="px-6 pt-16 md:px-10 md:pt-20">
            <SectionHeading
              label="What I Do"
              title="Turning ideas into"
              italicAccent="meaningful products"
            />
          </div>

          {/* takeover stage */}
          <div className="relative mx-auto mt-4 h-full w-full max-w-6xl flex-1 px-4 pb-16 md:px-10 md:pb-24">
            {SERVICES.map((s, i) => {
              const start = i / n;
              const end = (i + 1) / n;
              const out = Math.min((i + 2) / n, 1);

              // first card is already seated when the section pins;
              // the rest slide in from below → hold → slide up + shrink as the next arrives
              const y = useTransform(
                scrollYProgress,
                [start, end, out],
                i === 0 ? ["0%", "0%", "-24%"] : ["100%", "0%", "-24%"]
              );
              const scale = useTransform(scrollYProgress, [end, out], [1, 0.93]);
              const opacity = useTransform(
                scrollYProgress,
                [start, end, out],
                i === 0 ? [1, 1, 0.85] : [0.25, 1, 0.85]
              );

              const visual = SERVICE_VISUALS[i];
              const Icon = visual.icon;

              return (
                <motion.article
                  key={s.num}
                  style={{ y, scale, opacity, zIndex: i + 10 }}
                  className="group absolute inset-0 overflow-hidden rounded-3xl border border-line bg-surface/90 backdrop-blur-sm"
                >
                  {/* watermark number */}
                  <span
                    className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[10rem] font-bold leading-none text-transparent md:text-[16rem]"
                    style={{ WebkitTextStroke: "1.5px rgba(28, 26, 23, 0.12)" }}
                  >
                    {s.num}
                  </span>

                  <div className="relative flex h-full flex-col justify-between p-8 md:p-12 lg:p-16">
                    {/* top row: index + arrow */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue">
                        Service {s.num}
                      </span>
                      <span className="font-mono text-lg text-ink-soft">↗</span>
                    </div>

                    {/* bottom: text + visual tile */}
                    <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
                      <div className="lg:col-span-7">
                        <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
                          {s.title}
                        </h3>
                        <div className="mt-6 h-px w-16 bg-blue md:mt-8 md:w-24" />
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:mt-8 md:text-lg">
                          {s.desc}
                        </p>
                      </div>

                      {/* visual tile */}
                      <div className="hidden lg:col-span-5 lg:block">
                        <div
                          className={`relative flex h-[24vh] max-h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${visual.gradient}`}
                        >
                          <Icon
                            className="h-24 w-24 text-ink/85 transition-transform duration-500 group-hover:scale-110 md:h-32 md:w-32"
                            strokeWidth={1.1}
                          />
                          {/* decorative glows */}
                          <span className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/50 blur-2xl" />
                          <span className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/40 blur-xl" />
                          <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                            Capability {s.num}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}

            {/* bottom progress rail */}
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-50 flex items-center gap-4 md:left-10 md:right-10">
              <motion.span className="font-mono text-xs text-muted">{countLabel}</motion.span>
              <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-line">
                <motion.div
                  style={{ scaleX: progressScale }}
                  className="h-full origin-left bg-blue"
                />
              </div>
              <span className="font-mono text-xs text-muted">/ 04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
