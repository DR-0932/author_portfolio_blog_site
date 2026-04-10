"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useDarkMode } from "@/context/DarkModeContext";

type Chapter = { title: string; body: string };

type Fiction = {
  title: string;
  slug: string;
  chapters: Chapter[];
  createdAt: string;
};

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function readingTime(text: string) {
  return Math.max(1, Math.round(wordCount(text) / 200));
}

function renderBody(body: string, dark: boolean) {
  const textColor   = dark ? "#c8c3bc" : "#2c2825";
  const mutedColor  = dark ? "#666"    : "#78716c";
  const accentColor = dark ? "#ec4899" : "#AE572C";

  return body.split("\n").filter(Boolean).map((line, i) => {
    if (line.startsWith("## "))
      return (
        <h3 key={i} className="text-lg font-semibold mt-10 mb-3 tracking-tight" style={{ color: dark ? "#e0ddd8" : "#1a1a1a" }}>
          {line.slice(3)}
        </h3>
      );
    if (line.startsWith("> "))
      return (
        <blockquote key={i} className="border-l-2 pl-6 my-8 italic text-base leading-loose" style={{ borderColor: accentColor, color: mutedColor }}>
          {line.slice(2)}
        </blockquote>
      );
    return (
      <p key={i} className="text-base leading-loose mb-5" style={{ color: textColor }}>
        {line}
      </p>
    );
  });
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}


export default function FictionPostClient({ fiction }: { fiction: Fiction }) {
  const { dark } = useDarkMode();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = fiction.chapters.length > 0 ? fiction.chapters : [{ title: fiction.title, body: "" }];

  const goBack = useCallback(() => {
    gsap.to(pageRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => router.push("/fiction"),
    });
  }, [router]);

  const pageBg       = dark ? "#080808"  : "#f7f3ee";
  const sidebarBg    = dark ? "#0f0f0f"  : "#eee8df";
  const sidebarBorder = dark ? "#1e1e1e" : "#ddd4c6";
  const pageText     = dark ? "#e0ddd8"  : "#1a1a1a";
  const muted        = dark ? "#555"     : "#78716c";
  const accent       = dark ? "#ec4899"  : "#AE572C";
  const activeBg     = dark ? "#1e1e1e"  : "#fff";
  const activeBorder = dark ? "#2e2e2e"  : "#d6cbbf";
  const readerBg     = dark ? "#0d0d0d"  : "#faf8f5";
  const readerBorder = dark ? "#1a1a1a"  : "#e8dfd4";

  const current = chapters[activeChapter];
  const totalWords = chapters.reduce((sum, ch) => sum + wordCount(ch.body), 0);

  return (
    <div ref={pageRef} className="flex min-h-screen transition-colors duration-500" style={{ backgroundColor: pageBg, color: pageText }}>

      {/* Sidebar */}
      <aside
        className="w-72 shrink-0 border-r flex flex-col sticky top-0 h-screen overflow-y-auto"
        style={{ backgroundColor: sidebarBg, borderColor: sidebarBorder }}
      >
        {/* Back */}
        <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: sidebarBorder }}>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity mb-5"
            style={{ color: muted }}
          >
            ← Library
          </button>
          <div className="flex items-center gap-2 mb-3" style={{ color: accent }}>
            <BookIcon />
            <span className="text-xs tracking-widest uppercase font-medium">Fiction</span>
          </div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight">{fiction.title}</h2>
        </div>

        {/* Chapter list */}
        <div className="flex-1 px-4 py-5">
          <p className="text-xs tracking-[0.25em] uppercase mb-4 px-2" style={{ color: muted }}>
            {chapters.length > 1 ? "Chapters" : "Content"}
          </p>
          <div className="flex flex-col gap-1">
            {chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => setActiveChapter(i)}
                className="text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 border"
                style={{
                  backgroundColor: activeChapter === i ? activeBg : "transparent",
                  borderColor: activeChapter === i ? activeBorder : "transparent",
                  color: activeChapter === i ? pageText : muted,
                  fontWeight: activeChapter === i ? 500 : 400,
                }}
              >
                <span className="block truncate">{ch.title || `Part ${i + 1}`}</span>
                <span className="text-xs mt-0.5 block" style={{ color: activeChapter === i ? accent : muted }}>
                  {wordCount(ch.body)} words
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <div className="px-6 py-5 border-t text-xs" style={{ borderColor: sidebarBorder, color: muted }}>
          <p>{chapters.length} {chapters.length === 1 ? "chapter" : "chapters"}</p>
          <p>{totalWords.toLocaleString()} total words · {readingTime(chapters.map(c => c.body).join(" "))} min read</p>
        </div>
      </aside>

      {/* Reader */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-20">

          {/* Chapter header */}
          <div className="mb-12 pb-10 border-b" style={{ borderColor: readerBorder }}>
            <span className="text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: accent }}>
              {chapters.length > 1
                ? `Chapter ${activeChapter + 1} of ${chapters.length}`
                : new Date(fiction.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <h1 className="[font-family:var(--font-fjalla)] text-3xl md:text-5xl leading-tight tracking-tight mb-4">
              {current.title || fiction.title}
            </h1>
            <p className="text-xs tracking-widest uppercase" style={{ color: muted }}>
              {wordCount(current.body)} words · {Math.max(1, Math.round(wordCount(current.body) / 200))} min read
            </p>
          </div>

          {/* Body */}
          <article className="rounded-2xl p-8 md:p-12 border" style={{ backgroundColor: readerBg, borderColor: readerBorder }}>
            {current.body ? renderBody(current.body, dark) : (
              <p className="text-base leading-loose" style={{ color: muted }}>No content yet.</p>
            )}
          </article>

          {/* Prev / Next */}
          {chapters.length > 1 && (
            <div className="flex justify-between mt-12 pt-10 border-t" style={{ borderColor: readerBorder }}>
              <button
                onClick={() => setActiveChapter((s) => Math.max(0, s - 1))}
                disabled={activeChapter === 0}
                className="text-sm tracking-widest uppercase transition-opacity disabled:opacity-20 hover:opacity-60"
                style={{ color: muted }}
              >
                ← Prev
              </button>
              <button
                onClick={() => setActiveChapter((s) => Math.min(chapters.length - 1, s + 1))}
                disabled={activeChapter === chapters.length - 1}
                className="text-sm tracking-widest uppercase transition-opacity disabled:opacity-20 hover:opacity-60"
                style={{ color: muted }}
              >
                Next →
              </button>
            </div>
          )}

          {/* End of piece */}
          {(chapters.length === 1 || activeChapter === chapters.length - 1) && (
            <div className="mt-16 pt-10 border-t text-center" style={{ borderColor: readerBorder }}>
              <p className="text-sm mb-6" style={{ color: muted }}>— End —</p>
              <button
                onClick={goBack}
                className="text-xs tracking-[0.3em] uppercase hover:opacity-60 transition-opacity"
                style={{ color: accent }}
              >
                ← Back to Library
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
