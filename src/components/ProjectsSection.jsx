"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate, useInView } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useApp } from "./AppShell";
import { GithubIcon } from "./Icons";
import ProjectVisual from "./ProjectVisual";
import { projects, DOMAINS } from "../data/projects";

const FEATURED = ["repolens", "taskflow", "crashledger"];

// Counts from the "before" number to the "after" number when scrolled into view
function Metric({ metric, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const from = parseFloat(metric.from);
  const to = parseFloat(metric.to);
  const suffix = metric.to.replace(/^[\d.]+/, "");
  const decimals = String(to).includes(".") ? 1 : 0;
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const c = animate(from, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: setVal });
    return () => c.stop();
  }, [inView, from, to]);

  return (
    <div ref={ref} className="mt-4 flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ background: `rgb(var(--${color}) / 0.09)` }}>
      <p className="font-display text-[1.45rem] leading-none tabular-nums whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100, "wght" 800', color: `rgb(var(--${color}))` }}>
        {val.toFixed(decimals)}
        {suffix} <span className="text-[13px] font-sans font-semibold">{metric.unit}</span>
      </p>
      <p className="text-[12.5px] leading-snug text-muted">
        from {metric.from}: {metric.note}
      </p>
    </div>
  );
}

function FeaturedCard({ project, index }) {
  const { openCase, playSound } = useApp();
  const color = `rgb(var(--${project.domain}))`;
  const flip = index % 2 === 1;

  const stop = (e) => {
    e.stopPropagation();
    playSound("whoosh");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={() => {
        playSound("pop");
        openCase(project.id);
      }}
      className="group cursor-pointer rounded-2xl bg-surface border border-line/10 shadow-[0_16px_40px_-28px_rgb(var(--ink)/0.45)] hover:shadow-[0_24px_50px_-26px_rgb(var(--ink)/0.5)] transition-shadow overflow-hidden grid grid-cols-1 md:grid-cols-12"
    >
      <div className={`md:col-span-5 m-2 rounded-xl p-4 sm:p-5 flex items-center ${flip ? "md:order-2" : ""}`} style={{ background: color }}>
        <ProjectVisual project={project} />
      </div>

      <div className={`md:col-span-7 p-5 sm:p-6 flex flex-col ${flip ? "md:order-1" : ""}`}>
        <p className="flex items-center gap-2 text-[12.5px] text-muted">
          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
          {DOMAINS[project.domain].label}
        </p>
        <h3
          className="mt-2 font-display text-[1.65rem] leading-none tracking-[-0.025em] transition-[font-variation-settings] duration-500 [font-variation-settings:'wdth'_100,'wght'_780] group-hover:[font-variation-settings:'wdth'_118,'wght'_840]"
        >
          {project.title}
        </h3>
        <p className="mt-1.5 text-[14px] font-medium" style={{ color }}>
          {project.subtitle}
        </p>

        {project.metric && <Metric metric={project.metric} color={project.domain} />}

        <ul className="mt-4 space-y-1.5 text-[14px] leading-relaxed text-ink/85">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span className="mt-[9px] w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 flex flex-wrap items-center gap-1.5">
          {project.tags.slice(0, 5).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[11.5px] bg-sunken text-ink/75">
              {t}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1.5 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playSound("pop");
                openCase(project.id);
              }}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-ink text-bg text-[12.5px] font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Case study
            </button>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={stop} className="group/l inline-flex items-center gap-1 h-8 px-3 rounded-full border border-line/20 text-[12.5px] font-semibold hover:border-ink transition-colors">
              Live
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={stop} aria-label={`${project.title} source on GitHub`} className="w-8 h-8 grid place-items-center rounded-full border border-line/20 hover:border-ink transition-colors">
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const { playSound } = useApp();
  const list = FEATURED.map((id) => projects.find((p) => p.id === id));

  return (
    <section id="work" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="h-section">Featured projects</h2>
            <p className="mt-2.5 text-[15px] text-muted max-w-[52ch]">
              Built end to end and load-tested. Open any card for the full case study.
            </p>
          </div>
          <Link
            href="/projects"
            onClick={() => playSound("whoosh")}
            className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-line/15 bg-surface text-[13px] font-semibold hover:border-ink transition-colors"
          >
            All {projects.length} projects
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="space-y-5">
          {list.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
