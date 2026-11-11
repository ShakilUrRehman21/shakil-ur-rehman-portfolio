// Procedural UI sounds via the Web Audio API.
// One shared AudioContext (browsers cap how many can exist), plus a mute switch.

let ctx = null;
let muted = false;

try {
  if (typeof window !== "undefined") {
    muted = localStorage.getItem("portfolio_sound") === "off";
  }
} catch (e) {}

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

const presets = {
  pop: { type: "sine", from: 540, to: 840, ramp: "exp", dur: 0.1, vol: 0.09 },
  click: { type: "triangle", from: 320, to: 120, ramp: "exp", dur: 0.06, vol: 0.11 },
  slide: { type: "sine", from: 220, to: 160, ramp: "lin", dur: 0.2, vol: 0.06 },
  whoosh: { type: "sine", from: 320, to: 780, ramp: "exp", dur: 0.35, vol: 0.07 },
  tick: { type: "square", from: 1800, to: 1400, ramp: "exp", dur: 0.025, vol: 0.02 },
  ok: { type: "sine", from: 660, to: 990, ramp: "exp", dur: 0.14, vol: 0.07 },
};

export function playSound(name = "pop") {
  if (muted) return;
  try {
    const ac = getCtx();
    if (!ac) return;
    const p = presets[name] || presets.pop;
    const t = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.from, t);
    if (p.ramp === "exp") osc.frequency.exponentialRampToValueAtTime(p.to, t + p.dur * 0.8);
    else osc.frequency.linearRampToValueAtTime(p.to, t + p.dur * 0.9);
    gain.gain.setValueAtTime(p.vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + p.dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + p.dur + 0.02);
  } catch (e) {}
}

export function isMuted() {
  return muted;
}

export function setMuted(v) {
  muted = v;
  try {
    localStorage.setItem("portfolio_sound", v ? "off" : "on");
  } catch (e) {}
}
