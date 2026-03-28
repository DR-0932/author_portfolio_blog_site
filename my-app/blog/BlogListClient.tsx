"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useDarkMode } from "@/context/DarkModeContext";

type Blog = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
};


export default function BlogListClient({ blogs }: { blogs: Blog[] }) {
  const { dark } = useDarkMode();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const accent = dark ? "#ec4899" : "#AE572C";
  const text = dark ? "#f5f5f5" : "#111111";
  const muted = dark ? "#888" : "#6b7280";
  const borderColor = dark ? "#2a2a2a" : "#d6cbbf";
  const rowHoverBg = dark ? "#1a1a1a" : "#e8d5c0";

  const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));
  const filtered = activeCategory ? blogs.filter((b) => b.category === activeCategory) : blogs;

  const handleRowEnter = (i: number) => {
    gsap.to(rowRefs.current[i], { backgroundColor: rowHoverBg, x: 6, duration: 0.25, ease: "power2.out" });
  };
  const handleRowLeave = (i: number) => {
    gsap.to(rowRefs.current[i], { backgroundColor: "transparent", x: 0, duration: 0.25, ease: "power2.out" });
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: dark ? "#0f0f0f" : "transparent", color: text }}
    >
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 pt-20 pb-32">

        {/* Top bar */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none">
              Blog
              <sup className="text-xl md:text-2xl font-light ml-2" style={{ color: muted }}>
                ({blogs.length})
              </sup>
            </h1>
            <p className="mt-4 text-base max-w-sm leading-relaxed" style={{ color: muted }}>
              Here&apos;s where I share my thoughts, insights, and growth.
              New article monthly, released towards the end of every month.
            </p>
          </div>
        </div>

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors duration-200"
              style={{
                borderColor: !activeCategory ? accent : borderColor,
                color: !activeCategory ? accent : muted,
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors duration-200"
                style={{
                  borderColor: activeCategory === cat ? accent : borderColor,
                  color: activeCategory === cat ? accent : muted,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Table header */}
        <div
          className="grid grid-cols-[9rem_1fr_9rem] pb-3 mb-1 border-b text-xs tracking-[0.2em] uppercase"
          style={{ borderColor, color: muted }}
        >
          <span>Date</span>
          <span>Title</span>
          <span className="text-right">Category</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <p className="py-24 text-center text-sm" style={{ color: muted }}>
            No blogs published yet.
          </p>
        ) : (
          filtered.map((blog, i) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog.slug}`}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="grid grid-cols-[9rem_1fr_9rem] items-center border-b py-7 transition-colors duration-200"
              style={{ borderColor }}
              onMouseEnter={() => handleRowEnter(i)}
              onMouseLeave={() => handleRowLeave(i)}
            >
              <span className="text-xs tracking-widest tabular-nums" style={{ color: muted }}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).replace(/\//g, ".")}
              </span>
              <span className="text-xl md:text-2xl font-light tracking-wide pr-8">
                {blog.title}
              </span>
              <span
                className="text-xs tracking-[0.15em] uppercase text-right"
                style={{ color: accent }}
              >
                {blog.category}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
