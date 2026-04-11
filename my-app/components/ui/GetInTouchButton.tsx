"use client";

import Link from "next/link";

export default function GetInTouchButton() {
  return (
    <Link
      href="/contact"
      className="hidden sm:block text-sm md:text-base tracking-widest rounded-2xl px-4 md:px-5 py-2 md:py-2.5 hover:opacity-90 transition-all duration-500"
      style={{ backgroundColor: "var(--accent)", color: "#fff" }}
    >
      Get In Touch
    </Link>
  );
}
