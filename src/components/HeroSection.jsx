"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, FileText, GitMerge } from "lucide-react";
import { useApp } from "./AppShell";
import KineticName from "./KineticName";
import SystemGraph from "./SystemGraph";
import Magnetic from "./Magnetic";
import { GithubIcon, LinkedinIcon, FramerIcon, LeetcodeIcon } from "./Icons";
import { contact } from "../data/projects";
import { summary } from "../data/resume";

const socials = [
  { href: contact.linkedin, label: "LinkedIn", Icon: LinkedinIcon, tint: "#0A66C2" },
  { href: contact.github, label: "GitHub", Icon: GithubIcon, tint: "currentColor" },
  { href: contact.leetcode, label: "LeetCode", Icon: LeetcodeIcon, tint: "#FFA116" },
  { href: contact.framer, label: "Framer", Icon: FramerIcon, tint: "#0055FF" },
];

// The title sits right above, so drop the repeated "Full Stack Developer" from the summary
const heroSummary = summary.replace(/^Full Stack Developer building/, "Building");

const fade = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  const { openResume, playSound } = useApp();

  return (
    <section id="top" className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden grain">
      <div className="relative mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.p {...fade(0)} className="inline-flex items-center gap-2 text-[13px] text-muted">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-mint" />
            Open to new opportunities
          </motion.p>

          <KineticName
            lines={["Shakil", "Ur Rehman"]}
            start
            className="mt-3 font-display text-[clamp(2.7rem,6.4vw,5.4rem)] leading-[0.9] tracking-[-0.035em] text-ink"
          />

          <motion.p {...fade(0.35)} className="mt-5 text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-[-0.01em]">
            Full Stack Developer
          </motion.p>
          <motion.p {...fade(0.42)} className="mt-2 text-[15px] leading-relaxed text-muted max-w-[54ch]">
            {heroSummary}
          </motion.p>

          <motion.a
            {...fade(0.5)}
            href="#open-source"
            onClick={() => playSound("pop")}
            className="group mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium rounded-full pl-1.5 pr-3 py-1 bg-surface border border-line/10 hover:border-mint transition-colors"
          >
            <span className="w-6 h-6 rounded-full grid place-items-center bg-mint/15 text-mint">
              <GitMerge className="w-3.5 h-3.5" />
            </span>
            Merged PRs in React, Next.js and Spring Boot
          </motion.a>

          <motion.div {...fade(0.58)} className="mt-7 flex flex-wrap items-center gap-2.5">
            <Magnetic strength={0.25}>
              <a
                href="#work"
                onClick={() => playSound("whoosh")}
                className="group inline-flex items-center gap-2 h-10 pl-4 pr-3 rounded-full bg-ink text-bg text-[14px] font-semibold hover:bg-cobalt hover:text-white transition-colors"
              >
                See my work
                <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={() => {
                  playSound("pop");
                  openResume();
                }}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-ink/70 text-[14px] font-semibold hover:bg-marigold hover:border-marigold hover:text-[#151935] transition-colors"
              >
                <FileText className="w-4 h-4" />
                Résumé
              </button>
            </Magnetic>
            <ul className="flex items-center gap-1.5 sm:ml-2" aria-label="Profiles">
              {socials.map(({ href, label, Icon, tint }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    onClick={() => playSound("pop")}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 grid place-items-center rounded-xl bg-surface border border-line/10"
                    style={{ color: tint }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <SystemGraph />
        </motion.div>
      </div>
    </section>
  );
}
