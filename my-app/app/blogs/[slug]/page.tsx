import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "@/blog/BlogPostClient";

type Blog = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
};

function extractHeadings(content: string) {
  const matches = content.match(/^# .+$/gm) ?? [];
  return matches.map((m) => {
    const text = m.replace(/^# /, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return { id, text };
  });
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog ?? null;
  } catch {
    return null;
  }
}

const BASE_URL = "https://author-portfolio-blog-site.vercel.app";
const OG_FALLBACK = `${BASE_URL}/image.png`;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Post not found" };

  const image = blog.image || OG_FALLBACK;

  return {
    title: blog.title,
    description: blog.excerpt || `Read "${blog.title}" by Palak Agarwal.`,
    alternates: { canonical: `${BASE_URL}/blogs/${slug}` },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/blogs/${slug}`,
      title: blog.title,
      description: blog.excerpt || `Read "${blog.title}" by Palak Agarwal.`,
      images: [{ url: image, alt: blog.title }],
      publishedTime: blog.createdAt,
      authors: ["Palak Agarwal"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || `Read "${blog.title}" by Palak Agarwal.`,
      images: [image],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const headings = extractHeadings(blog.content);

  return <BlogPostClient blog={blog} headings={headings} />;
}
