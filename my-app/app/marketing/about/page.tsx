import Image from "next/image";

const styles = {
  wrapper: "min-h-screen bg-[#faf7f2] text-black px-10 py-16 max-w-screen-xl mx-auto",

  heading: "text-5xl md:text-[5.5rem] font-bold leading-tight tracking-tight max-w-4xl mb-20",

  grid: "grid grid-cols-[1fr_auto_1fr] gap-12 items-start",

  // Left column
  leftCol: "flex flex-col gap-10",
  block: "flex flex-col gap-2",
  label: "text-[0.65rem] tracking-[0.2em] uppercase text-[#AE572C] font-semibold",
  desc: "text-sm text-stone-600 leading-relaxed max-w-xs",

  // Center photo
  centerCol: "flex flex-col items-center gap-3",
  archWrapper:
    "relative w-56 h-72 rounded-t-full overflow-hidden border border-stone-200 bg-stone-100",
  caption: "text-[0.65rem] tracking-widest uppercase text-stone-400 text-center",

  // Right column
  rightCol: "flex flex-col gap-8",
  statLabel: "text-[0.65rem] tracking-[0.2em] uppercase text-stone-400 font-medium",
  statValue: "text-5xl font-bold tracking-tight leading-none",
};

const about = [
  {
    label: "Years of Experience",
    desc: "Palak Agarwal has been crafting compelling narratives for over 3 years, serving authors, entrepreneurs, and brands across India and internationally — turning complex ideas into clear, resonant prose.",
  },
  {
    label: "Clients Worldwide",
    desc: "Palak works with first-time authors, seasoned writers, and growing businesses who need their ideas transformed into powerful books, articles, and branded content that truly connect with readers.",
  },
  {
    label: "Approach",
    desc: "Palak's goal is to bring every client's unique voice to life — whether through a debut memoir, a ghostwritten business book, or a content strategy that builds lasting authority in their field.",
  },
];

const stats = [
  { label: "Years of Experience", value: "3+" },
  { label: "Words Written", value: "200k+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Books Written", value: "3+" },
];

export default function AboutPage() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>
        Stories Crafted With Purpose,{" "}
        <span className="italic text-[#AE572C]">Words</span> That Leave a Mark.
      </h1>

      <div className={styles.grid}>
        {/* Left — Bio blocks */}
        <div className={styles.leftCol}>
          {about.map((item) => (
            <div key={item.label} className={styles.block}>
              <span className={styles.label}>{item.label}</span>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Center — Portrait */}
        <div className={styles.centerCol}>
          <div className={styles.archWrapper}>
            <Image
              src="/author.jpg"
              alt="Palak Agarwal"
              fill
              className="object-cover object-top grayscale"
            />
          </div>
          <p className={styles.caption}>Author · Ghostwriter · Content Strategist</p>
        </div>

        {/* Right — Stats */}
        <div className={styles.rightCol}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
