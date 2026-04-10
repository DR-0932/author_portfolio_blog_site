"use client";

import { useDarkMode } from "@/context/DarkModeContext";

const styles = {
  wrapper: "flex flex-wrap gap-2 mb-10",
  btn: "text-xs tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors duration-200",
};

type Props = {
  categories: string[];
  active: string | null;
  onChange: (cat: string | null) => void;
};

export default function CategoryFilter({ categories, active, onChange }: Props) {
  const { dark } = useDarkMode();

  const accent = dark ? "#ec4899" : "#AE572C";
  const muted = dark ? "#888" : "#6b7280";
  const borderColor = dark ? "#2a2a2a" : "#d6cbbf";

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => onChange(null)}
        className={styles.btn}
        style={{
          borderColor: !active ? accent : borderColor,
          color: !active ? accent : muted,
        }}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat === active ? null : cat)}
          className={styles.btn}
          style={{
            borderColor: active === cat ? accent : borderColor,
            color: active === cat ? accent : muted,
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
