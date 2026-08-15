"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";
import { SKILL_MARQUEE, SKILL_GROUPS } from "@/lib/data";

export default function Skills() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // auto-cycle through the groups like a carousel
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % SKILL_GROUPS.length), 3500);
    return () => clearInterval(t);
  }, [paused]);

  const group = SKILL_GROUPS[active];

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading label="Technical Skills" title="Tools of the" italicAccent="trade" />
        <p className="-mt-8 mb-14 max-w-md font-mono text-sm leading-relaxed text-muted md:-mt-10">
          <span className="text-blue">→</span> a working set, not a wishlist. hover a category or let it cycle.
        </p>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* left — interactive index */}
          <div className="lg:col-span-5" onMouseLeave={() => setPaused(false)}>
            <div className="space-y-0 lg:sticky lg:top-28">
              {SKILL_GROUPS.map((g, gi) => {
                const isActive = gi === active;
                return (
                  <button
                    key={g.label}
                    onClick={() => select(gi)}
                    onMouseEnter={() => select(gi)}
                    className="group relative flex w-full items-baseline gap-4 border-t border-line py-5 text-left last:border-b"
                  >
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isActive ? "text-blue" : "text-muted"
                      }`}
                    >
                      0{gi + 1}
                    </span>
                    <span
                      className={`font-display text-3xl font-bold tracking-tight transition-all duration-500 md:text-5xl ${
                        isActive ? "text-ink" : "text-ink/25 group-hover:text-ink/50"
                      }`}
                    >
                      {g.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="skill-underline"
                        className="ml-auto h-1 w-12 shrink-0 rounded-full bg-blue"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="sr-only">{g.skills.length} skills</span>
                  </button>
                );
              })}
              <p className="pt-5 font-mono text-xs text-muted">
                <span className="text-blue">●</span> auto-cycling · {SKILL_GROUPS.length} categories ·{" "}
                {SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0)} tools
              </p>
            </div>
          </div>

          {/* right — flipping panel */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-12">
              {/* giant backdrop number */}
              <span
                className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[11rem] font-bold leading-none text-transparent md:text-[15rem]"
                style={{ WebkitTextStroke: "1.5px rgba(28, 26, 23, 0.08)" }}
              >
                0{active + 1}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue">
                    Capability 0{active + 1} / 0{SKILL_GROUPS.length}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                    {group.label}
                  </h3>
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.06 * si, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-full border border-line2 bg-bg2 px-4 py-2 font-mono text-[13px] text-ink-soft transition-colors duration-300 hover:border-blue hover:text-blue"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* bottom ticker */}
      <div className="mt-20 border-y border-line bg-bg2 py-5">
        <Marquee items={SKILL_MARQUEE} />
      </div>
    </section>
  );
}
