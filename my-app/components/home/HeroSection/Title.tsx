"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";
import { useDarkMode } from "@/context/DarkModeContext";

const styles = {
  title: "font-bold tracking-wide text-start leading-none",
  subtitle: "font-medium tracking-[0.2em] uppercase mt-4 md:mt-6",
};

export default function Title() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const { loaded } = useLoading();
  const { dark } = useDarkMode();

  const mutedColor = dark ? "#a0a0a0" : "#555555";

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
      delay: 0.65,
    });
  }, [loaded]);

  return (
    <>
      <h1
        ref={titleRef}
        className={styles.title}
        style={{
          fontSize: "clamp(2.8rem, 7vw, 3rem)",
          opacity: 0,
          transform: "translateY(60px)",
        }}
      >
        Words that work. Stories that last
      </h1>

      <p
        ref={subtitleRef}
        className={styles.subtitle}
        style={{
          fontSize: "clamp(1rem, 2vw, 1rem)",

          color: mutedColor,
          opacity: 0,
          transform: "translateY(40px)",
        }}
      >
        Book Editor · Ghost Writer · Content Writer
      </p>
    </>
  );
}
