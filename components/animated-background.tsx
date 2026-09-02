export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Outline-only abstract shapes – grey borders, no fill */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-xl border border-white/10 animate-float" />
      <div className="absolute top-40 right-20 w-14 h-14 rounded-full border border-white/8 animate-float-slow" />
      <div className="absolute top-64 left-1/4 w-10 h-10 rotate-45 border border-white/10 animate-float-reverse" />
      <div className="absolute bottom-40 right-12 w-24 h-24 rounded-2xl border border-white/8 animate-float" />
      <div className="absolute bottom-64 left-16 w-16 h-16 rounded-full border border-white/10 animate-float-slow" />
      <div className="absolute top-1/3 right-1/3 w-12 h-12 rotate-45 border border-white/8 animate-float-reverse" />
      <div className="absolute bottom-24 left-1/2 w-8 h-8 rounded-full border border-white/10 animate-float" />
      <div className="absolute top-80 right-1/4 w-20 h-20 rounded-xl border border-white/8 animate-float-slow" />
      <div className="absolute top-1/2 left-8 w-6 h-6 rotate-45 border border-white/10 animate-float-reverse" />
      <div className="absolute bottom-1/3 right-1/2 w-18 h-18 rounded-full border border-white/8 animate-float" />
    </div>
  );
}
