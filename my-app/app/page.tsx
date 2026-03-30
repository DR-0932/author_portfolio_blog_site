import type { Metadata } from "next";
import Hero from "@/home/Hero";

export const metadata: Metadata = {
  title: "Palak Agarwal | Writer, Ghostwriter & Editor",
  description:
    "Welcome to the portfolio of Palak Agarwal — freelance writer, ghostwriter, and editor. 3+ years of experience, 200k+ words written, 50+ projects delivered.",
  alternates: { canonical: "https://author-portfolio-blog-site.vercel.app" },
};
import Marquee from "@/home/Marquee";
import Description from "@/home/Description";
import WorkExperience from "../home/WorkExperience";
import Testimonial from "../home/Testimonial";
import WorkSample from "../home/WorkSample";
import ExpCard from "../component/ui/expCard";
import Contact from "../home/Contact";
import DemoTestimonial from "../home/DemoTestimonial";
import StackingCardsDemo from "../component/ui/card2";
import WorkSample2 from "../home/WorkSample2";

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Marquee />
      <Description />
      <WorkSample2 />
      {/* <WorkSample /> */}
      <Testimonial />
      <WorkExperience />
      <Contact />
    </main>
  );
}
