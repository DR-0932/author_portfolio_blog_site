"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import FloatingBook from "@/components/ui/FloatingBook";

type Chapter = { title: string; body: string };

type Fiction = {
  _id: string;
  slug: string;
  title: string;
  chapters: Chapter[];
  createdAt: string;
};

function totalWords(chapters: Chapter[]) {
  return chapters.reduce((sum, ch) => {
    const t = ch.body.trim();
    return sum + (t ? t.split(/\s+/).length : 0);
  }, 0);
}

function readingTime(chapters: Chapter[]) {
  return Math.max(1, Math.round(totalWords(chapters) / 200));
}

function excerpt(chapters: Chapter[], len = 180) {
  const body = chapters[0]?.body ?? "";
  const plain = body.replace(/[#*_`>]/g, "").trim();
  return plain.length > len ? plain.slice(0, len).trimEnd() + "…" : plain;
}

const demoFictions: Fiction[] = [
  {
    _id: "1",
    slug: "the-last-letter",
    title: "The Last Letter",
    chapters: [
      {
        title: "The Last Letter",
        body: "She had written a hundred letters in her life, but this one she could not finish. The pen hovered over the paper like a bird afraid to land. Outside, the rain came down in sheets, blurring the street into watercolour. She thought about what it meant to say goodbye to someone who was already gone — not dead, just absent in the way that some people learn to be. The letter began with his name and ended with nothing. That was enough.",
      },
    ],
    createdAt: "2024-11-01T00:00:00Z",
  },
  {
    _id: "2",
    slug: "the-cartographer",
    title: "The Cartographer",
    chapters: [
      {
        title: "The Cartographer",
        body: "He mapped cities that did not exist. Not as a lie, but as a kind of hope. Every night he drew streets and named them after people he had loved. The butcher's lane. The square where she used to read. The long avenue of forget-me-nots. His maps were sold in markets and sometimes people bought them thinking they were real, and then set out to find places that only existed in the careful lines of his grief.",
      },
    ],
    createdAt: "2024-09-14T00:00:00Z",
  },
  {
    _id: "3",
    slug: "something-borrowed",
    title: "Something Borrowed",
    chapters: [
      {
        title: "Something Borrowed",
        body: "The wedding dress had belonged to three women before her — her grandmother, a stranger at a thrift shop, and a woman whose name no one remembered. She stood in front of the mirror and tried to feel something borrowed meant luck. Instead she felt the weight of other vows, other mornings, other hands smoothing down the silk. Marriage, she thought, was always something borrowed. You were never the first person to love someone this much.",
      },
    ],
    createdAt: "2024-07-22T00:00:00Z",
  },
  {
    _id: "4",
    slug: "winter-hours",
    title: "Winter Hours",
    chapters: [
      {
        title: "Winter Hours",
        body: "In January the days were the colour of old photographs. She woke at six, when the sky was still a dark bruise, and made tea. The ritual of it — the kettle, the cup, the exact number of minutes — was the only thing that felt real. Outside the window the city held its breath. She had been living alone for eight months and had learned that silence was not empty. It was full of all the things she had not yet learned to say.",
      },
    ],
    createdAt: "2024-02-08T00:00:00Z",
  },
];

const bookColors = ["#7c91c7", "#b07070", "#6aab8a", "#9b7cbc", "#a09a5a"];

export default function FictionListClient({
  fictions: raw,
}: {
  fictions: Fiction[];
}) {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const fictions = raw.length > 0 ? raw : demoFictions;

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="page-x pt-24 pb-40">

        {/* ── Hero ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-6 pb-10"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h1
            className="leading-none"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(4rem, 10vw, 7rem)",
            }}
          >
            Fiction
          </h1>
          <p
            className="text-sm leading-relaxed max-w-xs sm:text-right pb-1 px-4 py-3 rounded-xl"
            style={{
              color: "var(--text)",
              backgroundColor: "color-mix(in srgb, var(--bg-card) 70%, transparent)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            Stories written in the margins of everything else — some borrowed
            from real life, most invented whole cloth, all of them true in some way.
          </p>
        </div>

        {/* ── List ── */}
        {fictions.length === 0 ? (
          <p className="py-32 text-center text-sm" style={{ color: "var(--muted)" }}>
            No fiction published yet.
          </p>
        ) : (
          <div className="flex flex-col max-w-3xl mx-auto">
            {fictions.map((f, i) => (
              <div
                key={f._id}
                onClick={() => router.push(`/fiction/${f.slug}`)}
                className="group flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 md:gap-16 py-8 sm:py-12 cursor-pointer"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                {/* Left — 3D book */}
                <div className="shrink-0 transition-transform duration-500 group-hover:-translate-y-2 scale-90 sm:scale-100 origin-top">
                  <FloatingBook
                    color={bookColors[i % bookColors.length]}
                    title={f.title}
                    subtitle="Palak Agarwal"
                    width={160}
                    height={220}
                    depth={32}
                  />
                </div>

                {/* Right — info */}
                <div
                  className="flex flex-col justify-center gap-3 sm:gap-4 sm:pt-2 text-center sm:text-left rounded-2xl px-4 sm:px-6 py-4 sm:py-5 w-full"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--bg-card) 70%, transparent)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  {/* Index + genre pill */}
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <span
                      className="text-xs font-mono tracking-widest"
                      style={{ color: "var(--muted)", opacity: 0.5 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        color: bookColors[i % bookColors.length],
                        backgroundColor: `${bookColors[i % bookColors.length]}18`,
                        border: `1px solid ${bookColors[i % bookColors.length]}40`,
                      }}
                    >
                      Fiction
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="leading-tight font-bold"
                    style={{ fontSize: "clamp(1.4rem, 5vw, 2.8rem)" }}
                  >
                    {f.title}
                  </h2>

                  {/* Stats row */}
                  <div
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium justify-center sm:justify-start"
                    style={{ color: "var(--text)", opacity: 0.6 }}
                  >
                    <span>{readingTime(f.chapters)} min read</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{totalWords(f.chapters).toLocaleString()} words</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{new Date(f.createdAt).getFullYear()}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: "var(--text)", opacity: 0.75 }}>
                    {excerpt(f.chapters)}
                  </p>

                  {/* CTA */}
                  <span
                    className="text-xs tracking-widest uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-center sm:self-start"
                    style={{ color: "var(--accent)" }}
                  >
                    Read story →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
