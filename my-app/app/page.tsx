import Hero from "@/home/Hero";
import WorkExperience from "../home/WorkExperience";
import Testimonial from "../home/Testimonial";
import WorkSample from "../home/WorkSample";
import ExpCard from "../component/ui/expCard";
import Contact from "../home/Contact";
import DemoTestimonial from "../home/DemoTestimonial";
import StackingCardsDemo from "../component/ui/card2";

export default function Page() {
  return (
    <main className="bg-[#f8ecdc57]">
      <Hero />
      <Testimonial />
      <WorkSample />
      <WorkExperience />
      <Contact />
    </main>
  );
}