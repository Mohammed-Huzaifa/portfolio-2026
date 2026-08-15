"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MISSION, STRENGTHS } from "@/lib/data";

export default function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });
  const words = MISSION.split(" ");

  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-soft/70 blur-[150px]" />

      <div ref={ref} className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <motion.div
          className="mb-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-12 bg-blue" />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            <span className="text-blue">[</span> Personal Mission <span className="text-blue">]</span>
          </span>
          <span className="h-px w-12 bg-blue" />
        </motion.div>

        <blockquote className="font-display text-3xl font-bold leading-[1.25] text-ink md:text-5xl md:leading-[1.2]">
          <span className="sr-only">{MISSION}</span>
          <span aria-hidden>
            {words.map((word, i) => {
              const italic = ["solve", "share", "continuously"].includes(
                word.replace(/[^a-zA-Z]/g, "")
              );
              return (
                <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className={`inline-block ${italic ? "font-serif font-normal italic text-blue" : ""}`}
                    initial={{ y: "110%" }}
                    animate={inView ? { y: "0%" } : { y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.018, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                    {"\u00A0"}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </blockquote>

        <motion.p
          className="mt-12 font-mono text-sm uppercase tracking-[0.25em] text-muted"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          — Mohammed Huzaifa
        </motion.p>
      </div>

      {/* Strengths */}
      <div className="relative mx-auto mt-24 max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-faint">
            <span className="text-blue">[</span> Core Strengths <span className="text-blue">]</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {STRENGTHS.map((s, i) => (
            <motion.span
              key={s}
              className="rounded-full border border-line2 bg-surface px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft transition-colors duration-300 hover:border-blue hover:text-blue"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
