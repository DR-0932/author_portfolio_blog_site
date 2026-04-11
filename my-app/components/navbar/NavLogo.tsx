"use client";

import Link from "next/link";

type Props = { text: string };

export default function NavLogo({ text }: Props) {
  return (
    <Link
      href="/"
      className="font-semibold tracking-tight transition-colors duration-500"
      style={{ color: "var(--nav-text)", fontSize: "clamp(1rem, 3vw, 2rem)" }}
    >
      {text}
    </Link>
  );
}
