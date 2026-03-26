import Image from "next/image";
import Link from "next/link";


// style variables
const styles = {
  wrapper:
    "flex gap-6 rounded-2xl bg-[#f3eee8] p-6 hover:shadow-md transition",

  image:
    "w-72 h-52 rounded-xl object-cover",

  content: "flex flex-col justify-between flex-1",

  category:
    "inline-block w-fit rounded-full bg-[#e7d7c7] px-3 py-1 text-xs",

  title:
    "text-2xl font-semibold leading-snug mt-2 hover:underline",

  excerpt:
    "text-lg text-gray-600 mt-2 line-clamp-2",

  meta:
    "flex items-center gap-4 text-md text-gray-500 mt-4",
};


type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
};

export default function BlogCard({
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  date,
}: BlogCardProps) {
  return (
    <Link href={`/blogs/${slug}`} className={styles.wrapper} >
      
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={220}
        height={160}
        className={styles.image}
      />

      {/* Content */}
      <div className={styles.content}>
        <div>
          <span className={styles.category}>{category}</span>

          <h2 className={styles.title}>{title}</h2>

          <p className={styles.excerpt}>{excerpt}</p>
        </div>

        <div className={styles.meta}>
          <span>{date}</span>
          <span>{author}</span>
        </div>
      </div>
    </Link>
  );
}