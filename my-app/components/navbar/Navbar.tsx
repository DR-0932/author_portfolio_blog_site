"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLoading } from "@/context/LoadingContext";
import { useDarkMode } from "@/context/DarkModeContext";
import { usePathname } from "next/navigation";
import NavLogo from "@/components/navbar/NavLogo";
import NavLink from "@/components/navbar/NavLink";
import HamburgerMenu from "@/components/navbar/HamburgerMenu";
import GetInTouchButton from "@/components/ui/GetInTouchButton";
import DarkModeToggle from "@/components/navbar/DarkModeToggle";

gsap.registerPlugin(useGSAP);

const desktopNavLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blog" },
  { href: "/fiction", label: "Fiction" },
  { href: "/about", label: "About" },
];

const mobileNavLinks = [
  { href: "/blogs", label: "Blog" },
  { href: "/fiction", label: "Fiction" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const styles = {
  header: "w-full backdrop-blur-md fixed top-0 z-50 transition-colors duration-500",
  inner: "page-x h-16 md:h-20 flex items-center justify-between",
  navPill: "hidden md:flex items-center gap-4 lg:gap-12 px-12 py-2 rounded-full shadow-md",
  rightGroup: "flex items-center gap-3",
};

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const { loaded } = useLoading();
  const { dark, pink, togglePink } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useGSAP(
    () => {
      if (!loaded) return;
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 },
      );
    },
    { dependencies: [loaded] },
  );

  // useEffect(() => {
  //   let lastY = window.scrollY;
  //   const onScroll = () => {
  //     const currentY = window.scrollY;
  //     if (currentY > lastY && currentY > 80) {
  //       gsap.to(navbarRef.current, { y: "-100%", duration: 0.3, ease: "power2.in" });
  //     } else {
  //       gsap.to(navbarRef.current, { y: "0%", duration: 0.3, ease: "power2.out" });
  //     }
  //     lastY = currentY;
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <>
      <header
        ref={navbarRef}
        className={styles.header}
        style={{
          opacity: 0,
          transform: "translateY(-100px)",
          backgroundColor: "var(--nav-bg)",
        }}
      >
        <div className={styles.inner} style={{ color: "var(--nav-text)" }}>
          <NavLogo text="Palak Agarwal" />

          <nav className={styles.navPill} style={{ border: "1px solid var(--border)" }}>
            {desktopNavLinks.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </nav>

          <div className={styles.rightGroup}>
            <DarkModeToggle />

            {/* Hotpink accent toggle */}
            <button
              onClick={togglePink}
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase px-3 py-2 rounded-full border transition-colors duration-300"
              style={{
                borderColor: pink ? "#ec4899" : "var(--border)",
                color: pink ? "#ec4899" : "var(--muted)",
                backgroundColor: pink ? "rgba(236,72,153,0.08)" : "transparent",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ec4899" }} />
              Pink
            </button>

            <GetInTouchButton />
            <HamburgerMenu
              menuOpen={menuOpen}
              onToggle={() => setMenuOpen((o) => !o)}
            />
          </div>
        </div>
      </header>

      {/* Mobile menu overlay — outside <header> so it's not capped by z-50 stacking context */}
      <div
        className="fixed inset-0 z-70 md:hidden flex flex-col transition-opacity duration-300"
        style={{
          backgroundColor: dark ? "#0f0f0f" : "#f7f3ee",
          color: "var(--text)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Top bar with close button */}
        <div className="h-16 flex items-center justify-end page-x">
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
            style={{ border: "1px solid var(--border)" }}
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-8 pt-10 gap-8">
          {mobileNavLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} mobile onClick={() => setMenuOpen(false)} />
          ))}
        </nav>

        <div className="mt-auto px-8 pb-12">
          <div className="h-px w-full mb-8" style={{ backgroundColor: "var(--border)" }} />
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
            Get in touch
          </p>
          <Link
            href="/contact"
            className="inline-block text-lg font-semibold"
            style={{ color: "var(--text)" }}
            onClick={() => setMenuOpen(false)}
          >
            Start a project →
          </Link>
        </div>
      </div>
    </>
  );
}
