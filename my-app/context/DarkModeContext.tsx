"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

type ThemeContextType = {
  dark: boolean;
  pink: boolean;
  toggleDark: () => void;
  togglePink: () => void;
};

const DarkModeContext = createContext<ThemeContextType>({
  dark: false,
  pink: false,
  toggleDark: () => {},
  togglePink: () => {},
});

function applyClasses(dark: boolean, pink: boolean) {
  const html = document.documentElement;
  html.classList.toggle("dark", dark);
  html.classList.toggle("pink", pink);
  // keep body.dark for admin page backward-compat
  document.body.classList.toggle("dark", dark);
}

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [pink, setPink] = useState(false);

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode") === "true";
    const storedPink = localStorage.getItem("pinkMode") === "true";
    setDark(storedDark);
    setPink(storedPink);
    applyClasses(storedDark, storedPink);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", String(next));
      setPink((p) => { applyClasses(next, p); return p; });
      return next;
    });
  }, []);

  const togglePink = useCallback(() => {
    setPink((prev) => {
      const next = !prev;
      localStorage.setItem("pinkMode", String(next));
      setDark((d) => { applyClasses(d, next); return d; });
      return next;
    });
  }, []);

  return (
    <DarkModeContext.Provider value={{ dark, pink, toggleDark, togglePink }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
