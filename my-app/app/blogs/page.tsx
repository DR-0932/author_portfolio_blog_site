import BlogCard from "@/component/blog/BlogCard";
import BlogHero from "@/component/blog/BlogHero";

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
    const res = await fetch("http://localhost:5000/blog", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.blogs ?? [];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-[#f8ecdc57]">
      <BlogHero />
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        {blogs.length === 0 ? (
          <p className="text-gray-400 text-center py-24">No blogs published yet.</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              slug={blog.slug}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              category={blog.category}
              author="Palak Agarwal"
              date={new Date(blog.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          ))
        )}
      </section>
    </main>
  );
}