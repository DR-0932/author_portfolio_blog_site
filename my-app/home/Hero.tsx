"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";

const socials = [
  {
    label: "Substack",
    href: "https://substack.com/@20sdiaries/posts",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Medium",
    href: "https://medium.com/@palakagarwal.ag1002",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

const styles = {
  section: "relative z-0 h-dvh flex items-center",

  sidebar:
    "absolute left-8 md:left-64 top-1/2 -translate-y-1/2 flex flex-col gap-15",

  sidebarLine: "hidden",

  sidebarLink:
    "flex items-center gap-2 text-lg tracking-[0.15em] uppercase text-black hover:text-[#AE572C] transition-colors duration-300",

  container:
    "w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 ",

  title:
    "text-4xl sm:text-6xl md:text-[8rem] font-bold tracking-widest text-left",

  subtitle:
    "text-base md:text-2xl font-semibold py-6 md:py-12 tracking-widest px-3 text-left",

  cta: "mt-6 md:mt-10 flex flex-wrap justify-start gap-4",

  ctaPrimary:
    "px-10 py-4 bg-[#AE572C] text-white text-base font-medium rounded-xl hover:opacity-90 transition",

  ctaSecondary:
    "px-10 py-4 border border-stone-400 text-base font-medium rounded-xl hover:border-[#AE572C] hover:text-[#AE572C] transition",
};

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { loaded } = useLoading();

  useEffect(() => {
    if (!loaded) return;
    gsap.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
    gsap.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.4,
    });
    gsap.to(sidebarRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.4,
    });
  }, [loaded]);

  return (
    <>
      <section id="section" className={styles.section}>
        {/* Bottom social bar */}
        <div
          ref={sidebarRef}
          className={styles.sidebar}
          style={{ transform: "translateX(-40px)", opacity: 0 }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.sidebarLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>

        <div className={styles.container}>
          <h1
            ref={titleRef}
            className={styles.title}
            style={{ transform: "translateY(100px)", opacity: 0 }}
          >
            Palak Agarwal
          </h1>
          <p
            ref={subtitleRef}
            className={styles.subtitle}
            style={{ transform: "translateY(100px)", opacity: 0 }}
          >
            Book Editor | Ghost Writer | Content Writer{" "}
          </p>

          <div className={styles.cta}>
            <a href="#Contact" className={styles.ctaPrimary}>
              Work with me
            </a>
            <a href="#WorkSample" className={styles.ctaSecondary}>
              See my work
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
