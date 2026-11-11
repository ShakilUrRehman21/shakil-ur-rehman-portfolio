"use client";
import React, { useEffect } from "react";
import AppShell, { useApp } from "../components/AppShell";
import HeroSection from "../components/HeroSection";
import StackMarquee from "../components/StackMarquee";
import ProjectsSection from "../components/ProjectsSection";
import OpenSource from "../components/OpenSource";
import Experience from "../components/Experience";

// Arriving from another page with a hash (e.g. /#work): glide there
function HashScroll() {
  const { scrollTo } = useApp();
  useEffect(() => {
    if (!window.location.hash) return;
    const t = setTimeout(() => scrollTo(window.location.hash), 300);
    return () => clearTimeout(t);
  }, [scrollTo]);
  return null;
}

export default function Home() {
  return (
    <AppShell>
      <HashScroll />
      <HeroSection />
      <StackMarquee />
      <ProjectsSection />
      <OpenSource />
      <Experience />
    </AppShell>
  );
}
