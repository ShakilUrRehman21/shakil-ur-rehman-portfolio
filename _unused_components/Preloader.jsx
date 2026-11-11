"use client";
import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

// A short boot sequence shown once per session. Under 1.5s, skippable by design.
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [quick, setQuick] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("portfolio_booted") === "1";
      sessionStorage.setItem("portfolio_booted", "1");
    } catch (e) {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      setQuick(true);
      setLeaving(true);
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setLeaving(true), 120),
    });
    return () => controls.stop();
  }, []);

  const services = ["postgres", "redis", "spring-boot", "gemini", "ws-mesh"];
  const ready = Math.floor((count / 100) * services.length);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={leaving ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: quick ? 0.25 : 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && onDone()}
      className="fixed inset-0 z-[200] bg-night text-[#ECEEF8] flex flex-col justify-between p-6 sm:p-10"
    >
      <div className="flex items-start justify-between font-mono text-xs text-[#A3A9C9]">
        <span>shakil@portfolio ~ boot</span>
        <span>Greater Noida, IN</span>
      </div>

      <div className="flex flex-col gap-2 font-mono text-xs sm:text-sm">
        {services.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: i <= ready ? 1 : 0.25, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <span
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ background: i < ready ? "rgb(47 217 169)" : "rgb(255 255 255 / 0.25)" }}
            />
            <span>{s}</span>
            <span className="text-[#A3A9C9]">{i < ready ? "ready" : "starting"}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-end justify-between gap-6">
        <span className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-none" style={{ fontVariationSettings: '"wdth" 130, "wght" 700' }}>
          Shakil Ur Rehman
        </span>
        <span
          className="font-display tabular-nums leading-[0.8] text-[clamp(5rem,18vw,14rem)]"
          style={{ fontVariationSettings: `"wdth" ${60 + count * 0.8}, "wght" ${300 + count * 6}` }}
        >
          {count}
        </span>
      </div>
    </motion.div>
  );
}
