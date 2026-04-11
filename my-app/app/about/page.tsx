import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Description from "@/components/about/Description";
import WorkExperience from "@/components/about/WorkExperience";

export const metadata: Metadata = {
  title: "About | Palak Agarwal",
  description:
    "Learn about Palak Agarwal — freelance writer, ghostwriter, and book editor with 3+ years of experience crafting content across industries.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app/about" },
};

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="page-x py-2">
      <div className="flex items-center gap-5">
        <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-[10px] tracking-[0.4em] uppercase font-semibold" style={{ color: "var(--accent)" }}>
          {label}
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <SectionDivider label="Story" />
      <Description />
      <SectionDivider label="Experience" />
      <WorkExperience />
    </main>
  );
}
