"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingBook from "@/components/ui/FloatingBook";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "A storyteller at heart, drawn to the quiet moments and unspoken thoughts.",
  "Over the years, I've worked as a content writer and editor, crafting everything from web articles and brand copy to academic and technical documents, books and e-books. I've learned how to adapt my voice to match the purpose — whether it's explaining a complex topic clearly or telling a story that stirs something in the reader.",
  "Outside of client work, I write fiction and non-fiction both — but my goal remains the same: to make readers feel seen, understood, and stirred.",
  "This portfolio is a curated collection of those whispers, stories, scripts, and musings that speak from the margins and linger in memory.",
];

/* ── Description section ───────────────────────────────────────── */
export default function Description() {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = bodyRef.current?.querySelectorAll<HTMLSpanElement>(".word");
    if (!words || words.length === 0) return;

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    const border = getComputedStyle(document.documentElement).getPropertyValue("--border").trim();

    gsap.fromTo(
      words,
      { color: border || "#e5ddd4" },
      {
        color: accent || "#AE572C",
        stagger: 0.02,
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="page-x py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left — animated text */}
        <div
          ref={bodyRef}
          className="text-xl md:text-2xl lg:text-3xl leading-relaxed space-y-7 font-medium"
          style={{ fontFamily: "var(--font-fjalla)" }}
        >
          {paragraphs.map((para, pi) => (
            <p key={pi}>
              {para.split(" ").map((word, wi) => (
                <span key={wi} className="word" style={{ color: "var(--border)", transition: "color 0.1s" }}>
                  {word}
                  {wi < para.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          ))}
        </div>

        {/* Right — 3D book */}
        <div className="flex items-center justify-center w-full h-full min-h-90">
          <FloatingBook
            color="var(--accent)"
            title="Words & Stories"
            subtitle="Palak Agarwal"
            width={180}
            height={240}
            depth={36}
          />
        </div>

      </div>
    </section>
  );
}
