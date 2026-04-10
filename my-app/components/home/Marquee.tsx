"use client";

import { useDarkMode } from "@/context/DarkModeContext";

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
  row: "flex w-max py-3 md:py-4",
  item: "flex items-center gap-5 md:gap-8 whitespace-nowrap px-5 md:px-8 text-sm md:text-lg tracking-[0.25em] uppercase font-bold --font-script",
  sep: "text-xl ",
};

export default function Marquee() {
  const { dark } = useDarkMode();

  const bg = dark ? "#161616" : "#1a1a1a";
  const text = dark ? "#f5f0e8" : "#AE572C";
  const sepColor = dark ? "#e8b87a" : "#AE572C";

  const row = [...items, ...items];

  return (
    <div className={styles.wrapper} style={{ backgroundColor: bg }}>
      {/* Row 1 — left to right */}
      <div className={`${styles.row} animate-marquee`}>
        {row.map((item, i) => (
          <span key={i} className={styles.item} style={{ color: text }}>
            {item}
            <span style={{ color: sepColor }} className={styles.sep}>
              {SEP}
            </span>
          </span>
        ))}
      </div>

      {/* Row 2 — right to left */}
      <div className={`${styles.row} animate-marquee-reverse`}>
        {row.map((item, i) => (
          <span key={i} className={styles.item} style={{ color: text }}>
            {item}
            <span style={{ color: sepColor }} className={styles.sep}>
              {SEP}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
