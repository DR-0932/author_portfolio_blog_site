import type { Metadata } from "next";
import Hero from "@/components/home/HeroSection/Hero";
import WorkSample2 from "@/components/home/WorkSample2";
import Services from "@/components/home/Services";
import Testimonial from "@/components/home/Testimonial";
import Contact from "@/components/home/Contact";

export const metadata: Metadata = {
  title: "Palak Agarwal | Writer, Ghostwriter & Editor",
  description:
    "Welcome to the portfolio of Palak Agarwal — freelance writer, ghostwriter, and editor. 3+ years of experience, 200k+ words written, 50+ projects delivered.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app" },
};

export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <WorkSample2 />
      <Testimonial />
      <Contact />
    </main>
  );
}
