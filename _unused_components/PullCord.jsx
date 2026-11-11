"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useApp } from "./AppShell";

// A nod to the original site's desk lamp: pull the cord to switch themes.
export default function PullCord({ className = "" }) {
  const { theme, toggleTheme } = useApp();
  const y = useMotionValue(0);
  const length = useTransform(y, (v) => 110 + v);
  const [hint, setHint] = useState(true);
  const handleRef = useRef(null);

  const release = (e) => {
    if (y.get() > 38) {
      setHint(false);
      const r = handleRef.current?.getBoundingClientRect();
      toggleTheme({ clientX: r ? r.left + r.width / 2 : e.clientX, clientY: r ? r.top + r.height / 2 : e.clientY });
    }
    animate(y, 0, { type: "spring", stiffness: 500, damping: 12 });
  };

  return (
    <div className={`pointer-events-none flex flex-col items-center ${className}`} aria-hidden="false">
      <motion.div style={{ height: length }} className="w-[2px] bg-ink/70 origin-top" />
      <motion.button
        ref={handleRef}
        type="button"
        drag="y"
        dragConstraints={{ top: 0, bottom: 70 }}
        dragElastic={0.15}
        dragMomentum={false}
        style={{ y }}
        onDragEnd={release}
        onClick={(e) => {
          // keyboard or plain click also works
          if (e.detail === 0 || Math.abs(y.get()) < 2) {
            setHint(false);
            toggleTheme(e);
          }
        }}
        whileHover={{ scale: 1.12 }}
        aria-label={theme === "dark" ? "Pull cord: switch to light theme" : "Pull cord: switch to dark theme"}
        data-cursor="Pull"
        className="pointer-events-auto -mt-px w-5 h-8 rounded-full bg-marigold border-2 border-ink shadow-md touch-none"
      />
      {hint && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          style={{ y }}
          className="mt-2 text-xs text-muted whitespace-nowrap"
        >
          pull for {theme === "dark" ? "light" : "dark"}
        </motion.span>
      )}
    </div>
  );
}
