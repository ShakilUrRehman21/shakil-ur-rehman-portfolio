"use client";
import React, { useState, useEffect } from "react";

export default function TopNav({ theme, onOpenResume, onOpenPlay, playSound }) {
  const [seattleTime, setSeattleTime] = useState("");
  const [isPastHero, setIsPastHero] = useState(false);

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
        setSeattleTime(formatter.format(now));
      } catch (e) {
        setSeattleTime("09:30:00 PM");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger floating pill as soon as user scrolls down 160px from top
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsPastHero(scrollY > 160);
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
        Header shows: Avatar + Shakil Ur Rehman on Left, New Delhi, India time on Right
        SOLID BLACK (#000000) in light mode, WHITE in dark mode
      */}
      <div 
        className={`w-full px-4 sm:px-6 py-3 sm:py-4 md:px-12 flex items-center justify-between transition-all duration-300 ${
          !isPastHero ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Left: Avatar + Shakil Ur Rehman */}
        <a 
          href="#hero" 
          className="flex items-center gap-2 sm:gap-3 group"
          onClick={() => playSound && playSound("pop")}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex-shrink-0 flex items-center justify-center shadow-md transition-transform group-hover:scale-105 border border-emerald-400/30">
            <span className="font-mono font-bold text-white text-[11px] sm:text-xs tracking-tighter">
              &lt;SR/&gt;
            </span>
          </div>
          <span 
            className="font-semibold text-sm sm:text-base md:text-lg tracking-tight transition-colors truncate max-w-[150px] sm:max-w-none"
            style={{ color: isDark ? "#FFFFFF" : "#000000" }}
          >
            Shakil Ur Rehman
          </span>
        </a>

        {/* Right: New Delhi, India Time */}
        <div 
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono transition-colors"
          style={{ color: isDark ? "#FFFFFF" : "#000000" }}
        >
          <span className="font-sans font-medium text-[11px] sm:text-xs md:text-sm hidden xs:inline">New Delhi</span>
          <span className="font-mono text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">
            {seattleTime || "09:30:00 PM"}
          </span>
        </div>
      </div>

      {/* 
        STAGE 2 (AS WE LEAVE HERO SECTION):
        Floating centered pill navbar with: Home  Expertise  About Me  Resume
      */}
      <div 
        className={`absolute top-0 left-0 right-0 w-full flex justify-center px-3 pt-3 sm:pt-3.5 transition-all duration-300 ${
          isPastHero ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="inline-flex items-center gap-0.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-black dark:text-white shadow-[0_6px_25px_rgba(0,0,0,0.12)] border border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm font-medium max-w-full overflow-x-auto">
          <a 
            href="#hero" 
            onClick={() => playSound && playSound("pop")}
            className="px-2.5 sm:px-3.5 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
          >
            Home
          </a>
          <a 
            href="#projects" 
            onClick={() => playSound && playSound("pop")}
            className="px-2.5 sm:px-3.5 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
          >
            Projects
          </a>
          <button 
            onClick={() => {
              playSound && playSound("pop");
              onOpenPlay && onOpenPlay();
            }}
            className="px-2.5 sm:px-3.5 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
          >
            Expertise
          </button>
          <button 
            onClick={() => {
              playSound && playSound("pop");
              onOpenResume && onOpenResume();
            }}
            className="px-2.5 sm:px-3.5 py-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white transition-colors whitespace-nowrap"
          >
            Resume
          </button>
        </nav>
      </div>

    </header>
  );
}
