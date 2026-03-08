import BlogCard from "@/component/blog/BlogCard";
import BlogHero from "@/component/blog/BlogHero";

const dummyBlog = {
  slug: "healthcare-future",
  title:
    "Industry Leaders Predict the Next Decade of Healthcare Innovation",
  excerpt:
    "Healthcare is entering a transformation unlike anything seen before...",
  image:
    "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  category: "Health & Medical",
  author: "Palak Agarwal",
  date: "26 October 2025",
};

export default function Home() {
  return (
    <><div className=" bg-[#262729]">
       {/* bg-[#e2b0ac] */}

      <BlogHero />
      {/* bg-[#b9c2ca]  */}
      <div className="bg-linear-to-b 
from-[#e8d2c3] 
via-[#efe3da] 
to-[#f6efe9] rounded-4xl m-3 h-screen"> 
        <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
          <BlogCard {...dummyBlog} />
          <BlogCard {...dummyBlog} />
        </section>
      </div>
    </div>
    </>
  );
}