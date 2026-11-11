"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useApp } from "./AppShell";

// A small map of the stack from the résumé. Click a service (or "Send request")
// to send a request through it; the latency is logged underneath.

const NODES = {
  browser: { x: 62, y: 140, label: "Browser", color: "ink", w: 92, info: "Click PostgreSQL, Auth or LLM to send a request." },
  next: { x: 190, y: 140, label: "Next.js", color: "marigold", w: 90, info: "Next.js App Router with TanStack Query on the client." },
  api: { x: 322, y: 140, label: "REST API", color: "cobalt", w: 100, info: "Express.js, Next.js route handlers and Spring Boot." },
  pg: { x: 468, y: 52, label: "PostgreSQL", color: "cobalt", w: 108, info: "PostgreSQL with Prisma or Drizzle ORM, indexed for load." },
  auth: { x: 468, y: 140, label: "Auth", color: "mint", w: 76, info: "JWT access + refresh cookies, or Clerk, with RBAC checks." },
  llm: { x: 468, y: 228, label: "LLM", color: "orchid", w: 70, info: "Groq and Gemini pipelines with Zod-validated output." },
};

const EDGES = [
  ["browser", "next"],
  ["next", "api"],
  ["api", "pg"],
  ["api", "auth"],
  ["api", "llm"],
];

const ROUTES = {
  pg: { method: "GET", path: "/api/incidents", ms: () => 1.2 + Math.random() * 0.6, note: "p50 after a partial index" },
  auth: { method: "POST", path: "/api/auth/refresh", ms: () => 3 + Math.random() * 3, note: "access token renewed" },
  llm: { method: "POST", path: "/api/audit", ms: () => 600 + Math.random() * 400, note: "repo scored 0–100" },
};

const COLOR = {
  ink: "rgb(var(--ink))",
  marigold: "rgb(var(--marigold))",
  cobalt: "rgb(var(--cobalt))",
  orchid: "rgb(var(--orchid))",
  mint: "rgb(var(--mint))",
};
const FILL = { ink: "fill-ink", marigold: "fill-marigold", cobalt: "fill-cobalt", orchid: "fill-orchid", mint: "fill-mint" };

function elbow(a, b) {
  const A = NODES[a];
  const B = NODES[b];
  if (A.y === B.y || A.x === B.x) return [[A.x, A.y], [B.x, B.y]];
  const mx = (A.x + B.x) / 2;
  return [[A.x, A.y], [mx, A.y], [mx, B.y], [B.x, B.y]];
}
const toD = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

function pathThrough(hops) {
  const pts = [];
  for (let i = 0; i < hops.length - 1; i++) {
    const seg = elbow(hops[i], hops[i + 1]);
    pts.push(...(i === 0 ? seg : seg.slice(1)));
  }
  return pts;
}

function Packet({ pts, color, r, speed, onDone }) {
  const lens = [0];
  for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = lens[lens.length - 1] || 1;
  return (
    <motion.circle
      r={r}
      initial={{ cx: pts[0][0], cy: pts[0][1] }}
      animate={{ cx: pts.map((p) => p[0]), cy: pts.map((p) => p[1]) }}
      transition={{ duration: total / speed, times: lens.map((l) => l / total), ease: "linear" }}
      onAnimationComplete={onDone}
      style={{ fill: color }}
    />
  );
}

let uid = 0;

export default function SystemGraph() {
  const { playSound } = useApp();
  const [packets, setPackets] = useState([]);
  const [hover, setHover] = useState(null);
  const [busy, setBusy] = useState(null);
  const [logs, setLogs] = useState([{ id: "seed", method: "GET", path: "/health", note: "all services up", ms: 1.1, color: "mint" }]);
  const wrapRef = useRef(null);
  const visible = useRef(true);

  const add = useCallback((p) => setPackets((l) => [...l, { ...p, id: ++uid }]), []);
  const remove = useCallback((id) => setPackets((l) => l.filter((p) => p.id !== id)), []);

  // light background traffic, paused off-screen and for reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([en]) => (visible.current = en.isIntersecting));
    if (wrapRef.current) io.observe(wrapRef.current);
    const id = setInterval(() => {
      if (!visible.current || document.hidden) return;
      const [a, b] = EDGES[Math.floor(Math.random() * EDGES.length)];
      add({ pts: elbow(a, b), color: COLOR[NODES[b].color], r: 2.2, speed: 140 });
    }, 900);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [add]);

  const send = useCallback(
    (key) => {
      const k = ROUTES[key] ? key : Object.keys(ROUTES)[Math.floor(Math.random() * 3)];
      const route = ROUTES[k];
      const pts = pathThrough(["browser", "next", "api", k]);
      setBusy(k);
      playSound("tick");
      add({
        pts,
        color: COLOR[NODES[k].color],
        r: 5,
        speed: 360,
        then: () =>
          add({
            pts: pts.slice().reverse(),
            color: COLOR.mint,
            r: 4.5,
            speed: 400,
            then: () => {
              playSound("ok");
              setBusy(null);
              setLogs((l) => [{ id: ++uid, ...route, ms: route.ms(), color: NODES[k].color }, ...l].slice(0, 3));
            },
          }),
      });
    },
    [add, playSound]
  );

  const info = hover ? NODES[hover].info : "Click a service to send a request through the stack.";

  return (
    <div ref={wrapRef} className="rounded-2xl bg-surface border border-line/10 shadow-[0_20px_50px_-28px_rgb(var(--ink)/0.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-line/10">
        <div>
          <p className="text-[13.5px] font-semibold leading-tight">The stack I ship with</p>
          <p className="text-[12px] text-muted">Every service is clickable</p>
        </div>
        <button
          type="button"
          onClick={() => send()}
          className="group inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-ink text-bg text-[12.5px] font-semibold hover:bg-cobalt hover:text-white transition-colors"
        >
          <Send className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          Send request
        </button>
      </div>

      <div className="relative dot-grid">
        <svg viewBox="0 0 540 280" className="w-full h-auto block select-none" role="group" aria-label="Interactive stack map">
          {EDGES.map(([a, b]) => {
            const on = hover === a || hover === b || busy === b;
            return (
              <motion.path
                key={a + b}
                d={toD(elbow(a, b))}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ stroke: on ? COLOR[NODES[b].color] : "rgb(var(--line) / 0.2)" }}
                strokeWidth={on ? 2 : 1.5}
                strokeLinejoin="round"
              />
            );
          })}

          {packets.map((p) => (
            <Packet
              key={p.id}
              {...p}
              onDone={() => {
                remove(p.id);
                p.then && p.then();
              }}
            />
          ))}

          {Object.entries(NODES).map(([id, n], i) => {
            const h = 32;
            const c = COLOR[n.color];
            const on = hover === id || busy === id;
            const target = ROUTES[id] ? id : null;
            return (
              <motion.g
                key={id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 300, damping: 22 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: "view-box" }}
                onMouseEnter={() => setHover(id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(id)}
                onBlur={() => setHover(null)}
                onClick={() => send(target)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    send(target);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${n.label}: ${n.info}`}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={n.x - n.w / 2}
                  y={n.y - h / 2}
                  width={n.w}
                  height={h}
                  rx={h / 2}
                  className={`${on ? FILL[n.color] : "fill-surface"} transition-[fill] duration-200`}
                  style={{ stroke: c }}
                  strokeWidth={1.8}
                />
                <circle cx={n.x - n.w / 2 + 14} cy={n.y} r={3.5} style={{ fill: on ? "rgb(var(--surface))" : c }} />
                <text
                  x={n.x - n.w / 2 + 24}
                  y={n.y + 4.2}
                  style={{
                    fill: on ? (n.color === "marigold" ? "#151935" : "rgb(var(--surface))") : "rgb(var(--ink))",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'Instrument Sans Variable', system-ui",
                    pointerEvents: "none",
                  }}
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
        <p className="absolute left-4 right-4 bottom-2 text-[11.5px] text-muted truncate" aria-live="polite">
          {info}
        </p>
      </div>

      <ul className="bg-night text-[#ECEEF8] px-4 py-2.5 font-mono text-[11px] leading-relaxed space-y-0.5 min-h-[66px]">
        <AnimatePresence initial={false}>
          {logs.map((l) => (
            <motion.li
              key={l.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 whitespace-nowrap overflow-hidden"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: COLOR[l.color] }} />
              <span className="text-[#ECEEF8]/55 w-9 shrink-0">{l.method}</span>
              <span className="truncate">{l.path}</span>
              <span className="text-[#A3A9C9] truncate hidden sm:inline">{l.note}</span>
              <span className="ml-auto text-[rgb(47_217_169)] tabular-nums">{l.ms < 100 ? l.ms.toFixed(1) : Math.round(l.ms)}ms</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
