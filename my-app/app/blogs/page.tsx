import BlogListClient from "@/blog/BlogListClient";

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
