"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export type FloatingBookProps = {
  color: string;       // cover colour
  title: string;       // text on cover & spine
  subtitle?: string;   // small label above title
  bob?: boolean;       // enable floating animation (default true)
  tilt?: boolean;      // enable mouse-tilt (default true)
  width?: number;
  height?: number;
  depth?: number;
};

export default function FloatingBook({
  color,
  title,
  subtitle,
  bob = true,
  tilt = true,
  width:  W = 160,
  height: H = 220,
  depth:  D = 32,
}: FloatingBookProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bobRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bob) {
      gsap.to(bobRef.current, {
        y: -12,
        duration: 2.6 + Math.random() * 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    if (tilt) {
      const onMove = (e: MouseEvent) => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const rx = ((e.clientY - cy) / window.innerHeight) * -26;
        const ry = ((e.clientX - cx) / window.innerWidth)  *  36;
        gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.55, ease: "power2.out", overwrite: "auto" });
      };

      const onLeave = () => {
        gsap.to(wrapRef.current, { rotateX: -5, rotateY: 12, duration: 1.2, ease: "elastic.out(1,0.5)" });
      };

      gsap.set(wrapRef.current, { rotateX: -5, rotateY: 12 });
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseleave", onLeave);
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      };
    }
  }, [bob, tilt]);

  const dark   = `color-mix(in srgb, ${color} 68%, black)`;
  const darker = `color-mix(in srgb, ${color} 50%, black)`;

  return (
    <div style={{ perspective: "900px" }}>
      {/* bob wrapper */}
      <div ref={bobRef}>
        {/* tilt wrapper */}
        <div
          ref={wrapRef}
          style={{ width: W, height: H, transformStyle: "preserve-3d", position: "relative" }}
        >
          {/* Front cover */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundColor: color,
              borderRadius: "2px 6px 6px 2px",
              transform: `translateZ(${D / 2}px)`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)`,
              display: "flex", flexDirection: "column",
              justifyContent: "flex-end", padding: "16px 14px",
              overflow: "hidden",
            }}
          >
            {/* Decorative lines */}
            <div style={{ position: "absolute", top: 16, left: 14, right: 14, opacity: 0.12 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ height: 1, backgroundColor: "#fff", marginBottom: 9 }} />
              ))}
            </div>
            {subtitle && (
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 5 }}>
                {subtitle}
              </p>
            )}
            <p style={{ color: "#ffffff", fontSize: 13, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em", wordBreak: "break-word" }}>
              {title}
            </p>
          </div>

          {/* Back cover */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundColor: darker,
              borderRadius: "2px 6px 6px 2px",
              transform: `translateZ(-${D / 2}px) rotateY(180deg)`,
            }}
          />

          {/* Spine */}
          <div
            style={{
              position: "absolute", top: 0, left: 0, width: D, height: H,
              backgroundColor: dark,
              transform: `translateX(-${D / 2}px) rotateY(-90deg)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <p style={{
              color: "rgba(255,255,255,0.55)", fontSize: 8,
              letterSpacing: "0.22em", textTransform: "uppercase",
              writingMode: "vertical-rl", transform: "rotate(180deg)",
              overflow: "hidden", maxHeight: H - 20,
            }}>
              {title}
            </p>
          </div>

          {/* Pages (right edge) */}
          <div
            style={{
              position: "absolute", top: 2, right: 0, width: D, height: H - 4,
              backgroundColor: "var(--bg-card)",
              transform: `translateX(${D / 2}px) rotateY(90deg)`,
              display: "flex", flexDirection: "column",
              justifyContent: "center", gap: 2, padding: "0 4px",
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{ height: 1, backgroundColor: "var(--border)", opacity: 0.6 }} />
            ))}
          </div>

          {/* Top edge */}
          <div
            style={{
              position: "absolute", top: 0, left: 2, right: 2, height: D,
              backgroundColor: "var(--bg-subtle)",
              transform: `translateY(-${D / 2}px) rotateX(90deg)`,
            }}
          />

          {/* Bottom edge */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 2, right: 2, height: D,
              backgroundColor: "var(--bg-subtle)",
              transform: `translateY(${D / 2}px) rotateX(-90deg)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
