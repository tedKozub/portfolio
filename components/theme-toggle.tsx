"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed top-6 right-6 w-12 h-12" />; // placeholder to prevent shift
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun
          className={`absolute text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
          size={22}
        />
        <Moon
          className={`absolute text-slate-200 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
          }`}
          size={22}
        />
      </div>
    </button>
  );
}
