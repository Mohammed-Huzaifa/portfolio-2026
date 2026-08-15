"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 300);
      }
    };
    rafId = requestAnimationFrame(tick);

    // Hard fallback: never trap the page behind the preloader
    const failsafe = setTimeout(() => setDone(true), 2800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="flex items-baseline gap-1 font-display text-6xl font-bold text-ink md:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            MH<span className="text-blue">.</span>
          </motion.div>
          <motion.p
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.35em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Mohammed Huzaifa
          </motion.p>

          <div className="absolute bottom-10 right-10 flex items-baseline gap-1 font-mono text-sm text-blue">
            <span className="text-5xl font-medium tabular-nums">{count}</span>
            <span className="text-faint">%</span>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-blue"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
