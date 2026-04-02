"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useDarkMode } from "@/context/DarkModeContext";

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

function excerpt(chapters: Chapter[], len = 90) {
  const body = chapters[0]?.body ?? "";
  const plain = body.replace(/[#*_`>]/g, "").trim();
  return plain.length > len ? plain.slice(0, len).trimEnd() + "…" : plain;
}

const demoFictions: Fiction[] = [
  {
    _id: "1",
    slug: "the-last-letter",
    title: "The Last Letter",
    chapters: [{ title: "The Last Letter", body: "She had written a hundred letters in her life, but this one she could not finish. The pen hovered over the paper like a bird afraid to land. Outside, the rain came down in sheets, blurring the street into watercolour. She thought about what it meant to say goodbye to someone who was already gone — not dead, just absent in the way that some people learn to be. The letter began with his name and ended with nothing. That was enough." }],
    createdAt: "2024-11-01T00:00:00Z",
  },
  {
    _id: "2",
    slug: "the-cartographer",
    title: "The Cartographer",
    chapters: [{ title: "The Cartographer", body: "He mapped cities that did not exist. Not as a lie, but as a kind of hope. Every night he drew streets and named them after people he had loved. The butcher's lane. The square where she used to read. The long avenue of forget-me-nots. His maps were sold in markets and sometimes people bought them thinking they were real, and then set out to find places that only existed in the careful lines of his grief." }],
    createdAt: "2024-09-14T00:00:00Z",
  },
  {
    _id: "3",
    slug: "something-borrowed",
    title: "Something Borrowed",
    chapters: [{ title: "Something Borrowed", body: "The wedding dress had belonged to three women before her — her grandmother, a stranger at a thrift shop, and a woman whose name no one remembered. She stood in front of the mirror and tried to feel something borrowed meant luck. Instead she felt the weight of other vows, other mornings, other hands smoothing down the silk. Marriage, she thought, was always something borrowed. You were never the first person to love someone this much." }],
    createdAt: "2024-07-22T00:00:00Z",
  },
  {
    _id: "4",
    slug: "winter-hours",
    title: "Winter Hours",
    chapters: [{ title: "Winter Hours", body: "In January the days were the colour of old photographs. She woke at six, when the sky was still a dark bruise, and made tea. The ritual of it — the kettle, the cup, the exact number of minutes — was the only thing that felt real. Outside the window the city held its breath. She had been living alone for eight months and had learned that silence was not empty. It was full of all the things she had not yet learned to say." }],
    createdAt: "2024-02-08T00:00:00Z",
  },
];

const cardPalette = [
  { bg: "#1e2433", border: "#2e3650", label: "#7c91c7" },
  { bg: "#251a1a", border: "#3d2a2a", label: "#b07070" },
  { bg: "#1a2420", border: "#2a3d35", label: "#6aab8a" },
  { bg: "#221a2c", border: "#382a4a", label: "#9b7cbc" },
  { bg: "#1e1e18", border: "#363620", label: "#a09a5a" },
];

const styles = {
  wrapper:    "min-h-screen transition-colors duration-500",
  inner:      "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 pt-24 pb-40",
  hero:       "mb-16",
  eyebrow:    "text-xs tracking-[0.35em] uppercase mb-4 block",
  heading:    "[font-family:var(--font-script)] text-6xl md:text-8xl leading-none mb-5",
  subtext:    "text-sm leading-relaxed max-w-md",
  grid:       "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  card:       "group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1",
  cardInner:  "p-7 flex flex-col h-72 justify-between",
  cardTop:    "flex-1",
  cardIcon:   "mb-6 opacity-40",
  cardTitle:  "text-xl font-semibold text-white leading-snug mb-2 tracking-tight",
  cardExcerpt:"text-sm leading-relaxed opacity-50 text-white line-clamp-2",
  cardBottom: "pt-4 border-t border-white/10 flex items-center justify-between",
  cardMeta:   "text-xs tracking-widest text-white/40",
  cardDate:   "text-xs tracking-widest",
  empty:      "py-32 text-center text-sm",
};

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

export default function FictionListClient({ fictions: raw }: { fictions: Fiction[] }) {
  const { dark } = useDarkMode();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const fictions = raw.length > 0 ? raw : demoFictions;

  function navigate(slug: string) {
    gsap.to(pageRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => router.push(`/fiction/${slug}`),
    });
  }

  const pageBg    = dark ? "#080808" : "#f7f3ee";
  const pageText  = dark ? "#e0ddd8" : "#1a1a1a";
  const muted     = dark ? "#555"    : "#78716c";
  const accent    = dark ? "#ec4899" : "#AE572C";

  return (
    <div ref={pageRef} className={styles.wrapper} style={{ backgroundColor: pageBg, color: pageText }}>
      <div className={styles.inner}>

        {/* Hero */}
        <div className={styles.hero}>
          <span className={styles.eyebrow} style={{ color: accent }}>
            {fictions.length} {fictions.length === 1 ? "piece" : "pieces"} · Palak Agarwal
          </span>
          <h1 className={styles.heading}>Fiction</h1>
          <p className={styles.subtext} style={{ color: muted }}>
            Stories written in the margins of everything else — some borrowed from real life,
            most invented whole cloth, all of them true in some way.
          </p>
        </div>

        {/* Cards */}
        {fictions.length === 0 ? (
          <p className={styles.empty} style={{ color: muted }}>No fiction published yet.</p>
        ) : (
          <div className={styles.grid}>
            {fictions.map((f, i) => {
              const palette = cardPalette[i % cardPalette.length];
              return (
                <div key={f._id} onClick={() => navigate(f.slug)} className={styles.card}>
                  <div
                    className={styles.cardInner}
                    style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.cardIcon}><BookIcon /></div>
                      <h2 className={styles.cardTitle}>{f.title}</h2>
                      <p className={styles.cardExcerpt}>{excerpt(f.chapters)}</p>
                    </div>

                    <div className={styles.cardBottom}>
                      <span className={styles.cardMeta}>
                        {totalWords(f.chapters).toLocaleString()} words · {readingTime(f.chapters)} min
                      </span>
                      <span className={styles.cardDate} style={{ color: palette.label }}>
                        {new Date(f.createdAt).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
