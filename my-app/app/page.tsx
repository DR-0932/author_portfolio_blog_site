import type { Metadata } from "next";
import Hero from "@/components/home/HeroSection/Hero";

export const metadata: Metadata = {
  title: "Palak Agarwal | Writer, Ghostwriter & Editor",
  description:
    "Welcome to the portfolio of Palak Agarwal — freelance writer, ghostwriter, and editor. 3+ years of experience, 200k+ words written, 50+ projects delivered.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app" },
};
import Marquee from "@/components/home/Marquee";
import Description from "@/components/home/Description";
import WorkExperience from "@/components/home/WorkExperience";
import Testimonial from "@/components/home/Testimonial";
import Contact from "@/components/home/Contact";
import WorkSample2 from "@/components/home/WorkSample2";

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Marquee />
      <Description />
      <WorkSample2 />
      <Testimonial />
      <WorkExperience />
      <Contact />
    </main>
  );
}
