"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";
import Title from "@/components/home/HeroSection/Title";
import Marquee from "@/components/home/Marquee";

const styles = {
  section:    "relative z-0 h-dvh flex flex-col overflow-hidden",
  content:    "flex-1 flex flex-col justify-center page-x",
  ctaWrapper: "flex flex-wrap gap-3 mt-8 md:mt-10",
  ctaPrimary:
    "px-7 py-3.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition",
  ctaSecondary:
    "px-7 py-3.5 border text-sm font-semibold rounded-xl transition hover:opacity-60 flex items-center gap-2",
};

export default function Hero() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { loaded } = useLoading();

  useEffect(() => {
    if (!loaded) return;
    gsap.to(ctaRef.current, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.95,
    });
  }, [loaded]);

  return (
    <section id="section" className={styles.section}>
      <div className={styles.content}>
        <Title />

        <div
          ref={ctaRef}
          className={styles.ctaWrapper}
          style={{ opacity: 0, transform: "translateY(24px)" }}
        >
          <a
            href="#Contact"
            className={styles.ctaPrimary}
            style={{ backgroundColor: "var(--accent)" }}
          >
            Work with me
          </a>
          <a
            href="#WorkSample"
            className={styles.ctaSecondary}
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            See my work
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="pb-4 md:pb-6 border-t border-stone-200/20">
        <Marquee />
      </div>
    </section>
  );
}
