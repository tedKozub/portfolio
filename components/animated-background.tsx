"use client";

import { useEffect, useRef, useCallback } from "react";

/*
  Abstract outline blobs – organic shapes defined by animated border-radius.
  Grey stroke outlines, mostly transparent fill, minimal blur.
  Two blobs follow the mouse, rest drift autonomously.
*/

interface BlobConfig {
  size: number;
  borderWidth: number;
  borderOpacity: number;
  fillOpacity: number;
  morphDuration: number; // seconds for one border-radius cycle
  morphKeyframes: string; // CSS border-radius keyframes
}

// Each blob gets unique morph keyframes so they feel independent
const BLOBS: BlobConfig[] = [
  {
    size: 300, borderWidth: 1.5, borderOpacity: 0.15, fillOpacity: 0.02,
    morphDuration: 12,
    morphKeyframes: "60% 40% 30% 70% / 60% 30% 70% 40%",
  },
  {
    size: 240, borderWidth: 1, borderOpacity: 0.12, fillOpacity: 0.015,
    morphDuration: 16,
    morphKeyframes: "40% 60% 60% 40% / 50% 60% 30% 60%",
  },
  {
    size: 280, borderWidth: 1.5, borderOpacity: 0.13, fillOpacity: 0.02,
    morphDuration: 14,
    morphKeyframes: "50% 50% 40% 60% / 60% 40% 55% 45%",
  },
  {
    size: 200, borderWidth: 1, borderOpacity: 0.10, fillOpacity: 0.01,
    morphDuration: 18,
    morphKeyframes: "55% 45% 50% 50% / 45% 55% 50% 50%",
  },
  {
    size: 340, borderWidth: 1, borderOpacity: 0.10, fillOpacity: 0.015,
    morphDuration: 20,
    morphKeyframes: "65% 35% 45% 55% / 40% 60% 35% 65%",
  },
  {
    size: 180, borderWidth: 1.5, borderOpacity: 0.14, fillOpacity: 0.02,
    morphDuration: 10,
    morphKeyframes: "45% 55% 55% 45% / 55% 45% 60% 40%",
  },
  {
    size: 260, borderWidth: 1, borderOpacity: 0.11, fillOpacity: 0.01,
    morphDuration: 22,
    morphKeyframes: "70% 30% 50% 50% / 50% 50% 40% 60%",
  },
];

// Generate unique CSS keyframes for each blob
function generateKeyframes(index: number, blob: BlobConfig): string {
  // Parse the "target" border-radius from config and create mid-states
  const starts = [
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "40% 60% 55% 45% / 35% 65% 35% 65%",
    "30% 70% 70% 30% / 50% 40% 60% 50%",
    "55% 45% 40% 60% / 65% 35% 65% 35%",
    "50% 50% 40% 60% / 60% 40% 50% 50%",
    "65% 35% 60% 40% / 40% 60% 35% 65%",
    "45% 55% 55% 45% / 55% 45% 60% 40%",
  ];

  const a = starts[index % starts.length];
  const b = blob.morphKeyframes;
  const c = starts[(index + 3) % starts.length];

  return `
    @keyframes blob-morph-${index} {
      0%, 100% { border-radius: ${a}; }
      33%      { border-radius: ${b}; }
      66%      { border-radius: ${c}; }
    }
  `;
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
    // Inject morph keyframes into document
    const style = document.createElement("style");
    style.textContent = BLOBS.map((b, i) => generateKeyframes(i, b)).join("\n");
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
      {BLOBS.map(({ size, borderWidth, borderOpacity, fillOpacity, morphDuration }, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            border: `${borderWidth}px solid rgba(255, 255, 255, ${borderOpacity})`,
            background: `rgba(255, 255, 255, ${fillOpacity})`,
            animation: `blob-morph-${i} ${morphDuration}s ease-in-out infinite`,
            willChange: "transform, border-radius",
          }}
        />
      ))}
    </div>
  );
}
