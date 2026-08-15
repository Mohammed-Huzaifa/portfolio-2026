"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import MagneticButton from "@/components/MagneticButton";
import WordRotate from "@/components/WordRotate";
import { CONTACT } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const instagram = CONTACT.socials.find((s) => s.label === "Instagram");

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* soft light orbs */}
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-soft blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#fff0e8] blur-[120px]" />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-14 pt-24 md:px-10 md:pt-28"
      >
        {/* split: headline + intro left, portrait right */}
        <div className="grid items-center gap-14 md:mt-6 md:grid-cols-12 md:gap-16 lg:gap-20">
          {/* left — words */}
          <div className="md:col-span-8">
            {/* Giant headline — asymmetric split */}
            <h1 className="font-display font-bold leading-[0.92] tracking-tight">
              <span className="sr-only">Mohammed Huzaifa — Entrepreneur</span>
              <span aria-hidden className="block overflow-hidden">
                <motion.span
                  className="block leading-[1.3] text-[clamp(2.8rem,8vw,7.8rem)] text-ink"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 2.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Mohammed
                </motion.span>
              </span>
              <span aria-hidden className="block overflow-hidden -mt-[calc(clamp(2.8rem,8vw,7.8rem)*0.2)]">
                <motion.span
                  className="block leading-[1.3] text-[clamp(2.8rem,8vw,7.8rem)] text-ink"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 3.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Huzaifa<span className="text-blue">.</span>
                </motion.span>
              </span>
              <span aria-hidden className="block overflow-hidden -mt-[calc(clamp(2.8rem,8vw,7.8rem)*0.2)] pt-2">
                <motion.span
                  className="block leading-[1.3] font-serif text-xl italic text-ink-soft md:text-3xl"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 3.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  — Entrepreneur
                </motion.span>
              </span>
            </h1>

            {/* intro row: serif italic + rotating focus line */}
            <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-12 md:items-end md:gap-8">
              <motion.p
                className="font-serif text-xl italic leading-snug text-ink-soft md:col-span-6 md:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.8 }}
              >
                I start companies, build products, and write code.
              </motion.p>
              <motion.div
                className="md:col-span-5 md:col-start-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6, duration: 0.8 }}
              >
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
                  <span className="text-blue">→</span> usually all three at once
                </p>
                <p className="font-serif text-xl italic leading-snug text-ink-soft md:text-2xl">
                  <WordRotate
                    words={["AI products.", "full-stack systems.", "automation that actually ships."]}
                    className="text-blue"
                  />
                </p>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.8 }}
            >
              <MagneticButton href="#projects" className="group rounded-full bg-ink px-8 py-4 text-bg">
                <span className="font-display text-sm font-semibold uppercase tracking-wider">
                  Explore My Work
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="group rounded-full border border-line2 px-8 py-4 transition-colors hover:border-blue hover:text-blue"
              >
                <span className="font-display text-sm font-semibold uppercase tracking-wider text-ink transition-colors group-hover:text-blue">
                  Get in Touch
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* right — portrait */}
          <div className="md:col-span-4">
            <motion.div
              className="mx-auto w-full max-w-[220px] md:max-w-[300px]"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 3.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-line bg-surface shadow-[0_30px_90px_rgba(28,26,23,0.14)]">
                <Image
                  src="/huzaifa-portrait.jpg"
                  alt="Portrait of Mohammed Huzaifa"
                  fill
                  priority
                  sizes="(max-width: 768px) 220px, 300px"
                  className="object-cover object-[50%_30%]"
                />
                {/* warm harmony: soft-light paper blend + bottom fade */}
                <div className="absolute inset-0 bg-bg mix-blend-soft-light opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                <span className="h-px w-6 bg-line2" />
                Mohammed Huzaifa
                <span className="h-px w-6 bg-line2" />
              </div>

              {/* IG under portrait */}
              <motion.div
                className="mt-4 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 0.8 }}
              >
                {instagram && (
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hidden rounded-full border border-line2 bg-surface px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft transition-colors duration-300 hover:border-blue hover:text-blue md:inline-block"
                    data-cursor="hover"
                  >
                    @odysseywithhuzaifa{" "}
                    <span className="inline-block text-blue transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-faint">scroll</span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-blue to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
