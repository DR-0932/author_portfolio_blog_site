import { notFound } from "next/navigation";
import BlogHeader from "@/component/blog/BlogHeader";
import BlogContent from "@/component/blog/BlogContent";

type Blog = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
};

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

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <main className="bg-[#f8ecdc57] min-h-screen">
      <BlogHeader
        title={blog.title}
        excerpt={blog.excerpt}
        category={blog.category}
        author="Palak Agarwal"
        date={new Date(blog.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        coverImage={blog.image}
      />
      <BlogContent content={blog.content} />
    </main>
  );
}