"use client";
import React from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, useReducedMotion } from "framer-motion";
import { skills } from "../data/resume";

const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const ITEMS = skills.flatMap((g) => g.items.map((i) => [i.replace(" (App Router)", ""), g.color]));

// One quiet row of the résumé skills; scrolling nudges its speed
export default function StackMarquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1500, 0, 1500], [-3, 0, 3], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (reduce) return;
    const move = -1.2 * (delta / 1000);
    baseX.set(baseX.get() + move + move * Math.abs(factor.get()));
  });

  const row = ITEMS.map(([label, color]) => (
    <span key={label} className="inline-flex items-center gap-2 pr-7">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: `rgb(var(--${color}))` }} />
      {label}
    </span>
  ));

  return (
    <section aria-label="Skills" className="border-y border-line/10 bg-sunken/50 py-4 overflow-hidden">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap text-[15px] font-medium text-ink/80">
        <span className="flex">{row}</span>
        <span className="flex" aria-hidden="true">
          {row}
        </span>
      </motion.div>
    </section>
  );
}
