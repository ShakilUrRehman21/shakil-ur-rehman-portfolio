"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, LayoutGroup, useReducedMotion } from "framer-motion";

// TaskFlow has no screenshot yet, so it gets a small live board instead
const START = [
  { id: 1, t: "Design schema", col: 2 },
  { id: 2, t: "JWT refresh flow", col: 1 },
  { id: 3, t: "Pagination API", col: 1 },
  { id: 4, t: "Search + filters", col: 0 },
  { id: 5, t: "Query cache", col: 0 },
];
const COLS = ["To do", "In progress", "Done"];

function TaskBoard() {
  const reduce = useReducedMotion();
  const [cards, setCards] = useState(START);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setCards((cs) => {
        const movable = cs.filter((c) => c.col < 2);
        if (!movable.length) return START;
        const pick = movable[movable.length - 1];
        return cs.map((c) => (c.id === pick.id ? { ...c, col: c.col + 1 } : c));
      });
    }, 1600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="w-full aspect-[16/10] rounded-xl bg-surface shadow-lg p-3 grid grid-cols-3 gap-2 text-[10.5px]">
      <LayoutGroup>
        {COLS.map((name, ci) => (
          <div key={name} className="rounded-lg bg-sunken p-1.5 flex flex-col gap-1.5 min-w-0">
            <p className="font-semibold text-muted px-0.5 flex items-center justify-between">
              {name}
              <span className="tabular-nums">{cards.filter((c) => c.col === ci).length}</span>
            </p>
            {cards
              .filter((c) => c.col === ci)
              .map((c) => (
                <motion.div
                  layout
                  layoutId={`task-${c.id}`}
                  key={c.id}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="rounded-md bg-surface border border-line/10 px-1.5 py-1 truncate"
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle"
                    style={{ background: ci === 2 ? "rgb(var(--mint))" : ci === 1 ? "rgb(var(--marigold))" : "rgb(var(--line) / 0.3)" }}
                  />
                  {c.t}
                </motion.div>
              ))}
          </div>
        ))}
      </LayoutGroup>
    </div>
  );
}

export default function ProjectVisual({ project, sizes = "(max-width: 768px) 92vw, 480px", className = "" }) {
  if (!project.image) return <TaskBoard />;
  return (
    <div className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-sunken shadow-lg ${className}`}>
      <Image src={project.image} alt={`${project.title} interface`} fill sizes={sizes} className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
    </div>
  );
}
