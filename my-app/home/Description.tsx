"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  " A storyteller at heart, drawn to the quiet moments and unspoken thoughts",
  "Over the years, I've worked as a content writer and editor, crafting everything from web articles and brand copy to academic and technical documents, books and e-books. I've learned how to adapt my voice to match the purpose, whether it's explaining a complex topic clearly or telling a story that stirs something in the reader.",
  "Outside of client work, I write fiction and non-fiction both but my goal remains the same: to make readers feel seen, understood, and stirred.",
  "This portfolio is a curated collection of those whispers, stories, scripts, and musings that speak from the margins and linger in memory.",
];

const styles = {
  wrapper: " px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64  py-24 ",

  container:
    "flex flex-col md:flex-row gap-8 md:gap-24 w-md md:w-2xl lg:w-5xl ",

  label: "text-xs font-semibold tracking-[0.3em] uppercase text-stone-500 mb-6",

  body: "md:w-2/3 text-base md:text-4xl leading-relaxed space-y-6 tracking- [font-family:var(--font-fjalla)]",
};

export default function Description() {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = bodyRef.current?.querySelectorAll<HTMLSpanElement>(".word");
    if (!words || words.length === 0) return;

    gsap.fromTo(
      words,
      { color: "#ffffff" },
      {
        color: "#AE572C",
        stagger: 0.02,
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div ref={bodyRef} className={styles.body}>
          {paragraphs.map((para, pi) => (
            <p key={pi}>
              {para.split(" ").map((word, wi) => (
                <span key={wi} className="word" style={{ color: "#ffffff" }}>
                  {word}
                  {wi < para.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
