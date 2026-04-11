"use client";

import { useDarkMode } from "@/context/DarkModeContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0-5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM4.22 5.64a1 1 0 0 1 1.42-1.42l1.41 1.42a1 1 0 0 1-1.41 1.41L4.22 5.64zm12.72 12.72a1 1 0 0 1 1.41-1.41l1.42 1.41a1 1 0 1 1-1.42 1.42l-1.41-1.42zM2 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm17 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zM5.64 19.78a1 1 0 0 1-1.42-1.42l1.42-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.42zM18.36 6.36a1 1 0 0 1-1.41-1.41l1.41-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.41z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  );
}

export default function DarkModeToggle() {
  const { dark, toggleDark } = useDarkMode();

  return (
    <button
      onClick={toggleDark}
      className="flex items-center gap-1.5 text-xs tracking-widest uppercase px-3 py-2 rounded-full border transition-colors duration-300"
      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
      <span className="hidden xs:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
