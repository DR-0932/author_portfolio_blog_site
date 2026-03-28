"use client";
import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function LoadingScreen() {
  const { loaded, markLoaded } = useLoading();
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Already loaded (navigating between pages) — skip immediately
    if (loaded) {
      setVisible(false);
      return;
    }

    const fadeTimer = setTimeout(() => setFading(true), 2000);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      markLoaded();
    }, 2700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999] transition-opacity duration-700"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <p
        className="text-white text-2xl md:text-4xl font-light tracking-widest text-center leading-relaxed max-w-xl px-8"
        style={{ fontFamily: "var(--font-playwrite)" }}
      >
        I believe good writing doesn&apos;t shout; it whispers the truth you
        didn&apos;t know you were holding.
      </p>
    </div>
  );
}
