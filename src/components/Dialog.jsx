"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { playSound } from "../lib/sound";

// Shared dialog: "side" slides in from the right, "center" scales up.
export default function Dialog({ open, onClose, label, variant = "center", maxWidth = "max-w-3xl", children }) {
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    const t = setTimeout(() => panelRef.current?.focus(), 50);
    const onKey = (e) => {
      if (e.key === "Escape") {
        playSound("slide");
        onClose();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a[href], button, input, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  const side = variant === "side";

  return (
    <AnimatePresence>
      {open && (
        <div className={`fixed inset-0 z-[120] flex ${side ? "justify-end" : "items-center justify-center p-3 sm:p-6"}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              playSound("slide");
              onClose();
            }}
            className="absolute inset-0 bg-[rgb(8_10_24/0.6)] backdrop-blur-md"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            data-lenis-prevent
            initial={side ? { x: "100%" } : { opacity: 0, y: 40, scale: 0.96 }}
            animate={side ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={side ? { x: "100%" } : { opacity: 0, y: 30, scale: 0.97 }}
            transition={side ? { type: "spring", stiffness: 260, damping: 32 } : { type: "spring", stiffness: 320, damping: 30 }}
            className={`relative bg-surface text-ink outline-none overflow-y-auto overscroll-contain ${
              side
                ? "h-full w-full sm:w-[min(680px,92vw)] sm:rounded-l-3xl shadow-[-30px_0_80px_-20px_rgb(0_0_0/0.5)]"
                : `w-full ${maxWidth} max-h-[90vh] rounded-3xl shadow-[0_40px_120px_-30px_rgb(0_0_0/0.6)]`
            }`}
          >
            <button
              type="button"
              onClick={() => {
                playSound("slide");
                onClose();
              }}
              aria-label="Close"
              className="sticky top-3 float-right mr-3 mt-3 z-10 w-9 h-9 rounded-full bg-sunken hover:bg-ink hover:text-bg grid place-items-center transition-colors"
            >
              <motion.span whileHover={{ rotate: 90 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                <X className="w-4 h-4" />
              </motion.span>
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
