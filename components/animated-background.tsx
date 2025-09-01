export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-muted/20 rounded-lg animate-float" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-muted/15 rounded-full animate-float-slow" />
      <div className="absolute top-60 left-1/4 w-8 h-8 bg-muted/25 rotate-45 animate-float-reverse" />
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-muted/10 rounded-lg animate-float" />
      <div className="absolute bottom-60 left-16 w-14 h-14 bg-muted/20 rounded-full animate-float-slow" />
      <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-muted/15 rotate-45 animate-float-reverse" />
      <div className="absolute bottom-20 left-1/2 w-6 h-6 bg-muted/30 rounded-full animate-float" />
      <div className="absolute top-80 right-1/4 w-18 h-18 bg-muted/12 rounded-lg animate-float-slow" />
    </div>
  );
}
