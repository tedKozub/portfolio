"use client";

import { useEffect, useRef, useCallback } from "react";

/*
  4 large abstract blobs that drift autonomously.
  Cursor doesn't have its own shape — instead it repels blobs on proximity
  and deforms their shape (squish) when pushing against them.
*/

interface BlobConfig {
  size: number;
  borderWidth: number;
  morphDuration: number;
  dashArray: string;
}

const BLOBS: BlobConfig[] = [
  { size: 420, borderWidth: 1.5, morphDuration: 14, dashArray: "14 8" },
  { size: 360, borderWidth: 1,   morphDuration: 18, dashArray: "20 6" },
  { size: 480, borderWidth: 1,   morphDuration: 22, dashArray: "8 14" },
  { size: 320, borderWidth: 1.5, morphDuration: 16, dashArray: "18 10" },
];

const CHANNELS = [
  { color: "rgba(255, 80, 80, 0.22)",  dx: -2.5, dy: -1.5 },
  { color: "rgba(80, 255, 120, 0.18)", dx: 0,    dy: 0    },
  { color: "rgba(80, 120, 255, 0.22)",  dx: 2.5,  dy: 1.5  },
];

const MORPH_STATES = [
  ["62% 38% 32% 68% / 58% 32% 68% 42%", "38% 62% 58% 42% / 42% 58% 38% 62%", "50% 50% 42% 58% / 62% 38% 55% 45%"],
  ["42% 58% 62% 38% / 48% 52% 35% 65%", "68% 32% 42% 58% / 55% 45% 58% 42%", "48% 52% 55% 45% / 38% 62% 48% 52%"],
  ["55% 45% 38% 62% / 62% 38% 48% 52%", "45% 55% 65% 35% / 42% 58% 62% 38%", "58% 42% 48% 52% / 52% 48% 42% 58%"],
  ["48% 52% 55% 45% / 55% 45% 62% 38%", "62% 38% 42% 58% / 38% 62% 48% 52%", "42% 58% 58% 42% / 48% 52% 55% 45%"],
];

function buildKeyframes(): string {
  return BLOBS.map((_, i) => {
    const [a, b, c] = MORPH_STATES[i];
    return `
      @keyframes blob-morph-${i} {
        0%, 100% { border-radius: ${a}; }
        33%      { border-radius: ${b}; }
        66%      { border-radius: ${c}; }
      }
    `;
  }).join("\n");
}

const REPEL_RADIUS = 280;
const REPEL_STRENGTH = 8;

export function AnimatedBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  const init = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    stateRef.current = BLOBS.map((blob, i) => ({
      x: W * 0.15 + (W * 0.7 / BLOBS.length) * i + blob.size * 0.2,
      y: H * 0.25 + Math.random() * H * 0.4,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
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
        const cx = b.x;
        const cy = b.y;

        // --- Mouse repulsion ---
        const dxM = cx - mx;
        const dyM = cy - my;
        const distM = Math.hypot(dxM, dyM);

        let squishX = 1;
        let squishY = 1;

        if (distM < REPEL_RADIUS && distM > 1) {
          const force = ((REPEL_RADIUS - distM) / REPEL_RADIUS) * REPEL_STRENGTH;
          const nx = dxM / distM;
          const ny = dyM / distM;
          b.vx += nx * force * 0.04;
          b.vy += ny * force * 0.04;

          // Squish perpendicular to push direction
          const proximity = 1 - distM / REPEL_RADIUS; // 0..1
          const squishAmount = proximity * 0.15;
          // Squish along the push axis, stretch perpendicular
          const angle = Math.atan2(ny, nx);
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          squishX = 1 + squishAmount * Math.abs(cos) * 0.5 - squishAmount * Math.abs(sin) * 0.3;
          squishY = 1 + squishAmount * Math.abs(sin) * 0.5 - squishAmount * Math.abs(cos) * 0.3;
        }

        // --- Autonomous drift ---
        b.vx += (Math.random() - 0.5) * 0.06;
        b.vy += (Math.random() - 0.5) * 0.06;
        b.vx *= 0.995;
        b.vy *= 0.995;
        const spd = Math.hypot(b.vx, b.vy);
        if (spd > 1.8) {
          b.vx = (b.vx / spd) * 1.8;
          b.vy = (b.vy / spd) * 1.8;
        }

        b.x += b.vx;
        b.y += b.vy;

        // Soft boundaries
        const margin = size * 0.25;
        if (b.x < -margin)   b.vx += 0.3;
        if (b.x > W + margin) b.vx -= 0.3;
        if (b.y < -margin)   b.vy += 0.3;
        if (b.y > H + margin) b.vy -= 0.3;

        const el = blobRefs.current[i];
        if (el) {
          el.style.transform = `translate(${b.x - size / 2}px, ${b.y - size / 2}px) scale(${squishX.toFixed(3)}, ${squishY.toFixed(3)})`;
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
      {BLOBS.map(({ size, borderWidth, morphDuration }, i) => (
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
            transition: "transform 0.08s linear",
          }}
        >
          {CHANNELS.map(({ color, dx, dy }, ch) => (
            <div
              key={ch}
              style={{
                position: "absolute",
                inset: 0,
                border: `${borderWidth}px dashed ${color}`,
                animation: `blob-morph-${i} ${morphDuration}s ease-in-out infinite`,
                animationDelay: `${ch * -0.4}s`,
                transform: `translate(${dx}px, ${dy}px)`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
