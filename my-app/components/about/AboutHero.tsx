"use client";

import Image from "next/image";

const stats = [
  { num: "3+",    lbl: "Yrs Exp" },
  { num: "5+",    lbl: "Books" },
  { num: "50+",   lbl: "Projects" },
  { num: "200k+", lbl: "Words" },
];

const tags = ["Book Editing", "Ghost Writing", "Content Writing", "Long-Form", "Fiction", "Academic"];

export default function AboutHero() {
  return (
    <section className="page-x pt-12 md:pt-20 pb-10 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] gap-12 md:gap-16 lg:gap-24 items-start">

        {/* Left */}
        <div className="flex flex-col">

          {/* Label rule */}
          <div className="flex items-center gap-4 mb-8">
            <span
              className="text-[10px] tracking-[0.4em] uppercase font-semibold"
              style={{ color: "var(--accent)" }}
            >
              About
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>

          {/* Heading */}
          <h1
            className="font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "var(--text)" }}
          >
            Writer.<br />
            Ghost&shy;writer.<br />
            <span style={{ color: "var(--accent)" }}>Editor.</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: "var(--muted)" }}
          >
            3+ years turning half-formed ideas into polished, publish-ready work —
            for authors, brands, and anyone with something worth saying.
          </p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Description blocks */}
          <div className="flex flex-col gap-6">
            {[
              {
                label: "Experience",
                body: "Writing professionally since 2021 across content, ghostwriting, and editorial work for clients in India and abroad.",
              },
              {
                label: "Services",
                body: "Ghostwriting · Book editing · Long-form content · Academic writing · Brand voice.",
              },
              {
                label: "Goal",
                body: "To always exceed expectations — transforming rough ideas into work you're proud to put your name on.",
              },
            ].map((b) => (
              <div
                key={b.label}
                className="flex gap-4 pl-4 border-l-2"
                style={{ borderColor: "var(--accent)" }}
              >
                <div>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {b.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {b.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right */}
        <div className="flex flex-col gap-5 max-w-sm mx-auto md:mx-0 w-full">

          {/* Arch photo */}
          <div className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "3/4",
              borderRadius: "50% 50% 16px 16px / 38% 38% 16px 16px",
              backgroundColor: "var(--bg-accent)",
            }}
          >
            <Image
              src="/author.png"
              alt="Palak Agarwal"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Caption */}
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-center"
            style={{ color: "var(--muted)" }}
          >
            Palak Agarwal &nbsp;·&nbsp; Writer since 2021
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-4 rounded-2xl overflow-hidden border"
            style={{ borderColor: "var(--border)" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.num}
                className="flex flex-col items-center py-5"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  className="text-xl font-bold leading-none mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {s.num}
                </span>
                <span
                  className="text-[9px] tracking-widest uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  {s.lbl}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
