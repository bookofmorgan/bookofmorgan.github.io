"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Render placeholder before hydration so layout stays stable.
  if (theme === null) {
    return (
      <span
        aria-hidden
        className="inline-block w-[3.5rem] h-[1.4rem] font-mono text-[11px]"
      />
    );
  }

  const label = theme === "light" ? "lights off" : "lights on";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="font-mono text-[11px] text-text-dim hover:text-accent transition-colors"
    >
      {label}
    </button>
  );
}
