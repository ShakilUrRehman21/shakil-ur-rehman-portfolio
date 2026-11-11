"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background:
          "linear-gradient(90deg, rgb(var(--cobalt)), rgb(var(--mint)), rgb(var(--marigold)), rgb(var(--orchid)))",
      }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[90]"
    />
  );
}
