"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { PROJECTS } from "@/lib/data";
import Image from "next/image";

// 2 segments per item (hold, then slide) across all items
const SEGMENTS = (PROJECTS.length + 1) * 2; // 12

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<number[]>([]);
  const [active, setActive] = useState(0);

  // measure each item's offset so slides land exactly on card boundaries
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const items = Array.from(track.children) as HTMLElement[];
      setPositions(items.map((el) => el.offsetLeft));
    };
    measure();
    const t = setTimeout(measure, 400); // re-measure once layout/images settle
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Pinned horizontal scroll: section sticks, inner track translates with scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
    restDelta: 0.001,
  });

  // stepped keyframes: hold each card in place, then glide to the next
  const inputs = Array.from({ length: SEGMENTS + 1 }, (_, k) => k / SEGMENTS);
  const outputs = Array.from({ length: SEGMENTS + 1 }, (_, k) => {
    const idx = Math.min(Math.max(positions.length - 1, 0), Math.floor(k / 2));
    return positions.length ? -positions[idx] : 0;
  });
  const x = useTransform(smoothProgress, inputs, outputs);

  // track which item is on stage for the dots
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setActive(Math.min(PROJECTS.length, Math.floor(v * (PROJECTS.length + 1))));
  });

  const jumpTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const min = window.scrollY + rect.top;
    const max = min + rect.height - window.innerHeight;
    const p = Math.min(1, Math.max(0, (2 * i + 1) / SEGMENTS));
    window.scrollTo({ top: min + p * (max - min), behavior: "smooth" });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative scroll-mt-24">
      {/* header */}
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-32">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-blue" />
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
            <span className="text-blue">[</span> Selected Work <span className="text-blue">]</span>
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-ink">
            Projects I've <span className="font-serif font-normal italic text-blue">shipped</span>
          </h2>
          <p className="mb-2 max-w-sm font-mono text-sm text-muted">
            <span className="text-blue">→</span> keep scrolling — the reel moves sideways. each card pauses so you can read it.
          </p>
        </div>
      </div>

      {/* scroll room: ~583vh of pin distance (≈41.7vh per card segment) — keeps the slow, readable reel pace with 6 projects */}
      <div className="relative h-[583vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="relative z-10 flex gap-8 pl-6 pr-16 md:pl-10 md:pr-24">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} scrollYProgress={smoothProgress} />
            ))}
            {/* end card */}
            <div className="flex w-[70vw] shrink-0 items-center justify-center md:w-[30vw]">
              <div className="text-center">
                <p className="font-serif text-3xl italic text-muted md:text-4xl">That's the reel.</p>
                <a
                  href="#contact"
                  className="mt-4 inline-block font-display text-lg font-bold text-blue underline-offset-8 hover:underline"
                  data-cursor="hover"
                >
                  Let's build yours →
                </a>
              </div>
            </div>
          </motion.div>

          {/* clickable dots — jump straight to any project */}
          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${p.title}`}
                data-cursor="hover"
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === i ? "w-8 bg-blue" : "w-2 bg-line2 hover:bg-muted"
                }`}
              />
            ))}
            <button
              onClick={() => jumpTo(PROJECTS.length)}
              aria-label="Go to end card"
              data-cursor="hover"
              className={`h-2 rounded-full transition-all duration-300 ${
                active === PROJECTS.length ? "w-8 bg-blue" : "w-2 bg-line2 hover:bg-muted"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  scrollYProgress,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const reduce = useReducedMotion();

  // ---- depth of field (crisp): active card pops forward, neighbors recede ----
  const isLast = index >= PROJECTS.length - 1;
  const segMid = (2 * index + 1) / SEGMENTS;
  const inStart = index === 0 ? 0 : (2 * index) / SEGMENTS;
  const inEnd = isLast ? 1 : (2 * index + 2) / SEGMENTS;
  const outStart = index === 0 ? 1 : 0.9;
  const outEnd = isLast ? 1 : 0.9;
  const depth = useTransform(scrollYProgress, [inStart, segMid, inEnd], [outStart, 1, outEnd]);
  const shadow = useTransform(scrollYProgress, [inStart, segMid, inEnd], [
    "0 14px 36px rgba(28, 26, 23, 0.06)",
    "0 34px 90px rgba(28, 26, 23, 0.18)",
    "0 14px 36px rgba(28, 26, 23, 0.06)",
  ]);

  // ---- 3D tilt (fine pointers only, no motion sickness) ----
  const tiltRef = useRef<HTMLElement>(null);
  const tiltEnabled = useRef(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 170, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 170, damping: 22 });

  useEffect(() => {
    tiltEnabled.current =
      !reduce &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => {
    if (!tiltEnabled.current || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      className="shrink-0"
      style={reduce ? undefined : { scale: depth, boxShadow: shadow, transformOrigin: "center" }}
    >
      <motion.article
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
        className="group relative flex h-[68vh] w-[82vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface will-change-transform md:h-[70vh] md:w-[46vw]"
      >
        {/* image area — full artwork, never cropped */}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block h-[54%] overflow-hidden border-b border-line bg-bg"
          data-cursor="hover"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 82vw, 46vw"
              className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                project.logo ? "object-contain p-10" : "object-contain p-6 md:p-8"
              }`}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-soft to-[#fff0e8]">
              <span className="font-display text-7xl font-bold text-blue">CB</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Commerce Bear
              </span>
            </div>
          )}
          {/* index badge */}
          <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 font-mono text-[11px] text-ink backdrop-blur">
            {project.id} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-bg opacity-0 transition-all duration-300 group-hover:opacity-100">
            ↗
          </span>
        </a>

        {/* content — solid surface, fully readable */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-blue">{project.role}</p>
          <h3 className="mb-3 font-display text-2xl font-bold text-ink transition-colors duration-300 group-hover:text-blue md:text-3xl">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">{project.desc}</p>

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              {project.tags.slice(0, 4).join(" · ")}
            </span>
            {project.links ? (
              <span className="ml-auto flex gap-3">
                {project.links.slice(0, 2).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-blue hover:underline"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                ))}
              </span>
            ) : (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto font-mono text-[11px] uppercase tracking-[0.12em] text-ink underline-offset-4 hover:text-blue hover:underline"
                data-cursor="hover"
              >
                Visit site
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
