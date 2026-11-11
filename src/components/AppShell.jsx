"use client";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { playSound as rawPlaySound, isMuted, setMuted } from "../lib/sound";
import TopNav from "./TopNav";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ResumeModal from "./ResumeModal";
import CaseStudyModal from "./CaseStudyModal";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function AppShell({ children }) {
  const [theme, setTheme] = useState("light");
  const [muted, setMutedState] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const introDone = true;
  const lenisRef = useRef(null);

  // Theme + sound preference from the pre-hydration script / storage
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMutedState(isMuted());
  }, []);

  const playSound = useCallback((name) => rawPlaySound(name), []);

  const toggleMute = useCallback(() => {
    const next = !isMuted();
    setMuted(next);
    setMutedState(next);
    if (!next) rawPlaySound("ok");
  }, []);

  // Circular reveal from the point the user clicked
  const toggleTheme = useCallback(
    (e) => {
      const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
      const apply = () => {
        document.documentElement.classList.toggle("dark", next === "dark");
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("portfolio_theme", next);
        } catch (err) {}
        flushSync(() => setTheme(next));
      };
      rawPlaySound("click");

      if (!document.startViewTransition || prefersReducedMotion()) {
        apply();
        return;
      }

      let x = e?.clientX ?? window.innerWidth - 60;
      let y = e?.clientY ?? 40;
      if ((!x && !y) && e?.currentTarget?.getBoundingClientRect) {
        const r = e.currentTarget.getBoundingClientRect();
        x = r.left + r.width / 2;
        y = r.top + r.height / 2;
      }
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const vt = document.startViewTransition(apply);
      vt.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
          );
        })
        .catch(() => {});
    },
    []
  );

  // Smooth scrolling (skipped for reduced motion)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // In-page anchor links glide instead of jumping
  const scrollTo = useCallback((target) => {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -16, duration: 1.4 });
    else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      scrollTo(el);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  // Pause page scrolling while a dialog is open
  const anyModal = resumeOpen || !!caseId;
  useEffect(() => {
    if (anyModal) {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
    }
  }, [anyModal]);

  const value = {
    theme,
    toggleTheme,
    muted,
    toggleMute,
    playSound,
    introDone,
    scrollTo,
    openResume: () => setResumeOpen(true),
    openCase: (id) => setCaseId(id),
  };

  return (
    <AppContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        <TopNav />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        <CaseStudyModal projectId={caseId} onClose={() => setCaseId(null)} />
      </MotionConfig>
    </AppContext.Provider>
  );
}
