import type { Metadata } from "next";
import BlogListClient from "@/blog/BlogListClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays, articles, and stories by Palak Agarwal — covering writing craft, ghostwriting, content strategy, fiction, and the literary world.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app/blogs" },
};

type BlogFromAPI = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  createdAt: string;
};

async function getBlogs(): Promise<BlogFromAPI[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs ?? [];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return <BlogListClient blogs={blogs} />;
}
