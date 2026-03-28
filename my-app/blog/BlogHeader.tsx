import Image from "next/image";

type BlogHeaderProps = {
  title: string;
  excerpt?: string;
  category?: string;
  author: string;
  date: string;
  coverImage?: string;
  dark?: boolean;
  readingTime?: number;
  accent?: string;
};

export default function BlogHeader({
  title,
  excerpt,
  category,
  author,
  date,
  coverImage,
  dark = false,
  readingTime,
  accent = "#AE572C",
}: BlogHeaderProps) {
  const text = dark ? "#f0f0f0" : "#111111";
  const muted = dark ? "#888" : "#6b7280";
  const badgeBg = dark ? "#1e1e1e" : "#ede0d0";

  return (
    <header className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 pt-20 pb-10">

      {/* Category badge */}
      {category && (
        <span
          className="inline-block rounded-full px-3 py-1 text-xs tracking-[0.15em] uppercase mb-6"
          style={{ backgroundColor: badgeBg, color: accent }}
        >
          {category}
        </span>
      )}

      {/* Title */}
      <h1
        className="text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-3xl"
        style={{ color: text }}
      >
        {title}
      </h1>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-lg md:text-xl mt-5 max-w-2xl leading-relaxed" style={{ color: muted }}>
          {excerpt}
        </p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mt-6 text-sm" style={{ color: muted }}>
        <span>{date}</span>
        <span>·</span>
        <span style={{ color: accent }}>{author}</span>
        {readingTime && (
          <>
            <span>·</span>
            <span>{readingTime} min read</span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="mt-8 h-px w-full" style={{ backgroundColor: dark ? "#2a2a2a" : "#e0d4c4" }} />

      {/* Cover image */}
      {coverImage && (
        <div className="mt-10 rounded-2xl overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            width={1200}
            height={600}
            className="w-full h-55 sm:h-80 md:h-125 object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
