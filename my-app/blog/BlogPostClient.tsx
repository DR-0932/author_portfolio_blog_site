"use client";
import { useEffect, useRef, useState } from "react";
import BlogHeader from "@/blog/BlogHeader";
import BlogContent from "@/blog/BlogContent";
import { useDarkMode } from "@/context/DarkModeContext";

type Heading = { id: string; text: string };

type Blog = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
};

const styles = {
  wrapper: "min-h-screen transition-colors duration-500",

  progressTrack: "fixed top-0 left-0 right-0 h-[2px] z-[9997]",

  progressBar: "h-full transition-all duration-100",

  body: "pb-32 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64",

  bodyInner: "flex gap-16 items-start",

  toc: "hidden lg:block w-56 shrink-0 sticky top-24 pt-10",

  tocCard: "rounded-xl p-5",

  tocLabel: "text-lg tracking-[0.2em] uppercase mb-4 font-semibold",

  tocList: "space-y-2.5",

  tocLink: "text-md leading-snug transition-colors duration-200 block",

  content: "flex-1 min-w-0 max-w-2xl",
};

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

function DarkToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const accent = dark ? "#ec4899" : "#AE572C";
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors duration-300"
      style={{ borderColor: accent, color: accent }}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0-5a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM4.22 5.64a1 1 0 0 1 1.42-1.42l1.41 1.42a1 1 0 0 1-1.41 1.41L4.22 5.64zm12.72 12.72a1 1 0 0 1 1.41-1.41l1.42 1.41a1 1 0 1 1-1.42 1.42l-1.41-1.42zM2 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm17 0a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1zM5.64 19.78a1 1 0 0 1-1.42-1.42l1.42-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.42zM18.36 6.36a1 1 0 0 1-1.41-1.41l1.41-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.41z" />
        </svg>
      )}
      {dark ? "Light" : "Dark"}
    </button>
  );
}

export default function BlogPostClient({
  blog,
  headings,
}: {
  blog: Blog;
  headings: Heading[];
}) {
  const { dark } = useDarkMode();
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("");
  const articleRef = useRef<HTMLDivElement>(null);

  const accent = dark ? "#ec4899" : "#AE572C";
  const text = dark ? "#f0f0f0" : "#111111";
  const muted = dark ? "#ec4899" : "#6b7280";
  const tocLabel = dark ? "#ec489980" : "#6b7280";
  const tocBg = dark ? "#161616" : "#f0e6d3";
  const mins = readingTime(blog.content);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      const pct = Math.min(
        100,
        (scrolled / (height - window.innerHeight)) * 100,
      );
      setProgress(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active TOC heading via IntersectionObserver
  useEffect(() => {
    if (!headings.length) return;
    const observers: IntersectionObserver[] = [];
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: dark ? "#0f0f0f" : "transparent", color: text }}
    >
      {/* Reading progress bar */}
      <div
        className={styles.progressTrack}
        style={{ backgroundColor: dark ? "#222" : "#e5d9cb" }}
      >
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%`, backgroundColor: accent }}
        />
      </div>

      {/* Header */}
      <BlogHeader
        title={blog.title}
        excerpt={blog.excerpt}
        category={blog.category}
        author="Palak Agarwal"
        date={new Date(blog.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        coverImage={blog.image}
        dark={dark}
        readingTime={mins}
        accent={accent}
      />

      {/* Content + TOC */}
      <div ref={articleRef} className={styles.body}>
        <div className={styles.bodyInner}>
          {/* Sticky TOC — left side */}
          {headings.length > 0 && (
            <aside className={styles.toc}>
              <div
                className={styles.tocCard}
                style={{ backgroundColor: tocBg }}
              >
                <p className={styles.tocLabel} style={{ color: tocLabel }}>
                  On this page
                </p>
                <ul className={styles.tocList}>
                  {headings.map(({ id, text: heading }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={styles.tocLink}
                        style={{
                          color: activeId === id ? accent : muted,
                          fontWeight: activeId === id ? 600 : 400,
                        }}
                      >
                        {heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Blog content */}
          <div className={styles.content}>
            <BlogContent content={blog.content} dark={dark} accent={accent} />
          </div>
        </div>
      </div>
    </div>
  );
}
