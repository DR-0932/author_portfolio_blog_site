"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

function renderBody(body: string) {
  return body.split("\n").filter(Boolean).map((line, i) => {
    if (line.startsWith("## "))
      return (
        <h3 key={i} className="text-lg font-semibold mt-10 mb-3 tracking-tight" style={{ color: "var(--text)" }}>
          {line.slice(3)}
        </h3>
      );
    if (line.startsWith("> "))
      return (
        <blockquote key={i} className="border-l-2 pl-6 my-8 italic text-base leading-loose" style={{ borderColor: "var(--accent)", color: "var(--muted)" }}>
          {line.slice(2)}
        </blockquote>
      );
    return (
      <p key={i} className="text-base leading-loose mb-5" style={{ color: "var(--text)" }}>
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

function ChaptersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function FictionPostClient({ fiction }: { fiction: Fiction }) {
  const router = useRouter();
  const [activeChapter, setActiveChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chapters = fiction.chapters.length > 0 ? fiction.chapters : [{ title: fiction.title, body: "" }];
  const current = chapters[activeChapter];
  const totalWordCount = chapters.reduce((sum, ch) => sum + wordCount(ch.body), 0);

  const chapterList = (onSelect: (i: number) => void) => (
    <div className="flex flex-col gap-1">
      {chapters.map((ch, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 border"
          style={{
            backgroundColor: activeChapter === i ? "var(--bg-card)" : "transparent",
            borderColor: activeChapter === i ? "var(--border)" : "transparent",
            color: activeChapter === i ? "var(--text)" : "var(--muted)",
            fontWeight: activeChapter === i ? 500 : 400,
          }}
        >
          <span className="block truncate">{ch.title || `Part ${i + 1}`}</span>
          <span className="text-xs mt-0.5 block" style={{ color: activeChapter === i ? "var(--accent)" : "var(--muted)" }}>
            {wordCount(ch.body)} words
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen transition-colors duration-500" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>

      {/* ── Mobile top bar ── */}
      <div
        className="md:hidden fixed top-16 left-0 right-0 z-30 flex items-center justify-between px-5 py-3 border-b"
        style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
      >
        <button
          onClick={() => router.push("/fiction")}
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--muted)" }}
        >
          ← Library
        </button>
        <span className="text-sm font-semibold truncate max-w-45">{fiction.title}</span>
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="flex items-center gap-1.5 text-xs tracking-widest uppercase font-medium"
          style={{ color: "var(--accent)" }}
        >
          {sidebarOpen ? <CloseIcon /> : <ChaptersIcon />}
          {sidebarOpen ? "Close" : "Chapters"}
        </button>
      </div>

      {/* ── Mobile full-screen sidebar ── */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col overflow-y-auto"
          style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text)", paddingTop: "8rem" }}
        >
          <div className="flex items-center justify-between px-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
            <div>
              <div className="flex items-center gap-2 mb-1" style={{ color: "var(--accent)" }}>
                <BookIcon />
                <span className="text-xs tracking-widest uppercase font-medium">Fiction</span>
              </div>
              <h2 className="text-lg font-semibold leading-snug tracking-tight">{fiction.title}</h2>
            </div>
            <button onClick={() => setSidebarOpen(false)} style={{ color: "var(--muted)" }}>
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 px-4 py-5">
            <p className="text-xs tracking-[0.25em] uppercase mb-4 px-2" style={{ color: "var(--muted)" }}>
              {chapters.length > 1 ? "Chapters" : "Content"}
            </p>
            {chapterList((i) => { setActiveChapter(i); setSidebarOpen(false); })}
          </div>

          <div className="px-6 py-5 border-t text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            <p>{chapters.length} {chapters.length === 1 ? "chapter" : "chapters"}</p>
            <p>{totalWordCount.toLocaleString()} total words · {readingTime(chapters.map(c => c.body).join(" "))} min read</p>
          </div>
        </div>
      )}

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden md:flex w-72 shrink-0 border-r flex-col sticky top-0 h-screen overflow-y-auto"
        style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
      >
        <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => router.push("/fiction")}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity mb-5"
            style={{ color: "var(--muted)" }}
          >
            ← Library
          </button>
          <div className="flex items-center gap-2 mb-3" style={{ color: "var(--accent)" }}>
            <BookIcon />
            <span className="text-xs tracking-widest uppercase font-medium">Fiction</span>
          </div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight">{fiction.title}</h2>
        </div>

        <div className="flex-1 px-4 py-5">
          <p className="text-xs tracking-[0.25em] uppercase mb-4 px-2" style={{ color: "var(--muted)" }}>
            {chapters.length > 1 ? "Chapters" : "Content"}
          </p>
          {chapterList(setActiveChapter)}
        </div>

        <div className="px-6 py-5 border-t text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          <p>{chapters.length} {chapters.length === 1 ? "chapter" : "chapters"}</p>
          <p>{totalWordCount.toLocaleString()} total words · {readingTime(chapters.map(c => c.body).join(" "))} min read</p>
        </div>
      </aside>

      {/* ── Reader ── */}
      <main className="flex-1 overflow-y-auto mt-12 md:mt-0">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

          <div className="mb-12 pb-10 border-b" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs tracking-[0.3em] uppercase block mb-4" style={{ color: "var(--accent)" }}>
              {chapters.length > 1
                ? `Chapter ${activeChapter + 1} of ${chapters.length}`
                : new Date(fiction.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <h1 className="[font-family:var(--font-fjalla)] text-3xl md:text-5xl leading-tight tracking-tight mb-4">
              {current.title || fiction.title}
            </h1>
            <p className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              {wordCount(current.body)} words · {Math.max(1, Math.round(wordCount(current.body) / 200))} min read
            </p>
          </div>

          <article className="rounded-2xl p-8 md:p-12 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
            {current.body ? renderBody(current.body) : (
              <p className="text-base leading-loose" style={{ color: "var(--muted)" }}>No content yet.</p>
            )}
          </article>

          {chapters.length > 1 && (
            <div className="flex justify-between mt-12 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={() => setActiveChapter((s) => Math.max(0, s - 1))}
                disabled={activeChapter === 0}
                className="text-sm tracking-widest uppercase transition-opacity disabled:opacity-20 hover:opacity-60"
                style={{ color: "var(--muted)" }}
              >
                ← Prev
              </button>
              <button
                onClick={() => setActiveChapter((s) => Math.min(chapters.length - 1, s + 1))}
                disabled={activeChapter === chapters.length - 1}
                className="text-sm tracking-widest uppercase transition-opacity disabled:opacity-20 hover:opacity-60"
                style={{ color: "var(--muted)" }}
              >
                Next →
              </button>
            </div>
          )}

          {(chapters.length === 1 || activeChapter === chapters.length - 1) && (
            <div className="mt-16 pt-10 border-t text-center" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>— End —</p>
              <button
                onClick={() => router.push("/fiction")}
                className="text-xs tracking-[0.3em] uppercase hover:opacity-60 transition-opacity"
                style={{ color: "var(--accent)" }}
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
