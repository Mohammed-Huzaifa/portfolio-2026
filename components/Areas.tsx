"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { AREAS } from "@/lib/data";

export default function Areas() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading label="Areas of Experience" title="Where I've" italicAccent="built & shipped" />

        <div ref={ref}>
          {AREAS.map((area, i) => (
            <motion.div
              key={area}
              className="group relative flex items-center justify-between overflow-hidden border-t border-line py-6 last:border-b md:py-8"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 -translate-x-full bg-blue-soft/70 transition-transform duration-500 ease-out group-hover:translate-x-0" />

              <span className="relative z-10 w-14 font-mono text-xs text-faint transition-colors group-hover:text-blue md:w-20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative z-10 flex-1 font-display text-2xl font-bold text-ink transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
                {area}
              </h3>
              <span className="relative z-10 font-mono text-sm text-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
                ✓
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
