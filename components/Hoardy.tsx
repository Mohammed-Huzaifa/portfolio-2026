"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValue } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const FOCUS = ["AI Agents", "Web Platform", "Architecture", "Design Engineering"];

export default function Hoardy() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // subtle scroll parallax between text and card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 32, reduce ? 0 : -32]);
  const textY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -16, reduce ? 0 : 16]);

  return (
    <section ref={sectionRef} id="hoardy" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading label="Currently" title="Tech Lead at" italicAccent="hoardy.ai" />

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* copy */}
          <motion.div style={{ y: textY }} className="lg:col-span-6">
            <Reveal delay={0.05}>
              <p className="max-w-lg text-lg leading-relaxed text-ink-soft md:text-xl">
                Building the <span className="font-semibold text-ink">agent-first brand platform</span> — modern
                web experiences designed for humans and ready for AI agents. From architecture and design
                engineering to shipping production, I own the build end to end.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {FOCUS.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-line2 bg-bg2 px-4 py-2 font-mono text-[13px] text-ink-soft transition-colors duration-300 hover:border-blue hover:text-blue"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <a
                href="https://hoardy.ai"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="mt-10 inline-flex items-center gap-3 font-display text-lg font-bold text-ink transition-colors duration-300 hover:text-blue"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-bg transition-transform duration-300 group-hover:scale-110">
                  ↗
                </span>
                hoardy.ai
              </a>
            </Reveal>
          </motion.div>

          {/* image card — 3D tilt + spotlight + conic border (always visible; no IO-gated entrance) */}
          <motion.div style={{ y: imgY }} className="relative lg:col-span-6">
            <TiltCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TiltCard() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 170, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 170, damping: 22 });

  useEffect(() => {
    setEnabled(
      !reduce &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    cardRef.current.style.setProperty("--mx", `${px * 100}%`);
    cardRef.current.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={tiltRef}
      style={enabled ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      className="relative"
    >
      <div className="group relative rounded-3xl">
        {/* conic ring — separate overlay layer, masked to the 1.5px edge only; NEVER masks the card below */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-3xl p-[1.5px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:[animation:conicSpin_3.5s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from var(--angle, 0deg), transparent 0%, rgba(43, 89, 255, 0.55) 12%, transparent 26%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          data-cursor="hover"
          className="relative overflow-hidden rounded-3xl border border-line bg-surface"
        >
          {/* cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(43, 89, 255, 0.12), transparent 70%)",
            }}
          />
          <div className="relative aspect-[1170/666] bg-bg2">
            <Image
              src="/hoardy-role-2.jpg"
              alt="Hoardy.ai — agent-first brand platform"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          {/* caption strip */}
          <div className="flex items-center justify-between border-t border-line bg-bg2 px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Hoardy.ai — Built for brands. Ready for agents.
            </span>
            <span className="font-mono text-[11px] text-blue">↗</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
