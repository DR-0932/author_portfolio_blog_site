import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FictionPostClient from "@/Fiction/FictionPostClient";

type Chapter = { title: string; body: string };

type Fiction = {
  title: string;
  slug: string;
  chapters: Chapter[];
  createdAt: string;
};

async function getFiction(slug: string): Promise<Fiction | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fiction/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.fiction ?? null;
  } catch {
    return null;
  }
}

const BASE_URL = "https://author-portfolio-blog-site.vercel.app";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const fiction = await getFiction(slug);
  if (!fiction) return { title: "Not found" };

  const excerpt = (fiction.chapters[0]?.body ?? "").replace(/[#*_`>]/g, "").trim().slice(0, 160);

  return {
    title: fiction.title,
    description: excerpt,
    alternates: { canonical: `${BASE_URL}/fiction/${slug}` },
    openGraph: {
      type: "article",
      title: fiction.title,
      description: excerpt,
      publishedTime: fiction.createdAt,
      authors: ["Palak Agarwal"],
    },
  };
}

const demoFictions: Fiction[] = [
  { title: "The Last Letter", slug: "the-last-letter", createdAt: "2024-11-01T00:00:00Z", chapters: [{ title: "The Last Letter", body: "She had written a hundred letters in her life, but this one she could not finish. The pen hovered over the paper like a bird afraid to land. Outside, the rain came down in sheets, blurring the street into watercolour.\n\nShe thought about what it meant to say goodbye to someone who was already gone — not dead, just absent in the way that some people learn to be. The letter began with his name and ended with nothing. That was enough.\n\nIn the morning she folded the blank page and put it in an envelope. She addressed it to no one. She sent it anyway." }] },
  { title: "The Cartographer", slug: "the-cartographer", createdAt: "2024-09-14T00:00:00Z", chapters: [{ title: "The Cartographer", body: "He mapped cities that did not exist. Not as a lie, but as a kind of hope. Every night he drew streets and named them after people he had loved.\n\nThe butcher's lane. The square where she used to read. The long avenue of forget-me-nots. His maps were sold in markets and sometimes people bought them thinking they were real, and then set out to find places that only existed in the careful lines of his grief.\n\nOne day a woman came back. She had followed one of his maps for three days. She said she had found the city. He did not know what to say." }] },
  { title: "Something Borrowed", slug: "something-borrowed", createdAt: "2024-07-22T00:00:00Z", chapters: [{ title: "Something Borrowed", body: "The wedding dress had belonged to three women before her — her grandmother, a stranger at a thrift shop, and a woman whose name no one remembered.\n\nShe stood in front of the mirror and tried to feel that something borrowed meant luck. Instead she felt the weight of other vows, other mornings, other hands smoothing down the silk.\n\nMarriage, she thought, was always something borrowed. You were never the first person to love someone this much." }] },
  { title: "Winter Hours", slug: "winter-hours", createdAt: "2024-02-08T00:00:00Z", chapters: [{ title: "Winter Hours", body: "In January the days were the colour of old photographs. She woke at six, when the sky was still a dark bruise, and made tea.\n\nThe ritual of it — the kettle, the cup, the exact number of minutes — was the only thing that felt real. Outside the window the city held its breath.\n\nShe had been living alone for eight months and had learned that silence was not empty. It was full of all the things she had not yet learned to say." }] },
];

export default async function FictionPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let fiction = await getFiction(slug);

  if (!fiction) {
    fiction = demoFictions.find((f) => f.slug === slug) ?? null;
  }

  if (!fiction) notFound();

  return <FictionPostClient fiction={fiction} />;
}
