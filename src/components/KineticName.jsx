"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// The name is set in Anybody, a variable font with width and weight axes.
// Letters near the pointer swell wider and heavier; at rest they breathe gently.
const BASE = { w: 100, g: 760 };
const PEAK = { w: 128, g: 880 };
const RADIUS = 170;

export default function KineticName({ lines, start, className = "" }) {
  const letterRefs = useRef([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = letterRefs.current.filter(Boolean);
    if (!letters.length) return;

    const state = letters.map(() => ({ t: 0 }));
    let centers = [];
    let pointer = null;
    let lastMove = 0;
    let raf = 0;
    let visible = true;

    const measure = () => {
      centers = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY };
      });
    };

    const apply = (el, t) => {
      const w = BASE.w + (PEAK.w - BASE.w) * t;
      const g = BASE.g + (PEAK.g - BASE.g) * t;
      el.style.fontVariationSettings = `"wdth" ${w.toFixed(1)}, "wght" ${g.toFixed(0)}`;
    };

    if (reduce) {
      letters.forEach((el) => apply(el, 0));
      return;
    }

    const loop = (time) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const idle = !pointer || time - lastMove > 2600;
      letters.forEach((el, i) => {
        let target;
        if (!idle) {
          const c = centers[i];
          const dx = pointer.x - c.x;
          const dy = (pointer.y - c.y) * 1.4;
          const d = Math.sqrt(dx * dx + dy * dy);
          target = Math.max(0, 1 - d / RADIUS);
          target = target * target * (3 - 2 * target); // smoothstep
        } else {
          target = ((Math.sin(time / 700 - i * 0.55) + 1) / 2) * 0.18;
        }
        const s = state[i];
        s.t += (target - s.t) * 0.14;
        apply(el, s.t);
      });
    };

    const onMove = (e) => {
      pointer = { x: e.pageX, y: e.pageY };
      lastMove = performance.now();
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) {
        pointer = { x: t.pageX, y: t.pageY };
        lastMove = performance.now();
      }
    };

    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    if (wrapRef.current) io.observe(wrapRef.current);

    // Measure after the entrance settles and whenever layout changes
    const t1 = setTimeout(measure, 1400);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      clearTimeout(t1);
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  let idx = -1;
  return (
    <h1 ref={wrapRef} aria-label={lines.join(" ")} className={className}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className="block whitespace-nowrap">
          {line.split("").map((ch, ci) => {
            idx += 1;
            const myIdx = idx;
            return (
              <span key={ci} className="inline-block overflow-hidden align-bottom pb-[0.04em] -mb-[0.04em]">
                <motion.span
                  ref={(el) => (letterRefs.current[myIdx] = el)}
                  initial={{ y: "110%", rotate: 8 }}
                  animate={start ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 8 }}
                  transition={{ duration: 0.8, delay: 0.05 + myIdx * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block origin-bottom-left"
                  style={{ fontVariationSettings: `"wdth" ${BASE.w}, "wght" ${BASE.g}` }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
