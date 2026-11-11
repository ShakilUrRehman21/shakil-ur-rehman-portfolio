"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon, Volume2, VolumeX, Menu, X } from "lucide-react";
import { useApp } from "./AppShell";

const sections = [
  { id: "work", label: "Work" },
  { id: "open-source", label: "Open source" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function useDelhiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function TopNav() {
  const { theme, toggleTheme, muted, toggleMute, playSound, openResume } = useApp();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const time = useDelhiTime();
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (menuOpen) return;
    if (y > 260 && y > prev + 4) setHidden(true);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    if (!isHome) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const href = (id) => (isHome ? `#${id}` : `/#${id}`);
  const NavLink = isHome ? "a" : Link;
  const iconBtn = "w-9 h-9 grid place-items-center rounded-lg text-muted hover:text-ink hover:bg-sunken transition-colors";

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-[80] px-3 sm:px-5 pt-2.5"
      >
        <div
          className={`mx-auto max-w-[1120px] flex items-center justify-between gap-3 rounded-xl px-1.5 py-1.5 border transition-[background-color,box-shadow,border-color] duration-500 ${
            menuOpen
              ? "bg-white/[0.06] border-white/10 [&_button]:text-[#ECEEF8]"
              : scrolled
              ? "bg-surface/80 backdrop-blur-xl border-line/10 shadow-[0_8px_30px_-14px_rgb(var(--ink)/0.3)]"
              : "bg-transparent border-transparent"
          }`}
        >
          <Link href="/" onClick={() => playSound("pop")} className="group flex items-center gap-2.5 rounded-lg pr-2" aria-label="Shakil Ur Rehman, home">
            <span className="w-8 h-8 rounded-lg bg-ink text-bg grid place-items-center text-[13px] font-bold tracking-tight">SR</span>
            <span className={`hidden sm:flex flex-col leading-tight ${menuOpen ? "text-[#ECEEF8]" : ""}`}>
              <span className="text-[13.5px] font-semibold">Shakil Ur Rehman</span>
              <span className="text-[11.5px] text-muted flex items-center gap-1.5">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-mint" />
                New Delhi, {time || "--:--"}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-0.5 p-0.5 rounded-lg bg-sunken/70 border border-line/10">
            {sections.map((s) => (
              <NavLink key={s.id} href={href(s.id)} onClick={() => playSound("pop")} className="relative px-3 py-1 text-[13px] font-medium rounded-md">
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-surface shadow-sm border border-line/10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={`relative transition-colors ${active === s.id ? "text-ink" : "text-muted hover:text-ink"}`}>{s.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" onClick={toggleMute} aria-label={muted ? "Turn interface sounds on" : "Turn interface sounds off"} aria-pressed={!muted} className={iconBtn}>
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"} className={`${iconBtn} overflow-hidden`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 14, rotate: -90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -14, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => {
                playSound("pop");
                openResume();
              }}
              className="hidden sm:inline-flex h-9 items-center px-3.5 rounded-lg bg-ink text-bg text-[13px] font-semibold hover:bg-cobalt hover:text-white transition-colors"
            >
              Résumé
            </button>
            <button
              type="button"
              onClick={() => {
                playSound(menuOpen ? "slide" : "pop");
                setMenuOpen((v) => !v);
              }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden w-9 h-9 grid place-items-center rounded-lg bg-ink text-bg"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-night text-[#ECEEF8] px-6 pt-24 pb-8 flex flex-col justify-between md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[...sections, { id: "resume", label: "Résumé" }].map((s, i) => {
                const cls = "font-display text-[2rem] leading-tight py-1.5 text-left";
                const style = { fontVariationSettings: '"wdth" 110, "wght" 720' };
                const inner = (
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {s.label}
                  </motion.span>
                );
                return s.id === "resume" ? (
                  <button
                    key={s.id}
                    type="button"
                    className={cls}
                    style={style}
                    onClick={() => {
                      setMenuOpen(false);
                      openResume();
                    }}
                  >
                    {inner}
                  </button>
                ) : (
                  <NavLink key={s.id} href={href(s.id)} className={cls} style={style} onClick={() => setMenuOpen(false)}>
                    {inner}
                  </NavLink>
                );
              })}
            </nav>
            <p className="text-[13px] text-[#A3A9C9]">New Delhi, {time}. Open to new opportunities.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
