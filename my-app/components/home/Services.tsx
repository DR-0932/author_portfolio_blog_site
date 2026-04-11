"use client";

const services = [
  {
    number: "01",
    label: "Content Writing",
    headline: "Words that make people stop scrolling.",
    story:
      "Most content disappears. It gets skimmed, skipped, and forgotten. The kind of writing that works doesn't just inform — it pulls the reader in and holds them there. That's the standard I write to. Whether it's a blog post, a brand article, or a long-form deep-dive, every piece I deliver is researched, structured, and written to be read all the way through.",
    features: [
      {
        title: "Blog & Articles",
        desc: "Long-form, SEO-aware writing that builds authority",
      },
      {
        title: "Brand Copy",
        desc: "Web pages, landing pages, and product descriptions",
      },
      {
        title: "Technical Writing",
        desc: "Complex ideas made clear and accessible",
      },
      {
        title: "Academic Content",
        desc: "Research-driven, citation-ready work",
      },
    ],
    pull: "I don't just fill pages. I build arguments.",
    align: "left" as const,
  },
  {
    number: "02",
    label: "Ghost Writing",
    headline: "Your story. Your voice. My craft.",
    story:
      "Some of the most important things you've ever wanted to say are still sitting in your head, waiting. Ghost writing isn't about handing your voice to someone else — it's about finding a writer who disappears so completely into your world that readers never notice the seam. I've written in voices that aren't mine, for people who had something real to say and needed the words to match.",
    features: [
      {
        title: "Thought Leadership",
        desc: "Articles and essays published under your name",
      },
      {
        title: "Memoirs & Personal Essays",
        desc: "Life stories told with honesty and craft",
      },
      {
        title: "Books & E-books",
        desc: "Full manuscript ghost writing from outline to draft",
      },
      {
        title: "Speeches & Scripts",
        desc: "Words written to be spoken, not just read",
      },
    ],
    pull: "Your name on it. My full attention behind it.",
    align: "right" as const,
  },
  {
    number: "03",
    label: "Book Editing",
    headline: "The manuscript you wrote deserves the book it could be.",
    story:
      "A great editor doesn't rewrite your book — they read it more carefully than you ever could, and show you where it isn't yet what you meant it to be. I approach every manuscript with patience and precision. The story is yours. My job is to make sure it lands the way you intended: every chapter tight, every character true, every sentence worth keeping.",
    features: [
      {
        title: "Developmental Editing",
        desc: "Big-picture structure, pacing, and narrative arc",
      },
      {
        title: "Line Editing",
        desc: "Sentence-level clarity, rhythm, and voice consistency",
      },
      {
        title: "Proofreading",
        desc: "Final-pass grammar, punctuation, and formatting",
      },
      {
        title: "Manuscript Assessment",
        desc: "Honest, detailed feedback on your full draft",
      },
    ],
    pull: "I treat your manuscript like it matters. Because it does.",
    align: "left" as const,
  },
];

export default function Services() {
  return (
    <div>
      {services.map((s) => (
        <section
          key={s.number}
          className="page-x py-10 md:py-16 lg:py-24"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          {/* Section heading */}
          <div className="flex items-center justify-between mb-12 md:mb-20">
            <h2
              className="font-bold leading-none tracking-tight"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: "var(--accent)",
              }}
            >
              {s.label}
            </h2>
            <span
              className="text-xs tracking-[0.35em] uppercase font-semibold px-4 py-2 rounded-full border"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              {s.number}
            </span>
          </div>

          {/* Main grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start ${
              s.align === "right" ? "md:[direction:rtl]" : ""
            }`}
          >
            {/* Headline side */}
            <div className={s.align === "right" ? "md:[direction:ltr]" : ""}>
              <h3
                className="font-bold leading-tight tracking-tight mb-8"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  color: "var(--text)",
                }}
              >
                {s.headline}
              </h3>

              <div
                className="border-l-2 pl-5 py-1"
                style={{ borderColor: "var(--accent)" }}
              >
                <p
                  className="text-base md:text-lg font-medium italic leading-relaxed"
                  style={{ color: "var(--accent)" }}
                >
                  &ldquo;{s.pull}&rdquo;
                </p>
              </div>
            </div>

            {/* Story + features side */}
            <div className={s.align === "right" ? "md:[direction:ltr]" : ""}>
              <p
                className="text-base md:text-lg leading-relaxed mb-10"
                style={{ color: "var(--muted)" }}
              >
                {s.story}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {s.features.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl p-5 hover:scale-[1.03] transition-transform duration-300"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <p
                      className="text-xs tracking-widest uppercase font-semibold mb-1.5"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {f.title}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#ffffff" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div
            className="mt-16 md:mt-24 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, var(--accent), transparent)",
            }}
          />
        </section>
      ))}

      {/* CTA banner */}
      {/* <section className="page-x py-20 md:py-28">
        <div
          className="rounded-2xl px-8 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ backgroundColor: "var(--bg-accent)", border: "1px solid var(--border)" }}
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "var(--accent)" }}>
              Ready to start?
            </p>
            <h3
              className="font-bold leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--text)" }}
            >
              Let&apos;s turn your idea<br />into something real.
            </h3>
          </div>
          <a
            href="/contact"
            className="shrink-0 px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:opacity-90 transition"
            style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
          >
            Get In Touch
          </a>
        </div>
      </section> */}
    </div>
  );
}
