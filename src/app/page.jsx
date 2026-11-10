"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import AreasOfInterest from "../components/AreasOfInterest";
import Footer from "../components/Footer";
import ResumeModal from "../components/ResumeModal";
import PlayModal from "../components/PlayModal";
import CaseStudyModal from "../components/CaseStudyModal";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPlayOpen, setIsPlayOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isAreasCollapsed, setIsAreasCollapsed] = useState(false);

  const toggleAreas = () => {
    playSound && playSound(isAreasCollapsed ? "pop" : "slide");
    setIsAreasCollapsed((prev) => !prev);
  };

  // Sync theme from localStorage on initial load
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      } else if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      }
    } catch (e) {}
  }, []);

  // Sync theme to class, attribute, and localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("portfolio_theme", "dark");
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("portfolio_theme", "light");
      } catch (e) {}
    }
  }, [theme]);

  // Web Audio Synthesizer for rich interactive audio micro-feedback
  const playSound = (type = "pop") => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === "pop") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "click") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === "slide") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "whoosh") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-300 selection:text-neutral-900 transition-colors">
      
      {/* 
        Top Header: 
        - Stage 1: '(avatar) Siddharth Hardikar' + Seattle live clock on Hero section
        - Stage 2: Floating pill navbar with 'Home  Play  About Me  Resume' as we leave Hero section
      */}
      <TopNav 
        theme={theme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPlay={() => setIsPlayOpen(true)}
        playSound={playSound}
      />

      {/* Main Content (Strictly relative so paper grain texture stays inside main) */}
      <main className="relative flex-1 w-full">
        {/* Hero Section */}
        <HeroSection
          theme={theme}
          setTheme={setTheme}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenPlay={() => setIsPlayOpen(true)}
          playSound={playSound}
        />

        {/* Animated Horizontal Divider Line: Grows from Center to Left & Right on Scroll (once, no fade out) */}
        <div className="w-full px-4 sm:px-6 md:px-12 my-6 sm:my-8 relative z-20">
          <div className="max-w-6xl w-full mx-auto">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0.5 }}
              className="w-full h-[3px] bg-black dark:bg-white/80 rounded-full"
            />
          </div>
        </div>

        {/* Projects 2x2 Showcase */}
        <ProjectsSection 
          theme={theme}
          onSelectProject={(id) => setSelectedProjectId(id)}
          playSound={playSound}
        />

        {/* Areas of Interest / 'Me' Green Section with Interactive Collapse Toggle */}
        <AreasOfInterest
          isCollapsed={isAreasCollapsed}
          onToggle={toggleAreas}
          playSound={playSound}
        />
      </main>

      {/* Plain Solid Black Footer with Inverted Tab attached to footer top when collapsed */}
      <Footer 
        playSound={playSound} 
        isAreasCollapsed={isAreasCollapsed}
        onToggleAreas={toggleAreas}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        playSound={playSound}
      />

      <PlayModal
        isOpen={isPlayOpen}
        onClose={() => setIsPlayOpen(false)}
        playSound={playSound}
      />

      <CaseStudyModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        playSound={playSound}
      />

    </div>
  );
}
