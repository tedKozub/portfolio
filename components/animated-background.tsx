"use client";

/* Liquid blob background – organické tvary s CSS border-radius morphingem
   a velkým blur filtrem pro Apple-like depth efekt */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* Blob 1 – purple, top-left */}
      <div
        className="absolute animate-liquid-1"
        style={{
          top: "-10%",
          left: "-8%",
          width: "520px",
          height: "480px",
          background:
            "radial-gradient(ellipse at 40% 40%, oklch(0.55 0.22 280 / 0.55), oklch(0.45 0.20 264 / 0.25) 60%, transparent 80%)",
          filter: "blur(72px)",
          willChange: "border-radius, transform",
        }}
      />

      {/* Blob 2 – blue, top-right */}
      <div
        className="absolute animate-liquid-2"
        style={{
          top: "-5%",
          right: "-10%",
          width: "450px",
          height: "420px",
          background:
            "radial-gradient(ellipse at 60% 35%, oklch(0.58 0.19 230 / 0.50), oklch(0.48 0.15 220 / 0.20) 60%, transparent 80%)",
          filter: "blur(80px)",
          willChange: "border-radius, transform",
        }}
      />

      {/* Blob 3 – green, bottom-left */}
      <div
        className="absolute animate-liquid-3"
        style={{
          bottom: "-12%",
          left: "-6%",
          width: "480px",
          height: "440px",
          background:
            "radial-gradient(ellipse at 45% 55%, oklch(0.62 0.15 162 / 0.40), oklch(0.50 0.12 155 / 0.18) 60%, transparent 80%)",
          filter: "blur(90px)",
          willChange: "border-radius, transform",
        }}
      />

      {/* Blob 4 – purple-blue mid accent, bottom-right */}
      <div
        className="absolute animate-liquid-4"
        style={{
          bottom: "5%",
          right: "-8%",
          width: "380px",
          height: "360px",
          background:
            "radial-gradient(ellipse at 55% 50%, oklch(0.50 0.20 270 / 0.35), oklch(0.42 0.18 258 / 0.15) 60%, transparent 80%)",
          filter: "blur(70px)",
          willChange: "border-radius, transform",
        }}
      />

      {/* Small accent – center-ish, subtle */}
      <div
        className="absolute animate-liquid-2"
        style={{
          top: "40%",
          left: "38%",
          width: "200px",
          height: "180px",
          background:
            "radial-gradient(ellipse, oklch(0.68 0.148 162 / 0.18), transparent 70%)",
          filter: "blur(50px)",
          animationDelay: "-8s",
          willChange: "border-radius, transform",
        }}
      />
    </div>
  );
}
