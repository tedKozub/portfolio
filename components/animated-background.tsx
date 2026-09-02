"use client";

import { useEffect, useRef } from "react";

// Gooey metaball effect:
// Parent gets blur + contrast filter → where blobs overlap they visually merge.
// Background on the container must match the page background for the trick to work.

const BLOBS = [
  { size: 300 }, // index 0 — close mouse follower
  { size: 240 }, // index 1 — lazy mouse follower
  { size: 280 },
  { size: 200 },
  { size: 320 },
  { size: 180 },
  { size: 260 },
  { size: 210 },
];

export function AnimatedBackground() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>(Array(BLOBS.length).fill(null));
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Initial positions spread across the viewport
    stateRef.current = BLOBS.map((_, i) => ({
      x: (W / BLOBS.length) * i + W / (BLOBS.length * 2),
      y: H * 0.3 + Math.random() * H * 0.4,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const tick = () => {
      const blobs = stateRef.current;
      const { x: mx, y: my } = mouseRef.current;

      blobs.forEach((b, i) => {
        const size = BLOBS[i].size;

        if (i === 0) {
          // Snappy mouse follower
          b.vx += (mx - b.x) * 0.028;
          b.vy += (my - b.y) * 0.028;
          b.vx *= 0.86;
          b.vy *= 0.86;
        } else if (i === 1) {
          // Slow mouse follower — creates a trailing merge effect
          b.vx += (mx - b.x) * 0.009;
          b.vy += (my - b.y) * 0.009;
          b.vx *= 0.93;
          b.vy *= 0.93;
        } else {
          // Autonomous drift — add random nudge to prevent stalling
          b.vx += (Math.random() - 0.5) * 0.12;
          b.vy += (Math.random() - 0.5) * 0.12;
          b.vx *= 0.992;
          b.vy *= 0.992;
          // Clamp to avoid runaway speed
          const speed = Math.hypot(b.vx, b.vy);
          if (speed > 2.5) { b.vx = (b.vx / speed) * 2.5; b.vy = (b.vy / speed) * 2.5; }
        }

        b.x += b.vx;
        b.y += b.vy;

        // Soft boundary: push back when blob drifts off-screen
        const m = size * 0.4;
        if (b.x < -m)   b.vx += 0.6;
        if (b.x > W + m) b.vx -= 0.6;
        if (b.y < -m)   b.vy += 0.6;
        if (b.y > H + m) b.vy -= 0.6;

        const el = blobRefs.current[i];
        if (el) {
          el.style.transform = `translate(${b.x - size / 2}px, ${b.y - size / 2}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        // Same as --background; required for the gooey contrast trick to work
        backgroundColor: "oklch(0.145 0 0)",
        // blur creates soft edges, contrast snaps them back to sharp → merge on overlap
        filter: "blur(38px) contrast(13)",
      }}
    >
      {BLOBS.map(({ size }, i) => (
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
            // Muted cool blue-grey — not pure white, feels atmospheric
            background: "rgba(148, 168, 196, 0.26)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
