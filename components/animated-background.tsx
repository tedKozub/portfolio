"use client";

import { useEffect, useRef, useCallback } from "react";

/*
  Abstract outline blobs with:
  - Dashed borders
  - Chromatic aberration (3 offset layers per blob: R, G, B)
  - Border-radius morphing for organic shapes
  - Mouse-following interactivity
*/

interface BlobConfig {
  size: number;
  borderWidth: number;
  morphDuration: number;
  dashArray: string; // stroke-dasharray style
}

const BLOBS: BlobConfig[] = [
  { size: 300, borderWidth: 1.5, morphDuration: 12, dashArray: "12 8" },
  { size: 240, borderWidth: 1,   morphDuration: 16, dashArray: "20 6" },
  { size: 280, borderWidth: 1.5, morphDuration: 14, dashArray: "8 12" },
  { size: 200, borderWidth: 1,   morphDuration: 18, dashArray: "16 10" },
  { size: 340, borderWidth: 1,   morphDuration: 20, dashArray: "6 14" },
  { size: 180, borderWidth: 1.5, morphDuration: 10, dashArray: "24 4" },
  { size: 260, borderWidth: 1,   morphDuration: 22, dashArray: "10 10" },
];

// Chromatic aberration channel offsets (px)
const CHANNELS = [
  { color: "rgba(255, 80, 80, 0.25)",  dx: -2.5, dy: -1.5 }, // Red
  { color: "rgba(80, 255, 120, 0.20)", dx: 0,    dy: 0    }, // Green (anchor)
  { color: "rgba(80, 120, 255, 0.25)",  dx: 2.5,  dy: 1.5  }, // Blue
];

// Unique morph keyframes per blob
const MORPH_STATES = [
  ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 55% 45% / 35% 65% 35% 65%", "30% 70% 70% 30% / 50% 40% 60% 50%"],
  ["40% 60% 60% 40% / 50% 60% 30% 60%", "70% 30% 40% 60% / 55% 45% 55% 45%", "45% 55% 70% 30% / 40% 60% 40% 60%"],
  ["50% 50% 40% 60% / 60% 40% 55% 45%", "65% 35% 60% 40% / 40% 60% 35% 65%", "35% 65% 45% 55% / 65% 35% 60% 40%"],
  ["55% 45% 50% 50% / 45% 55% 50% 50%", "35% 65% 45% 55% / 65% 35% 60% 40%", "60% 40% 55% 45% / 50% 50% 40% 60%"],
  ["65% 35% 45% 55% / 40% 60% 35% 65%", "45% 55% 60% 40% / 55% 45% 60% 40%", "50% 50% 35% 65% / 60% 40% 45% 55%"],
  ["45% 55% 55% 45% / 55% 45% 60% 40%", "60% 40% 40% 60% / 40% 60% 45% 55%", "55% 45% 65% 35% / 50% 50% 55% 45%"],
  ["70% 30% 50% 50% / 50% 50% 40% 60%", "40% 60% 65% 35% / 55% 45% 50% 50%", "55% 45% 45% 55% / 45% 55% 60% 40%"],
];

function buildKeyframes(): string {
  return BLOBS.map((_, i) => {
    const [a, b, c] = MORPH_STATES[i % MORPH_STATES.length];
    return `
      @keyframes blob-morph-${i} {
        0%, 100% { border-radius: ${a}; }
        33%      { border-radius: ${b}; }
        66%      { border-radius: ${c}; }
      }
    `;
  }).join("\n");
}

export function AnimatedBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  const init = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    stateRef.current = BLOBS.map((_, i) => ({
      x: (W / BLOBS.length) * i + W / (BLOBS.length * 2),
      y: H * 0.2 + Math.random() * H * 0.6,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
    }));
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = buildKeyframes();
    document.head.appendChild(style);

    init();

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const { x: mx, y: my } = mouse.current;

      stateRef.current.forEach((b, i) => {
        const size = BLOBS[i].size;

        if (i === 0) {
          b.vx += (mx - b.x) * 0.02;
          b.vy += (my - b.y) * 0.02;
          b.vx *= 0.88;
          b.vy *= 0.88;
        } else if (i === 1) {
          b.vx += (mx - b.x) * 0.006;
          b.vy += (my - b.y) * 0.006;
          b.vx *= 0.95;
          b.vy *= 0.95;
        } else {
          b.vx += (Math.random() - 0.5) * 0.08;
          b.vy += (Math.random() - 0.5) * 0.08;
          b.vx *= 0.994;
          b.vy *= 0.994;
          const spd = Math.hypot(b.vx, b.vy);
          if (spd > 1.5) {
            b.vx = (b.vx / spd) * 1.5;
            b.vy = (b.vy / spd) * 1.5;
          }
        }

        b.x += b.vx;
        b.y += b.vy;

        const margin = size * 0.3;
        if (b.x < -margin) b.vx += 0.4;
        if (b.x > W + margin) b.vx -= 0.4;
        if (b.y < -margin) b.vy += 0.4;
        if (b.y > H + margin) b.vy -= 0.4;

        const el = blobRefs.current[i];
        if (el) {
          el.style.transform = `translate(${b.x - size / 2}px, ${b.y - size / 2}px)`;
        }
      });

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf.current);
      style.remove();
    };
  }, [init]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {BLOBS.map(({ size, borderWidth, morphDuration, dashArray }, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            willChange: "transform",
          }}
        >
          {/* 3 chromatic aberration layers — R, G, B offset */}
          {CHANNELS.map(({ color, dx, dy }, ch) => (
            <div
              key={ch}
              style={{
                position: "absolute",
                inset: 0,
                border: `${borderWidth}px dashed ${color}`,
                borderRadius: "inherit",
                animation: `blob-morph-${i} ${morphDuration}s ease-in-out infinite`,
                animationDelay: `${ch * -0.3}s`,
                transform: `translate(${dx}px, ${dy}px)`,
                // Emulate dash pattern via border-image with gradient
                // CSS dashed border + the morphing border-radius gives the artistic look
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
