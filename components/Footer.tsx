"use client";

import { motion } from "motion/react";
import { NAV_LINKS } from "@/lib/data";

export default function Footer() {
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(href, { offset: 0, duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg2 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 md:px-10">
        {/* Giant outline name */}
        <div className="pointer-events-none select-none text-center font-display font-bold leading-none tracking-tight">
          <motion.span
            className="block text-stroke text-[clamp(4rem,16vw,13rem)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Huzaifa
          </motion.span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => goTo(e, link.href)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-ink"
              data-cursor="hover"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            <span className="text-neon">●</span> © {new Date().getFullYear()} Mohammed Huzaifa
          </p>
          <button
            onClick={() => {
              const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
              if (lenis) lenis.scrollTo(0, { duration: 1.6 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-blue"
            data-cursor="hover"
          >
            Back to top
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
