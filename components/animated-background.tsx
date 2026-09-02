"use client";

import { useEffect, useRef, useCallback } from "react";

/*
  Large, smooth, organic SVG blobs.
  Uses SVG filters (feTurbulence + feDisplacementMap) to create a "brush stroke" texture.
  Longer dashed lines with gaps for a sketched, painterly look.
  Chromatic aberration layered channels.
*/

function polarToCart(cx: number, cy: number, angle: number, r: number) {
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

// Lower tension (0.3) for rounder, less spiky curves
function buildSmoothPath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 3) return "";

  const tension = 0.35;
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

// Fewer points (7) + very gentle noise = perfectly smooth, rounded blob (no points)
const NUM_CTRL_POINTS = 7;

function generateRadii(baseR: number, seed: number): number[] {
  const radii: number[] = [];
  for (let i = 0; i < NUM_CTRL_POINTS; i++) {
    const angle = (Math.PI * 2 * i) / NUM_CTRL_POINTS;
    // Gentle sine waves to keep it round and blobby
    const n1 = Math.sin(angle * 1 + seed * 3.17) * 0.12; 
    const n2 = Math.cos(angle * 2 + seed * 7.31) * 0.08;
    radii.push(baseR * (1 + n1 + n2));
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

interface BlobDef {
  size: number;
  baseR: number;
  borderWidth: number;
  morphSpeed: number;
  seeds: [number, number, number];
}

// Even larger blobs
const BLOBS: BlobDef[] = [
  { size: 700, baseR: 290, borderWidth: 1.5, morphSpeed: 0.0003,  seeds: [1.2, 5.7, 9.3] },
  { size: 600, baseR: 240, borderWidth: 2,   morphSpeed: 0.00025, seeds: [3.4, 7.1, 2.8] },
  { size: 850, baseR: 360, borderWidth: 1.5, morphSpeed: 0.00028, seeds: [6.5, 0.9, 4.6] },
  { size: 550, baseR: 220, borderWidth: 2,   morphSpeed: 0.00022, seeds: [8.2, 3.3, 7.9] },
];

// Chromatic channels with long "brush stroke" dashed patterns
const CHANNELS = [
  { color: "rgba(255, 60, 60, 0.25)",   dx: -4, dy: -3, dash: "90 40 20 50" }, // Red
  { color: "rgba(200, 200, 200, 0.20)", dx: 0,  dy: 0,  dash: "120 70" },      // Grey
  { color: "rgba(60, 100, 255, 0.25)",   dx: 4,  dy: 3,  dash: "50 60 110 40" }, // Blue
];

const BLOB_TARGETS = BLOBS.map((b) =>
  b.seeds.map((seed) => generateRadii(b.baseR, seed))
);

function lerpRadii(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => v + (b[i] - v) * t);
}

const REPEL_RADIUS = 350;
const REPEL_STRENGTH = 5;

export function AnimatedBackground() {
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[][]>(BLOBS.map(() => [null, null, null]));
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number; rot: number }[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  const init = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    stateRef.current = BLOBS.map((blob, i) => ({
      x: W * 0.05 + (W * 0.8 / BLOBS.length) * i,
      y: H * 0.1 + Math.random() * H * 0.6,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      rot: Math.random() * 360, // Slow rotation
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

        // Morph path
        const targets = BLOB_TARGETS[i];
        const phase = (time * blob.morphSpeed) % 3;
        const seg = Math.floor(phase);
        const t = phase - seg;
        // Smooth easing
        const eased = t * t * (3 - 2 * t);
        const currentRadii = lerpRadii(targets[seg % 3], targets[(seg + 1) % 3], eased);
        const pts = radiiToPoints(currentRadii, cx, cy);
        const pathD = buildSmoothPath(pts);

        for (let ch = 0; ch < 3; ch++) {
          const pEl = pathRefs.current[i][ch];
          if (pEl) pEl.setAttribute("d", pathD);
        }

        // Mouse repulsion
        const dxM = b.x + cx - mx;
        const dyM = b.y + cy - my;
        const distM = Math.hypot(dxM, dyM);

        if (distM < REPEL_RADIUS && distM > 1) {
          const force = ((REPEL_RADIUS - distM) / REPEL_RADIUS) * REPEL_STRENGTH;
          b.vx += (dxM / distM) * force * 0.02;
          b.vy += (dyM / distM) * force * 0.02;
        }

        // Autonomous drift & slow rotation
        b.vx += (Math.random() - 0.5) * 0.03;
        b.vy += (Math.random() - 0.5) * 0.03;
        b.vx *= 0.998;
        b.vy *= 0.998;
        b.rot += 0.02; // continuously rotate very slowly

        const spd = Math.hypot(b.vx, b.vy);
        if (spd > 0.8) { b.vx = (b.vx / spd) * 0.8; b.vy = (b.vy / spd) * 0.8; }

        b.x += b.vx;
        b.y += b.vy;

        // Soft boundaries
        const margin = size * 0.1;
        if (b.x < -margin)   b.vx += 0.15;
        if (b.x > W + margin) b.vx -= 0.15;
        if (b.y < -margin)   b.vy += 0.15;
        if (b.y > H + margin) b.vy -= 0.15;

        const svg = svgRefs.current[i];
        if (svg) {
          svg.style.transform = `translate(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px) rotate(${b.rot.toFixed(1)}deg)`;
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
      {/* SVG Filters for Brush Texture */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="brush-texture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

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
          <g filter="url(#brush-texture)">
            {CHANNELS.map(({ color, dx, dy, dash }, ch) => (
              <g key={ch} transform={`translate(${dx}, ${dy})`}>
                <path
                  ref={(el) => { pathRefs.current[i][ch] = el; }}
                  fill="none"
                  stroke={color}
                  strokeWidth={borderWidth}
                  strokeDasharray={dash}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
        </svg>
      ))}
    </div>
  );
}
