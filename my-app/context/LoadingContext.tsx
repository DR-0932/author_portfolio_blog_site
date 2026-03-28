"use client";
import { createContext, useContext, useState, useCallback } from "react";

type LoadingContextType = { loaded: boolean; markLoaded: () => void };

const LoadingContext = createContext<LoadingContextType>({
  loaded: false,
  markLoaded: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const markLoaded = useCallback(() => setLoaded(true), []);
  return (
    <LoadingContext.Provider value={{ loaded, markLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
