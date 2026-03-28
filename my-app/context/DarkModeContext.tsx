"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

type DarkModeContextType = { dark: boolean; toggleDark: () => void };

const DarkModeContext = createContext<DarkModeContextType>({
  dark: false,
  toggleDark: () => {},
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setDark(stored);
    document.body.classList.toggle("dark", stored);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", String(next));
      document.body.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
