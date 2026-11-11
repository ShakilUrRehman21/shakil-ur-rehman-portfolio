"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Dot + trailing ring. The ring grows over interactive elements and can show a
// short label set with data-cursor="View" on any element.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target;
      const labelled = t.closest && t.closest("[data-cursor]");
      const interactive = t.closest && t.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor]");
      setLabel(labelled ? labelled.getAttribute("data-cursor") : "");
      setHovering(!!interactive && !(t.closest("input, textarea")));
    };
    const leave = () => setHidden(true);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hovering ? 48 : 30;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]" style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{ width: size, height: size, scale: pressed ? 0.82 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ${
            label
              ? "bg-ink text-bg"
              : hovering
              ? "bg-marigold/25 border-2 border-marigold"
              : "border-[1.5px] border-ink/50"
          }`}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[13px] font-semibold"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-ink transition-opacity ${label ? "opacity-0" : "opacity-100"}`}
        />
      </motion.div>
    </div>
  );
}
