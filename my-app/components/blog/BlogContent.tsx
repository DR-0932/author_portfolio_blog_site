"use client";

import ReactMarkdown from "react-markdown";

const styles = {
  article: "mt-10 pb-10 w-full max-w-2xl md:max-w-4xl",

  h1: "text-3xl md:text-4xl font-bold tracking-wide mt-14 mb-5 scroll-mt-24",

  h1Anchor: "group flex items-center gap-2 hover:opacity-80",

  h1Hash: "opacity-0 group-hover:opacity-40 text-xl transition-opacity",

  h2: "text-2xl font-semibold tracking-wide mt-10 mb-4 scroll-mt-24",

  h3: "text-xl font-semibold mt-8 mb-3 scroll-mt-24",

  p: "text-lg md:text-2xl leading-[1.85] mb-5",

  strong: "font-semibold",

  em: "italic",

  ul: "space-y-2 mb-5 ml-5",

  ol: "space-y-2 mb-5 ml-5",

  li: "text-[1.05rem] leading-relaxed",

  blockquote: "pl-5 py-1 my-8 italic text-[1.05rem] leading-relaxed border-l-4",

  hr: "my-10",

  code: "px-1.5 py-0.5 rounded text-sm font-mono",

  pre: "p-5 rounded-xl my-6 overflow-x-auto text-sm font-mono leading-relaxed",
};

function slugify(text: string) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogContent({
  content,
  dark = false,
  accent = "#AE572C",
}: {
  content: string;
  dark?: boolean;
  accent?: string;
}) {
  const text = dark ? "#e8e8e8" : "#1a1a1a";
  const muted = dark ? "#aaa" : "#4b5563";
  const border = dark ? "#2a2a2a" : "#e5e7eb";
  const codeBg = dark ? "#1e1e1e" : "#f3ede4";

  const components = {
    h1: ({ children }: { children?: React.ReactNode }) => {
      const id = slugify(String(children));
      return (
        <h1 id={id} className={styles.h1} style={{ color: text }}>
          <a href={`#${id}`} className={styles.h1Anchor}>
            {children}
            <span className={styles.h1Hash}>#</span>
          </a>
        </h1>
      );
    },
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className={styles.h2} style={{ color: text }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className={styles.h3} style={{ color: text }}>
        {children}
      </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className={styles.p} style={{ color: muted }}>
        {children}
      </p>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className={styles.strong} style={{ color: text }}>
        {children}
      </strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className={styles.em} style={{ color: muted }}>
        {children}
      </em>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className={styles.ul} style={{ color: muted, listStyleType: "disc" }}>
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol
        className={styles.ol}
        style={{ color: muted, listStyleType: "decimal" }}
      >
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className={styles.li}>{children}</li>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        className={styles.blockquote}
        style={{ borderColor: accent, color: muted }}
      >
        {children}
      </blockquote>
    ),
    hr: () => <hr className={styles.hr} style={{ borderColor: border }} />,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code
        className={styles.code}
        style={{ backgroundColor: codeBg, color: accent }}
      >
        {children}
      </code>
    ),
    pre: ({ children }: { children?: React.ReactNode }) => (
      <pre
        className={styles.pre}
        style={{ backgroundColor: codeBg, color: text }}
      >
        {children}
      </pre>
    ),
  };

  return (
    <article className={styles.article}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </article>
  );
}
