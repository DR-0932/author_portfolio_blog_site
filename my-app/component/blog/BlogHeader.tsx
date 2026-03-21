
import Image from "next/image";

const styles = {
  wrapper: "max-w-4xl mx-auto px-6 pt-16 pb-10",
  category:
    "inline-block rounded-full bg-[#e7d7c7] px-3 py-1 text-xs mb-4",
  title:
    "text-4xl md:text-5xl font-semibold leading-tight tracking-tight",
  excerpt: "text-lg text-gray-600 mt-4",
  meta: "flex items-center gap-4 text-sm text-gray-500 mt-6",
  imageWrapper: "mt-10 rounded-2xl overflow-hidden",
  image: "w-full h-[420px] object-cover",
};

type BlogHeaderProps = {
  title: string;
  excerpt?: string;
  category?: string;
  author: string;
  date: string;
  coverImage?: string;
};

export default function BlogHeader({
  title,
  excerpt,
  category,
  author,
  date,
  coverImage,
}: BlogHeaderProps) {
  return (
    <header className={styles.wrapper}>
      <span className={styles.category}>{category}</span>

      <h1 className={styles.title}>{title}</h1>

      {excerpt && <p className={styles.excerpt}>{excerpt}</p>}

      <div className={styles.meta}>
        <span>{date}</span>
        <span>•</span>
        <span>{author}</span>
      </div>

      {coverImage && (
        <div className={styles.imageWrapper}>
          <Image
            src={coverImage}
            alt={title}
            width={1200}
            height={600}
            className={styles.image}
            priority
          />
        </div>
      )}
    </header>
  );
}