"use client";
import { useEffect, useRef, useState } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
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

  body: "pb-32 page-x",

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
      style={{ color: "var(--text)" }}
    >
      {/* Reading progress bar */}
      <div
        className={styles.progressTrack}
        style={{ backgroundColor: "var(--border)" }}
      >
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%`, backgroundColor: "var(--accent)" }}
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
        accent="var(--accent)"
      />

      {/* Content + TOC */}
      <div ref={articleRef} className={styles.body}>
        <div className={styles.bodyInner}>
          {/* Sticky TOC — left side */}
          {headings.length > 0 && (
            <aside className={styles.toc}>
              <div
                className={styles.tocCard}
                style={{ backgroundColor: "var(--bg-accent)" }}
              >
                <p className={styles.tocLabel} style={{ color: "var(--muted)" }}>
                  On this page
                </p>
                <ul className={styles.tocList}>
                  {headings.map(({ id, text: heading }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={styles.tocLink}
                        style={{
                          color: activeId === id ? "var(--accent)" : "var(--muted)",
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
            <BlogContent content={blog.content} dark={dark} accent="var(--accent)" />
          </div>
        </div>
      </div>
    </div>
  );
}
