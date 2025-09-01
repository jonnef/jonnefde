"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // initial aus localStorage / System übernehmen
  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) || null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const start = stored || (prefersDark ? "dark" : "light");
    applyTheme(start);
  }, []);

  const applyTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    // daisyUI: data-theme auf <html>
    document.documentElement.setAttribute("data-theme", t === "dark" ? "dark" : "light");
    // Tailwind: dark class toggeln (falls du dark: Utilities nutzt)
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  const toggle = () => applyTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-700/60 transition"
      aria-label="Theme umschalten"
      title={theme === "dark" ? "Helles Thema" : "Dunkles Thema"}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
