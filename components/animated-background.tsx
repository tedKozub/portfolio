"use client";

import { useEffect, useRef, useCallback } from "react";

/*
  Soft blob background — no gooey contrast hack.
  Each blob is a radial-gradient circle with its own blur.
  When blobs overlap, opacities naturally stack → creates a "merge" look.
  Two blobs follow the mouse cursor (fast + slow) for interactivity.
*/

interface BlobConfig {
  size: number;
  opacity: number;
  blur: number;
}

const BLOBS: BlobConfig[] = [
  { size: 350, opacity: 0.12, blur: 60 },  // 0 – fast mouse follower
  { size: 280, opacity: 0.10, blur: 50 },  // 1 – lazy mouse follower
  { size: 320, opacity: 0.09, blur: 55 },  // 2–7 autonomous
  { size: 240, opacity: 0.10, blur: 45 },
  { size: 380, opacity: 0.08, blur: 65 },
  { size: 200, opacity: 0.11, blur: 40 },
  { size: 300, opacity: 0.09, blur: 50 },
];

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const state = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  const init = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    state.current = BLOBS.map((_, i) => ({
      x: (W / BLOBS.length) * i + W / (BLOBS.length * 2),
      y: H * 0.25 + Math.random() * H * 0.5,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
    }));
  }, []);

  useEffect(() => {
    init();

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const { x: mx, y: my } = mouse.current;

      state.current.forEach((b, i) => {
        const size = BLOBS[i].size;

        if (i === 0) {
          // Snappy cursor follower
          b.vx += (mx - b.x) * 0.025;
          b.vy += (my - b.y) * 0.025;
          b.vx *= 0.85;
          b.vy *= 0.85;
        } else if (i === 1) {
          // Lazy cursor follower — trails behind, merges with blob 0
          b.vx += (mx - b.x) * 0.008;
          b.vy += (my - b.y) * 0.008;
          b.vx *= 0.94;
          b.vy *= 0.94;
        } else {
          // Autonomous drift
          b.vx += (Math.random() - 0.5) * 0.1;
          b.vy += (Math.random() - 0.5) * 0.1;
          b.vx *= 0.993;
          b.vy *= 0.993;
          const spd = Math.hypot(b.vx, b.vy);
          if (spd > 2) {
            b.vx = (b.vx / spd) * 2;
            b.vy = (b.vy / spd) * 2;
          }
        }

        b.x += b.vx;
        b.y += b.vy;

        // Soft boundary push
        const margin = size * 0.3;
        if (b.x < -margin) b.vx += 0.5;
        if (b.x > W + margin) b.vx -= 0.5;
        if (b.y < -margin) b.vy += 0.5;
        if (b.y > H + margin) b.vy -= 0.5;

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
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {BLOBS.map(({ size, opacity, blur }, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 50% 50%,
              rgba(140, 160, 185, ${opacity}) 0%,
              rgba(120, 140, 170, ${opacity * 0.6}) 40%,
              transparent 70%)`,
            filter: `blur(${blur}px)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
