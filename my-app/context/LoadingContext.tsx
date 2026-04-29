"use client";
import { createContext, useContext, useState, useCallback } from "react";

type LoadingContextType = { loaded: boolean; markLoaded: () => void };

const LoadingContext = createContext<LoadingContextType>({
  loaded: false,
  markLoaded: () => {},
});

// Module-level flag: resets on hard reload, survives client-side navigation
let hasLoaded = false;

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(() => hasLoaded);

  const markLoaded = useCallback(() => {
    hasLoaded = true;
    setLoaded(true);
  }, []);

  return (
    <LoadingContext.Provider value={{ loaded, markLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
