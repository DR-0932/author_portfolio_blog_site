"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import CategoryFilter from "@/components/ui/CategoryFilter";

type Blog = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
};


export default function BlogListClient({ blogs }: { blogs: Blog[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));
  const filtered = activeCategory ? blogs.filter((b) => b.category === activeCategory) : blogs;

  const handleRowEnter = (i: number) => {
    gsap.to(rowRefs.current[i], { backgroundColor: "var(--bg-accent)", x: 6, duration: 0.25, ease: "power2.out" });
  };
  const handleRowLeave = (i: number) => {
    gsap.to(rowRefs.current[i], { backgroundColor: "transparent", x: 0, duration: 0.25, ease: "power2.out" });
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ color: "var(--text)" }}
    >
      <div className="page-x pt-20 pb-32">

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
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        {/* Table header */}
        <div
          className="grid grid-cols-[5rem_1fr] sm:grid-cols-[9rem_1fr_9rem] pb-3 mb-1 border-b text-xs tracking-[0.2em] uppercase"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <span>Date</span>
          <span>Title</span>
          <span className="hidden sm:block text-right">Category</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <p className="py-24 text-center text-sm" style={{ color: "var(--muted)" }}>
            No blogs published yet.
          </p>
        ) : (
          filtered.map((blog, i) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog.slug}`}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="grid grid-cols-[5rem_1fr] sm:grid-cols-[9rem_1fr_9rem] items-center border-b py-5 sm:py-7 transition-colors duration-200"
              style={{ borderColor: "var(--border)" }}
              onMouseEnter={() => handleRowEnter(i)}
              onMouseLeave={() => handleRowLeave(i)}
            >
              <span className="text-xs tracking-widest tabular-nums" style={{ color: "var(--muted)" }}>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).replace(/\//g, ".")}
              </span>
              <span className="text-base sm:text-xl md:text-2xl font-light tracking-wide pr-4 sm:pr-8">
                {blog.title}
              </span>
              <span
                className="hidden sm:block text-xs tracking-[0.15em] uppercase text-right"
                style={{ color: "var(--accent)" }}
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
