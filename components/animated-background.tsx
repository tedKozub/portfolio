"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
  Organic SVG blobs with local stroke interaction (mouse dents the stroke).
  Canvas particle system trailing the blobs.
  Mobile optimized (fewer blobs, fewer particles, SVG filter disabled on small screens).
*/

function polarToCart(cx: number, cy: number, angle: number, r: number) {
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

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

const NUM_CTRL_POINTS = 8; // Keep it low for maximum smoothness

function generateRadii(baseR: number, seed: number): number[] {
  const radii: number[] = [];
  for (let i = 0; i < NUM_CTRL_POINTS; i++) {
    const angle = (Math.PI * 2 * i) / NUM_CTRL_POINTS;
    // Less noise amplitude for a calmer, less wobbly shape
    const n1 = Math.sin(angle * 1 + seed * 3.17) * 0.05;
    const n2 = Math.cos(angle * 2 + seed * 7.31) * 0.03;
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

const BLOBS = [
  { size: 700, baseR: 290, borderWidth: 1.5, morphSpeed: 0.00015, seeds: [1.2, 5.7, 9.3] },
  { size: 600, baseR: 240, borderWidth: 2,   morphSpeed: 0.00012, seeds: [3.4, 7.1, 2.8] },
  { size: 850, baseR: 360, borderWidth: 1.5, morphSpeed: 0.00014, seeds: [6.5, 0.9, 4.6] },
  { size: 550, baseR: 220, borderWidth: 2,   morphSpeed: 0.00011, seeds: [8.2, 3.3, 7.9] },
];

const CHANNELS = [
  { color: "rgba(255, 60, 60, 0.25)",   dx: -4, dy: -3, dash: "90 40 20 50" }, // Red
  { color: "rgba(200, 200, 200, 0.20)", dx: 0,  dy: 0,  dash: "120 70" },      // Grey
  { color: "rgba(60, 100, 255, 0.25)",   dx: 4,  dy: 3,  dash: "50 60 110 40" }, // Blue
];

const BLOB_TARGETS = BLOBS.map((b) => b.seeds.map((seed) => generateRadii(b.baseR, seed)));

function lerpRadii(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => v + (b[i] - v) * t);
}

// Particle class for the trailing dust effect
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  size: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.0;
    this.vy = (Math.random() - 0.5) * 1.0 - 0.3; // softer upward drift
    this.life = 1.0;
    this.decay = Math.random() * 0.01 + 0.008; // slightly faster decay
    this.color = color;
    this.size = Math.random() * 1.2 + 0.5; // smaller particles
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(0, this.life * 0.25); // much less prominent
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const PARTICLE_COLORS = ["255, 60, 60", "200, 200, 200", "60, 100, 255"];

export function AnimatedBackground() {
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[][]>(BLOBS.map(() => [null, null, null]));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  const stateRef = useRef<{ x: number; y: number; vx: number; vy: number; rot: number }[]>([]);
  const pointDefs = useRef<{ val: number; vel: number }[][]>([]);
  const mouse = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999, vx: 0, vy: 0 });
  const raf = useRef(0);
  
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);

  const init = useCallback(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    stateRef.current = BLOBS.map((blob, i) => ({
      x: W * 0.05 + (W * 0.8 / BLOBS.length) * i,
      y: H * 0.1 + Math.random() * H * 0.6,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      rot: Math.random() * 360,
    }));
    pointDefs.current = BLOBS.map(() => 
      Array.from({ length: NUM_CTRL_POINTS }, () => ({ val: 0, vel: 0 }))
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;

      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    init();

    const onMouse = (e: MouseEvent) => {
      if (mouse.current.tx === -9999) {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      }
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const tick = (time: number) => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      // Smooth mouse & calc velocity
      if (mouse.current.tx !== -9999) {
        const dx = mouse.current.tx - mouse.current.x;
        const dy = mouse.current.ty - mouse.current.y;
        mouse.current.vx = dx * 0.2;
        mouse.current.vy = dy * 0.2;
        mouse.current.x += dx * 0.2;
        mouse.current.y += dy * 0.2;
      }
      const { x: mx, y: my, vx: mvx, vy: mvy } = mouse.current;
      const mobile = isMobileRef.current;
      const activeBlobs = mobile ? 2 : 4;

      // Update Canvas Particles
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, W, H);
          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.update();
            p.draw(ctx);
            if (p.life <= 0) particlesRef.current.splice(i, 1);
          }
        }
      }

      stateRef.current.slice(0, activeBlobs).forEach((b, i) => {
        const blob = BLOBS[i];
        const size = blob.size;
        const cx = size / 2;
        const cy = size / 2;

        const targets = BLOB_TARGETS[i];
        const phase = (time * blob.morphSpeed) % 3;
        const seg = Math.floor(phase);
        const t = phase - seg;
        const eased = t * t * (3 - 2 * t);
        const baseRadii = lerpRadii(targets[seg % 3], targets[(seg + 1) % 3], eased);

        // Deform stroke based on mouse movement direction (spring physics)
        const defs = pointDefs.current[i];
        const deformedRadii = baseRadii.map((localR, pIdx) => {
          const localAngle = (Math.PI * 2 * pIdx) / NUM_CTRL_POINTS;
          const globalAngle = localAngle + (b.rot * Math.PI / 180);
          
          const px = b.x + cx + Math.cos(globalAngle) * localR;
          const py = b.y + cy + Math.sin(globalAngle) * localR;

          const dist = Math.hypot(px - mx, py - my);
          const interactionRadius = mobile ? 80 : 140;

          let force = 0;
          if (dist < interactionRadius && dist > 1) {
            const proximity = Math.pow((interactionRadius - dist) / interactionRadius, 2);
            // Dot product of mouse velocity and radial outward vector
            const dot = mvx * Math.cos(globalAngle) + mvy * Math.sin(globalAngle);
            force = dot * proximity * 0.8; // tuning push strength
          }

          const d = defs[pIdx];
          // Spring physics: stiffness (k) and damping
          const k = 0.15; // increased stiffness so it snaps back faster
          const damp = 0.70; // increased damping so it bounces less
          d.vel += force;
          d.vel -= d.val * k;
          d.vel *= damp;
          d.val += d.vel;

          // Cap the deformation so the shape doesn't break
          const maxDef = mobile ? 50 : 90;
          d.val = Math.max(-maxDef, Math.min(maxDef, d.val));

          return Math.max(localR * 0.2, localR + d.val);
        });

        const pts = radiiToPoints(deformedRadii, cx, cy);
        const pathD = buildSmoothPath(pts);

        for (let ch = 0; ch < 3; ch++) {
          const pEl = pathRefs.current[i][ch];
          if (pEl) pEl.setAttribute("d", pathD);
        }

        // Spawn particles trailing from the stroke
        if (Math.random() < (mobile ? 0.02 : 0.05)) { // fewer particles
          const pIdx = Math.floor(Math.random() * NUM_CTRL_POINTS);
          const localR = deformedRadii[pIdx];
          const localAngle = (Math.PI * 2 * pIdx) / NUM_CTRL_POINTS;
          const globalAngle = localAngle + (b.rot * Math.PI / 180);
          
          const px = b.x + cx + Math.cos(globalAngle) * localR;
          const py = b.y + cy + Math.sin(globalAngle) * localR;
          
          const color = `rgb(${PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]})`;
          particlesRef.current.push(new Particle(px, py, color));
        }

        // Weak center repulsion to keep them drifting slightly away
        const dxM = b.x + cx - mx;
        const dyM = b.y + cy - my;
        const distM = Math.hypot(dxM, dyM);
        if (distM < 300 && distM > 1) {
          const force = (300 - distM) / 300;
          b.vx += (dxM / distM) * force * 0.01;
          b.vy += (dyM / distM) * force * 0.01;
        }

        // Drift & rotate
        b.vx += (Math.random() - 0.5) * 0.03;
        b.vy += (Math.random() - 0.5) * 0.03;
        b.vx *= 0.998;
        b.vy *= 0.998;
        b.rot += 0.03;

        const spd = Math.hypot(b.vx, b.vy);
        if (spd > 0.8) { b.vx = (b.vx / spd) * 0.8; b.vy = (b.vy / spd) * 0.8; }

        b.x += b.vx;
        b.y += b.vy;

        // Soft bounds
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
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf.current);
    };
  }, [init]);

  const activeBlobs = isMobile ? 2 : 4;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Canvas for Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%" }}
      />

      {/* SVG Filters (disabled on mobile for performance) */}
      {!isMobile && (
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="brush-texture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Blobs */}
      {BLOBS.slice(0, activeBlobs).map(({ size, borderWidth }, i) => (
        <svg
          key={i}
          ref={(el) => { svgRefs.current[i] = el; }}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="z-10 absolute top-0 left-0"
          style={{ willChange: "transform" }}
        >
          <g filter={!isMobile ? "url(#brush-texture)" : undefined}>
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
