import type { Metadata } from "next";
import FictionListClient from "@/Fiction/FictionListClient";

export const metadata: Metadata = {
  title: "Fiction",
  description: "A collection of short fiction and stories by Palak Agarwal — each piece living in its own world.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app/fiction" },
};

type Fiction = {
  _id: string;
  slug: string;
  title: string;
  chapters: { title: string; body: string }[];
  createdAt: string;
};

async function getFictions(): Promise<Fiction[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fiction`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.fiction ?? [];
  } catch {
    return [];
  }
}

export default async function FictionPage() {
  const fictions = await getFictions();
  return <FictionListClient fictions={fictions} />;
}
