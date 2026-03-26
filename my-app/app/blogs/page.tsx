import BlogCard from "@/blog/BlogCard";
import BlogHero from "@/blog/BlogHero";

const styles = {
  wrapper: "bg-[#f8ecdc57]",
  container: "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-16 space-y-8",
  empty: "text-gray-400 text-center py-24",
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className={styles.wrapper}>
      <BlogHero />
      <section className={styles.container}>
        {blogs.length === 0 ? (
          <p className={styles.empty}>No blogs published yet.</p>
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
              date={formatDate(blog.createdAt)}
            />
          ))
        )}
      </section>
    </main>
  );
}
