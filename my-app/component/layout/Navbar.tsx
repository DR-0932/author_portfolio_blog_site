"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useLoading } from "@/context/LoadingContext";

gsap.registerPlugin(useGSAP);

const styles = {
  wrapper: "w-full bg-[#f8ecdc57] backdrop-blur-md sticky top-0 z-50",

  container:
    "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 h-20 md:h-30 flex items-center text-black justify-between",

  logo: "text-2xl md:text-4xl font-semibold tracking-tight",

  nav: "text-xl md:text-3xl text-black hidden md:flex items-center gap-12 lg:gap-24",

  navItem: "hover:text-black transition",

  button:
    "text-xl tracking-widest rounded-2xl bg-black text-white px-6 py-3 max-w-[150px]  hover:opacity-90 transition",
};

export default function Navbar() {
  const navbarref = useRef<HTMLElement>(null);

  const { loaded } = useLoading();

  useGSAP(
    () => {
      if (!loaded) return;
      gsap.fromTo(
        navbarref.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1 },
      );
    },
    { dependencies: [loaded] },
  );

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 80) {
        gsap.to(navbarref.current, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.in",
        });
      } else {
        gsap.to(navbarref.current, {
          y: "0%",
          duration: 0.3,
          ease: "power2.out",
        });
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={styles.wrapper}
      ref={navbarref}
      style={{ opacity: 0, transform: "translateY(-100px)" }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          Yvaine
        </Link>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/blogs" className={styles.navItem}>
            Blog
          </Link>

          <Link href="/fiction" className={styles.navItem}>
            Fiction
          </Link>

          <Link href="/about" className={styles.navItem}>
            About
          </Link>
        </nav>

        {/* CTA */}
        <Link href="/contact" className={styles.button}>
          Get In Touch
        </Link>
      </div>
    </header>
  );
}
