"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import MagneticButton from "@/components/MagneticButton";
import { CONTACT } from "@/lib/data";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-40">
      <div className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-soft/80 blur-[160px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 text-center md:px-10">
        <motion.div
          className="mb-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-12 bg-blue" />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            <span className="text-blue">[</span> Get in Touch <span className="text-blue">]</span>
          </span>
          <span className="h-px w-12 bg-blue" />
        </motion.div>

        <motion.h2
          className="mx-auto max-w-5xl font-display text-[clamp(2.6rem,7vw,6.5rem)] font-bold leading-[1.02] tracking-tight text-ink"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Have a project <br />
          <span className="font-serif font-normal italic text-blue">in mind?</span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          AI product, full-stack app, or an idea worth exploring — I'm open to conversations.
        </motion.p>

        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <MagneticButton href={`mailto:${CONTACT.email}`} className="group rounded-full bg-ink px-9 py-5 text-bg">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.1em]">
              {CONTACT.email}
            </span>
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </MagneticButton>
          <MagneticButton
            href={CONTACT.phoneHref}
            className="rounded-full border border-line2 px-9 py-5 transition-colors hover:border-blue"
          >
            <span className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors group-hover:text-blue">
              {CONTACT.phone}
            </span>
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {CONTACT.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-mono text-[12px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-ink"
              data-cursor="hover"
            >
              {s.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
