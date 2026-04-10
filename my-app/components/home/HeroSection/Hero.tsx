"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";
import { useDarkMode } from "@/context/DarkModeContext";
import SocialMediaLinks from "@/components/home/HeroSection/SocialMediaLinks";
import Title from "@/components/home/HeroSection/Title";

const styles = {
  section: "relative z-0 h-dvh flex items-center overflow-hidden",

  content:
    "w-full h-full flex flex-col items-start justify-center text-start px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64",

  ctaWrapper: "flex flex-wrap justify-start gap-3 mt-8 md:mt-10",

  ctaPrimary:
    "px-6 md:px-8 py-3 md:py-3.5 bg-[#AE572C] text-white text-sm md:text-base font-medium rounded-xl hover:opacity-90 transition",

  ctaSecondary:
    "px-6 md:px-8 py-3 md:py-3.5 border text-sm md:text-base font-medium rounded-xl transition hover:opacity-60",
};

export default function Hero() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { loaded } = useLoading();
  const { dark } = useDarkMode();

  const textColor = dark ? "#ffffff" : "#000000";

  useEffect(() => {
    if (!loaded) return;

    gsap.to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.8,
    });

    gsap.to(socialsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.95,
    });

    gsap.to(sidebarRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  }, [loaded]);

  return (
    <section id="section" className={styles.section}>
      {/* <SocialMediaLinks
        textColor={textColor}
        sidebarRef={sidebarRef}
        mobileSocialsRef={socialsRef}
      /> */}

      <div className={styles.content}>
        <Title />

        <div
          ref={ctaRef}
          className={styles.ctaWrapper}
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <a href="#Contact" className={styles.ctaPrimary}>
            Work with me
          </a>
          <a
            href="#WorkSample"
            className={styles.ctaSecondary}
            style={{ borderColor: dark ? "#555" : "#aaa", color: textColor }}
          >
            See my work
          </a>
        </div>
      </div>
    </section>
  );
}
