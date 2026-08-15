"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SectionHeadingProps {
  label: string;
  title: string;
  titleAccent?: string;
  italicAccent?: string;
  id?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  titleAccent,
  italicAccent,
  id,
  align = "left",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div
      ref={ref}
      id={id}
      className={`mb-14 scroll-mt-28 md:mb-20 ${align === "center" ? "text-center" : ""}`}
    >
      <motion.div
        className={`mb-6 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
        initial={{ opacity: 0, x: align === "center" ? 0 : -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="h-px w-10 bg-blue" />
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
          <span className="text-blue">[</span> {label} <span className="text-blue">]</span>
        </span>
        {align === "left" && <span className="h-px flex-1 bg-line" />}
      </motion.div>

      <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
        <span className="inline-block overflow-hidden pb-2 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.span>
        </span>{" "}
        {titleAccent && (
          <span className="inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              className="inline-block text-ink-soft"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {titleAccent}
            </motion.span>
          </span>
        )}
        {italicAccent && (
          <span className="inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              className="inline-block font-serif font-normal italic text-blue"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              {italicAccent}
            </motion.span>
          </span>
        )}
      </h2>
    </div>
  );
}
