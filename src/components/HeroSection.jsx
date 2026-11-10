"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, FramerIcon, LeetcodeIcon } from "./Icons";

export default function HeroSection({
  theme,
  setTheme,
  onOpenResume,
  onOpenPlay,
  playSound
}) {
  const [cordPulled, setCordPulled] = useState(false);
  const [coffeeSips, setCoffeeSips] = useState(0);
  const [laptopSnippetIndex, setLaptopSnippetIndex] = useState(0);
  const [activeMarker, setActiveMarker] = useState("blue");

  const toggleTheme = () => {
    setCordPulled(true);
    playSound && playSound("click");
    setTimeout(() => setCordPulled(false), 350);
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const sipCoffee = () => {
    playSound && playSound("pop");
    setCoffeeSips((prev) => prev + 1);
  };

  const laptopSnippets = [
    "> p99: 11.4ms [HikariCP OK]",
    "> 60 fps framer shaders",
    "> zod: 100% typeguard match",
    "> websocket mesh: <35ms",
    "> mvn spring-boot:run"
  ];

  const cycleLaptopSnippet = () => {
    playSound && playSound("click");
    setLaptopSnippetIndex((prev) => (prev + 1) % laptopSnippets.length);
  };

  const isDark = theme === "dark";
  const boardBg = isDark ? "#1C1C1E" : "#FFFFFF";

  return (
    <section
      id="hero"
      className="w-full min-h-[92vh] flex items-center justify-center px-4 sm:px-6 md:px-12 pt-20 pb-8 sm:pb-12 transition-colors overflow-x-hidden relative"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-end">

        {/* ============================================================== */}
        {/* Left Column: Powerful Typography, Staggered Pop-In Bio         */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-end pb-1.5 sm:pb-2">

          {/* Main Hero Heading with Bold Handcrafted Golden Accent */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 sm:mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-[1.08]">
              Hi, I'm{" "}
              <span className="relative inline-block text-black dark:text-white">
                Shakil!
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                  viewBox="0 0 120 18"
                  fill="none"
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#E5A823] pointer-events-none overflow-visible"
                >
                  <motion.path
                    d="M 3 13 C 35 5, 85 4, 117 11"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </h1>
          </motion.div>

          {/* Personal Bio */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md font-normal text-neutral-800 dark:text-neutral-200 text-justify transition-colors duration-300"
          >
            Full Stack Software Engineer specializing in backend architecture, scalable APIs, and Generative AI integrations with Java, Spring Boot, Next.js, and PostgreSQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-5 transition-colors duration-300"
          >
            <div>
              <p className="text-sm sm:text-base font-semibold text-black dark:text-white">
                B.Tech in Computer Science <span className="font-bold text-black dark:text-white">@NIET</span>
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                Greater Noida • CGPA: 8.97 / 10
              </p>
            </div>

            {/* Compact Profile Icons with Micro-Interactions */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-2.5">
              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/in/shakilurrehman21"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => playSound && playSound("pop")}
                className="group p-2 sm:p-2.5 rounded-xl border-2 border-black/15 dark:border-white/15 hover:border-[#0A66C2] dark:hover:border-[#0A66C2] bg-white/60 dark:bg-neutral-800/60 hover:bg-[#0A66C2]/10 dark:hover:bg-[#0A66C2]/20 text-neutral-700 dark:text-neutral-300 hover:text-[#0A66C2] dark:hover:text-[#388bfd] transition-all shadow-xs cursor-pointer"
                title="LinkedIn: @shakilurrehman21"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/shakilurrehman21"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => playSound && playSound("pop")}
                className="group p-2 sm:p-2.5 rounded-xl border-2 border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white bg-white/60 dark:bg-neutral-800/60 hover:bg-black/5 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all shadow-xs cursor-pointer"
                title="GitHub: @shakilurrehman21"
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>

              {/* LeetCode */}
              <motion.a
                href="https://leetcode.com/u/shakilurehman/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => playSound && playSound("pop")}
                className="group p-2 sm:p-2.5 rounded-xl border-2 border-black/15 dark:border-white/15 hover:border-[#FFA116] dark:hover:border-[#FFA116] bg-white/60 dark:bg-neutral-800/60 hover:bg-[#FFA116]/10 dark:hover:bg-[#FFA116]/20 text-neutral-700 dark:text-neutral-300 hover:text-[#FFA116] dark:hover:text-[#FFA116] transition-all shadow-xs cursor-pointer"
                title="LeetCode: @shakilurehman"
              >
                <LeetcodeIcon className="w-4 h-4 text-[#FFA116]" />
              </motion.a>

              {/* Framer */}
              <motion.a
                href="https://www.framer.com/@shakil-ur-rehman/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => playSound && playSound("pop")}
                className="group p-2 sm:p-2.5 rounded-xl border-2 border-black/15 dark:border-white/15 hover:border-[#0055FF] dark:hover:border-[#0055FF] bg-white/60 dark:bg-neutral-800/60 hover:bg-[#0055FF]/10 dark:hover:bg-[#0055FF]/20 text-neutral-700 dark:text-neutral-300 hover:text-[#0055FF] dark:hover:text-[#5599FF] transition-all shadow-xs relative cursor-pointer"
                title="Framer: @shakil-ur-rehman"
              >
                <FramerIcon className="w-4 h-4 text-[#0055FF]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-white dark:border-neutral-900"></span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* Right Column: INTERACTIVE DESK WORKSPACE, WHITEBOARD & LAMP    */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex justify-center items-center relative w-full overflow-visible">
          <div className="relative w-full max-w-[620px] flex flex-col justify-end select-none">

            {/* Interactive Items Sitting On Top of Whiteboard Edge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 220, damping: 18 }}
              className="w-full flex items-end justify-between px-6 sm:px-10 -mb-2 relative z-20"
            >

              {/* Left Desk Group: Steaming Coffee Cup & Mini Code Laptop */}
              <div className="flex items-end gap-3 sm:gap-4">

                {/* 1. Interactive Steaming Coffee Mug */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={sipCoffee}
                  className="relative group cursor-pointer p-1"
                  title="Click to sip coffee!"
                >
                  {/* Steam lines */}
                  <div className="absolute -top-3.5 left-2.5 flex gap-1 pointer-events-none">
                    <span className="w-0.5 h-3 bg-neutral-400 dark:bg-neutral-500 rounded-full steam-1"></span>
                    <span className="w-0.5 h-4 bg-neutral-400 dark:bg-neutral-500 rounded-full steam-2"></span>
                    <span className="w-0.5 h-3 bg-neutral-400 dark:bg-neutral-500 rounded-full steam-3"></span>
                  </div>

                  {/* Ceramic Mug SVG */}
                  <svg viewBox="0 0 40 32" className="w-8 sm:w-10 h-auto drop-shadow-sm transition-transform">
                    {/* Mug body */}
                    <rect x="6" y="8" width="22" height="22" rx="3" fill="#DCA73C" stroke="#000000" strokeWidth="2.2" />
                    {/* Mug handle */}
                    <path d="M 28 12 Q 37 12 37 19 Q 37 26 28 26" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
                    {/* Hot coffee surface */}
                    <ellipse cx="17" cy="8" rx="11" ry="3" fill="#5A3A1A" stroke="#000000" strokeWidth="1.8" />
                  </svg>

                  {/* Sips counter toast */}
                  {coffeeSips > 0 && (
                    <span className="absolute -bottom-2 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-black text-white font-bold border border-white">
                      +{coffeeSips}
                    </span>
                  )}
                </motion.button>

                {/* 2. Interactive Mini Code Laptop */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={cycleLaptopSnippet}
                  className="group cursor-pointer flex flex-col items-center"
                  title="Click to cycle terminal code snippet!"
                >
                  <div className="px-2 py-1 rounded-t-md bg-[#0C0E12] border-2 border-black border-b-0 text-[9px] font-mono text-emerald-400 flex items-center gap-1 shadow-sm group-hover:border-emerald-500 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="truncate max-w-[130px] sm:max-w-[170px]">
                      {laptopSnippets[laptopSnippetIndex]}
                    </span>
                  </div>
                  {/* Laptop base */}
                  <div className="w-24 sm:w-32 h-1.5 bg-neutral-300 dark:bg-neutral-700 border-2 border-black rounded-b-md"></div>
                </motion.button>

              </div>

            </motion.div>

            {/* Main Stage: Whiteboard + Floor Lamp */}
            <div className="w-full flex items-end justify-between gap-1.5 sm:gap-6 px-0 sm:px-2 mb-0">

              {/* Whiteboard with Spring Pop-In Entrance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 border-[2.8px] sm:border-[3.5px] rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-md transition-colors duration-300 min-w-0 flex flex-col justify-between"
                style={{
                  backgroundColor: boardBg,
                  borderColor: "#000000"
                }}
              >
                {/* Whiteboard Header Bar */}
                <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-black/10 dark:border-white/10 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="ml-1 text-[11px] font-semibold text-black dark:text-white">
                      workspace // quick-nav
                    </span>
                  </div>
                  <span className="hidden sm:inline">Click tiles to explore</span>
                </div>

                {/* 4 App Tiles with Staggered Spring Pop-In and Tactile Hover */}
                <div className="w-full h-full min-h-[140px] sm:min-h-[190px] flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-[480px]">

                    {/* 1. Blue: Projects (#2367B2) */}
                    <motion.a
                      href="#projects"
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.08, y: -4, transition: { type: "spring", stiffness: 450, damping: 15 } }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => playSound && playSound("pop")}
                      className="group flex flex-col items-center justify-center aspect-square rounded-xl sm:rounded-2xl bg-[#2367B2] text-white p-1.5 sm:p-2 shadow-sm cursor-pointer touch-manipulation relative overflow-hidden"
                    >
                      <div className="w-7 h-5 sm:w-12 sm:h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                        <svg viewBox="0 0 60 40" className="w-full h-full">
                          <rect x="7" y="9" width="18" height="15" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="3" />
                          <rect x="35" y="9" width="18" height="15" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="3" />
                          <line x1="25" y1="16" x2="35" y2="16" stroke="#FFFFFF" strokeWidth="3" />
                          <circle cx="16" cy="16.5" r="2.2" fill="#FFFFFF" />
                          <circle cx="44" cy="16.5" r="2.2" fill="#FFFFFF" />
                          <path d="M25 28 Q30 33 35 28" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="doodle-font text-xs sm:text-base md:text-lg mt-0.5 font-normal tracking-wide">Projects</span>
                    </motion.a>

                    {/* 2. Yellow: Expertise (#DCA73C) */}
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.08, y: -4, transition: { type: "spring", stiffness: 450, damping: 15 } }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        playSound && playSound("pop");
                        onOpenPlay && onOpenPlay();
                      }}
                      className="group flex flex-col items-center justify-center aspect-square rounded-xl sm:rounded-2xl bg-[#DCA73C] text-white p-1.5 sm:p-2 shadow-sm cursor-pointer touch-manipulation"
                    >
                      <div className="w-7 h-5 sm:w-12 sm:h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[2.2]">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </div>
                      <span className="doodle-font text-xs sm:text-base md:text-lg mt-0.5 font-normal tracking-wide">Expertise</span>
                    </motion.button>

                    {/* 3. Green: Work (#2B764D) -> Framer Showcase */}
                    <motion.a
                      href="https://framer-showcase-two.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.08, y: -4, transition: { type: "spring", stiffness: 450, damping: 15 } }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => playSound && playSound("whoosh")}
                      className="group flex flex-col items-center justify-center aspect-square rounded-xl sm:rounded-2xl bg-[#2B764D] text-white p-1.5 sm:p-2 shadow-sm cursor-pointer touch-manipulation"
                      title="Framer Components Lab"
                    >
                      <div className="w-7 h-5 sm:w-12 sm:h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current">
                          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
                        </svg>
                      </div>
                      <span className="doodle-font text-xs sm:text-base md:text-lg mt-0.5 font-normal tracking-wide">Work</span>
                    </motion.a>

                    {/* 4. Red: Resume (#B74644) */}
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.8, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.49, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.08, y: -4, transition: { type: "spring", stiffness: 450, damping: 15 } }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        playSound && playSound("pop");
                        onOpenResume && onOpenResume();
                      }}
                      className="group flex flex-col items-center justify-center aspect-square rounded-xl sm:rounded-2xl bg-[#B74644] text-white p-1.5 sm:p-2 shadow-sm cursor-pointer touch-manipulation"
                    >
                      <div className="w-7 h-5 sm:w-12 sm:h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                        <svg viewBox="0 0 60 40" className="w-full h-full">
                          <circle cx="15" cy="18" r="2.2" fill="#FFFFFF" />
                          <path d="M13 25 Q17 28 20 25" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
                          <line x1="28" y1="13" x2="48" y2="13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                          <line x1="32" y1="19" x2="48" y2="19" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                          <line x1="32" y1="25" x2="48" y2="25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="doodle-font text-xs sm:text-base md:text-lg mt-0.5 font-normal tracking-wide">Resume</span>
                    </motion.button>

                  </div>
                </div>

                {/* Marker Tray at bottom of Whiteboard */}
                <div className="pt-2 mt-1 sm:mt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {["blue", "green", "red"].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          playSound && playSound("click");
                          setActiveMarker(color);
                        }}
                        className={`w-5 h-2 rounded-full border border-black/40 transition-transform active:scale-90 ${color === "blue" ? "bg-blue-500" : color === "green" ? "bg-emerald-500" : "bg-rose-500"
                          } ${activeMarker === color ? "scale-125 shadow-sm" : "opacity-70 hover:opacity-100"}`}
                        title={`Select ${color} marker`}
                      />
                    ))}
                  </div>
                  <span className="doodle-font text-xs text-neutral-400">
                    Shakil's Desk
                  </span>
                </div>

              </motion.div>

              {/* Floor Lamp: Connected DIRECTLY to its stand pole with Slide-Up Motion */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center flex-shrink-0 mb-0 pl-1 pr-1 sm:px-0"
              >

                {/* Glow bloom in dark mode */}
                {isDark && (
                  <div className="absolute -top-6 w-36 h-36 rounded-full bg-amber-300/50 blur-2xl pointer-events-none transition-opacity duration-500"></div>
                )}

                {/* Flared bell lampshade */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="cursor-pointer transition-transform z-20 touch-manipulation focus:outline-none bg-transparent border-0 p-0"
                  title="Click lamp to toggle Dark Mode"
                >
                  <svg viewBox="0 0 95 80" className="w-16 sm:w-24 h-auto">
                    <path
                      d="M 32 10 
                         L 63 10 
                         Q 65 30 84 62 
                         Q 58 72 47 70 
                         Q 37 72 11 62 
                         Q 30 30 32 10 Z"
                      fill={isDark ? "#FDE047" : "#FFFFFF"}
                      stroke="#000000"
                      strokeWidth="3.2"
                      strokeLinejoin="round"
                      className="transition-colors duration-300"
                    />
                    <ellipse cx="47.5" cy="10" rx="15.5" ry="3.5" fill={isDark ? "#FACC15" : "#F4F4F5"} stroke="#000000" strokeWidth="2.4" />
                  </svg>
                </motion.button>

                {/* Straight Stand Pole connected directly to the lampshade and continuing all the way down */}
                <div className="w-[3px] sm:w-[3.5px] h-36 sm:h-44 bg-black dark:bg-neutral-800 -mt-2 z-10 relative">

                  {/* Pull Cord hanging alongside the stand pole */}
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Pull cord to toggle dark mode"
                    className={`absolute top-0 -left-4 sm:-left-3.5 flex flex-col items-center cursor-pointer group touch-manipulation p-2 -m-2 focus:outline-none bg-transparent border-0 ${cordPulled ? "pulling-cord" : ""}`}
                    title="Pull cord for Dark mode!"
                  >
                    <div className="w-[2px] h-8 sm:h-9 bg-black dark:bg-white"></div>
                    <div className="w-3 h-4 sm:w-3 sm:h-4.5 rounded-full border-[2px] border-black dark:border-white bg-white dark:bg-black"></div>
                  </button>

                  {/* Handwritten 'Dark mode?' note with curved arrow */}
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Click note to toggle dark mode"
                    className="hidden sm:flex absolute top-12 left-3 items-center gap-1 cursor-pointer whitespace-nowrap select-none touch-manipulation focus:outline-none bg-white dark:bg-black px-2 py-1 rounded-md shadow-sm z-30"
                  >
                    <svg viewBox="0 0 35 30" className="w-5 sm:w-6 h-4 sm:h-5 text-neutral-500 dark:text-neutral-400 rotate-180 sm:rotate-0">
                      <path d="M 6 8 Q 24 12 28 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 23 18 L 28 22 L 29 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="doodle-font text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors font-normal">
                      {isDark ? "Light mode?" : "Dark mode?"}
                    </span>
                  </button>

                </div>

                {/* Small black line only below the lamp */}
                <div className="w-10 sm:w-14 h-[3.5px] bg-black dark:bg-neutral-300 rounded-full mt-0 z-10"></div>

              </motion.div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
