"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useLoading } from "@/context/LoadingContext";
import { useDarkMode } from "@/context/DarkModeContext";

gsap.registerPlugin(useGSAP);

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

export default function Navbar() {
  const navbarref = useRef<HTMLElement>(null);
  const { loaded } = useLoading();
  const { dark, toggleDark } = useDarkMode();

  useGSAP(() => {
    if (!loaded) return;
    gsap.fromTo(
      navbarref.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1 },
    );
  }, { dependencies: [loaded] });

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 80) {
        gsap.to(navbarref.current, { y: "-100%", duration: 0.3, ease: "power2.in" });
      } else {
        gsap.to(navbarref.current, { y: "0%", duration: 0.3, ease: "power2.out" });
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = dark ? "rgba(15,15,15,0.85)" : "rgba(248,236,220,0.34)";
  const navText = dark ? "#e5e5e5" : "#000000";
  const accent = dark ? "#ec4899" : "#AE572C";

  return (
    <header
      ref={navbarref}
      className="w-full backdrop-blur-md sticky top-0 z-50 transition-colors duration-500"
      style={{ opacity: 0, transform: "translateY(-100px)", backgroundColor: navBg }}
    >
      <div
        className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 h-20 md:h-30 flex items-center justify-between"
        style={{ color: navText }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-4xl font-semibold tracking-tight transition-colors duration-500"
          style={{ color: dark ? "#ec4899" : "#000000" }}
        >
          Yvaine
        </Link>

        {/* Navigation */}
        <nav className="text-xl md:text-3xl hidden md:flex items-center gap-12 lg:gap-24">
          <Link href="/blogs" className="hover:opacity-70 transition">Blog</Link>
          <Link href="/fiction" className="hover:opacity-70 transition">Fiction</Link>
          <Link href="/about" className="hover:opacity-70 transition">About</Link>
        </nav>

        {/* Right: dark toggle + CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDark}
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase px-3 py-2 rounded-full border transition-colors duration-300"
            style={{ borderColor: accent, color: accent }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
            {dark ? "Light" : "Dark"}
          </button>

          <Link
            href="/contact"
            className="text-base tracking-widest rounded-2xl px-5 py-2.5 hover:opacity-90 transition-all duration-500"
            style={{ backgroundColor: dark ? "#ec4899" : "#000", color: "#fff" }}
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
