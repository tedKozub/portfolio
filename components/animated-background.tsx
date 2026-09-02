"use client";

import { useEffect, useRef, useCallback } from "react";

/*
  Complex organic blobs using SVG paths with many bezier curves.
  Cloud-like, amorphous shapes that morph between states.
  Dashed stroke + chromatic aberration + mouse repulsion.
*/

// ─── Smooth closed curve from polar points ───────────────────────
// Attempt to create catmull-rom-style smooth path through radial points

function polarToCart(cx: number, cy: number, angle: number, r: number) {
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

function buildSmoothPath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 3) return "";

  const tension = 0.33;
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d + " Z";
}

// ─── Generate radial shape with bumps (cloud-like) ───────────────
// numPoints control points placed around a circle with varying radii

function generateRadii(numPoints: number, baseR: number, seed: number): number[] {
  const radii: number[] = [];
  for (let i = 0; i < numPoints; i++) {
    // Seeded pseudo-random using sin
    const noise = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
    const rand = noise - Math.floor(noise); // 0..1
    // Large variation for cloud-like shape
    radii.push(baseR * (0.6 + rand * 0.55));
  }
  return radii;
}

function radiiToPoints(radii: number[], cx: number, cy: number): { x: number; y: number }[] {
  const n = radii.length;
  return radii.map((r, i) => {
    const angle = (Math.PI * 2 * i) / n;
    return polarToCart(cx, cy, angle, r);
  });
}

// ─── Blob configs ────────────────────────────────────────────────

const NUM_CTRL_POINTS = 14; // More points = more bumpy/cloud-like

interface BlobDef {
  size: number;
  baseR: number;
  borderWidth: number;
  morphSpeed: number; // how fast it morphs (lower = slower)
  seeds: [number, number, number]; // 3 morph target seeds
}

const BLOBS: BlobDef[] = [
  { size: 440, baseR: 190, borderWidth: 1.5, morphSpeed: 0.0004, seeds: [1.2, 5.7, 9.3] },
  { size: 380, baseR: 160, borderWidth: 1,   morphSpeed: 0.0003, seeds: [3.4, 7.1, 2.8] },
  { size: 500, baseR: 215, borderWidth: 1,   morphSpeed: 0.00035, seeds: [6.5, 0.9, 4.6] },
  { size: 340, baseR: 140, borderWidth: 1.5, morphSpeed: 0.00025, seeds: [8.2, 3.3, 7.9] },
];

const CHANNELS = [
  { color: "rgba(255, 80, 80, 0.22)",   dx: -3, dy: -2 },
  { color: "rgba(80, 255, 120, 0.18)",  dx: 0,  dy: 0  },
  { color: "rgba(80, 120, 255, 0.22)",   dx: 3,  dy: 2  },
];

// Pre-compute the 3 morph target radii for each blob
const BLOB_TARGETS = BLOBS.map((b) =>
  b.seeds.map((seed) => generateRadii(NUM_CTRL_POINTS, b.baseR, seed))
);

function lerpRadii(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => v + (b[i] - v) * t);
}

const REPEL_RADIUS = 280;
const REPEL_STRENGTH = 7;

export function AnimatedBackground() {
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[][]>(BLOBS.map(() => [null, null, null]));
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  const init = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    stateRef.current = BLOBS.map((blob, i) => ({
      x: W * 0.12 + (W * 0.7 / BLOBS.length) * i + blob.size * 0.15,
      y: H * 0.2 + Math.random() * H * 0.45,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
    }));
  }, []);

  useEffect(() => {
    init();

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const tick = (time: number) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const { x: mx, y: my } = mouse.current;

      stateRef.current.forEach((b, i) => {
        const blob = BLOBS[i];
        const size = blob.size;
        const cx = size / 2;
        const cy = size / 2;

        // ── Morph path between targets ──
        const targets = BLOB_TARGETS[i];
        const phase = (time * blob.morphSpeed) % 3;
        const seg = Math.floor(phase);
        const t = phase - seg;
        // Smooth easing
        const eased = t * t * (3 - 2 * t);
        const fromRadii = targets[seg % 3];
        const toRadii = targets[(seg + 1) % 3];
        const currentRadii = lerpRadii(fromRadii, toRadii, eased);
        const pts = radiiToPoints(currentRadii, cx, cy);
        const pathD = buildSmoothPath(pts);

        // Update all 3 channel paths
        for (let ch = 0; ch < 3; ch++) {
          const pEl = pathRefs.current[i][ch];
          if (pEl) pEl.setAttribute("d", pathD);
        }

        // ── Mouse repulsion ──
        const dxM = b.x + cx - mx;
        const dyM = b.y + cy - my;
        const distM = Math.hypot(dxM, dyM);

        if (distM < REPEL_RADIUS && distM > 1) {
          const force = ((REPEL_RADIUS - distM) / REPEL_RADIUS) * REPEL_STRENGTH;
          b.vx += (dxM / distM) * force * 0.035;
          b.vy += (dyM / distM) * force * 0.035;
        }

        // ── Autonomous drift ──
        b.vx += (Math.random() - 0.5) * 0.05;
        b.vy += (Math.random() - 0.5) * 0.05;
        b.vx *= 0.996;
        b.vy *= 0.996;
        const spd = Math.hypot(b.vx, b.vy);
        if (spd > 1.5) { b.vx = (b.vx / spd) * 1.5; b.vy = (b.vy / spd) * 1.5; }

        b.x += b.vx;
        b.y += b.vy;

        const margin = size * 0.2;
        if (b.x < -margin)   b.vx += 0.3;
        if (b.x > W + margin) b.vx -= 0.3;
        if (b.y < -margin)   b.vy += 0.3;
        if (b.y > H + margin) b.vy -= 0.3;

        const svg = svgRefs.current[i];
        if (svg) {
          svg.style.transform = `translate(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px)`;
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
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {BLOBS.map(({ size, borderWidth }, i) => (
        <svg
          key={i}
          ref={(el) => { svgRefs.current[i] = el; }}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "transform",
          }}
        >
          {CHANNELS.map(({ color, dx, dy }, ch) => (
            <g key={ch} transform={`translate(${dx}, ${dy})`}>
              <path
                ref={(el) => { pathRefs.current[i][ch] = el; }}
                fill="none"
                stroke={color}
                strokeWidth={borderWidth}
                strokeDasharray="12 7"
              />
            </g>
          ))}
        </svg>
      ))}
    </div>
  );
}
