"use client";

const items = [
  "Writing",
  "Editing",
  "Ghost Writing",
  "Storytelling",
  "Brand Voice",
  "Long-Form",
  "Book Editing",
  "Fiction",
  "Academic",
  "Content Strategy",
  "Editorial",
  "Research",
];

const SEP = "·";

const styles = {
  wrapper: "w-full overflow-hidden",
  row: "flex w-max py-2 md:py-3",
  item: "flex items-center gap-5 md:gap-8 whitespace-nowrap px-5 md:px-8 text-xs md:text-sm tracking-[0.25em] uppercase font-medium",
  sep: "text-base",
};

const gray = "#9ca3af";
const sepGray = "#d1d5db";

export default function Marquee() {
  const row = [...items, ...items];

  return (
    <div className={styles.wrapper} style={{ backgroundColor: "transparent" }}>
      <div className={`${styles.row} animate-marquee`}>
        {row.map((item, i) => (
          <span key={i} className={styles.item} style={{ color: gray }}>
            {item}
            <span style={{ color: sepGray }} className={styles.sep}>{SEP}</span>
          </span>
        ))}
      </div>

    </div>
  );
}
