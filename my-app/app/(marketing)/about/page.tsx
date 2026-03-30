import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Palak Agarwal — writer, ghostwriter, and editor with 3+ years of experience helping authors, entrepreneurs, and brands find their voice.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app/about" },
};

const styles = {
  wrapper: "min-h-screen bg-[#faf7f2]",
  container: "max-w-6xl mx-auto px-8 py-24",

  // Hero row
  hero: "flex flex-col md:flex-row items-center gap-16",
  archWrapper: "relative w-64 h-80 rounded-t-full overflow-hidden bg-stone-200 shrink-0",

  textCol: "flex flex-col gap-6",
  eyebrow: "text-sm tracking-[0.2em] uppercase text-stone-400 font-medium",
  name: "text-5xl md:text-7xl font-bold tracking-tight leading-none",
  role: "text-xl text-stone-500 font-medium",
  bio: "text-base text-stone-600 leading-relaxed max-w-xl",

  cta: "flex gap-4 mt-2",
  ctaBlue:
    "px-7 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition",
  ctaWhite:
    "px-7 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm font-medium hover:border-stone-400 transition",

  // Stats row
  statsRow: "mt-24 grid grid-cols-2 md:grid-cols-4 gap-6",
  statCard: "bg-white rounded-2xl px-8 py-7 flex flex-col gap-1 border border-stone-100",
  statValue: "text-4xl font-bold tracking-tight",
  statLabel: "text-xs tracking-widest uppercase text-stone-400",

  // What I do
  section: "mt-24",
  sectionLabel: "text-xs tracking-[0.2em] uppercase text-stone-400 mb-3",
  sectionHeading: "text-4xl font-bold tracking-tight mb-12",
  servicesGrid: "grid md:grid-cols-3 gap-6",
  serviceCard: "bg-white rounded-2xl p-8 border border-stone-100 flex flex-col gap-3",
  serviceIcon: "text-2xl",
  serviceTitle: "text-lg font-semibold",
  serviceDesc: "text-sm text-stone-500 leading-relaxed",
};

const stats = [
  { value: "3+", label: "Years of Experience" },
  { value: "200k+", label: "Words Written" },
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Books Authored" },
];

const services = [
  {
    icon: "✍️",
    title: "Ghostwriting",
    desc: "Full-length books, memoirs, and manuscripts written in your voice — so you get the credit, I handle the words.",
  },
  {
    icon: "📖",
    title: "Book Editing",
    desc: "Developmental and copy editing that sharpens your manuscript, strengthens your narrative, and polishes every sentence.",
  },
  {
    icon: "📝",
    title: "Content Writing",
    desc: "Blog posts, articles, newsletters, and branded copy crafted to build your authority and engage your audience.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.archWrapper}>
            <Image
              src="/image.png"
              alt="Palak Agarwal"
              fill
              className="object-cover object-top grayscale"
            />
          </div>

          <div className={styles.textCol}>
            <span className={styles.eyebrow}>About me</span>
            <h1 className={styles.name}>Palak Agarwal</h1>
            <p className={styles.role}>Author · Ghostwriter · Content Writer</p>
            <p className={styles.bio}>
              I help authors, entrepreneurs, and brands turn their ideas into words that matter.
              With over 3 years of experience across ghostwriting, book editing, and content
              strategy, I bring clarity, craft, and your unique voice to every project — from
              first draft to final page.
            </p>
            <div className={styles.cta}>
              <Link href="/#contact" className={styles.ctaBlue}>Work with me</Link>
              <Link href="/blogs" className={styles.ctaWhite}>Read my work</Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>What I do</p>
          <h2 className={styles.sectionHeading}>How I can help you</h2>
          <div className={styles.servicesGrid}>
            {services.map((s) => (
              <div key={s.title} className={styles.serviceCard}>
                <span className={styles.serviceIcon}>{s.icon}</span>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
