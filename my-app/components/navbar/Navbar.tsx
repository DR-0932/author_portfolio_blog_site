"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
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

const styles = {
  header:
    "w-full backdrop-blur-md fixed top-0 z-50 transition-colors duration-500",
  inner:
    "page-x h-16 md:h-20 flex items-center justify-between",
  navPill:
    "hidden md:flex items-center gap-4 lg:gap-12 px-12 py-2 rounded-full shadow-md",
  rightGroup: "flex items-center gap-3",
};

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const { loaded } = useLoading();
  const { pink, togglePink } = useDarkMode();
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

          <nav
            className={styles.navPill}
            style={{ border: "1px solid var(--border)" }}
          >
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
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "#ec4899" }}
              />
              Pink
            </button>

            <GetInTouchButton />
            <HamburgerMenu
              menuOpen={menuOpen}
              onToggle={() => setMenuOpen((o) => !o)}
              onClose={() => setMenuOpen(false)}
            />
          </div>
        </div>
      </header>
    </>
  );
}
