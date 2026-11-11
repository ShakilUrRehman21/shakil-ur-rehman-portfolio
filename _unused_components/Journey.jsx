"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Trophy, Cloud, Briefcase, Flag } from "lucide-react";

// Chronological, so a timeline is the honest structure here
const STEPS = [
  {
    when: "2021",
    title: "Started B.Tech in Computer Science",
    where: "Noida Institute of Engineering & Technology (NIET)",
    body: "Computer Science and Engineering, Greater Noida.",
    Icon: GraduationCap,
    color: "cobalt",
  },
  {
    when: "2023",
    title: "Google Cloud Study Jam",
    Icon: Cloud,
    color: "mint",
  },
  {
    when: "2024",
    title: "Won Coding Quest",
    where: "Organized by REBOOT-NIET",
    Icon: Trophy,
    color: "marigold",
  },
  {
    when: "Aug – Sep 2024",
    title: "Java Intern",
    where: "SoftPro India Pvt. Limited",
    body: "Developed a Spring Boot-based Gyan Portal supporting 500+ students and 50+ teachers. Designed RESTful APIs for assignment management, progress tracking, and query handling, and optimized backend logic and database interactions for high-concurrency performance.",
    Icon: Briefcase,
    color: "cobalt",
  },
  {
    when: "2025",
    title: "Graduated with a CGPA of 8.97 / 10",
    where: "NIET, Greater Noida",
    body: "B.Tech in Computer Science and Engineering, 2021 – 2025. Currently open to new engineering opportunities.",
    Icon: Flag,
    color: "orchid",
  },
];

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" className="relative overflow-x-clip px-4 sm:px-6 lg:px-10 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.8rem,5.2vw,5rem)] leading-[0.9] tracking-[-0.035em]"
              style={{ fontVariationSettings: '"wdth" 112, "wght" 820' }}
            >
              The road
              <br />
              so far
            </motion.h2>
            <p className="mt-5 text-[17px] text-muted max-w-[34ch]">
              Education, an internship, and a few milestones along the way.
            </p>
          </div>
        </div>

        <ol ref={ref} className="lg:col-span-8 relative pl-10 sm:pl-14">
          {/* track + animated fill */}
          <span aria-hidden="true" className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-[2px] bg-line/10 rounded-full" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY, transformOrigin: "50% 0%" }}
            className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-cobalt via-marigold to-orchid"
          />

          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative pb-12 last:pb-0"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.1 }}
                className="absolute -left-10 sm:-left-14 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full grid place-items-center ring-4 ring-bg"
                style={{ background: `rgb(var(--${s.color}))`, color: s.color === "marigold" ? "#151935" : "#fff" }}
              >
                <s.Icon className="w-4 h-4" />
              </motion.span>
              <p className="text-sm font-semibold" style={{ color: `rgb(var(--${s.color}))` }}>
                {s.when}
              </p>
              <h3 className="mt-1 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.01em]">{s.title}</h3>
              {s.where && <p className="mt-1 text-[15px] text-muted">{s.where}</p>}
              {s.body && <p className="mt-3 text-[16px] leading-relaxed text-ink/80 max-w-[60ch]">{s.body}</p>}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
