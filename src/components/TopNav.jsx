"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav({ theme, onOpenResume, onOpenPlay, playSound }) {
  const [delhiTime, setDelhiTime] = useState("");
  const [isPastHero, setIsPastHero] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setDelhiTime(formatter.format(now));
      } catch (e) {
        setDelhiTime("09:30:00 PM");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsPastHero(scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none transition-all duration-300">
      
      {/* 
        STAGE 1 (ON HERO SECTION):
        - Outer container has px-4 sm:px-6 md:px-12
        - Inner container has max-w-6xl w-full mx-auto
        - This guarantees the logo starts at the EXACT same horizontal coordinate as 'Hi, I'm Shakil!'
        - And the New Delhi clock ends at the EXACT same horizontal coordinate as the lamp on the right
      */}
      <div className="w-full px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl w-full mx-auto">
          <div 
            className={`w-full py-3.5 sm:py-4 flex items-center justify-between transition-all duration-300 ${
              !isPastHero ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            {/* Left: Previous Vibrant Emerald/Teal Gradient <SR/> Logo + Name */}
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={() => playSound && playSound("pop")}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex-shrink-0 flex items-center justify-center shadow-md transition-transform group-hover:scale-105 border border-emerald-400/30">
                <span className="font-mono font-bold text-white text-[11px] sm:text-xs tracking-tighter">
                  &lt;SR/&gt;
                </span>
              </div>
              <span 
                className="font-bold text-sm sm:text-base md:text-lg tracking-tight text-black dark:text-white transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                Shakil Ur Rehman
              </span>
            </Link>

            {/* Right: Compact New Delhi, India Time with Live Pulse Indicator */}
            <div 
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-xs font-mono text-black dark:text-white backdrop-blur-xs shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-sans font-medium text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 hidden sm:inline">New Delhi</span>
              <span className="font-semibold text-[11px] sm:text-xs whitespace-nowrap">
                {delhiTime || "09:30:00 PM"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        STAGE 2 (FLOATING PILL NAVBAR AS USER LEAVES HERO SECTION):
        - Floating island with Home, Projects, Expertise, Resume
      */}
      <div 
        className={`absolute top-0 left-0 right-0 w-full flex justify-center px-3 pt-3 sm:pt-3.5 transition-all duration-300 ${
          isPastHero ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="inline-flex items-center gap-1 sm:gap-2 px-3.5 sm:px-6 py-1.5 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-black dark:text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-neutral-300/80 dark:border-neutral-700 text-xs sm:text-sm font-semibold max-w-full overflow-x-auto">
          {isHome ? (
            <a 
              href="#hero" 
              onClick={() => playSound && playSound("pop")}
              className="px-2.5 sm:px-3 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
            >
              Home
            </a>
          ) : (
            <Link 
              href="/" 
              onClick={() => playSound && playSound("pop")}
              className="px-2.5 sm:px-3 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
            >
              Home
            </Link>
          )}

          {isHome ? (
            <a 
              href="#projects" 
              onClick={() => playSound && playSound("pop")}
              className="px-2.5 sm:px-3 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
            >
              Projects
            </a>
          ) : (
            <Link 
              href="/#projects" 
              onClick={() => playSound && playSound("pop")}
              className="px-2.5 sm:px-3 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
            >
              Projects
            </Link>
          )}

          <button 
            type="button"
            onClick={() => {
              playSound && playSound("pop");
              onOpenPlay && onOpenPlay();
            }}
            className="px-2.5 sm:px-3 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            Expertise
          </button>
          <button 
            type="button"
            onClick={() => {
              playSound && playSound("pop");
              onOpenResume && onOpenResume();
            }}
            className="px-2.5 sm:px-3 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            Resume
          </button>
        </nav>
      </div>

    </header>
  );
}
