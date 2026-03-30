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

export default function Marquee() {
  const { dark } = useDarkMode();

  const bg = dark ? "#161616" : "#1a1a1a";
  const text = dark ? "#ec4899" : "#f5f0e8";
  const sepColor = dark ? "#ec4899" : "#AE572C";

  const row = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Row 1 — left to right */}
      <div className="flex w-max animate-marquee py-3 md:py-4">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 md:gap-8 whitespace-nowrap px-5 md:px-8 text-sm md:text-base tracking-[0.25em] uppercase font-medium"
            style={{ color: text }}
          >
            {item}
            <span style={{ color: sepColor }} className="text-lg">{SEP}</span>
          </span>
        ))}
      </div>

      {/* Row 2 — right to left */}
      <div className="flex w-max animate-marquee-reverse py-3 md:py-4">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 md:gap-8 whitespace-nowrap px-5 md:px-8 text-sm md:text-base tracking-[0.25em] uppercase font-medium"
            style={{ color: text }}
          >
            {item}
            <span style={{ color: sepColor }} className="text-lg">{SEP}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
