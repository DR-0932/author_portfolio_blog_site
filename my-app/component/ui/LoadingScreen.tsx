"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";

const STRIPS = 7;

export default function LoadingScreen() {
  const { loaded, markLoaded } = useLoading();
  const [visible, setVisible] = useState(!loaded);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (loaded) {
      setVisible(false);
      return;
    }

    // Animate text in
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    const timer = setTimeout(() => {
      // Fade text out
      gsap.to(textRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.5,
        ease: "power2.in",
      });

      // Strips slide up to reveal page
      gsap.to(".loading-strip", {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        stagger: 0.07,
        delay: 0.3,
        onComplete: () => {
          setVisible(false);
          markLoaded();
        },
      });
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 overflow-hidden">
      {/* Strips */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: STRIPS }).map((_, i) => (
          <div key={i} className="loading-strip flex-1 bg-black h-full" />
        ))}
      </div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p
          ref={textRef}
          className="text-white text-2xl md:text-4xl font-light tracking-widest text-center leading-relaxed max-w-xl px-8"
          style={{ fontFamily: "var(--font-playwrite)", opacity: 0 }}
        >
          I believe good writing doesn&apos;t shout; it whispers the truth you
          didn&apos;t know you were holding.
        </p>
      </div>
    </div>
  );
}
