"use client";
import React from "react";
import { motion } from "framer-motion";
import { GitPullRequest, ArrowUpRight } from "lucide-react";
import { useApp } from "./AppShell";
import { openSource } from "../data/resume";

export default function OpenSource() {
  const { playSound } = useApp();
  const prCount = openSource.reduce((n, o) => n + o.prs.length, 0);

  return (
    <section id="open-source" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 bg-sunken/50 border-y border-line/10">
      <div className="mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="h-section">Open source</h2>
            <p className="mt-2.5 text-[15px] text-muted max-w-[38ch]">
              Fixes and tests contributed to the frameworks I build with, including merged PRs in React, Next.js and Spring Boot.
            </p>
            <p className="mt-5 flex gap-6 text-[13px] text-muted">
              <span>
                <span className="block font-display text-[1.6rem] leading-none text-ink" style={{ fontVariationSettings: '"wdth" 100, "wght" 800' }}>
                  {prCount}
                </span>
                pull requests
              </span>
              <span>
                <span className="block font-display text-[1.6rem] leading-none text-ink" style={{ fontVariationSettings: '"wdth" 100, "wght" 800' }}>
                  {openSource.length}
                </span>
                projects
              </span>
            </p>
          </div>
        </div>

        <ul className="lg:col-span-8 rounded-2xl bg-surface border border-line/10 divide-y divide-line/10 overflow-hidden">
          {openSource.map((o, i) => {
            const color = `rgb(var(--${o.color}))`;
            return (
              <motion.li
                key={o.repo}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-wrap sm:flex-nowrap items-start gap-x-4 gap-y-2 p-4 sm:p-5 hover:bg-sunken/60 transition-colors"
              >
                <span
                  className="shrink-0 w-10 h-10 rounded-xl grid place-items-center font-display text-[15px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
                  style={{ background: `rgb(var(--${o.color}) / 0.14)`, color, fontVariationSettings: '"wdth" 110, "wght" 850' }}
                  aria-hidden="true"
                >
                  {o.project[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[15px] font-semibold">{o.project}</span>
                    <span className="text-[12.5px] text-muted font-mono">{o.repo}</span>
                  </p>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-ink/80">{o.what}</p>
                </div>
                <div className="shrink-0 flex flex-wrap gap-1.5 w-full sm:w-auto pl-14 sm:pl-0">
                  {o.prs.map((pr) => (
                    <a
                      key={pr.n}
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("pop")}
                      aria-label={`${o.project} pull request ${pr.n} on GitHub`}
                      className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full border border-line/15 text-[12px] font-semibold tabular-nums hover:bg-ink hover:text-bg hover:border-ink transition-colors"
                    >
                      <GitPullRequest className="w-3 h-3" />#{pr.n}
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
