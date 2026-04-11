"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";
import { socials } from "@/components/home/HeroSection/SocialMediaLinks";

const styles = {
  label: "text-xs tracking-[0.35em] uppercase font-semibold mb-5",
  title: "font-semibold leading-tight tracking-tight max-w-6xl",
  subtitle: "mt-5 text-sm md:text-base tracking-[0.18em] uppercase font-medium",
  divider: "my-7 md:my-9 h-px w-full",
  bottomRow: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6",
  stats: "flex items-center gap-6 md:gap-10",
  statBlock: "flex flex-col",
  statNum: "text-xl md:text-3xl font-bold leading-none",
  statLbl: "text-[10px] md:text-xs tracking-widest uppercase mt-1",
  statDiv: "w-px h-6 md:h-8",
  socialsRow: "flex items-center gap-4",
  socialLink: "flex items-center justify-center w-8 h-8 rounded-full border transition-opacity hover:opacity-50",
};

export default function Title() {
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  const { loaded } = useLoading();

  useEffect(() => {
    if (!loaded) return;
    gsap.to(
      [labelRef.current, titleRef.current, subtitleRef.current, dividerRef.current, bottomRef.current],
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.35 },
    );
  }, [loaded]);

  return (
    <>
      <p
        ref={labelRef}
        className={styles.label}
        style={{ color: "var(--accent)", opacity: 0, transform: "translateY(16px)" }}
      >
        Freelance Writing
      </p>

      <h1
        ref={titleRef}
        className={styles.title}
        style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "var(--text)", opacity: 0, transform: "translateY(50px)" }}
      >
        Helping authors <br /> &amp; professionals turn rough ideas into{" "}
        <span style={{ color: "var(--accent)" }}>polished, publish-ready work</span>
      </h1>

      <p
        ref={subtitleRef}
        className={styles.subtitle}
        style={{ color: "var(--muted)", opacity: 0, transform: "translateY(24px)" }}
      >
        Book Editor &nbsp;·&nbsp; Ghost Writer &nbsp;·&nbsp; Content Writer
      </p>

      <div
        ref={dividerRef}
        className={styles.divider}
        style={{ backgroundColor: "var(--border)", opacity: 0 }}
      />

      <div
        ref={bottomRef}
        className={styles.bottomRow}
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        <div className={styles.stats}>
          {[
            { num: "3+", lbl: "Yrs experience" },
            { num: "5+", lbl: "Books written" },
            { num: "50+", lbl: "Projects" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-6 md:gap-10">
              <div className={styles.statBlock}>
                <span className={styles.statNum} style={{ color: "var(--accent)" }}>{s.num}</span>
                <span className={styles.statLbl} style={{ color: "var(--muted)" }}>{s.lbl}</span>
              </div>
              {i < 2 && <div className={styles.statDiv} style={{ backgroundColor: "var(--border)" }} />}
            </div>
          ))}
        </div>

        <div className={styles.socialsRow}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
